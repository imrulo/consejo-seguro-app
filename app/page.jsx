export default function Home() {
  return (
    <main>
      <h1>ConsejoSeguro</h1>
      <p>Tu compañero práctico y empático para la vida en Serbia.</p>
      <nav style={{margin:'1.5rem 0'}}>
        <button style={{marginRight:'1rem'}}>Inicio</button>
        <button style={{marginRight:'1rem'}}>Temas</button>
        <button>Buscar</button>
      </nav>
      <section className="card-grid">
        <div className="card">
          <h2>Registro policial</h2>
          <p>Obligatorio en 24h tras llegada. Evita multas y problemas legales.</p>
        </div>
        <div className="card">
          <h2>Residencia temporal</h2>
          <p>Requisitos y pasos para solicitar o renovar tu permiso de residencia.</p>
        </div>
        <div className="card">
          <h2>Permiso de trabajo</h2>
          <p>Documentación laboral y trámites para trabajar legalmente.</p>
        </div>
      </section>
      <section style={{marginTop:'2rem',width:'100%',maxWidth:'700px'}}>
        <h3>¿Tienes una pregunta específica?</h3>
        <input type="text" placeholder="Buscar respuesta..." style={{width:'100%',padding:'0.7rem',borderRadius:'6px',border:'1px solid #ccc'}} />
      </section>
    </main>
  );
}
