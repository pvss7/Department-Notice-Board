const express = require('express');
const {
  getUserByUID,
  getFacultyUsers,
} = require('../controllers/userController');

const router = express.Router();

router.get('/user/:uid', getUserByUID);
router.get('/faculty', getFacultyUsers); // ✅ New route to get faculty members

module.exports = router;
