import Footer from '../components/Footer';
import Logo from '../components/Logo';

export default function ChecklistEjemplo() {
  return (
    <main className="max-w-2xl mx-auto px-2 py-8">
      <div className="flex flex-col items-center mb-6">
        <Logo className="w-14 h-14 mb-3" />
        <h2 className="font-condensed text-2xl md:text-3xl font-bold text-[#003366] mb-3">Checklist de Llegada</h2>
        <div className="bg-[#ffa50011] p-4 rounded-xl shadow-sm mb-4 text-[#003366] text-center">
          Sabemos que llegar a Serbia puede ser abrumador. Aquí tienes los pasos esenciales para tus primeros días:
        </div>
        <ol className="list-decimal list-inside text-left max-w-xs mx-auto mb-4">
          <li>Registrar tu dirección en la comisaría local (MUP)</li>
          <li>Obtener una SIM card serbia</li>
          <li>Cambiar una pequeña cantidad de dinero a dinares (RSD)</li>
          <li>Buscar alojamiento temporal seguro</li>
          <li>Consultar fuentes oficiales para trámites</li>
        </ol>
      </div>
      <Footer />
    </main>
  );
}