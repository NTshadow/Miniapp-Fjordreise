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
                <div style={{
                    minHeight: "100vh",
                    backgroundImage: "url('/bakgrunnsbilde.jpg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundAttachment: "scroll",
                }}>
                    <div style={{
                        minHeight: "100vh",
                        backdropFilter: "blur(4px)",
                    }}>
                        {children}
                    </div>
                </div>
            </body>
        </html>
    );
}