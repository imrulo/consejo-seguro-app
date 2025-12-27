import Link from "next/link";

const flows = [
  { href: "/flows/just-arrived", label: "Llegada" },
  { href: "/flows/renewal-residency", label: "Residencia" },
  { href: "/flows/housing-stability", label: "Vivienda" },
  { href: "/flows/health-panic", label: "Salud" },
  { href: "/flows/legal-clock", label: "Legal" },
  { href: "/flows/work-survival", label: "Trabajo" },
  { href: "/flows/public-transport-belgrade", label: "Transporte" },
  { href: "/flows/currency-exchange-banks", label: "Bancos" },
  { href: "/flows/sim-card-tourist", label: "SIM Card" },
  { href: "/flows/education-family", label: "Educación" },
  { href: "/flows/culture-integration", label: "Cultura" },
  { href: "/flows/practical-guides", label: "Guías" },
  { href: "/flows/entry-visas", label: "Visas" },
  { href: "/flows/birth-registration", label: "Nacimiento" },
  { href: "/flows/family-reunification", label: "Reagrupación" },
  { href: "/flows/official-sources", label: "Fuentes" },
  { href: "/flows/procedures", label: "Trámites" },
  { href: "/flows/official-gazette", label: "Boletín" }
];

export default function NavBar() {
  return (
    <nav aria-label="Navegación principal" style={{display:'flex',flexWrap:'wrap',gap:'0.7rem',padding:'1rem 0',borderBottom:'1px solid #e0e0e0'}}>
      <Link href="/">Inicio</Link>
      <Link href="/categorias">Categorías</Link>
      <Link href="/flujos">Flujos</Link>
      <Link href="/acerca">Acerca</Link>
      <Link href="/checklists">Checklists</Link>
      {flows.map(f => (
        <Link key={f.href} href={f.href}>{f.label}</Link>
      ))}
    </nav>
  );
}
