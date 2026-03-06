import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "#020617",
        surface: "#020617",
        "surface-elevated": "#020617",
        primary: {
          DEFAULT: "#0ea5e9",
          foreground: "#020617"
        },
        accent: "#f97316"
      },
      boxShadow: {
        "glow-primary": "0 0 25px rgba(14,165,233,0.6)",
        "glow-accent": "0 0 25px rgba(249,115,22,0.6)"
      }
    }
  },
  plugins: []
};

export default config;

