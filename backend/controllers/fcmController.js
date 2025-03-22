const FCMToken = require('../models/fcmTokenModel');

exports.saveFCMToken = async (req, res) => {
  try {
    const { token } = req.body;
    const userId = req.user.id; // Ensure `req.user` is available from authMiddleware

    if (!token) {
      return res.status(400).json({ message: 'FCM token is required' });
    }

    let existingToken = await FCMToken.findOne({ userId });

    if (existingToken) {
      existingToken.token = token;
      await existingToken.save();
    } else {
      await FCMToken.create({ userId, token });
    }

    res.json({ message: 'FCM token saved successfully' });
  } catch (error) {
    console.error('Error saving FCM token:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
