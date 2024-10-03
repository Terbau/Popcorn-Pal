import type { Config } from "tailwindcss";
import tailwindcssRadixColors from "tailwindcss-radix-colors";

export default {
  // darkMode: ["class", '[data-theme="dark"]'],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        primary: "#001220",
      },
    },
  },
  plugins: [tailwindcssRadixColors],
} satisfies Config;
