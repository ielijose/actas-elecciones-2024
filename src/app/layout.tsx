import { Navbar } from "@/components/navbar";
import { Toaster } from "@/components/ui/toaster";
import { GoogleAnalytics } from "@next/third-parties/google";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Consulta Actas CNE",
  description: "Informacion de Centros y mesas de votacion",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* <Navbar /> */}

        <main>
          <div>{children}</div>
        </main>
        <Toaster />
      </body>

      <GoogleAnalytics gaId="G-G7QMWFQKSV" />
    </html>
  );
}
