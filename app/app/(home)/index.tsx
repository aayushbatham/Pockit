import React, { useState, useEffect } from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  Pressable,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useColorScheme } from "@/hooks/useColorScheme";
import { DarkTheme, DefaultTheme } from "@react-navigation/native";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { useRouter } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useLanguage } from "@/contexts/LanguageContext";

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
      }, 0);
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
  const router = useRouter();
  const [userData, setUserData] = useState<UserData>(mockUserData[0]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const colorScheme = useColorScheme();
  const { t } = useLanguage();
  const theme = colorScheme === "dark" ? DarkTheme : DefaultTheme;

  const backgroundColor = colorScheme === "dark" ? "#121212" : "#F8F9FA";
  const textColor = colorScheme === "dark" ? "#FFFFFF" : "#000000";
  const primaryColor = "#8B5CF6";
  const cardBgColor = colorScheme === "dark" ? "#1E1E1E" : "#FFFFFF";

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
    <ScrollView
      style={[styles.container, { backgroundColor }]}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.topBar}>
        <Pressable style={styles.iconButton}>
          <MaterialCommunityIcons name="apps" size={24} color={textColor} />
        </Pressable>
        <Pressable
          style={[
            styles.accountSelector,
            { backgroundColor: colorScheme === "dark" ? "#2D2D2D" : "#F3F4F6" },
          ]}
        >
          <ThemedText style={styles.accountText}>{t('home')}</ThemedText>
          <MaterialCommunityIcons
            name="chevron-down"
            size={20}
            color={textColor}
          />
        </Pressable>
        <Pressable style={styles.iconButton}>
          <MaterialCommunityIcons
            name="bell-outline"
            size={24}
            color={textColor}
          />
        </Pressable>
      </View>

      <View style={styles.balanceSection}>
        <ThemedText style={styles.balanceLabel}>{t('totalBalance')}</ThemedText>
        <ThemedText style={styles.balanceAmount}>
          ₹{userData.todaySpend.toLocaleString()}
        </ThemedText>
      </View>

      <View style={styles.statsContainer}>
        <View style={[styles.statsCard, { backgroundColor: cardBgColor }]}>
          <ThemedText style={styles.statsLabel}>{t('expense')}</ThemedText>
          <ThemedText style={styles.statsAmount}>₹24,589</ThemedText>
          <View style={styles.statsChange}>
            <MaterialCommunityIcons name="arrow-up" size={16} color="red" />
            <ThemedText style={[styles.changeText, { color: "red" }]}>
              13.39% {t('thisMonth')}
            </ThemedText>
          </View>
        </View>

        <View style={[styles.statsCard, { backgroundColor: cardBgColor }]}>
          <ThemedText style={styles.statsLabel}>{t('income')}</ThemedText>
          <ThemedText style={styles.statsAmount}>₹40,432</ThemedText>
          <View style={styles.statsChange}>
            <MaterialCommunityIcons name="arrow-up" size={16} color="green" />
            <ThemedText style={[styles.changeText, { color: "green" }]}>
              5.22% {t('thisMonth')}
            </ThemedText>
          </View>
        </View>
      </View>

      <View style={[styles.insightCard, { backgroundColor: cardBgColor }]}>
        <View style={styles.insightHeader}>
          <MaterialCommunityIcons
            name="star-four-points"
            size={20}
            color={primaryColor}
          />
          <ThemedText style={styles.insightTitle}>{t('aiInsight')}</ThemedText>
        </View>
        <ThemedText style={styles.insightText}>
          Great job Rahul! You've saved 20% more than last month.
        </ThemedText>
      </View>

      <View style={styles.transactionsSection}>
        <View style={styles.sectionHeader}>
          <ThemedText style={styles.sectionTitle}>{t('transactions')}</ThemedText>
          <Pressable>
            <ThemedText style={styles.showAllText}>{t('showAll')}</ThemedText>
          </Pressable>
        </View>

        {/* Transaction Items */}
        <TransactionItem
          icon="food"
          title="dinner"
          amount="-$89.69"
          time="Today, 12:30 AM"
          type="expense"
        />
        <TransactionItem
          icon="briefcase"
          title="designProject"
          amount="+$1500.00"
          time="Yesterday, 08:10 AM"
          type="income"
        />
        <TransactionItem
          icon="medical-bag"
          title="medicine"
          amount="-$369.54"
          time="Today, 12:30 AM"
          type="expense"
        />
      </View>
    </ScrollView>
  );
}

// New Transaction Item Component
function TransactionItem({ icon, title, amount, time, type }: any) {
  const colorScheme = useColorScheme();
  const { t } = useLanguage();
  const iconBgColors = {
    food: "#FF6B6B",
    briefcase: "#4ECDC4",
    "medical-bag": "#45B7D1",
  };

  // Convert time string to use translations
  const timeText = time.toLowerCase().includes('today') 
    ? t('today') 
    : time.toLowerCase().includes('yesterday')
    ? t('yesterday')
    : time;

  // Translate title if it matches a translation key
  const translatedTitle = t(title.toLowerCase().replace(' ', '') as any) || title;

  return (
    <View style={styles.transactionItem}>
      <View
        style={[
          styles.transactionIcon,
          { backgroundColor: iconBgColors[icon as keyof typeof iconBgColors] },
        ]}
      >
        <MaterialCommunityIcons name={icon} size={24} color="white" />
      </View>
      <View style={styles.transactionInfo}>
        <ThemedText style={styles.transactionTitle}>{translatedTitle}</ThemedText>
        <ThemedText style={styles.transactionTime}>{timeText}</ThemedText>
      </View>
      <ThemedText
        style={[
          styles.transactionAmount,
          { color: type === "expense" ? "#FF6B6B" : "#4ECDC4" },
        ]}
      >
        {amount}
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 40,
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: Platform.OS === "ios" ? 60 : 40,
    paddingBottom: 10,
    backgroundColor: "transparent",
  },
  iconButton: {
    padding: 12,
    borderRadius: 12,
  },
  accountSelector: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  accountText: {
    marginRight: 8,
    fontWeight: "600",
    fontSize: 15,
  },
  balanceSection: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    alignItems: "center",
  },
  balanceLabel: {
    fontSize: 16,
    opacity: 0.7,
    marginBottom: 12,
    textAlign: "center",
  },
  balanceAmount: {
    fontSize: 42,
    fontWeight: "bold",
    textAlign: "center",
    includeFontPadding: false,
    lineHeight: 50,
  },
  statsContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    gap: 12,
    marginTop: 10,
  },
  statsCard: {
    flex: 1,
    padding: 20,
    borderRadius: 20,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  statsLabel: {
    fontSize: 14,
    opacity: 0.7,
  },
  statsAmount: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 4,
  },
  statsChange: {
    flexDirection: "row",
    alignItems: "center",
  },
  changeText: {
    fontSize: 12,
    marginLeft: 4,
  },
  insightCard: {
    margin: 16,
    padding: 16,
    borderRadius: 16,
  },
  insightHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  insightTitle: {
    marginLeft: 8,
    fontWeight: "600",
  },
  insightText: {
    fontSize: 14,
    opacity: 0.8,
  },
  transactionsSection: {
    paddingHorizontal: 16,
    marginTop: 20,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  showAllText: {
    color: "#8B5CF6",
    fontWeight: "500",
  },
  transactionItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.05)",
  },
  transactionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  transactionInfo: {
    flex: 1,
    marginLeft: 12,
  },
  transactionTitle: {
    fontSize: 16,
    fontWeight: "500",
  },
  transactionTime: {
    fontSize: 12,
    opacity: 0.5,
    marginTop: 2,
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: "600",
  },
});
