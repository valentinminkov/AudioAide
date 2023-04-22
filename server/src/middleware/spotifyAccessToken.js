// path: app/src/middleware/spotifyAccessToken.js
const SpotifyWebApi = require("spotify-web-api-node");
const { clientId, clientSecret } = require("../config");

const spotifyApi = new SpotifyWebApi({
  clientId: clientId,
  clientSecret: clientSecret,
});

// Middleware function to set the access token
function setSpotifyAccessToken(req, res, next) {
  const access_token = req.session.access_token;
  if (!access_token) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  spotifyApi.setAccessToken(access_token);
  req.spotifyApi = spotifyApi; // Pass the spotifyApi instance to the controllers
  next();
}

module.exports = setSpotifyAccessToken;
