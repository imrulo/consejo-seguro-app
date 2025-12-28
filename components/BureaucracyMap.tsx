"use client";

import React, { useState } from 'react';
import { CheckCircle2, Circle, Clock, MapPin, Lock, Info } from 'lucide-react';
import Modal from './Modal';
import Button from './Button';

interface Step {
  id: string;
  title: string;
  description: string;
  status: 'completed' | 'current' | 'locked';
  icon?: React.ReactNode;
  detailTitle?: string;
  detailContent?: React.ReactNode;
}

export default function BureaucracyMap() {
  const [selectedStep, setSelectedStep] = useState<Step | null>(null);

  const steps: Step[] = [
    {
      id: '1',
      title: 'Llegada',
      description: 'Aeropuerto',
      status: 'completed',
      icon: <MapPin size={16} />,
      detailTitle: 'Bienvenido a Serbia',
      detailContent: (
        <div>
           <p className="text-gray-600 mb-4">¡Ya estás aquí! Lo más difícil ya pasó.</p>
           <h4 className="font-bold text-sm mb-2">Lo que ya tienes:</h4>
           <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
             <li>Pasaporte sellado</li>
             <li>Equipaje contigo</li>
             <li>Dinares (moneda local)</li>
           </ul>
        </div>
      )
    },
    {
      id: '2',
      title: 'Beli Karton',
      description: 'Registro policial',
      status: 'current',
      icon: <Clock size={16} className="text-orange-500" />,
      detailTitle: 'El Papel Blanco (Beli Karton)',
      detailContent: (
        <div>
           <div className="bg-orange-50 border-l-4 border-orange-500 p-3 mb-4">
             <p className="text-sm text-orange-800 font-bold">⚠️ Importante: Tienes 24 horas.</p>
           </div>
           <p className="text-gray-600 mb-4 text-sm">
             Es el papelito que dice dónde duermes. Sin él, no puedes abrir cuenta de banco ni pedir visa.
           </p>
           <h4 className="font-bold text-sm mb-2">¿Cómo se consigue?</h4>
           <ul className="list-disc list-inside text-sm text-gray-600 space-y-1 mb-4">
             <li><strong>Hotel/Hostel:</strong> Te lo dan en recepción. Pídelo.</li>
             <li><strong>Airbnb/Amigos:</strong> El dueño debe ir contigo a la policía.</li>
           </ul>
           <Button fullWidth onClick={() => alert("Abriendo guía detallada de Beli Karton (Próximamente)")}>Ver Guía Paso a Paso</Button>
        </div>
      )
    },
    {
      id: '3',
      title: 'Banco',
      description: 'Cuenta local',
      status: 'locked',
      detailTitle: 'Abrir Cuenta Bancaria',
      detailContent: (
        <div>
           <div className="bg-gray-100 p-3 mb-4 rounded flex items-center gap-2">
             <Lock size={16} className="text-gray-500" />
             <p className="text-sm text-gray-600">Necesitas el Beli Karton primero.</p>
           </div>
           <p className="text-sm text-gray-600">
             Para la visa, necesitas una cuenta de "No Residente" donde demuestres que tienes ahorros.
           </p>
        </div>
      )
    },
    {
      id: '4',
      title: 'Visa D',
      description: 'Residencia',
      status: 'locked',
      detailTitle: 'Permiso de Residencia',
      detailContent: (
        <div>
           <div className="bg-gray-100 p-3 mb-4 rounded flex items-center gap-2">
             <Lock size={16} className="text-gray-500" />
             <p className="text-sm text-gray-600">Necesitas todos los pasos anteriores.</p>
           </div>
           <p className="text-sm text-gray-600">
             El paso final. Se tramita en la oficina de extranjeros (Savska 35).
           </p>
        </div>
      )
    }
  ];

  const handleStepClick = (step: Step) => {
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate(10);
    }
    setSelectedStep(step);
  };

  return (
    <>
      <div className="w-full py-6 overflow-x-auto no-scrollbar">
        <div className="flex items-center min-w-[600px] px-4">
          {steps.map((step, index) => (
            <div key={step.id} className="flex-1 relative">
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className={`absolute top-5 left-1/2 w-full h-1 ${
                  step.status === 'completed' ? 'bg-green-500' : 'bg-gray-200'
                }`} />
              )}
              
              <div 
                className="relative z-10 flex flex-col items-center group cursor-pointer active:scale-95 transition-transform duration-150"
                onClick={() => handleStepClick(step)}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-4 transition-all ${
                  step.status === 'completed' ? 'bg-green-500 border-green-100 text-white' :
                  step.status === 'current' ? 'bg-white border-orange-500 text-orange-500 shadow-lg scale-110' :
                  'bg-gray-100 border-gray-50 text-gray-400'
                }`}>
                  {step.status === 'completed' ? <CheckCircle2 size={20} /> :
                   step.status === 'current' ? <Clock size={20} /> :
                   <Lock size={16} />}
                </div>
                
                <div className="mt-3 text-center">
                  <p className={`text-sm font-bold ${
                    step.status === 'current' ? 'text-primary' : 'text-gray-600'
                  }`}>
                    {step.title}
                  </p>
                  <p className="text-xs text-gray-400 max-w-[100px] mx-auto leading-tight mt-1">
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-400 text-center mt-2">(Toca un paso para ver detalles)</p>
      </div>

      <Modal
        isOpen={!!selectedStep}
        onClose={() => setSelectedStep(null)}
        title={selectedStep?.detailTitle || selectedStep?.title || ''}
      >
        {selectedStep?.detailContent}
      </Modal>
    </>
  );
}
