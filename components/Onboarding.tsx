"use client";

import React, { useState, useEffect } from 'react';
import { X, Star, WifiOff, AlertTriangle } from 'lucide-react';

export default function Onboarding() {
  const [step, setStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has seen onboarding
    const seen = localStorage.getItem('cs_onboarding_complete');
    if (!seen) {
      // Delay slightly for smoother entrance
      setTimeout(() => setIsVisible(true), 1000);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem('cs_onboarding_complete', 'true');
  };

  const handleNext = () => {
    if (step < 2) {
      setStep(step + 1);
    } else {
      handleDismiss();
    }
  };

  if (!isVisible) return null;

  const steps = [
    {
      icon: <Star className="text-yellow-500 w-12 h-12" />,
      title: "Guarda lo que más usas",
      desc: "Toca la estrella ⭐ en frases y guías para tenerlas siempre a mano.",
      action: "Entendido"
    },
    {
      icon: <WifiOff className="text-blue-500 w-12 h-12" />,
      title: "Funciona sin internet",
      desc: "Todo el contenido está guardado en tu teléfono. Úsalo donde sea.",
      action: "Genial"
    },
    {
      icon: <AlertTriangle className="text-red-500 w-12 h-12" />,
      title: "Emergencia a un toque",
      desc: "El botón SOS en la barra inferior siempre está visible.",
      action: "Comenzar"
    }
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white w-full max-w-sm rounded-2xl p-6 shadow-2xl relative">
        <button 
          onClick={handleDismiss}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X size={20} />
        </button>

        <div className="flex flex-col items-center text-center pt-4 pb-2">
          <div className="mb-4 p-4 bg-gray-50 rounded-full animate-bounce-slow">
            {steps[step].icon}
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            {steps[step].title}
          </h3>
          <p className="text-gray-600 mb-6">
            {steps[step].desc}
          </p>
          
          <div className="flex gap-2 w-full">
             <button 
               onClick={handleNext}
               className="flex-1 bg-primary text-white font-bold py-3 rounded-xl hover:bg-primary/90 transition-colors"
             >
               {steps[step].action}
             </button>
          </div>
          
          <div className="flex gap-2 mt-6">
            {[0, 1, 2].map(i => (
              <div 
                key={i} 
                className={`w-2 h-2 rounded-full transition-colors ${i === step ? 'bg-primary' : 'bg-gray-200'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
