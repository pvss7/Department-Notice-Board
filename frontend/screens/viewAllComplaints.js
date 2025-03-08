import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, Alert } from 'react-native';
import { Card } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CONFIG from '../config';

const ViewAllComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllComplaints();
  }, []);

  const fetchAllComplaints = async () => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      const response = await fetch(`${CONFIG.BASE_URL}/api/complaints`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      console.log('Admin Complaints:', data);

      if (!response.ok)
        throw new Error(data.message || 'Failed to fetch complaints');

      setComplaints(data);
    } catch (error) {
      console.error('Error fetching complaints:', error);
      Alert.alert('Error', error.message || 'Failed to load complaints.');
    } finally {
      setLoading(false);
    }
  };

  const renderComplaintItem = ({ item }) => (
    <Card style={{ margin: 10, padding: 10 }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.title}</Text>
      <Text>{item.description}</Text>
      <Text>Status: {item.status}</Text>
      <Text>
        Submitted By: {item.user?.name} ({item.user?.email})
      </Text>
      <Text>Assigned To: {item.faculty?.name || 'Not Assigned'}</Text>
    </Card>
  );

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 10 }}>
        All Complaints
      </Text>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : complaints.length === 0 ? (
        <Text>No complaints available.</Text>
      ) : (
        <FlatList
          data={complaints}
          keyExtractor={(item) => item._id}
          renderItem={renderComplaintItem}
        />
      )}
    </View>
  );
};

export default ViewAllComplaints;
