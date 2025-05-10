import { useEffect } from "react";
import { Tabs } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useColorScheme } from "@/hooks/useColorScheme";
import * as Font from "expo-font";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { SafeAreaView } from "react-native-safe-area-context";
import { Platform } from "react-native";

export default function Layout() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? DarkTheme : DefaultTheme;
  const primaryColor = "#8B5CF6";

  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    Font.loadAsync({
      ...MaterialCommunityIcons.font,
    }).then(() => setFontsLoaded(true));
  }, []);

  if (!fontsLoaded) {
    return null; // or a loading spinner
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: "black",
        }}
      >
        <ThemeProvider value={theme}>
          <Tabs
            screenOptions={{
              headerShown: false,
              tabBarActiveTintColor: primaryColor,
              tabBarInactiveTintColor:
                colorScheme === "dark" ? "#666666" : "#999999",
              tabBarStyle: {
                backgroundColor: colorScheme === "dark" ? "#000000" : "#FFFFFF",
                height: 60,
                paddingBottom: 8,
              },
            }}
          >
            <Tabs.Screen
              name="(home)"
              options={{
                title: "Home",
                tabBarIcon: ({ color, focused }) => (
                  <MaterialCommunityIcons
                    name={focused ? "home" : "home-outline"}
                    size={24}
                    color={color}
                  />
                ),
              }}
            />
            <Tabs.Screen
              name="(dashboard)"
              options={{
                title: "Dashboard",
                tabBarIcon: ({ color, focused }) => (
                  <MaterialCommunityIcons
                    name={focused ? "chart-box" : "chart-box-outline"}
                    size={24}
                    color={color}
                  />
                ),
              }}
            />
            <Tabs.Screen
              name="(profile)"
              options={{
                title: "Profile",
                tabBarIcon: ({ color, focused }) => (
                  <MaterialCommunityIcons
                    name={focused ? "account" : "account-outline"}
                    size={24}
                    color={color}
                  />
                ),
              }}
            />
          </Tabs>
          <StatusBar style="auto" />
        </ThemeProvider>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
