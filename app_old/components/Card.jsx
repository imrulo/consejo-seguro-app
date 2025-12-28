// Card accesible para beneficios o temas
export default function Card({ icon, title, children, ...props }) {
  return (
    <div
      className="bg-white dark:bg-neutral-800 rounded-xl shadow-md p-6 flex flex-col items-center text-center border border-neutral-100 dark:border-neutral-700 transition-all"
      tabIndex={0}
      aria-label={title}
      {...props}
    >
      <div className="mb-4" role="img" aria-label={title}>{icon}</div>
      <h3 className="font-condensed text-xl font-bold mb-2">{title}</h3>
      <div className="text-neutral-600 dark:text-neutral-300 text-base">{children}</div>
    </div>
  );
}

