import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DropDownPicker from 'react-native-dropdown-picker';
import CONFIG from '../config';

const AddComplaint = () => {
  const navigation = useNavigation();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [faculty, setFaculty] = useState(null);
  const [facultyList, setFacultyList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [facultyLoading, setFacultyLoading] = useState(true);
  const [open, setOpen] = useState(false); // State to control dropdown visibility

  useEffect(() => {
    fetchFacultyList();
  }, []);

  const fetchFacultyList = async () => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      const response = await fetch(`${CONFIG.BASE_URL}/api/user/faculty`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      console.log('Faculty API Response:', data); // Log API response for debugging

      if (!response.ok)
        throw new Error(data.message || 'Failed to fetch faculty list');
      if (!Array.isArray(data)) throw new Error('Invalid data format received');

      setFacultyList(
        data.map((faculty) => ({
          label: faculty.name,
          value: faculty._id,
        }))
      );
    } catch (error) {
      console.error('Fetch Faculty Error:', error); // Log error
      Alert.alert('Error', error.message || 'Failed to fetch faculty list.');
    } finally {
      setFacultyLoading(false);
    }
  };

  const submitComplaint = async () => {
    if (!title.trim() || !description.trim() || !faculty) {
      Alert.alert('Error', 'All fields are required.');
      return;
    }

    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('authToken');
      const response = await fetch(`${CONFIG.BASE_URL}/api/complaints`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, description, facultyId: faculty }),
      });

      const data = await response.json();
      console.log('Complaint Submission Response:', data); // Log complaint response

      if (!response.ok)
        throw new Error(data.message || 'Failed to submit complaint');

      Alert.alert('Success', 'Complaint submitted successfully.');
      navigation.goBack();
    } catch (error) {
      console.error('Submit Complaint Error:', error); // Log error
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Submit a Complaint</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter Title"
        value={title}
        onChangeText={setTitle}
      />

      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Describe your issue"
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <Text style={styles.label}>Select Faculty</Text>
      {facultyLoading ? (
        <ActivityIndicator size="small" color="#6200EE" />
      ) : (
        <DropDownPicker
          open={open}
          value={faculty}
          items={facultyList}
          setOpen={setOpen} // Ensure dropdown opens/closes
          setValue={setFaculty}
          placeholder="Select Faculty"
          containerStyle={{ marginBottom: 20 }}
        />
      )}

      <TouchableOpacity
        style={styles.submitButton}
        onPress={submitComplaint}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#FFF" />
        ) : (
          <Text style={styles.submitText}>Submit</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    fontSize: 16,
    elevation: 2,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: 'bold',
    color: '#333',
  },
  submitButton: {
    backgroundColor: '#6200EE',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  submitText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AddComplaint;
