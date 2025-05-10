import { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Slot } from "expo-router";
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
import { BottomBar } from "@/components/BottomBar";

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
    return null;
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
          <View style={styles.container}>
            <View style={styles.content}>
              <Slot />
            </View>
            <BottomBar primaryColor={primaryColor} />
          </View>
          <StatusBar style="auto" />
        </ThemeProvider>
      </SafeAreaView>
    </SafeAreaProvider>
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
