import React from 'react';

// --- STYLES (Inline for strict containment) ---
const styles = {
    screen: { padding: '20px', maxWidth: '600px', margin: '0 auto', fontFamily: 'sans-serif' },
    crisis: { background: '#721c24', color: '#fff', padding: '15px', borderRadius: '4px', marginBottom: '20px', fontWeight: 'bold' },
    blocked: { background: '#e2e3e5', color: '#383d41', padding: '40px', textAlign: 'center', borderRadius: '8px' },
    step: { borderLeft: '3px solid #333', paddingLeft: '15px', marginBottom: '20px' },
    stepTitle: { fontSize: '1.2em', fontWeight: 'bold', margin: '0 0 10px 0' },
    item: { marginBottom: '10px' },
    inputContainer: { display: 'flex', gap: '10px', marginTop: '20px', borderTop: '1px solid #eee', paddingTop: '20px' },
    input: { flex: 1, padding: '10px', fontSize: '16px' },
    button: { padding: '10px 20px', background: '#000', color: '#fff', border: 'none', cursor: 'cursor' },
    label: { display: 'block', fontSize: '0.8em', color: '#666', marginBottom: '5px' }
};

// --- COMPONENTS ---

export const CrisisBanner = ({ urgency, action }) => (
    <div style={styles.crisis}>
        <div>⚠️ CRISIS (Nivel {urgency}/10)</div>
        <div style={{ fontSize: '1.5em', marginTop: '10px' }}>{action || "BUSCAR AYUDA INMEDIATA"}</div>
    </div>
);

export const BlockedScreen = ({ reason, safeAction }) => (
    <div style={styles.blocked}>
        <h1>⛔ Sistema Bloqueado</h1>
        <p><strong>Razón:</strong> {reason}</p>
        <hr style={{ margin: '20px 0', border: '0', borderTop: '1px solid #ccc' }} />
        <p><strong>Acción Segura:</strong> {safeAction || "Contactar Soporte"}</p>
    </div>
);

export const FlowRenderer = ({ steps, flowId, zone }) => (
    <div>
        <div style={{ 
            marginBottom: '24px', 
            padding: '12px 16px', 
            background: '#f8f9fa', 
            borderLeft: `5px solid ${zone === 'CRISIS' ? '#dc3545' : '#28a745'}`,
            borderRadius: '4px',
            fontSize: '0.9em',
            color: '#495057'
        }}>
            <strong>Modo Activo:</strong> {flowId} ({zone})
        </div>
        {steps && steps.map(step => (
            <div key={step.id} style={{...styles.step, marginBottom: '24px'}}>
                <h3 style={{...styles.stepTitle, marginBottom: '12px'}}>{step.title}</h3>
                {step.items && step.items.map(item => (
                    <div key={item.id} style={{...styles.item, padding: '8px 0', lineHeight: '1.6'}}>
                        <strong style={{ display: 'block', marginBottom: '4px', color: '#212529' }}>{item.label}</strong>
                        {item.description && <div style={{ color: '#495057', fontSize: '0.95em' }}>{item.description}</div>}
                        {item.warning && <div style={{ color: '#dc3545', fontSize: '0.9em', marginTop: '4px', fontWeight: '500' }}>⚠️ {item.warning}</div>}
                    </div>
                ))}
            </div>
        ))}
    </div>
);

export const Checklist = ({ title, items }) => {
    const isMobile = window.innerWidth < 768;
    
    return (
        <div 
            role="region"
            aria-labelledby="checklist-title"
            style={{ 
                marginTop: '0', 
                padding: isMobile ? '16px' : '20px', 
                background: '#fefaf8', 
                borderRadius: '12px', 
                border: '1px solid #f3e8d8',
                borderLeft: '4px solid #d97706'
            }}
        >
            <h3 
                id="checklist-title"
                style={{ 
                    margin: '0 0 16px 0', 
                    fontSize: isMobile ? '1rem' : '1.05rem', 
                    fontWeight: '600', 
                    color: '#92400e',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                }}
            >
                <span style={{ fontSize: '1.1rem' }} aria-hidden="true">⚠️</span>
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
                            marginBottom: '14px', 
                            lineHeight: '1.6',
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: '10px',
                            fontSize: isMobile ? '0.9rem' : '1rem'
                        }}
                    >
                        <span 
                            style={{ 
                                color: '#d97706', 
                                fontWeight: 'bold',
                                fontSize: '0.9rem',
                                marginTop: '2px',
                                minWidth: '8px'
                            }}
                            aria-hidden="true"
                        >
                            •
                        </span>
                        <span>{item}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export const InputBar = ({ onSend, loading }) => {
    const [val, setVal] = React.useState('');
    const isMobile = window.innerWidth < 768;
    
    const exampleChips = [
        "Mi residencia vence en 2 semanas",
        "¿Cómo registro mi dirección?",
        "Necesito permiso de trabajo",
        "¿Dónde pago multa de transporte?"
    ];
    
    return (
        <section 
            aria-label="Consulta personalizada"
            style={{ 
                marginTop: '32px', 
                padding: isMobile ? '16px' : '20px', 
                background: '#f8fafc',
                borderRadius: '12px',
                border: '1px solid #e2e8f0'
            }}
        >
            {/* Section Header */}
            <div style={{
                marginBottom: '16px',
                textAlign: 'center'
            }}>
                <h2 style={{
                    fontSize: '1rem',
                    fontWeight: '600',
                    color: '#374151',
                    margin: '0 0 4px 0'
                }}>
                    ¿Tienes una situación específica?
                </h2>
                <p style={{
                    fontSize: '0.85rem',
                    color: '#6b7280',
                    margin: '0'
                }}>
                    Describe tu caso para recibir orientación personalizada
                </p>
            </div>

            {/* Input Section */}
            <div style={{ marginBottom: '16px' }}>
                <div style={{ 
                    display: 'flex', 
                    flexDirection: isMobile ? 'column' : 'row',
                    gap: '12px' 
                }}>
                    <input
                        aria-label="Describe tu situación específica"
                        style={{
                            flex: 1,
                            padding: '14px 16px', // Más grande para móvil
                            fontSize: '16px', // Evita zoom en iOS
                            border: '2px solid #e2e8f0',
                            borderRadius: '8px',
                            outline: 'none',
                            transition: 'border-color 0.2s',
                            fontFamily: 'inherit',
                            background: '#ffffff',
                            minHeight: '44px' // Mínimo táctil
                        }}
                        value={val}
                        onChange={e => setVal(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && onSend(val)}
                        onFocus={e => e.target.style.borderColor = '#3b82f6'}
                        onBlur={e => e.target.style.borderColor = '#e2e8f0'}
                        placeholder={isMobile ? "Ej: Mi visa vence en 15 días..." : "Ej: Mi visa vence en 15 días y no sé qué documentos necesito..."}
                        disabled={loading}
                    />
                    <button 
                        aria-label={loading ? 'Evaluando situación' : 'Evaluar situación'}
                        style={{
                            padding: '14px 24px',
                            background: loading ? '#9ca3af' : '#1f2937',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '8px',
                            cursor: loading ? 'not-allowed' : 'pointer',
                            fontWeight: '600',
                            fontSize: '0.95rem',
                            transition: 'background-color 0.2s',
                            minHeight: '44px', // Mínimo táctil
                            minWidth: isMobile ? '100%' : 'auto'
                        }}
                        onClick={() => onSend(val)} 
                        disabled={loading}
                        onMouseEnter={e => !loading && (e.target.style.backgroundColor = '#111827')}
                        onMouseLeave={e => !loading && (e.target.style.backgroundColor = '#1f2937')}
                    >
                        {loading ? 'Evaluando...' : 'Evaluar'}
                    </button>
                </div>
            </div>
            
            {/* Example Chips */}
            <div>
                <div style={{ 
                    fontSize: '0.8rem', 
                    color: '#6b7280', 
                    marginBottom: '8px',
                    textAlign: 'center'
                }}>
                    Ejemplos comunes:
                </div>
                <div style={{ 
                    display: 'flex', 
                    flexWrap: 'wrap', 
                    gap: '8px',
                    justifyContent: 'center'
                }}>
                    {exampleChips.map((chip, idx) => (
                        <button
                            key={idx}
                            aria-label={`Usar ejemplo: ${chip}`}
                            style={{
                                padding: '8px 16px', // Más grande para móvil
                                background: '#ffffff',
                                border: '1px solid #d1d5db',
                                borderRadius: '20px',
                                fontSize: '0.85rem',
                                color: '#374151',
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                                minHeight: '36px' // Mínimo táctil
                            }}
                            onClick={() => setVal(chip)}
                            onMouseEnter={e => {
                                e.target.style.backgroundColor = '#f3f4f6';
                                e.target.style.borderColor = '#9ca3af';
                            }}
                            onMouseLeave={e => {
                                e.target.style.backgroundColor = '#ffffff';
                                e.target.style.borderColor = '#d1d5db';
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

export const DebugPanel = ({ guardianState, setGuardianState }) => (
    <div style={{ marginTop: '50px', padding: '10px', background: '#eee', fontSize: '0.8em' }}>
        <strong>DEBUG CONTROL</strong>
        <div style={{ marginTop: '5px' }}>
            <label>
                <input
                    type="checkbox"
                    checked={guardianState.admin_block}
                    onChange={e => setGuardianState(prev => ({ ...prev, admin_block: e.target.checked }))}
                /> Admin Block
            </label>
            <label style={{ marginLeft: '10px' }}>
                Days Remaining:
                <input
                    type="number"
                    value={guardianState.days}
                    onChange={e => setGuardianState(prev => ({ ...prev, days: parseInt(e.target.value) }))}
                    style={{ width: '50px', marginLeft: '5px' }}
                />
            </label>
        </div>
    </div>
);

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
    const isMobile = window.innerWidth < 768;
    
    return (
        <section 
            aria-label="Bienvenida y propósito de la aplicación"
            style={{
                textAlign: 'center',
                marginBottom: '32px',
                padding: isMobile ? '24px 16px' : '32px 24px',
                background: 'linear-gradient(135deg, rgba(0, 123, 255, 0.1) 0%, rgba(76, 175, 80, 0.1) 100%)',
                borderRadius: '20px',
                border: '1px solid rgba(0, 123, 255, 0.2)',
                backdropFilter: 'blur(10px)',
                position: 'relative',
                overflow: 'hidden'
            }}
        >
            {/* Decorative background elements */}
            <div style={{
                position: 'absolute',
                top: '-50%',
                right: '-20%',
                width: '200px',
                height: '200px',
                background: 'radial-gradient(circle, rgba(76, 175, 80, 0.1) 0%, transparent 70%)',
                borderRadius: '50%',
                pointerEvents: 'none'
            }} />
            <div style={{
                position: 'absolute',
                bottom: '-30%',
                left: '-10%',
                width: '150px',
                height: '150px',
                background: 'radial-gradient(circle, rgba(0, 123, 255, 0.1) 0%, transparent 70%)',
                borderRadius: '50%',
                pointerEvents: 'none'
            }} />
            
            <div style={{ position: 'relative', zIndex: 1 }}>
                {/* Main icon */}
                <div style={{
                    fontSize: isMobile ? '3rem' : '4rem',
                    marginBottom: '16px',
                    filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1))'
                }}>
                    🛡️
                </div>
                
                {/* Main heading */}
                <h1 style={{
                    fontSize: isMobile ? '1.5rem' : '2rem',
                    fontWeight: '700',
                    color: '#1565C0',
                    marginBottom: '12px',
                    lineHeight: '1.2'
                }}>
                    Tu sistema de protección en Serbia
                </h1>
                
                {/* Subtitle */}
                <p style={{
                    fontSize: isMobile ? '1rem' : '1.1rem',
                    color: '#2E7D32',
                    marginBottom: '20px',
                    fontWeight: '500',
                    lineHeight: '1.4'
                }}>
                    Evita problemas legales, multas y complicaciones burocráticas
                </p>
                
                {/* Value proposition */}
                <div style={{
                    display: 'flex',
                    flexDirection: isMobile ? 'column' : 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: isMobile ? '12px' : '24px',
                    marginTop: '24px'
                }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        color: '#37474F',
                        fontSize: '0.9rem',
                        fontWeight: '500'
                    }}>
                        <span style={{ color: '#4CAF50', fontSize: '1.1rem' }}>✓</span>
                        Información oficial verificada
                    </div>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        color: '#37474F',
                        fontSize: '0.9rem',
                        fontWeight: '500'
                    }}>
                        <span style={{ color: '#4CAF50', fontSize: '1.1rem' }}>✓</span>
                        Alertas personalizadas
                    </div>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        color: '#37474F',
                        fontSize: '0.9rem',
                        fontWeight: '500'
                    }}>
                        <span style={{ color: '#4CAF50', fontSize: '1.1rem' }}>✓</span>
                        Siempre actualizado
                    </div>
                </div>
            </div>
        </section>
    );
};

export const QuickAccessCards = () => {
    const isMobile = window.innerWidth < 768;
    
    const quickActions = [
        {
            icon: '📋',
            title: 'Registro policial',
            description: 'Obligatorio en 24h tras llegada',
            color: '#007BFF',
            bgColor: 'rgba(0, 123, 255, 0.1)',
            borderColor: 'rgba(0, 123, 255, 0.2)'
        },
        {
            icon: '🏠',
            title: 'Residencia temporal',
            description: 'Permisos y renovaciones',
            color: '#4CAF50',
            bgColor: 'rgba(76, 175, 80, 0.1)',
            borderColor: 'rgba(76, 175, 80, 0.2)'
        },
        {
            icon: '💼',
            title: 'Permiso de trabajo',
            description: 'Documentación laboral',
            color: '#FF9800',
            bgColor: 'rgba(255, 152, 0, 0.1)',
            borderColor: 'rgba(255, 152, 0, 0.2)'
        },
        {
            icon: '🚌',
            title: 'Transporte público',
            description: 'Tarifas y validación',
            color: '#9C27B0',
            bgColor: 'rgba(156, 39, 176, 0.1)',
            borderColor: 'rgba(156, 39, 176, 0.2)'
        }
    ];
    
    return (
        <section 
            aria-label="Acceso rápido a temas importantes"
            style={{
                marginBottom: '32px'
            }}
        >
            <h2 style={{
                fontSize: isMobile ? '1.1rem' : '1.2rem',
                fontWeight: '600',
                color: '#374151',
                marginBottom: '16px',
                textAlign: 'center'
            }}>
                Temas más consultados
            </h2>
            
            <div style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
                gap: '16px'
            }}>
                {quickActions.map((action, index) => (
                    <div
                        key={index}
                        style={{
                            padding: '20px',
                            background: action.bgColor,
                            borderRadius: '16px',
                            border: `1px solid ${action.borderColor}`,
                            transition: 'all 0.2s ease',
                            cursor: 'pointer',
                            backdropFilter: 'blur(10px)',
                            position: 'relative',
                            overflow: 'hidden'
                        }}
                        onMouseEnter={e => {
                            e.target.style.transform = 'translateY(-2px)';
                            e.target.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.1)';
                        }}
                        onMouseLeave={e => {
                            e.target.style.transform = 'translateY(0)';
                            e.target.style.boxShadow = 'none';
                        }}
                        role="button"
                        tabIndex={0}
                        aria-label={`Información sobre ${action.title}: ${action.description}`}
                    >
                        <div style={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: '12px'
                        }}>
                            <div style={{
                                fontSize: '1.5rem',
                                filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))'
                            }}>
                                {action.icon}
                            </div>
                            <div style={{ flex: 1 }}>
                                <h3 style={{
                                    fontSize: '1rem',
                                    fontWeight: '600',
                                    color: action.color,
                                    marginBottom: '4px',
                                    margin: '0 0 4px 0'
                                }}>
                                    {action.title}
                                </h3>
                                <p style={{
                                    fontSize: '0.85rem',
                                    color: '#6B7280',
                                    margin: '0',
                                    lineHeight: '1.4'
                                }}>
                                    {action.description}
                                </p>
                            </div>
                        </div>
                        
                        {/* Subtle decorative element */}
                        <div style={{
                            position: 'absolute',
                            top: '-20px',
                            right: '-20px',
                            width: '60px',
                            height: '60px',
                            background: `radial-gradient(circle, ${action.borderColor} 0%, transparent 70%)`,
                            borderRadius: '50%',
                            pointerEvents: 'none'
                        }} />
                    </div>
                ))}
            </div>
        </section>
    );
};
