const User = require('../models/user');

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

// ✅ New function to fetch faculty users
exports.getFacultyUsers = async (req, res) => {
  try {
    const facultyList = await User.find({ role: 'faculty' }).select('name _id');

    if (!facultyList.length) {
      return res.status(404).json({ message: 'No faculty members found' });
    }

    res.json(facultyList);
  } catch (error) {
    console.error('Error fetching faculty members:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
