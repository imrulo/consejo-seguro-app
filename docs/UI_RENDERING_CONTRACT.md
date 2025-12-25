# UI Rendering Contract (MVP)

> **Status:** FROZEN  
> **Authority:** AppController Output  
> **Principle:** The UI is a "Dumb Renderer". It never decides flows, priority, or urgency.

---

## 1. Output Authority
The UI **MUST** derive its entire state from the `AppController` output JSON.
It is **FORBIDDEN** to maintain internal state regarding system blocking, flow selection, or urgency.

## 2. Canonical UI States
The UI can only be in one of the following 3 states at any given frame:

| State | Condition (AppController Output) | Verification |
|-------|----------------------------------|--------------|
| **BLOCKED** | `system_state === 'blocked'` | System is hard-stopped by Guardian or Dependencies. |
| **CRISIS** | `zone === 'CRISIS'` OR `presentation_mode === 'forced_alert'` | Immediate danger or urgency requiring override. |
| **OK** | `system_state === 'ok'` AND not Crisis | Normal operation (either Idle or Active Flow). |

## 3. Rendering Rules (The "Discipline")

### Rule A: The Exclusion Principle
- **IF** `has_active_flow === true`:
    - RENDER: `<FlowRenderer />`
    - SUPPRESS: `<Onboarding />`, `<GenericChecklists />`, `<Tips />`
    - *Rationale:* Once user intent is clear, noise must be zero.

### Rule B: The Block Imperative
- **IF** `state === BLOCKED`:
    - RENDER: `<BlockScreen />` (Reason + Safe Action)
    - HIDE: All inputs, flows, and navigation potentially dangerous.

### Rule C: Crisis Precedence
- **IF** `state === CRISIS`:
    - RENDER: `<CrisisAlert />` (Top priority, full width)
    - ALLOW: `<FlowRenderer />` underneath if safe (but usually Crisis implies "Stop and Go to Hospital/MUP").

### Rule D: Dumb Flow Rendering
- The `<FlowRenderer />` component receives the `steps` array from AppController.
- It iterates and renders. It **DOES NOT** reorder, filter, or alter text.
- Live Data placeholders (e.g., prices) are assumed resolved by the backend/controller.

## 4. Component Model (MVP)
The UI is composed of these pure components mapping to data fields:

```
<AppContainer>
  <!-- 1. Crisis Layer -->
  { isCrisis && <CrisisAlert urgency={urgency} action={next_action} /> }

  <!-- 2. Block Layer (Exclusive) -->
  { isBlocked ? (
      <BlockScreen reason={blocked_reason} />
  ) : (
      <!-- 3. Content Layer -->
      <ContentArea>
          { hasActiveFlow ? (
             <FlowRenderer flow={flow_id} steps={steps} zone={zone} />
          ) : (
             <IdleState /> <!-- Generic Welcome/Checklists -->
          )}
      </ContentArea>
  )}
</AppContainer>
```

## 5. Live Data Representation
- Flows contain resolved strings (e.g., "50 RSD").
- UI renders string as-is.
- UI **DOES NOT** fetch prices or check APIs. Live Data Layer checks are upstream.

---

**Signed:** Architecture Team
**Date:** 2024-12-25
