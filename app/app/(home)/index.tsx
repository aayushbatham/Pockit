import React, { useState, useEffect } from "react";
import { ScrollView, View, StyleSheet, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useColorScheme } from "@/hooks/useColorScheme";
import { DarkTheme, DefaultTheme } from "@react-navigation/native";
import { LoadingSpinner } from '@/components/LoadingSpinner';

// Mock data service
const mockUserData = [
  {
    name: "Rohan",
    spendingPersonality: "Social Spender",
    todaySpend: 2450,
    weeklyBudgetPercentage: 75,
    budgetTip: "Weekend food budget nearing limit!",
    upcomingPayment: {
      type: "rent",
      daysLeft: 3,
    },
    festivalAlert: {
      name: "Raksha Bandhan",
      message: "Start planning for Raksha Bandhan?",
    },
  },
  {
    name: "Rohan",
    spendingPersonality: "Careful Planner",
    todaySpend: 1200,
    weeklyBudgetPercentage: 45,
    budgetTip: "Great job! Youre under budget this week.",
    upcomingPayment: {
      type: "electricity bill",
      daysLeft: 5,
    },
    festivalAlert: {
      name: "Diwali",
      message: "Time to start saving for Diwali celebrations!",
    },
  },
  {
    name: "Rohan",
    spendingPersonality: "Weekend Warrior",
    todaySpend: 3500,
    weeklyBudgetPercentage: 90,
    budgetTip: "Critical Alert: Weekly budget almost exhausted!",
    upcomingPayment: {
      type: "credit card bill",
      daysLeft: 2,
    },
    festivalAlert: {
      name: "Ganesh Chaturthi",
      message: "Prepare for upcoming Ganesh Chaturthi expenses",
    },
  },
];

const mockDataService = {
  getUserData: () => {
    // Simulate API delay
    return new Promise((resolve) => {
      setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * mockUserData.length);
        resolve(mockUserData[randomIndex]);
      }, 1000);
    });
  },
};

interface UserData {
  name: string;
  spendingPersonality: string;
  todaySpend: number;
  weeklyBudgetPercentage: number;
  budgetTip?: string;
  upcomingPayment?: {
    type: string;
    daysLeft: number;
  };
  festivalAlert?: {
    name: string;
    message: string;
  };
}

export default function HomePage() {
  const [userData, setUserData] = useState<UserData>(mockUserData[0]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? DarkTheme : DefaultTheme;

  const backgroundColor = theme.colors.background;
  const textColor = theme.colors.text;
  const primaryColor = "#8B5CF6"; // Changed to always use purple
  const cardBgColor = colorScheme === "dark" ? "#1E1E1E" : "#F3F4F6";

  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await mockDataService.getUserData();
        setUserData(data as UserData);
      } catch (error) {
        setError("Failed to fetch user data");
        console.error("Error fetching user data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
    // Refresh data every 30 seconds
    const interval = setInterval(fetchUserData, 30000);

    return () => clearInterval(interval);
  }, []);

  const handleChatPress = () => {
    // Simulate chat functionality
    console.log("Chat button pressed");
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <ThemedView
        style={[
          styles.container,
          { backgroundColor, justifyContent: "center", alignItems: "center" },
        ]}
      >
        <ThemedText style={{ color: "red" }}>{error}</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ScrollView style={[styles.container, { backgroundColor }]}>
      <ThemedView style={styles.header}>
        <View style={styles.welcomeSection}>
          <ThemedText style={styles.welcomeText}>
            🙏 Namaste, {userData.name}! Here's your money mood today
          </ThemedText>
          <View style={[styles.avatarBadge, { backgroundColor: primaryColor }]}>
            <ThemedText>👤 {userData.spendingPersonality}</ThemedText>
          </View>
        </View>
      </ThemedView>

      <ThemedView style={[styles.card, { backgroundColor: cardBgColor }]}>
        <ThemedText style={styles.cardTitle}>Today's Snapshot 📊</ThemedText>
        <ThemedText style={[styles.amount, { color: primaryColor }]}>
          ₹{userData.todaySpend}
        </ThemedText>
        <ThemedText style={styles.subtitle}>Total Spend Today</ThemedText>
        {userData.budgetTip && (
          <View
            style={[
              styles.tipContainer,
              { backgroundColor: primaryColor + "20" },
            ]}
          >
            <ThemedText style={styles.tip}>
              ⚠️ Lakshya Tip: {userData.budgetTip}
            </ThemedText>
          </View>
        )}
      </ThemedView>

      <ThemedView style={[styles.card, { backgroundColor: cardBgColor }]}>
        <ThemedText style={styles.cardTitle}>Weekly Budget 💰</ThemedText>
        <View style={styles.budgetRing}>
          <ThemedText style={[styles.budgetText, { color: primaryColor }]}>
            {userData.weeklyBudgetPercentage}%
          </ThemedText>
        </View>
      </ThemedView>

      {userData.upcomingPayment && (
        <LinearGradient
          colors={[primaryColor, primaryColor + "CC"]}
          style={styles.insightBanner}
        >
          <ThemedText style={styles.insightText}>
            🏠 Looks like your {userData.upcomingPayment.type} is due in{" "}
            {userData.upcomingPayment.daysLeft} days
          </ThemedText>
        </LinearGradient>
      )}

      {userData.festivalAlert && (
        <ThemedView style={[styles.card, { backgroundColor: cardBgColor }]}>
          <ThemedText style={styles.cardTitle}>🎯 Festival Alert</ThemedText>
          <ThemedText style={styles.festivalText}>
            {userData.festivalAlert.message}
          </ThemedText>
        </ThemedView>
      )}

      <Pressable
        style={[styles.chatButton, { backgroundColor: primaryColor }]}
        onPress={handleChatPress}
      >
        <ThemedText style={styles.chatButtonText}>
          💬 Ask assistant anything
        </ThemedText>
      </Pressable>
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
  welcomeSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: "bold",
    flex: 1,
  },
  avatarBadge: {
    padding: 8,
    borderRadius: 20,
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
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  amount: {
    fontSize: 32,
    fontWeight: "bold",
    marginVertical: 10,
  },
  subtitle: {
    fontSize: 14,
    opacity: 0.7,
  },
  tipContainer: {
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  tip: {
    fontSize: 14,
  },
  budgetRing: {
    alignItems: "center",
    justifyContent: "center",
    height: 150,
  },
  budgetText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  insightBanner: {
    margin: 10,
    padding: 20,
    borderRadius: 15,
  },
  insightText: {
    fontSize: 16,
    fontWeight: "500",
  },
  festivalText: {
    fontSize: 14,
    opacity: 0.7,
  },
  chatButton: {
    margin: 10,
    padding: 15,
    borderRadius: 25,
    alignItems: "center",
  },
  chatButtonText: {
    fontSize: 16,
    fontWeight: "500",
  },
});
