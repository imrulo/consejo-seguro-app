import { EmpathyCallout, StepList } from "../../../components/UIComponents";

export default function SimCardTouristFlow() {
  return (
    <main>
      <h2>SIM Card para Turistas</h2>
      <EmpathyCallout>
        Mantente comunicado desde el primer día. Obtener una SIM card serbia es rápido y sencillo si sigues estos pasos.
      </EmpathyCallout>
      <StepList steps={[
        "Dirígete a una tienda oficial de operadoras (MTS, Telenor, A1)",
        "Lleva tu pasaporte para el registro",
        "Elige un plan prepago según tu estancia",
        "Activa la SIM y verifica la cobertura en tu zona"
      ]} />
      <p style={{marginTop:'2rem',fontSize:'0.95rem'}}>
        Fuente oficial: <a href="https://www.ratel.rs/lat/consumer/mobile_operators.67.html" target="_blank" rel="noopener noreferrer">RATEL Serbia</a>
      </p>
    </main>
  );
}
