import { useState } from 'react';
import { StyleSheet, TextInput, Pressable } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // TODO: connect with backend / web auth
    router.push('/(tabs)');
  };

  return (
    <ThemedView style={styles.container}>
      <Stack.Screen options={{ title: 'Sign In' }} />
      <ThemedText type="title">Sign In</ThemedText>
      <ThemedText style={styles.subtitle}>Enter your credentials to continue</ThemedText>

      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <Pressable style={styles.button} onPress={handleLogin}>
        <ThemedText style={styles.buttonText}>Sign In</ThemedText>
      </Pressable>

      <Pressable onPress={() => router.push('/signup')}>
        <ThemedText style={styles.link}>Create new account</ThemedText>
      </Pressable>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  subtitle: { marginBottom: 16 },
  input: { borderWidth: 1, borderColor: '#888', borderRadius: 10, marginBottom: 12, padding: 10 },
  button: { backgroundColor: '#00bcd4', padding: 14, borderRadius: 10, alignItems: 'center', marginBottom: 10 },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  link: { color: '#00bcd4', textAlign: 'center', marginTop: 12 },
});
