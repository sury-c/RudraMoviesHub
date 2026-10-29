import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RUDRA MOVIES — Stories hit different",
  description: "Discover films worth your time. Regional favourites, cult classics and stories that stay with you.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
