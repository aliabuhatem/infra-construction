import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#213B4D",
        secondary: "#1F93A4",
        gray: {
          mid: "#5E5E5E",
        },
      },
      fontFamily: {
        heading: ["var(--font-barlow-condensed)", "Helvetica", "Arial Narrow", "sans-serif"],
        body: ["var(--font-source-sans)", "Myriad Pro", "Arial", "sans-serif"],
      },
      fontSize: {
        "h1": ["75px", { lineHeight: "1.05", fontWeight: "500" }],
        "h2": ["48px", { lineHeight: "1.1", fontWeight: "500" }],
        "h3": ["20px", { lineHeight: "1.4", fontWeight: "700" }],
        "cta": ["35px", { lineHeight: "1", fontWeight: "500" }],
      },
    },
  },
  plugins: [],
};
export default config;
