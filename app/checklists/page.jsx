import { useEffect, useState } from "react";
import { EmpathyCallout, StepList } from "../../components/UIComponents";

export default function ChecklistsPage() {
  const [checklists, setChecklists] = useState([]);
  useEffect(() => {
    fetch("/api/checklists")
      .then(res => res.json())
      .then(setChecklists);
  }, []);

  return (
    <main>
      <h2>Checklists Oficiales</h2>
      {checklists.length === 0 && <p>Cargando...</p>}
      {checklists.map(list => (
        <section key={list.name} style={{marginBottom:'2rem'}}>
          <h3>{list.title || list.name}</h3>
          <EmpathyCallout>{list.intro || "Checklist oficial para inmigrantes en Serbia."}</EmpathyCallout>
          <StepList steps={list.steps || []} />
          {list.source && <p style={{fontSize:'0.95rem'}}>Fuente oficial: <a href={list.source} target="_blank" rel="noopener noreferrer">{list.source}</a></p>}
        </section>
      ))}
    </main>
  );
}
