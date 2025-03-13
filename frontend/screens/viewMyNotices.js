import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, Alert } from 'react-native';
import { Card } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CONFIG from '../config';

const ViewMyNotices = () => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyNotices();
  }, []);

  const fetchMyNotices = async () => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      const userEmail = await AsyncStorage.getItem('userEmail'); // Fetch email
      const userRole = await AsyncStorage.getItem('userRole'); // Fetch role

      console.log('Retrieved User Email:', userEmail);
      console.log('Retrieved User Role:', userRole);

      // Validate authentication & role
      if (!token) {
        throw new Error('Authentication token missing. Please log in again.');
      }
      if (!userEmail) {
        throw new Error('User email not found in storage.');
      }
      if (userRole !== 'faculty') {
        throw new Error('Access Denied: Only faculty can view notices.');
      }

      const response = await fetch(
        `${CONFIG.BASE_URL}/api/notices/my-notices?author=${encodeURIComponent(
          userEmail
        )}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const data = await response.json();
      console.log('My Notices:', data);

      if (!response.ok)
        throw new Error(data.message || 'Failed to fetch notices');

      setNotices(data);
    } catch (error) {
      console.error('Error fetching notices:', error);
      Alert.alert('Error', error.message || 'Failed to load notices.');
    } finally {
      setLoading(false);
    }
  };

  const renderNoticeItem = ({ item }) => (
    <Card style={{ margin: 10, padding: 10 }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.title}</Text>
      <Text>{item.content}</Text>
      <Text>Category: {item.category}</Text>
      <Text>Date: {new Date(item.createdAt).toLocaleDateString()}</Text>
    </Card>
  );

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 10 }}>
        My Published Notices
      </Text>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : notices.length === 0 ? (
        <Text>No notices found.</Text>
      ) : (
        <FlatList
          data={notices}
          keyExtractor={(item) => item._id}
          renderItem={renderNoticeItem}
        />
      )}
    </View>
  );
};

export default ViewMyNotices;
