'use client';

import { useState } from 'react';
import Link from 'next/link';
import { SignIn, useAuth } from '@clerk/nextjs';
import { Copy, Eye, Mail, Sparkles } from 'lucide-react';

const labs = [
  {
    labName: 'Solid State Physics Lab (SSPL)',
    location: 'Delhi',
    poc: 'nanhey singh',
    emailAddress: 'example@drdo.com',
    researchAreas: 'delhi',
  },
  {
    labName: 'Defence Electronics Research Laboratory',
    location: 'Hyderabad',
    poc: 'A. Kumar',
    emailAddress: 'electronics@drdo.com',
    researchAreas: 'Radar systems, signal processing',
  },
  {
    labName: 'Naval Materials Research Laboratory',
    location: 'Mumbai',
    poc: 'R. Iyer',
    emailAddress: 'materials@drdo.com',
    researchAreas: 'Corrosion, composites, coatings',
  },
  {
    labName: 'Instruments Research & Development Establishment',
    location: 'Dehradun',
    poc: 'P. Sharma',
    emailAddress: 'instruments@drdo.com',
    researchAreas: 'Sensors, test systems, instrumentation',
  },
];

const coldEmailTemplate = `Hi [POC Name],

I came across your work at [Lab Name] and I am really interested in the research area around [Research Area].

I would love to learn if there are any internship, project, or research opportunities where I could contribute.

Thank you for your time,
[Your Name]
[College / Role]
[Portfolio / LinkedIn]`;

function TrackerTable() {
  const [copyState, setCopyState] = useState('Copy to Clipboard');

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(coldEmailTemplate);
      setCopyState('Copied');
      window.setTimeout(() => setCopyState('Copy to Clipboard'), 1800);
    } catch {
      setCopyState('Copy failed');
      window.setTimeout(() => setCopyState('Copy to Clipboard'), 1800);
    }
  };

  return (
    <div className="space-y-8">
      <div className="rounded-[2rem] border border-[#590D22]/15 bg-white/70 p-6 shadow-2xl backdrop-blur-sm md:p-8">
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#590D22] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white">
              <Sparkles className="h-3.5 w-3.5" />
              Access granted
            </div>
            <h1 className="font-fraunces text-4xl font-bold text-[#590D22] md:text-5xl">DRDO Labs Tracker</h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-[#590D22]/70 md:text-base">
              Keep the resource on-site, stay in the flow, and use the table below to track labs without leaving the app.
            </p>
          </div>

          <Link
            href="/threads#locker"
            className="inline-flex items-center gap-2 self-start rounded-full border border-[#590D22]/15 bg-white px-4 py-2 text-sm font-semibold text-[#590D22] transition-colors hover:bg-[#590D22] hover:text-white"
          >
            <Eye className="h-4 w-4" />
            Back to Locker
          </Link>
        </div>

        <div className="overflow-hidden rounded-[1.5rem] border border-[#590D22]/10 bg-[#FFD1DC]/40">
          <div className="overflow-x-auto">
            <table className="min-w-[820px] w-full border-collapse text-left text-sm text-[#590D22]">
              <thead className="bg-white/70 text-xs uppercase tracking-[0.18em] text-[#590D22]/70">
                <tr>
                  <th className="px-5 py-4 font-semibold">Lab Name</th>
                  <th className="px-5 py-4 font-semibold">Location</th>
                  <th className="px-5 py-4 font-semibold">POC</th>
                  <th className="px-5 py-4 font-semibold">Email Address</th>
                  <th className="px-5 py-4 font-semibold">Research Areas</th>
                </tr>
              </thead>
              <tbody>
                {labs.map((lab, index) => (
                  <tr key={lab.labName} className={index % 2 === 0 ? 'bg-white/55' : 'bg-[#FFD1DC]/25'}>
                    <td className="border-t border-[#590D22]/10 px-5 py-4 font-semibold">{lab.labName}</td>
                    <td className="border-t border-[#590D22]/10 px-5 py-4">{lab.location}</td>
                    <td className="border-t border-[#590D22]/10 px-5 py-4">{lab.poc}</td>
                    <td className="border-t border-[#590D22]/10 px-5 py-4">
                      <a href={`mailto:${lab.emailAddress}`} className="inline-flex items-center gap-2 text-[#590D22] underline decoration-[#590D22]/30 underline-offset-4 transition-colors hover:text-[#800F2F]">
                        <Mail className="h-4 w-4" />
                        {lab.emailAddress}
                      </a>
                    </td>
                    <td className="border-t border-[#590D22]/10 px-5 py-4 text-[#590D22]/80">{lab.researchAreas}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="rounded-[2rem] border border-[#590D22]/15 bg-white/70 p-6 shadow-2xl backdrop-blur-sm md:p-8">
        <div className="mb-5 flex items-center justify-between gap-4">
          <div>
            <h2 className="font-fraunces text-3xl font-bold text-[#590D22]">Cold Email Template</h2>
            <p className="mt-2 text-sm text-[#590D22]/70">Copy the template and customize the placeholders before sending.</p>
          </div>

          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-2 rounded-full bg-[#590D22] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#800F2F]"
          >
            <Copy className="h-4 w-4" />
            {copyState}
          </button>
        </div>

        <div className="rounded-[1.5rem] border border-[#590D22]/10 bg-[#FFD1DC]/35 p-5">
          <pre className="whitespace-pre-wrap font-outfit text-sm leading-7 text-[#590D22] md:text-base">
            {coldEmailTemplate}
          </pre>
        </div>
      </div>
    </div>
  );
}

function GuestGate() {
  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_420px] lg:items-start">
      <div className="rounded-[2rem] border border-[#590D22]/15 bg-white/70 p-6 shadow-2xl backdrop-blur-sm md:p-8">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-[#590D22] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white">
          <Sparkles className="h-3.5 w-3.5" />
          log in to get access
        </div>
        <h1 className="font-fraunces text-4xl font-bold text-[#590D22] md:text-5xl">Open The Locker</h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-[#590D22]/70">
          Sign in or sign up to view the DRDO Labs Tracker and the cold email template without leaving the site.
        </p>
        <div className="mt-8 grid gap-3 text-sm text-[#590D22]/75 md:grid-cols-3">
          <div className="rounded-2xl border border-[#590D22]/10 bg-[#FFD1DC]/35 p-4">Fast on-site access</div>
          <div className="rounded-2xl border border-[#590D22]/10 bg-[#FFD1DC]/35 p-4">No external share links</div>
          <div className="rounded-2xl border border-[#590D22]/10 bg-[#FFD1DC]/35 p-4">Clerk-protected flow</div>
        </div>
      </div>

      <div className="rounded-[2rem] border border-[#590D22]/15 bg-white/80 p-4 shadow-2xl backdrop-blur-sm md:p-6">
        <SignIn
          routing="path"
          path="/threads/locker"
          fallbackRedirectUrl="/threads/locker"
          signUpUrl="/sign-up?redirect_url=/threads/locker"
          appearance={{
            elements: {
              cardBox: 'shadow-none',
              card: 'shadow-none border-none bg-transparent sm:shadow-none sm:bg-transparent',
              headerTitle: 'text-[#590D22] font-outfit text-2xl font-bold',
              headerSubtitle: 'text-[#590D22]/65 font-outfit',
              formButtonPrimary: 'bg-[#590D22] hover:bg-[#800F2F] text-white shadow-none rounded-xl font-outfit font-semibold py-2.5',
              formFieldInput: 'border border-[#590D22]/15 rounded-xl font-outfit focus:border-[#590D22] focus:ring-1 focus:ring-[#590D22]',
              footerActionLink: 'text-[#590D22] hover:text-[#800F2F] font-outfit font-semibold',
              formResendCodeLink: 'text-[#590D22] hover:text-[#800F2F] font-outfit font-semibold',
              dividerLine: 'bg-[#590D22]/10',
              dividerText: 'text-[#590D22]/55 font-outfit',
              socialButtonsBlockButton: 'border border-[#590D22]/10 rounded-xl font-outfit hover:border-[#590D22]/20',
              socialButtonsBlockButtonText: 'font-outfit text-[#590D22]',
            },
            layout: {
              socialButtonsVariant: 'blockButton',
              logoImageUrl: undefined,
            },
          }}
        />
      </div>
    </div>
  );
}

export default function LockerPage() {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-[#FFD1DC] via-[#FFC0CB] to-[#FFB6C1] px-6 py-24">
        <div className="mx-auto flex min-h-[60vh] max-w-6xl items-center justify-center rounded-[2rem] border border-[#590D22]/15 bg-white/70 p-8 text-[#590D22] shadow-2xl backdrop-blur-sm">
          syncing your access...
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#FFD1DC] via-[#FFC0CB] to-[#FFB6C1] px-6 py-24">
      <div className="mx-auto w-full max-w-6xl">
        <div className="mb-8 flex items-center justify-between gap-4">
          <Link href="/threads#locker" className="text-sm font-semibold text-[#590D22]/70 transition-colors hover:text-[#590D22]">
            ← Back to Threads
          </Link>
          <div className="inline-flex items-center gap-2 rounded-full border border-[#590D22]/10 bg-white/60 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#590D22]">
            <Eye className="h-3.5 w-3.5" />
            On-site resource
          </div>
        </div>

        {isSignedIn ? <TrackerTable /> : <GuestGate />}
      </div>
    </main>
  );
}