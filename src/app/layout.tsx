// src/app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
// The stylesheet is handled by Next.js; suppress TypeScript's side-effect
// import check when the CSS module declaration is not available to the editor.
// @ts-expect-error -- Next.js resolves this global stylesheet at build time.
import "./globals.css";
import Navbar from "./components/Navbar";

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Recetario Colaborativo',
  description: 'Plataforma de recetas colaborativas',
};

export default function RootLayout({
  children,
}:  Readonly<
{
  children: React.ReactNode;
}>) {
  return (
    <html
     lang="es"
     >
      <body className={inter.className}>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}