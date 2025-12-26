import React, { useState, useEffect } from 'react';
import appController from './adapters/BrowserAdapter';
// Use ESM version directly
import { deriveUIState, UI_MODES } from './core_esm/UIRenderLogic.js';

import { CrisisBanner, BlockedScreen, FlowRenderer, Checklist, InputBar, DebugPanel, DailyProblemsList } from './components/UIComponents';

function App() {

  // SYSTEM STATE
  const [guardianState, setGuardianState] = useState({
    admin_block: false,
    days: 90
  });
  const [userInput, setUserInput] = useState('');
  const [appOutput, setAppOutput] = useState(null);
  const [uiState, setUiState] = useState(null);

  // Initial Run & Reactivity
  const runSystem = React.useCallback(() => {
    if (!appController || typeof appController.process !== 'function') {
      console.error('AppController not initialized');
      return;
    }

    const guardianActiveStates = [];
    if (guardianState.days < 90) guardianActiveStates.push('legal_clock');
    if (guardianState.admin_block) guardianActiveStates.push('admin_block');

    const input = {
      user_input: userInput,
      guardian_state: { active_states: guardianActiveStates },
      context: {
        country: "RS",
        days_remaining_legal: guardianState.days,
        checks: {
          passport_valid_6_months: true, // Mock defaults for MVP
          residence_reason_still_valid: true,
          complete_document_set: true
        }
      }
    };

    console.log("App Input:", input);
    const output = appController.process(input);
    console.log("App Output:", output);
    setAppOutput(output);
    setUiState(deriveUIState(output));
  }, [guardianState, userInput]);

  useEffect(() => {
    runSystem();
  }, [runSystem]);

  if (!uiState) return (
    <div style={{
      maxWidth: '600px',
      margin: '0 auto',
      padding: window.innerWidth < 768 ? '16px' : '20px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
    }}>
      <div style={{
        textAlign: 'center',
        padding: '40px 20px'
      }}>
        <div style={{
          display: 'inline-block',
          width: '40px',
          height: '40px',
          border: '3px solid #f3f4f6',
          borderTop: '3px solid #3b82f6',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
          marginBottom: '16px'
        }}></div>
        <p style={{
          color: '#6b7280',
          fontSize: '0.9rem',
          margin: '0'
        }}>
          Iniciando sistema de protección...
        </p>
      </div>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );

  const { components } = uiState;

  return (
    <>
      <a href="#main-content" className="skip-link">
        Saltar al contenido principal
      </a>
      <div style={{ 
          maxWidth: '600px', 
          margin: '0 auto', 
          padding: window.innerWidth < 768 ? '16px' : '20px',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
          lineHeight: '1.6',
          color: '#000000' // Mejor contraste para accesibilidad
      }}>
      {/* 1. LAYER: CRISIS */}
      {components.crisisAlert.visible && (
        <CrisisBanner urgency={components.crisisAlert.urgency} action={components.crisisAlert.action} />
      )}

      {/* 2. LAYER: BLOCKED */}
      {components.blockScreen.visible ? (
        <BlockedScreen reason={components.blockScreen.reason} safeAction={components.blockScreen.safeAction} />
      ) : (
        /* 3. LAYER: CONTENT */
        <div>
          {/* 3A. FLOW */}
          {components.flowRenderer.visible && (
            <FlowRenderer
              steps={components.flowRenderer.data.steps}
              flowId={components.flowRenderer.data.flowId}
              zone={components.flowRenderer.data.zone}
            />
          )}

          {/* 3B. IDLE / GENERIC */}
          {components.idleState.visible && (
            <main id="main-content" role="main" aria-label="Información de seguridad para inmigrantes" style={{ padding: '0' }} className="fade-in">
              {/* Hero Section */}
              <header style={{ 
                textAlign: 'center', 
                marginBottom: '24px',
                padding: window.innerWidth < 768 ? '16px 0' : '24px 0'
              }}>
                <h1 style={{ 
                  fontSize: window.innerWidth < 768 ? '1.5rem' : '1.75rem', 
                  fontWeight: '700', 
                  color: '#000000', 
                  marginBottom: '8px',
                  lineHeight: '1.2'
                }}>
                  Evita multas y problemas legales en Serbia
                </h1>
                <p style={{ 
                  fontSize: window.innerWidth < 768 ? '1rem' : '1.1rem', 
                  color: '#374151', 
                  marginBottom: '12px',
                  lineHeight: '1.5',
                  maxWidth: '480px',
                  margin: '0 auto 12px auto'
                }}>
                  Orientación precisa para inmigrantes. Basado en normativas y prácticas locales.
                </p>
                <p style={{
                  fontSize: window.innerWidth < 768 ? '0.85rem' : '0.9rem',
                  color: '#6b7280',
                  fontStyle: 'italic',
                  maxWidth: '420px',
                  margin: '0 auto'
                }}>
                  No necesitas escribir nada para ver riesgos comunes detectados para tu situación.
                </p>
              </header>

              {/* DAILY PROBLEMS - MOVED UP FOR PROTECTION PRIORITY */}
              {appOutput?.daily_problems && (
                <DailyProblemsList problems={appOutput.daily_problems} />
              )}

              {/* Common Risks Section - Only show if no daily problems detected */}
              {(!appOutput?.daily_problems || appOutput.daily_problems.length === 0) && (
                <section aria-label="Alertas de riesgo comunes" style={{ marginBottom: '24px' }}>
                  <div style={{
                    textAlign: 'center',
                    marginBottom: '16px',
                    padding: '12px',
                    background: '#f0fdf4',
                    borderRadius: '8px',
                    border: '1px solid #bbf7d0'
                  }}>
                    <p style={{
                      margin: '0',
                      fontSize: '0.9rem',
                      color: '#166534',
                      fontWeight: '500'
                    }}>
                      🛡️ Sin riesgos críticos detectados hoy
                    </p>
                    <p style={{
                      margin: '4px 0 0 0',
                      fontSize: '0.8rem',
                      color: '#15803d'
                    }}>
                      Estas son situaciones frecuentes que suelen causar problemas
                    </p>
                  </div>
                  <Checklist 
                    title="Problemas frecuentes que causan multas o bloqueos" 
                    items={[
                      "🚨 Registro policial no realizado en 24 horas (multa hasta 50.000 RSD)",
                      "🚨 Residencia temporal vencida sin renovación (deportación posible)", 
                      "⚠️ Trabajo sin permiso laboral válido (multa y prohibición de entrada)",
                      "⚠️ No validar boletos de transporte público (multa 5.000 RSD)"
                    ]} 
                  />
                </section>
              )}
            </main>
          )}
        </div>
      )}

      {/* INPUT ALWAYS VISIBLE UNLESS BLOCKED */}
      {!components.blockScreen.visible && (
        <InputBar onSend={setUserInput} loading={false} />
      )}

      {/* DEBUG PANEL: Hidden in production unless ?debug=true */}
      {window.location.search.includes('debug=true') && (
        <DebugPanel guardianState={guardianState} setGuardianState={setGuardianState} />
      )}

      <footer style={{ 
        marginTop: '40px', 
        paddingTop: '20px',
        borderTop: '1px solid #e2e8f0', 
        fontSize: window.innerWidth < 768 ? '0.75rem' : '0.8rem', 
        color: '#4b5563', // Mejor contraste
        textAlign: 'center'
      }}>
        <p style={{ margin: '0 0 8px 0' }}>
          <strong style={{ color: '#111827' }}>ConsejoSeguro</strong> · Basado en normativas y prácticas locales
        </p>
        <p style={{ margin: '0 0 4px 0' }}>
          Esta herramienta es informativa y no reemplaza asesoría legal profesional.
        </p>
        <p style={{ margin: '0 0 8px 0' }}>
          En caso de duda, consulte siempre las fuentes oficiales del Gobierno de Serbia.
        </p>
        <p style={{ 
          margin: '0', 
          fontSize: window.innerWidth < 768 ? '0.7rem' : '0.75rem', 
          color: '#6b7280',
          fontStyle: 'italic'
        }}>
          Información basada en fuentes oficiales: welcometoserbia.gov.rs, mup.gov.rs, nsz.gov.rs, mfa.gov.rs
        </p>
      </footer>
      </div>
    </>
  );
}

export default App;
