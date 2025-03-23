const express = require('express');
const { saveExpoPushToken } = require('../controllers/expoPushController'); // Updated Controller Name
const { authenticate } = require('../middleware/authMiddleware');

const router = express.Router();

// Route to save/update Expo Push Token
router.post('/save-token', authenticate, saveExpoPushToken);

module.exports = router;
