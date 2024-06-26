import i18nextBase from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend'; // have a own http fallback
import MultiloadAdapter, { MultiloadBackendOptions } from 'i18next-multiload-backend-adapter';
import { initReactI18next } from 'react-i18next';


export const i18n = i18nextBase
  .use(MultiloadAdapter)
  .use(LanguageDetector)
  .use(initReactI18next);


i18n
.init<MultiloadBackendOptions>({
    fallbackLng: 'en',
    debug: true,
    backend: {
      backend: HttpApi,
      backendOption: {
        loadPath: '/locales/{{lng}}/{{ns}}.json' // http load path for my own fallback
      }
    },
    react: {
      useSuspense: false,
    },
    interpolation: {
      escapeValue: false,
    },
    load: 'languageOnly', // Only load 'en' and not 'en-US'
  });