import i18next from 'i18next';

i18next.init({
  lng: 'en-GB',
  react: {
    useSuspense: false,
    wait: true,
  },
  resources: {
    'en-GB': {
      translation: {
        payment: {
          ccDescriptor: 'ending in',
        },
      },
    },
    'es-MX': {
      translation: {
        payment: {
          ccDescriptor: 'se terminant par',
        },
      },
    },
  },
});
