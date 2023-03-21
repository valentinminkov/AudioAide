import express, { Request, Response } from "express";
import request from "request";
import querystring from "querystring";

const authRouter = express.Router();
const client_id = "YOUR_CLIENT_ID";
const client_secret = "YOUR_CLIENT_SECRET";
const redirect_uri = "http://localhost:8888/callback";

// Generates a random string with the given length
function generateRandomString(length: number): string {
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let text = "";
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

// Initiates the Spotify login process
authRouter.get("/login", (req: Request, res: Response) => {
  const state = generateRandomString(16);
  const scope = "user-read-private user-read-email";

  // Redirects the user to the Spotify authorize URL with the appropriate query parameters
  res.redirect(
    "https://accounts.spotify.com/authorize?" +
      querystring.stringify({
        response_type: "code",
        client_id: client_id,
        scope: scope,
        redirect_uri: redirect_uri,
        state: state,
      })
  );
});

// Handles the callback from the Spotify authorize URL
authRouter.get("/callback", (req: Request, res: Response) => {
  const code = (req.query.code as string) || null;
  const state = (req.query.state as string) || null;

  if (state === null) {
    // Redirects the user to an error page if the state parameter is missing or invalid
    res.redirect(
      "/#" +
        querystring.stringify({
          error: "state_mismatch",
        })
    );
  } else {
    // Sends a POST request to the Spotify API to exchange the authorization code for an access token
    const authOptions: request.OptionsWithUrl = {
      url: "https://accounts.spotify.com/api/token",
      form: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: "authorization_code",
      },
      headers: {
        Authorization:
          "Basic " +
          Buffer.from(client_id + ":" + client_secret).toString("base64"),
      },
      json: true,
    };

    request.post(authOptions, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        const access_token = body.access_token as string;
        const refresh_token = body.refresh_token as string;

        // Redirects the user to the main page with the access token and refresh token as query parameters
        res.redirect(
          "/#" +
            querystring.stringify({
              access_token: access_token,
              refresh_token: refresh_token,
            })
        );
      } else {
        // Redirects the user to an error page if there was an error exchanging the authorization code for an access token
        res.redirect(
          "/#" +
            querystring.stringify({
              error: "invalid_token",
            })
        );
      }
    });
  }
});

// Handles refreshing the access token
authRouter.get("/refresh_token", (req: Request, res: Response) => {
  const refresh_token = req.query.refresh_token as string;
  const authOptions: request.OptionsWithUrl = {
    url: "https://accounts.spotify.com/api/token",
    headers: {
      Authorization:
        "Basic " +
        Buffer.from(client_id + ":" + client_secret).toString("base64"),
    },
    form: {
      grant_type: "refresh_token",
      refresh_token: refresh_token,
    },
    json: true,
  };

  request.post(authOptions, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      const access_token = body.access_token as string;
      // Sends the new access token back to the client
      res.send({
        access_token: access_token,
      });
    } else {
      // Sends an error message if there was an error refreshing the access token
      res.status(response.statusCode).send({
        error: "Failed to refresh access token",
      });
    }
  });
});

export { authRouter };
