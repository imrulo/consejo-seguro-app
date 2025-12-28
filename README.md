# ConsejoSeguro - PWA

Plataforma progresiva web (PWA) diseñada para ayudar a inmigrantes y refugiados en Serbia, proporcionando información oficial verificada y apoyo empático.

## Características

- **PWA Instalable**: Funciona offline y se puede instalar en dispositivos móviles.
- **Diseño Empático**: UI/UX cálida, accesible (WCAG 2.2 AA) y profesional.
- **Tecnología Moderna**: Construido con Next.js 14, Tailwind CSS y TypeScript.
- **Multidioma**: Estructura lista para soporte de múltiples idiomas.

## Estructura del Proyecto

- `/app`: Rutas y layouts de Next.js (App Router).
- `/components`: Componentes reutilizables (Header, Footer, Cards, etc.).
- `/public`: Activos estáticos, manifest.json, service worker.
- `/assets`: Archivos originales (backup).

## Desarrollo Local

1. Instalar dependencias:
   ```bash
   npm install
   ```

2. Correr servidor de desarrollo:
   ```bash
   npm run dev
   ```

3. Abrir [http://localhost:3000](http://localhost:3000) en tu navegador.

## Deploy en Vercel

1. Sube este repositorio a GitHub/GitLab/Bitbucket.
2. Importa el proyecto en [Vercel](https://vercel.com).
3. Vercel detectará automáticamente que es un proyecto Next.js.
4. (Opcional) Configura variables de entorno si es necesario.
5. Haz clic en **Deploy**.

La aplicación incluye `@vercel/analytics` pre-configurado para monitorear el rendimiento real de los usuarios.

## Branding

- **Colores**:
  - Primario: `#003366` (Azul Marino - Confianza)
  - Secundario: `#008000` (Verde Esmeralda - Esperanza)
  - Acento: `#FFA500` (Naranja - Alertas)
- **Tipografía**: Roboto y Roboto Condensed.

## Accesibilidad

El sitio está diseñado siguiendo las pautas WCAG 2.2 AA, asegurando alto contraste, navegación por teclado y soporte para lectores de pantalla.
