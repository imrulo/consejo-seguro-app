# ConsejoSeguro

**ConsejoSeguro** is a Progressive Web Application (PWA) designed to serve as a comprehensive, offline-first survival guide for immigrants and refugees in Serbia. It provides verified official information, emergency resources, and empathetic support to help users navigate bureaucracy, healthcare, and daily life with confidence.

![ConsejoSeguro Preview](/public/og-image.png)

---

## 🎯 Our Mission & Vision

### The Problem
Moving to a new country like Serbia can be overwhelming. Language barriers, complex bureaucracy ("The White Card"), and lack of clear information often leave immigrants vulnerable to fines, legal issues, and social isolation.

### The Solution
**ConsejoSeguro** acts as a **digital bridge**. We don't just provide information; we provide *context and calm*. By centralizing critical tools—from emergency numbers to bus payment guides—in an offline-capable app, we empower users to regain control of their situation from Day 1.

### Our Vision
To create a world where no immigrant feels lost or unsafe due to a lack of information. We believe that **access to official, clear guidance is a fundamental right**, not a privilege for those who speak the local language.

---

## 🚀 Key Features

- **🛡️ Offline-First & PWA**: Designed for unstable connections. Works fully without internet once loaded. Installable on any mobile device.
- **🔒 Privacy by Design**: Zero data collection. No accounts, no servers, no tracking. Users' safety is paramount.
- **🆘 Immediate Action**: One-tap access to Ambulance (194), Police (192), and crisis support.
- **🧠 Empathetic UX**: Interface designed for high-stress cognitive loads—clean, calming colors, and simple "Yes/No" decision trees.
- **🛠️ Practical Tools**:
  - **Audio Translator**: Medical and legal phrases pronounced by native speakers.
  - **Bureaucracy Map**: Visual roadmap for Visa D, Temporary Residence, and Beli Karton.
  - **Transport Survival**: Step-by-step guide to SMS bus payments to avoid the 5000 RSD fine.
  - **Daily Check-in**: A gentle, private tool to track emotional well-being.

## 🛠️ Tech Stack

Built with performance and accessibility at the core:

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router) for server-side rendering and speed.
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) for a responsive, mobile-first design system.
- **Language**: [TypeScript](https://www.typescriptlang.org/) for robust, type-safe code.
- **Icons**: [Lucide React](https://lucide.dev/) for lightweight, consistent visual language.
- **Deployment**: [Vercel](https://vercel.com/) with global edge network.
- **Analytics**: Privacy-preserving Vercel Analytics (GDPR compliant).

## 🏁 Getting Started

To run the project locally and contribute:

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

## 🤝 Contributing & Support

This is an open-source initiative driven by community support. Contributions—code, translations, or local tips are welcome!

If you believe in this mission and want to support the development:

- **GitHub Sponsors**: [Sponsor imrulo](https://github.com/sponsors/imrulo)
- **Crypto (ETH)**: `imrulo.eth` (0xc7427F23C55a980cD2Ceea25eDb3b372af70aF0E)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
