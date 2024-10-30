import type { Config } from "tailwindcss";

const config: Config = {
    important: true,
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/libs/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#306BAC",
                secondary: "#98B9F2",
            },

            fontFamily: {
                sans: ["var(--font-fira-code)"],
            },
        },
    },
    plugins: [],
};
export default config;
