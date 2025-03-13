const Complaint = require('../models/complaint');
const User = require('../models/user');

// 📌 Create a new complaint (Student selects a Faculty)
exports.createComplaint = async (req, res) => {
  try {
    const { title, description, facultyId } = req.body;
    const studentId = req.user.id;

    // Validate facultyId
    const faculty = await User.findById(facultyId);
    if (!faculty || faculty.role !== 'faculty') {
      return res.status(400).json({ message: 'Invalid faculty selection' });
    }

    const newComplaint = new Complaint({
      title,
      description,
      user: studentId,
      faculty: facultyId, // Assign complaint to selected faculty
      status: 'Pending',
    });

    await newComplaint.save();
    res
      .status(201)
      .json({ message: 'Complaint submitted successfully', newComplaint });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 📌 Resolve a complaint (Faculty resolves a complaint)
exports.resolveComplaint = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if the complaint exists
    const complaint = await Complaint.findById(id);
    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }

    // Only assigned faculty or admin can resolve the complaint
    if (
      req.user.role !== 'admin' &&
      req.user.id !== complaint.faculty.toString()
    ) {
      return res
        .status(403)
        .json({ message: 'Unauthorized to resolve this complaint' });
    }

    complaint.status = 'Resolved';
    await complaint.save();

    res.json({ message: 'Complaint resolved successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 📌 Get all complaints (Admin sees all, Faculty sees assigned complaints)
exports.getComplaints = async (req, res) => {
  try {
    let complaints;

    if (req.user.role === 'admin') {
      complaints = await Complaint.find()
        .populate('user', 'name email')
        .populate('faculty', 'name email');
    } else if (req.user.role === 'faculty') {
      complaints = await Complaint.find({ faculty: req.user.id }).populate(
        'user',
        'name email'
      );
    } else {
      complaints = await Complaint.find({ user: req.user.id }).populate(
        'faculty',
        'name email'
      );
    }

    res.json(complaints);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 📌 Get complaints assigned to the logged-in Faculty
exports.getFacultyComplaints = async (req, res) => {
  try {
    if (req.user.role !== 'faculty') {
      return res.status(403).json({ message: 'Unauthorized access' });
    }

    const complaints = await Complaint.find({ faculty: req.user.id })
      .populate('user', 'name email')
      .sort({ createdAt: -1 });

    res.json(complaints);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.getComplaintById = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the complaint by ID and populate relevant fields
    const complaint = await Complaint.findById(id)
      .populate('user', 'name email')
      .populate('faculty', 'name email');

    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }

    // Ensure the user has permission to view the complaint
    if (
      req.user.role !== 'admin' &&
      req.user.id !== complaint.user._id.toString() &&
      req.user.id !== complaint.faculty._id.toString()
    ) {
      return res
        .status(403)
        .json({ message: 'Unauthorized to view this complaint' });
    }

    res.json(complaint);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
