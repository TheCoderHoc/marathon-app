"use client";
import "../globals.css";
import { ConfigProvider } from "antd";
import { colors } from "@/constants/colors";
import { Provider } from "react-redux";
import store from "@/redux/store";
import firaCode from "@/config/font";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={firaCode.variable}>
            <Provider store={store}>
                <ConfigProvider
                    theme={{
                        token: {
                            colorPrimary: colors.primary,
                        },
                    }}
                >
                    <body>{children}</body>
                </ConfigProvider>
            </Provider>
        </html>
    );
}
