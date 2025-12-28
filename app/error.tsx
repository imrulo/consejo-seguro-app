"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to an analytics service if available
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 text-center">
      <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-6">
        <AlertTriangle size={32} className="text-red-500" />
      </div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2 font-condensed">
        Algo salió mal
      </h2>
      <p className="text-gray-600 mb-8 max-w-xs mx-auto">
        No te preocupes, es solo un error técnico temporal. Tus datos en el dispositivo están seguros.
      </p>
      <button
        onClick={reset}
        className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl font-bold hover:bg-primary/90 transition-all active:scale-95 shadow-md"
      >
        <RefreshCw size={20} />
        Intentar de nuevo
      </button>
    </div>
  );
}
