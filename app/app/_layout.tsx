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

// Auth context to manage authentication state
import { createContext } from "react";
export const AuthContext = createContext({
  signIn: (token: string) => {},
  signOut: () => {},
  isLoggedIn: false,
});

export default function Layout() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? DarkTheme : DefaultTheme;
  const primaryColor = "#8B5CF6";
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const segments = useSegments();
  const router = useRouter();

  // Check if the user is authenticated
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
      // This function will be implemented in a separate auth service
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
    <AuthContext.Provider value={authContext}>
      <SafeAreaProvider>
        <SafeAreaView
          style={{
            flex: 1,
            backgroundColor: "black",
          }}
        >
          <ThemeProvider value={theme}>
            <View style={styles.container}>
              <View style={styles.content}>
                <Slot />
              </View>
              {isLoggedIn && <BottomBar primaryColor={primaryColor} />}
            </View>
            <StatusBar style="auto" />
          </ThemeProvider>
        </SafeAreaView>
      </SafeAreaProvider>
    </AuthContext.Provider>
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