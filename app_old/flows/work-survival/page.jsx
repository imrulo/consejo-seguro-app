import { EmpathyCallout, StepList } from "../../../components/UIComponents";

export default function WorkSurvivalFlow() {
  return (
    <main>
      <h2>Supervivencia Laboral</h2>
      <EmpathyCallout>
        Trabajar en Serbia implica conocer tus derechos y deberes. Sigue estos pasos para evitar problemas laborales y legales.
      </EmpathyCallout>
      <StepList steps={[
        "Asegúrate de tener permiso de trabajo vigente",
        "Solicita siempre contrato por escrito",
        "Infórmate sobre salario mínimo y horarios legales",
        "Guarda copias de tus contratos y recibos de pago"
      ]} />
      <p style={{marginTop:'2rem',fontSize:'0.95rem'}}>
        Fuente oficial: <a href="https://www.nsz.gov.rs/live/english/home.1.html" target="_blank" rel="noopener noreferrer">NSZ Serbia</a>
      </p>
    </main>
  );
}
