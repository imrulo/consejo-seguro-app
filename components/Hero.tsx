"use client";

import React, { useState, useEffect } from 'react';
import { Search, MapPin, ChevronRight, Phone, CheckCircle2 } from 'lucide-react';
import Button from './Button';
import Modal from './Modal';

// Mock Data for Search
const SEARCH_ITEMS = [
  { id: 'doc', term: 'Médico / Doctor', type: 'Salud', action: 'open_doctor' },
  { id: 'pol', term: 'Policía / MUP', type: 'Seguridad', action: 'open_police' },
  { id: 'pap', term: 'Beli Karton (Papeles)', type: 'Trámite', action: 'open_papers' },
  { id: 'bus', term: 'BusPlus / Transporte', type: 'Transporte', action: 'open_transport' },
  { id: 'sim', term: 'Tarjeta SIM / Internet', type: 'Utilidad', action: 'open_sim' },
];

export default function Hero({ onNavigate }: { onNavigate?: (action: string) => void }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState(SEARCH_ITEMS);
  const [isEmergencyOpen, setIsEmergencyOpen] = useState(false);
  const [isSafeOpen, setIsSafeOpen] = useState(false);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setResults([]);
    } else {
      const lower = searchQuery.toLowerCase();
      const filtered = SEARCH_ITEMS.filter(item => 
        item.term.toLowerCase().includes(lower) || 
        item.type.toLowerCase().includes(lower)
      );
      setResults(filtered);
    }
  }, [searchQuery]);

  return (
    <section className="bg-primary text-white pt-8 pb-12 rounded-b-[2.5rem] shadow-xl relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header Info */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <p className="text-blue-200 text-sm font-medium">Ubicación detectada</p>
            <div className="flex items-center gap-1 text-white font-bold text-lg">
              <MapPin size={18} className="text-accent" />
              Belgrado, Serbia
            </div>
          </div>
          <div className="flex flex-col items-end">
             <div className="bg-red-500/20 border border-red-500/50 rounded-full px-3 py-1 flex items-center gap-2 animate-pulse">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span className="text-xs font-bold text-red-100 uppercase tracking-wide">Alerta</span>
             </div>
             <p className="text-[10px] text-red-200 mt-1">Ley de Extranjería</p>
          </div>
        </div>

        <h1 className="font-condensed font-bold text-3xl sm:text-4xl mb-2">
          ¿Qué necesitas resolver hoy?
        </h1>
        <p className="text-blue-100 mb-6">Tu kit de supervivencia digital.</p>

        {/* Search Bar */}
        <div className="relative mb-8">
          <div className="relative shadow-lg z-20">
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Ej: Médico, Policía, Papeles..." 
              className="w-full h-14 pl-12 pr-4 rounded-xl bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-accent/50 text-lg"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={24} />
          </div>

          {/* Instant Search Results */}
          {results.length > 0 && searchQuery !== '' && (
            <div className="absolute top-16 left-0 right-0 bg-white rounded-xl shadow-xl z-30 overflow-hidden border border-gray-100 animate-in fade-in slide-in-from-top-2">
              {results.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setSearchQuery('');
                    if (onNavigate) onNavigate(item.action);
                  }}
                  className="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center justify-between border-b border-gray-50 last:border-0"
                >
                  <div>
                    <p className="font-bold text-gray-900">{item.term}</p>
                    <p className="text-xs text-gray-500">{item.type}</p>
                  </div>
                  <ChevronRight size={18} className="text-gray-400" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          <Button 
            onClick={() => setIsSafeOpen(true)}
            variant="secondary" 
            className="bg-[#008000] h-14 text-left justify-start px-4 text-sm font-bold shadow-lg border-b-4 border-green-800 active:border-b-0 active:translate-y-1 transition-all"
          >
            ✅ Ya llegué
          </Button>
          <Button 
            onClick={() => setIsEmergencyOpen(true)}
            variant="primary" 
            className="bg-red-600 hover:bg-red-700 h-14 text-left justify-start px-4 text-sm font-bold shadow-lg border-b-4 border-red-800 active:border-b-0 active:translate-y-1 transition-all"
          >
            🚨 Emergencia
          </Button>
        </div>
      </div>

      {/* Emergency Modal */}
      <Modal 
        isOpen={isEmergencyOpen} 
        onClose={() => setIsEmergencyOpen(false)} 
        title="Números de Emergencia"
        variant="danger"
      >
        <div className="space-y-3">
          <p className="text-sm text-gray-600 mb-4">
            Toca cualquiera de estos números para llamar inmediatamente. Funcionan 24/7.
          </p>
          
          <a href="tel:194" className="flex items-center gap-4 p-4 bg-red-50 border border-red-100 rounded-xl hover:bg-red-100 transition-colors">
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center text-red-600">
              <Phone size={20} />
            </div>
            <div>
              <p className="font-bold text-lg text-gray-900">194</p>
              <p className="text-sm text-red-700">Ambulancia (Hitna pomoć)</p>
            </div>
          </a>

          <a href="tel:192" className="flex items-center gap-4 p-4 bg-blue-50 border border-blue-100 rounded-xl hover:bg-blue-100 transition-colors">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
              <Phone size={20} />
            </div>
            <div>
              <p className="font-bold text-lg text-gray-900">192</p>
              <p className="text-sm text-blue-700">Policía (Policija)</p>
            </div>
          </a>

          <a href="tel:193" className="flex items-center gap-4 p-4 bg-orange-50 border border-orange-100 rounded-xl hover:bg-orange-100 transition-colors">
            <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-orange-600">
              <Phone size={20} />
            </div>
            <div>
              <p className="font-bold text-lg text-gray-900">193</p>
              <p className="text-sm text-orange-700">Bomberos (Vatrogasci)</p>
            </div>
          </a>
        </div>
      </Modal>

      {/* Safety Modal */}
      <Modal
        isOpen={isSafeOpen}
        onClose={() => setIsSafeOpen(false)}
        title="Reporte de Seguridad"
      >
        <div className="text-center py-6">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600 mx-auto mb-4">
            <CheckCircle2 size={40} />
          </div>
          <h3 className="font-bold text-xl text-gray-900 mb-2">¡Nos alegra que estés bien!</h3>
          <p className="text-gray-600 mb-6">
            Si deseas, puedes compartir tu ubicación actual con un contacto de confianza para mayor tranquilidad.
          </p>
          <Button fullWidth onClick={() => alert("Abriendo WhatsApp para compartir ubicación...")}>
            Compartir Ubicación
          </Button>
        </div>
      </Modal>
    </section>
  );
}
