"use client";

import React, { useState, useEffect } from 'react';
import Hero from '@/components/Hero';
import ChatWidget from '@/components/ChatWidget';
import TranslatorCard from '@/components/TranslatorCard';
import BureaucracyMap from '@/components/BureaucracyMap';
import QuickActionBar from '@/components/QuickActionBar';
import DailyTip from '@/components/DailyTip';
import Favorites from '@/components/Favorites';
import Onboarding from '@/components/Onboarding';
import DailyCheckIn from '@/components/DailyCheckIn';
import TrustSignal from '@/components/TrustSignal';
import FeatureCard from '@/components/ui/FeatureCard';
import BottomSheetModal from '@/components/ui/BottomSheetModal';
import { Nudge, useNudges } from '@/components/Nudge';
import { useLocalAnalytics } from '@/hooks/useLocalAnalytics'; 
import { 
  Bus, 
  Coffee,
  Download,
  Stethoscope,
  Phone,
  ShieldCheck,
  FileText,
  AlertTriangle,
  Plane,
  Star,
  BookOpen,
  Scale,
  HeartHandshake,
  Baby
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
  const [welcomeBackMessage, setWelcomeBackMessage] = useState<string | null>(null);
  const [showMicroOnboarding, setShowMicroOnboarding] = useState(true);
  
  const { activeNudge, checkNudge, dismissNudge } = useNudges();
  const { trackEvent, metrics } = useLocalAnalytics();

  // Load Data & Soft Retention Logic
  useEffect(() => {
    // Favorites
    const savedFavs = localStorage.getItem('cs_favorites');
    if (savedFavs) {
      setFavorites(JSON.parse(savedFavs));
    } else {
      setFavorites([]);
    }

    // Micro-onboarding check
    if (localStorage.getItem('cs_micro_onboarding_seen')) {
      setShowMicroOnboarding(false);
    }

    // Soft Retention: Check last open date
    const lastOpen = localStorage.getItem('cs_last_open_date');
    const now = new Date();
    
    if (lastOpen) {
      const daysSince = (now.getTime() - new Date(lastOpen).getTime()) / (1000 * 3600 * 24);
      if (daysSince > 3) {
        setWelcomeBackMessage("👋 ¡Qué bueno verte de nuevo!");
        setTimeout(() => setWelcomeBackMessage(null), 4000); // Hide after 4s
      }
    }
    
    // Update last open date
    localStorage.setItem('cs_last_open_date', now.toISOString());
  }, []);

  // Toggle Favorite
  const toggleFavorite = (item: FavoriteItem) => {
    const exists = favorites.find(f => f.id === item.id);
    let newFavorites;
    if (exists) {
      newFavorites = favorites.filter(f => f.id !== item.id);
    } else {
      newFavorites = [item, ...favorites];
      trackEvent('favorites_added'); 
    }
    setFavorites(newFavorites);
    localStorage.setItem('cs_favorites', JSON.stringify(newFavorites));
  };

  const isFav = (id: string) => favorites.some(f => f.id === id);

  const handleNavigate = (action: string) => {
    setActiveModal(action);
    
    // Tracking
    trackEvent(`${action}_opened`);

    // Nudge Logic
    const countKey = `cs_usage_${action}`;
    const currentCount = parseInt(localStorage.getItem(countKey) || '0') + 1;
    localStorage.setItem(countKey, currentCount.toString());

    if (action === 'open_transport') {
      checkNudge('transport_fav', currentCount);
    }
  };

  const handleCardInteraction = () => {
    if (showMicroOnboarding) {
      setShowMicroOnboarding(false);
      localStorage.setItem('cs_micro_onboarding_seen', 'true');
    }
  };

  // --- CONTENT DEFINITIONS ---

  const contentEntry = (
    <div className="space-y-6">
      <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-100">
        <h4 className="font-bold text-indigo-900 mb-2">Régimen Libre de Visa</h4>
        <p className="text-sm text-gray-700 mb-2">
          La mayoría de países de LatAm y España pueden entrar a Serbia sin visa por <strong>90 días</strong> dentro de un periodo de 180 días.
        </p>
        <p className="text-xs text-indigo-700 font-bold flex items-center gap-1">
          <AlertTriangle size={12} /> Revisa la validez de tu pasaporte (mínimo 3 meses).
        </p>
      </div>

      <div>
        <h4 className="font-bold text-gray-900 mb-3">Requisitos de Entrada</h4>
        <ul className="space-y-3 text-sm text-gray-700">
          <li className="flex gap-3 items-start">
            <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center shrink-0 text-xs font-bold">€</div>
            <p>Solvencia económica: 50 EUR por día de estancia (efectivo o tarjeta).</p>
          </li>
          <li className="flex gap-3 items-start">
            <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center shrink-0 text-xs font-bold">🏥</div>
            <p>Seguro médico de viaje válido en Serbia.</p>
          </li>
          <li className="flex gap-3 items-start">
            <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 text-xs font-bold">🏠</div>
            <p>Dirección de estancia (reserva de hotel o carta de invitación).</p>
          </li>
        </ul>
      </div>
      
      <button className="w-full bg-primary text-white font-bold py-3 rounded-xl hover:bg-primary/90 transition-colors">
        Ver Lista de Países Exentos
      </button>
    </div>
  );

  const contentTransport = (
    <div className="space-y-6">
       <div className="flex justify-between items-center">
         <h4 className="font-bold text-blue-900">Cómo pagar el bus (SMS)</h4>
         <button onClick={() => toggleFavorite({ id: 'transport_guide', title: 'Pagar el Bus', type: 'guide', action: 'open_transport' })}>
           <Star size={24} className={isFav('transport_guide') ? "text-yellow-500 fill-yellow-500" : "text-gray-300"} />
         </button>
       </div>

       <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
         <ol className="list-decimal list-inside space-y-3 text-sm text-gray-700">
           <li className="pl-2">
             Envía un SMS al número <span className="font-bold text-lg">9011</span>
           </li>
           <li className="pl-2">
             Escribe: <span className="font-mono font-bold bg-white px-2 py-1 rounded border">A90</span> (90 min) o <span className="font-mono font-bold bg-white px-2 py-1 rounded border">B30</span> (mes)
           </li>
           <li className="pl-2">
             Espera la confirmación. ¡Guárdala!
           </li>
         </ol>
       </div>

       <div className="bg-orange-50 p-4 rounded-xl border border-orange-100 flex gap-3">
         <AlertTriangle className="text-orange-600 shrink-0" />
         <p className="text-sm text-orange-800">
           <strong>Multa:</strong> 5000 RSD si no tienes ticket. Los inspectores (Beli) visten de azul oscuro.
         </p>
       </div>

       <div>
         <h4 className="font-bold mb-3">Frases para el bus</h4>
         <TranslatorCard 
           id="bus_center"
           spanishText="¿Este bus va al centro?"
           serbianText="Da li ide do centra?"
           pronunciation="Da li i-de do tsen-tra"
           category="general"
           isFavorite={isFav('bus_center')}
           onToggleFavorite={() => toggleFavorite({ id: 'bus_center', title: 'Va al centro?', type: 'phrase', action: 'open_transport' })}
         />
       </div>
    </div>
  );

  const contentHealth = (
    <div className="space-y-4">
      <div className="bg-red-50 p-4 rounded-xl border border-red-100 flex items-start gap-3">
        <Stethoscope className="text-red-600 shrink-0 mt-1" />
        <div>
          <h4 className="font-bold text-red-800">Urgencias (Hitna Pomoć)</h4>
          <p className="text-sm text-red-600 mb-2">Si hay peligro de vida, llama inmediatamente.</p>
          <a href="tel:194" className="inline-flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg font-bold text-sm active:scale-95 transition-transform">
            <Phone size={16} /> Llamar 194
          </a>
        </div>
      </div>

      <div className="space-y-2">
        <h4 className="font-bold">Farmacias (Apoteka)</h4>
        <p className="text-sm text-gray-600">Busca el signo de cruz verde. Muchas abren 24h en el centro.</p>
      </div>

      <div>
        <h4 className="font-bold mb-2">Frases Médicas</h4>
        <div className="space-y-2">
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
  );

  const contentPapers = (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
         <h4 className="font-bold text-gray-900">Trámites Esenciales</h4>
         <button onClick={() => toggleFavorite({ id: 'papers_guide', title: 'Guía de Papeles', type: 'guide', action: 'open_papers' })}>
           <Star size={24} className={isFav('papers_guide') ? "text-yellow-500 fill-yellow-500" : "text-gray-300"} />
         </button>
       </div>

      <div className="border-b border-gray-100 pb-6">
        <h4 className="font-bold text-lg mb-2 flex items-center gap-2">
          <span className="bg-primary text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">1</span>
          Beli Karton (Registro 24h)
        </h4>
        <div className="bg-gray-50 p-3 rounded-lg text-sm space-y-2">
          <p>📍 <strong>Dónde:</strong> Comisaría (MUP) local.</p>
          <p>🎒 <strong>Lleva:</strong> Pasaporte + Dueño del piso.</p>
          <p>⚠️ <strong>Multa:</strong> Si no lo tienes, puedes tener problemas al salir.</p>
        </div>
      </div>

      <div>
        <h4 className="font-bold text-lg mb-2 flex items-center gap-2">
          <span className="bg-primary text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">2</span>
          Residencia Temporal
        </h4>
        <div className="bg-gray-50 p-3 rounded-lg text-sm space-y-2">
          <p>📍 <strong>Oficina:</strong> Savska 35, Belgrado.</p>
          <p>📄 <strong>Base:</strong> Estudios, trabajo, familia o propiedad.</p>
        </div>
      </div>
    </div>
  );

  const contentPsychology = (
    <div className="space-y-4">
      <div className="bg-teal-50 p-4 rounded-xl border border-teal-100">
        <div className="flex items-center gap-2 mb-2">
          <Baby className="text-teal-600" size={24} />
          <h4 className="font-bold text-teal-900">Apoyo Escolar y Familiar</h4>
        </div>
        <p className="text-sm text-gray-700 mb-2">
          El sistema educativo serbio ofrece psicólogos escolares ("Pedagog") gratuitos en cada escuela para ayudar a niños en adaptación.
        </p>
      </div>
      
      <div className="space-y-3">
        <h4 className="font-bold text-gray-900">Recursos Gratuitos</h4>
        <ul className="space-y-2 text-sm text-gray-600">
          <li className="flex gap-2">
            <span className="text-green-500">✅</span>
            Centros de Trabajo Social (Centar za socijalni rad)
          </li>
          <li className="flex gap-2">
            <span className="text-green-500">✅</span>
            Línea de Ayuda Joven: 116-111 (NADEL)
          </li>
        </ul>
      </div>

      <TranslatorCard 
        id="school_psy"
        spanishText="Quisiera hablar con el psicólogo escolar"
        serbianText="Želeo bih da razgovaram sa školskim psihologom"
        pronunciation="Ze-le-o bih da raz-go-va-ram sa shkol-skim psi-ho-lo-gom"
        category="general"
        isFavorite={isFav('school_psy')}
        onToggleFavorite={() => toggleFavorite({ id: 'school_psy', title: 'Psicólogo Escolar', type: 'phrase', action: 'open_psych' })}
      />
    </div>
  );

  const contentLegal = (
    <div className="space-y-4">
      <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
        <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
          <Scale size={18} /> Asistencia Legal Gratuita
        </h4>
        <p className="text-sm text-gray-600 mb-2">
          Existen ONGs que ayudan a refugiados y solicitantes de asilo con trámites legales.
        </p>
        <ul className="list-disc list-inside text-sm text-gray-600">
          <li>APC (Asylum Protection Center)</li>
          <li>BCHR (Belgrade Centre for Human Rights)</li>
        </ul>
      </div>
      <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-200">
         <p className="text-sm text-yellow-800 font-bold">
           ⚠️ Nunca firmes documentos que no entiendas. Pide siempre un traductor.
         </p>
      </div>
    </div>
  );

  const contentCommunity = (
    <div className="space-y-4">
      <p className="text-gray-600 text-sm">
        Conectar con otros hispanohablantes o locales amigables puede hacer la diferencia.
      </p>
      <div className="grid grid-cols-1 gap-3">
        <button className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-xl shadow-sm hover:bg-gray-50 text-left">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
            <Coffee size={20} />
          </div>
          <div>
            <p className="font-bold text-gray-900">Grupos de Facebook</p>
            <p className="text-xs text-gray-500">Latinos en Serbia, Expats Belgrade</p>
          </div>
        </button>
        <button className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-xl shadow-sm hover:bg-gray-50 text-left">
          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600">
            <HeartHandshake size={20} />
          </div>
          <div>
            <p className="font-bold text-gray-900">Voluntariado</p>
            <p className="text-xs text-gray-500">Cruz Roja, Info Park</p>
          </div>
        </button>
      </div>
    </div>
  );

  // --- FEATURE DATA MAP ---
  const features = [
    {
      id: 'open_entry',
      title: 'Entrada y Visas',
      desc: 'Requisitos, 90 días, solvencia.',
      icon: <Plane size={24} />,
      content: contentEntry,
      variant: 'default'
    },
    {
      id: 'open_transport',
      title: 'Transporte',
      desc: 'Pagar bus (SMS), multas.',
      icon: <Bus size={24} />,
      content: contentTransport,
      variant: 'default'
    },
    {
      id: 'open_papers',
      title: 'Papeles / MUP',
      desc: 'Beli Karton, Residencia.',
      icon: <FileText size={24} />,
      content: contentPapers,
      variant: 'default'
    },
    {
      id: 'open_doctor',
      title: 'Salud y Urgencias',
      desc: '194, farmacias, seguro.',
      icon: <Stethoscope size={24} />,
      content: contentHealth,
      variant: 'danger' // Highlight as important
    },
    {
      id: 'open_psych',
      title: 'Psicología Escolar',
      desc: 'Apoyo para niños y adaptación.',
      icon: <Baby size={24} />,
      content: contentPsychology,
      variant: 'default'
    },
    {
      id: 'open_legal',
      title: 'Trámites Legales',
      desc: 'Asistencia legal gratuita.',
      icon: <Scale size={24} />,
      content: contentLegal,
      variant: 'default'
    },
    {
      id: 'community',
      title: 'Comunidad',
      desc: 'Grupos, eventos, café.',
      icon: <Coffee size={24} />,
      content: contentCommunity,
      variant: 'default'
    },
    {
      id: 'download',
      title: 'Guardar Todo',
      desc: 'Descargar para uso offline.',
      icon: <Download size={24} />,
      content: (
        <div className="text-center py-6">
          <Download size={48} className="mx-auto text-gray-300 mb-4" />
          <h3 className="font-bold text-xl text-gray-900">Modo Offline Listo</h3>
          <p className="text-gray-600 mb-4">Esta app ya funciona sin internet. Agrega el icono a tu pantalla de inicio.</p>
        </div>
      ),
      variant: 'default'
    }
  ];

  const getFeatureContent = (id: string) => features.find(f => f.id === id)?.content;
  const getFeatureTitle = (id: string) => features.find(f => f.id === id)?.title;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 pb-20">
      <Onboarding />
      <Nudge nudge={activeNudge!} onDismiss={dismissNudge} />

      {/* Soft Retention Toast */}
      {welcomeBackMessage && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-white/95 backdrop-blur border border-primary/10 text-primary px-6 py-3 rounded-full shadow-xl text-sm font-bold animate-in slide-in-from-top-4 fade-in flex items-center gap-2">
          {welcomeBackMessage}
        </div>
      )}

      <Hero onNavigate={handleNavigate} />
      
      {/* Daily Content & Favorites */}
      <section className="mt-6">
        <div className="container mx-auto">
          <DailyCheckIn />
          
          {/* Micro-Onboarding Hint */}
          {showMicroOnboarding && (
            <div className="mx-4 mb-4 bg-blue-50 border border-blue-100 rounded-lg p-3 flex items-center justify-between animate-in fade-in">
              <p className="text-xs text-blue-800 font-bold flex items-center gap-2">
                👆 Toca cualquier tarjeta para ver detalles
              </p>
              <button onClick={() => setShowMicroOnboarding(false)} className="text-blue-400 hover:text-blue-600">
                <span className="sr-only">Cerrar</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
            </div>
          )}

          <Favorites items={favorites} onNavigate={handleNavigate} />
          <DailyTip />
        </div>
      </section>
      
      {/* Roadmap Section */}
      <section className="mb-6">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-condensed font-bold text-xl text-gray-800">Tu Progreso</h2>
            <span className="text-xs font-bold text-primary bg-blue-50 px-3 py-1 rounded-full">Paso 2 de 5</span>
          </div>
          <BureaucracyMap />
        </div>
      </section>

      {/* Translator Quick Access */}
      <section className="mb-8">
        <div className="container mx-auto px-4">
          <h2 className="font-condensed font-bold text-xl text-gray-800 mb-4 flex items-center gap-2">
            🗣️ Traductor Rápido
            <span className="text-[10px] font-normal text-gray-500 bg-gray-100 px-2 py-0.5 rounded ml-auto">Funciona offline</span>
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
                spanishText="¿Dónde está la policía?"
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

      {/* Essential Tools Grid (Feature Cards) */}
      <section className="mb-8" onClick={handleCardInteraction}>
        <div className="container mx-auto px-4">
          <h2 className="font-condensed font-bold text-xl text-gray-800 mb-4">Herramientas y Guías</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map((feature) => (
              <FeatureCard 
                key={feature.id}
                title={feature.title}
                description={feature.desc}
                icon={feature.icon}
                content={feature.content}
                variant={feature.variant as any}
              />
            ))}
          </div>
        </div>
      </section>

      <TrustSignal />

      {/* Offline Alert */}
      <div className="container mx-auto px-4 mt-auto mb-4">
        <div className="bg-gray-100 rounded-lg p-3 text-xs text-gray-500 flex items-center justify-center gap-2 text-center">
          <div className="w-2 h-2 rounded-full bg-green-500"></div>
          Modo offline activo: todo funciona sin internet.
        </div>
      </div>

      <ChatWidget />
      
      <QuickActionBar 
        onEmergency={() => handleNavigate('open_doctor')} // Changed to map to existing feature
        onTranslator={() => {
          document.querySelector('section:nth-of-type(3)')?.scrollIntoView({ behavior: 'smooth' });
          trackEvent('translator_used');
        }}
        onTransport={() => handleNavigate('open_transport')} 
      />

      {/* 
        GLOBAL MODAL FOR EXTERNAL TRIGGERS (Favorites, Quick Actions)
        This ensures that if a user clicks a Favorite or Quick Action, 
        the same content appears even though FeatureCard has its own internal state.
      */}
      <BottomSheetModal
        isOpen={!!activeModal && activeModal !== 'open_emergency'} // Emergency has special handling in QuickAction or reuse doctor
        onClose={() => setActiveModal(null)}
        title={getFeatureTitle(activeModal || '') || 'Detalle'}
        variant={activeModal === 'open_doctor' ? 'danger' : 'default'}
      >
        {getFeatureContent(activeModal || '')}
      </BottomSheetModal>

    </div>
  );
}
