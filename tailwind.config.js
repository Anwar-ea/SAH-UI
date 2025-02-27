/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  corePlugins: {
    preflight: false, // Keep this false for Ant Design compatibility
  },
  important: true, // This makes Tailwind styles have higher priority
  theme: {
    extend: {},
  },
  plugins: [],
}