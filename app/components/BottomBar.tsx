import React from 'react';
import { View, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useColorScheme } from '@/hooks/useColorScheme';

interface BottomBarProps {
  primaryColor: string;
}

export function BottomBar({ primaryColor }: BottomBarProps) {
  const router = useRouter();
  const pathname = usePathname();
  
  const isActive = (path: string) => pathname?.startsWith(path);
  
  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.tabButton} 
        onPress={() => router.push('/(home)')}
      >
        <MaterialCommunityIcons 
          name="home" 
          size={26} 
          color={isActive('/(home)') ? "#FFFFFF" : "#666666"} 
        />
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.tabButton} 
        onPress={() => router.push('/stats')}
      >
        <MaterialCommunityIcons 
          name="chart-pie" 
          size={26} 
          color={isActive('/stats') ? "#FFFFFF" : "#666666"} 
        />
      </TouchableOpacity>
      
      <View style={styles.addButtonContainer}>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => router.push('/add')}
        >
          <MaterialCommunityIcons 
            name="plus" 
            size={32} 
            color="#FFFFFF" 
          />
        </TouchableOpacity>
      </View>
      
      <TouchableOpacity 
        style={styles.tabButton} 
        onPress={() => router.push('/wallet')}
      >
        <MaterialCommunityIcons 
          name="wallet" 
          size={26} 
          color={isActive('/wallet') ? "#FFFFFF" : "#666666"} 
        />
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.tabButton} 
        onPress={() => router.push('/(profile)')}
      >
        <MaterialCommunityIcons 
          name="account" 
          size={26} 
          color={isActive('/profile') ? "#FFFFFF" : "#666666"} 
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: Platform.OS === 'ios' ? 85 : 85,
    paddingBottom: Platform.OS === 'ios' ? 20 : 0,
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#000000',
    borderTopWidth: 0,
    paddingHorizontal: 16,
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
    width: 75,
    height: Platform.OS === 'ios' ? 85 : 65,
    marginTop: -40,
  },
  addButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#2C2C2E',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
});