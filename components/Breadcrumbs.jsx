import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Breadcrumbs() {
  const pathname = usePathname();
  const parts = pathname.split("/").filter(Boolean);
  let path = "";
  return (
    <nav aria-label="Breadcrumb" style={{fontSize:'0.95rem',margin:'1rem 0'}}>
      <Link href="/">Inicio</Link>
      {parts.map((part, i) => {
        path += "/" + part;
        return (
          <span key={i}>
            {" / "}
            <Link href={path}>{decodeURIComponent(part.replace(/-/g, ' '))}</Link>
          </span>
        );
      })}
    </nav>
  );
}
