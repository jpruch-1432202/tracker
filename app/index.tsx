import { Redirect } from 'expo-router';
import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useAuth } from '../hooks/useAuth';

export default function Index() {
  const { user, loading } = useAuth();
  
  console.log("Index page - Auth state:", { user: user?.email, loading });
  
  // Show loading indicator while checking auth
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  
  // Redirect based on auth state
  if (user) {
    console.log("User is authenticated, redirecting to app");
    return <Redirect href="/(app)/tabs/habits" />;
  } else {
    console.log("User is not authenticated, redirecting to login");
    return <Redirect href="/(auth)/login" />;
  }
} 