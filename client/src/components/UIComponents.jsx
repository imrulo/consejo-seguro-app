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
        <div style={{ marginBottom: '20px', padding: '10px', background: '#f8f9fa', borderLeft: `5px solid ${zone === 'CRISIS' ? 'red' : 'green'}` }}>
            <strong>Modo Activo:</strong> {flowId} ({zone})
        </div>
        {steps.map(step => (
            <div key={step.id} style={styles.step}>
                <h3 style={styles.stepTitle}>{step.title}</h3>
                {step.items && step.items.map(item => (
                    <div key={item.id} style={styles.item}>
                        <strong>{item.label}</strong>
                        {item.description && <div>{item.description}</div>}
                        {item.warning && <div style={{ color: 'red', fontSize: '0.9em' }}>⚠️ {item.warning}</div>}
                    </div>
                ))}
            </div>
        ))}
    </div>
);

export const Checklist = ({ title, items }) => (
    <div style={{ opacity: 0.6 }}>
        <h3>{title}</h3>
        <ul>
            {items.map((it, idx) => <li key={idx}>{it}</li>)}
        </ul>
    </div>
);

export const InputBar = ({ onSend, loading }) => {
    const [val, setVal] = React.useState('');
    return (
        <div style={styles.inputContainer}>
            <input
                style={styles.input}
                value={val}
                onChange={e => setVal(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && onSend(val)}
                placeholder="Describe tu situación..."
                disabled={loading}
            />
            <button style={styles.button} onClick={() => onSend(val)} disabled={loading}>
                {loading ? '...' : 'Evaluar'}
            </button>
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

    const styles = {
        container: { marginTop: '20px', paddingTop: '15px', borderTop: '1px solid #eee' },
        header: { fontSize: '0.9em', color: '#666', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '1px' },
        list: { display: 'flex', flexDirection: 'column', gap: '10px' },
        card: (priority) => ({
            padding: '10px',
            borderRadius: '6px',
            borderLeft: `4px solid ${priority === 'critical' ? '#d9534f' :
                priority === 'important' ? '#f0ad4e' : '#5cb85c'
                }`,
            background: '#fff',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }),
        title: { fontWeight: 'bold', fontSize: '0.95em', marginBottom: '3px' },
        desc: { fontSize: '0.85em', color: '#555' },
        action: { marginTop: '5px', fontSize: '0.8em', fontWeight: 'bold', color: '#333' }
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>Fricción Diaria (Detectada)</div>
            <div style={styles.list}>
                {problems.map(prob => (
                    <div key={prob.id} style={styles.card(prob.priority)}>
                        <div style={styles.title}>{prob.content.title}</div>
                        <div style={styles.desc}>{prob.content.what} {prob.content.why}</div>
                        <div style={styles.action}>✅ {prob.content.action}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};
