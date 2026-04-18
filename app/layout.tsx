import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EnergieVergelijker - Vergelijk energieaanbieders",
  description: "Bespaar op uw gas en stroom door energieaanbieders te vergelijken",
  keywords: ["energie", "vergelijken", "gas", "stroom", "besparen"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl">
      <body className="antialiased">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-white text-gray-900 px-4 py-2 rounded z-50">
          Skip to main content
        </a>
        <main id="main-content">{children}</main>
      </body>
    </html>
  );
}
