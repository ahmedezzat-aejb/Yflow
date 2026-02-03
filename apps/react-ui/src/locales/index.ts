import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import all translation files
import en from './en.json';
import ar from './ar.json';
import ru from './ru.json';
import zh from './zh.json';

const resources = {
  en: { translation: en },
  ar: { translation: ar },
  ru: { translation: ru },
  zh: { translation: zh }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // default language
    fallbackLng: 'en',
    
    interpolation: {
      escapeValue: false // React already escapes by default
    },
    
    react: {
      useSuspense: false
    }
  });

export default i18n;
