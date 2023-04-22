// path: app/src/controllers/authController.js
const request = require("request");
const querystring = require("querystring");
const crypto = require("crypto");

const { clientId, clientSecret, redirectUri } = require("../config");

function generateRandomString(length) {
  const possibleChars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += possibleChars.charAt(
      Math.floor(Math.random() * possibleChars.length)
    );
  }
  return result;
}

function generateCodeChallenge(codeVerifier) {
  const verifierBuffer = Buffer.from(codeVerifier);
  const hash = crypto.createHash("sha256").update(verifierBuffer).digest();
  const challenge = hash
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "");

  return challenge;
}

exports.login = (req, res) => {
  const state = generateRandomString(16);
  const codeVerifier = generateRandomString(128);
  const codeChallenge = generateCodeChallenge(codeVerifier);
  const scope =
    "user-read-private user-read-email user-read-playback-state user-modify-playback-state user-read-currently-playing playlist-read-private playlist-read-collaborative playlist-modify-public playlist-modify-private ugc-image-upload user-follow-read user-follow-modify user-library-read user-library-modify user-top-read user-read-recently-played app-remote-control streaming";

  console.log("Generated code verifier:", codeVerifier);

  // Set the code_verifier as a cookie
  res.cookie("code_verifier", codeVerifier);

  res.redirect(
    "https://accounts.spotify.com/authorize?" +
      querystring.stringify({
        response_type: "code",
        client_id: clientId,
        scope: scope,
        redirect_uri: redirectUri,
        state: state,
        code_challenge_method: "S256",
        code_challenge: codeChallenge,
      })
  );
};

exports.callback = (req, res) => {
  const code = req.query.code || null;
  const state = req.query.state || null;
  const error = req.query.error || null;

  if (error) {
    res.redirect(
      "/#" +
        querystring.stringify({
          error: error,
          state: state,
        })
    );
  } else {
    const codeVerifier = req.cookies.code_verifier; // Read the code_verifier from the cookie

    console.log("Read code verifier from cookie:", codeVerifier);

    const authOptions = {
      url: "https://accounts.spotify.com/api/token",
      form: {
        code: code,
        redirect_uri: redirectUri,
        grant_type: "authorization_code",
        code_verifier: codeVerifier,
      },
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic " +
          Buffer.from(clientId + ":" + clientSecret).toString("base64"),
      },
      json: true,
    };

    request.post(authOptions, function (error, response, body) {
      if (!error && response.statusCode === 200) {
        const access_token = body.access_token;
        const refresh_token = body.refresh_token;

        // Save the tokens to the session
        req.session.access_token = access_token;
        req.session.refresh_token = refresh_token;

        res.send({
          access_token: access_token,
          refresh_token: refresh_token,
        });
      } else {
        console.error("Error occurred during token exchange:", error);
        console.log("Response status code:", response.statusCode);
        console.log("Response body:", body);
        res.send("Error occurred during token exchange");
      }
    });
  }
};

exports.refreshToken = (req, res) => {
  const refresh_token = req.query.refresh_token;

  const authOptions = {
    url: "https://accounts.spotify.com/api/token",
    form: {
      grant_type: "refresh_token",
      refresh_token: refresh_token,
      client_id: clientId,
    },
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    json: true,
  };

  request.post(authOptions, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      const access_token = body.access_token;
      res.send({
        access_token: access_token,
      });
    } else {
      res.send("Error occurred while refreshing token");
    }
  });
};
