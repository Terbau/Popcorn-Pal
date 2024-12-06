import type { Config } from "tailwindcss";
import tailwindcssRadixColorsPlugin from "tailwindcss-radix-colors";
import tailwindcssAnimatePlugin from "tailwindcss-animate";
import * as colors from "@radix-ui/colors";

const createColorScale = (name: string) => {
  const entries = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((step) => [
    step,
    colors[`${name}Dark`][`${name}${step}`] as string,
  ]);

  // the default color should be the third step on the scale
  entries.push(["DEFAULT", colors[`${name}Dark`][`${name}3`]]);
  return Object.fromEntries(entries);
};

const createCustomColorScale = (name: string) => {
  const entries = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((step) => [
    step,
    `var(--color-${name}-${step})`,
  ]);

  // the default color should be the third step on the scale
  entries.push(["DEFAULT", `var(--color-${name}-3)`]);
  return Object.fromEntries(entries);
};

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  safelist: [
    {
      pattern:
        /(text|bg|border|ring)-(slate|blue|red|green|indigo|brand|gray|yellow|orange)-([2-9]|1[0-2]?)/,
      variants: [
        "focus",
        "hover",
        "active",
        "dark",
        "dark:focus",
        "dark:hover",
        "dark:active",
      ],
    },
  ],
  theme: {
    extend: {
      screens: {
        xss: "375px",
        xs: "425px",
      },
      fontSize: {
        xss: "0.625rem",
      },
      colors: {
        primary: "#030d26",
        inherit: "inherit",
        current: "current",
        slate: createColorScale("slate"),
        blue: createColorScale("blue"),
        red: createColorScale("red"),
        green: createColorScale("green"),
        indigo: createColorScale("indigo"),
        gray: createColorScale("gray"),
        brand: createCustomColorScale("brand"),
        yellow: createColorScale("yellow"),
        orange: createColorScale("orange"),
        teal: createColorScale("teal"),
        pink: createColorScale("pink"),
        cream: {
          DEFAULT: "#FFF8E7", // Primary Background
          secondary: "#f7f5e7",
          tertiaryTest: "#f7f0df",
          light: "#FFEAC9", // Button Background
        },
        purple: {
          DEFAULT: "#6B4C9A", // Deep Purple (Accent)
          light: "#F4E4FF", // Light Purple (Secondary Background)
          lavender: "#D6BFFF", // Light Accent
          text: "#4B306A", // Text Primary
          medium: "#8565A9", // Text Secondary
          hover: "#EDE3FF", // Hover State
          border: "#DDD0E6", // Border Color
        },
      },
      fontFamily: {
        playfair: ["Playfair Display", "serif"],
        roboto: ["Roboto", "sans-serif"],
      },
      keyframes: {
        "scroll-y": {
          "0%": {
            transform: "translateY(0)",
          },
          "100%": {
            transform: "translateY(-80%)",
          },
        },
      },
      animation: {
        "scroll-y": "scroll-y 20s linear infinite",
      },
    },
  },
  plugins: [tailwindcssRadixColorsPlugin, tailwindcssAnimatePlugin],
  darkMode: "class",
} satisfies Config;
