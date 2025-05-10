import React from 'react';
import { View, StyleSheet, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { useLanguage } from '@/contexts/LanguageContext';
import { ThemedText } from './ThemedText';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import type { Language } from '@/constants/translations';

const languages: { code: Language; name: string }[] = [
  { code: 'en', name: 'English' },
  { code: 'gu', name: 'ગુજરાતી' },
  { code: 'hi', name: 'हिंदी' },
  { code: 'mr', name: 'मराठी' }
];

export function LanguageSelector() {
  const [modalVisible, setModalVisible] = React.useState(false);
  const { language, setLanguage, t } = useLanguage();

  const currentLanguage = languages.find(lang => lang.code === language)?.name || 'English';

  return (
    <>
      <TouchableOpacity
        style={styles.selector}
        onPress={() => setModalVisible(true)}
      >
        <ThemedText style={styles.selectedText}>{currentLanguage}</ThemedText>
        <MaterialCommunityIcons name="chevron-down" size={24} color="#666" />
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setModalVisible(false)}
        >
          <View style={styles.modalContent}>
            <ScrollView>
              {languages.map((lang) => (
                <TouchableOpacity
                  key={lang.code}
                  style={[
                    styles.languageOption,
                    language === lang.code && styles.selectedOption
                  ]}
                  onPress={() => {
                    setLanguage(lang.code);
                    setModalVisible(false);
                  }}
                >
                  <ThemedText style={[
                    styles.languageText,
                    language === lang.code && styles.selectedLanguageText
                  ]}>
                    {lang.name}
                  </ThemedText>
                  {language === lang.code && (
                    <MaterialCommunityIcons name="check" size={24} color="#8B5CF6" />
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  selector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#2C2C2E',
  },
  selectedText: {
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#1C1C1E',
    borderRadius: 12,
    maxHeight: 300,
  },
  languageOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#2C2C2E',
  },
  selectedOption: {
    backgroundColor: '#2C2C2E',
  },
  languageText: {
    fontSize: 16,
  },
  selectedLanguageText: {
    color: '#8B5CF6',
    fontWeight: '600',
  },
}); 