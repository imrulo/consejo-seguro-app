import React, { useState, useEffect } from 'react';
import { AppController } from './adapters/BrowserAdapter';
// Fix import for CJS module
import * as UILogic from '@core/ui_render_logic';
const { deriveUIState, UI_MODES } = UILogic; // Or UILogic.default if wrapped

import { CrisisBanner, BlockedScreen, FlowRenderer, Checklist, InputBar, DebugPanel, DailyProblemsList } from './components/UIComponents';

const appController = new AppController();

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
  useEffect(() => {
    runSystem();
  }, [guardianState, userInput]);

  const runSystem = () => {
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
  };

  if (!uiState) return <div>Booting Guardian...</div>;

  const { mode, components } = uiState;

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', fontFamily: 'sans-serif' }}>
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
            <div>
              <h1>ConsejoSeguro 🇷🇸</h1>
              <p>Asistente de Inmigración Determinista</p>
              <Checklist title="Sugerencias Rápidas" items={[
                "Registra tu Beli Karton en 24h",
                "No dejes vencer tu visa",
                "Mantén tu pasaporte válido"
              ]} />
            </div>
          )}
        </div>
      )}

          )}
    </div>
  )
}

{/* 4. DAILY PROBLEMS (Always visible if not blocked, even during flow if allowed) */ }
{
  !components.blockScreen.visible && appOutput?.daily_problems && (
    <DailyProblemsList problems={appOutput.daily_problems} />
  )
}

{/* INPUT ALWAYS VISIBLE UNLESS BLOCKED */ }
{
  !components.blockScreen.visible && (
    <InputBar onSend={setUserInput} loading={false} />
  )
}

{/* DEBUG PANEL: Hidden in production unless ?debug=true */ }
{
  window.location.search.includes('debug=true') && (
    <DebugPanel guardianState={guardianState} setGuardianState={setGuardianState} />
  )
}

<div style={{ marginTop: '30px', borderTop: '1px solid #ccc', fontSize: '0.7em', color: '#999', paddingTop: '10px' }}>
  <p><strong>ConsejoSeguro Beta (RC0)</strong></p>
  <p>Esta herramienta es informativa y no constituye asesoramiento legal profesional.</p>
  <p>En caso de duda, consulte siempre las fuentes oficiales del Gobierno de Serbia.</p>
</div>
    </div >
  );
}

export default App;
