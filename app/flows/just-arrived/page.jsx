import { EmpathyCallout, StepList } from "../../../components/UIComponents";
import RelatedLinks from "../../../components/RelatedLinks";

export default function JustArrivedFlow() {
  return (
    <main>
      <h2>Acabas de Llegar a Serbia</h2>
      <EmpathyCallout>
        Llegar a un nuevo país puede ser abrumador. Aquí tienes los pasos esenciales para tus primeros días en Serbia.
      </EmpathyCallout>
      <StepList steps={[
        "Registrar tu dirección en la comisaría local (MUP)",
        "Obtener una SIM card serbia",
        "Cambiar una pequeña cantidad de dinero a dinares (RSD)",
        "Buscar alojamiento temporal seguro",
        "Consultar fuentes oficiales para trámites"
      ]} />
      <RelatedLinks links={[
        { href: "/flows/renewal-residency", label: "Renovación de Residencia" },
        { href: "/flows/sim-card-tourist", label: "SIM Card para Turistas" },
        { href: "/flows/housing-stability", label: "Estabilidad de Vivienda" }
      ]} />
      <p style={{marginTop:'2rem',fontSize:'0.95rem'}}>
        Fuente oficial: <a href="https://welcometoserbia.gov.rs/home" target="_blank" rel="noopener noreferrer">Welcome to Serbia</a>
      </p>
    </main>
  );
}
