const User = require('../models/user');
const Permission = require('../models/permission');

exports.getUserByUID = async (req, res) => {
  try {
    const { uid } = req.params;

    const user = await User.findOne({ firebaseUID: uid });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      _id: user._id,
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
exports.grantNoticePermission = async (req, res) => {
  try {
    const { studentId } = req.params;

    let permission = await Permission.findOne({ userId: studentId });

    if (!permission) {
      permission = new Permission({ userId: studentId, canAddNotices: true });
    } else {
      permission.canAddNotices = true;
    }

    await permission.save();
    res.json({ success: true, message: 'Permission granted successfully.' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error granting permission', error: error.message });
  }
};

// Revoke notice permission from a student
exports.revokeNoticePermission = async (req, res) => {
  try {
    const { studentId } = req.params;
    await Permission.findOneAndDelete({ userId: studentId });
    res.json({ success: true, message: 'Permission revoked successfully.' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error revoking permission', error: error.message });
  }
};

// Check if a student has permission
exports.checkNoticePermission = async (req, res) => {
  try {
    const { studentId } = req.params;
    const permission = await Permission.findOne({ userId: studentId });

    res.json({ success: true, canAddNotices: permission ? permission.canAddNotices : false });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error checking permission', error: error.message });
  }
};
exports.getStudentUsers = async (req, res) => {
  try {
    const students = await User.find({ role: 'student' }).select('name _id');

    if (!students.length) {
      return res.status(404).json({ message: 'No students found' });
    }

    // Fetch permissions for each student
    const studentIds = students.map((student) => student._id);
    const permissions = await Permission.find({ userId: { $in: studentIds } });

    // Map permissions to students
    const studentsWithPermissions = students.map((student) => {
      const permission = permissions.find((p) => p.userId.toString() === student._id.toString());
      return {
        _id: student._id,
        name: student.name,
        canAddNotices: permission ? permission.canAddNotices : false,
      };
    });

    res.json(studentsWithPermissions);
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
