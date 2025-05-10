import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { ThemedView } from './ThemedView';

export function LoadingSpinner() {
  return (
    <ThemedView style={styles.container}>
      <ActivityIndicator size="large" color="#8B5CF6" />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});