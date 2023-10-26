/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        secondary: "rgb(29 78 216)",
        primary: {
          DEFAULT: "rgb(51 65 85)",
          variant: "rgb(248 250 252)",
          50: "rgb(71 85 105)"
        }
      },
    },
  },
  plugins: [],
}