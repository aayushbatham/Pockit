import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  KeyboardAvoidingView, 
  Platform,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import Button from '@/components/Button';
import { useSignup } from '@/modules/hooks/use-signup-hook';
import { setAuthToken, setUsername, setPhoneNumber } from '@/utils/storage'; 

const SignIn = () => {
  const [step, setStep] = useState(1);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  
  const { signup, isLoading, isError, error } = useSignup();
  
  const handleContinue = () => {
    if (step === 1 && phoneNumber.length === 10) {
      setStep(2);
    } else if (step === 2 && name.trim().length > 0) {
      setStep(3);
    } else if (step === 3 && password.length >= 6) {
      handleRegister();
    }
  };

  const handleRegister = () => {
    signup(
      {
        phone: phoneNumber,
        name: name,
        password: password,
      },
      {
        onSuccess: (res) => {          
          if (res.token) {
            setAuthToken(res.token);
            setUsername(name);
            setPhoneNumber(phoneNumber); 
            Alert.alert('Success', 'Registration successful!');
            router.push('/(home)');
          } else {
            Alert.alert('Error', 'No authentication token received');
          }
        },
        onError: (err) => {
          Alert.alert('Error', err instanceof Error ? err.message : 'Registration failed. Please try again.');
        }
      }
    );
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <>
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
          </>
        );
      case 2:
        return (
          <>
            <View style={styles.header}>
              <Text style={styles.title}>What's your name?</Text>
              <Text style={styles.subtitle}>
                Let us know what to call you
              </Text>
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="Enter your full name"
                placeholderTextColor="#666"
                autoFocus
              />
            </View>
          </>
        );
      case 3:
        return (
          <>
            <View style={styles.header}>
              <Text style={styles.title}>Create a password</Text>
              <Text style={styles.subtitle}>
                Must be at least 6 characters
              </Text>
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                placeholder="Enter password"
                placeholderTextColor="#666"
                secureTextEntry
                autoFocus
              />
            </View>
          </>
        );
      default:
        return null;
    }
  };

  const getButtonTitle = () => {
    if (step === 3) return "Register";
    return "Continue";
  };

  const isButtonDisabled = () => {
    if (step === 1) return phoneNumber.length !== 10;
    if (step === 2) return name.trim().length === 0;
    if (step === 3) return password.length < 6;
    return false;
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
          onPress={() => {
            if (step > 1) {
              setStep(step - 1);
            } else {
              router.back();
            }
          }}
        >
          <Text style={styles.backText}>👈</Text>
        </TouchableOpacity>

        {renderStepContent()}

        <Button 
          title={getButtonTitle()}
          onPress={handleContinue}
          style={styles.button}
          textStyle={styles.buttonText}
          disabled={isButtonDisabled() || isLoading}
        >
          {isLoading && (
            <ActivityIndicator color="#FFFFFF" style={styles.loader} />
          )}
        </Button>
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
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    letterSpacing: 1,
  },
  loader: {
    marginLeft: 10,
  },
});

export default SignIn;