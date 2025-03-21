const Notice = require('../models/notice');

exports.createNotice = async (req, res) => {
  console.log('Received Body:', req.body);
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
      author: req.body.author, // Ensure this is saved
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
    console.log('Received Query Params:', { year, section });

    if (!year || !section) {
      return res.status(400).json({ message: 'Year and section are required' });
    }

    // Convert numeric year into "1st Year", "2nd Year", etc.
    const yearMapping = {
      "1": "1st Year",
      "2": "2nd Year",
      "3": "3rd Year",
      "4": "4th Year"
    };

    const formattedYear = yearMapping[year]; // Convert received year to proper format
    if (!formattedYear) {
      return res.status(400).json({ message: 'Invalid year' });
    }

    let query = {
      $or: [
        { category: { $ne: 'Class' } }, // Fetch non-class notices (Events, General, etc.)
        { year: formattedYear, sections: section } // Fetch class-specific notices
      ]
    };

    console.log('MongoDB Query:', JSON.stringify(query, null, 2));

    const notices = await Notice.find(query).sort({ createdAt: -1 });
    console.log('Retrieved Notices:', notices);

    res.json(notices);
  } catch (error) {
    console.error('Error fetching notices:', error.message);
    res.status(500).json({ message: error.message });
  }
};


exports.getNoticesByFaculty = async (req, res) => {
  try {
    const { author } = req.query;

    if (!author) {
      return res.status(400).json({ message: 'Author email is required' });
    }

    const notices = await Notice.find({ author });

    if (!notices.length) {
      return res.status(404).json({ message: 'No notices found' });
    }

    res.json(notices);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.getAllNotices = async (req, res) => {
  try {
    console.log('📜 Fetching all notices...');
    const notices = await Notice.find().sort({ createdAt: -1 });
    res.json(notices);
  } catch (error) {
    console.error('Error fetching all notices:', error.message);
    res.status(500).json({ message: error.message });
  }
};

