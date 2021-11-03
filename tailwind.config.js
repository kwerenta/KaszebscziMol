module.exports = {
  mode: "jit",
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: ["Poppins", "sans-serif"],
    },
    extend: {
      width: {
        tile: "min(calc(100vh/10.5),calc(calc(100vw/15)))",
      },
      height: {
        tile: "min(calc(100vh/10.5),calc(calc(100vw/15)))",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
