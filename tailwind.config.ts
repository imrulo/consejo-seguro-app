import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#003366", // Confianza
        secondary: "#008000", // Esperanza
        accent: "#FFA500", // Alertas/CTAs
        background: "#FFFFFF",
      },
      fontFamily: {
        sans: ["var(--font-roboto)", "sans-serif"],
        condensed: ["var(--font-roboto-condensed)", "sans-serif"],
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideInTop: {
          '0%': { transform: 'translateY(-1rem)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideInBottom: {
          '0%': { transform: 'translateY(1rem)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-in-from-top-4': 'slideInTop 0.5s ease-out',
        'slide-in-from-top-2': 'slideInTop 0.3s ease-out',
      }
    },
  },
  plugins: [],
};
export default config;
