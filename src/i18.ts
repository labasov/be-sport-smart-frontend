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
    //defaultNS: StaticNamespace,
    backend: {
      loadPath: function (language: string, namespace: string[]) {
        if (namespace[0] === DynamicNamespace) {
          return `${config.dynamicLocalization.baseUrl}/${language}/translate.json`;
        }

        return `/locales/${language}/translate.json`;
      }
    },
    react: {
      useSuspense: false,
    },
    load: 'languageOnly',
  });

export default i18n;