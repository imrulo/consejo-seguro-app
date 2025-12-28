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
    },
  },
  plugins: [],
};
export default config;
