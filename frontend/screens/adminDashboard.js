import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons } from '@expo/vector-icons';

const AdminDashboard = () => {
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

  const options = [
    {
      title: 'Add Notices',
      screen: 'AddNotice',
      animation: require('../assets/add.json'),
    },
    {
      title: 'View Notices',
      screen: 'ViewNotices',
      animation: require('../assets/view.json'),
    },
    {
      title: 'View Complaints',
      screen: 'ViewAllComplaints',
      animation: require('../assets/complaint.json'),
    },
    {
      title: 'Faculty Info',
      screen: 'FacultyInfo',
      animation: require('../assets/faculty.json'),
    },
    {
      title: 'Permission Control',
      screen: 'PermissionControl',
      animation: require('../assets/permission.json'),
    },
  ];

  return (
    <View style={styles.container}>
      {options.map((option, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.block,
            index === options.length - 1 && styles.lastBlock,
          ]}
          onPress={() => navigation.navigate(option.screen)}
        >
          <LottieView
            source={option.animation}
            autoPlay
            loop
            style={styles.lottie}
          />
          <Text style={styles.text}>{option.title}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between', // Ensures two per row
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  block: {
    width: '48%', // Ensures two blocks per row
    aspectRatio: 1, // Keeps blocks square
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    borderRadius: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  lastBlock: {
    alignSelf: 'center', // Centers the last block
  },
  lottie: {
    width: 70,
    height: 70,
  },
  text: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  logoutButton: {
    marginRight: 15,
  },
});

export default AdminDashboard;
