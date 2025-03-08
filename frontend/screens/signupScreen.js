import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Switch,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import CONFIG from '../config'; // Adjust the path if needed

const SignupScreen = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [year, setYear] = useState('');
  const [section, setSection] = useState('');
  const [isFaculty, setIsFaculty] = useState(false); // Toggle for Faculty
  const [loading, setLoading] = useState(false);

  // Section options based on year
  const getSectionOptions = () => {
    if (year === '1' || year === '2')
      return ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
    if (year === '3') return ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
    if (year === '4') return ['A', 'B', 'C', 'D', 'E'];
    return [];
  };

  const handleRegister = async () => {
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Confirm Password:', confirmPassword);
    console.log('isFaculty:', isFaculty);
    console.log('Year:', year);
    console.log('Section:', section);

    if (!name || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'All fields are required!');
      console.log('Error: Missing required fields');
      return;
    }

    if (!isFaculty && (!year || !section)) {
      Alert.alert('Error', 'Year and Section are required for students!');
      console.log('Error: Year or Section missing for student');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match!');
      console.log('Error: Password mismatch');
      return;
    }

    const userData = {
      name,
      email,
      password,
      role: isFaculty ? 'faculty' : 'student',
    };

    if (!isFaculty) {
      userData.year = year;
      userData.section = section;
    } else {
      console.log('Faculty registration - not adding year and section');
    }

    setLoading(true);
    try {
      console.log('Sending userData:', JSON.stringify(userData));
      const response = await fetch(`${CONFIG.BASE_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      console.log('Response received:', data);

      if (!response.ok) throw new Error(data.message || 'Registration failed');

      Alert.alert('Success', 'Account created successfully!');
      console.log('Registration successful');
      navigation.replace('Login');
    } catch (error) {
      Alert.alert('Error', error.message);
      console.log('Registration failed:', error.message);
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>

      <TextInput
        placeholder="Full Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <TextInput
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        style={styles.input}
      />

      {/* Faculty Toggle */}
      <View style={styles.toggleContainer}>
        <Text style={styles.toggleText}>Register as Faculty</Text>
        <Switch
          value={isFaculty}
          onValueChange={(value) => {
            setIsFaculty(value);
            if (value) {
              setYear('');
              setSection('');
            }
          }}
        />
      </View>

      {/* Year & Section Pickers (Only for Students) */}
      {!isFaculty && (
        <>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={year}
              onValueChange={(itemValue) => {
                setYear(itemValue);
                setSection('');
              }}
              style={styles.picker}
            >
              <Picker.Item label="Select Year" value="" />
              <Picker.Item label="1st Year" value="1" />
              <Picker.Item label="2nd Year" value="2" />
              <Picker.Item label="3rd Year" value="3" />
              <Picker.Item label="4th Year" value="4" />
            </Picker>
          </View>

          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={section}
              onValueChange={(itemValue) => setSection(itemValue)}
              style={styles.picker}
              enabled={year !== ''}
            >
              <Picker.Item label="Select Section" value="" />
              {getSectionOptions().map((sec) => (
                <Picker.Item key={sec} label={sec} value={sec} />
              ))}
            </Picker>
          </View>
        </>
      )}

      <TouchableOpacity onPress={handleRegister} style={styles.button}>
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Register</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('Login')}
        style={styles.loginRedirect}
      >
        <Text style={styles.loginRedirectText}>
          Already have an account? Login
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#F9F9F9',
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#FFF',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2, // For Android shadow effect
  },
  pickerContainer: {
    width: '100%',
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  picker: {
    width: '100%',
    height: 50,
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 12,
    paddingHorizontal: 10,
  },
  toggleText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#6200EE',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 10,
    shadowColor: '#6200EE',
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 4,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '500',
  },
  loginRedirect: {
    marginTop: 20,
  },
  loginRedirectText: {
    color: '#6200EE',
    fontSize: 16,
  },
};

export default SignupScreen;
