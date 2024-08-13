import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gran protesta mundial por la verdad",
  description: "Informacion de puntos de concentración",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="w-full container">{children}</div>;
}
