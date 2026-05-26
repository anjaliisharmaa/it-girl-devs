import type { Metadata } from 'next';
import { Syne, Outfit, Space_Grotesk, Fraunces } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import { ProgressProvider } from '@/context/ProgressContext';

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

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-space-grotesk',
});

const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-fraunces',
});

export const metadata: Metadata = {
  title: 'it-girl devs 🎀',
  description: 'The Legally Blonde of Ed-Tech - Learn Machine Learning with style',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${syne.variable} ${outfit.variable} ${spaceGrotesk.variable} ${fraunces.variable} antialiased`}>
        <ClerkProvider>
          <ProgressProvider>
            <Navbar />
            {children}
          </ProgressProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
