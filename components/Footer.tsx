import React from 'react';
import Link from 'next/link';
import { Facebook, Twitter, Instagram, Mail, Phone, ExternalLink } from 'lucide-react';
import Logo from './Logo';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Logo className="h-8 w-8" />
              <span className="font-condensed font-bold text-xl text-white">
                ConsejoSeguro
              </span>
            </div>
            <p className="text-sm leading-relaxed">
              Tu compañero de confianza en Serbia. Información oficial verificada para ayudarte a navegar tu nuevo hogar con seguridad y esperanza.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-white transition-colors"><Facebook size={20} /></a>
              <a href="#" className="hover:text-white transition-colors"><Twitter size={20} /></a>
              <a href="#" className="hover:text-white transition-colors"><Instagram size={20} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold mb-4 font-condensed uppercase tracking-wider">Enlaces Rápidos</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="hover:text-accent transition-colors">Inicio</Link></li>
              <li><Link href="#" className="hover:text-accent transition-colors">Registro Policial</Link></li>
              <li><Link href="#" className="hover:text-accent transition-colors">Visas y Permisos</Link></li>
              <li><Link href="#" className="hover:text-accent transition-colors">Salud y Emergencias</Link></li>
              <li><Link href="#" className="hover:text-accent transition-colors">Buscar Ayuda</Link></li>
            </ul>
          </div>

          {/* Official Resources */}
          <div>
            <h3 className="text-white font-bold mb-4 font-condensed uppercase tracking-wider">Fuentes Oficiales</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="https://www.mfa.gov.rs/" target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-accent transition-colors gap-1">
                  Ministerio de Exteriores <ExternalLink size={12} />
                </a>
              </li>
              <li>
                <a href="https://www.unhcr.org/rs/" target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-accent transition-colors gap-1">
                  UNHCR Serbia <ExternalLink size={12} />
                </a>
              </li>
              <li>
                <a href="https://iom.int/" target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-accent transition-colors gap-1">
                  IOM <ExternalLink size={12} />
                </a>
              </li>
              <li>
                <a href="https://www.mup.gov.rs/" target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-accent transition-colors gap-1">
                  Policía (MUP) <ExternalLink size={12} />
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-bold mb-4 font-condensed uppercase tracking-wider">Contacto</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <Mail size={18} className="mt-0.5 text-accent" />
                <span>soporte@consejoseguro.com</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone size={18} className="mt-0.5 text-accent" />
                <span>+381 11 123 4567</span>
              </li>
              <li className="text-xs text-gray-500 mt-4">
                Disponible Lunes a Viernes, 9:00 - 17:00
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
          <p>© {new Date().getFullYear()} ConsejoSeguro. Todos los derechos reservados.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="#" className="hover:text-white">Privacidad</Link>
            <Link href="#" className="hover:text-white">Términos</Link>
            <Link href="#" className="hover:text-white">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
