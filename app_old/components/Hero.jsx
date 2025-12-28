import Logo from './Logo';
import Button from './Button';
import { useTranslation } from './I18nProvider';

export default function Hero() {
  const { t } = useTranslation();
  return (
    <section className="relative bg-gradient-to-br from-[#003366] via-[#00800066] to-[#008000] text-white py-10 md:py-20 flex flex-col items-center text-center">
      <Logo className="mx-auto mb-6 w-20 h-20 drop-shadow-xl" />
      <h1 className="font-condensed text-3xl md:text-5xl font-bold mb-2 drop-shadow-lg">{t('home.hero_title')}</h1>
      <p className="mt-1 text-lg md:text-2xl font-medium">{t('home.hero_subtitle')}</p>
      <p className="mt-2 md:mt-4 mx-auto text-base max-w-lg italic text-white/90 font-sans">
        “{t('home.slogan')}”
      </p>
      <div className="flex flex-col sm:flex-row gap-4 mt-8 mx-auto">
        <Button
          as="a"
          href="https://play.google.com/store/apps/details?id=com.consejoseguro.app"
          color="primary"
          aria-label={t('home.cta_app')}
        >
          {t('home.cta_app')}
        </Button>
        <Button as="a" href="#guias" color="secondary">{t('home.cta_guides')}</Button>
      </div>
    </section>
  );
}
