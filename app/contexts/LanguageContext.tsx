import React, { createContext, useContext, useState, useEffect } from 'react';
import { MMKV } from 'react-native-mmkv';
import { I18nManager } from 'react-native';
import { translations } from '@/constants/translations';
import type { Language } from '@/constants/translations';

const storage = new MMKV();
const LANGUAGE_KEY = 'app_language';

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof typeof translations.en) => string;
  isRTL: boolean;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    const savedLanguage = storage.getString(LANGUAGE_KEY);
    return (savedLanguage as Language) || 'en';
  });

  // Determine if the language is RTL
  const isRTL = language === 'gu' || language === 'hi' || language === 'mr';

  const setLanguage = (lang: Language) => {
    storage.set(LANGUAGE_KEY, lang);
    setLanguageState(lang);
    
    // Instead of forcing RTL changes, we'll let components handle RTL individually
    // This prevents the entire app from flipping
    // I18nManager.forceRTL(lang === 'gu' || lang === 'hi' || lang === 'mr');
  };

  const t = (key: keyof typeof translations.en): string => {
    return String(translations[language][key] || translations.en[key] || key);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
} 