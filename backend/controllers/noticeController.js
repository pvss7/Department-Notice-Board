const Notice = require('../models/notice');

exports.createNotice = async (req, res) => {
  try {
    const { title, content, category, year, sections, fileUrl } = req.body;

    // Ensure required fields are present
    if (!title || !content || !category) {
      return res
        .status(400)
        .json({ message: 'Title, content, and category are required' });
    }

    // Validate year & section for Section-Specific Notices
    let finalSections = null;
    if (category === 'Class') {
      if (!year)
        return res
          .status(400)
          .json({ message: 'Year is required for section-specific notices' });
      if (!sections || !Array.isArray(sections))
        return res.status(400).json({ message: 'Sections must be an array' });

      finalSections = sections.includes('All')
        ? ['A', 'B', 'C', 'D', 'E']
        : sections;
    }

    const newNotice = new Notice({
      title,
      content,
      category,
      year: category === 'Class' ? year : null,
      sections: category === 'Class' ? finalSections : null,
      fileUrl: fileUrl || null,
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
    const notice = await Notice.findById(id);

    if (!notice) return res.status(404).json({ message: 'Notice not found' });

    await Notice.findByIdAndDelete(id);
    res.json({ message: 'Notice deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getNotices = async (req, res) => {
  try {
    const { year, section } = req.query;
    let query = {};

    // Filter by year & section if provided
    if (year) query.year = year;
    if (section) query.sections = { $in: [section] };

    const notices = await Notice.find(query);
    res.json(notices);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
