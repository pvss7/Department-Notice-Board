import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  RefreshControl,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons } from '@expo/vector-icons';
import CONFIG from '../config';

const categoryColors = {
  General: '#3498db',
  Class: '#2ecc71',
  Event: '#e74c3c',
  Default: '#95a5a6',
};

const StudentDashboard = ({ navigation }) => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [canAddNotices, setCanAddNotices] = useState(false);

  useEffect(() => {
    fetchRecentNotices();
    checkNoticePermission();

    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={logoutHandler} style={styles.logoutButton}>
          <MaterialIcons name="logout" size={24} color="black" />
        </TouchableOpacity>
      ),
    });
  }, []);

  const fetchRecentNotices = async (isRefreshing = false) => {
    if (!isRefreshing) setLoading(true);
    else setRefreshing(true);

    try {
      const token = await AsyncStorage.getItem('authToken');
      const year = await AsyncStorage.getItem('studentYear');
      const section = await AsyncStorage.getItem('studentSection');

      if (!token || !year || !section) {
        console.error('Missing auth details or student info');
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
        setNotices(sortedNotices.slice(0, 5));
      } else {
        console.error('Error fetching notices:', data.message);
      }
    } catch (error) {
      console.error('Error fetching notices:', error);
    }

    if (!isRefreshing) setLoading(false);
    setRefreshing(false);
  };

  const checkNoticePermission = async () => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      const studentId = await AsyncStorage.getItem('userId');
      if (!token || !studentId) {
        console.error('Missing authentication details');
        return;
      }

      const response = await fetch(
        `${CONFIG.BASE_URL}/api/user/check-notice-permission/${studentId}`,
        {
          method: 'GET',
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const data = await response.json();
      if (response.ok) {
        setCanAddNotices(data.canAddNotices);
      } else {
        console.error('Error checking permission:', data.message);
      }
    } catch (error) {
      console.error('Error checking permission:', error);
    }
  };

  const logoutHandler = async () => {
    await AsyncStorage.removeItem('authToken');
    navigation.replace('Login');
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
          {
            backgroundColor:
              categoryColors[item.category] || categoryColors.Default,
          },
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
      <View style={styles.noticesContainer}>
        <Text style={styles.header}>Recent Notices</Text>
        {loading ? (
          <ActivityIndicator size="large" color="#007BFF" />
        ) : (
          <FlatList
            data={notices}
            keyExtractor={(item) => item._id}
            renderItem={renderNoticeItem}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={() => fetchRecentNotices(true)}
              />
            }
          />
        )}
        <TouchableOpacity
          onPress={() => navigation.navigate('AllStudentNotices')}
          style={styles.viewAllWrapper}
        >
          <Text style={styles.viewAllText}>View All</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.dashboardBlocks}>
        <View style={styles.row}>
          <DashboardBlock
            title="Faculty Information"
            onPress={() => navigation.navigate('FacultyInformation')}
          />
          <DashboardBlock
            title="Complaints"
            onPress={() => navigation.navigate('ComplaintScreen')}
          />
        </View>
        <View style={styles.row}>
          <DashboardBlock
            title="Resources"
            onPress={() => navigation.navigate('ResourcesScreen')}
          />
        </View>

        {canAddNotices && (
          <TouchableOpacity
            style={styles.addNoticeButton}
            onPress={() => navigation.navigate('AddNotice')}
          >
            <Text style={styles.addNoticeText}>Add Notice</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </View>
  );
};

const DashboardBlock = ({ title, onPress }) => (
  <TouchableOpacity style={styles.block} onPress={onPress}>
    <Text style={styles.blockText}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#f4f4f4',
  },
  noticesContainer: {
    flex: 0.6,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    elevation: 4,
    marginBottom: 10,
    paddingBottom: 30,
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
  viewAllWrapper: {
    position: 'absolute',
    bottom: 8,
    right: 15,
  },
  viewAllText: {
    color: '#007BFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  dashboardBlocks: {
    flex: 0.4,
    marginTop: 15,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  block: {
    width: '48%',
    height: 100,
    backgroundColor: '#FFF',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  blockText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#444',
  },
  addNoticeButton: {
    marginTop: 20,
    backgroundColor: '#007BFF',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  addNoticeText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  logoutButton: {
    marginRight: 15,
  },
});

export default StudentDashboard;
