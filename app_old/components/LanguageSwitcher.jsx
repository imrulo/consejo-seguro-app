import { useTranslation } from './I18nProvider';

const languages = [
  { code: 'es', label: 'Español' },
  { code: 'en', label: 'English' },
  { code: 'sr', label: 'Српски' }
];

export default function LanguageSwitcher() {
  const { lang, setLang } = useTranslation();
  return (
    <div className="absolute top-2 right-2 md:top-4 md:right-6 z-30">
      <label htmlFor="lang-switch" className="sr-only">Idioma</label>
      <select
        id="lang-switch"
        className="bg-[#003366] text-white rounded-lg px-3 py-2 focus-visible:ring-2 focus-visible:ring-accent"
        value={lang}
        onChange={e => setLang(e.target.value)}
        aria-label="Seleccionar idioma"
      >
        {languages.map(lan => (
          <option value={lan.code} key={lan.code}>{lan.label}</option>
        ))}
      </select>
    </div>
  );
}