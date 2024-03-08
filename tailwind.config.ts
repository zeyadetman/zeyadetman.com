import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#161616",
          "primary-content": "#ededed",
          secondary: "#1c1c1c",
          "secondary-content": "#a0a0a0",
          "base-100": "#161616",
          // "--rounded-box": "0.25rem", // border radius rounded-box utility class, used in card and other large boxes
          // "--rounded-btn": "0.25rem", // border radius rounded-btn utility class, used in buttons and similar element
          // "--animation-btn": "0.25s", // duration of animation when you click on button
          // "--animation-input": "0.2s", // duration of animation for inputs like checkbox, toggle, radio, etc
          // "--btn-focus-scale": "0.95", // scale transform of button when you focus on it
          // "--border-btn": "1px", // border width of buttons
          // "--tab-border": "1px", // border width of tabs
          // "--tab-radius": "0.25rem",
        },
      },
    ],
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
};
export default config;
