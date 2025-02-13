const express = require('express');
const { registerUser, loginUser } = require('../controllers/authController');
const { authenticate } = require('../middleware/authMiddleware'); // Fixed import

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

// Protected route (for testing)
router.get('/me', authenticate, (req, res) => {
  // Fixed middleware usage
  res.json({ message: 'User authenticated', user: req.user });
});

module.exports = router;
