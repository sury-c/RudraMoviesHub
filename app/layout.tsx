import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RUDRA MOVIES — Stories hit different",
  description: "Discover your next favourite movie with RUDRA MOVIES.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
