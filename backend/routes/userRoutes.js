const express = require('express');
const { getUserByUID } = require('../controllers/userController');

const router = express.Router();

router.get('/:uid', getUserByUID); // Route to fetch user details by Firebase UID

module.exports = router;
