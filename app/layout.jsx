import "../styles/globals.css";
import NavBar from "../components/NavBar";
import ErrorBoundary from "../components/ErrorBoundary";
import Breadcrumbs from "../components/Breadcrumbs";

export const metadata = {
  title: "ConsejoSeguro",
  description: "Compañero práctico y empático para inmigrantes en Serbia."
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <ErrorBoundary>
          <NavBar />
          <Breadcrumbs />
          {children}
        </ErrorBoundary>
      </body>
    </html>
  );
}
