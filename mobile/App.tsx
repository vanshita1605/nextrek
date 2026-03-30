import { useState } from 'react';
import { StyleSheet, Platform, View, ActivityIndicator, Text, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { WebView } from 'react-native-webview';

const WEB_URL = Platform.OS === 'android' ? 'http://10.0.2.2:3000' : 'http://localhost:3000';

export default function App() {
  const [loading, setLoading] = useState(true);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Nextrek Mobile (WebView proxy)</Text>
      <View style={styles.webviewContainer}>
        <WebView
          source={{ uri: WEB_URL }}
          onLoadEnd={() => setLoading(false)}
          startInLoadingState
          renderLoading={() => (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#0b79c1" />
              <Text style={styles.loadingText}>Loading website...</Text>
            </View>
          )}
          style={styles.webview}
        />
        {loading && (
          <View style={styles.loadingOverlay} pointerEvents="none">
            <ActivityIndicator size="large" color="#fff" />
            <Text style={styles.loadingOverlayText}>Loading {WEB_URL}</Text>
          </View>
        )}
      </View>
      <StatusBar style="light" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172a' },
  title: { color: 'white', fontSize: 18, fontWeight: '700', textAlign: 'center', padding: 12, backgroundColor: '#14213d' },
  webviewContainer: { flex: 1, backgroundColor: '#0f172a' },
  webview: { flex: 1 },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  loadingText: { color: '#ccc', marginTop: 8 },
  loadingOverlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.35)', justifyContent: 'center', alignItems: 'center' },
  loadingOverlayText: { color: 'white', marginTop: 8 },
});