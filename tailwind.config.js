/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      animation: {
        dropdown: "dropdown 0.5s ease-in-out forwards ",
      },
      keyframes: {
        dropdown: {
          "0%": {
            opacity: "0",
            zIndex: "0",
            transform: "translateY(-100%)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0%)",
          },
        },
      },
    },
  },
  plugins: [require("daisyui")],
};
