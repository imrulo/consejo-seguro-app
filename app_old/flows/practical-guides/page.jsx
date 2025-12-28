import { EmpathyCallout, StepList } from "../../../components/UIComponents";

export default function PracticalGuidesFlow() {
  return (
    <main>
      <h2>Guías Prácticas</h2>
      <EmpathyCallout>
        Las guías prácticas te ayudan a resolver situaciones cotidianas de forma eficiente y segura en Serbia.
      </EmpathyCallout>
      <StepList steps={[
        "Consulta las guías oficiales para cada trámite o situación",
        "Sigue los pasos recomendados y prepara tus documentos",
        "Verifica siempre la información en portales oficiales",
        "Guarda copias de tus gestiones y comprobantes"
      ]} />
      <p style={{marginTop:'2rem',fontSize:'0.95rem'}}>
        Fuente oficial: <a href="https://www.mup.gov.rs" target="_blank" rel="noopener noreferrer">MUP Serbia</a>
      </p>
    </main>
  );
}
