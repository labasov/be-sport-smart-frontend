import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpBackend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

import config from './config';
import { StaticNamespace, DynamicNamespace } from './constants/LocalizationConstants';

i18n
  .use(HttpBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: false,
    ns: [StaticNamespace, DynamicNamespace],
    defaultNS: StaticNamespace,
    backend: {
      loadPath: function (language: string, namespace: string[]) {
        if (namespace[0] === DynamicNamespace) {
          return `${config.dynamicLocalization.baseUrl}?lang=${language}`;
        }

        return `/locales/${language}/translate.json`;
      },
      parse: function (data: string) {
        // Free-tier test environment I use to host the JSON file, wrapping it in a record object
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