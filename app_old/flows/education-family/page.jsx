import { EmpathyCallout, StepList } from "../../../components/UIComponents";

export default function EducationFamilyFlow() {
  return (
    <main>
      <h2>Educación y Familia</h2>
      <EmpathyCallout>
        La integración familiar y el acceso a la educación son derechos fundamentales. Sigue estos pasos para facilitar el proceso en Serbia.
      </EmpathyCallout>
      <StepList steps={[
        "Consulta los requisitos de inscripción escolar en el portal oficial",
        "Prepara documentos traducidos y apostillados si es necesario",
        "Solicita cita en la escuela o institución educativa",
        "Infórmate sobre apoyos y servicios para familias inmigrantes"
      ]} />
      <p style={{marginTop:'2rem',fontSize:'0.95rem'}}>
        Fuente oficial: <a href="https://www.mpn.gov.rs" target="_blank" rel="noopener noreferrer">Ministerio de Educación Serbia</a>
      </p>
    </main>
  );
}
