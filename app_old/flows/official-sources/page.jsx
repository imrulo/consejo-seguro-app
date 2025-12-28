import { EmpathyCallout, StepList } from "../../../components/UIComponents";

export default function OfficialSourcesFlow() {
  return (
    <main>
      <h2>Fuentes Oficiales</h2>
      <EmpathyCallout>
        Toda la información de ConsejoSeguro proviene exclusivamente de fuentes oficiales del gobierno serbio. Consulta siempre los portales oficiales para trámites y normativas.
      </EmpathyCallout>
      <StepList steps={[
        "Ministerio del Interior: https://www.mup.gov.rs",
        "Portal de inmigración: https://welcometoserbia.gov.rs/home",
        "Portal de trámites: https://euprava.gov.rs",
        "Banco Nacional de Serbia: https://www.nbs.rs"
      ]} />
      <p style={{marginTop:'2rem',fontSize:'0.95rem'}}>
        Consulta el listado completo en <a href="/data/official_sources.json" target="_blank" rel="noopener noreferrer">official_sources.json</a>
      </p>
    </main>
  );
}
