import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { ThemedText } from './ThemedText';
import { useLanguage } from '@/contexts/LanguageContext';
import type { Language } from '@/constants/translations';
import { useColorScheme } from '@/hooks/useColorScheme';

const languageNames: Record<Language, string> = {
  en: 'English',
  gu: 'ગુજરાતી',
  mr: 'मराठी',
  hi: 'हिंदी'
};

export function LanguageSelector() {
  const { language, setLanguage, t } = useLanguage();
  const colorScheme = useColorScheme();
  const primaryColor = '#8B5CF6';

  const handleLanguageSelect = (lang: Language) => {
    setLanguage(lang);
  };

  return (
    <View style={styles.container}>
      {(Object.keys(languageNames) as Language[]).map((lang) => (
        <Pressable
          key={lang}
          style={[
            styles.languageButton,
            {
              backgroundColor: lang === language ? primaryColor : 'transparent',
              borderColor: primaryColor,
            },
          ]}
          onPress={() => handleLanguageSelect(lang)}
        >
          <ThemedText
            style={[
              styles.languageText,
              {
                color: lang === language
                  ? '#FFFFFF'
                  : colorScheme === 'dark'
                  ? '#FFFFFF'
                  : '#000000',
              },
            ]}
          >
            {languageNames[lang]}
          </ThemedText>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    padding: 10,
  },
  languageButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    minWidth: '45%',
    alignItems: 'center',
  },
  languageText: {
    fontSize: 16,
    fontWeight: '500',
  },
}); 