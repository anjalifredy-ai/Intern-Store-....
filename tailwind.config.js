/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        surface: "#ffffff",
        surfacedim: "#f8f9fa",
        ink: "#1f1f1f",
        subink: "#5f6368",
        faintink: "#80868b",
        line: "#e8eaed",
        brand: {
          blue: "#01875f",
          green: "#01875f",
        },
        accent: "#01875f",
        link: "#00875f",
      },
      fontFamily: {
        sans: [
          "Google Sans",
          "Product Sans",
          "Roboto",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Arial",
          "sans-serif",
        ],
        display: [
          "Google Sans",
          "Product Sans",
          "Roboto",
          "-apple-system",
          "sans-serif",
        ],
      },
      borderRadius: {
        tile: "22%",
      },
      boxShadow: {
        card: "0 1px 2px 0 rgba(60,64,67,.3), 0 1px 3px 1px rgba(60,64,67,.15)",
        raised: "0 1px 3px 0 rgba(60,64,67,.3), 0 4px 8px 3px rgba(60,64,67,.15)",
      },
    },
  },
  plugins: [],
};
