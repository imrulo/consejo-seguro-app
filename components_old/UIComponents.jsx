export function EmpathyCallout({ children }) {
  return <div style={{background:'#e6f7fa',borderLeft:'4px solid #1a4d6a',padding:'1rem',margin:'1rem 0',borderRadius:'6px'}}>{children}</div>;
}

export function StepList({ steps }) {
  return (
    <ol style={{paddingLeft:'1.2rem'}}>
      {steps.map((step, i) => <li key={i} style={{marginBottom:'0.5rem'}}>{step}</li>)}
    </ol>
  );
}
