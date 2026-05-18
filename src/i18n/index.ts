import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';
import ptBR from './locales/pt-BR/common';
import en from './locales/en/common';
import es from './locales/es/common';

const resources = {
  'pt-BR': { translation: ptBR },
  en: { translation: en },
  es: { translation: es },
};

const getDeviceLanguage = () => {
  const locale = Localization.getLocales()[0]?.languageTag || 'pt-BR';

  if (locale.startsWith('pt')) return 'pt-BR';
  if (locale.startsWith('es')) return 'es';
  return 'en';
};

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v4',
  resources,
  lng: getDeviceLanguage(),
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
