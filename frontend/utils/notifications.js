import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Alert, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CONFIG from '../config';

// API endpoint to send token to backend
const API_URL = `${CONFIG.BASE_URL}/api/expo-push/save-token`;

// Configure notification handling behavior
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

// Function to request permission and get Expo Push Token
export async function registerForPushNotificationsAsync(userId) {
  let token;

  if (!Device.isDevice) {
    Alert.alert('Error', 'Must use a physical device for push notifications.');
    return;
  }

  console.log('🔍 Checking existing notification permissions...');
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  console.log('📌 Existing permission status:', existingStatus);

  let finalStatus = existingStatus;
  if (existingStatus !== 'granted') {
    console.log('🔄 Requesting notification permissions...');
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  console.log('📌 Final permission status:', finalStatus);
  if (finalStatus !== 'granted') {
    Alert.alert('Permission Required', 'Push notifications need permission to work.');
    return;
  }

  console.log('✅ Permission granted! Fetching Expo Push Token...');

  // 🔍 Log before fetching the token
  try {
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log('📌 Expo Push Token Retrieved:', token);
  } catch (error) {
    console.error('❌ Error fetching Expo Push Token:', error);
    return;
  }

  // 🔍 Prevent sending null token
  if (!token) {
    console.error('❌ Expo Push Token is null, skipping backend request.');
    return;
  }

  // Send the token to the backend
  await sendTokenToBackend(userId, token);

  if (Platform.OS === 'android') {
    console.log('📌 Setting up Android notification channel...');
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }
}


async function sendTokenToBackend(userId, token) {
  try {
    const authToken = await AsyncStorage.getItem('authToken');

    if (!authToken) {
      console.error('❌ No auth token found');
      return;
    }

    if (!token) {
      console.error('❌ Attempting to send a null push token to backend, skipping.');
      return;
    }

    console.log('📤 Sending Push Token to Backend:', token);

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`,
      },
      body: JSON.stringify({ userId, token }),  // Ensure `userId` is also sent
    });

    const data = await response.json();
    console.log('✅ Push Token Response from Backend:', data);
  } catch (error) {
    console.error('🔥 Error saving push token:', error);
  }
}

  

// Function to listen for incoming notifications
export function setupNotificationListeners() {
  Notifications.addNotificationReceivedListener((notification) => {
    console.log('Notification Received:', notification);
  });

  Notifications.addNotificationResponseReceivedListener((response) => {
    console.log('User interacted with notification:', response);
  });
}
