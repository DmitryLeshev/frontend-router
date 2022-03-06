import { Lang } from "shared/store/app/types";
import React from "react";

export interface ILangContext {
  lang: Lang;
  changeLang: (lang: Lang) => void;
}

const LangContext = React.createContext<ILangContext | null>(null);

export { LangContext };
