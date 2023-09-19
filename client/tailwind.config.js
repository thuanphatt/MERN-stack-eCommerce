/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    fontFamily: {
      main: ["Poppins", "sans-serif;"],
    },
    extend: {
      width: {
        main: "1220px",
      },
      backgroundColor: {
        main: "#79AC78",
      },
      colors: {
        main: "#79AC78",
      },
      flex: {
        2: "2 2 0%",
        3: "3 3 0%",
        4: "4 4 0%",
        5: "5 5 0%",
      },
      keyframes: {
        "slide-top": {
          "0%": {
            "-webkit-transform": "translateY(0);",
            transform: " translateY(20px);",
          },
          "100%": {
            "-webkit-transform": "translateY(-100px);",
            transform: "translateY(0);",
          },
        },
      },
      animation: {
        "slide-top":
          "slide-top 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
