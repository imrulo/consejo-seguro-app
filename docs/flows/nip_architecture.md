# NIP - Núcleo de Inteligencia Práctica
## Arquitectura Técnica Completa

---

## 1. Posicionamiento en el Sistema

```
USUARIO (input imperfecto, emocional, urgente)
       ↓
┌──────────────────────────────────────┐
│  NIP - Núcleo de Inteligencia        │
│  (Interpretación + Priorización)     │
└──────────────────────────────────────┘
       ↓
┌──────────────────────────────────────┐
│  GUARDIAN STANDARD (Congelado)       │
│  (Protección + Gating + Alertas)     │
└──────────────────────────────────────┘
       ↓
┌──────────────────────────────────────┐
│  CONTENIDO DETERMINÍSTICO            │
│  (Procedimientos + Fuentes Oficiales)│
└──────────────────────────────────────┘
       ↓
SALIDA (acción clara, priorizada, humana)
```

### Relación con Guardian Standard

**Guardian Standard (Congelado)**
- ✅ Estados de vida (just_arrived, legal_clock, etc.)
- ✅ Alertas preventivas
- ✅ Gating logic
- ✅ SMAs (Safe Minimum Actions)
- ⛔ **NO se modifica**

**NIP (Nuevo)**
- 🆕 Interpreta input humano imperfecto
- 🆕 Detecta urgencia semántica
- 🆕 Prioriza acciones por contexto
- 🆕 Conecta dominios (salud → transporte → dinero)
- ✅ **Respeta** el Guardian existente
- ✅ **Complementa** sin duplicar

---

## 2. Arquitectura del NIP

### Pipeline de Procesamiento

```
INPUT USUARIO
    ↓
┌─────────────────────────────────────┐
│ FASE 1: INTERPRETACIÓN              │
│ (IA de clasificación)                │
│                                      │
│ - Normalizar idioma                  │
│ - Extraer intención                  │
│ - Identificar entidades              │
│   (edad, síntomas, tiempo)           │
└─────────────────────────────────────┘
    ↓
┌─────────────────────────────────────┐
│ FASE 2: CLASIFICACIÓN DE URGENCIA   │
│ (Reglas determinísticas)             │
│                                      │
│ - Semántica: síntomas críticos       │
│ - Temporal: ahora/hoy/noche          │
│ - Dependencias: edad, vulnerabilidad │
└─────────────────────────────────────┘
    ↓
┌─────────────────────────────────────┐
│ FASE 3: CONTEXTUALIZACIÓN LOCAL     │
│ (Base de conocimiento Serbia)        │
│                                      │
│ - Hospitales disponibles 24/7        │
│ - Transporte accesible               │
│ - Requisitos documentales            │
│ - Advertencias (clima, dinero)       │
└─────────────────────────────────────┘
    ↓
┌─────────────────────────────────────┐
│ FASE 4: GENERACIÓN DE RUTA          │
│ (Motor de priorización)              │
│                                      │
│ - Acción primaria (QUÉ hacer)        │
│ - Acción secundaria (preparación)    │
│ - Advertencias críticas              │
│ - Conexiones de dominios             │
└─────────────────────────────────────┘
    ↓
┌─────────────────────────────────────┐
│ GUARDIAN STANDARD (validación)       │
│                                      │
│ - Verifica alertas de estado         │
│ - Aplica gating si necesario         │
│ - Añade alertas preventivas          │
└─────────────────────────────────────┘
    ↓
OUTPUT: RUTA DE ACCIÓN PRIORIZADA
```

---

## 3. Módulo Piloto: SALUD - URGENCIA REAL

### 3.1 Definición de Urgencia (Clasificador)

```javascript
const HEALTH_URGENCY_CLASSIFIER = {
  // Nivel 0: CRÍTICO (Llamar 194 inmediatamente)
  CRITICAL: {
    keywords: [
      "no respira", "no responde", "inconsciente", 
      "convulsión", "sangrado abundante", "pecho dolor",
      "accidente grave", "envenenamiento", "golpe cabeza fuerte"
    ],
    age_multipliers: {
      "bebé": 1.5,  // Más crítico si es bebé
      "niño": 1.3,
      "anciano": 1.3
    },
    action: "EMERGENCY_194"
  },

  // Nivel 1: URGENTE (Urgencias hospital mismo día)
  URGENT: {
    keywords: [
      "fiebre alta", "40 grados", "39 grados",
      "vómito frecuente", "deshidratación", 
      "dolor intenso", "fractura", "herida profunda",
      "dificultad respirar", "tos severa"
    ],
    temporal_triggers: ["ahora", "esta noche", "no puede esperar"],
    age_critical: ["bebé", "menor de 2 años"],
    action: "URGENTNI_CENTAR"
  },

  // Nivel 2: ATENCIÓN (Farmacia o policlínica mañana)
  ATTENTION: {
    keywords: [
      "fiebre", "37-38 grados", "tos", "gripe",
      "dolor leve", "erupción", "malestar",
      "consulta general"
    ],
    temporal_triggers: ["mañana", "en días", "cuando pueda"],
    action: "PHARMACY_OR_DOM_ZDRAVLJA"
  },

  // Nivel 3: CONSULTA (Agendar cita normal)
  CONSULTATION: {
    keywords: [
      "chequeo", "control", "análisis",
      "vacuna", "certificado médico"
    ],
    action: "DOM_ZDRAVLJA_APPOINTMENT"
  }
};
```

### 3.2 Base de Conocimiento: Salud Serbia

```javascript
const SERBIA_HEALTH_CONTEXT = {
  emergency_services: {
    ambulance: {
      number: "194",
      available: "24/7",
      cost_foreign: "Servicio público, posible cargo posterior",
      when_to_call: [
        "Pérdida de conciencia",
        "Dificultad respiratoria severa",
        "Dolor de pecho",
        "Sangrado grave",
        "Convulsiones"
      ]
    },
    
    urgentni_centar: {
      belgrade: {
        name: "Urgentni Centar (Pasterova)",
        address: "Pasterova 2, Beograd",
        available: "24/7",
        transport: "Bus 26, 27, 28 desde Slavija",
        departments: [
          "Pedijatrija (niños)",
          "Interna (adultos)",
          "Hirurgija (cirugía)"
        ],
        cost_warning: "~3000-5000 RSD entrada + exámenes adicionales",
        bring: [
          "Pasaporte",
          "Dinero en efectivo (mínimo 5000 RSD)",
          "Seguro médico si tienes",
          "Historial médico previo si existe"
        ]
      },
      novi_sad: {
        name: "Klinički Centar Vojvodine",
        address: "Hajduk Veljkova 1-9",
        available: "24/7"
      }
    },
    
    pharmacy_24h: {
      belgrade_central: {
        name: "Apoteka Beograd (Dežurna)",
        locations: [
          "Vožda Karađorđa 129",
          "Kralja Milana 9"
        ],
        identifier: "Luz roja encendida = guardia",
        what_for: [
          "Fiebre leve-moderada (Brufen, Paracetamol)",
          "Tos (Jarabes sin receta)",
          "Dolor leve",
          "Primeros auxilios básicos"
        ],
        cost: "500-1500 RSD medicamento básico"
      }
    },
    
    dom_zdravlja: {
      what_is: "Centro de Salud Público (atención primaria)",
      when: "Consultas no urgentes, chequeos, vacunas",
      requirement: "Necesitas 'zdravstvenu knjižicu' (cartilla de salud)",
      how_to_get: "Registro en Dom Zdravlja de tu municipio",
      foreigners: "Sin residencia → difícil acceso, mejor privado",
      cost: "Gratis con knjižica, ~2000-3000 RSD consulta privada"
    }
  },

  transport_integration: {
    night_taxi: {
      apps: ["CarGo", "Yandex"],
      cost_estimate: "500-800 RSD a Urgencias desde centro",
      tip: "Pide factura ('račun') para seguro"
    },
    public_night: {
      available: "Limitado después de 23:00",
      alternatives: "Taxi es más seguro con niño enfermo"
    }
  },

  money_integration: {
    atm_24h: [
      "Aerodrom (Terminal 1 y 2)",
      "Trg Republike (centro)",
      "Slavija"
    ],
    cash_needed: "Mínimo 5000 RSD para urgencias"
  },

  language_help: {
    critical_phrases: {
      sr: "Hitno! Dete ne diše!",
      es: "¡Urgente! ¡El niño no respira!"
    },
    translation_apps: "Google Translate offline (descarga serbio antes)"
  }
};
```

### 3.3 Ejemplo Completo: "mi bebé tiene 40 de fiebre"

#### Input del Usuario
```
"mi bebé tiene 40 de fiebre"
```

#### FASE 1: Interpretación (IA)
```javascript
{
  normalized_input: "bebé fiebre 40 grados",
  intent: "health_emergency",
  entities: {
    subject: {
      type: "bebé",
      age_range: "0-2 años",
      vulnerability: "ALTA"
    },
    symptom: {
      type: "fiebre",
      severity: "40 grados",
      clinical_level: "ALTA"
    },
    temporal: {
      urgency: "implícita_inmediata", // No dijo "mañana"
      context: "ahora"
    }
  },
  language: "es",
  confidence: 0.95
}
```

#### FASE 2: Clasificación de Urgencia
```javascript
{
  urgency_level: "URGENT",
  reasoning: [
    "Fiebre 40° = síntoma crítico",
    "Bebé = multiplicador de urgencia 1.5x",
    "Sin temporal 'mañana' = implica ahora"
  ],
  classification: {
    medical_priority: "URGENTNI_CENTAR",
    time_window: "ESTA_NOCHE",
    department: "PEDIJATRIJA"
  },
  risks: [
    "Deshidratación infantil",
    "Convulsiones febriles posibles",
    "Requiere evaluación médica presencial"
  ]
}
```

#### FASE 3: Contextualización Local
```javascript
{
  location: "Belgrade", // Detectado de usuario o GPS
  available_now: {
    primary_option: {
      facility: "Urgentni Centar - Pedijatrija",
      address: "Pasterova 2",
      status: "ABIERTO_24/7",
      wait_time_estimate: "30-90 min",
      transport: {
        taxi: "CarGo/Yandex ~600 RSD",
        public: "LIMITADO (después 23:00)"
      }
    },
    alternative_if_mild: {
      facility: "Apoteka Beograd (Dežurna)",
      address: "Vožda Karađorđa 129",
      identifier: "Busca luz roja",
      when_ok: "Si fiebre baja a <38.5° con antifebril"
    }
  },
  requirements: {
    documents: ["Pasaporte del bebé", "Pasaporte padre/madre"],
    money: {
      estimate: "3000-5000 RSD entrada + exámenes",
      atm_nearby: "Slavija (camino al hospital)"
    },
    items_to_bring: [
      "Pañales",
      "Ropa de cambio",
      "Carnet de vacunas si tienes"
    ]
  },
  warnings: {
    weather: getCurrentWeather(), // Integración clima
    language: "Personal habla poco inglés, usa Google Translate",
    insurance: "Guarda todos los recibos para reclamar"
  }
}
```

#### FASE 4: Generación de Ruta Priorizada

```javascript
{
  action_route: {
    primary: {
      action: "IR_URGENCIAS_AHORA",
      title: "🚨 Acción Inmediata",
      steps: [
        {
          order: 1,
          what: "Llama taxi (CarGo/Yandex) o pide ayuda para llegar",
          why: "Transporte público limitado de noche",
          time: "Ahora mismo"
        },
        {
          order: 2,
          what: "Mientras esperas: dale antifebril SI TIENES (Paracetamol bebé)",
          why: "40° es peligroso, bajar temperatura ayuda",
          caution: "Solo si ya lo usaste antes con el bebé"
        },
        {
          order: 3,
          what: "Prepara mochila rápida",
          items: [
            "Pasaportes (tuyo + bebé)",
            "5000 RSD en efectivo mínimo",
            "Pañales + ropa cambio",
            "Carnet vacunas (si tienes)"
          ],
          time: "5 minutos máximo"
        }
      ]
    },
    
    destination: {
      name: "Urgentni Centar - Pedijatrija",
      address: "Pasterova 2, Beograd",
      map_link: "https://maps.google.com/?q=Urgentni+Centar+Beograd",
      department: "Pedijatrija (Entrada izquierda)",
      what_to_say: "Bebé con fiebre 40°"
    },
    
    on_arrival: {
      action: "REGISTRAR_ENTRADA",
      steps: [
        "Trijaža (clasificación): enfermera revisa",
        "Espera según urgencia (30-90 min)",
        "Pediatra examina al bebé",
        "Posibles exámenes (sangre, orina)",
        "Tratamiento o alta con receta"
      ],
      cost_breakdown: {
        entrada: "~3000 RSD",
        examenes: "~2000-4000 RSD adicionales",
        medicamentos: "Variable (comprar en apoteka después)"
      }
    },
    
    if_improves: {
      condition: "Si la fiebre baja a menos de 38.5° antes de salir",
      alternative: {
        action: "FARMACIA_GUARDIA",
        name: "Apoteka Beograd (luz roja)",
        what_buy: "Antifebril bebé (Paracetamol)",
        monitor: "Si vuelve a subir o empeora → Urgencias"
      }
    }
  },
  
  warnings: [
    {
      type: "FINANCIAL",
      icon: "💰",
      text: "Lleva 5000 RSD mínimo. Si no tienes, hay cajero en Slavija (camino)"
    },
    {
      type: "LANGUAGE",
      icon: "🗣️",
      text: "Personal habla poco inglés. Descarga Google Translate offline (serbio)"
    },
    {
      type: "INSURANCE",
      icon: "📄",
      text: "Guarda TODOS los recibos. Puedes reclamar a tu seguro después"
    },
    {
      type: "TRANSPORT",
      icon: "🚖",
      text: "Pide factura del taxi ('račun') para incluir en seguro"
    }
  ],
  
  guardian_alerts: [
    // Integración con Guardian Standard
    {
      from: "health_panic",
      text: "📞 Número emergencias: 194 (si empeora en camino)"
    }
  ],
  
  domain_connections: {
    transport: "night_taxi_apps",
    money: "atm_locations_24h",
    documents: "passport_requirements",
    language: "translation_offline"
  }
}
```

#### Output Visual al Usuario

```
🚨 URGENCIA DETECTADA: Bebé con fiebre alta

┌─────────────────────────────────────┐
│ ACCIÓN INMEDIATA                    │
└─────────────────────────────────────┘

1️⃣ AHORA (5 min)
   → Llama taxi: CarGo o Yandex
   → Dale antifebril SI TIENES (Paracetamol bebé)
   → Prepara: pasaportes + 5000 RSD + pañales

2️⃣ DESTINO
   📍 Urgentni Centar - Pedijatrija
   🏥 Pasterova 2, Beograd (entrada izquierda)
   🚖 Costo taxi: ~600 RSD desde centro
   [Ver en mapa]

3️⃣ AL LLEGAR
   → Trijaža (clasificación): 5-10 min
   → Espera: 30-90 min según urgencia
   → Pediatra examina + posibles análisis
   💰 Costo total estimado: 5000-8000 RSD

┌─────────────────────────────────────┐
│ ADVERTENCIAS IMPORTANTES            │
└─────────────────────────────────────┘

💰 Cajero 24h en Slavija (si necesitas efectivo)
🗣️ Personal habla poco inglés (usa Google Translate)
📄 GUARDA todos los recibos (para seguro)
🚖 Pide factura del taxi ('račun')

┌─────────────────────────────────────┐
│ SI LA FIEBRE BAJA ANTES DE SALIR    │
└─────────────────────────────────────┘

✓ Si baja a menos de 38.5°:
  → Puedes ir a Farmacia Guardia (luz roja)
  → Compra antifebril bebé
  → Monitorea cada hora
  
⚠️ Si vuelve a subir o empeora → Ve a Urgencias

┌─────────────────────────────────────┐
│ EMERGENCIA EXTREMA                  │
└─────────────────────────────────────┘

📞 194 (Ambulancia)
Si: no responde, convulsiona, no respira
```

---

## 4. Arquitectura de Datos Reutilizable

### 4.1 Estructura de Clasificador (Universal)

```javascript
const NIP_CLASSIFIER_TEMPLATE = {
  domain: "health|residency|work|family|money",
  
  urgency_levels: {
    CRITICAL: {
      triggers: [], // keywords, patterns
      multipliers: {}, // age, status, time
      action_type: "IMMEDIATE_EMERGENCY"
    },
    URGENT: {
      triggers: [],
      temporal_window: "hours",
      action_type: "SAME_DAY_REQUIRED"
    },
    ATTENTION: {
      triggers: [],
      temporal_window: "days",
      action_type: "SCHEDULED_SOON"
    },
    CONSULTATION: {
      triggers: [],
      temporal_window: "weeks",
      action_type: "PLAN_APPOINTMENT"
    }
  },
  
  entity_extraction: {
    subject: {}, // who (age, status, vulnerability)
    object: {},  // what (symptom, document, problem)
    temporal: {}, // when (now, tomorrow, deadline)
    location: {} // where (city, address)
  },
  
  context_map: {
    local_resources: [], // hospitales, oficinas, transporte
    requirements: [],    // documentos, dinero, idioma
    connections: []      // otros dominios afectados
  }
};
```

### 4.2 Ejemplo: Adaptación a RESIDENCIA

```javascript
const RESIDENCY_NIP = {
  domain: "residency",
  
  urgency_levels: {
    CRITICAL: {
      triggers: [
        "vence hoy", "me expulsaron", "policía me paró",
        "deportación", "ilegal", "menos de 3 días"
      ],
      action_type: "EMERGENCY_MUP_TODAY"
    },
    URGENT: {
      triggers: [
        "vence esta semana", "7 días", "10 días",
        "me rechazaron", "falta documento"
      ],
      temporal_window: "hours",
      action_type: "MUP_THIS_WEEK"
    },
    ATTENTION: {
      triggers: [
        "renovar", "próximo mes", "planificar",
        "reunir documentos"
      ],
      temporal_window: "weeks",
      action_type: "PREPARE_RENEWAL"
    }
  },
  
  entity_extraction: {
    subject: {
      residency_type: ["temporal", "permanente", "estudiante"],
      nationality: [],
      family_status: ["solo", "con familia", "casado"]
    },
    object: {
      document_type: ["boravak", "pasaporte", "certificado"],
      missing_items: [],
      reason: ["trabajo", "estudios", "familia"]
    },
    temporal: {
      deadline: null, // fecha exacta
      days_remaining: null
    }
  },
  
  context_map: {
    local_resources: [
      "MUP Savska 35 (Belgrado)",
      "eUprava portal",
      "Apostilla services"
    ],
    requirements: [
      "Pasaporte vigente 6 meses",
      "Certificado de alojamiento",
      "Comprobante económico"
    ],
    connections: ["housing", "work", "money", "transport"]
  }
};
```

---

## 5. Integración Técnica

### 5.1 Flujo en el Frontend

```javascript
// Nuevo componente: NIP Handler

async function handleUserQuery(inputText, userContext) {
  // 1. Interpretación (IA ligera o pattern matching)
  const interpretation = await interpretIntent(inputText, userContext);
  
  // 2. Clasificación (Reglas determinísticas)
  const classification = classifyUrgency(interpretation);
  
  // 3. Contextualización (Base de conocimiento local)
  const localContext = getLocalContext(
    classification.domain,
    userContext.location
  );
  
  // 4. Generación de ruta (Motor de priorización)
  const actionRoute = generateActionRoute(
    classification,
    localContext,
    userContext
  );
  
  // 5. Validación Guardian (Sin modificar Guardian)
  const guardianAlerts = checkGuardianAlerts(
    actionRoute,
    userContext.state
  );
  
  // 6. Output final
  return {
    route: actionRoute,
    guardian: guardianAlerts,
    metadata: {
      confidence: interpretation.confidence,
      domain: classification.domain,
      urgency: classification.level
    }
  };
}
```

### 5.2 Opción IA: Modelo Local Ligero

Para la Fase 1 (Interpretación):

```javascript
// Opción A: Pattern Matching Determinístico (sin IA)
function interpretIntent_Deterministic(text) {
  const patterns = HEALTH_PATTERNS; // Regex + keywords
  return matchPatterns(text, patterns);
}

// Opción B: Modelo IA Ligero Local (open-source)
// Ejemplo: DistilBERT o XLM-RoBERTa (multilingüe)
async function interpretIntent_AI(text) {
  const model = await loadLocalModel('distilbert-multilingual');
  const embedding = await model.encode(text);
  const classification = classifyEmbedding(embedding);
  return classification;
}

// Opción C: API Gratuita con Fallback
async function interpretIntent_Hybrid(text) {
  try {
    // Intenta API gratuita (ej: Hugging Face Inference)
    const result = await fetchHuggingFaceAPI(text);
    return result;
  } catch (error) {
    // Fallback a determinístico
    return interpretIntent_Deterministic(text);
  }
}
```

**Recomendación inicial**: Empezar con **Pattern Matching Determinístico** para salud (síntomas muy identificables) y evaluar IA solo si la precisión es insuficiente.

### 5.3 No Modificar Guardian Standard

```javascript
// CORRECTO: NIP llama a Guardian para consultar, no para modificar

function checkGuardianAlerts(actionRoute, userState) {
  const currentState = localStorage.getItem('last_confirmed_state');
  
  // Consultar alertas existentes (no crear nuevas)
  if (currentState === 'health_panic') {
    return PREVENTIVE_ALERTS['health_panic']; // Del Guardian
  }
  
  // Si el dominio del NIP no coincide con estado Guardian,
  // solo sugerir visitar el Guardian como paso adicional
  if (actionRoute.domain === 'health' && currentState !== 'health_panic') {
    return {
      suggestion: "Después de resolver esto, revisa tu estado general en Inicio",
      link: "index.html"
    };
  }
  
  return null; // No interferir
}
```

---

## 6. Roadmap de Implementación

### Fase 1: Piloto SALUD (MVP)
- ✅ Arquitectura NIP base
- ✅ Clasificador de urgencia salud
- ✅ Base de conocimiento Serbia (hospitales, farmacias)
- ✅ Generador de rutas priorizadas
- ✅ Integración no-invasiva con Guardian
- 🔧 Pattern matching determinístico (sin IA inicial)
- 🔧 UI: Input libre + botones de emergencia

### Fase 2: Expansión a RESIDENCIA
- Reutilizar estructura NIP
- Clasificador de urgencia residencia
- Base de conocimiento MUP/eUprava
- Conexión con módulo Residencia (ya diseñado)

### Fase 3: Otros Dominios
- TRABAJO: urgencias laborales, inspecciones
- FAMILIA: nacimientos, emergencias infantiles
- DINERO: crisis financieras, estafas

### Fase 4: Mejoras IA (Opcional)
- Modelo local multilingüe
- Mejora de interpretación de audio
- Detección de emociones (estrés, pánico)

---

## 7. Estructura de Archivos (Propuesta)

```
/consejo-seguro-proto/
├── nip/
│   ├── core/
│   │   ├── interpreter.js       # Fase 1: Interpretación
│   │   ├── classifier.js        # Fase 2: Clasificación
│   │   ├── contextualizer.js    # Fase 3: Contextualización
│   │   └── router.js            # Fase 4: Generador de rutas
│   │
│   ├── domains/
│   │   ├── health/
│   │   │   ├── urgency_rules.js
│   │   │   ├── serbia_health_kb.js
│   │   │   └── action_templates.js
│   │   │
│   │   ├── residency/
│   │   │   ├── urgency_rules.js
│   │   │   ├── serbia_mup_kb.js
│   │   │   └── action_templates.js
│   │   │
│   │   └── ...
│   │
│   └── integration/
│       ├── guardian_bridge.js   # Consulta Guardian sin modificar
│       └── output_formatter.js  # Formateo visual de rutas
│
├── data/
│   └── nip/
│       ├── health_facilities.json
│       ├── transport_options.json
│       └── emergency_contacts.json
│
└── assets/
    └── scripts.js (existente, no modificar lógica Guardian)
```

---

## 8. Criterios de Éxito

### Métricas de Calidad
1. **Precisión de Interpretación**: >85% intención correcta
2. **Relevancia de Ruta**: >90% acciones aplicables
3. **Tiempo de Respuesta**: <2 segundos (end-to-end)
4. **No-Intrusión Guardian**: 0 modificaciones al estado congelado

### Validación de Seguridad
- ❌ El NIP NO da diagnósticos médicos
- ❌ El NIP NO asume responsabilidad legal
- ✅ El NIP recomienda acción humana (ir a hospital, llamar 194)
- ✅ El NIP conecta con fuentes oficiales
- ✅ El NIP menciona limitaciones claramente

### Pruebas de Estrés
- Usuario en pánico (texto corto, emocional)
- Mezcla de idiomas (español/serbio/inglés)
- Input por voz mal transcrito
- Conexión lenta/offline (fallback a determinístico)

---

## 9. Disclaimer Legal (Obligatorio en UI)

```
⚠️ IMPORTANTE

ConsejoSeguro es una guía de orientación.
NO reemplaza atención médica ni legal profesional.

En emergencias médicas graves:
📞 Llama al 194 (Ambulancia)

En emergencias legales:
📞 Contacta a tu embajada

Toda información es referencial.
Verifica siempre con fuentes oficiales.
```

---

## 10. Próximos Pasos de Decisión

Antes de implementar, necesitamos decidir:

1. **¿IA o Determinístico?**
   - Opción A: Solo pattern matching (más simple, 100% control)
   - Opción B: Modelo local ligero (más flexible, requiere recursos)
   - Opción C: Híbrido (pattern matching + validación IA)

2. **¿Input de Usuario?**
   - Opción A: Campo de texto libre
   - Opción B: Botones guiados + texto opcional
   - Opción C: Audio (voz a texto + NIP)

3. **¿Integración con Guardian?**
   - Opción A: NIP como modal/overlay en index.html
   - Opción B: NIP como página separada (nip.html)
   - Opción C: NIP como widget flotante en todas las vistas

**Recomendación**: 
- Pattern Matching Determinístico inicial (más control, menos riesgo)
- Input mixto (texto libre + botones de emergencia rápidos)
- Modal overlay en index.html (no rompe navegación existente)

---

**El NIP está diseñado para complementar, no competir ni debilitar el Guardian Standard.**
