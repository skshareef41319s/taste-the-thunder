/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        thunder: {
          50: "#eef5ff",
          100: "#d8e8ff",
          200: "#b1d2ff",
          300: "#7cb6ff",
          400: "#4a93ff",
          500: "#1d6fff",
          600: "#1858db",
          700: "#173eb0",
          800: "#132f83",
          900: "#08152f",
        },
      },
      boxShadow: {
        electric: "0 0 40px rgba(94, 170, 255, 0.28)",
        "electric-strong": "0 0 80px rgba(94, 170, 255, 0.45)",
      },
      keyframes: {
        drift: {
          "0%, 100%": { transform: "translate3d(0, 0, 0)" },
          "50%": { transform: "translate3d(0, -16px, 0)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.45" },
          "50%": { opacity: "1" },
        },
        lightning: {
          "0%, 90%, 100%": { opacity: "0" },
          "91%": { opacity: "0.9" },
          "92%": { opacity: "0.15" },
          "93%": { opacity: "0.85" },
          "94%": { opacity: "0" },
        },
        floatSlow: {
          "0%, 100%": { transform: "translate3d(0, 0, 0) scale(1)" },
          "50%": { transform: "translate3d(0, -18px, 0) scale(1.02)" },
        },
      },
      animation: {
        drift: "drift 10s ease-in-out infinite",
        pulseGlow: "pulseGlow 2.8s ease-in-out infinite",
        lightning: "lightning 8s linear infinite",
        floatSlow: "floatSlow 14s ease-in-out infinite",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};
