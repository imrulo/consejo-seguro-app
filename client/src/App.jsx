import React, { useState, useEffect } from 'react';
import appController from './adapters/BrowserAdapter';
// Use ESM version directly
import { deriveUIState, UI_MODES } from './core_esm/UIRenderLogic.js';

import { 
    CrisisBanner, 
    BlockedScreen, 
    FlowRenderer, 
    Checklist, 
    InputBar, 
    DebugPanel, 
    DailyProblemsList, 
    QuickAccessCards, 
    WelcomeHero,
    ComprehensiveCategories,
    NavigationBreadcrumbs,
    FloatingHomeButton
} from './components/UIComponents';

function App() {
    // SYSTEM STATE
    const [guardianState, setGuardianState] = useState({
        admin_block: false,
        days: 90
    });
    const [userInput, setUserInput] = useState('');
    const [appOutput, setAppOutput] = useState(null);
    const [uiState, setUiState] = useState(null);
    
    // NAVIGATION STATE
    const [currentView, setCurrentView] = useState('home'); // 'home', 'categories', 'flow'
    const [navigationPath, setNavigationPath] = useState([]);
    const [showFloatingHome, setShowFloatingHome] = useState(false);

    // Responsive detection
    const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);
    
    useEffect(() => {
        if (typeof window === 'undefined') return;
        
        const handleResize = () => setWindowWidth(window.innerWidth);
        const handleScroll = () => setShowFloatingHome(window.scrollY > 300);
        
        window.addEventListener('resize', handleResize);
        window.addEventListener('scroll', handleScroll);
        
        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const device = {
        isMobile: windowWidth < 768,
        isTablet: windowWidth >= 768 && windowWidth < 1024,
        isDesktop: windowWidth >= 1024,
        width: windowWidth
    };

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
                    passport_valid_6_months: true,
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
        
        // Auto-switch to flow view if flow is active
        if (output?.flow_active) {
            setCurrentView('flow');
        }
    }, [guardianState, userInput]);

    useEffect(() => {
        runSystem();
    }, [runSystem]);

    const handleNavigation = (path) => {
        setNavigationPath(path);
        if (path.length === 0) {
            setCurrentView('home');
        }
    };

    const handleHomeClick = () => {
        setCurrentView('home');
        setNavigationPath([]);
        setUserInput('');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (!uiState) return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #E3F2FD 0%, #BBDEFB 50%, #E8F5E8 100%)',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
        }}>
            <div style={{
                textAlign: 'center',
                padding: device.isMobile ? '32px 20px' : '48px 32px',
                background: 'rgba(255, 255, 255, 0.95)',
                borderRadius: '24px',
                boxShadow: '0 12px 48px rgba(0, 0, 0, 0.15)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                maxWidth: '400px',
                margin: '0 20px'
            }}>
                <div style={{
                    display: 'inline-block',
                    width: '56px',
                    height: '56px',
                    border: '4px solid #E3F2FD',
                    borderTop: '4px solid #1565C0',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite',
                    marginBottom: '24px'
                }}></div>
                <h2 style={{
                    color: '#1565C0',
                    fontSize: device.isMobile ? '1.1rem' : '1.2rem',
                    margin: '0 0 8px 0',
                    fontWeight: '700'
                }}>
                    🛡️ Iniciando tu sistema de protección
                </h2>
                <p style={{
                    color: '#64B5F6',
                    fontSize: device.isMobile ? '0.85rem' : '0.9rem',
                    margin: '0',
                    lineHeight: '1.5'
                }}>
                    Preparando información oficial actualizada para ayudarte en Serbia
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
            {/* Skip to main content for accessibility */}
            <a href="#main-content" className="skip-link">
                Saltar al contenido principal
            </a>
            
            {/* Responsive background with enhanced gradients */}
            <div style={{
                minHeight: '100vh',
                background: device.isMobile ? 
                    'linear-gradient(180deg, #E3F2FD 0%, #F3E5F5 50%, #E8F5E8 100%)' :
                    'linear-gradient(135deg, #E3F2FD 0%, #F3E5F5 30%, #E8F5E8 60%, #FFF3E0 100%)',
                position: 'relative'
            }}>
                
                {/* Main container with responsive padding */}
                <div style={{ 
                    maxWidth: device.isMobile ? '100%' : device.isTablet ? '900px' : '1200px',
                    margin: '0 auto', 
                    padding: device.isMobile ? '16px' : device.isTablet ? '24px' : '32px',
                    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                    lineHeight: '1.6',
                    color: '#1a1a1a'
                }}>
                    
                    {/* Navigation Breadcrumbs */}
                    <NavigationBreadcrumbs 
                        currentPath={navigationPath}
                        onNavigate={handleNavigation}
                    />
                    
                    {/* 1. LAYER: CRISIS - Always visible when active */}
                    {components.crisisAlert.visible && (
                        <CrisisBanner 
                            urgency={components.crisisAlert.urgency} 
                            action={components.crisisAlert.action} 
                        />
                    )}

                    {/* 2. LAYER: BLOCKED - Takes over entire interface */}
                    {components.blockScreen.visible ? (
                        <BlockedScreen 
                            reason={components.blockScreen.reason} 
                            safeAction={components.blockScreen.safeAction} 
                        />
                    ) : (
                        /* 3. LAYER: CONTENT - Main application content */
                        <div>
                            {/* 3A. FLOW - Active procedures */}
                            {components.flowRenderer.visible && currentView === 'flow' && (
                                <div>
                                    <button
                                        onClick={handleHomeClick}
                                        style={{
                                            marginBottom: '20px',
                                            padding: '8px 16px',
                                            background: 'rgba(59, 130, 246, 0.1)',
                                            border: '1px solid rgba(59, 130, 246, 0.3)',
                                            borderRadius: '8px',
                                            color: '#3b82f6',
                                            cursor: 'pointer',
                                            fontSize: '0.9rem',
                                            fontWeight: '500',
                                            transition: 'all 0.2s'
                                        }}
                                        onMouseEnter={e => {
                                            e.target.style.background = 'rgba(59, 130, 246, 0.2)';
                                            e.target.style.transform = 'translateY(-1px)';
                                        }}
                                        onMouseLeave={e => {
                                            e.target.style.background = 'rgba(59, 130, 246, 0.1)';
                                            e.target.style.transform = 'translateY(0)';
                                        }}
                                    >
                                        ← Volver al inicio
                                    </button>
                                    <FlowRenderer
                                        steps={components.flowRenderer.data.steps}
                                        flowId={components.flowRenderer.data.flowId}
                                        zone={components.flowRenderer.data.zone}
                                    />
                                </div>
                            )}

                            {/* 3B. HOME / CATEGORIES - Main interface */}
                            {(components.idleState.visible || currentView === 'home') && currentView !== 'flow' && (
                                <main id="main-content" role="main" aria-label="Guía completa para inmigrantes en Serbia" className="fade-in">
                                    
                                    {/* Welcome Hero Section */}
                                    <WelcomeHero />
                                    
                                    {/* Quick Access Cards */}
                                    <QuickAccessCards />

                                    {/* DAILY PROBLEMS - Priority section */}
                                    {appOutput?.daily_problems && appOutput.daily_problems.length > 0 && (
                                        <DailyProblemsList problems={appOutput.daily_problems} />
                                    )}

                                    {/* Comprehensive Categories - Main content */}
                                    <ComprehensiveCategories />

                                    {/* Common Risks Section - Only show if no daily problems detected */}
                                    {(!appOutput?.daily_problems || appOutput.daily_problems.length === 0) && (
                                        <section aria-label="Estado de protección actual" style={{ marginBottom: '32px' }}>
                                            <div style={{
                                                textAlign: 'center',
                                                marginBottom: '20px',
                                                padding: device.isMobile ? '20px' : '24px',
                                                background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(34, 197, 94, 0.1) 100%)',
                                                borderRadius: '20px',
                                                border: '2px solid rgba(16, 185, 129, 0.2)',
                                                backdropFilter: 'blur(20px)'
                                            }}>
                                                <div style={{
                                                    fontSize: device.isMobile ? '2.5rem' : '3rem',
                                                    marginBottom: '12px'
                                                }}>🛡️</div>
                                                <p style={{
                                                    margin: '0 0 8px 0',
                                                    fontSize: device.isMobile ? '1rem' : '1.2rem',
                                                    color: '#059669',
                                                    fontWeight: '700'
                                                }}>
                                                    Sin riesgos críticos detectados
                                                </p>
                                                <p style={{
                                                    margin: '0',
                                                    fontSize: device.isMobile ? '0.85rem' : '0.9rem',
                                                    color: '#10b981',
                                                    lineHeight: '1.5'
                                                }}>
                                                    Tu situación parece estable. Explora las categorías para mantenerte informado y prevenir problemas futuros.
                                                </p>
                                            </div>
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

                    {/* Enhanced Footer with official sources */}
                    <footer style={{ 
                        marginTop: '64px', 
                        paddingTop: '40px',
                        borderTop: '1px solid rgba(255, 255, 255, 0.3)', 
                        fontSize: device.isMobile ? '0.8rem' : '0.875rem', 
                        color: '#546E7A',
                        textAlign: 'center',
                        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, rgba(248, 250, 252, 0.8) 100%)',
                        borderRadius: '20px',
                        padding: device.isMobile ? '24px 16px' : '32px 24px',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid rgba(255, 255, 255, 0.3)'
                    }}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: '20px',
                            gap: '12px'
                        }}>
                            <span style={{ fontSize: '2rem' }}>🇷🇸</span>
                            <div>
                                <strong style={{ 
                                    color: '#1565C0', 
                                    fontSize: device.isMobile ? '1.2rem' : '1.4rem',
                                    display: 'block'
                                }}>
                                    ConsejoSeguro
                                </strong>
                                <span style={{ 
                                    color: '#64748b', 
                                    fontSize: '0.8rem',
                                    fontWeight: '500'
                                }}>
                                    Tu compañero de confianza en Serbia
                                </span>
                            </div>
                        </div>
                        
                        <p style={{ 
                            margin: '0 0 16px 0', 
                            color: '#37474F',
                            fontSize: device.isMobile ? '0.9rem' : '1rem',
                            fontWeight: '500'
                        }}>
                            Información actualizada para vivir con tranquilidad y seguridad
                        </p>
                        
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: device.isMobile ? '1fr' : 'repeat(2, 1fr)',
                            gap: '16px',
                            marginBottom: '24px'
                        }}>
                            <div style={{
                                padding: '16px',
                                background: 'rgba(59, 130, 246, 0.1)',
                                borderRadius: '12px',
                                border: '1px solid rgba(59, 130, 246, 0.2)'
                            }}>
                                <p style={{ 
                                    margin: '0 0 8px 0', 
                                    fontSize: '0.8rem', 
                                    color: '#1e40af',
                                    fontWeight: '600'
                                }}>
                                    📋 Fuentes Oficiales Verificadas
                                </p>
                                <p style={{
                                    margin: '0',
                                    fontSize: '0.7rem',
                                    color: '#3730a3',
                                    lineHeight: '1.4'
                                }}>
                                    welcometoserbia.gov.rs • mup.gov.rs • mfa.gov.rs • nsz.gov.rs • rfzo.rs
                                </p>
                            </div>
                            
                            <div style={{
                                padding: '16px',
                                background: 'rgba(16, 185, 129, 0.1)',
                                borderRadius: '12px',
                                border: '1px solid rgba(16, 185, 129, 0.2)'
                            }}>
                                <p style={{ 
                                    margin: '0 0 8px 0', 
                                    fontSize: '0.8rem', 
                                    color: '#059669',
                                    fontWeight: '600'
                                }}>
                                    ⚖️ Aviso Legal
                                </p>
                                <p style={{
                                    margin: '0',
                                    fontSize: '0.7rem',
                                    color: '#065f46',
                                    lineHeight: '1.4'
                                }}>
                                    Información orientativa. Para casos específicos, consulte siempre las autoridades competentes.
                                </p>
                            </div>
                        </div>
                        
                        <p style={{
                            margin: '0',
                            fontSize: '0.75rem',
                            color: '#9ca3af',
                            fontStyle: 'italic'
                        }}>
                            Última actualización: Diciembre 2024 • Revisión mensual de contenidos
                        </p>
                    </footer>
                </div>
                
                {/* Floating Home Button */}
                {showFloatingHome && currentView !== 'home' && (
                    <FloatingHomeButton onClick={handleHomeClick} />
                )}
            </div>
        </>
    );
}

export default App;
