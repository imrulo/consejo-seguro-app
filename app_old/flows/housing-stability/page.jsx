import { EmpathyCallout, StepList } from "../../../components/UIComponents";

export default function HousingStabilityFlow() {
  return (
    <main>
      <h2>Estabilidad de Vivienda</h2>
      <EmpathyCallout>
        Encontrar y mantener una vivienda estable es clave para tu tranquilidad en Serbia. Sigue estos pasos para evitar problemas comunes.
      </EmpathyCallout>
      <StepList steps={[
        "Verifica que el contrato de alquiler esté registrado oficialmente",
        "Solicita siempre recibo de pago de renta",
        "Infórmate sobre tus derechos como inquilino en fuentes oficiales",
        "Guarda copias de todos los documentos y pagos"
      ]} />
      <p style={{marginTop:'2rem',fontSize:'0.95rem'}}>
        Fuente oficial: <a href="https://www.mup.gov.rs/wps/portal/sr/gradjani/boravak/prijava-boravka" target="_blank" rel="noopener noreferrer">MUP Serbia</a>
      </p>
    </main>
  );
}
