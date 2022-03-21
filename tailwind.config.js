const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./components/**/*.{js,jsx,ts,tsx}",
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./lib/configs/spaces.ts",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", ...defaultTheme.fontFamily.sans],
        logo: ["Kalam", "sans-serif"],
      },
      width: {
        tile: "min(100vh/10.5,100vw/15)",
      },
      height: {
        tile: "min(100vh/10.5,100vw/15)",
      },
      colors: {
        pattern: {
          blue: "#1F8AB2",
          "blue-light": "#72C5DD",
          "blue-dark": "#00497C",
          yellow: "#FAD247",
          green: "#64A100",
          red: "#EE1919",
        },
        red: {
          light: "#fc5c65",
          dark: "#eb3b5a",
        },
        orange: {
          light: "#fd9644",
          dark: "#fa8231",
        },
        yellow: {
          light: "#fed330",
          dark: "#f7b731",
        },
        green: {
          light: "#26de81",
          dark: "#20bf6b",
        },
        gray: {
          light: "#d1d8e0",
          dark: "#a5b1c2",
        },
        "blue-gray": {
          light: "#778ca3",
          dark: "#4b6584",
        },
        blue: {
          light: "#45aaf2",
          dark: "#2d98da",
        },
      },
      boxShadow: {
        "group-indicator": "inset 0 -6px 0 0",
      },
      keyframes: {
        press: {
          from: { transform: "translateY(-0.75rem)" },
          to: { transform: "translateY(0)" },
        },
      },
      animation: {
        press: "press 150ms cubic-bezier(0.4, 0, 0.2, 1)",
      },
    },
  },
  plugins: [],
};
