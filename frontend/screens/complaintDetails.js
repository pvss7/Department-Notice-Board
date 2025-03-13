import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  Alert,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CONFIG from '../config';

const ComplaintDetails = ({ route, navigation }) => {
  const { complaintId } = route.params;
  const [complaint, setComplaint] = useState(null);
  const [loading, setLoading] = useState(true);
  const [resolving, setResolving] = useState(false);

  useEffect(() => {
    fetchComplaintDetails();
  }, []);

  const fetchComplaintDetails = async () => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      const response = await fetch(
        `${CONFIG.BASE_URL}/api/complaints/${complaintId}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const data = await response.json();
      console.log('Complaint Details API Response:', data);

      if (!response.ok)
        throw new Error(data.message || 'Failed to fetch complaint details');

      setComplaint(data);
    } catch (error) {
      console.error('Fetch Complaint Details Error:', error);
      Alert.alert(
        'Error',
        error.message || 'Failed to load complaint details.'
      );
    } finally {
      setLoading(false);
    }
  };

  const resolveComplaint = async () => {
    try {
      setResolving(true);
      const token = await AsyncStorage.getItem('authToken');
      const response = await fetch(
        `${CONFIG.BASE_URL}/api/complaints/${complaintId}/resolve`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ status: 'Resolved' }),
        }
      );

      const data = await response.json();
      console.log('Resolve Complaint API Response:', data);

      if (!response.ok)
        throw new Error(data.message || 'Failed to resolve complaint');

      setComplaint((prev) => ({ ...prev, status: 'Resolved' }));
      Alert.alert('Success', 'Complaint marked as resolved.');
    } catch (error) {
      console.error('Resolve Complaint Error:', error);
      Alert.alert('Error', error.message || 'Could not resolve complaint.');
    } finally {
      setResolving(false);
    }
  };

  if (loading) {
    return (
      <ActivityIndicator size="large" color="#6200EE" style={styles.loader} />
    );
  }

  if (!complaint) {
    return <Text style={styles.errorText}>Complaint not found.</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>{complaint.title}</Text>
        <Text style={styles.description}>{complaint.description}</Text>

        <View
          style={[
            styles.statusContainer,
            complaint.status === 'Resolved'
              ? styles.resolvedBadge
              : styles.pendingBadge,
          ]}
        >
          <Text style={styles.statusText}>{complaint.status}</Text>
        </View>

        <Text style={styles.userInfo}>
          Submitted by: {complaint.user.name} ({complaint.user.email})
        </Text>

        {complaint.status !== 'Resolved' && (
          <TouchableOpacity
            style={styles.resolveButton}
            onPress={resolveComplaint}
            disabled={resolving}
          >
            <Text style={styles.buttonText}>
              {resolving ? 'Resolving...' : 'Mark as Resolved'}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2',
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 12,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: '#555',
    marginBottom: 12,
  },
  statusContainer: {
    alignSelf: 'flex-start',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginBottom: 12,
  },
  resolvedBadge: {
    backgroundColor: '#28A745',
  },
  pendingBadge: {
    backgroundColor: '#FFA500',
  },
  statusText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  userInfo: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
  },
  resolveButton: {
    backgroundColor: '#6200EE',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#FF0000',
    marginTop: 20,
  },
});

export default ComplaintDetails;
