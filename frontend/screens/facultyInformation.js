import React from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

const FacultyInformation = () => {
  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: 'https://cvr-cse.vercel.app/faculty/teaching' }}
        style={styles.webview}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
});

export default FacultyInformation;
