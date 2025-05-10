import React, { useState } from "react";
import { View, ScrollView, Pressable, Dimensions } from "react-native";
import { BarChart, PieChart } from "react-native-chart-kit";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { useColorScheme } from "@/hooks/useColorScheme";

interface Transaction {
  id: string;
  category: string;
  name: string;
  amount: number;
  date: string;
}

interface CategoryData {
  name: string;
  amount: number;
  color: string;
  legendFontColor: string;
  legendFontSize: number;
}

export default function SpendPage() {
  const colorScheme = useColorScheme();
  const [timeframe, setTimeframe] = useState<"weekly" | "monthly" | "yearly">(
    "weekly"
  );
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const screenWidth = Dimensions.get("window").width;

  const chartConfig = {
    backgroundColor: colorScheme === "dark" ? "#000000" : "#FFFFFF",
    backgroundGradientFrom: colorScheme === "dark" ? "#000000" : "#FFFFFF",
    backgroundGradientTo: colorScheme === "dark" ? "#000000" : "#FFFFFF",
    color: (opacity = 1) => `rgba(139, 92, 246, ${opacity})`,
    labelColor: (opacity = 1) =>
      colorScheme === "dark"
        ? `rgba(255, 255, 255, ${opacity})`
        : `rgba(0, 0, 0, ${opacity})`,
    barPercentage: 0.7,
  };

  // Sample data - replace with actual data
  const barData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43, 50],
      },
    ],
  };

  const categoryData: CategoryData[] = [
    {
      name: "Food",
      amount: 7589,
      color: "#FFB800",
      legendFontColor: "#7F7F7F",
      legendFontSize: 12,
    },
    {
      name: "Shopping",
      amount: 5000,
      color: "#00E096",
      legendFontColor: "#7F7F7F",
      legendFontSize: 12,
    },
    {
      name: "Transport",
      amount: 3000,
      color: "#4B7BFF",
      legendFontColor: "#7F7F7F",
      legendFontSize: 12,
    },
    {
      name: "Entertainment",
      amount: 2000,
      color: "#FF6B6B",
      legendFontColor: "#7F7F7F",
      legendFontSize: 12,
    },
    {
      name: "Others",
      amount: 1000,
      color: "#9013FE",
      legendFontColor: "#7F7F7F",
      legendFontSize: 12,
    },
  ];

  const transactions: Transaction[] = [
    {
      id: "1",
      category: "Food",
      name: "Dinner",
      amount: -89.69,
      date: "2024-02-20 20:30:00",
    },
    {
      id: "2",
      category: "Food",
      name: "Fast Food",
      amount: 120.53,
      date: "2024-02-20 08:10:00",
    },
  ];

  const calculatePercentage = (category: string) => {
    const total = categoryData.reduce((sum, item) => sum + item.amount, 0);
    const categoryAmount =
      categoryData.find((item) => item.name === category)?.amount || 0;
    return ((categoryAmount / total) * 100).toFixed(1);
  };

  return (
    <ThemedView style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1, padding: 16 }}>
        <View style={{ marginBottom: 24 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 16,
            }}
          >
            <ThemedText style={{ fontSize: 20, fontWeight: "600" }}>
              How You Spend
            </ThemedText>
            <Pressable
              style={{
                backgroundColor: colorScheme === "dark" ? "#1E1E1E" : "#F3F4F6",
                padding: 8,
                borderRadius: 8,
              }}
            >
              <ThemedText>{timeframe}</ThemedText>
            </Pressable>
          </View>

          <BarChart
            yAxisLabel="$"
            yAxisSuffix=""
            data={barData}
            width={screenWidth - 32}
            height={220}
            chartConfig={chartConfig}
            style={{ borderRadius: 16 }}
            fromZero
            showBarTops
          />
        </View>

        <View style={{ marginBottom: 24 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 16,
            }}
          >
            <ThemedText style={{ fontSize: 20, fontWeight: "600" }}>
              Categories
            </ThemedText>
            <Pressable
              style={{
                backgroundColor: colorScheme === "dark" ? "#1E1E1E" : "#F3F4F6",
                padding: 8,
                borderRadius: 8,
              }}
            >
              <ThemedText>Show All</ThemedText>
            </Pressable>
          </View>

          <View style={{ alignItems: "center" }}>
            <PieChart
              data={categoryData}
              width={screenWidth - 32}
              height={220}
              chartConfig={chartConfig}
              accessor="amount"
              backgroundColor="transparent"
              paddingLeft="0"
              center={[screenWidth / 4, 0]}
              absolute
            />
            {selectedCategory && (
              <View
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: [{ translateX: -50 }, { translateY: -50 }],
                }}
              >
                <ThemedText style={{ fontSize: 24, fontWeight: "600" }}>
                  {calculatePercentage(selectedCategory)}%
                </ThemedText>
              </View>
            )}
          </View>
        </View>

        {selectedCategory && (
          <View>
            {transactions
              .filter(
                (transaction) => transaction.category === selectedCategory
              )
              .map((transaction) => (
                <View
                  key={transaction.id}
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    padding: 16,
                    backgroundColor:
                      colorScheme === "dark" ? "#1E1E1E" : "#F3F4F6",
                    borderRadius: 12,
                    marginBottom: 8,
                  }}
                >
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <View style={{ marginLeft: 12 }}>
                      <ThemedText style={{ fontSize: 16, fontWeight: "500" }}>
                        {transaction.name}
                      </ThemedText>
                      <ThemedText style={{ color: "#666666", marginTop: 4 }}>
                        {new Date(transaction.date).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </ThemedText>
                    </View>
                  </View>
                  <ThemedText
                    style={{
                      fontSize: 16,
                      fontWeight: "500",
                      color: transaction.amount < 0 ? "#FF4B4B" : "#00C48C",
                    }}
                  >
                    {transaction.amount < 0 ? "-" : "+"} $
                    {Math.abs(transaction.amount).toFixed(2)}
                  </ThemedText>
                </View>
              ))}
          </View>
        )}
      </ScrollView>
    </ThemedView>
  );
}
