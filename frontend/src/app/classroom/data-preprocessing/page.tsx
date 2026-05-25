'use client';

import Link from 'next/link';
import { ArrowLeft, Sparkles } from 'lucide-react';

export default function DataPreprocessingComingSoonPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50/50 via-pink-100/30 to-red-50/40 pt-32 pb-20 px-4 md:px-8 flex items-center justify-center">
      <style>{`
        html::-webkit-scrollbar { width: 8px; }
        html::-webkit-scrollbar-track { background: transparent; }
        html::-webkit-scrollbar-thumb { background: #FFD1DC; border-radius: 4px; }
        html::-webkit-scrollbar-thumb:hover { background: #FF69B4; }
      `}</style>

      <div className="max-w-2xl w-full">
        {/* Back Button */}
        <div className="mb-12">
          <Link
            href="/episodes"
            className="inline-flex items-center gap-2 text-[#590D22] hover:text-[#9B2226] transition-colors font-medium"
          >
            <ArrowLeft size={20} />
            <span>Back to Blueprint</span>
          </Link>
        </div>

        {/* Coming Soon Card */}
        <div className="bg-white rounded-3xl shadow-lg border-2 border-dashed border-pink-300 p-12 md:p-16 text-center">
          {/* Icon */}
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-pink-200/20 rounded-full blur-2xl"></div>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-5xl md:text-6xl font-serif text-[#590D22] mb-4">
            Coming Soon
          </h1>

          {/* Module Name */}
          <div className="mb-8">
            <p className="text-2xl text-[#590D22]/70 font-light mb-2">
              Data Pre-processing
            </p>
            <p className="text-xl text-pink-600 font-semibold">
              The Skincare Routine
            </p>
          </div>

          {/* Description */}
          <p className="text-lg text-[#590D22]/60 mb-8 leading-relaxed max-w-lg mx-auto">
            We're currently polishing up this module to make it absolutely flawless. Subscribe to our newsletter to get updates!
          </p>

          {/* Features List */}
          <div className="bg-pink-50/50 border border-pink-200 rounded-2xl p-6 mb-10 inline-block">
            <p className="text-sm font-semibold text-[#590D22] mb-4">
              What's Coming Your Way:
            </p>
            <ul className="space-y-2 text-sm text-[#590D22]/70 text-left">
              <li className="flex items-center gap-2">
                <span className="text-pink-500">•</span>
                <span>Data cleaning fundamentals</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-pink-500">•</span>
                <span>Pandas & NumPy mastery</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-pink-500">•</span>
                <span>Handling missing data like a pro</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-pink-500">•</span>
                <span>Feature scaling techniques</span>
              </li>
            </ul>
          </div>

          {/* CTA */}
          <div className="space-y-4">
            <p className="text-sm font-medium text-pink-600">
              In the meantime, explore the Regression module to get started!
            </p>
            <Link
              href="/episodes"
              className="inline-flex items-center gap-2 bg-[#590D22] text-white px-8 py-4 rounded-full font-semibold hover:bg-[#9B2226] transition-all shadow-md hover:shadow-lg"
            >
              <ArrowLeft size={20} />
              <span>Back to Blueprint</span>
            </Link>
          </div>

          {/* Decorative Element */}
          <div className="mt-12 pt-8 border-t border-dashed border-pink-200">
            <p className="text-xs text-[#590D22]/40">
              I promise, it's worth the wait!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
