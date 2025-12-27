import { EmpathyCallout, StepList } from "../../components/UIComponents";

export default function ChecklistEjemplo() {
  return (
    <main>
      <h2>Checklist de Llegada</h2>
      <EmpathyCallout>
        Sabemos que llegar a Serbia puede ser abrumador. Aquí tienes los pasos esenciales para tus primeros días.
      </EmpathyCallout>
      <StepList steps={[
        "Registrar tu dirección en la comisaría local (MUP)",
        "Obtener una SIM card serbia",
        "Cambiar una pequeña cantidad de dinero a dinares (RSD)",
        "Buscar alojamiento temporal seguro",
        "Consultar fuentes oficiales para trámites"
      ]} />
    </main>
  );
}
