import { useState } from 'react';
import Button from './Button';
import { useTranslation } from './I18nProvider';

export default function SituationForm() {
  const { t } = useTranslation();
  const [text, setText] = useState('');
  const [submitted, setSubmitted] = useState(false);
  return (
    <form className="bg-white dark:bg-neutral-800 rounded-xl shadow-md p-6 w-full" onSubmit={e=>{e.preventDefault(); setSubmitted(true);}} aria-label={t('home.situation_title')}>
      <label htmlFor="situation" className="font-condensed font-bold mb-2 block text-[#003366]">{t('home.situation_title')}</label>
      <textarea
        id="situation"
        required={false}
        className="rounded-lg border border-neutral-300 dark:border-neutral-600 px-4 py-2 w-full min-h-[72px] mb-4 text-base focus-visible:ring-2 focus-visible:ring-accent"
        maxLength={500}
        placeholder={t('home.situation_placeholder')}
        value={text}
        onChange={e => setText(e.target.value)}
        aria-label={t('home.situation_title')}
      />
      <Button color="accent" type="submit">Enviar</Button>
      {submitted && <div className="mt-4 text-[#008000] font-semibold">{t('home.situation_sent')}</div>}
    </form>
  );
}
