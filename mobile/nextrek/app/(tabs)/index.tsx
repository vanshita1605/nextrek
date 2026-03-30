import { StyleSheet, View, Platform, Pressable } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>Plan Your Perfect Trip</ThemedText>
      <ThemedText type="subtitle" style={styles.subtitle}>
        Discover destinations, manage expenses, create itineraries, and travel with friends seamlessly.
      </ThemedText>

      <ThemedView style={styles.card}>
        <ThemedText type="headline">Welcome Back!</ThemedText>
        <ThemedText style={styles.cardMeta}>Log in to access your trips and wallet</ThemedText>

        <Pressable style={styles.primaryButton} onPress={() => router.push('/login')}>
          <ThemedText style={styles.primaryButtonText}>Sign In</ThemedText>
        </Pressable>

        <Pressable style={styles.secondaryButton} onPress={() => router.push('/signup')}>
          <ThemedText style={styles.secondaryButtonText}>Create Account</ThemedText>
        </Pressable>
      </ThemedView>

      <ThemedView style={styles.quickFeatures}>
        <ThemedText type="subtitle">Quick Start</ThemedText>
        <View style={styles.featureRow}>
          <ThemedText type="defaultSemiBold">•</ThemedText>
          <ThemedText>Trips planner, budget widget, checklist, chat, memories.</ThemedText>
        </View>
        <View style={styles.featureRow}>
          <ThemedText type="defaultSemiBold">•</ThemedText>
          <ThemedText>Cross-platform support for iOS/Android/web.</ThemedText>
        </View>
      </ThemedView>

      <View style={styles.legalRow}>
        <Link href="/login" style={styles.link}>Already have account? Login</Link>
        <Link href="/signup" style={styles.link}>Sign up now</Link>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Platform.OS === 'ios' ? '#001f3f' : '#0f172a',
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    fontSize: 28,
    marginBottom: 8,
  },
  subtitle: {
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 24,
  },
  card: {
    backgroundColor: '#001f3f',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
  },
  cardMeta: {
    marginTop: 8,
    marginBottom: 16,
    color: '#9ca3af',
  },
  primaryButton: {
    backgroundColor: '#00bcd4',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 8,
  },
  primaryButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  secondaryButton: {
    borderWidth: 1,
    borderColor: '#00bcd4',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#00bcd4',
    fontWeight: 'bold',
  },
  quickFeatures: {
    marginTop: 8,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    gap: 6,
  },
  legalRow: {
    marginTop: 20,
    alignItems: 'center',
  },
  link: {
    color: '#00bcd4',
    textDecorationLine: 'underline',
    marginTop: 4,
  },
});
