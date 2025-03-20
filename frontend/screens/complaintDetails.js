import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  StyleSheet,
  Alert,
} from 'react-native';
import {
  ActivityIndicator,
  Card,
  Text,
  Button,
  TextInput,
  Divider,
  Surface,
} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CONFIG from '../config';

const ComplaintDetails = ({ route, navigation }) => {
  const { complaintId } = route.params;
  const [complaint, setComplaint] = useState(null);
  const [loading, setLoading] = useState(true);
  const [resolving, setResolving] = useState(false);
  const [resolutionMessage, setResolutionMessage] = useState('');

  useEffect(() => {
    fetchComplaintDetails();
  }, []);

  const fetchComplaintDetails = async () => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      const response = await fetch(`${CONFIG.BASE_URL}/api/complaints/${complaintId}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Failed to fetch complaint details');

      setComplaint(data);
      setResolutionMessage(data.resolutionMessage || ''); // Ensure resolution message is set if present
    } catch (error) {
      Alert.alert('Error', error.message || 'Failed to load complaint details.');
    } finally {
      setLoading(false);
    }
  };

  const resolveComplaint = async () => {
    try {
      if (!resolutionMessage.trim()) {
        Alert.alert('Error', 'Please enter a resolution message.');
        return;
      }
  
      setResolving(true);
      const token = await AsyncStorage.getItem('authToken');
      
      const response = await fetch(`${CONFIG.BASE_URL}/api/complaints/${complaintId}/resolve`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ resolutionMessage: resolutionMessage.trim() }), // Ensure trimmed message is sent
      });
  
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Failed to resolve complaint');
  
      setComplaint((prev) => ({
        ...prev,
        status: 'Resolved',
        resolutionMessage: data.resolutionMessage || resolutionMessage, // Ensure UI updates
      }));
  
      Alert.alert('Success', 'Complaint marked as resolved.');
    } catch (error) {
      Alert.alert('Error', error.message || 'Could not resolve complaint.');
    } finally {
      setResolving(false);
    }
  };
  
  if (loading) {
    return <ActivityIndicator size="large" style={styles.loader} />;
  }

  if (!complaint) {
    return <Text style={styles.errorText}>Complaint not found.</Text>;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Card style={styles.card} elevation={3}>
        <Card.Title title={complaint.title} titleStyle={styles.title} />
        <Card.Content>
          <Text style={styles.description}>{complaint.description}</Text>
          <Divider style={styles.divider} />

          <Surface style={styles.infoBox}>
            <Text style={styles.userInfo}>
              <Text style={styles.boldText}>Submitted by: </Text>
              {complaint.user.name} ({complaint.user.email})
            </Text>
            <Text style={[styles.status, complaint.status === 'Resolved' ? styles.resolved : styles.pending]}>
              {complaint.status}
            </Text>
          </Surface>

          {complaint.status !== 'Resolved' && (
            <>
              <Text style={styles.label}>Resolution Message</Text>
              <TextInput
                mode="outlined"
                placeholder="Enter your message..."
                value={resolutionMessage}
                onChangeText={setResolutionMessage}
                multiline
                style={styles.input}
              />
              <Button
                mode="contained"
                onPress={resolveComplaint}
                loading={resolving}
                style={styles.resolveButton}
              >
                {resolving ? 'Resolving...' : 'Mark as Resolved'}
              </Button>
            </>
          )}

          {complaint.status === 'Resolved' && complaint.resolutionMessage ? (
            <Surface style={styles.resolutionBox}>
              <Text style={styles.resolutionLabel}>Resolution Message:</Text>
              <Text style={styles.resolutionText}>{complaint.resolutionMessage}</Text>
            </Surface>
          ) : null}
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#F5F5F5',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 16,
    marginVertical: 10,
    color: '#555',
  },
  divider: {
    marginVertical: 10,
  },
  infoBox: {
    padding: 10,
    backgroundColor: '#E3F2FD',
    borderRadius: 8,
    marginBottom: 10,
  },
  userInfo: {
    fontSize: 14,
    color: '#333',
  },
  boldText: {
    fontWeight: 'bold',
  },
  status: {
    marginTop: 5,
    fontWeight: 'bold',
    textAlign: 'right',
  },
  resolved: {
    color: '#2E7D32',
  },
  pending: {
    color: '#D32F2F',
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  resolveButton: {
    marginTop: 10,
    borderRadius: 8,
  },
  resolutionBox: {
    marginTop: 15,
    padding: 12,
    backgroundColor: '#E8F5E9',
    borderRadius: 8,
  },
  resolutionLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  resolutionText: {
    fontSize: 14,
    color: '#333',
  },
  loader: {
    flex: 1,
    alignSelf: 'center',
    marginTop: 50,
  },
  errorText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: 'red',
  },
});

export default ComplaintDetails;
