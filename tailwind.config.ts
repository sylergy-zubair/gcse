import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary colors from Figma
        primary: {
          100: "#DCF0FF",
          300: "#428DE7",
          500: "#0B5FD7",
          700: "#05369A",
        },
        // Accent color
        accent: {
          500: "#CD8400",
        },
        // Neutral colors
        neutral: {
          200: "#CED8E5",
        },
      },
      fontFamily: {
        serif: ['"Source Serif Pro"', 'serif'],
        sans: ['Lato', 'Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;

