import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  KeyboardAvoidingView, 
  Platform,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import Button from '@/components/Button';

const SignIn = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const router = useRouter();
  
  const handleContinue = () => {
    console.log('Phone number:', phoneNumber);
  };

  return (
    <LinearGradient
      colors={['#1A1A1A', '#2D3436', '#121212']}
      style={styles.container}
    >
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.content}
      >
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backText}>👈</Text>
        </TouchableOpacity>

        <View style={styles.header}>
          <Text style={styles.title}>Enter your mobile number</Text>
          <Text style={styles.subtitle}>
            We'll send you a verification code
          </Text>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.prefix}>+91</Text>
          <TextInput
            style={styles.input}
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            placeholder="Enter mobile number"
            placeholderTextColor="#666"
            keyboardType="phone-pad"
            maxLength={10}
            autoFocus
          />
        </View>

        <Button 
          title="Continue"
          onPress={handleContinue}
          style={styles.button}
          textStyle={styles.buttonText}
          disabled={phoneNumber.length !== 10}
        />
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  backButton: {
    marginTop: 50,
    marginBottom: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  backText: {
    fontSize: 24,
  },
  header: {
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#FFFFFF99',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    borderBottomWidth: 1,
    borderBottomColor: '#7159c1',
    paddingBottom: 10,
  },
  prefix: {
    color: '#FFFFFF',
    fontSize: 18,
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 18,
    padding: 0,
  },
  button: {
    height: 70,
    backgroundColor: '#7159c1',
    borderRadius: 30,
    shadowColor: '#7159c1',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    letterSpacing: 1,
  },
});

export default SignIn; 