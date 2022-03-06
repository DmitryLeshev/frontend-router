import React from "react";

import { LangContext } from "shared/contexts/lang";
import { useTranslation } from "react-i18next";
import { Lang } from "shared/store/app/types";

export const withLang = (Child: React.ComponentType) => {
  return (props: any) => {
    const { i18n } = useTranslation();
    const [lang, setLang] = React.useState<Lang>("ru");

    function changeLang(lang: Lang) {
      i18n.changeLanguage(lang);
      setLang(lang);
    }

    React.useEffect(() => {}, []);

    return (
      <LangContext.Provider value={{ changeLang, lang }}>
        <Child {...props} />
      </LangContext.Provider>
    );
  };
};
