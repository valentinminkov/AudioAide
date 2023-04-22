// path: app/src/routes/index.js
const express = require("express");
const authRoutes = require("./auth");
const spotifyRoutes = require("./spotify");

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/spotify", spotifyRoutes);

module.exports = router;
