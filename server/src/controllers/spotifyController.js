// path: app/src/controllers/spotifyController.js

const spotifyController = {};

spotifyController.getMe = async (req, res) => {
  try {
    const data = await req.spotifyApi.getMe();
    res.json(data.body);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

spotifyController.getPlaylists = async (req, res) => {
  try {
    const data = await req.spotifyApi.getUserPlaylists();
    res.json(data.body);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

spotifyController.getPlaylist = async (req, res) => {
  try {
    const data = await req.spotifyApi.getPlaylist(req.params.id);
    res.json(data.body);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

spotifyController.createPlaylist = async (req, res) => {
  try {
    const data = await req.spotifyApi.createPlaylist(req.body.name, {
      description: req.body.description,
    });
    res.json(data.body);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

spotifyController.updatePlaylist = async (req, res) => {
  try {
    await req.spotifyApi.updatePlaylist(req.params.id, req.body);
    res.sendStatus(200);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

spotifyController.deletePlaylist = async (req, res) => {
  try {
    await req.spotifyApi.unfollowPlaylist(req.params.id);
    res.sendStatus(200);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

spotifyController.getPlaylistTracks = async (req, res) => {
  try {
    const data = await req.spotifyApi.getPlaylistTracks(req.params.id);
    res.json(data.body);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

spotifyController.addTracksToPlaylist = async (req, res) => {
  try {
    await req.spotifyApi.addTracksToPlaylist(req.params.id, req.body.uris);
    res.sendStatus(201);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

spotifyController.removeTracksFromPlaylist = async (req, res) => {
  try {
    await req.spotifyApi.removeTracksFromPlaylist(req.params.id, req.body.uris);
    res.sendStatus(200);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

spotifyController.getCurrentlyPlaying = async (req, res) => {
  try {
    const data = await req.spotifyApi.getMyCurrentPlaybackState();
    res.json(data.body);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

spotifyController.pausePlayback = async (req, res) => {
  try {
    await req.spotifyApi.pause();
    res.sendStatus(200);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

spotifyController.resumePlayback = async (req, res) => {
  try {
    await req.spotifyApi.play();
    res.sendStatus(200);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

spotifyController.skipTrack = async (req, res) => {
  try {
    await req.spotifyApi.play();
    res.sendStatus(200);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = spotifyController;
