import { EmpathyCallout, StepList } from "../../../components/UIComponents";

export default function EntryVisasFlow() {
  return (
    <main>
      <h2>Entrada y Visas</h2>
      <EmpathyCallout>
        Ingresar a Serbia legalmente es el primer paso para una estancia segura. Sigue estos pasos para cumplir con los requisitos de entrada y visado.
      </EmpathyCallout>
      <StepList steps={[
        "Verifica si tu país requiere visa para entrar a Serbia",
        "Consulta los requisitos y documentos en el portal oficial de la embajada",
        "Solicita la visa con antelación si es necesario",
        "Guarda copias de tu visa y documentos de entrada"
      ]} />
      <p style={{marginTop:'2rem',fontSize:'0.95rem'}}>
        Fuente oficial: <a href="https://www.mfa.gov.rs/en/citizens/travel-serbia/visa-regime-entry-serbia" target="_blank" rel="noopener noreferrer">Ministerio de Asuntos Exteriores Serbia</a>
      </p>
    </main>
  );
}
