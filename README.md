# ConsejoSeguro (Next.js)

ConsejoSeguro es un compañero digital gratuito, práctico y empático para inmigrantes en Serbia. Proporciona orientación oficial y consejos accionables para evitar multas, problemas legales y frustraciones cotidianas, siempre desde la perspectiva del usuario inmigrante.

## Características principales

- Diseño mobile-first, accesible y modular
- Todas las fuentes citadas son oficiales del gobierno serbio (.gov.rs, officialgazette.rs)
- Flujos funcionales y checklists para cada área de la vida
- Navegación intuitiva, breadcrumbs y enlaces relacionados
- SSR/SSG con Next.js (app router)
- Optimización para Lighthouse 90+

## Estructura

- `/app` - Páginas y rutas principales (Next.js app router)
- `/components` - Componentes reutilizables (UI, ErrorBoundary, etc.)
- `/styles` - Estilos globales
- `/public` - Assets estáticos, favicon, robots.txt, sitemap.xml
- `/data` - Checklists, flujos y fuentes oficiales (JSON)

## Instalación y desarrollo

```bash
npm install
npm run dev
```

## Accesibilidad y rendimiento

- Cumple con WCAG 2.1 AA
- Pruebas automáticas recomendadas con axe-core y Lighthouse CI

## Licencia

MIT

---

*Desarrollado con ❤️ para la comunidad global.*
