'use client';

import Link from 'next/link';
import { SignUp } from '@clerk/nextjs';

export default function SignUpPage() {
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      {/* Left Side - Brand Vision */}
      <div className="hidden md:flex flex-col justify-center p-12 lg:p-24 bg-pink-50 relative">
        {/* Escape Hatch */}
        <Link href="/" className="absolute top-8 left-8 text-pink-800 hover:text-pink-600 font-medium transition-colors font-outfit">
          ← back to home
        </Link>
        <div className="max-w-md">
          <h1 className="font-fraunces text-4xl lg:text-5xl text-gray-900 mb-6 font-bold">
            system initialization.
          </h1>
          
          <p className="font-outfit text-gray-700 text-lg leading-relaxed mb-8">
            Where aesthetic meets algorithm. Build the models they said were too hard and track your evolution in real time.
          </p>
          
          <ul className="space-y-3 font-outfit text-gray-600">
            <li className="flex items-start">
              <span className="text-it-girl-maroon mr-3 font-bold">→</span>
              <span>secure your progress.</span>
            </li>
            <li className="flex items-start">
              <span className="text-it-girl-maroon mr-3 font-bold">→</span>
              <span>execute real python.</span>
            </li>
            <li className="flex items-start">
              <span className="text-it-girl-maroon mr-3 font-bold">→</span>
              <span>receive the manifest.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Right Side - Clerk SignUp Component */}
      <div className="flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          <SignUp
            fallbackRedirectUrl="/episodes"
            appearance={{
              elements: {
                cardBox: 'shadow-none',
                card: 'shadow-none border-none bg-transparent sm:shadow-none sm:bg-transparent',
                headerTitle: 'text-gray-900 font-outfit text-2xl font-bold',
                headerSubtitle: 'text-gray-500 font-outfit',
                formButtonPrimary:
                  'bg-it-girl-maroon hover:bg-opacity-90 text-white shadow-none rounded-lg font-outfit font-semibold py-2.5',
                formFieldInput:
                  'border border-gray-200 rounded-lg font-outfit focus:border-it-girl-maroon focus:ring-1 focus:ring-it-girl-maroon',
                footerActionLink:
                  'text-it-girl-maroon hover:text-opacity-80 font-outfit font-semibold',
                formResendCodeLink:
                  'text-it-girl-maroon hover:text-opacity-80 font-outfit font-semibold',
                dividerLine: 'bg-gray-200',
                dividerText: 'text-gray-500 font-outfit',
                socialButtonsBlockButton:
                  'border border-gray-200 rounded-lg font-outfit hover:border-gray-300',
                socialButtonsBlockButtonText: 'font-outfit text-gray-700',
              },
              layout: {
                socialButtonsVariant: 'blockButton',
                logoImageUrl: undefined,
              },
            }}
            routing="path"
            path="/sign-up"
            signInUrl="/sign-in"
          />
        </div>
      </div>
    </div>
  );
}
