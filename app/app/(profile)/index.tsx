import React from 'react';
import { View, StyleSheet, Pressable, Alert, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useLanguage } from '@/contexts/LanguageContext';
import { removeAuthToken, getUsername, getPhoneNumber } from '@/utils/storage';
import { LinearGradient } from 'expo-linear-gradient';

export default function ProfilePage() {
  const { t, language, setLanguage } = useLanguage();
  const colorScheme = useColorScheme();
  const primaryColor = '#8B5CF6';
  const cardBgColor = colorScheme === 'dark' ? '#1E1E1E' : '#F3F4F6';
  const username = getUsername();
  const phoneNumber = getPhoneNumber();

  const handleLogout = () => {
    Alert.alert(
      t('logoutTitle'),
      t('logoutMessage'),
      [
        { text: t('cancel'), style: 'cancel' },
        {
          text: t('logout'),
          style: 'destructive',
          onPress: () => {
            removeAuthToken();
            router.replace('/(auth)/login');
          },
        },
      ]
    );
  };

  const SettingItem = ({ icon, title, onPress, showBorder = true }) => (
    <Pressable
      style={[styles.settingItem, showBorder && styles.settingBorder]}
      onPress={onPress}
    >
      <View style={[styles.settingIcon, { backgroundColor: `${primaryColor}15` }]}>
        <MaterialCommunityIcons name={icon} size={22} color={primaryColor} />
      </View>
      <ThemedText style={styles.settingText}>{title}</ThemedText>
      <MaterialCommunityIcons 
        name="chevron-right" 
        size={22} 
        color={colorScheme === 'dark' ? '#666' : '#999'} 
      />
    </Pressable>
  );

  const LanguageOption = ({ code, title }) => (
    <Pressable
      style={[
        styles.languageOption,
        language === code && { backgroundColor: `${primaryColor}15` }
      ]}
      onPress={() => setLanguage(code)}
    >
      <ThemedText style={[
        styles.languageText,
        language === code && { color: primaryColor }
      ]}>
        {title}
      </ThemedText>
      {language === code && (
        <MaterialCommunityIcons name="check-circle" size={20} color={primaryColor} />
      )}
    </Pressable>
  );

  return (
    <ThemedView style={styles.container}>
      <LinearGradient
        colors={[primaryColor, `${primaryColor}80`]}
        style={styles.header}
      >
        <View style={styles.profileInfo}>
          <View style={styles.avatar}>
            <ThemedText style={styles.avatarText}>
              {username?.charAt(0).toUpperCase()}
            </ThemedText>
          </View>
          <View style={styles.userInfo}>
            <ThemedText style={styles.username}>{username}</ThemedText>
            <ThemedText style={styles.phoneNumber}>{phoneNumber}</ThemedText>
          </View>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content}>
        <View style={[styles.card, { backgroundColor: cardBgColor }]}>
          <ThemedText style={styles.sectionTitle}>{t('language')}</ThemedText>
          <View style={styles.languageGrid}>
            <LanguageOption code="en" title="English" />
            <LanguageOption code="hi" title="हिंदी" />
            <LanguageOption code="gu" title="ગુજરાતી" />
            <LanguageOption code="mr" title="मराठी" />
          </View>
        </View>
        <Pressable
          style={[styles.logoutButton, { backgroundColor: cardBgColor }]}
          onPress={handleLogout}
        >
          <MaterialCommunityIcons name="logout" size={22} color="#FF4444" />
          <ThemedText style={styles.logoutText}>{t('logout')}</ThemedText>
        </Pressable>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#FFFFFF20',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 28,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  userInfo: {
    marginLeft: 16,
  },
  username: {
    fontSize: 24,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  phoneNumber: {
    fontSize: 14,
    color: '#FFFFFF90',
    marginTop: 4,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  card: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
    opacity: 0.7,
  },
  languageGrid: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  languageOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  languageText: {
    fontSize: 16,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  settingBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#33333320',
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  settingText: {
    flex: 1,
    fontSize: 16,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    marginTop: 8,
  },
  logoutText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#FF4444',
    fontWeight: '500',
  },
});