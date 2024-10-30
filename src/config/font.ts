import { Fira_Code } from "next/font/google";

const firaCode = Fira_Code({
    subsets: ["latin"],
    style: ["normal"],
    weight: ["300", "400", "500", "600", "700"],
    display: "swap",
    variable: "--font-fira-code",
});

export default firaCode;
