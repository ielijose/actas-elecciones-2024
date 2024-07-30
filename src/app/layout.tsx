import { Navbar } from "@/components/navbar";
import { Toaster } from "@/components/ui/toaster";
import { GoogleAnalytics } from "@next/third-parties/google";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
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
        <Navbar />

        <main className="flex min-h-screen flex-col items-center justify-between p-4 bg-gray-50  ">
          <div className="w-full container">{children}</div>
        </main>
        <Toaster />
      </body>

      <GoogleAnalytics gaId="G-G7QMWFQKSV" />
    </html>
  );
}
