import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeIn } from 'react-native-reanimated';

interface GradientButtonProps {
  title: string;
  onPress: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
  colors?: string[];
}

const GradientButton = ({ 
  title, 
  onPress, 
  style, 
  textStyle,
  colors = ['#7159c1', '#8A6FE6']
}: GradientButtonProps) => {
  return (
    <TouchableOpacity 
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Animated.View entering={FadeIn}>
        <LinearGradient
          colors={colors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.gradient, style]}
        >
          <Text style={[styles.text, textStyle]}>
            {title}
          </Text>
        </LinearGradient>
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  gradient: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default GradientButton; 