"use client";

import React from 'react';
import { ShieldCheck } from 'lucide-react';

export default function TrustSignal() {
  return (
    <div className="container mx-auto px-4 py-8 mt-auto">
      <div className="flex flex-col items-center justify-center text-center opacity-60 hover:opacity-100 transition-opacity">
        <ShieldCheck size={20} className="text-gray-400 mb-2" />
        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">
          100% Privado y Offline
        </p>
        <p className="text-[10px] text-gray-400 max-w-xs leading-relaxed">
          Tus datos se quedan en este teléfono. Sin servidores, sin cuentas.
        </p>
      </div>
    </div>
  );
}
