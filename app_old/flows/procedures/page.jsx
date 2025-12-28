import { EmpathyCallout, StepList } from "../../../components/UIComponents";

export default function ProceduresFlow() {
  return (
    <main>
      <h2>Trámites y Procedimientos</h2>
      <EmpathyCallout>
        Realizar trámites en Serbia puede ser sencillo si sigues los pasos oficiales y preparas tus documentos con antelación.
      </EmpathyCallout>
      <StepList steps={[
        "Identifica el trámite que necesitas (residencia, registro, permiso de trabajo, etc.)",
        "Consulta los requisitos y documentos en el portal oficial correspondiente",
        "Solicita cita previa si es necesario",
        "Presenta tus documentos y paga las tasas en la oficina oficial"
      ]} />
      <p style={{marginTop:'2rem',fontSize:'0.95rem'}}>
        Fuente oficial: <a href="https://euprava.gov.rs" target="_blank" rel="noopener noreferrer">eUprava Serbia</a>
      </p>
    </main>
  );
}
