import { EmpathyCallout, StepList } from "../../../components/UIComponents";

export default function LegalClockFlow() {
  return (
    <main>
      <h2>Reloj Legal: Plazos y Multas</h2>
      <EmpathyCallout>
        Los trámites legales en Serbia tienen plazos estrictos. Cumplirlos te ahorra multas y problemas futuros.
      </EmpathyCallout>
      <StepList steps={[
        "Verifica la fecha límite de tu trámite (residencia, registro, etc.)",
        "Presenta documentos antes de la fecha límite en la oficina correspondiente",
        "Guarda todos los comprobantes y recibos",
        "Consulta fuentes oficiales para cambios en la normativa"
      ]} />
      <p style={{marginTop:'2rem',fontSize:'0.95rem'}}>
        Fuente oficial: <a href="https://www.mup.gov.rs/wps/portal/sr/gradjani/boravak/privremeni-boravak" target="_blank" rel="noopener noreferrer">MUP Serbia</a>
      </p>
    </main>
  );
}
