/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html", // <= add this
    "./src/**/*.{js,ts,jsx,tsx}", // <= no spaces
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Open Sans", "ui-sans-serif", "system-ui"],
      },
    },
  },
  plugins: [],
};
