import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "./components/theme-provider";



export const metadata: Metadata = {
  title: "Tu App de Emails con IA",
  description: "Genera Emails impresionantes con Inteligencia Artificial",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}



