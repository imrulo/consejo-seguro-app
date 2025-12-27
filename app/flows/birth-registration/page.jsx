import { EmpathyCallout, StepList } from "../../../components/UIComponents";

export default function BirthRegistrationFlow() {
  return (
    <main>
      <h2>Registro de Nacimiento</h2>
      <EmpathyCallout>
        Registrar el nacimiento de tu hijo en Serbia es fundamental para acceder a derechos y servicios. Sigue estos pasos oficiales.
      </EmpathyCallout>
      <StepList steps={[
        "Solicita el certificado de nacimiento en la oficina de registro civil (Matičar)",
        "Presenta los documentos de identidad de los padres",
        "Aporta el certificado de matrimonio si corresponde",
        "Verifica la inscripción en el sistema de salud y educación"
      ]} />
      <p style={{marginTop:'2rem',fontSize:'0.95rem'}}>
        Fuente oficial: <a href="https://www.mup.gov.rs/wps/portal/sr/gradjani/rodjenje" target="_blank" rel="noopener noreferrer">MUP Serbia - Registro Civil</a>
      </p>
    </main>
  );
}
