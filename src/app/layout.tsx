import type { Metadata } from "next";
import { Inter } from "next/font/google";
// @ts-expect-error CSS is processed by Next.js and has no TypeScript declarations.
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
