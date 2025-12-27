import { EmpathyCallout, StepList } from "../../../components/UIComponents";

export default function HealthPanicFlow() {
  return (
    <main>
      <h2>Emergencia de Salud</h2>
      <EmpathyCallout>
        En una emergencia médica, cada minuto cuenta. Mantén la calma y sigue estos pasos para recibir ayuda rápidamente.
      </EmpathyCallout>
      <StepList steps={[
        "Llama al 194 para ambulancia (servicio nacional)",
        "Describe tu ubicación y síntomas claramente",
        "Ten a mano tu pasaporte y seguro médico si lo tienes",
        "Acude al Dom Zdravlja más cercano para atención básica"
      ]} />
      <p style={{marginTop:'2rem',fontSize:'0.95rem'}}>
        Fuente oficial: <a href="https://www.mup.gov.rs/wps/portal/sr/gradjani/zdravlje/hitna-pomoc" target="_blank" rel="noopener noreferrer">MUP Serbia - Emergencias</a>
      </p>
    </main>
  );
}
