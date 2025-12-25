# Deployment Guide: ConsejoSeguro RC0 (Production)

> **Target:** Vercel (Static / PWA)
> **Root Directory:** `./client`
> **Build Command:** `npm run build`
> **Output Directory:** `dist`

## 1. Quick Deploy (Vercel CLI)

If you have valid Vercel credentials, deploy immediately:

```bash
cd client
vercel deploy --prod
```

## 2. Manual Configuration (Vercel Dashboard)

1.  **New Project:** Select the repository `imrulo/consejo-seguro-app`.
2.  **Root Directory:** Change from `.` to `client`.
3.  **Framework Preset:** Vite.
4.  **Build Command:** `npm run build` (default).
5.  **Output Directory:** `dist` (default).
6.  **Environment Variables:** None required (Static implementation).

## 3. Safety Verification (Post-Deploy)

Perform this **Smoke Test** immediately after the URL is live:

1.  **Check Cleanliness:** Open DevTools > Console. It must be empty (no logs/debugs).
2.  **Verify Routing:** Reload the page. It should not 404 (handled by `vercel.json`).
3.  **Test Live Data:** Type "transporte belgrado". Confirm price "50 RSD" is visible.
4.  **Test Audit:** Type "renovar residencia". Confirm footer says "ConsejoSeguro Beta".
5.  **Test Debug Lock:** Add `?debug=true` to URL. Confirm Debug Panel appears. Remove param. Confirm it vanishes.
6.  **Offline Check:** Disconnect WiFi. Refresh. App should load (if PWA/Cache configured) or at least navigate within loaded flows without network errors.

## 4. Rollback Protocol

If a critical safety violation is found (e.g., hallucinated advice):
1.  Go to Vercel Dashboard > Deployments.
2.  Select the **previous** safe deployment.
3.  Click "Instant Rollback".
4.  The frozen architecture ensures no database corruption occurs.

---

**Signed:** Antigravity DevOps
