import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import translationEN from "./translations/en/global.json";
import translationES from "./translations/es/global.json";
import translationPT from "./translations/pt/global.json";

const resources = {
  en: { translation: translationEN },
  es: { translation: translationES },
  pt: { translation: translationPT },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
