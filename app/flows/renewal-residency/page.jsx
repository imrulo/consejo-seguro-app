import { EmpathyCallout, StepList } from "../../../components/UIComponents";

export default function RenewalResidencyFlow() {
  return (
    <main>
      <h2>Renovación de Residencia</h2>
      <EmpathyCallout>
        Renovar tu residencia puede ser estresante, pero siguiendo estos pasos evitarás multas y retrasos.
      </EmpathyCallout>
      <StepList steps={[
        "Reúne todos los documentos requeridos (pasaporte, contrato de alquiler, seguro de salud)",
        "Solicita cita en la comisaría de tu municipio (MUP)",
        "Presenta el formulario oficial y paga la tasa correspondiente",
        "Guarda el comprobante y verifica la fecha de recogida de tu nuevo permiso"
      ]} />
      <p style={{marginTop:'2rem',fontSize:'0.95rem'}}>
        Fuente oficial: <a href="https://www.mup.gov.rs/wps/portal/sr/gradjani/boravak/privremeni-boravak" target="_blank" rel="noopener noreferrer">MUP Serbia</a>
      </p>
    </main>
  );
}
