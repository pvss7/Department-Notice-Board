import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as DocumentPicker from 'expo-document-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CONFIG from '../config';
import axios from 'axios';

const AddNotice = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('General');
  const [year, setYear] = useState('');
  const [sections, setSections] = useState([]);
  const [allSections, setAllSections] = useState(false);
  const [file, setFile] = useState(null);
  const [fileUploading, setFileUploading] = useState(false);
  const [fileUrl, setFileUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);
  const [userEmail, setUserEmail] = useState(null);

  const availableYears = ['1st Year', '2nd Year', '3rd Year', '4th Year'];
  const availableSections = ['A', 'B', 'C', 'D', 'E'];

  useEffect(() => {
    const fetchAuthData = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('authToken');
        const storedRole = await AsyncStorage.getItem('userRole');
        const storedEmail = await AsyncStorage.getItem('userEmail');

        if (storedEmail) setUserEmail(storedEmail);
        if (storedToken) setToken(storedToken);
        if (storedRole) setRole(storedRole);
      } catch (error) {
        console.error('Error retrieving auth data:', error);
      }
    };
    fetchAuthData();
  }, []);

  const handleSectionToggle = (section) => {
    setSections((prevSections) =>
      prevSections.includes(section)
        ? prevSections.filter((s) => s !== section)
        : [...prevSections, section]
    );
  };

  const handleAllSectionsToggle = () => {
    setAllSections(!allSections);
    setSections(!allSections ? availableSections : []);
  };

  const handleFilePick = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      type: '*/*',
      copyToCacheDirectory: true,
    });

    if (result.canceled) {
      console.log('🚨 No file selected!');
      return;
    }

    const fileData = result.assets[0];

    setFile(fileData);
    await uploadFileToServer(fileData);
  };

  const uploadFileToServer = async (file) => {
    try {
      setFileUploading(true);

      if (!file || !file.uri) {
        console.error('🚨 No file selected!');
        Alert.alert('Error', 'No file selected!');
        setFileUploading(false);
        return;
      }

      const formData = new FormData();
      formData.append('file', {
        uri: file.uri,
        name: file.name || 'upload.jpg',
        type: file.mimeType || 'application/octet-stream',
      });

      const response = await fetch(`${CONFIG.BASE_URL}/api/notices/upload`, {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
          Accept: 'application/json',
        },
      });

      const data = await response.json();

      if (response.ok && data.fileUrl) {
        setFileUrl(data.fileUrl);
        Alert.alert('Success', 'File uploaded successfully.');
      } else {
        throw new Error(data.message || 'Upload failed.');
      }
    } catch (error) {
      console.error('🚨 Upload error:', error.message);
      Alert.alert('Error', 'File upload failed. See logs for details.');
    } finally {
      setFileUploading(false);
    }
  };

  const handleSubmit = async () => {
    if (!title || !content) {
      Alert.alert('Error', 'Please fill in all required fields.');
      return;
    }

    if (!token) {
      Alert.alert(
        'Error',
        'Authentication token not found. Please log in again.'
      );
      return;
    }

    if (!userEmail) {
      Alert.alert('Error', 'User email not found. Please log in again.');
      return;
    }

    setLoading(true);

    const noticeData = {
      title,
      content,
      category,
      year: category === 'Class' ? year : null,
      sections:
        category === 'Class'
          ? allSections
            ? availableSections
            : sections
          : null,
      fileUrl: fileUrl || null,
      author: userEmail,
    };
    console.log('Notice Data Being Sent:', JSON.stringify(noticeData, null, 2));
    try {
      const response = await fetch(`${CONFIG.BASE_URL}/api/notices`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(noticeData),
      });

      const data = await response.json();
      console.log('Add Notice Response:', data);

      if (!response.ok) throw new Error(data.message || 'Failed to add notice');

      Alert.alert('Success', 'Notice added successfully.');
      setTitle('');
      setContent('');
      setCategory('General');
      setYear('');
      setSections([]);
      setAllSections(false);
      setFile(null);
      setFileUrl(null);
    } catch (error) {
      Alert.alert('Error', error.message);
    }

    setLoading(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.label}>Title</Text>
        <TextInput style={styles.input} value={title} onChangeText={setTitle} />

        <Text style={styles.label}>Content</Text>
        <TextInput
          style={[styles.input, { height: 100 }]}
          value={content}
          onChangeText={setContent}
          multiline
        />

        <Text style={styles.label}>Category</Text>
        <Picker
          selectedValue={category}
          onValueChange={setCategory}
          style={styles.picker}
        >
          <Picker.Item label="General" value="General" />
          <Picker.Item label="Section-Specific" value="Class" />
          <Picker.Item label="Event" value="Event" />
        </Picker>

        {category === 'Class' && (
          <>
            <Text style={styles.label}>Select Year</Text>
            <Picker
              selectedValue={year}
              onValueChange={setYear}
              style={styles.picker}
            >
              {availableYears.map((yr) => (
                <Picker.Item key={yr} label={yr} value={yr} />
              ))}
            </Picker>

            <Text style={styles.label}>Select Sections</Text>
            <TouchableOpacity
              style={styles.checkboxContainer}
              onPress={handleAllSectionsToggle}
            >
              <Text style={styles.checkbox}>{allSections ? '✅' : '⬜'}</Text>
              <Text>All Sections</Text>
            </TouchableOpacity>

            {!allSections &&
              availableSections.map((sec) => (
                <TouchableOpacity
                  key={sec}
                  style={styles.checkboxContainer}
                  onPress={() => handleSectionToggle(sec)}
                >
                  <Text style={styles.checkbox}>
                    {sections.includes(sec) ? '✅' : '⬜'}
                  </Text>
                  <Text>Section {sec}</Text>
                </TouchableOpacity>
              ))}
          </>
        )}

        <TouchableOpacity
          style={styles.fileButton}
          onPress={handleFilePick}
          disabled={fileUploading}
        >
          {fileUploading ? (
            <ActivityIndicator color="#000" />
          ) : (
            <Text>{file ? `Selected: ${file.name}` : 'Attach File'}</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.submitText}>Submit Notice</Text>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: { flexGrow: 1, paddingBottom: 30 },
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  label: { fontSize: 16, fontWeight: 'bold', marginTop: 10 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginTop: 5,
  },
  picker: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginTop: 5,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  checkbox: { fontSize: 18, marginRight: 5 },
  fileButton: {
    backgroundColor: '#ddd',
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
    alignItems: 'center',
  },
  submitButton: {
    backgroundColor: '#007BFF',
    padding: 12,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  submitText: { color: '#fff', fontSize: 18 },
});

export default AddNotice;
