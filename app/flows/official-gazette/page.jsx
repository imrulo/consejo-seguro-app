import { EmpathyCallout, StepList } from "../../../components/UIComponents";

export default function OfficialGazetteFlow() {
  return (
    <main>
      <h2>Boletín Oficial (Službeni Glasnik)</h2>
      <EmpathyCallout>
        El Boletín Oficial es la fuente primaria de leyes y regulaciones en Serbia. Consulta siempre la versión vigente antes de cualquier trámite.
      </EmpathyCallout>
      <StepList steps={[
        "Accede al Boletín Oficial en línea",
        "Busca la ley o regulación relevante por fecha o número",
        "Verifica la vigencia y posibles modificaciones",
        "Guarda una copia digital para tus registros"
      ]} />
      <p style={{marginTop:'2rem',fontSize:'0.95rem'}}>
        Fuente oficial: <a href="https://www.pravno-informacioni-sistem.rs/SlGlasnikPortal/" target="_blank" rel="noopener noreferrer">Službeni Glasnik</a>
      </p>
    </main>
  );
}
