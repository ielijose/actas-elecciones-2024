import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { Toaster } from "@/components/ui/toaster";
import { GoogleAnalytics } from "@next/third-parties/google";

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
        <main className="flex min-h-screen flex-col items-center justify-between p-4">
          <div className="w-full max-w-lg">
            <Link href="/">
              <h1 className="text-2xl font-bold mb-4 text-center">
                Consulta Actas CNE
              </h1>
            </Link>
            {children}
          </div>
        </main>
        <Toaster />
      </body>

      <GoogleAnalytics gaId="G-G7QMWFQKSV" />
    </html>
  );
}
