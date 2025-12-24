# Explicación Técnica y Errores del NIP

## 1. Decisiones de Diseño

### 1.1 Por qué el NIP NO interpreta leyes
- **Riesgo:** La interpretación legal requiere juicio humano y contexto infinito. Una máquina puede fallar en matices que derivan en deportación.
- **Solución:** El NIP solo **clasifica** la intención del usuario y lo redirige a un flujo pre-diseñado por humanos (los documentos funcionales). No genera consejos, solo selecciona el "folleto" correcto.

### 1.2 Por qué el NIP NO almacena estado
- **Privacidad:** No queremos bases de datos centrales de inmigrantes vulnerables.
- **Complejidad:** El estado real del usuario ya vive en el `localStorage` (gestionado por Guardian) o en su cabeza.
- **Solución:** El NIP es una función pura: `Input -> (Lógica Determinista) -> Output`. Si le envías lo mismo 100 veces, responde lo mismo 100 veces.

### 1.3 Por qué el NIP NO aprende (No Machine Learning)
- **Seguridad:** Los modelos de ML alucinan. En un contexto legal, una alucinación (inventar un trámite) es inaceptable.
- **Predictibilidad:** Necesitamos saber EXACTAMENTE por qué recomendó "ir a urgencias". Con un modelo de caja negra, no podemos auditarlo.
- **Solución:** Keyword Matching y Regex ponderado. Es "tonto" pero 100% predecible.

### 1.4 Cómo evita falsos positivos
- **Umbral de Confianza:** Si `intent_confidence` no es "high", el sistema degrada a "mostrar menú general" en lugar de adivinar un flujo específico.
- **Guardian Check:** Siempre pregunta "¿Guardian tiene algo que decir?". Si Guardian tiene un bloqueo (`admin_block`), el NIP se calla.

### 1.5 Fail-Safe (Fallo Seguro)
- Si el input es ambiguo o el NIP falla -> Output por defecto: `urgency_level: 0`, `presentation_mode: normal`, `selected_flow_id: null` (Menú Principal).
- **Nunca** recomienda una acción crítica si no está seguro (confianza "high").

## 2. Errores Comunes que este Contrato Evita

1.  **"El Loop de la Muerte":** El NIP recomienda algo, Guardian lo bloquea, NIP insiste.
    - *Solución:* El NIP recibe `guardian_active_states` como input y respeta el bloqueo.
2.  **"Consejo Ilegal":** El NIP inventa un plazo de 15 días porque "se parece" a otro país.
    - *Solución:* NIP no inventa plazos. Solo activa el flujo `renewal_residency` que tiene los plazos hardcodeados y verificados.
3.  **"Falsa Urgencia":** Marcar todo como urgente para captar atención.
    - *Solución:* Escalas 0-10 estrictas basadas en días restantes reales.
4.  **"Silencio Mortal":** El usuario dice "me muero" y el NIP no entiende.
    - *Solución:* Keywords de salud (`health_emergency`) tienen override directo a urgencia 10.
