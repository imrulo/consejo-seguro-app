# Decisión de Plataforma y Plan de Migración a Next.js

## Recomendación

Para cumplir con los requisitos de SSR, SEO, rendimiento y mantenibilidad, se recomienda migrar el proyecto a Next.js (app router).

## Pasos iniciales sugeridos

1. Crear un nuevo directorio `app/` y migrar rutas principales desde `client/src/`.
2. Configurar `next.config.js` y mover la configuración de Vercel para SSR.
3. Adaptar componentes a server/client components según corresponda.
4. Implementar `getStaticProps`/`getServerSideProps` para contenido dinámico.
5. Integrar optimización de imágenes y assets (`next/image`).
6. Eliminar duplicidad de código y consolidar dependencias.

## Notas
- Mantener la modularidad para futura conversión a React Native.
- Usar solo dependencias libres y optimizadas.
- Documentar cada paso de la migración en este archivo.
