import i18n from 'i18next';
import Backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';
import EN from './locales/languages/en-GB.json';
import FR from './locales/languages/fr-FR.json';
import ES from './locales/languages/es-MX.json';
import DE from './locales/languages/de-DE.json';
import NL from './locales/languages/nl-NL.json';
import PT from './locales/languages/pt-BR.json';

i18n
  .use(initReactI18next)
  .use(Backend)
  .init({
    lng: 'en-GB',
    resources: {
      'en-GB': {
        translation: {
          ...EN,
        },
      },
      'fr-FR': {
        translation: {
          ...FR,
        },
      },
      'es-MX': {
        translation: {
          ...ES,
        },
      },
      'de-DE': {
        translation: {
          ...DE,
        },
      },
      'nl-NL': {
        translation: {
          ...NL,
        },
      },
      'pt-BR': {
        translation: {
          ...PT,
        },
      },
    },
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
      wait: true,
    },
  });

export default i18n;
