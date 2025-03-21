import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CONFIG from '../config';
import { useNavigation } from '@react-navigation/native';

const ViewNotices = () => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      if (!token) {
        Alert.alert('Error', 'User not authenticated');
        return;
      }
  
      const response = await fetch(`${CONFIG.BASE_URL}/api/notices/all`, {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
      });
  
      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || 'Failed to fetch notices');
  
      setNotices(data);
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.header}>All Notices</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#007BFF" />
      ) : (
        <FlatList
          data={notices}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View style={styles.noticeCard}>
              <Text style={styles.noticeTitle}>{item.title}</Text>
              <Text style={styles.noticeContent}>{item.content}</Text>
              <Text style={styles.noticeMeta}>Category: {item.category}</Text>
              <Text style={styles.noticeMeta}>Author: {item.author}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  noticeCard: {
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderLeftWidth: 5,
    borderLeftColor: '#007BFF',
  },
  noticeTitle: { fontSize: 18, fontWeight: 'bold' },
  noticeContent: { fontSize: 14, marginVertical: 5 },
  noticeMeta: { fontSize: 12, color: 'gray' },
});

export default ViewNotices;
