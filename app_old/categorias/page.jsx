import Footer from '../components/Footer';

const categories = [
  { name: 'Entrada / Visas', color: '#003366' },
  { name: 'Residencia / Registro', color: '#008000' },
  { name: 'Trabajo / Empleo', color: '#FFA500' },
  { name: 'Vivienda / Vida diaria', color: '#003366' },
  { name: 'Salud / Seguro', color: '#008000' },
  { name: 'Educación / Familia', color: '#FFA500' },
  { name: 'Movilidad / Transporte', color: '#003366' },
  { name: 'Finanzas / Bancos', color: '#008000' },
  { name: 'Cultura / Integración', color: '#FFA500' },
  { name: 'Legal / Trámites', color: '#003366' },
  { name: 'Guías prácticas', color: '#008000' }
];

export default function Categorias() {
  return (
    <main className="max-w-2xl mx-auto px-2 py-8">
      <h2 className="font-condensed text-2xl md:text-3xl font-bold text-[#003366] mb-6 text-center">Categorías</h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
        {categories.map((cat) => (
          <li key={cat.name} className="bg-white dark:bg-neutral-800 rounded-xl shadow-md p-4 text-center border hover:shadow-lg" style={{ borderColor: cat.color }}>
            <span className="font-condensed text-lg font-bold" style={{ color: cat.color }}>{cat.name}</span>
          </li>
        ))}
      </ul>
      <Footer />
    </main>
  );
}