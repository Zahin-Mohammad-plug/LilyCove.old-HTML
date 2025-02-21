/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {

      keyframes: {
        spiralFill: {
          "0%": { backgroundPosition: "center" },
          "100%": { backgroundPosition: "left" },
        },
      },
      animation: {
        spiralFill: "spiralFill 2s ease-in-out forwards",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },

      keyframes: {
        neonHover: {
          '0%, 100%': {
            boxShadow: '0 0 5px #64ffda, 0 0 10px #64ffda, 0 0 20px #64ffda, 0 0 40px #64ffda',
          },
          '50%': {
            boxShadow: '0 0 20px #64ffda, 0 0 30px #52dab6, 0 0 50px #64ffda, 0 0 70px #52dab6',
          },
        },
      },
      animation: {
        neonHover: 'neonHover 2s infinite',
        spiralClick: 'spiralClick 1s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};