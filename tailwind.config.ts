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
          champagne: "var(--pg-gold-champagne)",
          rose: "var(--pg-gold-rose)",
          antique: "var(--pg-gold-antique)",
          accent: "var(--pg-accent)",
          ink: "var(--pg-ink)",
          text: "var(--pg-text)",
          "text-muted": "var(--pg-text-muted)",
          "text-faint": "var(--pg-text-faint)",
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
          "linear-gradient(135deg, #f2d488 0%, #d4a94b 40%, #b8862f 72%, #936b22 100%)",
        "gold-sheen":
          "linear-gradient(120deg, transparent 30%, rgba(255,248,225,0.7) 50%, transparent 70%)",
      },
      boxShadow: {
        card: "0 18px 50px -24px rgba(90,64,20,0.30)",
        "card-hover": "0 28px 70px -28px rgba(90,64,20,0.40)",
        glow: "0 0 0 1px rgba(184,134,47,0.20), 0 14px 50px -12px rgba(184,134,47,0.40)",
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
