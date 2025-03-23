const { Expo } = require('expo-server-sdk');
const ExpoPushToken = require('../models/expoPushTokenModel');

let expo = new Expo();

exports.saveExpoPushToken = async (req, res) => {
  try {
    console.log('📩 Received request to save push token');

    const { token } = req.body;
    const userId = req.user?.id;

    console.log('📌 Received Token:', token);
    console.log('📌 Received User ID:', userId);

    if (!token) {
      console.error('❌ Push Token is missing, skipping database insertion.');
      return res.status(400).json({ message: 'Push token is required' });
    }

    if (!Expo.isExpoPushToken(token)) {
      console.error('❌ Invalid Expo Push Token:', token);
      return res.status(400).json({ message: 'Invalid Expo Push Token' });
    }

    // Check if this token already exists for the user
    let existingToken = await ExpoPushToken.findOne({ userId });

    if (existingToken) {
      existingToken.expoPushToken = token; // Update existing token
      await existingToken.save();
      console.log('✅ Updated existing push token');
    } else {
      await ExpoPushToken.create({ userId, expoPushToken: token });
      console.log('✅ New push token saved');
    }

    res.json({ message: 'Expo Push Token saved successfully' });

  } catch (error) {
    console.error('🔥 Error saving Expo Push Token:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};
