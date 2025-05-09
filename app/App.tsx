import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { AppStack } from './navigation/AppStack';
import { AuthStack } from './navigation/AuthStack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar style="auto" />
        {isAuthenticated ? <AppStack /> : <AuthStack />}
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
