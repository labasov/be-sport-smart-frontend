import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpBackend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

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
      loadPath: function (language: string, namespace: string[]) {
        if (namespace[0] === 'dynamic') {
          if (process.env.NODE_ENV === 'development') {
            return 'https://api.jsonbin.io/v3/b/667e16dbe41b4d34e40a2652';
          }

          return `${config.translationApi.baseUrl}/localization/${language}/translate`;
        }

        return `/locales/${language}/translate.json`;
      },
      parse: function (data: string) {
        const parsedData = JSON.parse(data);
        if (parsedData.record) {
          return parsedData.record;
        }
        return parsedData;
      }
    },
    react: {
      useSuspense: false,
    },
    load: 'languageOnly',
  });

export default i18n;