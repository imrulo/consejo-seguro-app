// Botón flotante para abrir chat o app de IA
export default function ChatButton() {
  return (
    <a
      href="https://play.google.com/store/apps/details?id=com.consejoseguro.app"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chatea con IA, abre la app o descarga"
      className="fixed z-50 bottom-6 right-6 bg-[#003366] text-white font-bold flex items-center shadow-xl rounded-full px-5 py-3 md:px-6 md:py-4 text-base md:text-lg hover:bg-[#005a00] focus-visible:ring-2 focus-visible:ring-[#FFA500] transition-all drop-shadow-xl"
    >
      <svg width={28} height={28} viewBox="0 0 28 28" fill="none" aria-hidden="true"><circle cx="14" cy="14" r="14" fill="#FFA500"/><path d="M11 20c-.55 0-1-.45-1-1v-2c0-2.21 1.79-4 4-4h2c.55 0 1 .45 1 1v2c0 2.21-1.79 4-4 4h-2zm1-6c-1.1 0-2-.9-2-2V8c0-1.1.9-2 2-2h6c1.1 0 2 .9 2 2v4c0 1.1-.9 2-2 2h-6z" fill="#fff"/></svg>
      <span className="ml-2">Chat con IA</span>
    </a>
  );
}
