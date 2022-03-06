import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import HttpApi from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

export type Lang = "en" | "ru";

export enum Languages {
  EN = "en",
  RU = "ru",
}

export const languages = [Languages.EN, Languages.RU];

const fileNames = [
  "translation",
  "incident",
  "task",
  "home",
  "common",
  "reports",
  "devices",
  "dictionaries",
  "database",
  "users",
  "auth",
  "settings",
  "system",
  "activation",
  "activation",
  "snackbar",
  "vulnerabilities",
  "profile",
  "agereement",
  "network-map",
];

i18n
  .use(HttpApi)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    saveMissing: true,
    debug: false,
    whitelist: languages,
    ns: fileNames,
    react: { useSuspense: true },
    backend: {
      loadPath: "/locales/ru/{{ns}}.json",
      addPath: `/locales/ru/{{ns}}.json`,
    },
  });

export default i18n;
