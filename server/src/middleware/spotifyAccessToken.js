// path: app/src/middleware/spotifyAccessToken.js
const SpotifyWebApi = require("spotify-web-api-node");
const { clientId, clientSecret } = require("../config");
const redisClient = require("../redisClient");

const spotifyApi = new SpotifyWebApi({
  clientId: clientId,
  clientSecret: clientSecret,
});

// Middleware function to set the access token
async function setSpotifyAccessToken(req, res, next) {
  const userId = req.params.userId;

  try {
    const access_token = await redisClient.hGet(
      `user:${userId}`,
      "access_token"
    );
    const refresh_token = await redisClient.hGet(
      `user:${userId}`,
      "refresh_token"
    );

    if (!access_token || !refresh_token) {
      res
        .status(401)
        .json({ error: "Unauthorized. Missing acces_token or refresh_token" });
      return;
    }

    spotifyApi.setAccessToken(access_token);
    spotifyApi.setRefreshToken(refresh_token);

    try {
      await spotifyApi.getMe();
    } catch (err) {
      if (err.statusCode === 401) {
        try {
          await spotifyApi.refreshAccessToken();
          const newAccessToken = spotifyApi.getAccessToken();

          await redisClient.hSet(
            `user:${userId}`,
            "access_token",
            newAccessToken
          );

          spotifyApi.setAccessToken(newAccessToken);

          try {
            await spotifyApi.getMe(); // Check again with the new access token
          } catch (secondError) {
            res.status(401).json({ error: "Unauthorized new access_token." });
            return;
          }
        } catch (refreshError) {
          res.status(401).json({ error: "Unable to refresh access token" });
          return;
        }
      } else {
        console.log("Error getting user data:", JSON.stringify(err));
        res.status(401).json({ error: "Unauthorized" });
        return;
      }
    }

    req.spotifyApi = spotifyApi;
    next();
  } catch (err) {
    res.status(401).json({ error: "Unauthorized" });
  }
}

module.exports = setSpotifyAccessToken;
