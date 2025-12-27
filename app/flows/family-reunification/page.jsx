import { EmpathyCallout, StepList } from "../../../components/UIComponents";

export default function FamilyReunificationFlow() {
  return (
    <main>
      <h2>Reagrupación Familiar</h2>
      <EmpathyCallout>
        Reunirte con tu familia en Serbia es posible si cumples los requisitos oficiales. Sigue estos pasos para facilitar el proceso.
      </EmpathyCallout>
      <StepList steps={[
        "Consulta los requisitos de reagrupación en el portal oficial",
        "Prepara documentos de parentesco y residencia",
        "Solicita cita en la oficina de inmigración",
        "Presenta la solicitud y espera la resolución oficial"
      ]} />
      <p style={{marginTop:'2rem',fontSize:'0.95rem'}}>
        Fuente oficial: <a href="https://kirs.gov.rs/lat/useljenje-porodice/" target="_blank" rel="noopener noreferrer">KIRS Serbia</a>
      </p>
    </main>
  );
}
