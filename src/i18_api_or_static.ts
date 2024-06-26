import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import config from './config';

interface CustomBackendOptions {
  apiUrl: string;
  staticFilePath: string;
}

// Custom backend for i18next
// This backend will first try to fetch the translation from the backend API
// If the API request fails, it will try to fetch the translation from the static file
const customBackend: any = {
  type: 'backend',
  init(services: any, backendOptions: CustomBackendOptions, i18nextOptions: any) {
    this.services = services;
    this.options = backendOptions;
    this.i18nextOptions = i18nextOptions;
  },
  read(language: string, namespace: string, callback: (error: any, result: any) => void) {
    const translationApiUrl = `${config.translationApi.baseUrl}/localization/${language}/${namespace}`;
    const staticFilePath = `/locales/${language}/${namespace}.json`;

    fetch(translationApiUrl)
      .then(response => {
        if (response.ok) {
          return response.json();
        }

        throw new Error('API response not ok');
      })
      .then(data => {
        callback(null, data);
      })
      .catch(() => {
        fetch(staticFilePath)
          .then(response => response.json())
          .then(data => {
            callback(null, data);
          })
          .catch(error => {
            callback(error, false);
          });
      });
  }
};

i18next
  .use(customBackend)
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    fallbackLng: 'en',
    debug: true,
    backend: {
      apiUrl: '',
      staticFilePath: ''
    },
    react: {
      useSuspense: false,
    },
    interpolation: {
      escapeValue: false,
    },
    load: 'languageOnly', // Only load 'en' and not 'en-US'
  });