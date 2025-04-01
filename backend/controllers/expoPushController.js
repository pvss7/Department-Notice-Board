const { Expo } = require('expo-server-sdk');
const ExpoPushToken = require('../models/expoPushTokenModel');

let expo = new Expo();

exports.saveExpoPushToken = async (req, res) => {
  try {
    console.log('📩 Received request to save push token');

    // Log the EXACT request body for debugging
    console.log('📦 Full request body:', JSON.stringify(req.body));

    // NO destructuring - get the token directly
    const token = req.body.token;
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

    // First check if the token already exists
    try {
      const existingToken = await ExpoPushToken.findOne({
        expoPushToken: token,
      });

      if (existingToken) {
        console.log('ℹ️ Token already exists, skipping insertion:', token);
        return res.json({ message: 'Expo Push Token already exists' });
      }

      // Token doesn't exist, so save it
      await ExpoPushToken.findOneAndUpdate(
        { userId },
        {
          userId,
          expoPushToken: token,
        },
        { upsert: true, new: true }
      );

      console.log('✅ Token saved successfully for user:', userId);
      return res.json({ message: 'Expo Push Token saved successfully' });
    } catch (dbError) {
      console.error('💾 Database error:', dbError);
      throw dbError; // Re-throw to be caught by the outer catch
    }
  } catch (error) {
    console.error('🔥 Error saving Expo Push Token:', error);
    return res.status(500).json({
      message: 'Internal server error',
      error: error.message,
    });
  }
};
