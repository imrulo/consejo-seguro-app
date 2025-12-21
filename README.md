# ConsejoSeguro.com 🛡️

**Tu Asistente de Inmigración Verificado**

ConsejoSeguro.com es una Plataforma Web Progresiva (PWA) diseñada para ayudar a inmigrantes y turistas a navegar los trámites legales y la vida cotidiana en Serbia (y pronto en otros destinos) con confianza y claridad.

## 🚀 Misión

Nuestra misión es simplificar la burocracia y proporcionar información precisa, actualizada y fácil de entender para que tu transición a un nuevo país sea lo más fluida posible.

## ✨ Características Principales

- **📱 Experiencia PWA**: Accede instantáneamente desde tu móvil como si fuera una app nativa, con soporte offline.
- **🗺️ Guías de Trámites**: Instrucciones paso a paso para el Registro de Residencia (Beli Karton), Tarjetas SIM, Transporte Público y más.
- **🔍 Búsqueda Inteligente**: Encuentra rápidamente la información que necesitas.
- **💎 Diseño Premium**: Interfaz moderna, limpia y amigable, optimizada para la legibilidad y la calma.
- **🌍 Multinacional**: Preparado para expandirse a múltiples trámites y regiones.

## 🛠️ Tecnologías

- **Frontend**: HTML5 Semántico, Vanilla CSS (con variables modernas y efectos de glassmorphism), JavaScript Moderno (ES6+).
- **Almacenamiento**: Datos estructurados en JSON.
- **PWA**: Service Workers para soporte offline y Manifest para instalación en el dispositivo.
- **Despliegue**: Optimizado para Vercel.

## 📁 Estructura del Proyecto

- `assets/`: Estilos CSS, lógica JavaScript e iconos.
- `data/`: Archivos JSON con la información de los trámites y guías.
- `index.html`: La puerta de entrada a la plataforma.
- `viewer.html`: Motor de visualización dinámico para las guías de trámites.
- `manifest.json` & `service-worker.js`: Núcleo de la tecnología PWA.

## 💻 Desarrollo Local

Para ejecutar el proyecto localmente, puedes usar cualquier servidor estático simple:

```bash
# Usando Python
python3 -m http.server 8000
```

Luego, abre `http://localhost:8000` en tu navegador.

## 🌐 Despliegue

El proyecto está listo para ser desplegado en **Vercel**. Simplemente conecta tu repositorio de GitHub y Vercel se encargará del resto utilizando la configuración predefinida en `vercel.json`.

---

*Desarrollado con ❤️ para la comunidad global.*
