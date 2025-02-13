const Notice = require('../models/Notice');

exports.createNotice = async (req, res) => {
  try {
    const { title, content, category } = req.body;
    const newNotice = new Notice({
      title,
      content,
      category,
      createdBy: req.user.id,
    });
    await newNotice.save();
    res.status(201).json({ message: 'Notice created successfully', newNotice });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteNotice = async (req, res) => {
  try {
    const { id } = req.params;
    await Notice.findByIdAndDelete(id);
    res.json({ message: 'Notice deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getNotices = async (req, res) => {
  try {
    const notices = await Notice.find();
    res.json(notices);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
