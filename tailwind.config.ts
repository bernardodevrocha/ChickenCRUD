import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        kitchen: {
          50: "#fef7ee",
          100: "#fdedd6",
          200: "#f9d7ad",
          300: "#f4b978",
          400: "#ee9242",
          500: "#ea761e",
          600: "#db5c14",
          700: "#b54413",
          800: "#903617",
          900: "#742f16",
          950: "#3f1509",
        },
      },
    },
  },
  plugins: [],
};
export default config;
