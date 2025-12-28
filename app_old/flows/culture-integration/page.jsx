import { EmpathyCallout, StepList } from "../../../components/UIComponents";

export default function CultureIntegrationFlow() {
  return (
    <main>
      <h2>Cultura e Integración</h2>
      <EmpathyCallout>
        Integrarte en la sociedad serbia es un proceso gradual. Estos pasos te ayudarán a adaptarte y sentirte parte de la comunidad.
      </EmpathyCallout>
      <StepList steps={[
        "Aprende frases básicas en serbio y familiarízate con el alfabeto cirílico",
        "Participa en eventos y actividades locales",
        "Consulta recursos oficiales sobre integración cultural",
        "Busca apoyo en centros de integración para inmigrantes"
      ]} />
      <p style={{marginTop:'2rem',fontSize:'0.95rem'}}>
        Fuente oficial: <a href="https://kirs.gov.rs" target="_blank" rel="noopener noreferrer">Comisariado para Refugiados e Inmigración</a>
      </p>
    </main>
  );
}
