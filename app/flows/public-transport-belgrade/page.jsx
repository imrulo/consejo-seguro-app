import { EmpathyCallout, StepList } from "../../../components/UIComponents";

export default function PublicTransportBelgradeFlow() {
  return (
    <main>
      <h2>Transporte Público en Belgrado</h2>
      <EmpathyCallout>
        Moverse por Belgrado es sencillo si conoces las reglas y opciones del transporte público. Aquí tienes los pasos clave para evitar multas y aprovechar el sistema.
      </EmpathyCallout>
      <StepList steps={[
        "Compra tu tarjeta de transporte en puntos oficiales (Beograd Plus)",
        "Valida tu tarjeta al subir al autobús o tranvía",
        "Consulta horarios y rutas en la app oficial o en paradas principales",
        "Guarda tu ticket hasta el final del trayecto"
      ]} />
      <p style={{marginTop:'2rem',fontSize:'0.95rem'}}>
        Fuente oficial: <a href="https://www.beograd.rs/cms/view.php?id=201172" target="_blank" rel="noopener noreferrer">Ciudad de Belgrado</a>
      </p>
    </main>
  );
}
