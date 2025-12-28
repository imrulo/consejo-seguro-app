import Footer from '../components/Footer';

export default function Flujos() {
  return (
    <main className="max-w-2xl mx-auto px-2 py-8">
      <h2 className="font-condensed text-2xl md:text-3xl font-bold text-[#003366] mb-4 text-center">Flujos Funcionales</h2>
      <div className="bg-[#e9f5f9] dark:bg-[#00336622] rounded-xl shadow-md p-5 mb-8 text-center border border-[#00800055]">
        Explora los flujos de vida y trámites más comunes para inmigrantes en Serbia.<br/>
        Encuentra explicaciones paso a paso, requisitos y enlaces oficiales para cada proceso importante.
      </div>
      <Footer />
    </main>
  );
}