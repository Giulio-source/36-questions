import { createContext, useState } from "react";

type LanguageType = "en" | "it";
type ContextValueType = {
  lang: LanguageType;
  onChangeLang: (lang: LanguageType) => void;
};

export const AppContext = createContext<ContextValueType>({ lang: "en", onChangeLang: () => {} });

export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [lang, setLang] = useState<LanguageType>("en");

  function onChangeLang(lang: LanguageType) {
    setLang(lang);
  }

  return (
    <AppContext.Provider value={{ lang, onChangeLang }}>
      {children}
    </AppContext.Provider>
  );
};
