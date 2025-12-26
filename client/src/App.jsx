import React, { useState, useEffect } from 'react';
import appController from './adapters/BrowserAdapter';
// Use ESM version directly
import { deriveUIState, UI_MODES } from './core_esm/UIRenderLogic.js';

import { CrisisBanner, BlockedScreen, FlowRenderer, Checklist, InputBar, DebugPanel, DailyProblemsList, QuickAccessCards, WelcomeHero } from './components/UIComponents';

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
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #E3F2FD 0%, #BBDEFB 100%)',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
    }}>
      <div style={{
        textAlign: 'center',
        padding: '40px 20px',
        background: 'rgba(255, 255, 255, 0.9)',
        borderRadius: '16px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
        backdropFilter: 'blur(10px)'
      }}>
        <div style={{
          display: 'inline-block',
          width: '48px',
          height: '48px',
          border: '4px solid #E3F2FD',
          borderTop: '4px solid #007BFF',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
          marginBottom: '20px'
        }}></div>
        <p style={{
          color: '#1565C0',
          fontSize: '1rem',
          margin: '0',
          fontWeight: '500'
        }}>
          🛡️ Iniciando tu sistema de protección...
        </p>
        <p style={{
          color: '#64B5F6',
          fontSize: '0.875rem',
          margin: '8px 0 0 0'
        }}>
          Estamos aquí para ayudarte
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
      
      {/* Background with subtle gradient */}
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #E3F2FD 0%, #F3E5F5 50%, #E8F5E8 100%)',
        position: 'relative'
      }}>
        
        {/* Main container with proper centering */}
        <div style={{ 
          maxWidth: '800px', 
          margin: '0 auto', 
          padding: window.innerWidth < 768 ? '16px' : '24px',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
          lineHeight: '1.6',
          color: '#1a1a1a'
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
                <main id="main-content" role="main" aria-label="Información de seguridad para inmigrantes" className="fade-in">
                  
                  {/* Welcome Hero Section */}
                  <WelcomeHero />
                  
                  {/* Quick Access Cards */}
                  <QuickAccessCards />

                  {/* DAILY PROBLEMS - MOVED UP FOR PROTECTION PRIORITY */}
                  {appOutput?.daily_problems && (
                    <DailyProblemsList problems={appOutput.daily_problems} />
                  )}

                  {/* Common Risks Section - Only show if no daily problems detected */}
                  {(!appOutput?.daily_problems || appOutput.daily_problems.length === 0) && (
                    <section aria-label="Alertas de riesgo comunes" style={{ marginBottom: '32px' }}>
                      <div style={{
                        textAlign: 'center',
                        marginBottom: '20px',
                        padding: '20px',
                        background: 'rgba(76, 175, 80, 0.1)',
                        borderRadius: '16px',
                        border: '2px solid rgba(76, 175, 80, 0.2)',
                        backdropFilter: 'blur(10px)'
                      }}>
                        <div style={{
                          fontSize: '2rem',
                          marginBottom: '8px'
                        }}>🛡️</div>
                        <p style={{
                          margin: '0 0 8px 0',
                          fontSize: '1.1rem',
                          color: '#2E7D32',
                          fontWeight: '600'
                        }}>
                          Sin riesgos críticos detectados hoy
                        </p>
                        <p style={{
                          margin: '0',
                          fontSize: '0.9rem',
                          color: '#388E3C'
                        }}>
                          Tu situación parece estable. Aquí tienes información preventiva importante.
                        </p>
                      </div>
                      <Checklist 
                        title="Situaciones que requieren atención especial" 
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

          {/* Enhanced Footer */}
          <footer style={{ 
            marginTop: '48px', 
            paddingTop: '32px',
            borderTop: '1px solid rgba(255, 255, 255, 0.3)', 
            fontSize: window.innerWidth < 768 ? '0.8rem' : '0.875rem', 
            color: '#546E7A',
            textAlign: 'center',
            background: 'rgba(255, 255, 255, 0.7)',
            borderRadius: '16px',
            padding: '24px',
            backdropFilter: 'blur(10px)'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '16px',
              gap: '8px'
            }}>
              <span style={{ fontSize: '1.5rem' }}>🇷🇸</span>
              <strong style={{ color: '#1565C0', fontSize: '1.1rem' }}>ConsejoSeguro</strong>
            </div>
            
            <p style={{ margin: '0 0 12px 0', color: '#37474F' }}>
              Estamos aquí para ayudarte a vivir con tranquilidad en Serbia
            </p>
            <p style={{ margin: '0 0 8px 0', fontSize: '0.8rem' }}>
              Esta herramienta es informativa y no reemplaza asesoría legal profesional.
            </p>
            <p style={{ margin: '0 0 16px 0', fontSize: '0.8rem' }}>
              En caso de duda, consulte siempre las fuentes oficiales del Gobierno de Serbia.
            </p>
            
            <div style={{
              padding: '16px',
              background: 'rgba(25, 118, 210, 0.1)',
              borderRadius: '12px',
              border: '1px solid rgba(25, 118, 210, 0.2)'
            }}>
              <p style={{ 
                margin: '0', 
                fontSize: '0.75rem', 
                color: '#1565C0',
                fontWeight: '500'
              }}>
                📋 Toda la información se basa exclusivamente en fuentes oficiales del Gobierno de Serbia para garantizar precisión y actualización. Siempre verifica en welcometoserbia.gov.rs o las páginas ministeriales correspondientes.
              </p>
              <p style={{
                margin: '8px 0 0 0',
                fontSize: '0.7rem',
                color: '#64B5F6'
              }}>
                Fuentes: welcometoserbia.gov.rs • mup.gov.rs • nsz.gov.rs • mfa.gov.rs
              </p>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
}

export default App;
