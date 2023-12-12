/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      "mantine-blue": "#0088E4",
    },
    extend: {
      backgroundImage: {
        "login-page": "url('/public/imag1.jpg')",
      },
    },
  },
  plugins: [],
};
