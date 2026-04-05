import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "sumi-black": "#0d0d0d",
        "washi-white": "#f0ede8",
        "kin-gold": "#b89a6a",
        "mist-gray": "#3a3a3a",
        "beni-red": "#8b3a3a",
      },
      fontFamily: {
        "serif-jp": ['"Noto Serif JP"', "serif"],
        "sans-jp": ['"Noto Sans JP"', "sans-serif"],
        "serif-en": ['"Cormorant Garamond"', "serif"],
        "sans-en": ['"Inter"', "sans-serif"],
      },
      fontSize: {
        "heading-xl": ["3rem", { lineHeight: "1.2" }],
        "heading-lg": ["2rem", { lineHeight: "1.3" }],
        "heading-md": ["1.5rem", { lineHeight: "1.4" }],
        "body-lg": ["1.125rem", { lineHeight: "1.8" }],
        "body": ["1rem", { lineHeight: "1.8" }],
        "body-sm": ["0.875rem", { lineHeight: "1.6" }],
      },
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
        "30": "7.5rem",
      },
    },
  },
  plugins: [],
};
export default config;
