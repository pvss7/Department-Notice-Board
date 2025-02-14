const User = require('../models/User');

exports.getUserByUID = async (req, res) => {
  try {
    const { uid } = req.params;

    const user = await User.findOne({ firebaseUID: uid });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      uid: user.firebaseUID,
      name: user.name,
      email: user.email,
      role: user.role,
      year: user.year,
      section: user.section,
    });
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
