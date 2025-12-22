// --- ROUTING LOGIC ---
const isViewer = window.location.pathname.includes('viewer.html');

document.addEventListener('DOMContentLoaded', () => {
    // Shared: Online Status
    updateOnlineStatus();
    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);

    if (isViewer) {
        initViewer(); // Viewer Logic
    } else {
        initHome(); // Home Logic
    }
});

// --- STATE-BASED ORIENTATION SYSTEM ---
const STATE_DEFINITIONS = {
    "just_arrived": {
        "id": "just_arrived",
        "label": "Recién llegado / Primera semana",
        "icon": "🛫",
        "description": "Estás aterrizando en Serbia y todo es nuevo.",
        "proposal_text": "Parece que acabas de llegar a Serbia hace poco. ¿Es correcto?",
        "initial_procedures": ["beli-karton-registration", "sim-card-tourist", "currency-exchange-banks", "public-transport-belgrade"]
    },
    "legal_clock": {
        "id": "legal_clock",
        "label": "Reloj Legal / Residencia",
        "icon": "⚖️",
        "description": "Tu estancia de turista tiene fecha de vencimiento.",
        "proposal_text": "Ya llevas más de una semana aquí. ¿Ya pensaste qué vía de residencia vas a tomar?",
        "initial_procedures": ["beli-karton-registration"]
    },
    "health_panic": {
        "id": "health_panic",
        "label": "Emergencia de salud",
        "icon": "🏥",
        "description": "Situaciones de pánico medical (fiebre, dolor agudo, accidentes).",
        "proposal_text": "¿Tienes una emergencia médica o alguien se siente mal ahora mismo?",
        "initial_procedures": ["medical-emergency-basic"]
    },
    "mobility_breakdown": {
        "id": "mobility_breakdown",
        "label": "Problemas de transporte",
        "icon": "🚌",
        "description": "Confusión con el transporte público o multas.",
        "proposal_text": "Parece que tienes dudas sobre cómo moverte por la ciudad. ¿Necesitas ayuda con el transporte?",
        "initial_procedures": ["public-transport-belgrade"]
    },
    "housing_conflict": {
        "id": "housing_conflict",
        "label": "Conflicto de vivienda",
        "icon": "🏠",
        "description": "Presión del casero, desalojo o problemas con depósito.",
        "proposal_text": "Parece que tienes algún inconveniente con tu alojamiento o casero. ¿Es correcto?",
        "initial_procedures": []
    },
    "admin_block": {
        "id": "admin_block",
        "label": "Bloqueo administrativo",
        "icon": "🚫",
        "description": "Un oficial dijo algo incomprensible o rechazó un formulario.",
        "proposal_text": "Parece que te has trabado en algún trámite oficial. ¿Te orientamos?",
        "initial_procedures": []
    },
    "work_survival": {
        "id": "work_survival",
        "label": "Trabajo / Dinero / Supervivencia",
        "icon": "💸",
        "description": "Necesitas ingresos pero no quieres arriesgar tu estancia.",
        "proposal_text": "¿Estás buscando trabajo o te han hecho una oferta que te genera dudas?",
        "initial_procedures": ["currency-exchange-banks"]
    }
};

const PREVENTIVE_ALERTS = {
    "just_arrived": [
        {
            "id": "pa_beli_24h",
            "text": "🚨 El 'Beli Karton' no es opcional: Si no estás en hotel, el dueño de tu alojamiento debe ir contigo a la policía en menos de 24h. Es tu única prueba de legalidad.",
            "icon": "📄"
        },
        {
            "id": "pa_roaming_warn",
            "text": "💰 Apaga tus datos YA: Serbia no es UE. El roaming aquí puede costar miles de pesos en minutos. Busca un chip local en cualquier kiosko 'Moj Kiosk'.",
            "icon": "📱"
        },
        {
            "id": "pa_currency_menjacnica",
            "text": "⚖️ No pierdas dinero en el cambio: El aeropuerto tiene tasas abusivas. Cambia lo justo y busca una 'Menjačnica' en la ciudad con comisión del 0%.",
            "icon": "💰"
        },
        {
            "id": "pa_transport_stress",
            "text": "🚌 Evita multas de entrada: En el bus no se paga al chofer. Envía el SMS al 9011 apenas subas; los inspectores suelen vestir de civil y son estrictos.",
            "icon": "🚍"
        },
        {
            "id": "pa_overconfidence",
            "text": "⚠️ Cuidado con el 'no pasa nada': Muchos conocidos te dirán que ellos no hicieron tal trámite y les fue bien. No te confíes; los problemas de residencia suelen aparecer meses después, cuando ya es difícil corregirlos.",
            "icon": "🛡️"
        }
    ],
    "legal_clock": [
        {
            "id": "pa_90_day_trap",
            "text": "📅 El visor de los 90 días: No esperes al día 85 para actuar. Muchos documentos de tu país tardan semanas en llegar y ser apostillados.",
            "icon": "⏳"
        },
        {
            "id": "pa_visa_run_mito",
            "text": "🏃 El mito del 'Visa Run': Salir y entrar puede servir un tiempo, pero no es una solución de vida. Busca el sello de 'Boravak' (residencia) para vivir sin miedo.",
            "icon": "🛡️"
        }
    ],
    "health_panic": [
        {
            "id": "pa_urgentni_debt",
            "text": "💸 Evita deudas sorpresa: No vayas al 'Urgentni Centar' por una gripe o dolor leve. Como extranjero, te cobrarán una tasa de entrada muy alta si no es una emergencia real.",
            "icon": "💰"
        },
        {
            "id": "pa_pharmacy_guard",
            "text": "🏥 Farmacias de guardia: Si es de noche, busca las farmacias con la cruz roja encendida. Ellas te pueden dar antifebriles sin pasar por el hospital.",
            "icon": "💊"
        }
    ],
    "work_survival": [
        {
            "id": "pa_work_no_papers",
            "text": "🚫 'Trabajar mientras salen los papeles' es un riesgo real. Si hay una inspección, la multa y la orden de salida son para TI, no solo para el jefe.",
            "icon": "⚖️"
        },
        {
            "id": "pa_salary_scam",
            "text": "💰 El salario 'en mano': Sin contrato, no hay garantía de cobro. Muchos inmigrantes pierden su primer mes de sueldo porque no tienen dónde reclamar.",
            "icon": "⚠️"
        }
    ]
};

// --- STATE MANAGEMENT FUNCTIONS ---

function showStateProposal(stateId) {
    const area = document.getElementById('state-proposal-area');
    const state = STATE_DEFINITIONS[stateId];
    if (!area || !state) return;

    area.innerHTML = `
        <div class="state-proposal-banner">
            <div class="state-proposal-content">
                <p>${state.proposal_text}</p>
                <div class="state-proposal-actions">
                    <button class="btn-state-confirm" onclick="handleStateConfirmation('${stateId}')">✅ Sí, eso es</button>
                    <button class="btn-state-reject" onclick="showStateSelection()">🔁 No exactamente / Otra cosa</button>
                </div>
            </div>
        </div>
    `;
}

function handleStateConfirmation(stateId) {
    const area = document.getElementById('state-proposal-area');
    if (area) area.innerHTML = ''; // Clear proposal

    localStorage.setItem('last_confirmed_state', stateId);
    localStorage.setItem('state_confirmed_at', Date.now());

    // Show specific guidance (Filtered cards)
    const state = STATE_DEFINITIONS[stateId];
    const filtered = allProcedures.filter(p => state.initial_procedures.includes(p.id));
    renderCards(filtered);

    // Show Preventive Alerts
    showPreventiveAlerts(stateId);

    // Show Safe Minimum Actions if configured
    if (['just_arrived', 'legal_clock', 'work_survival', 'health_panic'].includes(stateId)) {
        showSafeMinimumActions();
    }
}

async function showSafeMinimumActions() {
    const area = document.getElementById('state-proposal-area');
    if (!area) return;

    const stateId = localStorage.getItem('last_confirmed_state') || 'just_arrived';
    let checklistFile = 'just-arrived-checklist.json';

    if (stateId === 'legal_clock') checklistFile = 'legal-clock-checklist.json';
    else if (stateId === 'work_survival') checklistFile = 'work-survival-checklist.json';
    else if (stateId === 'health_panic') checklistFile = 'health-panic-checklist.json';

    try {
        const response = await fetch(`data/${checklistFile}`);
        const data = await response.json();

        let html = `
            <div class="section-card safe-actions-section" style="background: #f1f8e9; border-left: 6px solid var(--success-green);">
                <h4 style="color: #1b5e20;">🛡️ ${data.title}</h4>
                <p style="font-size: 0.9rem; color: #33691e; margin-bottom: 1rem;">${data.description || 'Haz esto antes de cualquier otra cosa:'}</p>
                <ul class="checklist" style="list-style: none; padding: 0;">
        `;

        data.steps.forEach(step => {
            html += `
                <li style="margin-bottom: 1rem; padding-left: 0;">
                    <strong style="display:block; color: #1b5e20;">${step.title} [${step.importance}]</strong>
                    <span style="font-size: 0.95rem; color: var(--text-main);">${step.action}</span>
                    <span style="display:block; font-size: 0.8rem; color: #558b2f; margin-top: 4px;">📅 Plazo: ${step.time_limit}</span>
                </li>
            `;
        });

        const closingTitle = data.closing_phrase?.title || "Lo más difícil ya lo hiciste, que fue llegar.";
        const closingText = data.closing_phrase?.text || "No te abrumes intentando entender todo hoy. Solo vamos a ordenar estos puntos uno por uno para que duermas tranquilo.";

        html += `
                </ul>
                <div style="margin-top: 1.5rem; border-top: 1px solid #c8e6c9; padding-top: 1rem;">
                    <p style="font-size: 1rem; color: #1b5e20; font-weight: 600; font-family: 'Outfit', sans-serif; margin-bottom: 0.5rem;">
                        ${closingTitle}
                    </p>
                    <p style="font-size: 0.9rem; color: #33691e; line-height: 1.4;">
                        ${closingText}
                    </p>
                </div>
            </div>
        `;
        area.innerHTML = html;
    } catch (e) {
        console.warn("Fallo al cargar checklist de acciones mínimas.", e);
    }
}

function showStateSelection() {
    const area = document.getElementById('state-proposal-area');
    if (!area) return;

    let html = `
        <section class="state-selection-section">
            <h3 style="text-align:center; margin-bottom: 1rem; color: var(--text-muted);">¿En qué situación te encuentras hoy?</h3>
            <div class="state-grid">
    `;

    Object.values(STATE_DEFINITIONS).forEach(state => {
        html += `
            <div class="state-tile" onclick="handleStateConfirmation('${state.id}')">
                <span class="state-tile-icon">${state.icon}</span>
                <span class="state-tile-label">${state.label}</span>
            </div>
        `;
    });

    html += `</div></section>`;
    area.innerHTML = html;
}

function showPreventiveAlerts(stateId) {
    const area = document.getElementById('alerts-area');
    if (!area) return;

    const alerts = PREVENTIVE_ALERTS[stateId] || [];
    const dismissed = JSON.parse(localStorage.getItem('dismissed_alerts') || '[]');

    const activeAlerts = alerts.filter(a => !dismissed.includes(a.id)).slice(0, 3);

    area.innerHTML = activeAlerts.map(alert => `
        <div class="alert-item" id="alert-${alert.id}">
            <span class="alert-icon">${alert.icon}</span>
            <p class="alert-text">${alert.text}</p>
            <button class="alert-dismiss" onclick="dismissAlert('${alert.id}')">✕</button>
        </div>
    `).join('');
}

window.dismissAlert = function (alertId) {
    const alertEl = document.getElementById(`alert-${alertId}`);
    if (alertEl) alertEl.remove();

    const dismissed = JSON.parse(localStorage.getItem('dismissed_alerts') || '[]');
    if (!dismissed.includes(alertId)) {
        dismissed.push(alertId);
        localStorage.setItem('dismissed_alerts', JSON.stringify(dismissed));
    }
};

window.handleStateConfirmation = handleStateConfirmation;
window.showStateSelection = showStateSelection;

const StateScanner = {
    scan: function () {
        const lastConfirmed = localStorage.getItem('last_confirmed_state');
        const confirmedAt = parseInt(localStorage.getItem('state_confirmed_at') || '0');
        const daysInState = (Date.now() - confirmedAt) / (1000 * 60 * 60 * 24);

        // Rule 0: Transition Logic
        // If they confirmed 'just_arrived' more than 7 days ago, offer transition
        if (lastConfirmed === 'just_arrived' && daysInState > 7) {
            return 'legal_clock'; // Propose next logical state
        }

        // Rule 1: First time user (no history) -> Just Arrived
        if (!localStorage.getItem('app_opened_before')) {
            localStorage.setItem('app_opened_before', 'true');
            return 'just_arrived';
        }

        // Rule 2: Night time + Health signals (Mental mock for now)
        // In a real app we'd trigger this on search or specific interactions.

        return null;
    }
};

// --- HOME LOGIC (index.html) ---
let allProcedures = [];



const FALLBACK_INDEX = [
    {
        "id": "beli-karton-registration",
        "title_es": "Registro de Residencia (Beli Karton)",
        "category": "legal",
        "icon": "📄",
        "keywords": ["residencia", "policía", "mup", "blanco", "registro"]
    },
    {
        "id": "sim-card-tourist",
        "title_es": "Tarjeta SIM Turística",
        "category": "servicios",
        "icon": "📱",
        "keywords": ["internet", "chip", "yettel", "mts", "a1", "teléfono"]
    },
    {
        "id": "public-transport-belgrade",
        "title_es": "Transporte Público (Beograd Plus)",
        "category": "servicios",
        "icon": "🚌",
        "description_es": "Cómo pagar bus y tranvía vía SMS o App.",
        "keywords": ["bus", "tranvía", "transporte", "sms", "beograd plus"]
    },
    {
        "id": "medical-emergency-basic",
        "title_es": "Emergencia Médica y Salud",
        "category": "salud",
        "icon": "🏥",
        "description_es": "Números de emergencia y centros de salud.",
        "keywords": ["médico", "hospital", "urgencias", "salud", "farmacia"]
    },
    {
        "id": "currency-exchange-banks",
        "title_es": "Cambio de Moneda y Bancos",
        "category": "finanzas",
        "icon": "💰",
        "description_es": "Dónde cambiar dinero y cómo abrir cuenta bancaria.",
        "keywords": ["dinero", "banco", "euros", "cambio", "menjacnica", "tarjeta"]
    }
];

async function initHome() {
    const resultsArea = document.getElementById('results-area');
    const searchInput = document.getElementById('search-input');

    if (!resultsArea || !searchInput) return;

    try {
        const response = await fetch('data/procedures.json');
        if (!response.ok) throw new Error('Error al cargar procedures.json');
        const data = await response.json();

        if (Array.isArray(data) && data.length > 0) {
            allProcedures = data;
        } else {
            throw new Error('El índice cargado está vacío');
        }
    } catch (error) {
        console.warn("Fallo carga de datos. Usando respaldo local.", error);
        allProcedures = FALLBACK_INDEX;
    }

    renderCards(allProcedures); // Renderizado inicial

    // Brain Transplant: State Logic
    const proposedStateId = StateScanner.scan();
    if (proposedStateId) {
        showStateProposal(proposedStateId);
    }


    // Configurar Filtros de Categoría
    const chips = document.querySelectorAll('.category-chip');
    chips.forEach(chip => {
        chip.addEventListener('click', () => {
            // UI Update
            chips.forEach(c => c.classList.remove('active'));
            chip.classList.add('active');

            const category = chip.getAttribute('data-category');
            if (category === 'all') {
                renderCards(allProcedures);
            } else {
                const filtered = allProcedures.filter(p => p.category === category);
                renderCards(filtered);
            }
            // Clear search when changing category for better UX
            if (searchInput) searchInput.value = '';
        });
    });

    // Configurar buscador
    searchInput.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase().trim();
        // Reset category chips when searching
        if (term) {
            chips.forEach(c => c.classList.remove('active'));
        } else {
            document.querySelector('[data-category="all"]').classList.add('active');
        }

        if (!term) {
            renderCards(allProcedures);
            return;
        }

        const filtered = allProcedures.filter(p =>
            p.title_es.toLowerCase().includes(term) ||
            p.keywords.some(k => k.toLowerCase().includes(term))
        );
        renderCards(filtered);
    });
}

function renderCards(list) {
    const area = document.getElementById('results-area');
    if (!area) return;

    area.innerHTML = '';

    if (!list || list.length === 0) {
        area.innerHTML = `
            <div style="grid-column: 1/-1; text-align:center; padding: 2rem; color: var(--text-muted);">
                <span style="font-size: 3rem; display:block; margin-bottom: 1rem;">🔍</span>
                <p>No encontramos resultados para tu búsqueda.</p>
                <button onclick="location.reload()" style="margin-top: 1rem; background: var(--primary-color); color: white; border:none; padding: 8px 16px; border-radius: 20px; cursor:pointer;">Reiniciar búsqueda</button>
            </div>
        `;
        return;
    }

    list.forEach(proc => {
        const card = document.createElement('a');
        card.className = 'card';
        card.href = `viewer.html?id=${proc.id}`;
        card.innerHTML = `
            <span class="card-icon">${proc.icon || '📄'}</span>
            <h3>${proc.title_es}</h3>
            <p>${proc.description_es || ''}</p>
        `;
        area.appendChild(card);
    });
}


// --- VIEWER LOGIC (viewer.html) ---
async function initViewer() {
    // 1. Get ID from URL
    const params = new URLSearchParams(window.location.search);
    const procId = params.get('id') || 'tramite_ejemplo';

    // 2. Load Specific JSON
    loadProcedureData(procId);

    // 3. Date Header
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const dateEl = document.getElementById('current-date');
    if (dateEl) dateEl.textContent = now.toLocaleDateString('es-ES', options).toUpperCase();
}

async function loadProcedureData(id) {
    try {
        const response = await fetch(`data/${id}.json`);

        if (!response.ok) {
            // Mapping for potential legacy links
            if (id === 'tramite_ejemplo') return loadProcedureData('beli-karton-registration');
            throw new Error(`Datos no encontrados para ${id}`);
        }

        const data = await response.json();
        renderDocument(data);
    } catch (error) {
        console.warn("Fallo carga Fetch (CORS/404). Usando Fallback Registry.", error);

        // Normalizar ID si viene de legacy
        let lookupId = id;
        if (id === 'tramite_ejemplo') lookupId = 'beli-karton-registration';

        const fallbackData = FALLBACK_REGISTRY[lookupId];

        if (fallbackData) {
            renderDocument(fallbackData);
        } else {
            document.getElementById('content-area').innerHTML = "<div style='text-align:center; padding:2rem;'><h3>❌ Error 404</h3><p>Trámite no encontrado en el sistema local.</p><p><small>ID: " + id + "</small></p></div>";
        }
    }
}

// Registro de datos de respaldo Actualizado al Schema V3
const FALLBACK_REGISTRY = {
    "beli-karton-registration": {
        "meta": { "id": "beli-karton-registration", "updated": "2024-05-20", "source": "http://www.mup.gov.rs" },
        "title": { "es": "Registro de Residencia (Beli Karton)", "sr": "Prijava Boravišta Stranca" },
        "who": "Para todo extranjero que llega a Serbia y NO se aloja en un hotel (ej. Airbnb, casa de amigos). Si estás en hotel, ellos lo hacen por ti.",
        "what": "Registrar tu dirección actual ante la policía local para obtener el certificado 'Bela Karta'. Es obligatorio hacerlo dentro de las primeras 24 horas de tu llegada.",
        "where": {
            "name": "Oficina de Policía para Extranjeros (MUP)",
            "note": "Busca la comisaría de tu municipio (ej. Stari Grad, Vračar).",
            "map_link": "https://www.google.com/maps/search/Police+Station+Serbia"
        },
        "how": [
            "Compra el formulario 'Prijava boravišta stranca' en un kiosco o librería 'Službeni Glasnik'.",
            "Ve a la policía con el dueño de la propiedad donde te alojas.",
            "Presenten sus documentos (Tu pasaporte y el ID del dueño + Título de propiedad).",
            "El oficial sellará el cartón blanco. ¡Guárdalo bien! Lo pedirán al salir del país."
        ],
        "documents": [
            { "name": "Pasaporte", "note": "Vigente" },
            { "name": "Dueño del lugar", "note": "Debe estar presente físicamente" },
            { "name": "ID del Dueño", "note": "Lična karta" },
            { "name": "Título de Propiedad", "note": "Dokaz o vlasništvu (del dueño)" }
        ],
        "phrases": [
            { "es": "Hola, necesito registrar mi residencia.", "sr": "Dobar dan, treba mi prijava boravišta." },
            { "es": "¿Dónde puedo comprar el formulario?", "sr": "Gde mogu da kupim obrazac?" },
            { "es": "Aquí está mi pasaporte y el dueño.", "sr": "Ovo je moj pasoš i vlasnik stana." }
        ],
        "tips": [
            "Ve temprano (8:00 AM) para evitar filas largas.",
            "Si el dueño no puede ir, necesitarás un poder notarial certificado, es más complicado.",
            "El trámite es gratuito en la policía."
        ]
    },
    "sim-card-tourist": {
        "meta": { "id": "sim-card-tourist", "updated": "2024-06-01", "source": "https://www.yettel.rs" },
        "title": { "es": "Tarjeta SIM Turística", "sr": "Turistička SIM Kartica" },
        "who": "Turistas o recién llegados que necesitan internet móvil inmediato y no tienen contrato post-pago.",
        "what": "Comprar un chip prepago con un paquete de datos para turistas (normalmente 10-20GB por 7-15 días).",
        "where": {
            "name": "Kioskos (Moj Kiosk) o Tiendas de Operadoras",
            "note": "Yettel, MTS, A1 tienen tiendas en el centro y centros comerciales.",
            "map_link": "https://www.google.com/maps/search/Yettel+MTS+A1+Store"
        },
        "how": [
            "Ubica un kiosco 'Moj Kiosk' o una tienda oficial de operadora.",
            "Pide una 'Tourist SIM' o 'Prepaid Internet SIM'.",
            "Entrega tu pasaporte para el registro obligatorio.",
            "Pide que te la activen ahí mismo antes de irte."
        ],
        "documents": [
            { "name": "Pasaporte", "note": "Obligatorio para el registro legal" },
            { "name": "Dinero en efectivo", "note": "~1000 RSD (Recomendado tener cambio)" }
        ],
        "phrases": [
            { "es": "Quiero una tarjeta SIM para internet.", "sr": "Želim SIM karticu za internet." },
            { "es": "¿Cuánto cuesta el paquete de turista?", "sr": "Koliko košta turistički paket?" },
            { "es": "¿Pueden activarla por mí?", "sr": "Možete li da je aktivirate za mene?" }
        ],
        "tips": [
            "El WiFi público en Serbia es común, pero una SIM propia es vital para Mapas y Taxi.",
            "Yettel suele tener la mejor cobertura en zonas rurales, MTS es la estatal.",
            "Guarda el marco de la tarjeta donde viene el PIN/PUK."
        ]
    },
    "public-transport-belgrade": {
        "meta": { "id": "public-transport-belgrade", "updated": "2024-12-20", "source": "https://beogradplus.rs" },
        "title": { "es": "Transporte Público (Beograd Plus)", "sr": "Javni Prevoz (Beograd Plus)" },
        "who": "Cualquier persona que necesite usar bus, tranvía o trolebús en Belgrado.",
        "what": "Pagar el ticket de transporte mediante SMS o la App oficial.",
        "where": {
            "name": "Red GSP Belgrado",
            "note": "Zonas A, B y C.",
            "map_link": "https://www.google.com/maps/search/Beograd+Plus+Ticket+Point"
        },
        "how": [
            "Identifica tu zona.",
            "Envía SMS al 9011 (ej. 'A90').",
            "Recibe confirmación y guárdala.",
            "O usa la App 'Beograd Plus'."
        ],
        "documents": [
            { "name": "Teléfono Móvil", "note": "Con crédito" },
            { "name": "SMS Confirmación", "note": "Tu ticket legal" }
        ],
        "phrases": [
            { "es": "¿Este bus va al centro?", "sr": "Da li ovaj autobus ide do centra?" },
            { "es": "Aquí tiene mi ticket.", "sr": "Evo moje karte." }
        ],
        "tips": [
            "Ticket 90 min = 50 RSD.",
            "Inspectores visten de civil."
        ]
    },
    "medical-emergency-basic": {
        "meta": { "id": "medical-emergency-basic", "updated": "2024-12-20", "source": "https://www.zdravlje.gov.rs" },
        "title": { "es": "Emergencia Médica y Salud", "sr": "Hitna Pomoć i Dom Zdravlja" },
        "who": "Inmigrantes con urgencias médicas o registro en salud.",
        "what": "Acceder a urgencias (194) o registrarse en el Dom Zdravlja.",
        "where": {
            "name": "Dom Zdravlja Municipal",
            "note": "El de tu municipio de residencia.",
            "map_link": "https://www.google.com/maps/search/Dom+Zdravlja"
        },
        "how": [
            "Llama al 194 para urgencias.",
            "Ve al Dom Zdravlja con tu Beli Karton.",
            "Presenta seguro médico y pasaporte.",
            "Paga en caja si no tienes seguro."
        ],
        "documents": [
            { "name": "Pasaporte", "note": "Obligatorio" },
            { "name": "Beli Karton", "note": "Prueba de residencia" }
        ],
        "phrases": [
            { "es": "Necesito un médico.", "sr": "Treba mi doktor." },
            { "es": "Me duele aquí.", "sr": "Boli me ovde." }
        ],
        "tips": [
            "Número emergencias: 194.",
            "Farmacias de guardia tienen luz roja."
        ]
    },
    "currency-exchange-banks": {
        "meta": { "id": "currency-exchange-banks", "updated": "2024-12-20", "source": "https://www.nbs.rs" },
        "title": { "es": "Cambio de Moneda y Bancos", "sr": "Menjačnica i Banke" },
        "who": "Inmigrantes que llegan con moneda extranjera (Euros, Dólares) o necesitan una cuenta bancaria local.",
        "what": "Cambiar divisa a Dinares Serbios (RSD) y abrir una cuenta de pago básica para extranjeros.",
        "where": {
            "name": "Menjačnica (Casas de Cambio) y Bancos oficiales",
            "note": "Las 'Menjačnica' son comunes. Bancos: Alta Banka, Mobi Banka.",
            "map_link": "https://www.google.com/maps/search/Menjacnica+Belgrade"
        },
        "how": [
            "Para cambiar dinero, busca una 'Menjačnica'. Revisa el tipo de cambio.",
            "Para abrir cuenta: Ve a un banco que acepte no-residentes (ej. Alta Banka).",
            "Solicita una 'Basic Payment Account'."
        ],
        "documents": [
            { "name": "Pasaporte", "note": "Original y vigente" },
            { "name": "Beli Karton", "note": "Indispensable" },
            { "name": "Teléfono Serbio", "note": "Para la App" }
        ],
        "phrases": [
            { "es": "¿A cuánto está el Euro hoy?", "sr": "Koliki je kurs evra danas?" },
            { "es": "Quiero cambiar cien euros.", "sr": "Želim da promenim sto evra." }
        ],
        "tips": [
            "Evita el aeropuerto para cambiar dinero.",
            "Mobi Banka tiene soporte en inglés."
        ]
    }
};

function renderDocument(data) {
    // 1. Header Info
    const titleEs = document.getElementById('proc-title-es');
    const titleSr = document.getElementById('proc-title-sr');
    const sourceUrl = document.getElementById('source-url');
    const sourceDomain = document.getElementById('source-domain');
    const lastVerified = document.getElementById('last-verified');

    if (titleEs) titleEs.textContent = data.title.es;
    if (titleSr) titleSr.textContent = data.title.sr;

    // Metadata footer
    if (sourceUrl) {
        sourceUrl.textContent = data.meta.source;
        sourceUrl.parentElement.href = data.meta.source; // Make link clickable
    }
    if (sourceDomain) {
        try { sourceDomain.textContent = new URL(data.meta.source).hostname; }
        catch (e) { sourceDomain.textContent = "Fuente Oficial"; }
    }
    if (lastVerified) lastVerified.textContent = data.meta.updated;

    // 2. Content Injection
    const contentArea = document.getElementById('content-area');
    if (!contentArea) return;

    let html = '';

    // NEW: Guardian Critical Section (MANDATORY Standard)
    if (data.guardian_critical) {
        html += `
        <div class="section-card guardian-critical-section">
            <h4 class="guardian-header">🛡️ CAPA DE PROTECCIÓN CONSEJOSEGURO</h4>
            <div class="warning-banner">
                <p><strong>⚠️ ${data.guardian_critical.warning}</strong></p>
            </div>
            
            <div class="risks-grid">
                ${data.guardian_critical.invisible_risks.map(r => `
                    <div class="risk-item">
                        <h5>🔴 Riesgo Invisible: ${r.risk}</h5>
                        <p>${r.prevention}</p>
                    </div>
                `).join('')}
            </div>

            <div class="myths-section">
                <h5>🚫 Mitos vs Realidad</h5>
                <ul>
                    ${data.guardian_critical.false_solutions.map(m => `<li>${m}</li>`).join('')}
                </ul>
            </div>
        </div>`;
    }

    // A. WHO & WHAT (Context Card)
    html += `
    <div class="section-card context-section">
        <div class="section-block">
            <h4>👤 ¿Para quién es?</h4>
            <p>${data.who}</p>
        </div>
        <div class="section-block">
            <h4>🎯 ¿Qué tengo que hacer?</h4>
            <p>${data.what}</p>
        </div>
    </div>`;

    // B. WHERE (Map Integration)
    html += `
    <div class="section-card where-section">
        <h4>📍 ¿Dónde ir?</h4>
        <p><strong>${data.where.name}</strong></p>
        <p>${data.where.note}</p>
        ${data.where.map_link ? `<a href="${data.where.map_link}" target="_blank" class="map-btn">Ver en Google Maps</a>` : ''}
    </div>`;

    // C. DOCUMENTS (Checklist)
    html += `
    <div class="section-card docs-section">
        <h4>📄 Documentos Necesarios</h4>
        <ul class="checklist">
            ${data.documents.map(d => `<li><strong>${d.name}</strong>: ${d.note}</li>`).join('')}
        </ul>
    </div>`;

    // D. HOW (Steps)
    html += `
    <div class="section-card steps-section">
        <h4>👣 Pasos a Seguir</h4>
        <ol class="steps-list">
            ${data.how.map(step => `<li>${step}</li>`).join('')}
        </ol>
    </div>`;

    // E. PHRASE GENERATOR (New Feature!)
    if (data.phrases && data.phrases.length > 0) {
        html += `
        <div class="section-card phrases-section">
            <h4>💬 Frases Útiles (Toca para ampliar)</h4>
            <div class="phrases-grid">
                ${data.phrases.map((p, index) => `
                    <div class="phrase-card" onclick="togglePhrase(this)">
                        <span class="phrase-es">${p.es}</span>
                        <span class="phrase-sr">${p.sr}</span>
                        <div class="phrase-overlay">
                            <p class="overlay-sr">${p.sr}</p>
                            <p class="overlay-hint">(Muestra esto)</p>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>`;
    }

    // F. TIPS
    if (data.tips && data.tips.length > 0) {
        html += `
        <div class="section-card tips-section">
            <h4>💡 Consejos Pro</h4>
            <ul>
                ${data.tips.map(t => `<li>${t}</li>`).join('')}
            </ul>
        </div>`;
    }

    contentArea.innerHTML = html;

    // 3. QR Code (Generate link to source for verification)
    const qrContainer = document.getElementById('qrcode');
    if (qrContainer && window.QRCode) {
        qrContainer.innerHTML = '';
        new QRCode(qrContainer, {
            text: data.meta.source,
            width: 128,
            height: 128
        });
    }
}

// Function helper for Phrase Card interaction
function togglePhrase(card) {
    card.classList.toggle('expanded');
}

function updateOnlineStatus() {
    const status = navigator.onLine ? 'online' : 'offline';

    if (status === 'offline') {
        let badge = document.getElementById('offline-badge');
        if (!badge) {
            badge = document.createElement('div');
            badge.id = 'offline-badge';
            badge.style.cssText = "background:#ff9800; color:black; text-align:center; padding:5px; font-weight:bold; position:fixed; top:0; width:100%; z-index:1000;";
            badge.textContent = "🔌 MODO OFFLINE: Usando datos guardados";
            document.body.prepend(badge);
            document.body.style.paddingTop = "40px";
        }
    } else {
        const badge = document.getElementById('offline-badge');
        if (badge) {
            badge.remove();
            document.body.style.paddingTop = "0";
        }
    }
}
