import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "Fjordreise",
    description: "Søk etter og book ferjeavganger langs den norske kysten",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="no">
            <body>
                {children}
            </body>
        </html>
    );
}