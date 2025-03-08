import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { WebView } from 'react-native-webview';

const { width } = Dimensions.get('window');

const categoryColors = {
  'Section-Specific': '#f39c12',
  General: '#3498db',
  Event: '#e74c3c',
  Default: '#95a5a6',
};

const NoticeScreen = ({ route }) => {
  const { notice } = route.params;

  const handleDownloadFile = () => {
    if (notice.fileUrl) {
      Linking.openURL(notice.fileUrl);
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
    >
      {/* Header Section */}
      <View
        style={[
          styles.header,
          {
            backgroundColor:
              categoryColors[notice.category] || categoryColors.Default,
          },
        ]}
      >
        <Text style={styles.title}>{notice.title}</Text>
        <Text style={styles.category}>Category: {notice.category}</Text>
      </View>

      {/* Notice Content */}
      <View style={styles.contentContainer}>
        <Text style={styles.content}>{notice.content}</Text>

        {/* Additional Information */}
        <View style={styles.infoSection}>
          <Text style={styles.infoText}>
            Author: {notice.author || 'Unknown'}
          </Text>
          <Text style={styles.infoText}>
            Published on: {new Date(notice.createdAt).toLocaleDateString()}
          </Text>
          {notice.year && (
            <Text style={styles.infoText}>Year: {notice.year}</Text>
          )}
          {notice.sections?.length > 0 && (
            <Text style={styles.infoText}>
              Sections: {notice.sections.join(', ')}
            </Text>
          )}
        </View>

        {/* Display File Section */}
        {notice.fileUrl && (
          <View style={styles.fileContainer}>
            {notice.fileUrl.endsWith('.pdf') ? (
              <View style={styles.pdfWrapper}>
                <WebView
                  source={{
                    uri: `https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(
                      notice.fileUrl
                    )}`,
                  }}
                  style={styles.pdfViewer}
                  nestedScrollEnabled
                />
              </View>
            ) : (
              <View style={styles.imageWrapper}>
                <WebView
                  source={{
                    html: `
                      <html>
                        <body style="margin:0; padding:0; overflow:auto;">
                          <img src="${notice.fileUrl}" style="width:100%; height:auto; object-fit:contain;" />
                        </body>
                      </html>
                    `,
                  }}
                  style={styles.imageViewer}
                  javaScriptEnabled
                  domStorageEnabled
                  scalesPageToFit
                  nestedScrollEnabled
                />
              </View>
            )}
          </View>
        )}

        {/* File Download Section */}
        {notice.fileUrl && (
          <TouchableOpacity
            style={styles.downloadButton}
            onPress={handleDownloadFile}
          >
            <Ionicons name="download-outline" size={24} color="white" />
            <Text style={styles.downloadText}>Download Attachment</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  scrollContent: {
    paddingBottom: 20,
  },
  header: {
    padding: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 3,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },
  category: {
    fontSize: 14,
    color: '#f8f9fa',
    marginTop: 5,
  },
  contentContainer: {
    padding: 20,
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
    marginBottom: 15,
  },
  infoSection: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    elevation: 2,
    marginTop: 10,
  },
  infoText: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
  },
  fileContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  pdfWrapper: {
    width: width * 0.95,
    height: 400,
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 3,
  },
  pdfViewer: {
    width: '100%',
    height: '100%',
  },
  imageWrapper: {
    width: width * 0.95,
    height: 400,
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 3,
  },
  imageViewer: {
    width: '100%',
    height: '100%',
  },
  downloadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007BFF',
    padding: 12,
    borderRadius: 8,
    justifyContent: 'center',
    marginTop: 20,
    elevation: 3,
  },
  downloadText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 10,
  },
});

export default NoticeScreen;
