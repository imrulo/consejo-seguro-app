export default function Home() {
  return (
    <main>
      <header style={{width:'100%',maxWidth:'700px',margin:'0 auto',padding:'1rem 0'}}>
        <h1 style={{fontSize:'2.2rem',marginBottom:'0.5rem'}}>ConsejoSeguro</h1>
        <p style={{fontSize:'1.2rem',color:'#1a4d6a'}}>Tu compañero práctico y empático para la vida en Serbia.</p>
      </header>
      <nav aria-label="Navegación principal" style={{width:'100%',maxWidth:'700px',margin:'0 auto',display:'flex',justifyContent:'center',gap:'1rem',marginBottom:'1.5rem',position:'sticky',top:'0',background:'#f7f9fa',zIndex:'10',padding:'0.5rem 0'}}>
        <a href="#inicio" className="nav-btn" aria-current="page">Inicio</a>
        <a href="#temas" className="nav-btn">Temas</a>
        <a href="#buscar" className="nav-btn">Buscar</a>
      </nav>
      <section id="temas" className="card-grid" aria-label="Temas principales">
        <a href="/registro-policial" className="card" tabIndex="0" aria-label="Ir a Registro policial">
          <h2>Registro policial</h2>
          <p>Obligatorio en 24h tras llegada. Evita multas y problemas legales.</p>
        </a>
        <a href="/residencia-temporal" className="card" tabIndex="0" aria-label="Ir a Residencia temporal">
          <h2>Residencia temporal</h2>
          <p>Requisitos y pasos para solicitar o renovar tu permiso de residencia.</p>
        </a>
        <a href="/permiso-trabajo" className="card" tabIndex="0" aria-label="Ir a Permiso de trabajo">
          <h2>Permiso de trabajo</h2>
          <p>Documentación laboral y trámites para trabajar legalmente.</p>
        </a>
      </section>
      <section id="buscar" style={{marginTop:'2rem',width:'100%',maxWidth:'700px'}} aria-label="Buscador de respuestas">
        <h3 style={{marginBottom:'0.5rem'}}>¿Tienes una pregunta específica?</h3>
        <input type="search" placeholder="Buscar respuesta..." style={{width:'100%',padding:'0.7rem',borderRadius:'6px',border:'1px solid #ccc'}} aria-label="Buscar respuesta" />
      </section>
      <footer style={{marginTop:'2rem',width:'100%',maxWidth:'700px',textAlign:'center',fontSize:'0.95rem',color:'#888'}}>
        <p>© 2025 ConsejoSeguro. Información oficial y actualizada para tu tranquilidad.</p>
      </footer>
    </main>
  );
}
