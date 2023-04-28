// path: app/src/routes/spotify.js
const express = require("express");
const router = express.Router();
const spotifyController = require("../controllers/spotifyController");
const spotifyAccessToken = require("../middleware/spotifyAccessToken");

router.get("/user/:userId/me", spotifyAccessToken, spotifyController.getMe);
router.get("/playlists", spotifyAccessToken, spotifyController.getPlaylists);
router.get("/playlist/:id", spotifyAccessToken, spotifyController.getPlaylist);
router.post(
  "/playlist/create",
  spotifyAccessToken,
  spotifyController.createPlaylist
);
router.put(
  "/playlist/:id",
  spotifyAccessToken,
  spotifyController.updatePlaylist
);
router.delete(
  "/playlist/:id",
  spotifyAccessToken,
  spotifyController.deletePlaylist
);
router.get(
  "/playlist/:id/tracks",
  spotifyAccessToken,
  spotifyController.getPlaylistTracks
);
router.post(
  "/playlist/:id/tracks",
  spotifyAccessToken,
  spotifyController.addTracksToPlaylist
);
router.delete(
  "/playlist/:id/tracks",
  spotifyAccessToken,
  spotifyController.removeTracksFromPlaylist
);
router.get(
  "/currently-playing",
  spotifyAccessToken,
  spotifyController.getCurrentlyPlaying
);
router.put("/pause", spotifyAccessToken, spotifyController.pausePlayback);
router.put("/play", spotifyAccessToken, spotifyController.resumePlayback);
router.post("/skip", spotifyAccessToken, spotifyController.skipTrack);

module.exports = router;
