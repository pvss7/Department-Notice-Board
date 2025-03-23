import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons } from '@expo/vector-icons';

const FacultyDashboard = () => {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={logoutHandler} style={styles.logoutButton}>
          <MaterialIcons name="logout" size={24} color="black" />
        </TouchableOpacity>
      ),
    });
  }, []);

  const logoutHandler = async () => {
    await AsyncStorage.removeItem('authToken');
    navigation.replace('Login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Faculty Dashboard</Text>

      {/* Add Notice */}
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('AddNotice')}
      >
        <LottieView
          source={require('../assets/add.json')}
          autoPlay
          loop
          style={styles.lottie}
        />
        <Text style={styles.cardText}>Add Notice</Text>
      </TouchableOpacity>

      {/* View My Notices */}
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('ViewMyNotices')}
      >
        <LottieView
          source={require('../assets/my_notices.json')}
          autoPlay
          loop
          style={styles.lottie}
        />
        <Text style={styles.cardText}>View My Notices</Text>
      </TouchableOpacity>

      {/* View Complaints */}
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('ViewComplaints')}
      >
        <LottieView
          source={require('../assets/complaint.json')}
          autoPlay
          loop
          style={styles.lottie}
        />
        <Text style={styles.cardText}>View Complaints</Text>
      </TouchableOpacity>

      {/* View All Notices */}
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('ViewNotices')}
      >
        <LottieView
          source={require('../assets/view.json')}
          autoPlay
          loop
          style={styles.lottie}
        />
        <Text style={styles.cardText}>View All Notices</Text>
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
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  card: {
    backgroundColor: '#FFF',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 5, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  lottie: {
    width: 60,
    height: 60,
    marginRight: 15,
  },
  cardText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#333',
  },
  logoutButton: {
    marginRight: 15,
  },
});

export default FacultyDashboard;
