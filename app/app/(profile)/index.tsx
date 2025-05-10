import React, { useState } from "react";
import { ScrollView, View, StyleSheet, Pressable, Switch } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useColorScheme } from "@/hooks/useColorScheme";
import { DarkTheme, DefaultTheme } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

interface ProfileData {
  name: string;
  personalityType: string;
  personalityDescription: string;
  goal: {
    item: string;
    saved: number;
    total: number;
  };
  rewards: string;
  language: "English" | "Hindi";
  smsAccess: boolean;
  upiSync: boolean;
  insights: string[];
}

const mockProfileData: ProfileData = {
  name: "Rohan",
  personalityType: "Conscious Spender",
  personalityDescription: "You love sharing experiences and food. Let's keep it mindful.",
  goal: {
    item: "iPad",
    saved: 30000,
    total: 50000,
  },
  rewards: "Flipkart ₹200 voucher",
  language: "English",
  smsAccess: true,
  upiSync: true,
  insights: [
    "Started SIP on April 5th",
    "Saved 40% on food in March",
  ],
};

export default function ProfilePage() {
  const [profileData, setProfileData] = useState<ProfileData>(mockProfileData);
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? DarkTheme : DefaultTheme;

  const backgroundColor = theme.colors.background;
  const textColor = theme.colors.text;
  const primaryColor = "#8B5CF6"; // Purple theme color
  const cardBgColor = colorScheme === "dark" ? "#1E1E1E" : "#F3F4F6";

  return (
    <ScrollView style={[styles.container, { backgroundColor }]}>
      {/* Top Section */}
      <ThemedView style={styles.header}>
        <View style={styles.avatarSection}>
          <View style={[styles.avatar, { backgroundColor: primaryColor + "20" }]}>
            <MaterialCommunityIcons name="account" size={40} color={primaryColor} />
          </View>
          <View style={styles.nameSection}>
            <ThemedText style={styles.name}>{profileData.name}</ThemedText>
            <ThemedText style={styles.personality}>{profileData.personalityType}</ThemedText>
          </View>
        </View>
        <Pressable
          style={[styles.editButton, { backgroundColor: primaryColor }]}
          onPress={() => console.log("Edit pressed")}
        >
          <ThemedText style={styles.editButtonText}>Edit Profile</ThemedText>
        </Pressable>
      </ThemedView>

      {/* Personality Section */}
      <ThemedView style={[styles.card, { backgroundColor: cardBgColor }]}>
        <ThemedText style={styles.cardTitle}>Spending Personality 🎭</ThemedText>
        <ThemedText style={styles.description}>
          {profileData.personalityDescription}
        </ThemedText>
      </ThemedView>

      {/* Goals Section */}
      <ThemedView style={[styles.card, { backgroundColor: cardBgColor }]}>
        <ThemedText style={styles.cardTitle}>Money Goals 🎯</ThemedText>
        <View style={styles.goalProgress}>
          <ThemedText style={styles.goalText}>
            {profileData.goal.item} – {(profileData.goal.saved / profileData.goal.total * 100).toFixed(0)}% saved
          </ThemedText>
          <ThemedText style={[styles.amount, { color: primaryColor }]}>
            ₹{profileData.goal.saved.toLocaleString()} of ₹{profileData.goal.total.toLocaleString()}
          </ThemedText>
          <View style={styles.progressBar}>
            <View
              style={[styles.progressFill, { 
                backgroundColor: primaryColor,
                width: `${(profileData.goal.saved / profileData.goal.total * 100)}%`
              }]}
            />
          </View>
        </View>
        <View style={styles.rewardSection}>
          <ThemedText style={styles.rewardText}>🎁 Earned: {profileData.rewards}</ThemedText>
        </View>
      </ThemedView>

      {/* Settings Section */}
      <ThemedView style={[styles.card, { backgroundColor: cardBgColor }]}>
        <ThemedText style={styles.cardTitle}>Settings ⚙️</ThemedText>
        <View style={styles.settingItem}>
          <ThemedText>Language</ThemedText>
          <Pressable
            style={[styles.languageButton, { backgroundColor: primaryColor + "20" }]}
            onPress={() => console.log("Language pressed")}
          >
            <ThemedText style={{ color: primaryColor }}>{profileData.language}</ThemedText>
          </Pressable>
        </View>
        <View style={styles.settingItem}>
          <ThemedText>SMS Access</ThemedText>
          <Switch
            value={profileData.smsAccess}
            onValueChange={(value) => 
              setProfileData(prev => ({ ...prev, smsAccess: value }))
            }
            trackColor={{ false: "#767577", true: primaryColor }}
          />
        </View>
        <View style={styles.settingItem}>
          <ThemedText>UPI Sync</ThemedText>
          <Switch
            value={profileData.upiSync}
            onValueChange={(value) => 
              setProfileData(prev => ({ ...prev, upiSync: value }))
            }
            trackColor={{ false: "#767577", true: primaryColor }}
          />
        </View>
      </ThemedView>

      {/* Insights Section */}
      <ThemedView style={[styles.card, { backgroundColor: cardBgColor }]}>
        <ThemedText style={styles.cardTitle}>Lakshya Insights 💡</ThemedText>
        {profileData.insights.map((insight, index) => (
          <View key={index} style={styles.insightItem}>
            <ThemedText style={styles.insightText}>{insight}</ThemedText>
          </View>
        ))}
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingTop: 60,
  },
  avatarSection: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  nameSection: {
    marginLeft: 15,
    flex: 1,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
  },
  personality: {
    fontSize: 16,
    opacity: 0.7,
  },
  editButton: {
    padding: 12,
    borderRadius: 25,
    alignItems: "center",
  },
  editButtonText: {
    fontSize: 16,
    fontWeight: "500",
  },
  card: {
    borderRadius: 15,
    padding: 20,
    margin: 10,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  description: {
    fontSize: 16,
    opacity: 0.8,
    lineHeight: 22,
  },
  goalProgress: {
    marginVertical: 10,
  },
  goalText: {
    fontSize: 16,
    marginBottom: 5,
  },
  amount: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  progressBar: {
    height: 8,
    backgroundColor: "#E5E7EB",
    borderRadius: 4,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 4,
  },
  rewardSection: {
    marginTop: 15,
    padding: 10,
    backgroundColor: "#F3F4F6",
    borderRadius: 8,
  },
  rewardText: {
    fontSize: 14,
  },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  languageButton: {
    padding: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  insightItem: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  insightText: {
    fontSize: 14,
    opacity: 0.8,
  },
});
