import Footer from '../components/Footer';
import Logo from '../components/Logo';

export default function Acerca() {
  return (
    <main className="max-w-2xl mx-auto px-2 py-8">
      <div className="flex flex-col items-center mb-6">
        <Logo className="w-16 h-16 mb-4" />
        <h2 className="font-condensed text-2xl md:text-3xl font-bold text-[#003366] mb-3">Acerca de ConsejoSeguro</h2>
        <p className="text-base md:text-lg text-center max-w-lg mb-5">
          ConsejoSeguro es tu compañero digital gratuito, práctico y empático para inmigrantes en Serbia. Toda la información proviene de fuentes oficiales del gobierno serbio y organismos internacionales. <b>Nuestra misión es informar, apoyar y empoderar con empatía y precisión.</b>
        </p>
        <div className="bg-[#ffa50011] p-4 rounded-xl shadow-sm mb-4 text-[#003366]">
          <b>Slogan:</b> "Tu guía segura y empática en un nuevo hogar"
        </div>
        <p className="text-neutral-800 dark:text-neutral-300 text-sm mb-2">
          <span className="font-bold">Email:</span> <a href="mailto:info@consejoseguro.com">info@consejoseguro.com</a><br/>
          <span className="font-bold">Fuente principal:</span> <a href="https://welcometoserbia.gov.rs/" rel="noopener" target="_blank">welcometoserbia.gov.rs</a>
        </p>
      </div>
      <Footer />
    </main>
  );
}