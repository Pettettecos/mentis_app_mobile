import { useState, useEffect } from 'react';
import { Modal, Pressable, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Icon, Text, RadioButton } from 'react-native-paper';
import * as SecureStore from 'expo-secure-store';
import { colors } from '@/theme/colors';
import { styles } from './styles';

const LANGUAGES = [
  { code: 'pt-BR', label: 'Português (Brasil)', flag: '🇧🇷' },
  { code: 'en', label: 'English (US)', flag: '🇺🇸' },
  { code: 'es', label: 'Español', flag: '🇪🇸' },
];

const LANGUAGE_STORAGE_KEY = 'app_language';

interface LanguageSelectorProps {
  visible: boolean;
  onClose: () => void;
}

export function LanguageSelector({ visible, onClose }: LanguageSelectorProps) {
  const { i18n, t } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);

  useEffect(() => {
    setSelectedLanguage(i18n.language);
  }, [i18n.language, visible]);

  const handleLanguageChange = async (lang: string) => {
    setSelectedLanguage(lang);
    await i18n.changeLanguage(lang);
    try {
      await SecureStore.setItemAsync(LANGUAGE_STORAGE_KEY, lang);
    } catch (error) {
      console.error('Failed to save language preference:', error);
    }
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable style={styles.overlay} onPress={onClose}>
        <Pressable style={styles.modalContainer} onPress={(e) => e.stopPropagation()}>
          <View style={styles.header}>
            <Text style={styles.title}>{t('common.selectLanguage')}</Text>
            <Pressable onPress={onClose} style={styles.closeButton}>
              <Icon source="close" size={24} color={colors.textMuted} />
            </Pressable>
          </View>

          <RadioButton.Group
            onValueChange={handleLanguageChange}
            value={selectedLanguage}
          >
            {LANGUAGES.map((lang) => (
              <Pressable
                key={lang.code}
                style={styles.languageItem}
                onPress={() => handleLanguageChange(lang.code)}
              >
                <RadioButton value={lang.code} color={colors.primary} />
                <Text style={styles.flag}>{lang.flag}</Text>
                <Text style={styles.languageLabel}>{lang.label}</Text>
              </Pressable>
            ))}
          </RadioButton.Group>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
