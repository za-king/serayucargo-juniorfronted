/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: { display: ["group-hover"] },
    container: {
      center: true,
      padding: "142px",
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["black"],
  },
};
