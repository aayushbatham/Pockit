import React, { useState, useEffect } from 'react';
import { View, ScrollView, Pressable, Dimensions, Platform, StyleSheet } from 'react-native';
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useLanguage } from "@/contexts/LanguageContext";
import Animated, { 
  useAnimatedStyle, 
  withSpring, 
  withTiming, 
  useSharedValue,
  withSequence,
  withDelay
} from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

interface Transaction {
  id: string;
  category: string;
  name: string;
  amount: number;
  date: string;
  icon: string;
}

interface CategoryData {
  name: string;
  amount: number;
  color: string;
}

interface PieSegmentProps {
  percentage: number;
  color: string;
  rotation: number;
  isSelected: boolean;
  onPress: () => void;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const PieSegment: React.FC<PieSegmentProps> = ({ percentage, color, rotation, isSelected, onPress }) => {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(0);
  
  useEffect(() => {
    opacity.value = withDelay(
      rotation * 100,
      withTiming(1, { duration: 1000 })
    );
    scale.value = withDelay(
      rotation * 100,
      withSequence(
        withTiming(1.1, { duration: 200 }),
        withTiming(1, { duration: 200 })
      )
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value },
      { rotate: `${rotation}deg` }
    ],
    opacity: opacity.value
  }));

  return (
    <AnimatedPressable
      onPress={onPress}
      style={[{
        position: 'absolute',
        width: 280 - rotation * 0.6,
        height: 280 - rotation * 0.6,
        minWidth: 80,
        minHeight: 80,
        justifyContent: 'center',
        alignItems: 'center'
      }, animatedStyle]}
    >
      <View
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          transform: [{ rotate: '-45deg' }],
          overflow: 'hidden',
          borderRadius: 280,
        }}
      >
        <Animated.View
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backgroundColor: 'transparent',
            borderWidth: 35,
            borderColor: color,
            opacity: isSelected ? 1 : 0.85,
            borderRadius: 280,
            shadowColor: color,
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: isSelected ? 0.9 : 0.5,
            shadowRadius: isSelected ? 12 : 6,
            elevation: isSelected ? 15 : 8,
            transform: [
              { scale: isSelected ? 1.08 : 1 }
            ]
          }}
        />
        {isSelected && (
          <View style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            borderRadius: 280,
            backgroundColor: `${color}15`,
          }} />
        )}
      </View>
    </AnimatedPressable>
  );
};

export default function SpendPage() {
  const colorScheme = useColorScheme();
  const { t } = useLanguage();
  const [timeframe, setTimeframe] = useState<'weekly' | 'monthly' | 'yearly'>('weekly');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const screenWidth = Dimensions.get('window').width;

  // Weekly spending data
  const weeklyData = [
    { day: 'Mon', amount: 500 },
    { day: 'Tue', amount: 1000 },
    { day: 'Wed', amount: 2000 },
    { day: 'Thu', amount: 800 },
    { day: 'Fri', amount: 1500 },
    { day: 'Sat', amount: 2000 },
    { day: 'Sun', amount: 2500 }
  ];

  const maxAmount = Math.max(...weeklyData.map(item => item.amount));
  const yAxisLabels = ['$0', '$0.5k', '$1k', '$1.5k', '$2k'];

  const categoryData: CategoryData[] = [
    {
      name: t('food'),
      amount: 7589,
      color: "#FF3B30"  // Bright Red
    },
    {
      name: t('shopping'),
      amount: 5000,
      color: "#00C7BE"  // Bright Teal
    },
    {
      name: t('transport'),
      amount: 3000,
      color: "#007AFF"  // Bright Blue
    },
    {
      name: t('entertainment'),
      amount: 2000,
      color: "#34C759"  // Bright Green
    },
    {
      name: t('others'),
      amount: 1000,
      color: "#E4A0FF"  // Light Purple (replacing yellow)
    }
  ];

  const mockTransactions: Record<string, Transaction[]> = {
    Food: [
      {
        id: '1',
        category: 'Food',
        name: 'Dinner',
        amount: -89.69,
        date: '2024-02-20 20:30:00',
        icon: 'restaurant'
      },
      {
        id: '2',
        category: 'Food',
        name: 'Fast Food',
        amount: 120.53,
        date: '2024-02-20 08:10:00',
        icon: 'fast-food'
      },
      {
        id: '3',
        category: 'Food',
        name: 'Grocery Shopping',
        amount: -156.42,
        date: '2024-02-19 15:45:00',
        icon: 'cart'
      }
    ],
    Shopping: [
      {
        id: '4',
        category: 'Shopping',
        name: 'Nike Store',
        amount: -299.99,
        date: '2024-02-20 14:30:00',
        icon: 'shirt'
      },
      {
        id: '5',
        category: 'Shopping',
        name: 'Electronics',
        amount: -899.99,
        date: '2024-02-19 11:20:00',
        icon: 'laptop'
      }
    ],
    Transport: [
      {
        id: '6',
        category: 'Transport',
        name: 'Uber Ride',
        amount: -25.50,
        date: '2024-02-20 09:15:00',
        icon: 'car'
      },
      {
        id: '7',
        category: 'Transport',
        name: 'Metro Pass',
        amount: -75.00,
        date: '2024-02-18 17:30:00',
        icon: 'subway'
      }
    ],
    Entertainment: [
      {
        id: '8',
        category: 'Entertainment',
        name: 'Cinema Tickets',
        amount: -32.00,
        date: '2024-02-19 19:00:00',
        icon: 'film'
      },
      {
        id: '9',
        category: 'Entertainment',
        name: 'Netflix Subscription',
        amount: -15.99,
        date: '2024-02-18 00:00:00',
        icon: 'tv'
      }
    ],
    Others: [
      {
        id: '10',
        category: 'Others',
        name: 'Gift',
        amount: -50.00,
        date: '2024-02-20 16:45:00',
        icon: 'gift'
      },
      {
        id: '11',
        category: 'Others',
        name: 'Donation',
        amount: -20.00,
        date: '2024-02-19 10:30:00',
        icon: 'heart'
      }
    ]
  };

  const calculatePercentage = (category: string) => {
    const total = categoryData.reduce((sum, item) => sum + item.amount, 0);
    const categoryAmount = categoryData.find(item => item.name === category)?.amount || 0;
    return ((categoryAmount / total) * 100).toFixed(1);
  };

  const totalAmount = categoryData.reduce((sum, item) => sum + item.amount, 0);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemedView style={{ flex: 1 }}>
        <SafeAreaView style={{ flex: 1 }} edges={['top', 'left', 'right']}>
          <ScrollView 
            style={{ flex: 1 }}
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.container}>
              <View style={styles.header}>
                <View>
                  <ThemedText style={styles.title}>{t('analytics')}</ThemedText>
                  <ThemedText style={styles.subtitle}>{t('trackSpending')}</ThemedText>
                </View>
                <Pressable 
                  style={[
                    styles.timeframeButton,
                    { backgroundColor: colorScheme === 'dark' ? '#1E1E1E' : '#F3F4F6' }
                  ]}
                >
                  <ThemedText style={styles.timeframeText}>{t(timeframe)}</ThemedText>
                  <Ionicons 
                    name="chevron-down" 
                    size={20} 
                    color={colorScheme === 'dark' ? '#FFFFFF' : '#000000'} 
                  />
                </Pressable>
              </View>

              <View style={styles.chartContainer}>
                {/* Inner circle */}
                <Animated.View
                  style={[
                    styles.innerCircle,
                    { 
                      backgroundColor: colorScheme === 'dark' ? '#000000' : '#F3F4F6',
                      borderColor: colorScheme === 'dark' ? '#333333' : '#E5E7EB',
                    }
                  ]}
                >
                  {selectedCategory ? (
                    <View style={styles.centerContent}>
                      <ThemedText style={styles.percentageText}>
                        {calculatePercentage(selectedCategory)}%
                      </ThemedText>
                      <ThemedText style={styles.categoryText}>
                        {t(selectedCategory.toLowerCase())}
                      </ThemedText>
                      <ThemedText style={styles.amountText}>
                        ${categoryData.find(c => c.name === selectedCategory)?.amount.toLocaleString()}
                      </ThemedText>
                    </View>
                  ) : (
                    <View style={styles.centerContent}>
                      <ThemedText style={styles.totalText}>{t('totalSpend')}</ThemedText>
                      <ThemedText style={[styles.percentageText, { fontSize: 28 }]}>
                        ${totalAmount.toLocaleString()}
                      </ThemedText>
                    </View>
                  )}
                </Animated.View>

                {/* Rings */}
                {categoryData.map((category, index) => {
                  const percentage = (category.amount / totalAmount) * 100;
                  const rotation = index * 25;

                  return (
                    <PieSegment
                      key={category.name}
                      percentage={percentage}
                      color={category.color}
                      rotation={rotation}
                      isSelected={selectedCategory === category.name}
                      onPress={() => {
                        setSelectedCategory(prev => prev === category.name ? null : category.name);
                        if (Platform.OS === 'ios') {
                          Haptics.selectionAsync();
                        }
                      }}
                    />
                  );
                })}
              </View>

              {/* Category Legend */}
              <View style={styles.legend}>
                {categoryData.map(category => (
                  <Pressable
                    key={category.name}
                    style={[
                      styles.legendItem,
                      { backgroundColor: colorScheme === 'dark' ? 
                        selectedCategory === category.name ? '#333333' : 'transparent' : 
                        selectedCategory === category.name ? '#F3F4F6' : 'transparent' 
                      }
                    ]}
                    onPress={() => setSelectedCategory(prev => prev === category.name ? null : category.name)}
                  >
                    <View style={[styles.legendDot, { backgroundColor: category.color }]} />
                    <View style={styles.legendText}>
                      <ThemedText style={styles.legendCategory}>{category.name}</ThemedText>
                      <ThemedText style={styles.legendAmount}>
                        ${category.amount.toLocaleString()}
                      </ThemedText>
                    </View>
                    <ThemedText style={styles.legendPercentage}>
                      {((category.amount / totalAmount) * 100).toFixed(1)}%
                    </ThemedText>
                  </Pressable>
                ))}
              </View>
            </View>

            {/* Transactions Section */}
            {selectedCategory && (
              <View style={styles.transactionsContainer}>
                <View style={styles.transactionsHeader}>
                  <ThemedText style={styles.transactionsTitle}>
                    {t(selectedCategory.toLowerCase())} {t('transactions')}
                  </ThemedText>
                  <ThemedText style={styles.transactionsCount}>
                    {mockTransactions[selectedCategory]?.length || 0} {t('items')}
                  </ThemedText>
                </View>
                
                {mockTransactions[selectedCategory]?.map(transaction => (
                  <Pressable
                    key={transaction.id}
                    style={({ pressed }) => [
                      styles.transactionItem,
                      {
                        backgroundColor: colorScheme === 'dark' 
                          ? pressed ? '#2A2A2A' : '#1E1E1E' 
                          : pressed ? '#EAEAEA' : '#F3F4F6'
                      }
                    ]}
                  >
                    <View style={styles.transactionLeft}>
                      <View style={[
                        styles.transactionIcon,
                        { backgroundColor: colorScheme === 'dark' ? '#333' : '#E5E7EB' }
                      ]}>
                        <Ionicons 
                          name={transaction.icon as any} 
                          size={20} 
                          color={categoryData.find(cat => cat.name === transaction.category)?.color} 
                        />
                      </View>
                      <View>
                        <ThemedText style={styles.transactionName}>{t(transaction.name.toLowerCase())}</ThemedText>
                        <View style={styles.transactionMeta}>
                          <ThemedText style={styles.transactionTime}>
                            {new Date(transaction.date).toLocaleTimeString([], { 
                              hour: '2-digit', 
                              minute: '2-digit',
                              hour12: true 
                            })}
                          </ThemedText>
                          <View style={[
                            styles.transactionTag,
                            { backgroundColor: colorScheme === 'dark' ? '#333' : '#E5E7EB' }
                          ]}>
                            <ThemedText style={styles.transactionTagText}>{t('cash')}</ThemedText>
                          </View>
                        </View>
                      </View>
                    </View>
                    <View>
                      <ThemedText style={[
                        styles.transactionAmount,
                        { color: transaction.amount < 0 ? '#FF4B4B' : '#00C48C' }
                      ]}>
                        {transaction.amount < 0 ? '-' : '+'} ${Math.abs(transaction.amount).toFixed(2)}
                      </ThemedText>
                      <ThemedText style={styles.transactionBalance}>{t('balance')}</ThemedText>
                    </View>
                  </Pressable>
                ))}
              </View>
            )}
          </ScrollView>
        </SafeAreaView>
      </ThemedView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.7,
    marginTop: 4,
  },
  timeframeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    gap: 8,
  },
  timeframeText: {
    fontSize: 16,
    fontWeight: '500',
  },
  chartContainer: {
    width: '100%',
    height: 400,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  innerCircle: {
    position: 'absolute',
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 2,
    zIndex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 6,
    elevation: 8,
  },
  centerContent: {
    alignItems: 'center',
    padding: 10,
  },
  percentageText: {
    fontSize: 36,
    fontWeight: '700',
    textAlign: 'center',
  },
  categoryText: {
    fontSize: 14,
    opacity: 0.7,
    marginTop: 4,
  },
  totalText: {
    fontSize: 16,
    opacity: 0.7,
    marginBottom: 8,
  },
  amountText: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 4,
  },
  legend: {
    marginTop: 20,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 12,
  },
  legendText: {
    flex: 1,
  },
  legendCategory: {
    fontSize: 16,
    fontWeight: '500',
  },
  legendAmount: {
    fontSize: 14,
    opacity: 0.7,
    marginTop: 2,
  },
  legendPercentage: {
    fontSize: 16,
    fontWeight: '600',
  },
  transactionsContainer: {
    paddingHorizontal: 20,
  },
  transactionsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  transactionsTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  transactionsCount: {
    fontSize: 14,
    opacity: 0.6,
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  transactionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  transactionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  transactionName: {
    fontSize: 16,
    fontWeight: '500',
  },
  transactionMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  transactionTime: {
    fontSize: 12,
    opacity: 0.6,
  },
  transactionTag: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    marginLeft: 8,
  },
  transactionTagText: {
    fontSize: 12,
    opacity: 0.6,
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'right',
  },
  transactionBalance: {
    fontSize: 12,
    opacity: 0.6,
    marginTop: 4,
    textAlign: 'right',
  },
});
