import React from 'react';
import { CheckCircle2, Circle, Clock, MapPin } from 'lucide-react';

interface Step {
  id: string;
  title: string;
  description: string;
  status: 'completed' | 'current' | 'locked';
  icon?: React.ReactNode;
}

export default function BureaucracyMap() {
  const steps: Step[] = [
    {
      id: '1',
      title: 'Llegada',
      description: 'Aeropuerto Nikola Tesla',
      status: 'completed',
      icon: <MapPin size={16} />
    },
    {
      id: '2',
      title: 'Beli Karton',
      description: 'Registro policial (24h)',
      status: 'current',
      icon: <Clock size={16} className="text-orange-500" />
    },
    {
      id: '3',
      title: 'Cuenta Bancaria',
      description: 'Requisito para visa',
      status: 'locked'
    },
    {
      id: '4',
      title: 'Visa D / Residencia',
      description: 'Solicitud en MUP',
      status: 'locked'
    },
    {
      id: '5',
      title: 'Permiso de Trabajo',
      description: 'NSZ',
      status: 'locked'
    }
  ];

  return (
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
            
            <div className="relative z-10 flex flex-col items-center group cursor-pointer">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center border-4 transition-all ${
                step.status === 'completed' ? 'bg-green-500 border-green-100 text-white' :
                step.status === 'current' ? 'bg-white border-orange-500 text-orange-500 shadow-lg scale-110' :
                'bg-gray-100 border-gray-50 text-gray-400'
              }`}>
                {step.status === 'completed' ? <CheckCircle2 size={20} /> :
                 step.status === 'current' ? <Clock size={20} /> :
                 <Circle size={16} />}
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
    </div>
  );
}
