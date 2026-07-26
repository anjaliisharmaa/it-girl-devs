'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { SignIn, useAuth } from '@clerk/nextjs';
import { Copy, Eye, Mail, Sparkles } from 'lucide-react';



const labs = [
  {
    "labName": "Advanced Centre for Energetic Materials (ACEM)",
    "location": "Maharashtra",
    "poc": "Shri KPS Murthy, General Manager",
    "emailAddress": "director@acem.drdo.in",
    "researchAreas": "Engineering Sciences, Chemical Sciences, Physical Sciences"
  },
  {
    "labName": "Advanced Systems Laboratory (ASL)",
    "location": "Telangana",
    "poc": "Dr MRM Babu, Director",
    "emailAddress": "director@asl.drdo.in",
    "researchAreas": "Engineering Sciences, Chemical Sciences, Physical Sciences, Astronomy & Space Sciences"
  },
  {
    "labName": "Aerial Delivery Research and Development Establishment (ADRDE)",
    "location": "Uttar Pradesh",
    "poc": "Shri Arun Kumar Saxena, Director",
    "emailAddress": "director@adrde.drdo.in",
    "researchAreas": "Engineering Sciences, Astronomy & Space Sciences, Chemical Sciences, Physical Sciences"
  },
  {
    "labName": "Aeronautical Development Agency (ADA)",
    "location": "Karnataka",
    "poc": "Dr Girish S. Deodhare, Director",
    "emailAddress": "webmaster@jetmail.ada.gov.in",
    "researchAreas": "Engineering Sciences, Astronomy & Space Sciences"
  },
  {
    "labName": "Aeronautical Development Establishment (ADE)",
    "location": "Karnataka",
    "poc": "Dr S Venugopal, Director",
    "emailAddress": "director@ade.drdo.in",
    "researchAreas": "Engineering Sciences, Astronomy & Space Sciences, Chemical Sciences, Physical Sciences"
  },
  {
    "labName": "Armament Research & Development Establishment (ARDE)",
    "location": "Maharashtra",
    "poc": "Dr V V Rao, Director",
    "emailAddress": "director@arde.drdo.in",
    "researchAreas": "Engineering Sciences, Chemical Sciences, Physical Sciences"
  },
  {
    "labName": "Centre for Air Borne System (CABS)",
    "location": "Karnataka",
    "poc": "Dr K Rajalakshmi Menon, Director",
    "emailAddress": "director.cabs@gov.in",
    "researchAreas": "Engineering Sciences, Chemical Sciences, Physical Sciences, Computer Sciences and Information Technology"
  },
  {
    "labName": "Centre for Artificial Intelligence & Robotics (CAIR)",
    "location": "Karnataka",
    "poc": "Dr Subrata Rakshit, Director",
    "emailAddress": "director@cair.drdo.in",
    "researchAreas": "Engineering Sciences, Chemical Sciences, Physical Sciences, Computer Sciences and Information Technology"
  },
  {
    "labName": "Centre for Fire, Explosive and Environment Safety (CFEES)",
    "location": "Delhi",
    "poc": "Shri Rajiv Narang, Director",
    "emailAddress": "director@cfees.drdo.in",
    "researchAreas": "Engineering Sciences, Chemical Sciences, Physical Sciences, Computer Sciences and Information Technology"
  },
  {
    "labName": "Centre for Military Airworthiness & Certification (CEMILAC)",
    "location": "Karnataka",
    "poc": "Shri APVS Prasad, Chief Executive",
    "emailAddress": "chief@cemilac.drdo.in",
    "researchAreas": "Engineering Sciences"
  },
  {
    "labName": "Centre for Personnel Talent Management (CEPTAM)",
    "location": "Delhi",
    "poc": "Dr Alok Jain, Director",
    "emailAddress": "director.ceptam@gov.in",
    "researchAreas": "Engineering Sciences"
  },
  {
    "labName": "Combat Vehicles Research & Development Establishment (CVRDE)",
    "location": "Tamil Nadu",
    "poc": "Shri V. Balamurugan, Director",
    "emailAddress": "director.cvrde@gov.in",
    "researchAreas": "Engineering Sciences, Chemical Sciences, Physical Sciences"
  },
  {
    "labName": "Defence Avionics Research Establishment (DARE)",
    "location": "Karnataka",
    "poc": "Dr K Maheswara Reddy, Director",
    "emailAddress": "director.dare@gov.in",
    "researchAreas": "Engineering Sciences, Physical Sciences, Computer Sciences and Information Technology"
  },
  {
    "labName": "Defence Bio-Engineering & Electro Medical Laboratory (DEBEL)",
    "location": "Karnataka",
    "poc": "Dr T M Kotresh, Director",
    "emailAddress": "director.debel@gov.in",
    "researchAreas": "Life Sciences & Biotechnology, Astronomy & Space Sciences"
  },
  {
    "labName": "Defence Electronics Application Laboratory (DEAL)",
    "location": "Uttarakhand",
    "poc": "Shri Mangal Lal Chand, Director",
    "emailAddress": "director.deal@gov.in",
    "researchAreas": "Engineering Sciences, Physical Sciences, Computer Sciences and Information Technology"
  },
  {
    "labName": "Defence Electronics Research Laboratory (DLRL)",
    "location": "Telangana",
    "poc": "Shri N S Rao, Director",
    "emailAddress": "director.dlrl@gov.in",
    "researchAreas": "Engineering Sciences, Physical Sciences"
  },
  {
    "labName": "Defence Food Research Laboratory (DFRL)",
    "location": "Karnataka",
    "poc": "Dr Anil Dutt Semwal, Director",
    "emailAddress": "director.dfrl@gov.in",
    "researchAreas": "Life Sciences & Biotechnology"
  },
  {
    "labName": "Defence Geoinformatics Research Establishment (DGRE)",
    "location": "Chandigarh",
    "poc": "Dr Pramod K Satyawali, Director",
    "emailAddress": "director.dgre@gov.in",
    "researchAreas": "Engineering Sciences"
  },
  {
    "labName": "Defence Institute of Bio-Energy Research (DIBER)",
    "location": "Uttarakhand",
    "poc": "Dr Madhu Bala, Director",
    "emailAddress": "director.diber@gov.in",
    "researchAreas": "Energy Sciences, Life Sciences & Biotechnology"
  },
  {
    "labName": "Defence Institute of High Altitude Research (DIHAR)",
    "location": "Ladakh",
    "poc": "Dr Om Prakash, Chaurasia",
    "emailAddress": "director.dihar@gov.in",
    "researchAreas": "Life Sciences & Biotechnology, Agricultural Sciences, Energy Sciences"
  },
  {
    "labName": "Defence Institute of Physiology & Allied Sciences (DIPAS)",
    "location": "Delhi",
    "poc": "Dr Rajeev Varshney, Director",
    "emailAddress": "director.dipas@gov.in",
    "researchAreas": "Life Sciences & Biotechnology"
  },
  {
    "labName": "Defence Institute of Psychological Research (DIPR)",
    "location": "Delhi",
    "poc": "Dr K. Ramachandran, Director",
    "emailAddress": "director@dipr.drdo.in",
    "researchAreas": "Engineering Sciences"
  },
  {
    "labName": "Defence Laboratory Jodhpur (DLJ)",
    "location": "Rajasthan",
    "poc": "Shri Ravindra Kumar, Director",
    "emailAddress": "director.dl@gov.in",
    "researchAreas": "Engineering Sciences, Life Sciences & Biotechnology"
  },
  {
    "labName": "Defence Materials and Stores Research and Development Establishment (DMSRDE)",
    "location": "Uttar Pradesh",
    "poc": "Dr N. Eswara Prasad, Director",
    "emailAddress": "director.dmsrde@gov.in",
    "researchAreas": "Engineering Sciences, Chemical Sciences"
  },
  {
    "labName": "Defence Metallurgical Research Laboratory (DMRL)",
    "location": "Telangana",
    "poc": "Dr G Madhusudhan Reddy, Director",
    "emailAddress": "director.dmrl@gov.in",
    "researchAreas": "Engineering Sciences, Chemical Sciences"
  },
  {
    "labName": "Defence Research & Development Laboratory (DRDL)",
    "location": "Telangana",
    "poc": "Shri GAS Murthy, Director",
    "emailAddress": "director.drdl@gov.in",
    "researchAreas": "Engineering Sciences, Chemical Sciences, Physical Sciences, Astronomy & Space Sciences"
  },
  {
    "labName": "Defence Research Development Establishment (DRDE)",
    "location": "Madhya Pradesh",
    "poc": "Dr Manmohan Parida, Director",
    "emailAddress": "director@drde.drdo.in",
    "researchAreas": "Chemical Sciences, Life Sciences & Biotechnology"
  },
  {
    "labName": "Defence Research Laboratory (DRL)",
    "location": "Assam",
    "poc": "Dr Dev Vrat Kamboj, Director",
    "emailAddress": "director.drl@gov.in",
    "researchAreas": "Engineering Sciences, Life Sciences & Biotechnology"
  },
  {
    "labName": "Defence Scientific Information & Documentation Centre (DESIDOC)",
    "location": "Delhi",
    "poc": "Dr K Nageswara Rao, Director",
    "emailAddress": "director.desidoc@gov.in",
    "researchAreas": "Engineering Sciences"
  },
  {
    "labName": "DRDO Young Scientist Laboratory (DYSL-CT)",
    "location": "Tamil Nadu",
    "poc": "Manish Pratap Singh, Director",
    "emailAddress": "director.dysl-ct@gov.in",
    "researchAreas": "Engineering Sciences, Computer Sciences and Information Technology"
  },
  {
    "labName": "DRDO Young Scientist Laboratory (DYSL-QT)",
    "location": "Maharashtra",
    "poc": "Dr Santu Sardar, Director",
    "emailAddress": "director.dysl-qt@gov.in",
    "researchAreas": "Engineering Sciences, Physical Sciences"
  },
  {
    "labName": "Electronics & Radar Development Establishment (LRDE)",
    "location": "Karnataka",
    "poc": "Shri P Radhakrishna, Director",
    "emailAddress": "director.lrde@gov.in",
    "researchAreas": "Engineering Sciences, Physical Sciences, Astronomy & Space Sciences"
  },
  {
    "labName": "Gas Turbine Research Establishment (GTRE)",
    "location": "Karnataka",
    "poc": "Shri M Z Siddique, Director",
    "emailAddress": "director.gtre@gov.in",
    "researchAreas": "Engineering Sciences, Chemical Sciences, Physical Sciences"
  },
  {
    "labName": "High Energy Materials Research Laboratory (HEMRL)",
    "location": "Maharashtra",
    "poc": "Shri KPS Murthy, Director",
    "emailAddress": "director.hemrl@gov.in",
    "researchAreas": "Engineering Sciences, Chemical Sciences, Physical Sciences"
  },
  {
    "labName": "Institute for Systems Studies & Analyses (ISSA)",
    "location": "Delhi",
    "poc": "Shri S.B.Taneja, Director",
    "emailAddress": "director.issa@gov.in",
    "researchAreas": "Engineering Sciences, Computer Sciences and Information Technology"
  },
  {
    "labName": "Institute of Nuclear Medicine & Allied Sciences (INMAS)",
    "location": "Delhi",
    "poc": "Dr Anil Kumar Mishra, Director",
    "emailAddress": "director.inmas@gov.in",
    "researchAreas": "Life Sciences & Biotechnology, Medical Sciences"
  },
  {
    "labName": "Institute of Technology Management (ITM)",
    "location": "Uttarakhand",
    "poc": "Shri Shreedhar KattiDirector",
    "emailAddress": "director.itm@gov.in",
    "researchAreas": "Engineering Sciences"
  },
  {
    "labName": "Instruments Research & Development Establishment (IRDE)",
    "location": "Uttarakhand",
    "poc": "Dr Ajay Kumar, Director",
    "emailAddress": "director.irde@gov.in",
    "researchAreas": "Engineering Sciences, Physical Sciences"
  },
  {
    "labName": "Integrated Test Range (ITR)",
    "location": "Odisha",
    "poc": "Shri Harekrishna Ratha, Director",
    "emailAddress": "director.itr@gov.in",
    "researchAreas": "Engineering Sciences, Physical Sciences, Computer Sciences and Information Technology"
  },
  {
    "labName": "Microwave Tube Research & Development Centre (MTRDC)",
    "location": "Karnataka",
    "poc": "Shri G Viswam, Director",
    "emailAddress": "director.mtrdc@gov.in",
    "researchAreas": "Engineering Sciences, Physical Sciences"
  },
  {
    "labName": "Naval Materials Research Laboratory (NMRL)",
    "location": "Maharashtra",
    "poc": "Shri PT Rojatkar, Director",
    "emailAddress": "director.nmrl@gov.in",
    "researchAreas": "Chemical Sciences, Life Sciences & Biotechnology"
  },
  {
    "labName": "Naval Physical & Oceanographic Laboratory (NPOL)",
    "location": "Kerala",
    "poc": "Dr Ajith Kumar K, Director",
    "emailAddress": "director.npol@gov.in",
    "researchAreas": "Engineering Sciences, Computer Sciences and Information Technology"
  },
  {
    "labName": "Naval Science & Technological Laboratory (NSTL)",
    "location": "Andhra Pradesh",
    "poc": "Dr Y Sreenivas Rao, Director",
    "emailAddress": "director.nstl@gov.in",
    "researchAreas": "Engineering Sciences, Physical Sciences"
  },
  {
    "labName": "Proof & Experimental Establishment (PXE)",
    "location": "Odisha",
    "poc": "Shri DK Josh, Director",
    "emailAddress": "director.pxe@gov.in",
    "researchAreas": "Engineering Sciences, Physical Sciences"
  },
  {
    "labName": "Research & Development Establishment (Engineers) [R&DE(Engrs)]",
    "location": "Maharashtra",
    "poc": "Shri PM Kurulkar, Director",
    "emailAddress": "imsg.rde@gov.in",
    "researchAreas": "Engineering Sciences"
  },
  {
    "labName": "Research Centre Imarat (RCI)",
    "location": "Telangana",
    "poc": "Shri U Raja Babu, Director",
    "emailAddress": "director.rci@gov.in",
    "researchAreas": "Engineering Sciences, Astronomy & Space Sciences"
  },
  {
    "labName": "Scientific Analysis Group (SAG)",
    "location": "Delhi",
    "poc": "Smt U Jeya Santhi, Director",
    "emailAddress": "director.sag@gov.in",
    "researchAreas": "Engineering Sciences, Computer Sciences and Information Technology"
  },
  {
    "labName": "Solid State Physics Laboratory (SSPL)",
    "location": "Delhi",
    "poc": "Dr Seema Vinayak, Director",
    "emailAddress": "director.sspl@gov.in",
    "researchAreas": "Engineering Sciences, Physical Sciences"
  },
  {
    "labName": "Terminal Ballistics Research Laboratory (TBRL)",
    "location": "Chandigarh",
    "poc": "Shri Prateek Kishore",
    "emailAddress": "director.tbrl@gov.in",
    "researchAreas": "Engineering Sciences, Physical Sciences"
  },
  {
    "labName": "Vehicles Research Development Establishment (VRDE)",
    "location": "Maharashtra",
    "poc": "Dr Shailendra V Gade",
    "emailAddress": "director.vrde@gov.in",
    "researchAreas": "Engineering Sciences, Physical Sciences"
  }
];


// cold email template

const coldEmailTemplate = `Subject: Request for Winter Internship Opportunity at [Lab name] 2026

Respected Director,

I am [Your Full Name], a [Year]-year B.Tech student majoring in [Your Branch] at [Your University Name], one of India’s leading engineering institutes. As a motivated student with a keen interest in research and innovation, I am eager to gain practical exposure and contribute to ongoing projects in your esteemed laboratory. My academic foundation includes [list your core areas, e.g., Machine Learning, Robotics, Data Science, etc.].

After learning about the significant research conducted at [Name of DRDO Lab], I was particularly inspired by your work in [specific research area, e.g., AI-driven threat detection]. I believe my skills in [relevant technical skills, e.g., Python, Computer Vision, etc.] and experience in [your domain experience, e.g., predictive modeling, hardware prototyping, etc.] could be valuable in exploring [how your skills align with the lab’s work].

For example, my recent project “[Project Title]” focused on [brief 1–2 line summary of the project, mentioning methods or outcomes relevant to the lab’s research]. This experience strengthened my understanding of [relevant topic] and improved my ability to [key takeaway, e.g., apply algorithms to real-world problems].

I am enthusiastic about the opportunity to intern at [Lab Name] during the winter of 2026 (Dec–Jan) and contribute to your ongoing research. I am open to on-site or hybrid work arrangements based on the lab’s requirements.

Please find attached my  resume and academic mark sheets for your reference. I can also provide a Letter of Recommendation upon request.

Thank you very much for your time and consideration. I look forward to the possibility of contributing to your team.

Yours sincerely,
[Your Full Name]
[Department / Branch Name]
[University Name]
[City, State, Country]
[Your Email Address]
[Your Contact Number]
`;

function TrackerTable() {
  const [copyState, setCopyState] = useState('Copy to Clipboard');
  const [selectedLocation, setSelectedLocation] = useState('All Locations');
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);
  const copyTimeoutRef = useRef<number | null>(null);

  const uniqueLocations = ['All Locations', ...Array.from(new Set(labs.map((lab) => lab.location))).sort()];
  const filteredLabs = selectedLocation === 'All Locations' ? labs : labs.filter((lab) => lab.location === selectedLocation);

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

  const handleEmailCopy = async (emailAddress: string) => {
    try {
      await navigator.clipboard.writeText(emailAddress);

      if (copyTimeoutRef.current) {
        window.clearTimeout(copyTimeoutRef.current);
      }

      setCopiedEmail(emailAddress);
      copyTimeoutRef.current = window.setTimeout(() => setCopiedEmail(null), 2000);
    } catch (error) {
      console.error('Failed to copy email:', error);
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
              Here is the master list of all 50 labs across India. Find the location or research area that matches your domain, grab the POC email, and shoot your shot. Good luck!
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

        <div className="mb-4 flex flex-col gap-3 rounded-[1.35rem] border border-[#590D22]/10 bg-[#FFD1DC]/35 px-4 py-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#590D22]/65">Location filter</p>
            <p className="mt-1 text-sm text-[#590D22]/70">Narrow the list by location.</p>
          </div>

          <div className="relative w-full md:w-[260px]">
            <select
              value={selectedLocation}
              onChange={(event) => setSelectedLocation(event.target.value)}
              className="w-full appearance-none rounded-full border border-[#590D22]/15 bg-white px-4 py-3 pr-10 text-sm font-medium text-[#590D22] outline-none transition-colors focus:border-[#590D22] focus:ring-2 focus:ring-[#590D22]/15"
            >
              {uniqueLocations.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-[#590D22]/60">
              <svg aria-hidden="true" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 10.94l3.71-3.71a.75.75 0 1 1 1.06 1.06l-4.24 4.24a.75.75 0 0 1-1.06 0L5.21 8.27a.75.75 0 0 1 .02-1.06Z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-[1.5rem] border border-[#590D22]/10 bg-[#FFD1DC]/40">
          <div className="overflow-x-auto">
            <table className="min-w-[940px] w-full border-collapse text-left text-sm text-[#590D22]">
              <thead className="bg-white/70 text-xs uppercase tracking-[0.18em] text-[#590D22]/70">
                <tr>
                  <th className="px-5 py-4 font-semibold">S.NO.</th>
                  <th className="px-5 py-4 font-semibold">Lab Name</th>
                  <th className="px-5 py-4 font-semibold">Location</th>
                  <th className="px-5 py-4 font-semibold">POC</th>
                  <th className="px-5 py-4 font-semibold">Email Address</th>
                  <th className="px-5 py-4 font-semibold">Research Areas</th>
                </tr>
              </thead>
              <tbody>
                {filteredLabs.map((lab, index) => (
                  <tr key={lab.labName} className={index % 2 === 0 ? 'bg-white/55' : 'bg-[#FFD1DC]/25'}>
                    <td className="border-t border-[#590D22]/10 px-5 py-4 font-semibold">{index + 1}</td>
                    <td className="border-t border-[#590D22]/10 px-5 py-4 font-semibold">{lab.labName}</td>
                    <td className="border-t border-[#590D22]/10 px-5 py-4">{lab.location}</td>
                    <td className="border-t border-[#590D22]/10 px-5 py-4">{lab.poc}</td>
                    <td className="border-t border-[#590D22]/10 px-5 py-4">
                      <div className="flex flex-wrap items-center gap-3">
                        <button
                          type="button"
                          onClick={() => handleEmailCopy(lab.emailAddress)}
                          className="group inline-flex items-center gap-2 text-[#590D22] outline-none transition-colors hover:text-[#800F2F]"
                          title="Click to copy email"
                        >
                          <Copy className="h-4 w-4 transition-transform group-hover:scale-110" />
                          <span className="underline decoration-[#590D22]/30 underline-offset-4">
                            {lab.emailAddress}
                          </span>
                        </button>

                        {copiedEmail === lab.emailAddress ? (
                          <span className="rounded-full bg-[#590D22] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white">
                            Copied!
                          </span>
                        ) : null}
                      </div>
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
            <p className="mt-2 text-sm text-[#590D22]/70">Copy the template and customize the placeholders before sending. Do not forget to attach your Resume and University Marksheets.</p>
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
        <h1 className="font-fraunces text-4xl font-bold text-[#590D22] md:text-5xl">DRDO Labs Tracker</h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-[#590D22]/70">
          Sign in or sign up to instantly unlock the full directory of 50 DRDO labs and my copy-paste cold email script.
        </p>
        <div className="mt-8 grid gap-3 text-sm text-[#590D22]/75 md:grid-cols-3">
          <div className="rounded-2xl border border-[#590D22]/10 bg-[#FFD1DC]/35 p-4">50 Lab Contacts</div>
          <div className="rounded-2xl border border-[#590D22]/10 bg-[#FFD1DC]/35 p-4">15 Locations</div>
          <div className="rounded-2xl border border-[#590D22]/10 bg-[#FFD1DC]/35 p-4">100% Free</div>
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