module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    // fill: {
    //   current: "currentColor",
    // },
  },
  variants: {
    extend: {},
    fill: ["hover", "focus"],
  },
  plugins: [],
};
