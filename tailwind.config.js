// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  // ... other configs
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"], // Default body font
        serif: ["var(--font-playfair)", "serif"], // Our new heading font
      },
      // ... other extensions
    },
  },
  plugins: [require("tailwindcss-animate")], // Make sure animate plugin is present
}