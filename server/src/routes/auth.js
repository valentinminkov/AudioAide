// path: app/src/routes/auth.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const cookieParser = require('cookie-parser');

router.use(cookieParser());

router.get('/login', authController.login);
router.get('/callback', authController.callback);
router.get('/refresh_token', authController.refreshToken);

module.exports = router;
