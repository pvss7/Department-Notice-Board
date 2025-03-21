import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import CONFIG from '../config';

const ComplaintScreen = () => {
  const navigation = useNavigation();
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const fetchUserEmail = async () => {
      try {
        const email = await AsyncStorage.getItem('userEmail');
        if (email) {
          setUserEmail(email);
          fetchComplaints(email);
        }
      } catch (error) {
        console.error('Error fetching user email:', error);
      }
    };

    fetchUserEmail();
  }, []);

  const fetchComplaints = async (email) => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('authToken'); // Retrieve the token
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch(
        `${CONFIG.BASE_URL}/api/complaints?email=${email}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`, // Attach token
            'Content-Type': 'application/json',
          },
        }
      );

      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || 'Failed to fetch complaints');

      setComplaints(data);
    } catch (error) {
      console.error('Error fetching complaints:', error);
      Alert.alert('Error', 'Could not fetch complaints. Please try again.');
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>My Complaints</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#6200EE" />
      ) : complaints.length === 0 ? (
        <Text style={styles.noComplaints}>No complaints found.</Text>
      ) : (
        <FlatList
          data={complaints}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View style={styles.complaintCard}>
              <Text style={styles.complaintTitle}>{item.title}</Text>
              <Text style={styles.complaintText}>{item.description}</Text>
              <Text style={styles.status}>
                Status:{' '}
                <Text style={{ fontWeight: 'bold' }}>{item.status}</Text>
              </Text>

              {/* Show resolution message only for resolved complaints */}
              {item.status === 'Resolved' && item.resolutionMessage && (
                <Text style={styles.resolutionMessage}>
                  Resolution: {item.resolutionMessage}
                </Text>
              )}
            </View>
          )}
        />
      )}

      {/* Floating Add Complaint Button */}
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => navigation.navigate('AddComplaint')}
      >
        <Ionicons name="add" size={30} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#333',
  },
  noComplaints: {
    textAlign: 'center',
    fontSize: 16,
    color: '#888',
    marginTop: 20,
  },
  complaintCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 3,
  },
  complaintTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  complaintText: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  status: {
    fontSize: 14,
    color: '#6200EE',
    marginTop: 8,
  },
  resolutionMessage: {
    fontSize: 14,
    color: 'green',
    marginTop: 5,
    fontWeight: 'bold',
  },
  floatingButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#6200EE',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
});

export default ComplaintScreen;
