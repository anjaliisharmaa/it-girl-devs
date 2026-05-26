import type { Metadata } from 'next';
import { Syne, Outfit, Space_Grotesk, Fraunces } from 'next/font/google';
import { ClerkProvider, ClerkLoading, ClerkLoaded } from '@clerk/nextjs';
import './globals.css';
import ConditionalNavbar from '@/components/layout/ConditionalNavbar';
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
        <ClerkProvider
          appearance={{
            variables: {
              colorPrimary: '#831843',
              colorTextBrand: '#831843',
            },
            elements: {
              card: 'rounded-2xl border border-pink-100 shadow-xl',
              formButtonPrimary: 'bg-pink-900 hover:bg-pink-800 text-white hover:text-white shadow-none rounded-xl transition-colors',
              profileSectionPrimaryButton: 'bg-pink-900 hover:bg-pink-800 text-white hover:text-white transition-colors',
              formButtonReset: 'text-pink-900 hover:bg-pink-50 transition-colors',
              navbarButton: 'text-pink-800 hover:bg-pink-50 transition-colors',
              userButtonPopoverCard: 'shadow-xl border border-pink-100',
              headerTitle: 'text-gray-900 font-outfit text-2xl font-bold',
              headerSubtitle: 'text-gray-500 font-outfit',
              formFieldInput: 'border border-gray-200 rounded-lg font-outfit focus:border-pink-900 focus:ring-1 focus:ring-pink-900',
              footerActionLink: 'text-pink-900 hover:text-opacity-80 font-outfit font-semibold',
            },
          }}
        >
          <ClerkLoading>
            {/* Loading State - Smooth Transition During Auth Resolution */}
            <div className="fixed inset-0 z-50 bg-pink-50 min-h-screen flex flex-col items-center justify-center">
              {/* Pulsing Spinner */}
              <style>{`
                @keyframes pulse-ring {
                  0% {
                    box-shadow: 0 0 0 0 rgba(131, 24, 67, 0.7);
                  }
                  70% {
                    box-shadow: 0 0 0 30px rgba(131, 24, 67, 0);
                  }
                  100% {
                    box-shadow: 0 0 0 0 rgba(131, 24, 67, 0);
                  }
                }
                .pulse-spinner {
                  animation: pulse-ring 2s infinite;
                }
              `}</style>
              <div className="w-16 h-16 bg-pink-900 rounded-full pulse-spinner"></div>
              <p className="text-pink-900 font-medium mt-4 font-outfit lowercase">syncing your ecosystem...</p>
            </div>
          </ClerkLoading>
          <ClerkLoaded>
            <ProgressProvider>
              <ConditionalNavbar />
              {children}
            </ProgressProvider>
          </ClerkLoaded>
        </ClerkProvider>
      </body>
    </html>
  );
}
