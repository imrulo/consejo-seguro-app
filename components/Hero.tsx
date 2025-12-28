import React from 'react';
import Button from './Button';
import { ArrowRight, Download } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#003366] to-[#005580] text-white">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-white/5 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-[#008000]/20 blur-3xl"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 relative z-10">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-accent text-sm font-medium mb-6 backdrop-blur-sm border border-white/10">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
            </span>
            Información actualizada 2024
          </div>
          
          <h1 className="font-condensed font-bold text-4xl sm:text-5xl lg:text-6xl leading-tight mb-6">
            Tu guía segura y empática en un nuevo hogar
          </h1>
          
          <p className="text-lg sm:text-xl text-gray-200 mb-8 max-w-2xl leading-relaxed">
            ConsejoSeguro te ayuda a evitar problemas legales, multas y complicaciones burocráticas en Serbia. 
            Información oficial, verificada y siempre a tu lado.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button variant="secondary" size="lg" className="gap-2">
              <Download size={20} />
              Descargar la App
            </Button>
            <Button variant="outline" size="lg" className="bg-transparent border-white text-white hover:bg-white/10 hover:border-white gap-2">
              Explorar Guías
              <ArrowRight size={20} />
            </Button>
          </div>
          
          <div className="mt-12 flex items-center gap-4 text-sm text-gray-300">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-8 h-8 rounded-full bg-gray-600 border-2 border-[#003366] flex items-center justify-center text-xs font-bold">
                  {/* Placeholder for user avatars */}
                </div>
              ))}
            </div>
            <p>Usado por más de <span className="text-white font-bold">10,000</span> personas</p>
          </div>
        </div>
      </div>
    </section>
  );
}
