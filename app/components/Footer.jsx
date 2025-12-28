export default function Footer() {
  return (
    <footer className="mt-16 pt-10 border-t border-[#e3e3e3] dark:border-neutral-700 text-sm text-center text-[#003366] dark:text-neutral-300 bg-white dark:bg-neutral-900">
      <div className="max-w-4xl mx-auto px-2">
        <strong className="block font-condensed text-lg md:text-xl text-[#003366] mb-2">ConsejoSeguro</strong>
        <p className="mb-3">Tu compañero de confianza en Serbia</p>
        <ul className="flex flex-wrap justify-center gap-4 mb-6 text-[#008000]">
          <li><a href="https://www.unhcr.org/es" target="_blank" rel="noopener noreferrer">UNHCR</a></li>
          <li><a href="https://www.iom.int/es" target="_blank" rel="noopener noreferrer">IOM</a></li>
          <li><a href="/privacidad">Privacidad</a></li>
          <li><a href="mailto:info@consejoseguro.com?subject=Contacto">Contacto</a></li>
        </ul>
        <p className="text-xs text-neutral-400 mb-3">© {new Date().getFullYear()} ConsejoSeguro. Información oficial y actualizada para tu tranquilidad.</p>
        <nav aria-label="Redes sociales" className="mb-4">
          <a href="https://twitter.com/ConsejoSeguro" aria-label="Twitter" className="mx-2">🐦</a>
          <a href="https://facebook.com/ConsejoSeguro" aria-label="Facebook" className="mx-2">📘</a>
        </nav>
      </div>
    </footer>
  );
}

