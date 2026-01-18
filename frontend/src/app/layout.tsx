import type { Metadata } from 'next';
import { Syne, Outfit } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';

const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-syne',
});

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-outfit',
});

export const metadata: Metadata = {
  title: 'it-girl devs | Making ML Aesthetic 🎀',
  description: 'The Legally Blonde of Ed-Tech - Learn Machine Learning with style',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${syne.variable} ${outfit.variable} antialiased`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
