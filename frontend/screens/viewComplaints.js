import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Alert,
  RefreshControl,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import CONFIG from '../config';

const ViewComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      const response = await fetch(
        `${CONFIG.BASE_URL}/api/complaints/faculty`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const data = await response.json();
      console.log('Complaints API Response:', data);

      if (!response.ok)
        throw new Error(data.message || 'Failed to fetch complaints');

      setComplaints(data);
    } catch (error) {
      console.error('Fetch Complaints Error:', error);
      Alert.alert('Error', error.message || 'Failed to load complaints.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchComplaints();
  }, []);

  const getStatusStyle = (status) => {
    return status === 'Resolved' ? styles.blockResolved : styles.blockPending;
  };

  const renderComplaint = ({ item }) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('ComplaintDetails', { complaintId: item._id })
      }
      style={[styles.complaintBlock, getStatusStyle(item.status)]}
    >
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description} numberOfLines={2}>
        {item.description}
      </Text>
      <Text style={styles.status}>Status: {item.status}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Complaints</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#6200EE" style={styles.loader} />
      ) : complaints.length === 0 ? (
        <Text style={styles.emptyMessage}>No complaints received.</Text>
      ) : (
        <FlatList
          data={complaints}
          keyExtractor={(item) => item._id}
          renderItem={renderComplaint}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    padding: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
    color: '#333',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyMessage: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
    marginTop: 20,
  },
  complaintBlock: {
    width: '100%',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  blockPending: {
    backgroundColor: '#FFA500', // Orange for Pending
  },
  blockResolved: {
    backgroundColor: '#28A745', // Green for Resolved
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 5,
  },
  description: {
    fontSize: 16,
    color: '#FFF',
    marginBottom: 5,
  },
  status: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFF',
  },
});

export default ViewComplaints;
