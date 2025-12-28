import React from 'react';
import Hero from '@/components/Hero';
import Card from '@/components/Card';
import ChatWidget from '@/components/ChatWidget';
import { 
  ShieldCheck, 
  HeartHandshake, 
  BellRing, 
  Stethoscope, 
  Bus, 
  FileText, 
  Briefcase, 
  Home as HomeIcon, 
  School,
  ArrowRight
} from 'lucide-react';

export default function Home() {
  const benefits = [
    {
      icon: <ShieldCheck className="w-8 h-8 text-primary" />,
      title: "Información Oficial",
      description: "Datos verificados directamente de fuentes gubernamentales para tu tranquilidad."
    },
    {
      icon: <BellRing className="w-8 h-8 text-accent" />,
      title: "Alertas Personalizadas",
      description: "Recibe notificaciones sobre plazos importantes de trámites y cambios legales."
    },
    {
      icon: <HeartHandshake className="w-8 h-8 text-secondary" />,
      title: "Apoyo Empático",
      description: "Diseñado pensando en tus necesidades emocionales y prácticas en un nuevo país."
    }
  ];

  const topics = [
    {
      title: "Registro Policial",
      icon: <FileText className="w-6 h-6 text-primary" />,
      color: "bg-blue-50 text-blue-700",
      desc: "Obligatorio en 24h tras llegada"
    },
    {
      title: "Salud y Emergencias",
      icon: <Stethoscope className="w-6 h-6 text-red-600" />,
      color: "bg-red-50 text-red-700",
      desc: "Clínicas, seguros y urgencias"
    },
    {
      title: "Transporte Público",
      icon: <Bus className="w-6 h-6 text-secondary" />,
      color: "bg-green-50 text-green-700",
      desc: "Tarifas y rutas en Belgrado"
    },
    {
      title: "Trabajo y Permisos",
      icon: <Briefcase className="w-6 h-6 text-orange-600" />,
      color: "bg-orange-50 text-orange-700",
      desc: "Cómo trabajar legalmente"
    },
    {
      title: "Vivienda",
      icon: <HomeIcon className="w-6 h-6 text-purple-600" />,
      color: "bg-purple-50 text-purple-700",
      desc: "Alquiler y registro de domicilio"
    },
    {
      title: "Educación",
      icon: <School className="w-6 h-6 text-teal-600" />,
      color: "bg-teal-50 text-teal-700",
      desc: "Escuelas y convalidaciones"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      
      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-condensed font-bold text-3xl text-primary mb-4">¿Por qué usar ConsejoSeguro?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Simplificamos la burocracia para que puedas enfocarte en construir tu nueva vida.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="flex flex-col items-center text-center p-8 hover:shadow-lg transition-shadow">
                <div className="mb-4 p-4 bg-gray-50 rounded-full">
                  {benefit.icon}
                </div>
                <h3 className="font-bold text-xl mb-2 text-gray-900">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Topics Section */}
      <section className="py-16 bg-gray-50" id="tramites">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="font-condensed font-bold text-3xl text-primary mb-2">Temas Populares</h2>
              <p className="text-gray-600">Lo que más consultan otros usuarios como tú</p>
            </div>
            <a href="#" className="hidden md:flex items-center text-primary font-medium hover:underline gap-1">
              Ver todas las guías <ArrowRight size={16} />
            </a>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {topics.map((topic, index) => (
              <Card key={index} hoverable className="group">
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-lg ${topic.color}`}>
                    {topic.icon}
                  </div>
                  <ArrowRight className="text-gray-300 group-hover:text-primary transition-colors" size={20} />
                </div>
                <h3 className="font-bold text-lg mb-1 text-gray-900">{topic.title}</h3>
                <p className="text-sm text-gray-500">{topic.desc}</p>
              </Card>
            ))}
          </div>
          
          <div className="mt-8 text-center md:hidden">
            <a href="#" className="inline-flex items-center text-primary font-medium hover:underline gap-1">
              Ver todas las guías <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* Testimonials (Simple) */}
      <section className="py-16 bg-white overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-condensed font-bold text-3xl text-center text-primary mb-12">Historias Reales</h2>
          <div className="flex flex-col md:flex-row gap-8">
            <Card className="flex-1 bg-blue-50/50 border-blue-100">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center text-blue-800 font-bold text-lg">A</div>
                <div>
                  <p className="font-bold text-gray-900">Alejandro M.</p>
                  <p className="text-xs text-gray-500">De Cuba, en Belgrado 6 meses</p>
                </div>
              </div>
              <p className="text-gray-700 italic">"Al principio todo era confuso, pero con las guías de ConsejoSeguro pude sacar mi 'White Card' sin problemas. Me sentí mucho más tranquilo."</p>
            </Card>
            <Card className="flex-1 bg-green-50/50 border-green-100">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-green-200 rounded-full flex items-center justify-center text-green-800 font-bold text-lg">E</div>
                <div>
                  <p className="font-bold text-gray-900">Elena R.</p>
                  <p className="text-xs text-gray-500">De Venezuela, en Novi Sad 1 año</p>
                </div>
              </div>
              <p className="text-gray-700 italic">"La sección de salud me salvó cuando mi hijo se enfermó. Saber a dónde ir y qué documentos llevar hizo toda la diferencia."</p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA / App Download */}
      <section className="py-20 bg-primary text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="font-condensed font-bold text-3xl sm:text-4xl mb-6">Lleva tu guía contigo a todas partes</h2>
          <p className="text-blue-100 max-w-2xl mx-auto mb-10 text-lg">
            Descarga la app oficial de ConsejoSeguro. Funciona sin internet y tiene alertas en tiempo real.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-white text-primary px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors flex items-center justify-center gap-2">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.92 20.16,13.19L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" /></svg>
              Google Play
            </button>
            <button className="bg-transparent border border-white text-white px-8 py-3 rounded-lg font-bold hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.67C20.06,16.74 19.67,18.11 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 12.96,6.69 11.93,6.61C11.75,5.46 12.24,4.26 13,3.5Z" /></svg>
              App Store
            </button>
          </div>
        </div>
      </section>

      <ChatWidget />
    </div>
  );
}
