import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Linking,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ResourcesScreen = () => {
  const navigation = useNavigation();

  const resources = [
    {
      title: 'Results',
      url: 'https://results.cvr.ac.in/cvrresults1/resulthome.php',
    },
    {
      title: 'Tuition Fee',
      url: 'https://www.onlinesbi.sbi/sbicollect/icollecthome.htm?corpID=950841',
    },
    {
      title: 'Bus Fee',
      url: 'https://www.onlinesbi.sbi/sbicollect/icollecthome.htm?corpID=958125',
    },
    {
      title: 'Exam Fee',
      url: 'https://www.onlinesbi.sbi/sbicollect/icollecthome.htm?corpID=4988210',
    },
  ];

  return (
    <View style={styles.container}>
      {resources.map((resource, index) => (
        <TouchableOpacity
          key={index}
          style={styles.button}
          onPress={() => Linking.openURL(resource.url)}
        >
          <Text style={styles.buttonText}>{resource.title}</Text>
        </TouchableOpacity>
      ))}

      {/* Navigate to Bus Routes Screen */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('BusRoutes')}
      >
        <Text style={styles.buttonText}>Bus Routes</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    padding: 20,
  },
  button: {
    width: '90%',
    backgroundColor: '#6D4C41',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ResourcesScreen;
