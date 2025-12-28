"use client";

import React, { useState, useEffect } from 'react';
import { Lightbulb, X } from 'lucide-react';

const TIPS = [
  {
    id: 1,
    title: "Multas de Bus",
    text: "Los controladores (Beli) visten de azul oscuro. Si no tienes boleto, la multa es 5000 RSD.",
    icon: "🚌"
  },
  {
    id: 2,
    title: "Horarios MUP",
    text: "La policía de extranjeros cierra a las 13:00. Ve siempre a las 7:00 AM para hacer fila.",
    icon: "👮‍♂️"
  },
  {
    id: 3,
    title: "Domingos",
    text: "Casi todas las tiendas cierran los domingos después de las 15:00. Compra comida antes.",
    icon: "🛒"
  },
  {
    id: 4,
    title: "Agua del Grifo",
    text: "El agua en Belgrado es potable y segura. No gastes en botellas.",
    icon: "💧"
  },
  {
    id: 5,
    title: "Cambio de Moneda",
    text: "Las 'Menjačnica' tienen mejor tasa que los bancos. Evita cambiar en el aeropuerto.",
    icon: "💱"
  }
];

export default function DailyTip() {
  const [tip, setTip] = useState(TIPS[0]);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Select tip based on day of year to rotate daily
    const dayOfYear = Math.floor((new Date().getTime() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 1000 / 60 / 60 / 24);
    const tipIndex = dayOfYear % TIPS.length;
    setTip(TIPS[tipIndex]);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="mx-4 mb-6 bg-yellow-50 border border-yellow-200 rounded-xl p-4 relative shadow-sm">
      <button 
        onClick={() => setIsVisible(false)}
        className="absolute top-2 right-2 text-yellow-700 hover:bg-yellow-100 rounded-full p-1"
      >
        <X size={16} />
      </button>
      <div className="flex gap-3">
        <div className="bg-yellow-100 w-10 h-10 rounded-full flex items-center justify-center shrink-0 text-xl">
          {tip.icon}
        </div>
        <div>
          <h4 className="font-bold text-yellow-900 text-sm uppercase tracking-wide mb-1 flex items-center gap-2">
            Hoy en Serbia
            <span className="bg-yellow-200 text-[10px] px-1.5 py-0.5 rounded text-yellow-800">Tip del día</span>
          </h4>
          <p className="font-bold text-gray-900 mb-1">{tip.title}</p>
          <p className="text-sm text-gray-700 leading-snug">{tip.text}</p>
        </div>
      </div>
    </div>
  );
}
