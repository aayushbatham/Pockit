import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useColorScheme } from '@/hooks/useColorScheme';

interface BottomBarProps {
  primaryColor: string;
}

export function BottomBar({ primaryColor }: BottomBarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const colorScheme = useColorScheme();
  
  const isActive = (path: string) => {
    return pathname.startsWith(path);
  };
  
  // Apple-inspired dark theme colors
  const inactiveColor = "#8E8E93";
  const backgroundColor = "#1C1C1E";
  
  return (
    <View style={[styles.container, { backgroundColor }]}>
      <TouchableOpacity 
        style={styles.tabButton} 
        onPress={() => router.push('/(home)')}
      >
        <MaterialCommunityIcons 
          name={isActive('/(home)') ? "home" : "home-outline"} 
          size={22} 
          color={isActive('/(home)') ? primaryColor : inactiveColor} 
        />
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.tabButton} 
        onPress={() => router.push('/(search)')}
      >
        <MaterialCommunityIcons 
          name="magnify" 
          size={22} 
          color={isActive('/(search)') ? primaryColor : inactiveColor} 
        />
      </TouchableOpacity>
      
      <View style={styles.addButtonContainer}>
        <TouchableOpacity 
          style={[styles.addButton, { backgroundColor: primaryColor }]}
          onPress={() => console.log('Add button pressed')}
        >
          <MaterialCommunityIcons 
            name="plus" 
            size={20} 
            color="#FFFFFF" 
          />
        </TouchableOpacity>
      </View>
      
      <TouchableOpacity 
        style={styles.tabButton} 
        onPress={() => router.push('/(notifications)')}
      >
        <MaterialCommunityIcons 
          name="bell-outline" 
          size={22} 
          color={isActive('/(notifications)') ? primaryColor : inactiveColor} 
        />
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.tabButton} 
        onPress={() => router.push('/(profile)')}
      >
        <MaterialCommunityIcons 
          name={isActive('/(profile)') ? "account" : "account-outline"} 
          size={22} 
          color={isActive('/(profile)') ? primaryColor : inactiveColor} 
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 50,
    alignItems: 'center',
    justifyContent: 'space-around',
    borderTopWidth: 0.5,
    borderTopColor: '#2C2C2E',
  },
  tabButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  addButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
  },
  addButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    justifyContent: 'center',
    alignItems: 'center',
  },
});