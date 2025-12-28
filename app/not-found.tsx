import Link from "next/link";
import { MapPin, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 text-center">
      <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-6">
        <MapPin size={32} className="text-blue-500" />
      </div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2 font-condensed">
        Página no encontrada
      </h2>
      <p className="text-gray-600 mb-8 max-w-xs mx-auto">
        Parece que te has desviado del camino. Volvamos a lo seguro.
      </p>
      <Link
        href="/"
        className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl font-bold hover:bg-primary/90 transition-all active:scale-95 shadow-md"
      >
        <Home size={20} />
        Volver al Inicio
      </Link>
    </div>
  );
}
