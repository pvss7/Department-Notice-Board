import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';

const WelcomeScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Animated Illustration */}
      <LottieView
        source={require('../assets/welcome.json')} // Add an animation file inside assets
        autoPlay
        loop
        style={styles.animation}
      />

      <Text style={styles.title}>Welcome to Notice Board</Text>
      <Text style={styles.subtitle}>
        Stay updated with notices and manage complaints effortlessly!
      </Text>

      {/* Buttons for Navigation */}
      <Button
        mode="contained"
        style={styles.button}
        onPress={() => navigation.navigate('Login')}
      >
        Login
      </Button>

      <Button
        mode="outlined"
        style={styles.button}
        onPress={() => navigation.navigate('Register')}
      >
        Sign Up
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  animation: { width: 250, height: 250, marginBottom: 20 },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: 'gray',
    marginBottom: 30,
  },
  button: { width: '80%', marginVertical: 8 },
});

export default WelcomeScreen;
