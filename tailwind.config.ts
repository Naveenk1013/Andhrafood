import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        leaf: {
          50: "#F2F8F4",
          100: "#E1EEE5",
          200: "#C3DDCB",
          300: "#9EC5AA",
          400: "#5EB08D",
          500: "#3D8F6E",
          600: "#2A7356",
          700: "#1F5A43",
          800: "#154231",
          900: "#103226",
          950: "#081C14",
        },
        turmeric: {
          50: "#FFFBF0",
          100: "#FEF4D5",
          200: "#FDE8A8",
          300: "#FBD775",
          400: "#F7C545",
          500: "#F2B31B",
          600: "#CF8800",
          700: "#9C6300",
          800: "#704700",
          900: "#4A2E00",
          950: "#2E1C00",
        },
        guntur: {
          50: "#FEF2F2",
          100: "#FEE2E2",
          400: "#E5484D",
          500: "#D32F2F",
          600: "#B3261E",
          700: "#A11E17",
          800: "#8B1913",
          900: "#66100B",
        },
        rice: {
          50: "#FAF9F5",
          100: "#F4F1E6",
          200: "#E8E4D3",
          300: "#DAD4BD",
          800: "#1F241F",
          900: "#161B16",
          950: "#0D130E",
        },
        ink: {
          400: "#8B9E93",
          500: "#66776C",
          600: "#4B5750",
          700: "#36453B",
          800: "#232E27",
          900: "#141C18",
          950: "#0E1410",
        },
        tamarind: {
          500: "#9C5E43",
          600: "#7A4B36",
          700: "#5B3A2C",
          800: "#4A2B1E",
          900: "#331D14",
        },
      },
      borderRadius: {
        chip: "6px",
        input: "6px",
        card: "14px",
        sheet: "28px",
        hero: "28px",
      },
      fontFamily: {
        display: ["var(--font-bricolage)", "system-ui", "sans-serif"],
        displayTe: ["var(--font-anek)", "system-ui", "sans-serif"],
        body: ["var(--font-hind)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
