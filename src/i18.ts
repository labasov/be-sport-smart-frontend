import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import config from './config';

i18n
  .use(HttpBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: true,
    ns: ['static', 'dynamic'],
    defaultNS: 'static',
    backend: {
      loadPath: function (lng: any, ns: any) {
        if (ns === 'dynamic') {
          return `${config.translationApi.baseUrl}/localization/${lng}/translate`;
        }
        return `/locales/${lng}/translate.json`;
      },
    },
    react: {
      useSuspense: false,
    },
    load: 'languageOnly',
  });

export default i18n;