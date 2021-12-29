module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
        logo: ["Kalam", "sans-serif"],
      },
      width: {
        tile: "min(calc(100vh/10.5),calc(calc(100vw/15)))",
      },
      height: {
        tile: "min(calc(100vh/10.5),calc(calc(100vw/15)))",
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
      },
      dropShadow: {
        "sm-intense": "0 0 4px rgba(0, 0, 0, 0.5)",
        "md-intense": "3px 3px 3px rgba(0, 0, 0, 0.55)",
        "lg-intense": "4px 6px 2px rgba(0, 0, 0, 0.4)",
      },
      boxShadow: {
        "group-indicator": "inset 0 -6px 0 0",
        "bottom-inset": "inset 0 -8px 0 0",
        bottom: "0 8px 0 0",
      },
    },
  },
  plugins: [],
};
