import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from 'common/translations/en.json';
// import ru from 'common/translations/ru.json';

const languageDetector = {
  type: 'languageDetector' as any,
  async: true,
  detect: (cb: Function) => cb('ru'),
  init: () => {},
  cacheUserLanguage: () => {},
};

i18next
  .use(languageDetector)
  .use(initReactI18next)
  .init(
    {
      fallbackLng: 'ru',
      debug: true,
      resources: {
        en: { translation: en },
        ru: { translation: en },
      },
    },
    function (err, t) {
      console.log(JSON.stringify({ err, t }));
    },
  );
