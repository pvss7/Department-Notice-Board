import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CONFIG from '../config';

const categoryColors = {
  General: '#3498db',
  Class: '#2ecc71',
  Event: '#e74c3c',
  Default: '#95a5a6',
};

const AllStudentNotices = ({ navigation }) => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAllNotices();
  }, []);

  const fetchAllNotices = async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('authToken');
      const year = await AsyncStorage.getItem('studentYear');
      const section = await AsyncStorage.getItem('studentSection');

      if (!token || !year || !section) {
        console.error("Missing auth details or student info");
        return;
      }

      const response = await fetch(
        `${CONFIG.BASE_URL}/api/notices?year=${year}&section=${section}`,
        {
          method: 'GET',
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const data = await response.json();
      if (response.ok) {
        const sortedNotices = data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setNotices(sortedNotices);
      } else {
        console.error("Error fetching notices:", data.message);
      }
    } catch (error) {
      console.error("Error fetching notices:", error);
    }
    setLoading(false);
  };

  const handleNoticePress = (notice) => {
    navigation.navigate('NoticeScreen', { notice });
  };

  const renderNoticeItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => handleNoticePress(item)}
      activeOpacity={0.7}
    >
      <View
        style={[
          styles.noticeCard,
          { backgroundColor: categoryColors[item.category] || categoryColors.Default },
        ]}
      >
        <Text style={styles.noticeTitle}>{item.title}</Text>
        <Text style={styles.noticeContent} numberOfLines={2}>
          {item.content}
        </Text>
        <Text style={styles.noticeCategory}>Category: {item.category}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>All Notices</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#007BFF" />
      ) : (
        <FlatList
          data={notices}
          keyExtractor={(item) => item._id}
          renderItem={renderNoticeItem}
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
    marginBottom: 10,
    textAlign: 'center',
    color: '#333',
  },
  noticeCard: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  noticeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  noticeContent: {
    fontSize: 14,
    color: '#f0f0f0',
    marginTop: 5,
  },
  noticeCategory: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#f8f9fa',
    marginTop: 5,
  },
});

export default AllStudentNotices;
