"use client";

import React, { useState, useEffect } from 'react';
import { Lightbulb, X, CalendarClock, Coffee } from 'lucide-react';

const GENERAL_TIPS = [
  {
    id: 1,
    title: "Multas de Bus",
    text: "Los controladores (Beli) visten de azul oscuro. Si no tienes boleto, la multa es 5000 RSD.",
    icon: "🚌"
  },
  {
    id: 2,
    title: "Agua del Grifo",
    text: "El agua en Belgrado es potable y segura. No gastes en botellas.",
    icon: "💧"
  },
  {
    id: 3,
    title: "Cambio de Moneda",
    text: "Las 'Menjačnica' tienen mejor tasa que los bancos. Evita cambiar en el aeropuerto.",
    icon: "💱"
  }
];

// Day-specific tips (0 = Sunday, 1 = Monday, etc.)
const DAY_SPECIFIC_TIPS: Record<number, any> = {
  0: { // Sunday
    id: 'sunday_hours',
    title: "Domingo de Relax",
    text: "Casi todas las tiendas cierran hoy después de las 15:00. Si necesitas comida, ve ahora.",
    icon: <CalendarClock size={24} className="text-orange-600" />
  },
  1: { // Monday
    id: 'monday_traffic',
    title: "Tráfico de Lunes",
    text: "El puente Branko se congestiona mucho de 8 a 10 AM. Mejor cruza en tranvía o a pie.",
    icon: "🚗"
  },
  5: { // Friday
    id: 'friday_plans',
    title: "Viernes Social",
    text: "Los serbios aman el café. Si te invitan a 'Kafa', es para charlar horas, no 5 minutos.",
    icon: <Coffee size={24} className="text-brown-600" />
  },
  6: { // Saturday
    id: 'weekend_market',
    title: "Mercados (Pijaca)",
    text: "El fin de semana es el mejor momento para ir al mercado Kalenić. Lleva efectivo.",
    icon: "🥦"
  }
};

export default function DailyTip() {
  const [tip, setTip] = useState(GENERAL_TIPS[0]);
  const [isVisible, setIsVisible] = useState(true);
  const [isDaySpecific, setIsDaySpecific] = useState(false);

  useEffect(() => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    
    // 50% chance to show day-specific tip if available, otherwise general tip
    // Or prioritize day specific if it's Sunday (0) or Monday (1)
    if (DAY_SPECIFIC_TIPS[dayOfWeek]) {
      setTip(DAY_SPECIFIC_TIPS[dayOfWeek]);
      setIsDaySpecific(true);
    } else {
      // General rotation based on date
      const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 1000 / 60 / 60 / 24);
      const tipIndex = dayOfYear % GENERAL_TIPS.length;
      setTip(GENERAL_TIPS[tipIndex]);
      setIsDaySpecific(false);
    }
  }, []);

  if (!isVisible) return null;

  return (
    <div className={`mx-4 mb-6 rounded-xl p-4 relative shadow-sm border ${
      isDaySpecific ? 'bg-blue-50 border-blue-200' : 'bg-yellow-50 border-yellow-200'
    }`}>
      <button 
        onClick={() => setIsVisible(false)}
        className={`absolute top-2 right-2 rounded-full p-1 ${
          isDaySpecific ? 'text-blue-700 hover:bg-blue-100' : 'text-yellow-700 hover:bg-yellow-100'
        }`}
      >
        <X size={16} />
      </button>
      <div className="flex gap-3">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 text-xl ${
          isDaySpecific ? 'bg-blue-100 text-blue-600' : 'bg-yellow-100'
        }`}>
          {tip.icon}
        </div>
        <div>
          <h4 className={`font-bold text-sm uppercase tracking-wide mb-1 flex items-center gap-2 ${
            isDaySpecific ? 'text-blue-900' : 'text-yellow-900'
          }`}>
            Hoy en Serbia
            <span className={`text-[10px] px-1.5 py-0.5 rounded ${
              isDaySpecific ? 'bg-blue-200 text-blue-800' : 'bg-yellow-200 text-yellow-800'
            }`}>
              {isDaySpecific ? 'Contexto' : 'Tip del día'}
            </span>
          </h4>
          <p className="font-bold text-gray-900 mb-1">{tip.title}</p>
          <p className="text-sm text-gray-700 leading-snug">{tip.text}</p>
        </div>
      </div>
    </div>
  );
}
