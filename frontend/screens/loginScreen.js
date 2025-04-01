import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Image,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';
import CONFIG from '../config';
import { registerForPushNotificationsAsync } from '../utils/notifications'; // Import push notification function

const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password.');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('http://192.168.1.5:5002/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      console.log('Login Response:', data);

      if (!response.ok) throw new Error(data.message || 'Login failed');

      const { token, user } = data;

      // Store token and user info
      if (token) {
        await AsyncStorage.setItem('authToken', token);
        await AsyncStorage.setItem('userRole', user.role);
        await AsyncStorage.setItem('userEmail', user.email);
        await AsyncStorage.setItem('userId', user._id);

        console.log('Stored userEmail:', user.email);
        console.log('Stored Id:', user._id);

        if (user.role === 'student') {
          await AsyncStorage.setItem('studentYear', user.year || '');
          await AsyncStorage.setItem('studentSection', user.section || '');
          console.log('Stored Student Year:', user.year);
          console.log('Stored Student Section:', user.section);
        }

        // Verify stored userId
        const storedUserId = await AsyncStorage.getItem('userId');
        console.log('Retrieved User ID:', storedUserId);

        if (!storedUserId) {
          throw new Error('Failed to store User ID in AsyncStorage');
        }

        // Register for push notifications after login
        await registerForPushNotificationsAsync(user._id);

        // Navigate based on role
        if (user.role === 'admin') {
          navigation.replace('AdminDashboard');
        } else if (user.role === 'faculty') {
          navigation.replace('FacultyDashboard');
        } else {
          navigation.replace('StudentDashboard');
        }
      } else {
        throw new Error('No token received from server.');
      }
    } catch (error) {
      console.error('Login Error:', error);
      Alert.alert('Login Failed', error.message);
    }

    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/college-logo.jpg')}
        style={styles.logo}
        resizeMode="contain"
      />

      <Text style={styles.title}>Login</Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        placeholderTextColor="#555"
      />

      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
        placeholderTextColor="#555"
      />

      <TouchableOpacity onPress={handleLogin} style={styles.button}>
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Login</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('Register')}
        style={styles.registerLink}
      >
        <Text style={styles.registerText}>Don't have an account? Register</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  logo: {
    width: 150,
    height: 135,
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#6200EE',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  registerLink: {
    marginTop: 20,
  },
  registerText: {
    color: '#6200EE',
  },
});

export default LoginScreen;
