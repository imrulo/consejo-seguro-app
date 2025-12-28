"use client";

import React, { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import Button from './Button';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-40 print:hidden">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-accent hover:bg-orange-600 text-white rounded-full p-4 shadow-lg transition-all duration-300 hover:scale-105 flex items-center justify-center group"
          aria-label="Chat de ayuda"
        >
          <MessageCircle size={28} className="fill-current" />
          <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-in-out whitespace-nowrap group-hover:pl-2 font-medium">
            ¿Necesitas ayuda?
          </span>
        </button>
      )}

      {isOpen && (
        <div className="bg-white rounded-2xl shadow-2xl w-80 sm:w-96 flex flex-col overflow-hidden border border-gray-100 animate-in slide-in-from-bottom-5 fade-in duration-300">
          <div className="bg-primary p-4 flex justify-between items-center text-white">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <MessageCircle size={18} />
              </div>
              <div>
                <h3 className="font-bold text-sm">Asistente ConsejoSeguro</h3>
                <p className="text-xs text-blue-100">Respuesta instantánea</p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white p-1 hover:bg-white/10 rounded-full transition-colors"
            >
              <X size={20} />
            </button>
          </div>
          
          <div className="p-4 h-80 overflow-y-auto bg-gray-50 flex flex-col gap-3">
            <div className="self-start bg-white p-3 rounded-2xl rounded-tl-none shadow-sm border border-gray-100 max-w-[85%]">
              <p className="text-sm text-gray-700">
                ¡Hola! Soy tu asistente virtual. ¿En qué puedo ayudarte hoy?
              </p>
            </div>
            <div className="self-start bg-white p-3 rounded-2xl rounded-tl-none shadow-sm border border-gray-100 max-w-[85%]">
              <p className="text-sm text-gray-700">
                Puedo informarte sobre visas, registro policial, transporte o salud.
              </p>
            </div>
          </div>
          
          <div className="p-3 border-t border-gray-100 bg-white">
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="text" 
                placeholder="Escribe tu pregunta..." 
                className="flex-1 bg-gray-50 border-0 rounded-full px-4 py-2 text-sm focus:ring-2 focus:ring-primary/20 focus:outline-none"
              />
              <button 
                type="submit"
                className="bg-primary text-white p-2 rounded-full hover:bg-primary/90 transition-colors"
              >
                <Send size={18} />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
