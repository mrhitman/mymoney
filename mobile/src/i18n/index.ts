import i18next from 'i18next';
import {initReactI18next} from 'react-i18next';

const languageDetector = {
  type: 'languageDetector' as any,
  async: true,
  detect: (cb: Function) => cb('en'),
  init: () => {},
  cacheUserLanguage: () => {},
};

i18next
  .use(languageDetector)
  .use(initReactI18next)
  .init(
    {
      fallbackLng: 'en',
      debug: true,
      resources: {
        en: {translation: require('./translations/en.json')},
      },
    },
    function (err, t) {
      console.log(JSON.stringify({err, t}));
    },
  );
