import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import * as Font from "expo-font";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const isAuthenticated = true;

export default function Index() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    Font.loadAsync({
      ...MaterialCommunityIcons.font,
    }).then(() => setFontsLoaded(true));
  }, []);

  if (!fontsLoaded) return null;

  return (
    <Redirect href={isAuthenticated ? "/(dashboard)" : "/(unauthorized)"} />
  );
}
