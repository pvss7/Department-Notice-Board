const express = require('express');
const {saveFCMToken} = require('../controllers/fcmController'); // Ensure correct import
const {authenticate} = require('../middleware/authMiddleware');

const router = express.Router();

// Route to save/update FCM token
router.post('/save-token', authenticate, saveFCMToken);

module.exports = router;
