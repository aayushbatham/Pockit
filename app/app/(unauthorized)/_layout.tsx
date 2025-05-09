import { Stack } from 'expo-router';

export default function UnauthorizedLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="get-started" />
      <Stack.Screen name="sign-in" />
    </Stack>
  );
} 