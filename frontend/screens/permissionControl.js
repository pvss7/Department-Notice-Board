import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CONFIG from '../config';

const PermissionControl = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('authToken');
      console.log('Fetching students with token:', token);
  
      const response = await fetch(`${CONFIG.BASE_URL}/api/user/students`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
  
      console.log('Response status:', response.status);
      const text = await response.text();
      console.log('Raw response:', text);
  
      const data = JSON.parse(text);
      if (response.ok) {
        setStudents(data);
      } else {
        console.error('Error fetching students:', data.message);
      }
    } catch (error) {
      console.error('Fetch Error:', error);
    }
    setLoading(false);
  };
  
  

  const togglePermission = async (studentId, currentPermission) => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      if (!token) {
        console.error('No authentication token found');
        return;
      }

      const endpoint = currentPermission
        ? `${CONFIG.BASE_URL}/api/user/revoke-notice-permission/${studentId}`
        : `${CONFIG.BASE_URL}/api/user/grant-notice-permission/${studentId}`;

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (response.ok) {
        setStudents((prevStudents) =>
          prevStudents.map((student) =>
            student._id === studentId ? { ...student, canAddNotices: !currentPermission } : student
          )
        );
      } else {
        console.error('Error updating permission:', data.message);
      }
    } catch (error) {
      console.error('Error updating permission:', error);
    }
  };

  const renderStudentItem = ({ item }) => (
    <View style={styles.studentCard}>
      <Text style={styles.studentName}>{item.name}</Text>
      <TouchableOpacity
        style={[styles.toggleButton, item.canAddNotices ? styles.granted : styles.revoked]}
        onPress={() => togglePermission(item._id, item.canAddNotices)}
      >
        <Text style={styles.toggleText}>{item.canAddNotices ? 'Revoke' : 'Grant'}</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Permission Control</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#007BFF" />
      ) : (
        <FlatList
          data={students}
          keyExtractor={(item) => item._id}
          renderItem={renderStudentItem}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#f4f4f4',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
    color: '#333',
  },
  studentCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 3,
  },
  studentName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  toggleButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  granted: {
    backgroundColor: '#e74c3c',
  },
  revoked: {
    backgroundColor: '#2ecc71',
  },
  toggleText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default PermissionControl;
