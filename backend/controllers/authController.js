const admin = require('../config/firebase');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, role, year, section } = req.body;

    // Validate required fields
    if (role === 'student' && (!year || !section)) {
      return res.status(400).json({ message: 'Year and section are required' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user in Firebase Authentication
    const userRecord = await admin.auth().createUser({
      email,
      password,
      displayName: name,
    });

    // Save user in MongoDB
    const newUser = new User({
      firebaseUID: userRecord.uid,
      name,
      email,
      role: role || 'student', // Default role to 'student' if not provided
      year, // Store year
      section, // Store section
      password: hashedPassword,
    });

    await newUser.save();

    res
      .status(201)
      .json({ message: 'User registered successfully', user: newUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Generate JWT Token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: {
        _id: user._id,
        firebaseUID: user.firebaseUID,
        name: user.name,
        email: user.email,
        role: user.role,
        year: user.year,
        section: user.section,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
