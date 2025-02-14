import React from 'react';
import { View, Text, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const StudentDashboard = () => {
  const navigation = useNavigation();

  const handleLogout = async () => {
    await AsyncStorage.clear();
    navigation.replace('Login');
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>
        Student Dashboard
      </Text>
      <Text>Welcome, Student!</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

export default StudentDashboard;
