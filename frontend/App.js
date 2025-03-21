import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
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

const Stack = createStackNavigator();

export default function App() {
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
        <Stack.Screen name="PermissionControl" component={PermissionControl}/>
        <Stack.Screen name="AllStudentNotices" component={AllStudentNotices} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
