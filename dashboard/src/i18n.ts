import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from 'src/translations/en.json';
import ru from 'src/translations/ru.json';

const lng = localStorage.getItem('lng') || 'ru';
const languageDetector = {
  type: 'languageDetector' as any,
  async: true,
  detect: (cb: Function) => cb(lng),
  init: () => {},
  cacheUserLanguage: () => {},
};

i18next
  .use(languageDetector)
  .use(initReactI18next)
  .init(
    {
      fallbackLng: lng,
      debug: true,
      resources: {
        en: { translation: en },
        ru: { translation: ru },
      },
    },
    function (err, t) {
      console.log(JSON.stringify({ err, t }));
    },
  );
