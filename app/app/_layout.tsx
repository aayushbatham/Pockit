import { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Slot, useRouter, useSegments } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useColorScheme } from "@/hooks/useColorScheme";
import * as Font from "expo-font";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { SafeAreaView } from "react-native-safe-area-context";
import { BottomBar } from "@/components/BottomBar";
import { isAuthenticated } from "@/utils/storage";
// Add React Query imports
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { createContext } from "react";
export const AuthContext = createContext({
  signIn: (token: string) => {},
  signOut: () => {},
  isLoggedIn: false,
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
});

export default function Layout() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? DarkTheme : DefaultTheme;
  const primaryColor = "#8B5CF6";
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const authenticated = isAuthenticated();
      setIsLoggedIn(authenticated);
      
      const inAuthGroup = segments[0] === "(unauthorized)";
      
      if (!authenticated && !inAuthGroup) {
        router.replace("/(unauthorized)");
      } else if (authenticated && inAuthGroup) {
        router.replace("/(home)");
      }
    };
    
    checkAuth();
  }, [segments]);

  const authContext = {
    signIn: (token: string) => {
      setIsLoggedIn(true);
    },
    signOut: () => {
      setIsLoggedIn(false);
    },
    isLoggedIn,
  };

  useEffect(() => {
    Font.loadAsync({
      ...MaterialCommunityIcons.font,
    }).then(() => setFontsLoaded(true));
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <AuthContext.Provider value={authContext}>
        <SafeAreaProvider>
            <ThemeProvider value={theme}>
              <View style={styles.container}>
                <View style={styles.content}>
                  <Slot />
                </View>
                {isLoggedIn && <BottomBar primaryColor={primaryColor} />}
              </View>
              <StatusBar style="auto" />
            </ThemeProvider>
        </SafeAreaProvider>
      </AuthContext.Provider>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
});