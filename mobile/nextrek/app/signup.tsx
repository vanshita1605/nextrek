import { useState } from 'react';
import { StyleSheet, TextInput, Pressable } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function Signup() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = () => {
    // TODO: connect with backend and update auth state
    router.push('/(tabs)');
  };

  return (
    <ThemedView style={styles.container}>
      <Stack.Screen options={{ title: 'Sign Up' }} />
      <ThemedText type="title">Create Account</ThemedText>
      <ThemedText style={styles.subtitle}>Get started with your travel planner</ThemedText>

      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={name}
        onChangeText={setName}
      />
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

      <Pressable style={styles.button} onPress={handleSignup}>
        <ThemedText style={styles.buttonText}>Sign Up</ThemedText>
      </Pressable>

      <Pressable onPress={() => router.push('/login')}>
        <ThemedText style={styles.link}>Already have account? Sign In</ThemedText>
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
