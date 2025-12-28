import { createContext, useContext, useEffect, useState } from 'react';

const LANG_FALLBACK = 'es';
const locales = {
  es: () => import('../locales/es.json'),
  en: () => import('../locales/en.json'),
  sr: () => import('../locales/sr.json'),
};

const I18nContext = createContext({
  lang: LANG_FALLBACK,
  setLang: () => {},
  t: (key) => key,
});

export function I18nProvider({ children }) {
  const [lang, setLang] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('cs_lang') || LANG_FALLBACK;
    }
    return LANG_FALLBACK;
  });
  const [dict, setDict] = useState({});

  useEffect(() => {
    (async () => {
      const load = locales[lang] || locales[LANG_FALLBACK];
      const mod = await load();
      setDict(mod.default || mod);
    })();
    if (typeof window !== 'undefined') {
      localStorage.setItem('cs_lang', lang);
    }
  }, [lang]);

  function t(key) {
    return dict[key] || key;
  }

  return (
    <I18nContext.Provider value={{ lang, setLang, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useTranslation() {
  return useContext(I18nContext);
}
