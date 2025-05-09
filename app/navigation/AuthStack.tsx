import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Landing from '../screens/Landing';
import SignIn from '../screens/SignIn';
import SignUp from '../screens/SignUp';

const Stack = createNativeStackNavigator();

export const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Landing" component={Landing} />
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
    </Stack.Navigator>
  );
}; 