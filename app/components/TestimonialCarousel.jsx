import { useState } from "react";

const TESTIMONIALS = [
  {
    name: "María P.",
    from: "Venezuela",
    text: "Llegamos con miedo, pero gracias a ConsejoSeguro conseguimos ayuda rápida y todas las guías claras. Sé que no estamos solos en Serbia.",
  },
  {
    name: "Ahmed R.",
    from: "Siria",
    text: "El apoyo humano fue clave. La información oficial y el chat me explicaron los trámites sin complicaciones. Ahora siento esperanza.",
  },
  {
    name: "Olga K.",
    from: "Rusia",
    text: "Pude registrar mi residencia y ubicar hospitales fácilmente. Todo fue más sencillo de lo que imaginaba. Gracias!",
  },
  {
    name: "Luis y familia",
    from: "Cuba",
    text: "Lo que más valoramos es la empatía. El formulario de situación nos dio respuesta personalizada y tranquilidad al llegar aquí.",
  },
  {
    name: "Farida S.",
    from: "Afganistán",
    text: "La plataforma está en español y pronto en otros idiomas. Animate, no tengas miedo de preguntar o usar el chat de ConsejoSeguro.",
  },
];

export default function TestimonialCarousel() {
  const [idx, setIdx] = useState(0);
  function next() { setIdx((idx + 1) % TESTIMONIALS.length); }
  function prev() { setIdx((idx - 1 + TESTIMONIALS.length) % TESTIMONIALS.length); }

  return (
    <div className="relative mx-auto max-w-lg border border-[#00800022] shadow-md rounded-xl px-6 py-8 bg-white dark:bg-neutral-800">
      <blockquote className="text-lg italic text-neutral-800 dark:text-neutral-200 mb-3">“{TESTIMONIALS[idx].text}”</blockquote>
      <div className="flex items-center gap-2 text-[#003366] dark:text-[#e0ffe0]">
        <span className="text-base font-condensed font-bold">{TESTIMONIALS[idx].name}</span>
        <span className="text-xs text-neutral-500">({TESTIMONIALS[idx].from})</span>
      </div>
      <div className="flex justify-center mt-4 gap-3">
        <button onClick={prev} aria-label="Ver testimonio anterior" className="rounded-full w-9 h-9 bg-neutral-100 dark:bg-neutral-700 text-[#008000] hover:bg-[#00800022] focus-visible:ring-2 focus-visible:ring-accent">‹</button>
        <button onClick={next} aria-label="Ver testimonio siguiente" className="rounded-full w-9 h-9 bg-neutral-100 dark:bg-neutral-700 text-[#008000] hover:bg-[#00800022] focus-visible:ring-2 focus-visible:ring-accent">›</button>
      </div>
      <div className="absolute bottom-3 right-5 flex gap-1">
        {TESTIMONIALS.map((_, i) => (
          <span key={i} className={`inline-block w-2 h-2 rounded-full ${i === idx ? 'bg-[#FFA500]' : 'bg-neutral-300 dark:bg-neutral-600'}`}></span>
        ))}
      </div>
    </div>
  );
}

