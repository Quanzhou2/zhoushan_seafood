import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ocean: {
          50: "#f0f6fb",
          100: "#dbe9f4",
          200: "#b8d3ea",
          300: "#8bb5d9",
          400: "#5b91c4",
          500: "#3b75b0",
          600: "#2d5d94",
          700: "#264a78",
          800: "#1f3a5e",
          900: "#102a43",
          950: "#0a1f3d",
        },
        coral: {
          50: "#fff4ed",
          100: "#ffe6d4",
          200: "#ffc9a8",
          300: "#ffa371",
          400: "#ff7438",
          500: "#ff5018",
          600: "#f0370e",
          700: "#c7280d",
          800: "#9d2213",
          900: "#7f1f13",
        },
        seafoam: {
          50: "#f0faf8",
          100: "#d8f1ec",
          200: "#b3e2da",
          300: "#86ccc1",
          400: "#5eaaa8",
          500: "#449391",
          600: "#367676",
          700: "#2d5f60",
          800: "#274d4e",
          900: "#234142",
        },
        sand: {
          50: "#fdfbf4",
          100: "#faf6e6",
          200: "#f3ebca",
          300: "#e8d99e",
          400: "#dcc370",
          500: "#cfae50",
          600: "#b8943f",
          700: "#947335",
          800: "#785c32",
          900: "#634c2b",
        },
      },
      fontFamily: {
        display: ["Georgia", "'Songti SC'", "'STSong'", "serif"],
        body: ["-apple-system", "BlinkMacSystemFont", "'Segoe UI'", "Roboto", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "monospace"],
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "slide-up": "slideUp 0.7s ease-out forwards",
        "wave": "wave 3s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        wave: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
