const express = require('express');
const { registerUser, loginUser } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

// Protected route (for testing)
router.get('/me', authMiddleware, (req, res) => {
  res.json({ message: 'User authenticated', user: req.user });
});

module.exports = router;
