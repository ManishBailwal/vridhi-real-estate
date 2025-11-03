// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        serif: ["var(--font-playfair)", "serif"],
      },
      colors: {
        // Brand colors based on footer theme
        brand: {
          dark: {
            DEFAULT: "#0f172a", // slate-900
            from: "#0c4a6e", // sky-900
            via: "#312e81", // indigo-900
            to: "#0f172a", // slate-900
          },
          accent: {
            DEFAULT: "#f59e0b", // amber-500
            light: "#fbbf24", // amber-400
            dark: "#d97706", // amber-600
          },
        },
        // Override default theme colors to match footer
        primary: {
          DEFAULT: "#f59e0b", // amber-500
          foreground: "#ffffff",
        },
        background: "#ffffff",
        foreground: "#0f172a",
        muted: {
          DEFAULT: "#f1f5f9",
          foreground: "#64748b",
        },
        accent: {
          DEFAULT: "#f59e0b",
          foreground: "#ffffff",
        },
        border: "hsl(214.3 31.8% 91.4%)",
        ring: "#f59e0b",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}