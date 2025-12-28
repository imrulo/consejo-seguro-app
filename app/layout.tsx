import type { Metadata, Viewport } from "next";
import { Roboto, Roboto_Condensed } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ServiceWorkerRegister from "@/components/ServiceWorkerRegister";
import { Analytics } from "@vercel/analytics/react";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-roboto",
});

const robotoCondensed = Roboto_Condensed({
  weight: ["300", "400", "700"],
  subsets: ["latin"],
  variable: "--font-roboto-condensed",
});

export const metadata: Metadata = {
  title: "ConsejoSeguro - Tu guía segura en Serbia",
  description: "Evita multas y problemas legales en Serbia. Información oficial verificada y apoyo empático para inmigrantes y refugiados. Funciona offline.",
  manifest: "/manifest.json",
  icons: {
    icon: "/icon-192.png",
    apple: "/icon-192.png",
  },
  openGraph: {
    title: "ConsejoSeguro - Ayuda Inmediata en Serbia",
    description: "Guía de supervivencia: Salud, Transporte, Papeles y Emergencias. Funciona sin internet.",
    url: "https://consejoseguro.com",
    siteName: "ConsejoSeguro",
    images: [
      {
        url: "/og-image.png", // Ensure this exists or fallback to icon
        width: 1200,
        height: 630,
        alt: "ConsejoSeguro Preview",
      },
    ],
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ConsejoSeguro - Ayuda Inmediata en Serbia",
    description: "Guía de supervivencia para inmigrantes: Salud, Transporte y Papeles. Funciona offline.",
    images: ["/og-image.png"], // Ensure this exists
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "ConsejoSeguro",
  },
};

export const viewport: Viewport = {
  themeColor: "#003366",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false, // Prevent zoom issues on inputs in iOS
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${roboto.variable} ${robotoCondensed.variable}`}>
      <body className="font-sans min-h-screen flex flex-col bg-gray-50 text-gray-900 overscroll-none">
        <ServiceWorkerRegister />
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
