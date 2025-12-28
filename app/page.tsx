"use client";

import React, { useState, useEffect } from 'react';
import Hero from '@/components/Hero';
import Card from '@/components/Card';
import ChatWidget from '@/components/ChatWidget';
import TranslatorCard from '@/components/TranslatorCard';
import BureaucracyMap from '@/components/BureaucracyMap';
import Modal from '@/components/Modal';
import QuickActionBar from '@/components/QuickActionBar';
import DailyTip from '@/components/DailyTip';
import Favorites from '@/components/Favorites';
import Onboarding from '@/components/Onboarding';
import { Nudge, useNudges } from '@/components/Nudge';
import { 
  Bus, 
  Wifi, 
  Coffee,
  Download,
  Stethoscope,
  Phone,
  ShieldCheck,
  FileText,
  AlertTriangle,
  Info,
  Star
} from 'lucide-react';

// Favorite Item Type
interface FavoriteItem {
  id: string;
  title: string;
  type: 'phrase' | 'guide';
  action: string;
}

export default function Home() {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  
  // Use Nudges Hook
  const { activeNudge, checkNudge, dismissNudge } = useNudges();

  // Load Favorites on Mount
  useEffect(() => {
    const saved = localStorage.getItem('cs_favorites');
    if (saved) {
      setFavorites(JSON.parse(saved));
    } else {
      // START EMPTY to teach user how to add favorites
      setFavorites([]);
    }
  }, []);

  // Toggle Favorite
  const toggleFavorite = (item: FavoriteItem) => {
    const exists = favorites.find(f => f.id === item.id);
    let newFavorites;
    if (exists) {
      newFavorites = favorites.filter(f => f.id !== item.id);
    } else {
      newFavorites = [item, ...favorites];
    }
    setFavorites(newFavorites);
    localStorage.setItem('cs_favorites', JSON.stringify(newFavorites));
  };

  const isFav = (id: string) => favorites.some(f => f.id === id);

  const handleNavigate = (action: string) => {
    setActiveModal(action);
    
    // Nudge Logic: Track usage count for nudges
    const countKey = `cs_usage_${action}`;
    const currentCount = parseInt(localStorage.getItem(countKey) || '0') + 1;
    localStorage.setItem(countKey, currentCount.toString());

    // Check specific nudges
    if (action === 'open_transport') {
      checkNudge('transport_fav', currentCount);
    }
  };

  // Nudge for Translator Audio
  const handleAudioPlay = () => {
    const countKey = 'cs_usage_audio';
    const currentCount = parseInt(localStorage.getItem(countKey) || '0') + 1;
    localStorage.setItem(countKey, currentCount.toString());
    checkNudge('translator_audio', currentCount);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 pb-20">
      <Onboarding />
      <Nudge nudge={activeNudge!} onDismiss={dismissNudge} />

      <Hero onNavigate={handleNavigate} />
      
      {/* Daily Content & Favorites */}
      <section className="mt-6">
        <div className="container mx-auto">
          <Favorites items={favorites} onNavigate={handleNavigate} />
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
            <div className="min-w-[85%] sm:min-w-[300px] snap-center">
              <TranslatorCard 
                id="medical_phrase_1"
                spanishText="Necesito un médico"
                serbianText="Treba mi lekar"
                pronunciation="Tre-ba mi le-kar"
                category="medical"
                isFavorite={isFav('medical_phrase_1')}
                onToggleFavorite={() => toggleFavorite({ 
                  id: 'medical_phrase_1', 
                  title: 'Necesito médico', 
                  type: 'phrase', 
                  action: 'open_doctor' 
                })}
              />
            </div>
            <div className="min-w-[85%] sm:min-w-[300px] snap-center">
              <TranslatorCard 
                id="police_phrase_1"
                spanishText="¿Dónde está la estación de policía?"
                serbianText="Gde je policijska stanica?"
                pronunciation="Gde ye po-li-tsiy-ska sta-ni-tsa"
                category="police"
                isFavorite={isFav('police_phrase_1')}
                onToggleFavorite={() => toggleFavorite({ 
                  id: 'police_phrase_1', 
                  title: 'Dónde está policía', 
                  type: 'phrase', 
                  action: 'open_police' 
                })}
              />
            </div>
            <div className="min-w-[85%] sm:min-w-[300px] snap-center">
              <TranslatorCard 
                id="general_phrase_1"
                spanishText="Quiero registrar mi residencia"
                serbianText="Želim da prijavim boravište"
                pronunciation="Ze-lim da pri-ya-vim bo-ra-vish-te"
                category="general"
                isFavorite={isFav('general_phrase_1')}
                onToggleFavorite={() => toggleFavorite({ 
                  id: 'general_phrase_1', 
                  title: 'Registrar residencia', 
                  type: 'phrase', 
                  action: 'open_papers' 
                })}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Essential Tools Grid */}
      <section className="mb-8">
        <div className="container mx-auto px-4">
          <h2 className="font-condensed font-bold text-xl text-gray-800 mb-4">Herramientas Útiles</h2>
          <div className="grid grid-cols-2 gap-4">
            <Card 
              onClick={() => handleNavigate('open_papers')}
              className="p-4 flex flex-col items-center justify-center gap-2 active:scale-95 transition-transform cursor-pointer border-b-4 border-gray-200 min-h-[120px]"
            >
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                <FileText size={24} />
              </div>
              <span className="font-bold text-sm text-center">Papeles y Trámites</span>
            </Card>
            <Card 
              onClick={() => handleNavigate('open_transport')}
              className="p-4 flex flex-col items-center justify-center gap-2 active:scale-95 transition-transform cursor-pointer border-b-4 border-gray-200 min-h-[120px]"
            >
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                <Bus size={24} />
              </div>
              <span className="font-bold text-sm text-center">Rutas Bus</span>
            </Card>
            <Card 
              onClick={() => handleNavigate('community')}
              className="p-4 flex flex-col items-center justify-center gap-2 active:scale-95 transition-transform cursor-pointer border-b-4 border-gray-200 min-h-[120px]"
            >
              <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
                <Coffee size={24} />
              </div>
              <span className="font-bold text-sm text-center">Comunidad</span>
            </Card>
            <Card 
              onClick={() => handleNavigate('download')}
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
      
      <QuickActionBar 
        onEmergency={() => setActiveModal('open_emergency')}
        onTranslator={() => {
          document.querySelector('section:nth-of-type(3)')?.scrollIntoView({ behavior: 'smooth' });
        }}
        onTransport={() => setActiveModal('open_transport')}
      />

      {/* --- MODALS FOR INTERACTIONS --- */}

      {/* Emergency Modal */}
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
                id="med_fever"
                spanishText="Tengo fiebre alta"
                serbianText="Imam visoku temperaturu"
                pronunciation="Imam vi-so-ku tem-pe-ra-tu-ru"
                category="medical"
                isFavorite={isFav('med_fever')}
                onToggleFavorite={() => toggleFavorite({ id: 'med_fever', title: 'Tengo fiebre', type: 'phrase', action: 'open_doctor' })}
              />
              <TranslatorCard 
                id="med_pain"
                spanishText="Me duele aquí"
                serbianText="Boli me ovde"
                pronunciation="Bo-li me ov-de"
                category="medical"
                isFavorite={isFav('med_pain')}
                onToggleFavorite={() => toggleFavorite({ id: 'med_pain', title: 'Me duele aquí', type: 'phrase', action: 'open_doctor' })}
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
            id="pol_reg"
            spanishText="Vengo a registrar mi residencia (Beli Karton)"
            serbianText="Došao sam da prijavim boravište (Beli Karton)"
            pronunciation="Do-shao sam da pri-ya-vim bo-ra-vish-te"
            category="police"
            isFavorite={isFav('pol_reg')}
            onToggleFavorite={() => toggleFavorite({ id: 'pol_reg', title: 'Registrar Beli Karton', type: 'phrase', action: 'open_police' })}
          />
        </div>
      </Modal>

      {/* Transport Modal */}
      <Modal
        isOpen={activeModal === 'open_transport'}
        onClose={() => setActiveModal(null)}
        title="Transporte Público"
      >
        {/* Header with Favorite Button override */}
        <div className="absolute top-4 left-16 z-50">
           {/* Custom placement if needed, or rely on internal Modal structure if modified. 
               For now, adding a star inside the content area top right */}
        </div>
        
        <div className="space-y-6">
           <div className="flex justify-between items-center">
             <h4 className="font-bold text-blue-900">Guía de SMS</h4>
             <button onClick={() => toggleFavorite({ id: 'transport_guide', title: 'Pagar el Bus', type: 'guide', action: 'open_transport' })}>
               <Star size={24} className={isFav('transport_guide') ? "text-yellow-500 fill-yellow-500" : "text-gray-300"} />
             </button>
           </div>

           {/* Step by Step SMS */}
           <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
             <ol className="list-decimal list-inside space-y-3 text-sm text-gray-700">
               <li className="pl-2">
                 SMS a <span className="font-bold text-lg">9011</span>
               </li>
               <li className="pl-2">
                 Código: <span className="font-mono font-bold bg-white px-2 py-1 rounded border">A90</span> (90 min)
               </li>
               <li className="pl-2">
                 Guarda el SMS de respuesta.
               </li>
             </ol>
           </div>

           {/* Warning */}
           <div className="bg-orange-50 p-4 rounded-xl border border-orange-100 flex gap-3">
             <AlertTriangle className="text-orange-600 shrink-0" />
             <p className="text-sm text-orange-800">
               <strong>¡Ojo!</strong> No aceptan efectivo. Multa: 5000 RSD.
             </p>
           </div>

           {/* Translator */}
           <div>
             <h4 className="font-bold mb-3">Frases</h4>
             <TranslatorCard 
               id="bus_center"
               spanishText="¿Va al centro?"
               serbianText="Da li ide do centra?"
               pronunciation="Da li i-de do tsen-tra"
               category="general"
               isFavorite={isFav('bus_center')}
               onToggleFavorite={() => toggleFavorite({ id: 'bus_center', title: 'Va al centro?', type: 'phrase', action: 'open_transport' })}
             />
           </div>
        </div>
      </Modal>

      {/* Papers / Documents Modal */}
      <Modal
        isOpen={activeModal === 'open_papers'}
        onClose={() => setActiveModal(null)}
        title="Trámites y Documentos"
      >
        <div className="space-y-6">
          <div className="flex justify-between items-center">
             <h4 className="font-bold text-gray-900">Guía Rápida</h4>
             <button onClick={() => toggleFavorite({ id: 'papers_guide', title: 'Guía de Papeles', type: 'guide', action: 'open_papers' })}>
               <Star size={24} className={isFav('papers_guide') ? "text-yellow-500 fill-yellow-500" : "text-gray-300"} />
             </button>
           </div>

          {/* Procedure 1: Beli Karton */}
          <div className="border-b border-gray-100 pb-6">
            <h4 className="font-bold text-lg mb-2 flex items-center gap-2">
              <span className="bg-primary text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">1</span>
              Beli Karton
            </h4>
            <div className="bg-gray-50 p-3 rounded-lg text-sm space-y-2">
              <p>📍 <strong>MUP (Policía)</strong></p>
              <p>🎒 Pasaporte + Dueño del piso</p>
              <p>⚠️ Ve con el dueño o no te atienden.</p>
            </div>
          </div>

          {/* Procedure 2: Residency */}
          <div>
            <h4 className="font-bold text-lg mb-2 flex items-center gap-2">
              <span className="bg-primary text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">2</span>
              Residencia
            </h4>
            <div className="bg-gray-50 p-3 rounded-lg text-sm space-y-2">
              <p>📍 <strong>Savska 35</strong></p>
              <p>🎒 Seguro + Fondos + Beli Karton</p>
            </div>
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
