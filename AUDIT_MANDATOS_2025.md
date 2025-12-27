# Mandatos y Principios de Auditoría UI/UX y Seguridad (2025)

## Contexto
Este documento resume los principios, reglas y lineamientos extraídos de la auditoría post-mortem y de los nuevos requerimientos para el desarrollo seguro y determinista de la UI en sistemas críticos.

---

## 1. Estados Canónicos (MANDATORIOS)
- SAFE / INFORMATIVE
- ATTENTION REQUIRED
- CRITICAL — ACT NOW
- BLOCKED

## 2. Reglas Absolutas de UI
- Si el motor indica CRITICAL:
  - Bloquear toda navegación
  - Ocultar menús, enlaces, breadcrumbs
  - Mostrar UNA sola acción
- Si el motor entrega un único resultado determinista:
  - Suprimir alternativas, enlaces y sugerencias
- Siempre mostrar:
  - Nivel de urgencia
  - Fuente autorizada
  - Timestamp de última actualización
- La UI debe forzar el flujo:
  - Sin saltos
  - Sin reordenamientos
  - Sin ramificaciones salvo explícito del motor

## 3. Principios de Seguridad y Determinismo
- La UI es solo VISOR y ENFORCER de la salida del motor.
- Ninguna acción incorrecta debe ser posible en estados ATTENTION o CRITICAL.
- Prohibido modificar lógica de motores, datos o contratos backend desde la UI.
- Prohibido introducir consejos alternativos, fallback o cambios de contenido.

## 4. Áreas de Riesgo Detectadas (Histórico)
- Falta de distinción visual/interactiva en pasos CRITICAL.
- Permitir saltos, ramificaciones o acciones no permitidas por el motor.
- Mostrar consejos sin fuente ni timestamp.
- Navegación y enlaces activos en estados de urgencia.

## 5. Plan de Implementación (Resumen)
- Identificar y bloquear todos los puntos de entrada y navegación en estados ATTENTION/CRITICAL.
- Implementar lógica de bloqueo en layout, rutas y componentes.
- Aplicar jerarquía visual estricta según urgencia.
- Documentar cualquier área donde la UI no pueda cumplir sin cambios backend.

---

## 6. Prohibiciones
- No modificar motores ni datos desde la UI.
- No mezclar lógica determinista y generativa en el flujo crítico.
- No permitir navegación ni acciones fuera de lo permitido por el motor.

---

Este documento debe ser consultado y respetado en cualquier reanudación o rediseño del proyecto.
