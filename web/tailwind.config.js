module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        darkBlue: "#042765",
      },
      keyframes: {
        jumpUp: {
          "0%": { opacity: 0, transform: "translateY(30%)" },
          "95%": { opacity: 95, transform: "translateY(-3%)" },
          "100%": { opacity: 100, transform: "translateY(0)" },
        },
      },
      animation: {
        jumpUp: "jumpUp 0.4s 0.9s forwards",
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ["active"],
      opacity: ["active"],
    },
  },
  plugins: [],
};
