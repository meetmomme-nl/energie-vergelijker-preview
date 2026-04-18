/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#34D399",
          DEFAULT: "#10B981",
          dark: "#059669",
        },
        accent: {
          blue: "#3B82F6",
          purple: "#8B5CF6",
        },
      },
    },
  },
  plugins: [],
};
