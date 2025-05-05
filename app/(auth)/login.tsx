import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { useAuth } from '../../hooks/useAuth';

export default function LoginScreen() {
  const { user, signIn, signUp, loading } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Redirect to habits if already logged in
  useEffect(() => {
    if (user) {
      console.log("Already authenticated in LoginScreen, redirecting");
      router.replace('/(app)/tabs/habits');
    }
  }, [user, router]);

  if (loading) return <ActivityIndicator style={{ flex: 1 }} size="large" />;

  const handleAuth = async () => {
    if (!email || !password) {
      setError('Email and password are required');
      return;
    }
    
    console.log("Attempting authentication:", { isSignUp, email });
    setSubmitting(true);
    setError('');
    
    try {
      if (isSignUp) {
        console.log("Signing up...");
        await signUp(email, password);
        console.log("Sign up successful");
        Alert.alert("Success", "Account created successfully!");
      } else {
        console.log("Signing in...");
        await signIn(email, password);
        console.log("Sign in successful");
      }
    } catch (e: any) {
      console.error("Authentication error:", e.code, e.message);
      
      // More user-friendly error messages
      if (e.code === 'auth/invalid-credential' || e.code === 'auth/user-not-found' || e.code === 'auth/wrong-password') {
        setError('Invalid email or password');
      } else if (e.code === 'auth/email-already-in-use') {
        setError('Email is already in use');
      } else if (e.code === 'auth/weak-password') {
        setError('Password is too weak');
      } else if (e.code === 'auth/invalid-email') {
        setError('Invalid email address');
      } else {
        setError(e.message || 'Authentication failed');
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{isSignUp ? 'Sign Up' : 'Log In'}</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Button title={isSignUp ? 'Sign Up' : 'Log In'} onPress={handleAuth} disabled={submitting} />
      <Text style={styles.switchText} onPress={() => setIsSignUp((v) => !v)}>
        {isSignUp ? 'Already have an account? Log In' : "Don't have an account? Sign Up"}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 24 },
  input: { width: 250, height: 44, borderWidth: 1, borderColor: '#ccc', borderRadius: 8, marginBottom: 16, paddingHorizontal: 12 },
  error: { color: 'red', marginBottom: 12 },
  switchText: { color: '#007AFF', marginTop: 18, textDecorationLine: 'underline' },
}); 