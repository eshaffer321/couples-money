/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  mode: process.env.NODE_ENV ? 'jit' : undefined,
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
};
