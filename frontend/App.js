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
      </Stack.Navigator>
    </NavigationContainer>
  );
}
