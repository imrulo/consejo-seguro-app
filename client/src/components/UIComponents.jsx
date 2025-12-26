import React, { useState } from 'react';

// --- RESPONSIVE UTILITIES ---
const useResponsive = () => {
    const [windowWidth, setWindowWidth] = React.useState(typeof window !== 'undefined' ? window.innerWidth : 1024);
    
    React.useEffect(() => {
        if (typeof window === 'undefined') return;
        
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    
    return {
        isMobile: windowWidth < 768,
        isTablet: windowWidth >= 768 && windowWidth < 1024,
        isDesktop: windowWidth >= 1024,
        width: windowWidth
    };
};

// --- ENHANCED STYLES (Responsive & Accessible) ---
const getResponsiveStyles = (device) => ({
    screen: { 
        padding: device.isMobile ? '16px' : '24px', 
        maxWidth: '100%', 
        margin: '0 auto', 
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        lineHeight: '1.6'
    },
    crisis: { 
        background: 'linear-gradient(135deg, #dc2626 0%, #991b1b 100%)', 
        color: '#fff', 
        padding: device.isMobile ? '16px' : '20px', 
        borderRadius: '12px', 
        marginBottom: '24px', 
        fontWeight: '600',
        boxShadow: '0 4px 12px rgba(220, 38, 38, 0.3)',
        border: '1px solid rgba(255, 255, 255, 0.2)'
    },
    blocked: { 
        background: 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)', 
        color: '#374151', 
        padding: device.isMobile ? '32px 20px' : '48px 32px', 
        textAlign: 'center', 
        borderRadius: '16px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
        border: '1px solid #d1d5db'
    },
    step: { 
        borderLeft: '4px solid #3b82f6', 
        paddingLeft: device.isMobile ? '12px' : '20px', 
        marginBottom: '24px',
        background: 'rgba(59, 130, 246, 0.05)',
        borderRadius: '0 8px 8px 0',
        padding: device.isMobile ? '12px 12px 12px 16px' : '16px 20px 16px 24px'
    },
    stepTitle: { 
        fontSize: device.isMobile ? '1.1rem' : '1.3rem', 
        fontWeight: '700', 
        margin: '0 0 12px 0',
        color: '#1e40af'
    },
    item: { 
        marginBottom: '16px',
        padding: '8px 0',
        borderBottom: '1px solid rgba(0, 0, 0, 0.05)'
    }
});

// --- ENHANCED COMPONENTS ---

export const CrisisBanner = ({ urgency, action }) => {
    const device = useResponsive();
    const styles = getResponsiveStyles(device);
    
    return (
        <div style={styles.crisis} role="alert" aria-live="assertive">
            <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '12px',
                marginBottom: '8px'
            }}>
                <span style={{ fontSize: device.isMobile ? '1.5rem' : '2rem' }}>🚨</span>
                <span style={{ fontSize: device.isMobile ? '1rem' : '1.1rem', fontWeight: '700' }}>
                    CRISIS (Nivel {urgency}/10)
                </span>
            </div>
            <div style={{ 
                fontSize: device.isMobile ? '1.2rem' : '1.5rem', 
                marginTop: '12px',
                fontWeight: '600'
            }}>
                {action || "BUSCAR AYUDA INMEDIATA"}
            </div>
        </div>
    );
};

export const BlockedScreen = ({ reason, safeAction }) => {
    const device = useResponsive();
    const styles = getResponsiveStyles(device);
    
    return (
        <div style={styles.blocked} role="alert" aria-live="polite">
            <div style={{ fontSize: device.isMobile ? '2rem' : '3rem', marginBottom: '16px' }}>⛔</div>
            <h1 style={{ 
                fontSize: device.isMobile ? '1.5rem' : '2rem',
                marginBottom: '16px',
                color: '#dc2626'
            }}>
                Sistema Bloqueado
            </h1>
            <p style={{ 
                fontSize: device.isMobile ? '1rem' : '1.1rem',
                marginBottom: '24px'
            }}>
                <strong>Razón:</strong> {reason}
            </p>
            <hr style={{ 
                margin: '24px 0', 
                border: '0', 
                borderTop: '2px solid #d1d5db',
                borderRadius: '1px'
            }} />
            <p style={{ 
                fontSize: device.isMobile ? '1rem' : '1.1rem',
                fontWeight: '600',
                color: '#059669'
            }}>
                <strong>Acción Segura:</strong> {safeAction || "Contactar Soporte"}
            </p>
        </div>
    );
};

export const FlowRenderer = ({ steps, flowId, zone }) => {
    const device = useResponsive();
    const styles = getResponsiveStyles(device);
    
    return (
        <div style={{ marginBottom: '32px' }}>
            <div style={{ 
                marginBottom: '24px', 
                padding: device.isMobile ? '12px 16px' : '16px 20px', 
                background: zone === 'CRISIS' 
                    ? 'linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)' 
                    : 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
                borderLeft: `5px solid ${zone === 'CRISIS' ? '#dc2626' : '#16a34a'}`,
                borderRadius: '8px',
                fontSize: device.isMobile ? '0.85rem' : '0.9rem',
                color: '#374151',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
            }}>
                <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '8px',
                    marginBottom: '4px'
                }}>
                    <span style={{ fontSize: '1.2rem' }}>
                        {zone === 'CRISIS' ? '🚨' : '✅'}
                    </span>
                    <strong>Modo Activo:</strong> {flowId} ({zone})
                </div>
            </div>
            {steps && steps.map(step => (
                <div key={step.id} style={styles.step}>
                    <h3 style={styles.stepTitle}>{step.title}</h3>
                    {step.items && step.items.map(item => (
                        <div key={item.id} style={styles.item}>
                            <strong style={{ 
                                display: 'block', 
                                marginBottom: '6px', 
                                color: '#1f2937',
                                fontSize: device.isMobile ? '0.9rem' : '1rem'
                            }}>
                                {item.label}
                            </strong>
                            {item.description && (
                                <div style={{ 
                                    color: '#4b5563', 
                                    fontSize: device.isMobile ? '0.85rem' : '0.95rem',
                                    lineHeight: '1.6',
                                    marginBottom: '8px'
                                }}>
                                    {item.description}
                                </div>
                            )}
                            {item.warning && (
                                <div style={{ 
                                    color: '#dc2626', 
                                    fontSize: device.isMobile ? '0.8rem' : '0.9rem', 
                                    marginTop: '6px', 
                                    fontWeight: '600',
                                    padding: '8px 12px',
                                    background: '#fef2f2',
                                    borderRadius: '6px',
                                    border: '1px solid #fecaca'
                                }}>
                                    ⚠️ {item.warning}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export const ComprehensiveCategories = () => {
    const device = useResponsive();
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    
    const categories = [
        {
            id: 'entry-visas',
            title: 'Entrada y Visas',
            icon: '🛂',
            color: '#3b82f6',
            bgColor: 'rgba(59, 130, 246, 0.1)',
            borderColor: 'rgba(59, 130, 246, 0.2)',
            description: 'Tipos de visa, condiciones de entrada, exenciones',
            source: 'mfa.gov.rs',
            items: [
                {
                    title: 'Visa tipo C (corta estancia)',
                    description: 'Hasta 90 días en período de 180 días. Para turismo, negocios, visitas familiares.',
                    tips: 'Solicitar con 15 días de antelación mínimo. Seguro médico obligatorio €30,000.',
                    warning: 'No permite trabajo remunerado ni cambio a residencia.'
                },
                {
                    title: 'Visa tipo D (larga estancia)',
                    description: 'Más de 90 días. Permite solicitar residencia temporal.',
                    tips: 'Necesaria para trabajo, estudios, reunificación familiar. Válida 1 año máximo.',
                    warning: 'Debe solicitarse residencia temporal dentro de 30 días de llegada.'
                },
                {
                    title: 'Países sin visa',
                    description: 'Ciudadanos de UE, EEE, Suiza, algunos países de América y Asia.',
                    tips: 'Verificar lista actualizada en mfa.gov.rs antes de viajar.',
                    warning: 'Estancia máxima 90 días sin posibilidad de extensión como turista.'
                }
            ]
        },
        {
            id: 'residence-registration',
            title: 'Residencia y Registro',
            icon: '📋',
            color: '#059669',
            bgColor: 'rgba(5, 150, 105, 0.1)',
            borderColor: 'rgba(5, 150, 105, 0.2)',
            description: 'Permisos de residencia, registro policial, renovaciones',
            source: 'welcometoserbia.gov.rs, mup.gov.rs',
            items: [
                {
                    title: 'Registro policial (24 horas)',
                    description: 'OBLIGATORIO para todos los extranjeros dentro de 24h de llegada.',
                    tips: 'Solo en Savska 35, Belgrado para extranjeros. NO en comisarías locales.',
                    warning: 'Multa hasta 50,000 RSD por registro tardío. Deportación posible.'
                },
                {
                    title: 'Residencia temporal',
                    description: 'Permiso de 1 año renovable. Necesario para trabajo, estudios, familia.',
                    tips: 'Solicitar dentro de 30 días de llegada. Preparar apostilla de documentos.',
                    warning: 'Sin residencia válida = trabajo ilegal = multa y prohibición de entrada.'
                },
                {
                    title: 'Residencia permanente',
                    description: 'Después de 5 años de residencia temporal continua.',
                    tips: 'Permite trabajo sin permiso adicional. Facilita ciudadanía después.',
                    warning: 'Interrupciones de más de 10 meses anuales cancelan el proceso.'
                }
            ]
        },
        {
            id: 'work-employment',
            title: 'Trabajo y Empleo',
            icon: '💼',
            color: '#dc2626',
            bgColor: 'rgba(220, 38, 38, 0.1)',
            borderColor: 'rgba(220, 38, 38, 0.2)',
            description: 'Permisos laborales, salarios, derechos del trabajador',
            source: 'nsz.gov.rs, minrzs.gov.rs',
            items: [
                {
                    title: 'Permiso de trabajo',
                    description: 'Obligatorio para extranjeros. Solicita el empleador, no el trabajador.',
                    tips: 'Proceso 30-60 días. Empleador debe justificar por qué no contratar serbio.',
                    warning: 'Trabajar sin permiso = multa empleador 300,000-1,500,000 RSD + deportación trabajador.'
                },
                {
                    title: 'Salario neto vs bruto',
                    description: 'Salario bruto incluye impuestos y contribuciones (≈36% del bruto).',
                    tips: 'Salario mínimo 2024: ≈47,000 RSD neto. Siempre negociar salario neto.',
                    warning: 'Empleadores pueden ofrecer "bruto" para parecer más atractivo.'
                },
                {
                    title: 'Derechos laborales',
                    description: 'Vacaciones pagadas (20 días mínimo), baja por enfermedad, seguro médico.',
                    tips: 'Contrato debe estar en serbio y tu idioma. Guardar copia siempre.',
                    warning: 'Trabajo "en negro" = sin protección legal ni seguro médico.'
                }
            ]
        },
        {
            id: 'housing-daily',
            title: 'Vivienda y Vida Diaria',
            icon: '🏠',
            color: '#7c3aed',
            bgColor: 'rgba(124, 58, 237, 0.1)',
            borderColor: 'rgba(124, 58, 237, 0.2)',
            description: 'Alquiler, servicios, consejos prácticos del día a día',
            source: 'Regulaciones municipales, Ministerio de Agricultura',
            items: [
                {
                    title: 'Contratos de alquiler',
                    description: 'Depósito típico 1-2 meses. Contrato debe registrarse para residencia.',
                    tips: 'Exigir recibo de depósito. Fotografiar estado inicial del apartamento.',
                    warning: 'Sin contrato registrado = no puedes obtener residencia temporal.'
                },
                {
                    title: 'Control de plagas (ratas, cucarachas)',
                    description: 'Problema común en edificios antiguos, especialmente invierno.',
                    tips: 'EVITA pet shops (regulaciones protección animal). Ve a tiendas agrícolas para "control de plagas" profesional.',
                    warning: 'Venenos caseros pueden ser ilegales. Usa servicios profesionales certificados.'
                },
                {
                    title: 'Servicios públicos',
                    description: 'Electricidad (EPS), gas (Srbijagas), agua (municipal), internet.',
                    tips: 'Facturas llegan por correo. Pagar en bancos o pošta. Apps: mBanking.',
                    warning: 'Cortes por impago son rápidos. Reconexión cuesta extra.'
                },
                {
                    title: 'Reciclaje y residuos',
                    description: 'Separación obligatoria: orgánico, papel, plástico, vidrio.',
                    tips: 'Contenedores por colores en edificios. Multas por mezclar residuos.',
                    warning: 'Tirar muebles en calle = multa. Usar "buvlja pijaca" o servicios municipales.'
                }
            ]
        },
        {
            id: 'health-insurance',
            title: 'Salud y Seguro Médico',
            icon: '🏥',
            color: '#ea580c',
            bgColor: 'rgba(234, 88, 12, 0.1)',
            borderColor: 'rgba(234, 88, 12, 0.2)',
            description: 'Sistema de salud, emergencias, seguros',
            source: 'rfzo.rs, Urgentni centar',
            items: [
                {
                    title: 'Emergencias médicas',
                    description: 'Número 194 (ambulancia). Urgentni centar Pasterova 2 (24/7).',
                    tips: 'Llevar pasaporte y dinero (3,000-8,000 RSD por consulta extranjero).',
                    warning: 'Sin seguro = pago completo. Emergencias graves pueden costar 50,000+ RSD.'
                },
                {
                    title: 'Seguro médico obligatorio',
                    description: 'Con residencia temporal y trabajo = seguro automático vía empleador.',
                    tips: 'Tarjeta zdravstvena knjižica en RFZO. Cubre consultas básicas y emergencias.',
                    warning: 'Sin trabajo = sin seguro público. Necesario seguro privado.'
                },
                {
                    title: 'Farmacias y medicamentos',
                    description: 'Apoteka (farmacias) abundantes. Muchos medicamentos sin receta.',
                    tips: 'Medicamentos genéricos más baratos. Farmacias de guardia 24h rotativas.',
                    warning: 'Medicamentos con receta extranjera pueden no ser válidos.'
                },
                {
                    title: 'Salud mental y estrés migratorio',
                    description: 'Adaptación cultural puede causar ansiedad, depresión.',
                    tips: 'Centros de salud mental públicos disponibles. Psicólogos privados hablan inglés.',
                    warning: 'No ignorar síntomas. Aislamiento social empeora problemas de adaptación.'
                }
            ]
        },
        {
            id: 'education-family',
            title: 'Educación y Familia',
            icon: '👨‍👩‍👧‍👦',
            color: '#0891b2',
            bgColor: 'rgba(8, 145, 178, 0.1)',
            borderColor: 'rgba(8, 145, 178, 0.2)',
            description: 'Escuelas, reunificación familiar, cuidado infantil',
            source: 'Ministerio de Educación, minrzs.gov.rs',
            items: [
                {
                    title: 'Inscripción escolar para niños',
                    description: 'Educación primaria (7-15 años) obligatoria y gratuita para residentes.',
                    tips: 'Inscribir en escuela del distrito de residencia. Clases de serbio como segundo idioma disponibles.',
                    warning: 'Sin residencia temporal = matrícula como extranjero (más cara).'
                },
                {
                    title: 'Reunificación familiar',
                    description: 'Cónyuge e hijos menores pueden obtener residencia por reagrupación.',
                    tips: 'Demostrar ingresos suficientes y vivienda adecuada. Proceso 3-6 meses.',
                    warning: 'Documentos deben estar apostillados y traducidos oficialmente.'
                },
                {
                    title: 'Guarderías y cuidado infantil',
                    description: 'Vrtić (guarderías) públicas y privadas. Lista de espera común.',
                    tips: 'Inscribir temprano (enero-febrero para septiembre). Privadas más caras pero disponibles.',
                    warning: 'Guarderías públicas priorizan residentes permanentes y ciudadanos.'
                },
                {
                    title: 'Aprendizaje del idioma serbio',
                    description: 'Cursos gratuitos para inmigrantes en centros culturales y universidades.',
                    tips: 'Universidad de Belgrado ofrece cursos intensivos. Apps: Duolingo tiene serbio.',
                    warning: 'Cirílico es oficial. Aprender ambos alfabetos (latino y cirílico) es ventajoso.'
                }
            ]
        },
        {
            id: 'mobility-transport',
            title: 'Movilidad y Transporte',
            icon: '🚌',
            color: '#9333ea',
            bgColor: 'rgba(147, 51, 234, 0.1)',
            borderColor: 'rgba(147, 51, 234, 0.2)',
            description: 'Transporte público, licencias de conducir, apps útiles',
            source: 'welcometoserbia.gov.rs, GSP Beograd',
            items: [
                {
                    title: 'Transporte público Belgrado',
                    description: 'Bus, tranvía, trolebús. Pago por SMS, app BusPlus, o tarjeta.',
                    tips: 'SMS: enviar "+" al 9011 (120 RSD por 90 min). App BusPlus más conveniente.',
                    warning: 'SIEMPRE validar billete. Multa 5,000 RSD por no validar.'
                },
                {
                    title: 'Licencia de conducir extranjera',
                    description: 'Válida 6 meses desde entrada. Después necesario canje o examen serbio.',
                    tips: 'Canje posible con licencias UE. Otras nacionalidades = examen completo.',
                    warning: 'Conducir con licencia vencida = multa grave + posible retención vehículo.'
                },
                {
                    title: 'Taxi y ride-sharing',
                    description: 'Taxi oficial (taxímetro obligatorio), CarGo, Bolt disponibles.',
                    tips: 'Usar apps para evitar estafas. Precio fijo desde/hacia aeropuerto.',
                    warning: 'Taxis "piratas" sin taxímetro = estafa común. Exigir recibo.'
                },
                {
                    title: 'Viajes intercity y internacionales',
                    description: 'Autobuses (BAS), trenes (Železnice Srbije), vuelos (Aerodrom Nikola Tesla).',
                    tips: 'Reservar online más barato. Descuentos estudiantes y tercera edad.',
                    warning: 'Verificar documentos necesarios para países vecinos (algunos requieren visa).'
                }
            ]
        },
        {
            id: 'finances-banking',
            title: 'Finanzas y Banca',
            icon: '💰',
            color: '#059669',
            bgColor: 'rgba(5, 150, 105, 0.1)',
            borderColor: 'rgba(5, 150, 105, 0.2)',
            description: 'Cuentas bancarias, cambio de moneda, impuestos',
            source: 'nbs.rs, ubs-asb.com',
            items: [
                {
                    title: 'Apertura de cuenta bancaria',
                    description: 'Necesario: pasaporte, prueba de residencia, ingresos.',
                    tips: 'Bancos amigables con extranjeros: Raiffeisen, UniCredit, Intesa. Servicios en inglés.',
                    warning: 'Sin residencia temporal = cuenta limitada o rechazo en algunos bancos.'
                },
                {
                    title: 'Cambio de moneda',
                    description: 'Euro y USD aceptados. Cambio en bancos o casas de cambio (menjačnica).',
                    tips: 'Menjačnicas tienen mejor tasa que bancos. Evitar cambio en calle.',
                    warning: 'Billetes dañados o muy antiguos pueden ser rechazados.'
                },
                {
                    title: 'Impuestos para extranjeros',
                    description: 'Residentes fiscales (>183 días/año) pagan impuestos sobre ingresos globales.',
                    tips: 'Empleador retiene impuestos automáticamente. Freelancers deben declarar.',
                    warning: 'No declarar ingresos = multas graves + problemas para renovar residencia.'
                },
                {
                    title: 'Transferencias internacionales',
                    description: 'SWIFT, Western Union, Wise, Remitly disponibles.',
                    tips: 'Wise y Remitly más baratos que bancos tradicionales. Comparar tasas.',
                    warning: 'Transferencias >15,000 EUR requieren justificación ante banco central.'
                }
            ]
        },
        {
            id: 'culture-integration',
            title: 'Cultura e Integración',
            icon: '🎭',
            color: '#dc2626',
            bgColor: 'rgba(220, 38, 38, 0.1)',
            borderColor: 'rgba(220, 38, 38, 0.2)',
            description: 'Normas culturales, eventos, comunidades de expatriados',
            source: 'kirs.gov.rs, centros culturales',
            items: [
                {
                    title: 'Normas sociales básicas',
                    description: 'Saludo con apretón de manos. Quitarse zapatos en casas. Propinas 10%.',
                    tips: 'Aprender "Zdravo" (hola), "Hvala" (gracias), "Izvinjavam se" (disculpe).',
                    warning: 'Evitar temas políticos sensibles (Kosovo, guerras de los 90) con desconocidos.'
                },
                {
                    title: 'Festividades y días festivos',
                    description: 'Navidad ortodoxa (7 enero), Pascua ortodoxa (fecha variable), Slava (santo patrón familiar).',
                    tips: 'Tiendas cerradas en días festivos ortodoxos. Planificar compras con antelación.',
                    warning: 'Fechas diferentes a calendario occidental. Verificar calendario ortodoxo.'
                },
                {
                    title: 'Comunidades de expatriados',
                    description: 'Grupos de Facebook, meetups, eventos culturales en centros extranjeros.',
                    tips: 'Belgrade Expats, Digital Nomads Serbia, grupos por nacionalidad activos.',
                    warning: 'Evitar depender solo de comunidad expatriada. Integración local importante.'
                },
                {
                    title: 'Gastronomía y compras',
                    description: 'Mercados (pijaca) para productos frescos. Supermercados: Maxi, Idea, Roda.',
                    tips: 'Productos étnicos en Dorćol y Zemun. Mercados más baratos que supermercados.',
                    warning: 'Algunos productos importados muy caros. Adaptar dieta a productos locales.'
                }
            ]
        },
        {
            id: 'legal-procedures',
            title: 'Legal y Trámites',
            icon: '⚖️',
            color: '#1f2937',
            bgColor: 'rgba(31, 41, 55, 0.1)',
            borderColor: 'rgba(31, 41, 55, 0.2)',
            description: 'Derechos, apelaciones, evitar multas comunes',
            source: 'mup.gov.rs, mpravde.gov.rs',
            items: [
                {
                    title: 'Derechos de los extranjeros',
                    description: 'Igualdad ante la ley, derecho a intérprete, asistencia consular.',
                    tips: 'Contactar embajada si problemas graves. Derecho a abogado en procesos penales.',
                    warning: 'Policía puede pedir documentos en cualquier momento. Llevar siempre pasaporte.'
                },
                {
                    title: 'Multas comunes y cómo evitarlas',
                    description: 'Registro tardío, trabajo sin permiso, transporte sin validar, estacionamiento.',
                    tips: 'Pagar multas rápido = descuento 50%. Apelaciones posibles dentro de 15 días.',
                    warning: 'Multas impagadas = problemas para renovar residencia o salir del país.'
                },
                {
                    title: 'Apostilla y traducción de documentos',
                    description: 'Documentos extranjeros necesitan apostilla + traducción oficial.',
                    tips: 'Traductores certificados en Colegio de Traductores. Lista en mpravde.gov.rs.',
                    warning: 'Traducciones no oficiales = rechazo automático en trámites.'
                },
                {
                    title: 'Asistencia legal gratuita',
                    description: 'Disponible para personas de bajos ingresos en casos civiles y penales.',
                    tips: 'Solicitar en Colegio de Abogados. ONGs ofrecen ayuda a inmigrantes.',
                    warning: 'Asistencia limitada. Casos complejos requieren abogado privado.'
                }
            ]
        }
    ];

    const filteredCategories = categories.filter(cat => 
        cat.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cat.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cat.items.some(item => 
            item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.description.toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    return (
        <section aria-label="Guía completa para inmigrantes en Serbia" style={{ marginBottom: '32px' }}>
            {/* Search Bar */}
            <div style={{ marginBottom: '24px' }}>
                <div style={{
                    position: 'relative',
                    maxWidth: '400px',
                    margin: '0 auto'
                }}>
                    <input
                        type="text"
                        placeholder="Buscar información..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '12px 16px 12px 40px',
                            fontSize: '16px',
                            border: '2px solid #e5e7eb',
                            borderRadius: '12px',
                            outline: 'none',
                            transition: 'border-color 0.2s',
                            fontFamily: 'inherit'
                        }}
                        onFocus={e => e.target.style.borderColor = '#3b82f6'}
                        onBlur={e => e.target.style.borderColor = '#e5e7eb'}
                    />
                    <span style={{
                        position: 'absolute',
                        left: '12px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        fontSize: '1.2rem',
                        color: '#9ca3af'
                    }}>
                        🔍
                    </span>
                </div>
            </div>

            {/* Categories Grid */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: device.isMobile ? '1fr' : 
                                   device.isTablet ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
                gap: device.isMobile ? '16px' : '20px'
            }}>
                {filteredCategories.map(category => (
                    <CategoryCard 
                        key={category.id}
                        category={category}
                        isSelected={selectedCategory === category.id}
                        onClick={() => setSelectedCategory(selectedCategory === category.id ? null : category.id)}
                        device={device}
                    />
                ))}
            </div>

            {/* Selected Category Details */}
            {selectedCategory && (
                <CategoryDetails 
                    category={categories.find(cat => cat.id === selectedCategory)}
                    onClose={() => setSelectedCategory(null)}
                    device={device}
                />
            )}
        </section>
    );
};

const CategoryCard = ({ category, isSelected, onClick, device }) => (
    <div
        style={{
            padding: device.isMobile ? '16px' : '20px',
            background: isSelected ? category.bgColor : 'rgba(255, 255, 255, 0.8)',
            borderRadius: '16px',
            border: `2px solid ${isSelected ? category.borderColor : 'rgba(0, 0, 0, 0.1)'}`,
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            backdropFilter: 'blur(10px)',
            position: 'relative',
            overflow: 'hidden'
        }}
        onClick={onClick}
        onMouseEnter={e => {
            if (!isSelected) {
                e.target.style.transform = 'translateY(-4px)';
                e.target.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
            }
        }}
        onMouseLeave={e => {
            if (!isSelected) {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'none';
            }
        }}
        role="button"
        tabIndex={0}
        aria-expanded={isSelected}
        aria-label={`${category.title}: ${category.description}`}
    >
        <div style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '12px',
            marginBottom: '12px'
        }}>
            <div style={{
                fontSize: device.isMobile ? '1.8rem' : '2rem',
                filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))'
            }}>
                {category.icon}
            </div>
            <div style={{ flex: 1 }}>
                <h3 style={{
                    fontSize: device.isMobile ? '1rem' : '1.1rem',
                    fontWeight: '700',
                    color: category.color,
                    margin: '0 0 6px 0',
                    lineHeight: '1.3'
                }}>
                    {category.title}
                </h3>
                <p style={{
                    fontSize: device.isMobile ? '0.8rem' : '0.85rem',
                    color: '#6b7280',
                    margin: '0',
                    lineHeight: '1.4'
                }}>
                    {category.description}
                </p>
            </div>
        </div>
        
        <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '0.75rem',
            color: '#9ca3af'
        }}>
            <span>Fuente: {category.source}</span>
            <span style={{
                transform: isSelected ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.3s ease'
            }}>
                ▼
            </span>
        </div>
        
        {/* Decorative element */}
        <div style={{
            position: 'absolute',
            top: '-30px',
            right: '-30px',
            width: '80px',
            height: '80px',
            background: `radial-gradient(circle, ${category.borderColor} 0%, transparent 70%)`,
            borderRadius: '50%',
            pointerEvents: 'none',
            opacity: isSelected ? 1 : 0.5
        }} />
    </div>
);

const CategoryDetails = ({ category, onClose, device }) => (
    <div style={{
        marginTop: '24px',
        padding: device.isMobile ? '20px' : '24px',
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.95) 100%)',
        borderRadius: '20px',
        border: `2px solid ${category.borderColor}`,
        boxShadow: '0 12px 40px rgba(0, 0, 0, 0.1)',
        backdropFilter: 'blur(20px)',
        position: 'relative'
    }}>
        {/* Header */}
        <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: '24px'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '2rem' }}>{category.icon}</span>
                <div>
                    <h2 style={{
                        fontSize: device.isMobile ? '1.3rem' : '1.5rem',
                        fontWeight: '700',
                        color: category.color,
                        margin: '0 0 4px 0'
                    }}>
                        {category.title}
                    </h2>
                    <p style={{
                        fontSize: '0.9rem',
                        color: '#6b7280',
                        margin: '0'
                    }}>
                        Fuente oficial: {category.source}
                    </p>
                </div>
            </div>
            <button
                onClick={onClose}
                style={{
                    background: 'none',
                    border: 'none',
                    fontSize: '1.5rem',
                    cursor: 'pointer',
                    color: '#9ca3af',
                    padding: '4px',
                    borderRadius: '6px',
                    transition: 'color 0.2s'
                }}
                onMouseEnter={e => e.target.style.color = '#374151'}
                onMouseLeave={e => e.target.style.color = '#9ca3af'}
                aria-label="Cerrar detalles"
            >
                ✕
            </button>
        </div>

        {/* Items */}
        <div style={{
            display: 'grid',
            gap: '20px'
        }}>
            {category.items.map((item, index) => (
                <div key={index} style={{
                    padding: device.isMobile ? '16px' : '20px',
                    background: 'rgba(255, 255, 255, 0.7)',
                    borderRadius: '12px',
                    border: '1px solid rgba(0, 0, 0, 0.05)',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
                }}>
                    <h4 style={{
                        fontSize: device.isMobile ? '1rem' : '1.1rem',
                        fontWeight: '600',
                        color: '#1f2937',
                        margin: '0 0 8px 0'
                    }}>
                        {item.title}
                    </h4>
                    <p style={{
                        fontSize: device.isMobile ? '0.85rem' : '0.9rem',
                        color: '#4b5563',
                        margin: '0 0 12px 0',
                        lineHeight: '1.6'
                    }}>
                        {item.description}
                    </p>
                    {item.tips && (
                        <div style={{
                            padding: '12px',
                            background: 'rgba(34, 197, 94, 0.1)',
                            borderRadius: '8px',
                            border: '1px solid rgba(34, 197, 94, 0.2)',
                            marginBottom: '8px'
                        }}>
                            <div style={{
                                fontSize: '0.8rem',
                                fontWeight: '600',
                                color: '#059669',
                                marginBottom: '4px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px'
                            }}>
                                💡 Consejo práctico
                            </div>
                            <p style={{
                                fontSize: device.isMobile ? '0.8rem' : '0.85rem',
                                color: '#065f46',
                                margin: '0',
                                lineHeight: '1.5'
                            }}>
                                {item.tips}
                            </p>
                        </div>
                    )}
                    {item.warning && (
                        <div style={{
                            padding: '12px',
                            background: 'rgba(239, 68, 68, 0.1)',
                            borderRadius: '8px',
                            border: '1px solid rgba(239, 68, 68, 0.2)'
                        }}>
                            <div style={{
                                fontSize: '0.8rem',
                                fontWeight: '600',
                                color: '#dc2626',
                                marginBottom: '4px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px'
                            }}>
                                ⚠️ Importante
                            </div>
                            <p style={{
                                fontSize: device.isMobile ? '0.8rem' : '0.85rem',
                                color: '#991b1b',
                                margin: '0',
                                lineHeight: '1.5'
                            }}>
                                {item.warning}
                            </p>
                        </div>
                    )}
                </div>
            ))}
        </div>

        {/* Related Topics */}
        <div style={{
            marginTop: '24px',
            padding: '16px',
            background: 'rgba(59, 130, 246, 0.05)',
            borderRadius: '12px',
            border: '1px solid rgba(59, 130, 246, 0.1)'
        }}>
            <h4 style={{
                fontSize: '0.9rem',
                fontWeight: '600',
                color: '#1e40af',
                margin: '0 0 8px 0'
            }}>
                📚 Temas relacionados
            </h4>
            <p style={{
                fontSize: '0.8rem',
                color: '#3730a3',
                margin: '0',
                lineHeight: '1.5'
            }}>
                Explora otras categorías que pueden ser útiles para tu situación específica. 
                Muchos trámites están interconectados y es importante entender el panorama completo.
            </p>
        </div>
    </div>
);

export const Checklist = ({ title, items }) => {
    const device = useResponsive();
    
    return (
        <div 
            role="region"
            aria-labelledby="checklist-title"
            style={{ 
                marginTop: '0', 
                padding: device.isMobile ? '16px' : '20px', 
                background: 'linear-gradient(135deg, #fefaf8 0%, #fdf2f8 100%)', 
                borderRadius: '16px', 
                border: '1px solid #f3e8d8',
                borderLeft: '4px solid #d97706',
                boxShadow: '0 4px 12px rgba(217, 119, 6, 0.1)'
            }}
        >
            <h3 
                id="checklist-title"
                style={{ 
                    margin: '0 0 16px 0', 
                    fontSize: device.isMobile ? '1rem' : '1.1rem', 
                    fontWeight: '700', 
                    color: '#92400e',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                }}
            >
                <span style={{ fontSize: '1.2rem' }} aria-hidden="true">⚠️</span>
                {title}
            </h3>
            <ul 
                style={{ 
                    margin: 0, 
                    paddingLeft: '0', 
                    listStyle: 'none',
                    color: '#78350f' 
                }}
                role="list"
            >
                {items.map((item, idx) => (
                    <li 
                        key={idx} 
                        role="listitem"
                        style={{ 
                            marginBottom: '16px', 
                            lineHeight: '1.6',
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: '12px',
                            fontSize: device.isMobile ? '0.9rem' : '1rem',
                            padding: '8px 0',
                            borderBottom: idx < items.length - 1 ? '1px solid rgba(217, 119, 6, 0.1)' : 'none'
                        }}
                    >
                        <span 
                            style={{ 
                                color: '#d97706', 
                                fontWeight: 'bold',
                                fontSize: '1rem',
                                marginTop: '2px',
                                minWidth: '12px'
                            }}
                            aria-hidden="true"
                        >
                            •
                        </span>
                        <span style={{ flex: 1 }}>{item}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export const InputBar = ({ onSend, loading }) => {
    const [val, setVal] = React.useState('');
    const device = useResponsive();
    
    const exampleChips = [
        "Mi residencia vence en 2 semanas",
        "¿Cómo registro mi dirección?",
        "Necesito permiso de trabajo",
        "¿Dónde pago multa de transporte?",
        "Problemas con el seguro médico",
        "¿Cómo abrir cuenta bancaria?"
    ];
    
    return (
        <section 
            aria-label="Consulta personalizada"
            style={{ 
                marginTop: '32px', 
                padding: device.isMobile ? '16px' : '24px', 
                background: 'linear-gradient(135deg, rgba(248, 250, 252, 0.95) 0%, rgba(241, 245, 249, 0.95) 100%)',
                borderRadius: '20px',
                border: '2px solid rgba(59, 130, 246, 0.1)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
                backdropFilter: 'blur(20px)'
            }}
        >
            {/* Section Header */}
            <div style={{
                marginBottom: '20px',
                textAlign: 'center'
            }}>
                <div style={{
                    fontSize: '2rem',
                    marginBottom: '8px'
                }}>🤝</div>
                <h2 style={{
                    fontSize: device.isMobile ? '1.1rem' : '1.2rem',
                    fontWeight: '700',
                    color: '#1e40af',
                    margin: '0 0 6px 0'
                }}>
                    ¿Tienes una situación específica?
                </h2>
                <p style={{
                    fontSize: device.isMobile ? '0.85rem' : '0.9rem',
                    color: '#64748b',
                    margin: '0',
                    lineHeight: '1.5'
                }}>
                    Describe tu caso para recibir orientación personalizada basada en fuentes oficiales
                </p>
            </div>

            {/* Input Section */}
            <div style={{ marginBottom: '20px' }}>
                <div style={{ 
                    display: 'flex', 
                    flexDirection: device.isMobile ? 'column' : 'row',
                    gap: '12px' 
                }}>
                    <div style={{ 
                        flex: 1,
                        position: 'relative'
                    }}>
                        <textarea
                            aria-label="Describe tu situación específica"
                            style={{
                                width: '100%',
                                padding: '16px 20px',
                                fontSize: '16px',
                                border: '2px solid #e2e8f0',
                                borderRadius: '12px',
                                outline: 'none',
                                transition: 'all 0.2s',
                                fontFamily: 'inherit',
                                background: 'rgba(255, 255, 255, 0.9)',
                                minHeight: device.isMobile ? '80px' : '60px',
                                maxHeight: '120px',
                                resize: 'vertical',
                                lineHeight: '1.5'
                            }}
                            value={val}
                            onChange={e => setVal(e.target.value)}
                            onKeyDown={e => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault();
                                    onSend(val);
                                }
                            }}
                            onFocus={e => {
                                e.target.style.borderColor = '#3b82f6';
                                e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
                            }}
                            onBlur={e => {
                                e.target.style.borderColor = '#e2e8f0';
                                e.target.style.boxShadow = 'none';
                            }}
                            placeholder={device.isMobile ? 
                                "Ej: Mi visa vence en 15 días..." : 
                                "Ej: Mi visa vence en 15 días y no sé qué documentos necesito para renovar..."
                            }
                            disabled={loading}
                        />
                        {val.length > 0 && (
                            <div style={{
                                position: 'absolute',
                                bottom: '8px',
                                right: '12px',
                                fontSize: '0.75rem',
                                color: '#9ca3af'
                            }}>
                                {val.length}/500
                            </div>
                        )}
                    </div>
                    <button 
                        aria-label={loading ? 'Evaluando situación' : 'Evaluar situación'}
                        style={{
                            padding: '16px 28px',
                            background: loading ? 
                                'linear-gradient(135deg, #9ca3af 0%, #6b7280 100%)' : 
                                'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '12px',
                            cursor: loading ? 'not-allowed' : 'pointer',
                            fontWeight: '600',
                            fontSize: device.isMobile ? '0.9rem' : '1rem',
                            transition: 'all 0.2s',
                            minHeight: '60px',
                            minWidth: device.isMobile ? '100%' : '120px',
                            boxShadow: loading ? 'none' : '0 4px 12px rgba(59, 130, 246, 0.3)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px'
                        }}
                        onClick={() => onSend(val)} 
                        disabled={loading || val.trim().length === 0}
                        onMouseEnter={e => {
                            if (!loading && val.trim().length > 0) {
                                e.target.style.transform = 'translateY(-2px)';
                                e.target.style.boxShadow = '0 6px 20px rgba(59, 130, 246, 0.4)';
                            }
                        }}
                        onMouseLeave={e => {
                            if (!loading) {
                                e.target.style.transform = 'translateY(0)';
                                e.target.style.boxShadow = '0 4px 12px rgba(59, 130, 246, 0.3)';
                            }
                        }}
                    >
                        {loading ? (
                            <>
                                <div style={{
                                    width: '16px',
                                    height: '16px',
                                    border: '2px solid rgba(255, 255, 255, 0.3)',
                                    borderTop: '2px solid #fff',
                                    borderRadius: '50%',
                                    animation: 'spin 1s linear infinite'
                                }} />
                                Evaluando...
                            </>
                        ) : (
                            <>
                                🔍 Evaluar
                            </>
                        )}
                    </button>
                </div>
            </div>
            
            {/* Example Chips */}
            <div>
                <div style={{ 
                    fontSize: '0.8rem', 
                    color: '#64748b', 
                    marginBottom: '12px',
                    textAlign: 'center',
                    fontWeight: '500'
                }}>
                    💡 Ejemplos comunes:
                </div>
                <div style={{ 
                    display: 'flex', 
                    flexWrap: 'wrap', 
                    gap: '8px',
                    justifyContent: 'center'
                }}>
                    {exampleChips.slice(0, device.isMobile ? 4 : 6).map((chip, idx) => (
                        <button
                            key={idx}
                            aria-label={`Usar ejemplo: ${chip}`}
                            style={{
                                padding: '8px 16px',
                                background: 'rgba(255, 255, 255, 0.8)',
                                border: '1px solid #d1d5db',
                                borderRadius: '20px',
                                fontSize: device.isMobile ? '0.8rem' : '0.85rem',
                                color: '#374151',
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                                minHeight: '36px',
                                backdropFilter: 'blur(10px)'
                            }}
                            onClick={() => setVal(chip)}
                            onMouseEnter={e => {
                                e.target.style.backgroundColor = 'rgba(59, 130, 246, 0.1)';
                                e.target.style.borderColor = '#3b82f6';
                                e.target.style.transform = 'translateY(-1px)';
                            }}
                            onMouseLeave={e => {
                                e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
                                e.target.style.borderColor = '#d1d5db';
                                e.target.style.transform = 'translateY(0)';
                            }}
                        >
                            {chip}
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
};

export const DebugPanel = ({ guardianState, setGuardianState }) => {
    const device = useResponsive();
    
    return (
        <div style={{ 
            marginTop: '50px', 
            padding: device.isMobile ? '12px' : '16px', 
            background: 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)', 
            fontSize: device.isMobile ? '0.75rem' : '0.8rem',
            borderRadius: '12px',
            border: '1px solid #d1d5db'
        }}>
            <strong style={{ color: '#374151', fontSize: '0.9rem' }}>🔧 DEBUG CONTROL</strong>
            <div style={{ marginTop: '8px', display: 'flex', flexDirection: device.isMobile ? 'column' : 'row', gap: '12px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <input
                        type="checkbox"
                        checked={guardianState.admin_block}
                        onChange={e => setGuardianState(prev => ({ ...prev, admin_block: e.target.checked }))}
                        style={{ transform: 'scale(1.1)' }}
                    />
                    <span>Admin Block</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span>Days Remaining:</span>
                    <input
                        type="number"
                        value={guardianState.days}
                        onChange={e => setGuardianState(prev => ({ ...prev, days: parseInt(e.target.value) }))}
                        style={{ 
                            width: '60px', 
                            padding: '4px 6px',
                            border: '1px solid #d1d5db',
                            borderRadius: '4px',
                            fontSize: '0.8rem'
                        }}
                    />
                </label>
            </div>
        </div>
    );
};

export const NavigationBreadcrumbs = ({ currentPath = [], onNavigate }) => {
    const device = useResponsive();
    
    if (currentPath.length === 0) return null;
    
    return (
        <nav aria-label="Navegación" style={{
            marginBottom: '20px',
            padding: device.isMobile ? '8px 12px' : '10px 16px',
            background: 'rgba(255, 255, 255, 0.7)',
            borderRadius: '8px',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backdropFilter: 'blur(10px)'
        }}>
            <ol style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                margin: 0,
                padding: 0,
                listStyle: 'none',
                fontSize: device.isMobile ? '0.8rem' : '0.85rem',
                color: '#6b7280'
            }}>
                <li>
                    <button
                        onClick={() => onNavigate([])}
                        style={{
                            background: 'none',
                            border: 'none',
                            color: '#3b82f6',
                            cursor: 'pointer',
                            textDecoration: 'underline',
                            fontSize: 'inherit',
                            padding: '2px 4px',
                            borderRadius: '4px'
                        }}
                        onMouseEnter={e => e.target.style.backgroundColor = 'rgba(59, 130, 246, 0.1)'}
                        onMouseLeave={e => e.target.style.backgroundColor = 'transparent'}
                    >
                        🏠 Inicio
                    </button>
                </li>
                {currentPath.map((item, index) => (
                    <React.Fragment key={index}>
                        <li aria-hidden="true">→</li>
                        <li>
                            {index === currentPath.length - 1 ? (
                                <span style={{ fontWeight: '600', color: '#374151' }}>
                                    {item.title}
                                </span>
                            ) : (
                                <button
                                    onClick={() => onNavigate(currentPath.slice(0, index + 1))}
                                    style={{
                                        background: 'none',
                                        border: 'none',
                                        color: '#3b82f6',
                                        cursor: 'pointer',
                                        textDecoration: 'underline',
                                        fontSize: 'inherit',
                                        padding: '2px 4px',
                                        borderRadius: '4px'
                                    }}
                                    onMouseEnter={e => e.target.style.backgroundColor = 'rgba(59, 130, 246, 0.1)'}
                                    onMouseLeave={e => e.target.style.backgroundColor = 'transparent'}
                                >
                                    {item.title}
                                </button>
                            )}
                        </li>
                    </React.Fragment>
                ))}
            </ol>
        </nav>
    );
};

export const FloatingHomeButton = ({ onClick }) => {
    const device = useResponsive();
    
    return (
        <button
            onClick={onClick}
            style={{
                position: 'fixed',
                bottom: device.isMobile ? '20px' : '30px',
                right: device.isMobile ? '20px' : '30px',
                width: device.isMobile ? '56px' : '64px',
                height: device.isMobile ? '56px' : '64px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                border: 'none',
                color: '#fff',
                fontSize: device.isMobile ? '1.5rem' : '1.8rem',
                cursor: 'pointer',
                boxShadow: '0 8px 32px rgba(59, 130, 246, 0.4)',
                transition: 'all 0.3s ease',
                zIndex: 1000,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backdropFilter: 'blur(10px)'
            }}
            onMouseEnter={e => {
                e.target.style.transform = 'scale(1.1) translateY(-2px)';
                e.target.style.boxShadow = '0 12px 40px rgba(59, 130, 246, 0.5)';
            }}
            onMouseLeave={e => {
                e.target.style.transform = 'scale(1) translateY(0)';
                e.target.style.boxShadow = '0 8px 32px rgba(59, 130, 246, 0.4)';
            }}
            aria-label="Volver al inicio"
            title="Volver al inicio"
        >
            🏠
        </button>
    );
};

export const DailyProblemsList = ({ problems }) => {
    if (!problems || problems.length === 0) return null;

    const isMobile = window.innerWidth < 768;

    const getPriorityIcon = (priority) => {
        switch (priority) {
            case 'critical': return '🚨';
            case 'important': return '⚠️';
            default: return '🔍';
        }
    };

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'critical': return '#dc2626';
            case 'important': return '#d97706';
            default: return '#059669';
        }
    };

    const getPriorityLabel = (priority) => {
        switch (priority) {
            case 'critical': return 'Crítico';
            case 'important': return 'Importante';
            default: return 'Información';
        }
    };

    const styles = {
        container: { 
            marginTop: '0', 
            marginBottom: '32px',
            padding: isMobile ? '16px' : '20px',
            background: '#fefefe',
            borderRadius: '12px',
            border: '1px solid #e5e7eb',
            boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
        },
        header: { 
            marginBottom: '4px'
        },
        title: {
            fontSize: isMobile ? '1rem' : '1.1rem', 
            fontWeight: '700',
            color: '#111827',
            marginBottom: '6px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
        },
        subtitle: {
            fontSize: '0.85rem',
            color: '#6b7280',
            marginBottom: '16px',
            fontStyle: 'italic'
        },
        list: { 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '12px' 
        },
        card: (priority) => ({
            padding: isMobile ? '12px 14px' : '14px 16px',
            borderRadius: '8px',
            borderLeft: `4px solid ${getPriorityColor(priority)}`,
            background: priority === 'critical' ? '#fef2f2' : 
                       priority === 'important' ? '#fffbeb' : '#f0fdf4',
            border: `1px solid ${priority === 'critical' ? '#fecaca' : 
                                 priority === 'important' ? '#fed7aa' : '#bbf7d0'}`
        }),
        cardHeader: {
            display: 'flex',
            alignItems: 'flex-start',
            gap: '8px',
            marginBottom: '8px'
        },
        cardIcon: {
            fontSize: '1.1rem',
            marginTop: '1px'
        },
        cardTitle: { 
            fontWeight: '600', 
            fontSize: isMobile ? '0.9rem' : '0.95rem', 
            color: '#111827',
            flex: 1
        },
        desc: { 
            fontSize: isMobile ? '0.85rem' : '0.9rem', 
            color: '#4b5563',
            marginBottom: '10px',
            lineHeight: '1.5',
            marginLeft: '28px'
        },
        action: { 
            fontSize: '0.85rem', 
            fontWeight: '600', 
            color: getPriorityColor('default'),
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            marginLeft: '28px',
            padding: '6px 12px',
            background: '#f0fdf4',
            borderRadius: '6px',
            border: '1px solid #bbf7d0'
        }
    };

    return (
        <section 
            aria-label="Alertas detectadas para tu situación"
            style={styles.container}
        >
            <div style={styles.header}>
                <h2 style={styles.title}>
                    <span aria-hidden="true">🛡️</span>
                    Alertas detectadas para tu situación
                </h2>
                <div style={styles.subtitle}>
                    Estas alertas se basan en situaciones frecuentes de inmigrantes en tu contexto
                </div>
            </div>
            <div style={styles.list} role="list">
                {problems.map(prob => (
                    <div 
                        key={prob.id} 
                        style={styles.card(prob.priority)}
                        role="listitem"
                        aria-label={`Alerta ${getPriorityLabel(prob.priority)}: ${prob.content.title}`}
                    >
                        <div style={styles.cardHeader}>
                            <span 
                                style={styles.cardIcon}
                                aria-label={`Prioridad: ${getPriorityLabel(prob.priority)}`}
                            >
                                {getPriorityIcon(prob.priority)}
                            </span>
                            <div style={styles.cardTitle}>
                                {prob.content.title}
                            </div>
                        </div>
                        <div style={styles.desc}>
                            {prob.content.what} {prob.content.why}
                        </div>
                        <div style={styles.action} role="note" aria-label="Recomendación">
                            <span aria-hidden="true">✓</span>
                            <span>Recomendación: {prob.content.action}</span>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export const WelcomeHero = () => {
    const device = useResponsive();
    
    return (
        <section 
            aria-label="Bienvenida y propósito de la aplicación"
            style={{
                textAlign: 'center',
                marginBottom: '32px',
                padding: device.isMobile ? '24px 16px' : '40px 32px',
                background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(16, 185, 129, 0.1) 50%, rgba(139, 92, 246, 0.1) 100%)',
                borderRadius: '24px',
                border: '1px solid rgba(59, 130, 246, 0.2)',
                backdropFilter: 'blur(20px)',
                position: 'relative',
                overflow: 'hidden'
            }}
        >
            {/* Animated background elements */}
            <div style={{
                position: 'absolute',
                top: '-50%',
                right: '-20%',
                width: device.isMobile ? '150px' : '250px',
                height: device.isMobile ? '150px' : '250px',
                background: 'radial-gradient(circle, rgba(16, 185, 129, 0.15) 0%, transparent 70%)',
                borderRadius: '50%',
                pointerEvents: 'none',
                animation: 'float 6s ease-in-out infinite'
            }} />
            <div style={{
                position: 'absolute',
                bottom: '-30%',
                left: '-10%',
                width: device.isMobile ? '120px' : '200px',
                height: device.isMobile ? '120px' : '200px',
                background: 'radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%)',
                borderRadius: '50%',
                pointerEvents: 'none',
                animation: 'float 8s ease-in-out infinite reverse'
            }} />
            
            <div style={{ position: 'relative', zIndex: 1 }}>
                {/* Main icon with animation */}
                <div style={{
                    fontSize: device.isMobile ? '3.5rem' : '5rem',
                    marginBottom: '20px',
                    filter: 'drop-shadow(0 8px 16px rgba(0, 0, 0, 0.1))',
                    animation: 'pulse 3s ease-in-out infinite'
                }}>
                    🛡️
                </div>
                
                {/* Main heading */}
                <h1 style={{
                    fontSize: device.isMobile ? '1.6rem' : '2.4rem',
                    fontWeight: '800',
                    background: 'linear-gradient(135deg, #1e40af 0%, #059669 50%, #7c3aed 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    marginBottom: '16px',
                    lineHeight: '1.2'
                }}>
                    Tu compañero de confianza en Serbia
                </h1>
                
                {/* Subtitle */}
                <p style={{
                    fontSize: device.isMobile ? '1.1rem' : '1.3rem',
                    color: '#059669',
                    marginBottom: '24px',
                    fontWeight: '600',
                    lineHeight: '1.4'
                }}>
                    Evita problemas legales, multas y complicaciones burocráticas
                </p>
                
                {/* Description */}
                <p style={{
                    fontSize: device.isMobile ? '0.9rem' : '1rem',
                    color: '#64748b',
                    marginBottom: '28px',
                    lineHeight: '1.6',
                    maxWidth: '600px',
                    margin: '0 auto 28px auto'
                }}>
                    Información actualizada basada exclusivamente en fuentes oficiales del gobierno serbio. 
                    Te ayudamos a navegar la burocracia con confianza y tranquilidad.
                </p>
                
                {/* Value proposition */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: device.isMobile ? '1fr' : 'repeat(3, 1fr)',
                    gap: device.isMobile ? '16px' : '24px',
                    marginTop: '32px',
                    maxWidth: '800px',
                    margin: '32px auto 0 auto'
                }}>
                    {[
                        { icon: '✅', text: 'Información oficial verificada', color: '#059669' },
                        { icon: '🎯', text: 'Alertas personalizadas', color: '#3b82f6' },
                        { icon: '🔄', text: 'Siempre actualizado', color: '#7c3aed' }
                    ].map((item, index) => (
                        <div key={index} style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '10px',
                            padding: '12px 16px',
                            background: 'rgba(255, 255, 255, 0.7)',
                            borderRadius: '12px',
                            border: '1px solid rgba(255, 255, 255, 0.3)',
                            backdropFilter: 'blur(10px)',
                            transition: 'transform 0.2s ease'
                        }}
                        onMouseEnter={e => e.target.style.transform = 'translateY(-2px)'}
                        onMouseLeave={e => e.target.style.transform = 'translateY(0)'}
                        >
                            <span style={{ fontSize: '1.2rem' }}>{item.icon}</span>
                            <span style={{
                                color: item.color,
                                fontSize: device.isMobile ? '0.85rem' : '0.9rem',
                                fontWeight: '600'
                            }}>
                                {item.text}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
            
            {/* CSS animations */}
            <style>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-20px) rotate(5deg); }
                }
                @keyframes pulse {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.05); }
                }
            `}</style>
        </section>
    );
};

export const QuickAccessCards = () => {
    const device = useResponsive();
    
    const quickActions = [
        {
            icon: '📋',
            title: 'Registro policial',
            description: 'Obligatorio en 24h tras llegada',
            color: '#dc2626',
            bgColor: 'rgba(220, 38, 38, 0.1)',
            borderColor: 'rgba(220, 38, 38, 0.2)',
            urgency: 'high'
        },
        {
            icon: '🏠',
            title: 'Residencia temporal',
            description: 'Permisos y renovaciones',
            color: '#059669',
            bgColor: 'rgba(5, 150, 105, 0.1)',
            borderColor: 'rgba(5, 150, 105, 0.2)',
            urgency: 'medium'
        },
        {
            icon: '💼',
            title: 'Permiso de trabajo',
            description: 'Documentación laboral',
            color: '#3b82f6',
            bgColor: 'rgba(59, 130, 246, 0.1)',
            borderColor: 'rgba(59, 130, 246, 0.2)',
            urgency: 'medium'
        },
        {
            icon: '🏥',
            title: 'Seguro médico',
            description: 'Cobertura y emergencias',
            color: '#ea580c',
            bgColor: 'rgba(234, 88, 12, 0.1)',
            borderColor: 'rgba(234, 88, 12, 0.2)',
            urgency: 'high'
        },
        {
            icon: '🚌',
            title: 'Transporte público',
            description: 'Tarifas y validación',
            color: '#7c3aed',
            bgColor: 'rgba(124, 58, 237, 0.1)',
            borderColor: 'rgba(124, 58, 237, 0.2)',
            urgency: 'low'
        },
        {
            icon: '💰',
            title: 'Banca y finanzas',
            description: 'Cuentas e impuestos',
            color: '#059669',
            bgColor: 'rgba(5, 150, 105, 0.1)',
            borderColor: 'rgba(5, 150, 105, 0.2)',
            urgency: 'medium'
        }
    ];
    
    return (
        <section 
            aria-label="Acceso rápido a temas importantes"
            style={{
                marginBottom: '32px'
            }}
        >
            <div style={{
                textAlign: 'center',
                marginBottom: '24px'
            }}>
                <h2 style={{
                    fontSize: device.isMobile ? '1.2rem' : '1.4rem',
                    fontWeight: '700',
                    color: '#1f2937',
                    marginBottom: '8px'
                }}>
                    🎯 Temas más consultados
                </h2>
                <p style={{
                    fontSize: device.isMobile ? '0.85rem' : '0.9rem',
                    color: '#6b7280',
                    margin: '0'
                }}>
                    Accede rápidamente a la información que más necesitas
                </p>
            </div>
            
            <div style={{
                display: 'grid',
                gridTemplateColumns: device.isMobile ? '1fr' : 
                                   device.isTablet ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
                gap: device.isMobile ? '16px' : '20px'
            }}>
                {quickActions.map((action, index) => (
                    <div
                        key={index}
                        style={{
                            padding: device.isMobile ? '18px' : '24px',
                            background: action.bgColor,
                            borderRadius: '20px',
                            border: `2px solid ${action.borderColor}`,
                            transition: 'all 0.3s ease',
                            cursor: 'pointer',
                            backdropFilter: 'blur(20px)',
                            position: 'relative',
                            overflow: 'hidden'
                        }}
                        onMouseEnter={e => {
                            e.target.style.transform = 'translateY(-4px)';
                            e.target.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.15)';
                        }}
                        onMouseLeave={e => {
                            e.target.style.transform = 'translateY(0)';
                            e.target.style.boxShadow = 'none';
                        }}
                        role="button"
                        tabIndex={0}
                        aria-label={`Información sobre ${action.title}: ${action.description}`}
                    >
                        {/* Urgency indicator */}
                        {action.urgency === 'high' && (
                            <div style={{
                                position: 'absolute',
                                top: '12px',
                                right: '12px',
                                width: '8px',
                                height: '8px',
                                background: '#dc2626',
                                borderRadius: '50%',
                                animation: 'pulse 2s infinite'
                            }} />
                        )}
                        
                        <div style={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: '16px'
                        }}>
                            <div style={{
                                fontSize: device.isMobile ? '1.8rem' : '2rem',
                                filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1))',
                                flexShrink: 0
                            }}>
                                {action.icon}
                            </div>
                            <div style={{ flex: 1 }}>
                                <h3 style={{
                                    fontSize: device.isMobile ? '1rem' : '1.1rem',
                                    fontWeight: '700',
                                    color: action.color,
                                    marginBottom: '6px',
                                    margin: '0 0 6px 0',
                                    lineHeight: '1.3'
                                }}>
                                    {action.title}
                                </h3>
                                <p style={{
                                    fontSize: device.isMobile ? '0.8rem' : '0.85rem',
                                    color: '#64748b',
                                    margin: '0',
                                    lineHeight: '1.4'
                                }}>
                                    {action.description}
                                </p>
                                
                                {/* Urgency label */}
                                {action.urgency === 'high' && (
                                    <div style={{
                                        marginTop: '8px',
                                        fontSize: '0.7rem',
                                        color: '#dc2626',
                                        fontWeight: '600',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.5px'
                                    }}>
                                        ⚡ Prioritario
                                    </div>
                                )}
                            </div>
                        </div>
                        
                        {/* Subtle decorative element */}
                        <div style={{
                            position: 'absolute',
                            bottom: '-30px',
                            right: '-30px',
                            width: '80px',
                            height: '80px',
                            background: `radial-gradient(circle, ${action.borderColor} 0%, transparent 70%)`,
                            borderRadius: '50%',
                            pointerEvents: 'none',
                            opacity: 0.6
                        }} />
                    </div>
                ))}
            </div>
        </section>
    );
};
