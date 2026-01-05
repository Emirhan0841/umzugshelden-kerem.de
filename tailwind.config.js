/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./pages/**/*.html",
    "./partials/**/*.html",
    "./js/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0b0b0d",
        paper: "#ffffff",
        muted: "#6b7280",
        line: "rgba(0,0,0,.08)"
      },
      boxShadow: {
        soft: "0 10px 30px rgba(0,0,0,.10)"
      }
    }
  },
  plugins: []
};
