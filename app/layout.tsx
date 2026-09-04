import type { Metadata } from 'next';
import { DM_Sans, Space_Grotesk } from 'next/font/google';
import './globals.css';

const dmSans = DM_Sans({ variable: '--font-body', subsets: ['latin'] });
const spaceGrotesk = Space_Grotesk({ variable: '--font-display', subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Shailesh Sethi — Creative Developer',
  description: 'Creative developer building playful interfaces, games, and AI-powered experiences.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${dmSans.variable} ${spaceGrotesk.variable}`}>{children}</body>
    </html>
  );
}
