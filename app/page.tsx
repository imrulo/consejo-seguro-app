"use client";

import React from 'react';
import Hero from '@/components/Hero';
import Card from '@/components/Card';
import ChatWidget from '@/components/ChatWidget';
import TranslatorCard from '@/components/TranslatorCard';
import BureaucracyMap from '@/components/BureaucracyMap';
import { 
  Bus, 
  Wifi, 
  Coffee,
  ArrowRight,
  Download
} from 'lucide-react';

export default function Home() {
  const translatorCards = [
    {
      spanish: "Necesito un médico",
      serbian: "Treba mi lekar",
      pronunciation: "Tre-ba mi le-kar",
      category: "medical" as const
    },
    {
      spanish: "¿Dónde está la estación de policía?",
      serbian: "Gde je policijska stanica?",
      pronunciation: "Gde ye po-li-tsiy-ska sta-ni-tsa",
      category: "police" as const
    },
    {
      spanish: "Quiero registrar mi residencia",
      serbian: "Želim da prijavim boravište",
      pronunciation: "Ze-lim da pri-ya-vim bo-ra-vish-te",
      category: "general" as const
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 pb-20">
      <Hero />
      
      {/* Roadmap Section */}
      <section className="mt-8 mb-6">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-condensed font-bold text-xl text-gray-800">Tu Camino</h2>
            <span className="text-xs font-bold text-primary bg-blue-100 px-2 py-1 rounded-full">Paso 2 de 5</span>
          </div>
          <BureaucracyMap />
        </div>
      </section>

      {/* Translator Quick Access */}
      <section className="mb-8">
        <div className="container mx-auto px-4">
          <h2 className="font-condensed font-bold text-xl text-gray-800 mb-4 flex items-center gap-2">
            🗣️ Habla por mí
            <span className="text-xs font-normal text-gray-500 bg-gray-200 px-2 py-0.5 rounded ml-auto">Offline ready</span>
          </h2>
          <div className="flex overflow-x-auto gap-4 pb-4 no-scrollbar snap-x">
            {translatorCards.map((card, idx) => (
              <div key={idx} className="min-w-[85%] sm:min-w-[300px] snap-center">
                <TranslatorCard 
                  spanishText={card.spanish}
                  serbianText={card.serbian}
                  pronunciation={card.pronunciation}
                  category={card.category}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Essential Tools Grid */}
      <section className="mb-8">
        <div className="container mx-auto px-4">
          <h2 className="font-condensed font-bold text-xl text-gray-800 mb-4">Herramientas Útiles</h2>
          <div className="grid grid-cols-2 gap-4">
            <Card className="p-4 flex flex-col items-center justify-center gap-2 active:scale-95 transition-transform cursor-pointer border-b-4 border-gray-200">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                <Wifi size={24} />
              </div>
              <span className="font-bold text-sm text-center">WiFi Gratis</span>
            </Card>
            <Card className="p-4 flex flex-col items-center justify-center gap-2 active:scale-95 transition-transform cursor-pointer border-b-4 border-gray-200">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                <Bus size={24} />
              </div>
              <span className="font-bold text-sm text-center">Rutas Bus</span>
            </Card>
            <Card className="p-4 flex flex-col items-center justify-center gap-2 active:scale-95 transition-transform cursor-pointer border-b-4 border-gray-200">
              <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
                <Coffee size={24} />
              </div>
              <span className="font-bold text-sm text-center">Comunidad</span>
            </Card>
            <Card className="p-4 flex flex-col items-center justify-center gap-2 active:scale-95 transition-transform cursor-pointer border-b-4 border-gray-200 bg-gray-900 text-white">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-white">
                <Download size={24} />
              </div>
              <span className="font-bold text-sm text-center">Guardar Todo</span>
            </Card>
          </div>
        </div>
      </section>

      {/* Offline Alert */}
      <div className="container mx-auto px-4 mt-auto">
        <div className="bg-gray-200 rounded-lg p-3 text-xs text-gray-600 flex items-center justify-center gap-2 text-center">
          <div className="w-2 h-2 rounded-full bg-green-500"></div>
          Todo el contenido está guardado en tu teléfono. Úsalo sin internet.
        </div>
      </div>

      <ChatWidget />
    </div>
  );
}
