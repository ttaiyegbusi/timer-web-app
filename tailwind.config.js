/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,jsx}",
    "./src/components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#3B5CF6",
          hover: "#2F4FE8",
          soft: "#EAF0FF",
        },
        navy: "#172762",
        text: {
          DEFAULT: "#090D14",
          secondary: "#525B6B",
          muted: "#87909E",
        },
        sidebar: "#FAFAFB",
        subtle: "#F6F7F9",
        tableHeader: "#F5F6F8",
        border: {
          DEFAULT: "#DDE2EA",
          light: "#E8EBF0",
        },
        success: { DEFAULT: "#18A86B", bg: "#EAF8F2" },
        danger: { DEFAULT: "#E11D48", bg: "#FDECEF" },
        warning: { DEFAULT: "#F97316", bg: "#FFF2E8" },
        low: { text: "#7A4A16", bg: "#FFF6E8" },
        mid: { text: "#334155", bg: "#F0F2F5" },
        dept: {
          marketing: "#F47621",
          product: "#3B5CF6",
          design: "#2DA676",
        },
      },
      borderRadius: {
        sm: "8px",
        md: "10px",
        lg: "12px",
        xl: "16px",
        pill: "999px",
      },
      boxShadow: {
        soft: "0 8px 24px rgba(15, 23, 42, 0.06)",
        dropdown: "0 18px 50px rgba(15, 23, 42, 0.12)",
      },
      fontFamily: {
        sans: [
          "Inter",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
};
