import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        pg: {
          bg: "var(--pg-bg)",
          surface: "var(--pg-surface)",
          card: "var(--pg-card)",
          "card-hover": "var(--pg-card-hover)",
          navy: "var(--pg-navy)",
          "navy-deep": "var(--pg-navy-deep)",
          "navy-text": "var(--pg-navy-text)",
          "navy-muted": "var(--pg-navy-muted)",
          champagne: "var(--pg-gold-champagne)",
          rose: "var(--pg-gold-rose)",
          antique: "var(--pg-gold-antique)",
          accent: "var(--pg-accent)",
          ink: "var(--pg-ink)",
          text: "var(--pg-text)",
          "text-muted": "var(--pg-text-muted)",
          "text-faint": "var(--pg-text-faint)",
          panel: "var(--pg-panel)",
          "panel-card": "var(--pg-panel-card)",
          "panel-ink": "var(--pg-panel-ink)",
          "panel-muted": "var(--pg-panel-muted)",
          "panel-border": "var(--pg-panel-border)",
          border: "var(--pg-border)",
          "border-strong": "var(--pg-border-strong)",
          positive: "var(--pg-positive)",
          negative: "var(--pg-negative)",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
      },
      borderColor: {
        DEFAULT: "var(--pg-border)",
      },
      maxWidth: {
        container: "1320px",
        prose: "68ch",
        legal: "72ch",
      },
      backgroundImage: {
        "gold-grad":
          "linear-gradient(135deg, #f6dc96 0%, #e0bd6f 38%, #cda24a 70%, #a87f2c 100%)",
        "gold-sheen":
          "linear-gradient(120deg, transparent 30%, rgba(255,244,214,0.75) 50%, transparent 70%)",
      },
      boxShadow: {
        card: "0 18px 50px -26px rgba(45,58,80,0.22)",
        "card-hover": "0 28px 70px -30px rgba(45,58,80,0.30)",
        glow: "0 0 0 1px rgba(184,134,47,0.22), 0 14px 50px -12px rgba(184,134,47,0.38)",
        panel: "0 20px 50px -28px rgba(45,58,80,0.22)",
        "panel-hover": "0 30px 70px -30px rgba(45,58,80,0.30)",
      },
      letterSpacing: {
        luxe: "0.22em",
      },
      transitionTimingFunction: {
        luxe: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      keyframes: {
        shimmer: {
          "0%": { transform: "translateX(-150%)" },
          "100%": { transform: "translateX(150%)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
      animation: {
        marquee: "marquee 40s linear infinite",
        "marquee-slow": "marquee 70s linear infinite",
        "fade-up": "fade-up 0.7s cubic-bezier(0.16,1,0.3,1) both",
        float: "float 6s ease-in-out infinite",
        shimmer: "shimmer 7s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
