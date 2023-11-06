/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "lavender": "#9f48d5",
      }
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  }
}
