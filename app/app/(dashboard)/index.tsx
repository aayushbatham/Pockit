import React, { useState, useEffect } from "react";
import { ScrollView, View, StyleSheet, Pressable } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useColorScheme } from "@/hooks/useColorScheme";
import { DarkTheme, DefaultTheme } from "@react-navigation/native";
import { LoadingSpinner } from '@/components/LoadingSpinner';

interface DashboardData {
  timeRange: "This Month" | "Last Month" | "Custom Range";
  categories: {
    name: string;
    icon: string;
    amount: number;
    percentage: number;
  }[];
  forecast: {
    prediction: string;
    percentage: number;
    category: string;
  };
  trends: {
    month: string;
    amount: number;
    festivals?: string[];
  }[];
  topVendors: {
    name: string;
    amount: number;
    frequency: number;
  }[];
  savingsSuggestion: {
    action: string;
    savingsAmount: number;
    period: string;
  };
}

const mockDashboardData: DashboardData = {
  timeRange: "This Month",
  categories: [
    { name: "Rent", icon: "🏠", amount: 25000, percentage: 35 },
    { name: "Food", icon: "🍕", amount: 15000, percentage: 25 },
    { name: "Travel", icon: "🚗", amount: 8000, percentage: 15 },
    { name: "Shopping", icon: "🛍️", amount: 12000, percentage: 20 },
    { name: "Others", icon: "📦", amount: 5000, percentage: 5 },
  ],
  forecast: {
    prediction: "Your fashion spend will spike next week",
    percentage: 32,
    category: "Shopping",
  },
  trends: [
    { month: "Aug", amount: 65000, festivals: ["Raksha Bandhan"] },
    { month: "Sep", amount: 58000 },
    { month: "Oct", amount: 72000, festivals: ["Diwali"] },
  ],
  topVendors: [
    { name: "Zomato", amount: 8500, frequency: 15 },
    { name: "Amazon", amount: 12000, frequency: 8 },
    { name: "BigBasket", amount: 6000, frequency: 4 },
    { name: "Paytm", amount: 15000, frequency: 10 },
  ],
  savingsSuggestion: {
    action: "Pause one coffee/day",
    savingsAmount: 1200,
    period: "month",
  },
};

export default function DashboardPage() {
  const [timeRange, setTimeRange] =
    useState<DashboardData["timeRange"]>("This Month");
  const [dashboardData, setDashboardData] =
    useState<DashboardData>(mockDashboardData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? DarkTheme : DefaultTheme;

  const backgroundColor = theme.colors.background;
  const textColor = theme.colors.text;
  const primaryColor = "#8B5CF6"; // Purple theme
  const cardBgColor = colorScheme === "dark" ? "#1E1E1E" : "#F3F4F6";

  useEffect(() => {
    const fetchDashboardData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setDashboardData(mockDashboardData);
      } catch (error) {
        setError("Failed to fetch dashboard data");
        console.error("Error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, [timeRange]);

  const TimeRangeSelector = () => (
    <View style={styles.tabContainer}>
      {["This Month", "Last Month", "Custom Range"].map((range) => (
        <Pressable
          key={range}
          style={[
            styles.tab,
            timeRange === range && { backgroundColor: primaryColor },
          ]}
          onPress={() => setTimeRange(range as DashboardData["timeRange"])}
        >
          <ThemedText
            style={[
              styles.tabText,
              timeRange === range && styles.activeTabText,
            ]}
          >
            {range}
          </ThemedText>
        </Pressable>
      ))}
    </View>
  );

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <ThemedView
        style={[
          styles.container,
          { backgroundColor, justifyContent: "center" },
        ]}
      >
        <ThemedText style={{ color: "red" }}>{error}</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ScrollView style={[styles.container, { backgroundColor }]}>
      <TimeRangeSelector />

      {/* Expense Categories */}
      <ThemedView style={[styles.card, { backgroundColor: cardBgColor }]}>
        <ThemedText style={styles.sectionTitle}>Expense Categories</ThemedText>
        <View style={styles.categoryGrid}>
          {dashboardData.categories.map((category) => (
            <Pressable key={category.name} style={styles.categoryItem}>
              <ThemedText style={styles.categoryIcon}>
                {category.icon}
              </ThemedText>
              <ThemedText style={styles.categoryName}>
                {category.name}
              </ThemedText>
              <ThemedText style={styles.categoryAmount}>
                ₹{category.amount}
              </ThemedText>
              <ThemedText
                style={[styles.categoryPercentage, { color: primaryColor }]}
              >
                {category.percentage}%
              </ThemedText>
            </Pressable>
          ))}
        </View>
      </ThemedView>

      {/* Budget Forecast */}
      <ThemedView style={[styles.card, { backgroundColor: cardBgColor }]}>
        <ThemedText style={styles.sectionTitle}>Budget Forecast</ThemedText>
        <View style={styles.forecastContainer}>
          <ThemedText style={styles.forecastText}>
            {dashboardData.forecast.prediction} by{" "}
            {dashboardData.forecast.percentage}%
          </ThemedText>
        </View>
      </ThemedView>

      {/* Spending Trends */}
      <ThemedView style={[styles.card, { backgroundColor: cardBgColor }]}>
        <ThemedText style={styles.sectionTitle}>Spending Trends</ThemedText>
        <View style={styles.trendsContainer}>
          {dashboardData.trends.map((trend) => (
            <View key={trend.month} style={styles.trendColumn}>
              <View style={styles.trendBarContainer}>
                <View
                  style={[
                    styles.trendBarFill,
                    {
                      backgroundColor: primaryColor,
                      height: `${(trend.amount / 100000) * 100}%`,
                    },
                  ]}
                />
              </View>
              <View style={styles.trendTextContainer}>
                <ThemedText style={styles.trendMonth}>{trend.month}</ThemedText>
                {trend.festivals?.map((festival) => (
                  <ThemedText key={festival} style={styles.festivalTag}>
                    🎉 {festival}
                  </ThemedText>
                ))}
              </View>
            </View>
          ))}
        </View>
      </ThemedView>

      {/* Top Vendors */}
      <ThemedView style={[styles.card, { backgroundColor: cardBgColor }]}>
        <ThemedText style={styles.sectionTitle}>Top Vendors</ThemedText>
        {dashboardData.topVendors.map((vendor) => (
          <View key={vendor.name} style={styles.vendorItem}>
            <ThemedText style={styles.vendorName}>{vendor.name}</ThemedText>
            <ThemedText style={styles.vendorAmount}>
              ₹{vendor.amount}
            </ThemedText>
            <ThemedText style={styles.vendorFrequency}>
              {vendor.frequency} transactions
            </ThemedText>
          </View>
        ))}
      </ThemedView>

      {/* Savings Suggestion */}
      <ThemedView style={[styles.card, { backgroundColor: cardBgColor }]}>
        <ThemedText style={styles.sectionTitle}>Smart Savings 💡</ThemedText>
        <ThemedText style={styles.savingsText}>
          {dashboardData.savingsSuggestion.action} = ₹
          {dashboardData.savingsSuggestion.savingsAmount}/
          {dashboardData.savingsSuggestion.period} saved
        </ThemedText>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabContainer: {
    flexDirection: "row",
    padding: 10,
    justifyContent: "space-around",
    marginTop: 50,
  },
  tab: {
    padding: 10,
    borderRadius: 20,
    minWidth: 100,
    alignItems: "center",
  },
  tabText: {
    fontSize: 14,
    fontWeight: "500",
  },
  activeTabText: {
    color: "white",
  },
  card: {
    margin: 10,
    padding: 15,
    borderRadius: 15,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  categoryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  categoryItem: {
    width: "48%",
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: "rgba(139, 92, 246, 0.1)",
  },
  categoryIcon: {
    fontSize: 24,
    marginBottom: 5,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: "500",
  },
  categoryAmount: {
    fontSize: 14,
    opacity: 0.8,
  },
  categoryPercentage: {
    fontSize: 16,
    fontWeight: "bold",
  },
  forecastContainer: {
    padding: 15,
    backgroundColor: "rgba(139, 92, 246, 0.1)",
    borderRadius: 10,
  },
  forecastText: {
    fontSize: 16,
    lineHeight: 24,
  },
  trendsContainer: {
    height: 280,
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 20,
  },
  trendColumn: {
    width: 80,
    height: "100%",
    flexDirection: "column",
    alignItems: "center",
  },
  trendBarContainer: {
    width: "100%",
    height: "70%",
    justifyContent: "flex-end",
  },
  trendBarFill: {
    width: "100%",
    borderRadius: 5,
    minHeight: 20,
  },
  trendTextContainer: {
    width: "100%",
    height: "30%",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 8,
  },
  trendMonth: {
    fontSize: 12,
    textAlign: "center",
    marginBottom: 4,
  },
  festivalTag: {
    fontSize: 10,
    color: "#8B5CF6",
    textAlign: "center",
    paddingHorizontal: 4,
    maxWidth: 70,
    flexWrap: "wrap",
  },
  vendorItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(139, 92, 246, 0.1)",
  },
  vendorName: {
    fontSize: 16,
    flex: 1,
  },
  vendorAmount: {
    fontSize: 16,
    fontWeight: "500",
    marginHorizontal: 10,
  },
  vendorFrequency: {
    fontSize: 12,
    opacity: 0.7,
  },
  savingsText: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: "center",
    padding: 10,
  },
});
