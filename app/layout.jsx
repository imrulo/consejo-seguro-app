import "../styles/globals.css";
import ErrorBoundary from "../components/ErrorBoundary";
import Footer from "./components/Footer";
import { I18nProvider } from "./components/I18nProvider";

export const metadata = {
  title: "ConsejoSeguro | Tu guía segura y empática en un nuevo hogar",
  description: "Información confiable y apoyo para inmigrantes y refugiados en Serbia."
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&family=Roboto+Condensed:wght@700&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-white text-neutral-800 antialiased dark:bg-neutral-900 dark:text-white font-sans transition-colors duration-300">
        <ErrorBoundary>
          <I18nProvider>
            <div className="min-h-screen flex flex-col">
              <header className="sr-only">ConsejoSeguro</header>
              <main className="flex-grow">{children}</main>
              <Footer />
            </div>
          </I18nProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
