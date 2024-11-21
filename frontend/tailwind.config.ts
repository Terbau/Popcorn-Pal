import type { Config } from "tailwindcss";
import tailwindcssRadixColors from "tailwindcss-radix-colors";
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
        /(text|bg|border|ring)-(slate|blue|red|green|indigo|brand|gray|yellow)-([2-9]|1[0-2]?)/,
      variants: ["focus", "hover", "active"],
    },
  ],
  theme: {
    extend: {
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
      },
      fontFamily: {
        playfair: ["Playfair Display", "serif"],
        roboto: ["Roboto", "sans-serif"],
      },
    },
  },
  plugins: [tailwindcssRadixColors],
} satisfies Config;
