import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  registerForPushNotificationsAsync,
  setupNotificationListeners,
} from './utils/notifications';
import { AsyncStorage } from '@react-native-async-storage/async-storage';
import WelcomeScreen from './screens/welcomeScreen';
import LoginScreen from './screens/loginScreen';
import SignupScreen from './screens/signupScreen';
import HomeScreen from './screens/homeScreen';
import AdminDashboard from './screens/adminDashboard';
import FacultyDashboard from './screens/facultyDashboard';
import StudentDashboard from './screens/studentDashboard';
import AddNotice from './screens/addNotice';
import NoticeScreen from './screens/noticeScreen';
import ComplaintScreen from './screens/complaintScreen';
import AddComplaint from './screens/addComplaint';
import ViewComplaints from './screens/viewComplaints';
import ViewAllComplaints from './screens/viewAllComplaints';
import ViewMyNotices from './screens/viewMyNotices';
import ViewNotices from './screens/viewNotices';
import ComplaintDetails from './screens/complaintDetails';
import PermissionControl from './screens/permissionControl';
import AllStudentNotices from './screens/allStudentNotices';
import FacultyInformation from './screens/facultyInformation';
import ResourcesScreen from './screens/resourcesScreen';
import BusRoutes from './screens/busRoutes';

const Stack = createStackNavigator();

export default function App() {
  useEffect(() => {
    async function setupNotifications() {
      const userId = await AsyncStorage.getItem('userId'); // Ensure userId is available
      if (userId) {
        await registerForPushNotificationsAsync(userId);
      } else {
        console.log('❌ No user ID found, skipping push token registration.');
      }
    }

    setupNotifications();
    setupNotificationListeners();
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={SignupScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="AdminDashboard" component={AdminDashboard} />
        <Stack.Screen name="FacultyDashboard" component={FacultyDashboard} />
        <Stack.Screen name="StudentDashboard" component={StudentDashboard} />
        <Stack.Screen name="AddNotice" component={AddNotice} />
        <Stack.Screen name="NoticeScreen" component={NoticeScreen} />
        <Stack.Screen name="ComplaintScreen" component={ComplaintScreen} />
        <Stack.Screen name="AddComplaint" component={AddComplaint} />
        <Stack.Screen name="ViewComplaints" component={ViewComplaints} />
        <Stack.Screen name="ViewAllComplaints" component={ViewAllComplaints} />
        <Stack.Screen name="ViewMyNotices" component={ViewMyNotices} />
        <Stack.Screen name="ViewNotices" component={ViewNotices} />
        <Stack.Screen name="ComplaintDetails" component={ComplaintDetails} />
        <Stack.Screen name="PermissionControl" component={PermissionControl} />
        <Stack.Screen name="AllStudentNotices" component={AllStudentNotices} />
        <Stack.Screen
          name="FacultyInformation"
          component={FacultyInformation}
        />
        <Stack.Screen name="ResourcesScreen" component={ResourcesScreen} />
        <Stack.Screen name="BusRoutes" component={BusRoutes} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
