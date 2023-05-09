const express = require("express");
const router = express.Router();
const spotifyController = require("../controllers/spotifyController");
const spotifyAccessToken = require("../middleware/spotifyAccessToken");

router.get("/user/:userId/me", spotifyAccessToken, spotifyController.getMe);

router.get(
  "/user/:userId/playlists",
  spotifyAccessToken,
  spotifyController.getPlaylists
);

router.get(
  "/user/:userId/playlist/:id",
  spotifyAccessToken,
  spotifyController.getPlaylist
);

router.get(
  "/user/:userId/savedTracks",
  spotifyAccessToken,
  spotifyController.getSavedTracks
);

router.get(
  "/user/:userId/savedAlbums",
  spotifyAccessToken,
  spotifyController.getSavedAlbums
);

router.get(
  "/user/:userId/album/:id",
  spotifyAccessToken,
  spotifyController.getAlbum
);

router.get(
  "/user/:userId/savedArtists",
  spotifyAccessToken,
  spotifyController.getSavedArtists
);

router.post(
  "/user/:userId/playlist/create",
  spotifyAccessToken,
  spotifyController.createPlaylist
);

router.put(
  "/user/:userId/playlist/:id",
  spotifyAccessToken,
  spotifyController.updatePlaylist
);

router.delete(
  "/user/:userId/playlist/:id",
  spotifyAccessToken,
  spotifyController.deletePlaylist
);

router.get(
  "/user/:userId/playlist/:id/tracks",
  spotifyAccessToken,
  spotifyController.getPlaylistTracks
);

router.post(
  "/user/:userId/playlist/:id/tracks",
  spotifyAccessToken,
  spotifyController.addTracksToPlaylist
);

router.delete(
  "/user/:userId/playlist/:id/tracks",
  spotifyAccessToken,
  spotifyController.removeTracksFromPlaylist
);

router.get(
  "/user/:userId/currently-playing",
  spotifyAccessToken,
  spotifyController.getCurrentlyPlaying
);

router.put(
  "/user/:userId/pause",
  spotifyAccessToken,
  spotifyController.pausePlayback
);

router.put(
  "/user/:userId/play",
  spotifyAccessToken,
  spotifyController.resumePlayback
);

router.post(
  "/user/:userId/skip",
  spotifyAccessToken,
  spotifyController.skipTrack
);

module.exports = router;
