const Complaint = require('../models/complaint');

exports.createComplaint = async (req, res) => {
  try {
    const { title, description } = req.body;
    const newComplaint = new Complaint({
      title,
      description,
      userId: req.user.id,
      status: 'pending',
    });

    await newComplaint.save();
    res
      .status(201)
      .json({ message: 'Complaint submitted successfully', newComplaint });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.resolveComplaint = async (req, res) => {
  try {
    const { id } = req.params;
    await Complaint.findByIdAndUpdate(id, { status: 'resolved' });
    res.json({ message: 'Complaint resolved successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find();
    res.json(complaints);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
