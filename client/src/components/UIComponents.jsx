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

export const Checklist = ({ title, items }) => (
    <div style={{ 
        marginTop: '0', 
        padding: '20px', 
        background: '#fefaf8', 
        borderRadius: '12px', 
        border: '1px solid #f3e8d8',
        borderLeft: '4px solid #d97706'
    }}>
        <h3 style={{ 
            margin: '0 0 16px 0', 
            fontSize: '1.05rem', 
            fontWeight: '600', 
            color: '#92400e',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
        }}>
            <span style={{ fontSize: '1.1rem' }}>⚠️</span>
            {title}
        </h3>
        <ul style={{ 
            margin: 0, 
            paddingLeft: '0', 
            listStyle: 'none',
            color: '#78350f' 
        }}>
            {items.map((item, idx) => (
                <li key={idx} style={{ 
                    marginBottom: '12px', 
                    lineHeight: '1.5',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '8px'
                }}>
                    <span style={{ 
                        color: '#d97706', 
                        fontWeight: 'bold',
                        fontSize: '0.9rem',
                        marginTop: '2px'
                    }}>
                        •
                    </span>
                    <span>{item}</span>
                </li>
            ))}
        </ul>
    </div>
);

export const InputBar = ({ onSend, loading }) => {
    const [val, setVal] = React.useState('');
    
    const exampleChips = [
        "Mi residencia temporal vence en 2 semanas",
        "¿Cómo registro mi dirección en la policía?",
        "Necesito permiso de trabajo, ¿qué documentos?",
        "¿Dónde pago multa de transporte público?",
        "Mi empleador no me da contrato escrito",
        "¿Cómo abrir cuenta bancaria sin residencia?"
    ];
    
    return (
        <div style={{ 
            marginTop: '32px', 
            padding: '20px', 
            background: '#f8fafc',
            borderRadius: '12px',
            border: '1px solid #e2e8f0'
        }}>
            {/* Section Header */}
            <div style={{
                marginBottom: '16px',
                textAlign: 'center'
            }}>
                <h3 style={{
                    fontSize: '1rem',
                    fontWeight: '600',
                    color: '#374151',
                    margin: '0 0 4px 0'
                }}>
                    ¿Tienes una situación específica?
                </h3>
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
                <div style={{ display: 'flex', gap: '12px' }}>
                    <input
                        style={{
                            flex: 1,
                            padding: '12px 16px',
                            fontSize: '16px',
                            border: '2px solid #e2e8f0',
                            borderRadius: '8px',
                            outline: 'none',
                            transition: 'border-color 0.2s',
                            fontFamily: 'inherit',
                            background: '#ffffff'
                        }}
                        value={val}
                        onChange={e => setVal(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && onSend(val)}
                        onFocus={e => e.target.style.borderColor = '#3b82f6'}
                        onBlur={e => e.target.style.borderColor = '#e2e8f0'}
                        placeholder="Ej: Mi visa vence en 15 días y no sé qué documentos necesito..."
                        disabled={loading}
                    />
                    <button 
                        style={{
                            padding: '12px 24px',
                            background: loading ? '#9ca3af' : '#1f2937',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '8px',
                            cursor: loading ? 'not-allowed' : 'pointer',
                            fontWeight: '600',
                            fontSize: '0.95rem',
                            transition: 'background-color 0.2s'
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
                            style={{
                                padding: '6px 12px',
                                background: '#ffffff',
                                border: '1px solid #d1d5db',
                                borderRadius: '16px',
                                fontSize: '0.8rem',
                                color: '#374151',
                                cursor: 'pointer',
                                transition: 'all 0.2s'
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
        </div>
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

    const styles = {
        container: { 
            marginTop: '0', 
            marginBottom: '32px',
            padding: '20px',
            background: '#fefefe',
            borderRadius: '12px',
            border: '1px solid #e5e7eb',
            boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
        },
        header: { 
            marginBottom: '4px'
        },
        title: {
            fontSize: '1.1rem', 
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
            padding: '14px 16px',
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
            fontSize: '0.95rem', 
            color: '#111827',
            flex: 1
        },
        desc: { 
            fontSize: '0.9rem', 
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
        <div style={styles.container}>
            <div style={styles.header}>
                <div style={styles.title}>
                    <span>🛡️</span>
                    Alertas detectadas para tu situación
                </div>
                <div style={styles.subtitle}>
                    Estas alertas se basan en situaciones frecuentes de inmigrantes en tu contexto
                </div>
            </div>
            <div style={styles.list}>
                {problems.map(prob => (
                    <div key={prob.id} style={styles.card(prob.priority)}>
                        <div style={styles.cardHeader}>
                            <span style={styles.cardIcon}>
                                {getPriorityIcon(prob.priority)}
                            </span>
                            <div style={styles.cardTitle}>
                                {prob.content.title}
                            </div>
                        </div>
                        <div style={styles.desc}>
                            {prob.content.what} {prob.content.why}
                        </div>
                        <div style={styles.action}>
                            <span>✓</span>
                            <span>Recomendación: {prob.content.action}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
