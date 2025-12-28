import React from 'react';
import { Search, MapPin, AlertTriangle, ChevronRight } from 'lucide-react';
import Button from './Button';

export default function Hero() {
  return (
    <section className="bg-primary text-white pt-8 pb-12 rounded-b-[2.5rem] shadow-xl relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>
      
      <div className="container mx-auto px-4 relative z-10">
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
             <p className="text-[10px] text-red-200 mt-1">Cambios en Ley de Extranjería</p>
          </div>
        </div>

        <h1 className="font-condensed font-bold text-3xl sm:text-4xl mb-2">
          ¿Qué necesitas resolver hoy?
        </h1>
        <p className="text-blue-100 mb-6">Tu kit de supervivencia digital.</p>

        {/* Search Bar */}
        <div className="relative mb-8 shadow-lg">
          <input 
            type="text" 
            placeholder="Ej: Beli karton, Médico, Bus..." 
            className="w-full h-14 pl-12 pr-4 rounded-xl bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-accent/50 text-lg"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={24} />
        </div>

        {/* Panic / Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          <Button variant="secondary" className="bg-[#008000] h-14 text-left justify-start px-4 text-sm font-bold shadow-lg border-b-4 border-green-800 active:border-b-0 active:translate-y-1 transition-all">
            ✅ Ya llegué
          </Button>
          <Button variant="primary" className="bg-red-600 hover:bg-red-700 h-14 text-left justify-start px-4 text-sm font-bold shadow-lg border-b-4 border-red-800 active:border-b-0 active:translate-y-1 transition-all">
            🚨 Emergencia
          </Button>
        </div>
      </div>
    </section>
  );
}
