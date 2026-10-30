import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'RUDRA MOVIES — Stories worth staying for',
  description: 'Discover a considered collection of cinema, regional favourites and stories worth your time.',
  applicationName: 'RUDRA MOVIES',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
