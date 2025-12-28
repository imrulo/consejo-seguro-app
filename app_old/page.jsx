import Hero from './components/Hero';
import Card from './components/Card';
import Footer from './components/Footer';
import Logo from './components/Logo';
import ChatButton from './components/ChatButton';
import LanguageSwitcher from './components/LanguageSwitcher';
import SituationForm from './components/SituationForm';
import TestimonialCarousel from './components/TestimonialCarousel';
import { useTranslation } from './components/I18nProvider';

function HealthyIcon() { return <span role="img" aria-label="Salud">❤️</span>; }
function PsyIcon() { return <span role="img" aria-label="Psicología">🧠</span>; }
function BusIcon() { return <span role="img" aria-label="Transporte gratuito">🚌</span>; }
function MigrationIcon() { return <span role="img" aria-label="Migración">🛂</span>; }

export default function Home() {
  const { t } = useTranslation();
  return (
    <>
      <LanguageSwitcher />
      <Hero />
      <section className="bg-neutral-50 dark:bg-neutral-900 py-10 px-2" id="beneficios">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-condensed text-2xl md:text-3xl font-bold mb-6 text-center text-[#003366]">{t('home.benefits_title')}</h2>
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            <Card icon={<Logo />} title={t('home.benefit1_title')}>{t('home.benefit1_text')}</Card>
            <Card icon={<HealthyIcon />} title={t('home.benefit2_title')}>{t('home.benefit2_text')}</Card>
            <Card icon={<PsyIcon />} title={t('home.benefit3_title')}>{t('home.benefit3_text')}</Card>
          </div>
        </div>
      </section>
      <section className="py-8 px-2" id="guias">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-condensed text-2xl md:text-3xl font-bold mb-6 text-center text-[#008000]">{t('home.topics_title')}</h2>
          <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
            <Card icon={<HealthyIcon />} title={t('home.topic1_title')}>{t('home.topic1_text')}</Card>
            <Card icon={<PsyIcon />} title={t('home.topic2_title')}>{t('home.topic2_text')}</Card>
            <Card icon={<BusIcon />} title={t('home.topic3_title')}>{t('home.topic3_text')}</Card>
            <Card icon={<MigrationIcon />} title={t('home.topic4_title')}>{t('home.topic4_text')}</Card>
          </div>
        </div>
      </section>
      <section className="py-10 bg-neutral-50 dark:bg-neutral-900">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-condensed text-2xl md:text-3xl font-bold mb-6 text-center">{t('home.testimonials_title')}</h2>
          <TestimonialCarousel />
        </div>
      </section>
      <section className="py-10 px-2">
        <div className="max-w-lg mx-auto">
          <SituationForm />
        </div>
      </section>
      <ChatButton />
      <Footer />
    </>
  );
}
