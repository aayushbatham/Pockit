import React, { useRef } from 'react';
import { View, Text, StyleSheet, Dimensions, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { 
  FadeInDown, 
  FadeInUp,
} from 'react-native-reanimated';
import Button from '../components/Button';

const { height, width } = Dimensions.get('window');

const features = [
  {
    id: '1',
    icon: '🤖',
    title: 'AI-Powered Analysis',
    description: 'Smart insights about your spending habits',
  },
  {
    id: '2',
    icon: '📱',
    title: 'Easy Tracking',
    description: 'Effortlessly track your daily expenses',
  },
  {
    id: '3',
    icon: '💰',
    title: 'Smart Budgeting',
    description: 'Set and manage budgets with AI assistance',
  },
];

const CarouselItem = ({ item, index }: any) => (
  <Animated.View 
    entering={FadeInDown.delay(200 * index).springify()}
    style={styles.carouselItem}
  >
    <Text style={styles.emojiIcon}>{item.icon}</Text>
    <Text style={styles.featureTitle}>{item.title}</Text>
    <Text style={styles.featureDescription}>{item.description}</Text>
  </Animated.View>
);

const Landing = ({ navigation }: any) => {
  const flatListRef = useRef(null);

  const handleGetStarted = () => {
    navigation.navigate('SignIn');
  };

  return (
    <LinearGradient
      colors={['#1A1A1A', '#2D3436', '#121212']}
      style={styles.container}
    >
      <Animated.View 
        entering={FadeInDown.delay(200).springify()}
        style={styles.header}
      >
        <Text style={styles.title}>Pockit</Text>
        <Animated.Text 
          entering={FadeInDown.delay(400).springify()}
          style={styles.subtitle}
        >
          AI Powered Expense Tracker
        </Animated.Text>
      </Animated.View>

      <View style={styles.carouselContainer}>
        <FlatList
          ref={flatListRef}
          data={features}
          renderItem={CarouselItem}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          snapToInterval={width * 0.8 + 20}
          decelerationRate="fast"
          contentContainerStyle={styles.carouselContent}
        />
      </View>

      <Animated.View 
        entering={FadeInUp.delay(800).springify()}
        style={styles.buttonContainer}
      >
        <Button 
          title="Get Started"
          onPress={handleGetStarted}
          style={styles.button}
          textStyle={styles.buttonText}
        />
      </Animated.View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  header: {
    height: height * 0.25,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 60,
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
    letterSpacing: 2,
  },
  subtitle: {
    fontSize: 18,
    color: '#FFFFFF99',
    textAlign: 'center',
    letterSpacing: 1,
  },
  carouselContainer: {
    height: height * 0.45,
    justifyContent: 'center',
  },
  carouselContent: {
    paddingHorizontal: width * 0.1,
    alignItems: 'center',
  },
  carouselItem: {
    width: width * 0.8,
    height: height * 0.35,
    marginHorizontal: 10,
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emojiIcon: {
    fontSize: 48,
    marginBottom: 20,
  },
  featureTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 10,
    textAlign: 'center',
  },
  featureDescription: {
    fontSize: 16,
    color: '#FFFFFF99',
    textAlign: 'center',
    lineHeight: 24,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 50,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
  },
  button: {
    height: 70,
    backgroundColor: '#7159c1',
    borderRadius: 30,
    shadowColor: '#7159c1',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    letterSpacing: 1,
    lineHeight: 24,
  },
});

export default Landing;