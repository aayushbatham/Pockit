import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Button from '../components/Button';

const SignUp = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>
      <Button 
        title="Back" 
        variant="outline"
        onPress={() => navigation.goBack()} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default SignUp; 