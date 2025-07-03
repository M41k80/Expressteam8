import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "./components/theme-provider";



export const metadata: Metadata = {
  title: "Tu App de Emails con AI",
  description: "Genera Emails impresionantes con Inteligencia Artificial",
  keywords: ["Email", "IA", "Productividad"],
  authors: [
    {
      name: "M41K80",
      url: "https://github.com/M41K80",
    },
  ],
  icons: {
    icon: "/App.png",
    shortcut: "/App.png",
    apple: "/App.png",
  },

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



