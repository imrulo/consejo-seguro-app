# ConsejoSeguro

**ConsejoSeguro** is a Progressive Web Application (PWA) designed to serve as a comprehensive, offline-first survival guide for immigrants and refugees in Serbia. It provides verified official information, emergency resources, and empathetic support to help users navigate bureaucracy, healthcare, and daily life with confidence.

![ConsejoSeguro Preview](/public/og-image.png)

## 🚀 Features

- **Offline-First & PWA**: Fully functional without an internet connection. Installable on mobile devices (iOS/Android) as a native-like app.
- **Privacy-Focused**: No login required, no tracking of personal data. All sensitive interactions remain local on the device.
- **Immediate Action**: One-tap access to emergency numbers (Ambulance, Police) and essential tools.
- **Empathetic UX**: Designed for high-stress situations with calm, clear, and accessible UI (WCAG 2.2 AA compliant).
- **Practical Tools**:
  - **Translator Cards**: Audio-enabled phrases for medical and legal situations.
  - **Bureaucracy Map**: Step-by-step guides for visas, residence, and white card (Beli Karton).
  - **Transport Guide**: Instructions for SMS bus payments to avoid fines.
  - **Daily Check-in**: Local habit-forming tool to track well-being.

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Deployment**: [Vercel](https://vercel.com/)
- **Analytics**: Vercel Analytics (Privacy-preserving)

## 🏁 Getting Started

To run the project locally:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/imrulo/consejo-seguro-app.git
    cd consejo-seguro-app
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```

4.  **Open in browser:**
    Navigate to [http://localhost:3000](http://localhost:3000).

## 📂 Project Structure

- `/app`: Application routes, layouts, and global logic (Next.js App Router).
- `/components`: Reusable UI components (FeatureCards, Modals, etc.).
- `/hooks`: Custom React hooks (e.g., `useLocalAnalytics`).
- `/public`: Static assets, manifest.json, and service worker configuration.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

If you find this project useful or want to support its development for vulnerable communities:

- **GitHub Sponsors**: [Sponsor imrulo](https://github.com/sponsors/imrulo)
- **Crypto (ETH)**: `imrulo.eth` (0xc7427F23C55a980cD2Ceea25eDb3b372af70aF0E)

## 📄 License

This project is open source and available under the [MITD License](LICENSE).
