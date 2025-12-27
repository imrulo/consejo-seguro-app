import { EmpathyCallout, StepList } from "../../../components/UIComponents";

export default function CurrencyExchangeBanksFlow() {
  return (
    <main>
      <h2>Cambio de Moneda y Bancos</h2>
      <EmpathyCallout>
        Cambiar dinero y abrir una cuenta bancaria en Serbia es sencillo si sigues estos pasos y evitas comisiones innecesarias.
      </EmpathyCallout>
      <StepList steps={[
        "Evita cambiar grandes sumas en el aeropuerto (tasas altas)",
        "Busca casas de cambio oficiales (Menjačnica) en la ciudad",
        "Solicita siempre recibo de cambio",
        "Para abrir cuenta, lleva pasaporte y comprobante de residencia a un banco autorizado"
      ]} />
      <p style={{marginTop:'2rem',fontSize:'0.95rem'}}>
        Fuente oficial: <a href="https://www.nbs.rs/sr_RS/finansijske-institucije/banke/spisak-banaka/index.html" target="_blank" rel="noopener noreferrer">Banco Nacional de Serbia</a>
      </p>
    </main>
  );
}
