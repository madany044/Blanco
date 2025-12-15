/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f0f7ff",
          100: "#dceeff",
          500: "#1d4ed8",
          600: "#1e40af",
        },
      },
    },
  },
  plugins: [],
};

