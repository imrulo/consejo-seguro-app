# INFORME TÉCNICO-FUNCIONAL: ConsejoSeguro (App)

**Fecha del Informe:** 24 de Diciembre, 2025
**Estado:** V1.0 - Referencia para Arquitectura
**Objetivo:** Documentación neutral del estado actual del sistema.

---

## 1. VISIÓN GENERAL

### 1.1 Definición del Producto
**ConsejoSeguro** es una Aplicación Web Progresiva (PWA) diseñada como una "capa de inteligencia práctica" para inmigrantes hispanohablantes en Serbia. No es un gestor de trámites ni una consultoría legal, sino un sistema de orientación contextual que traduce la burocracia local a instrucciones humanas, seguras y accionables.

### 1.2 Usuario Objetivo
Inmigrantes hispanohablantes recién llegados o establecidos en Serbia que enfrentan barreras de idioma, desconocimiento del sistema legal y ansiedad burocrática.

### 1.3 Problema Principal
La desconexión entre la "regla escrita" (leyes complejas) y la "regla práctica" (qué hacer hoy), agravada por el riesgo de caer en irregularidad legal por desconocimiento o parálisis.

### 1.4 Contexto Geográfico/Legal
**Serbia**. El sistema opera exclusivamente bajo el marco legal de la República de Serbia (Ley de Extranjeros).

---

## 2. ARQUITECTURA ACTUAL

El sistema se divide en capas de madurez diferenciada:

### 2.1 Módulo: Guardian Standard (CONGELADO ❄️)
**Estado:** Implementado, Testeado y Congelado.
**Función:** Capa de protección base inmutable.
**Componentes:**
- Sistema de detección de estados (`StateScanner`).
- Interlocks de seguridad (Bloqueos administrativos, Reloj legal).
- Safe Minimum Actions (SMAs) obligatorios.
- **Regla de Inmutabilidad:** No se puede modificar sin protocolo de emergencia.

### 2.2 Módulo: NIP - Núcleo de Inteligencia Práctica (DISEÑO / PILOTO 🚧)
**Estado:** Arquitectura definida, Piloto de Salud diseñado.
**Función:** Capa de interpretación de lenguaje natural imperfecto.
**Componentes:**
- Interpretación de intención (Keyword/Pattern matching).
- Clasificador de Urgencia (Determinista).
- Contextualizador Local (Base de datos de entorno serbio).
- Generador de Rutas de Acción (COR - Contextual Output Router).

### 2.3 Módulo: Flujos Funcionales Específicos (DISEÑO FUNCIONAL ✅)
**Estado:** Documentados y listos para implementación.
**Función:** Guías paso a paso para dominios específicos.
**Dominios:** Residencia/Familia, Dinero, Nacimientos.

### 2.4 Módulo: Integridad de Fuentes (IMPLEMENTADO 🛡️)
**Estado:** Activo.
**Función:** Garantía de validez legal.
**Componentes:**
- Registro central (`official_sources.json`).
- Script de verificación automática (`verify-sources.js`).
- Protocolo de mantenimiento.

---

## 3. ESTADO FUNCIONAL POR MÓDULO

### 3.1 Guardian Standard (El "Cerebro Reptiliano")
- **Qué HACE:** Detecta riesgos existenciales (deportación, irregularidad, falta de techo). Bloquea la UI si detecta peligro inminente.
- **Qué NO HACE:** No gestiona trámites específicos ni da consejos "suaves".
- **Entradas:** Tiempo en el país, estado de documentos clave (Beli Karton), estabilidad de vivienda.
- **Salidas:** Estados forzados (`just_arrived`, `legal_clock`, `admin_block`, `housing_stability`).
- **Decisiones:** "El usuario está en peligro, debo intervenir".

### 3.2 NIP (El "Intérprete")
- **Qué HACE:** Traduce "tengo fiebre" a "ir a Urgencias (Pasterova 2)". Traduce "mi visa vence" a "ruta de renovación urgente".
- **Qué NO HACE:** No ejecuta acciones legales ni reserva citas.
- **Entradas:** Texto libre, voz (transcrita), selección de botones.
- **Salidas:** "Cards" de acción priorizada.
- **Decisiones:** Asignar nivel de urgencia (0-10) y seleccionar el flujo funcional correcto.

### 3.3 Flujos Funcionales (El "Libro de Instrucciones")
- **Qué HACE:** Guía paso a paso con dependencias lógicas (Si A → entonces B).
- **Qué NO HACE:** No juzga la situación legal global (eso lo hace Guardian).
- **Entradas:** Contexto específico (ej. "nació bebé").
- **Salidas:** Checklist interactivo, lista de documentos, direcciones.

---

## 4. LÓGICA DE URGENCIA Y SEGURIDAD

### 4.1 Mecanismo de Detección
El sistema utiliza un **Motor de Prioridad Contextual (MPC)** basado en reglas deterministas, no probabilísticas.

### 4.2 Estados del Sistema (Guardian)
1.  **Just Arrived:** < 7 días, sin Beli Karton. (Prioridad: Registro policial).
2.  **Legal Clock:** Cuenta regresiva de estancia legal (1-90 días o vigencia de visa).
3.  **Housing Stability:** Verificación de techo seguro.
4.  **Admin Block:** Parálisis por falta de documentos habilitantes.
5.  **Mobility:** (Estado latente/silencioso) Libertad de movimiento.

### 4.3 Sistema de Semáforo (Traffic Light Protocol)
Aplicado en flujos de renovación y documentos:
- 🔴 **CRÍTICO / ZONA ROJA:** < 7 días o riesgo vital (Salud). Acción: Ir físicamente YA.
- 🟡 **ALERTA / ZONA AMARILLA:** Próximo vencimiento o síntoma moderado. Acción: Preparar hoy, ejecutar mañana.
- 🟢 **ESTABLE / ZONA VERDE:** Tiempo suficiente. Acción: Planificación.

### 4.4 Interacción de Alertas
- **Guardian:** Puede interrumpir CUALQUIER flujo si detecta riesgo existencial (Override).
- **NIP:** Consulta el estado de Guardian antes de recomendar (ej. no recomienda "turismo" si estás en `legal_clock` crítico).

---

## 5. FLUJOS IMPLEMENTADOS (Catálogo)

Los siguientes flujos están completamente diseñados a nivel funcional (documentación en `docs/flows/`):

### 5.1 Nacimiento en Serbia (`birth_flow_functional.md`)
- **Alcance:** Desde hospital hasta residencia del bebé.
- **Criticidad:** Plazo estricto de 30 días.
- **Estado:** Diseño completo.

### 5.2 Renovación de Residencia (`renewal_flow_functional.md`)
- **Alcance:** Extensión de visado/residencia temporal.
- **Lógica:** Basada en días restantes (Semáforo).
- **Estado:** Diseño completo.

### 5.3 Familia - Trámites Comunes (`family_flow_functional.md`)
- **Alcance:** Matrimonio, Divorcio, Cambio de Nombre, Antecedentes.
- **Corrección reciente:** Ubicación correcta de policía de extranjeros (MUP Savska).
- **Estado:** Diseño completo y corregido.

### 5.4 Gestión Financiera (`money_flow_functional.md`)
- **Alcance:** Cuentas, cambio de moneda, transferencias.
- **Enfoque:** Evitación de fraudes y pérdidas por comisiones.
- **Estado:** Diseño completo.

### 5.5 Módulo Integrador (`residency_module_flow.md`)
- **Alcance:** Arquitectura que une los anteriores bajo el NIP.
- **Estado:** Diseño de arquitectura.

---

## 6. DECISIONES DE DISEÑO YA TOMADAS

### 6.1 Regla de Inmutabilidad del Guardian
El núcleo de seguridad (Guardian Standard) NO se toca para añadir "features". Si un nuevo módulo entra en conflicto con Guardian, el módulo debe adaptarse, no el Guardian.

### 6.2 Fuentes Oficiales Exclusivas
Se descartó el uso de "conocimiento general" o "foros".
- **Decisión:** Todo dato debe trazarse a `data/official_sources.json`.
- **Implementación:** Script de validación automatizado.

### 6.3 Enfoque No-Burocrático
El lenguaje debe ser "humano a humano", no "abogado a cliente".
- **Regla:** Se usan términos como "Papel blanco del hospital" junto al término técnico "Potvrda o rođenju".

### 6.4 Privacidad Local
- **Decisión:** Datos sensibles (días de estancia, dirección) se almacenan en `localStorage` del navegador. No hay base de datos central de usuarios.

---

## 7. LÍMITES DEL SISTEMA

### 7.1 Lo que la App NO hace (Out of Scope)
- **No es un abogado:** No redacta escritos legales ni apelaciones.
- **No es una agencia:** No busca piso ni trabajo para el usuario.
- **No es un traductor:** No traduce documentos oficiales (solo indica dónde hacerlo).

### 7.2 Riesgos Identificados
- **Cambios Legales:** La ley serbia puede cambiar. El protocolo de mantenimiento (`SOURCE_MAINTENANCE.md`) es la mitigación clave.
- **Casos de Borde:** Usuarios con estatus complejos (ej. apátridas, asilo político) no están cubiertos por los flujos estándar.

---

## 8. PUNTOS ABIERTOS (Para Arquitecto Entrante)

### 8.1 Implementación del NIP
- La arquitectura está definida (`nip_architecture.md`), pero falta codificar el motor de interpretación de lenguaje y la integración con el frontend.

### 8.2 UI de Flujos Complejos
- Los flujos (ej. Nacimiento) son árboles de decisión complejos. Se necesita definir si se usarán "wizads" (paso a paso), checklists expandibles o chatbots híbridos.

### 8.3 Digitalización de Flujos
- Los documentos funcionales (`.md`) deben traducirse a estructuras de datos (`.json`) operables por la app, similar a como funcionan los checklists actuales.

### 8.4 Pruebas de Usuario
- Los flujos diseñados son teóricamente correctos (basados en ley), pero no han sido validados ergonómicamente con usuarios reales en campo.
