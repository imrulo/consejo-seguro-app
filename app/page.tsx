"use client";

import React, { useState } from 'react';
import Hero from '@/components/Hero';
import Card from '@/components/Card';
import ChatWidget from '@/components/ChatWidget';
import TranslatorCard from '@/components/TranslatorCard';
import BureaucracyMap from '@/components/BureaucracyMap';
import Modal from '@/components/Modal';
import QuickActionBar from '@/components/QuickActionBar';
import DailyTip from '@/components/DailyTip';
import Favorites from '@/components/Favorites';
import { 
  Bus, 
  Wifi, 
  Coffee,
  ArrowRight,
  Download,
  Stethoscope,
  Phone,
  ShieldCheck,
  FileText,
  AlertTriangle,
  Info
} from 'lucide-react';
import Button from '@/components/Button';

export default function Home() {
  const [activeModal, setActiveModal] = useState<string | null>(null);

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

  const handleNavigate = (action: string) => {
    setActiveModal(action);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 pb-20">
      <Hero onNavigate={handleNavigate} />
      
      {/* Daily Content & Favorites */}
      <section className="mt-6">
        <div className="container mx-auto">
          <Favorites onNavigate={handleNavigate} />
          <DailyTip />
        </div>
      </section>
      
      {/* Roadmap Section */}
      <section className="mb-6">
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
            <Card 
              onClick={() => setActiveModal('open_papers')}
              className="p-4 flex flex-col items-center justify-center gap-2 active:scale-95 transition-transform cursor-pointer border-b-4 border-gray-200 min-h-[120px]"
            >
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                <FileText size={24} />
              </div>
              <span className="font-bold text-sm text-center">Papeles y Trámites</span>
            </Card>
            <Card 
              onClick={() => setActiveModal('open_transport')}
              className="p-4 flex flex-col items-center justify-center gap-2 active:scale-95 transition-transform cursor-pointer border-b-4 border-gray-200 min-h-[120px]"
            >
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                <Bus size={24} />
              </div>
              <span className="font-bold text-sm text-center">Rutas Bus</span>
            </Card>
            <Card 
              onClick={() => setActiveModal('community')}
              className="p-4 flex flex-col items-center justify-center gap-2 active:scale-95 transition-transform cursor-pointer border-b-4 border-gray-200 min-h-[120px]"
            >
              <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
                <Coffee size={24} />
              </div>
              <span className="font-bold text-sm text-center">Comunidad</span>
            </Card>
            <Card 
              onClick={() => setActiveModal('download')}
              className="p-4 flex flex-col items-center justify-center gap-2 active:scale-95 transition-transform cursor-pointer border-b-4 border-gray-200 bg-gray-900 text-white min-h-[120px]"
            >
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
      
      {/* Quick Action Bar (Mobile Only) */}
      <QuickActionBar 
        onEmergency={() => setActiveModal('open_emergency')}
        onTranslator={() => {
          // Scroll to translator section
          document.querySelector('section:nth-of-type(3)')?.scrollIntoView({ behavior: 'smooth' });
        }}
        onTransport={() => setActiveModal('open_transport')}
      />

      {/* --- MODALS FOR INTERACTIONS --- */}

      {/* Emergency Modal (Triggered by Quick Action) */}
      <Modal
        isOpen={activeModal === 'open_emergency'}
        onClose={() => setActiveModal(null)}
        title="Emergencia Rápida"
        variant="danger"
      >
        <div className="space-y-4">
          <a href="tel:194" className="flex items-center gap-4 p-4 bg-red-100 border border-red-200 rounded-xl hover:bg-red-200 transition-colors">
            <div className="w-12 h-12 bg-red-200 rounded-full flex items-center justify-center text-red-700">
              <Phone size={24} />
            </div>
            <div>
              <p className="font-bold text-xl text-red-900">194 - Ambulancia</p>
              <p className="text-sm text-red-800">Emergencias médicas</p>
            </div>
          </a>
          <a href="tel:192" className="flex items-center gap-4 p-4 bg-blue-100 border border-blue-200 rounded-xl hover:bg-blue-200 transition-colors">
            <div className="w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center text-blue-700">
              <ShieldCheck size={24} />
            </div>
            <div>
              <p className="font-bold text-xl text-blue-900">192 - Policía</p>
              <p className="text-sm text-blue-800">Seguridad y reportes</p>
            </div>
          </a>
        </div>
      </Modal>

      {/* Doctor / Medical Modal */}
      <Modal
        isOpen={activeModal === 'open_doctor'}
        onClose={() => setActiveModal(null)}
        title="Asistencia Médica"
      >
        <div className="space-y-4">
          <div className="bg-red-50 p-4 rounded-xl border border-red-100 flex items-start gap-3">
            <Stethoscope className="text-red-600 shrink-0 mt-1" />
            <div>
              <h4 className="font-bold text-red-800">¿Es una emergencia vital?</h4>
              <p className="text-sm text-red-600 mb-2">Si hay peligro de vida, llama al 194 inmediatamente.</p>
              <a href="tel:194" className="inline-flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg font-bold text-sm">
                <Phone size={16} /> Llamar 194
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-2">Frases útiles (con audio)</h4>
            <div className="space-y-2">
              <TranslatorCard 
                spanishText="Tengo fiebre alta"
                serbianText="Imam visoku temperaturu"
                pronunciation="Imam vi-so-ku tem-pe-ra-tu-ru"
                category="medical"
              />
              <TranslatorCard 
                spanishText="Me duele aquí"
                serbianText="Boli me ovde"
                pronunciation="Bo-li me ov-de"
                category="medical"
              />
            </div>
          </div>
        </div>
      </Modal>

      {/* Police / Security Modal */}
      <Modal
        isOpen={activeModal === 'open_police'}
        onClose={() => setActiveModal(null)}
        title="Policía y Seguridad"
      >
        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 flex items-start gap-3">
            <ShieldCheck className="text-blue-600 shrink-0 mt-1" />
            <div>
              <h4 className="font-bold text-blue-800">Registro Policial (Beli Karton)</h4>
              <p className="text-sm text-blue-600">Debes registrarte dentro de las 24 horas de tu llegada.</p>
            </div>
          </div>
          <TranslatorCard 
            spanishText="Vengo a registrar mi residencia (Beli Karton)"
            serbianText="Došao sam da prijavim boravište (Beli Karton)"
            pronunciation="Do-shao sam da pri-ya-vim bo-ra-vish-te"
            category="police"
          />
        </div>
      </Modal>

      {/* Transport Modal (UPDATED) */}
      <Modal
        isOpen={activeModal === 'open_transport'}
        onClose={() => setActiveModal(null)}
        title="Transporte Público"
      >
        <div className="space-y-6">
           {/* Step by Step SMS */}
           <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
             <div className="flex items-center gap-2 mb-3">
               <Phone className="text-blue-600" size={20} />
               <h4 className="font-bold text-blue-900">Cómo pagar con SMS</h4>
             </div>
             <ol className="list-decimal list-inside space-y-3 text-sm text-gray-700">
               <li className="pl-2">
                 Envía un mensaje al número <span className="font-bold text-lg">9011</span>
               </li>
               <li className="pl-2">
                 Escribe el código:
                 <ul className="list-disc list-inside mt-2 ml-4 space-y-2">
                   <li><span className="font-mono font-bold bg-white px-2 py-1 rounded border">A90</span> para 90 minutos (50 RSD)</li>
                   <li><span className="font-mono font-bold bg-white px-2 py-1 rounded border">A1</span> para todo el día (120 RSD)</li>
                 </ul>
               </li>
               <li className="pl-2">
                 Recibirás un SMS de confirmación. <span className="font-bold">Guárdalo</span>, es tu boleto.
               </li>
             </ol>
           </div>

           {/* Warning */}
           <div className="bg-orange-50 p-4 rounded-xl border border-orange-100 flex gap-3">
             <AlertTriangle className="text-orange-600 shrink-0" />
             <p className="text-sm text-orange-800">
               <strong>¡Cuidado!</strong> No intentes pagarle al conductor con efectivo. Ya no aceptan dinero y podrías recibir una multa.
             </p>
           </div>

           {/* Translator */}
           <div>
             <h4 className="font-bold mb-3">Frases para el bus</h4>
             <TranslatorCard 
               spanishText="¿Este autobús va al centro?"
               serbianText="Da li ovaj autobus ide do centra?"
               pronunciation="Da li o-vay au-to-bus i-de do tsen-tra"
               category="general"
             />
           </div>
        </div>
      </Modal>

      {/* Papers / Documents Modal (NEW) */}
      <Modal
        isOpen={activeModal === 'open_papers'}
        onClose={() => setActiveModal(null)}
        title="Trámites y Documentos"
      >
        <div className="space-y-6">
          {/* Procedure 1: Beli Karton */}
          <div className="border-b border-gray-100 pb-6">
            <h4 className="font-bold text-lg mb-2 flex items-center gap-2">
              <span className="bg-primary text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">1</span>
              Beli Karton (Registro Policial)
            </h4>
            <p className="text-sm text-gray-600 mb-3">
              Es el registro obligatorio de tu dirección. Debes hacerlo en las primeras 24 horas.
            </p>
            <div className="bg-gray-50 p-3 rounded-lg text-sm space-y-2">
              <p>📍 <strong>Dónde:</strong> Comisaría de policía local (MUP).</p>
              <p>🎒 <strong>Llevar:</strong> Pasaporte y al dueño del apartamento (con su ID y título de propiedad).</p>
              <p>❌ <strong>Error común:</strong> Ir solo sin el dueño. No te atenderán.</p>
            </div>
          </div>

          {/* Procedure 2: Residency */}
          <div className="border-b border-gray-100 pb-6">
            <h4 className="font-bold text-lg mb-2 flex items-center gap-2">
              <span className="bg-primary text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">2</span>
              Residencia Temporal
            </h4>
            <p className="text-sm text-gray-600 mb-3">
              Permiso para vivir más de 90 días. Se solicita en la Oficina de Extranjeros.
            </p>
            <div className="bg-gray-50 p-3 rounded-lg text-sm space-y-2">
              <p>📍 <strong>Dónde:</strong> Savska 35, Belgrado.</p>
              <p>🎒 <strong>Llevar:</strong> Beli Karton, seguro médico, prueba de fondos, fotos.</p>
            </div>
          </div>

           {/* Warning */}
           <div className="bg-red-50 p-4 rounded-xl border border-red-100 flex gap-3">
             <Info className="text-red-600 shrink-0" />
             <p className="text-sm text-red-800">
               <strong>Nota Importante:</strong> Las leyes cambian rápido. Verifica siempre en el grupo de Telegram de la comunidad antes de ir.
             </p>
           </div>
        </div>
      </Modal>

      {/* Placeholder Modals */}
      <Modal
        isOpen={['wifi', 'community', 'download', 'open_sim'].includes(activeModal || '')}
        onClose={() => setActiveModal(null)}
        title="Próximamente"
      >
        <p className="text-gray-600">Esta función estará disponible en la próxima actualización offline.</p>
      </Modal>

    </div>
  );
}
