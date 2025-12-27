import Link from "next/link";

export default function RelatedLinks({ links }) {
  if (!links || links.length === 0) return null;
  return (
    <aside style={{marginTop:'1.5rem',background:'#f3f6fa',padding:'1rem',borderRadius:'6px'}}>
      <strong>Enlaces relacionados:</strong>
      <ul style={{margin:'0.5rem 0 0 0',padding:'0 0 0 1.2rem'}}>
        {links.map(l => (
          <li key={l.href}><Link href={l.href}>{l.label}</Link></li>
        ))}
      </ul>
    </aside>
  );
}
