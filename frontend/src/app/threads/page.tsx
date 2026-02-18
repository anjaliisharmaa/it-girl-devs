'use client';

import { motion } from 'framer-motion';
import Footer from '@/components/layout/Footer';
import { Instagram, Twitter, Youtube, Linkedin, Download, Copy, Eye } from 'lucide-react';

// Loading Bar Component
const LoadingBar = () => {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="relative h-8 bg-gray-300/50 rounded-full overflow-hidden backdrop-blur-sm border-2 border-[#590D22]/20">
        <motion.div
          className="h-full bg-gradient-to-r from-[#FF69B4] to-[#FFD1DC] relative"
          initial={{ width: '0%' }}
          animate={{ width: '98%' }}
          transition={{ duration: 2, ease: 'easeInOut' }}
        >
          <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(255,255,255,0.2)_10px,rgba(255,255,255,0.2)_20px)]" />
        </motion.div>
      </div>
      <motion.p
        className="text-center mt-3 font-mono text-[#590D22]/70 text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        System Loading: 98%
      </motion.p>
    </div>
  );
};

// Social Card Component
const SocialCard = ({
  platform,
  icon: Icon,
  description,
  link,
  delay,
}: {
  platform: string;
  icon: any;
  description: string;
  link: string;
  delay: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
      className="relative group"
    >
      <div className="relative bg-white/40 backdrop-blur-md rounded-2xl p-8 border-2 border-white/60 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 h-full flex flex-col items-center justify-between min-h-[280px]">
        {/* Icon */}
        <div className="flex-grow flex items-center justify-center">
          <Icon className="w-20 h-20 text-[#590D22] opacity-80 mb-4" strokeWidth={1.5} />
        </div>
        
        {/* Platform Name */}
        <h3 className="text-2xl font-bold text-[#590D22] mb-2">{platform}</h3>
        
        {/* Description */}
        <p className="text-[#590D22]/70 text-center text-sm mb-6 px-2">{description}</p>
        
        {/* Follow Link */}
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-2 bg-[#590D22] text-white rounded-full font-semibold hover:bg-[#FF69B4] transition-colors duration-300"
        >
          Follow
        </a>
      </div>
    </motion.div>
  );
};

// Spotify Placeholder Component
const SpotifyPlaceholder = ({ title, mood }: { title: string; mood: string }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="bg-gradient-to-br from-[#1DB954] to-[#191414] rounded-2xl p-8 shadow-xl"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-white">{title}</h3>
        <span className="text-4xl">{mood}</span>
      </div>
      <div className="space-y-3">
        <div className="h-3 bg-white/20 rounded-full animate-pulse" />
        <div className="h-3 bg-white/20 rounded-full animate-pulse w-4/5" />
        <div className="h-3 bg-white/20 rounded-full animate-pulse w-3/5" />
      </div>
      <div className="mt-8 flex items-center justify-between">
        <div className="flex gap-4">
          <div className="w-10 h-10 rounded-full bg-white/30 animate-pulse" />
          <div className="w-10 h-10 rounded-full bg-white/30 animate-pulse" />
          <div className="w-10 h-10 rounded-full bg-white/30 animate-pulse" />
        </div>
        <div className="text-white/60 text-sm font-mono">Coming Soon</div>
      </div>
    </motion.div>
  );
};

// Resource Card Component
const ResourceCard = ({
  title,
  description,
  icon: Icon,
  delay,
}: {
  title: string;
  description: string;
  icon: any;
  delay: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
      className="relative group cursor-pointer"
    >
      <div className="relative bg-gradient-to-br from-[#FFD1DC] to-[#FFC0CB] rounded-2xl p-8 border-2 border-[#590D22]/20 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 h-full">
        {/* Icon in corner like a file tab */}
        <div className="absolute -top-3 -right-3 bg-[#590D22] rounded-full p-4 shadow-lg group-hover:rotate-12 transition-transform duration-300">
          <Icon className="w-6 h-6 text-white" strokeWidth={2} />
        </div>
        
        {/* Content */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-[#590D22] pr-8">{title}</h3>
          <p className="text-[#590D22]/70 text-sm leading-relaxed">{description}</p>
        </div>
        
        {/* Bottom corner fold effect */}
        <div className="absolute bottom-0 right-0 w-8 h-8 bg-[#590D22]/10 rounded-tl-2xl" />
      </div>
    </motion.div>
  );
};

export default function ThreadsPage() {
  const socialPlatforms = [
    {
      platform: 'Instagram',
      icon: Instagram,
      description: 'The Aesthetic. Reels, mini-tutorials, and BTS of the build.',
      link: 'https://www.instagram.com/itgirldevs/',
    },
    {
      platform: 'Twitter / X',
      icon: Twitter,
      description: 'The Rants. Relatable coding struggles & daily chaos.',
      link: 'https://x.com/itgirldevs',
    },
    {
      platform: 'YouTube',
      icon: Youtube,
      description: 'The Classroom. Deep dives & project walkthroughs.',
      link: '#',
    },
    {
      platform: 'LinkedIn',
      icon: Linkedin,
      description: 'The Bag. Career tips & professional wins.',
      link: '#',
    },
  ];

  const resources = [
    {
      title: 'The "Hire Me" Resume',
      description: 'The exact template that got me into DRDO.',
      icon: Download,
    },
    {
      title: 'Cold Email Scripts',
      description: 'Copy-paste templates to DM recruiters.',
      icon: Copy,
    },
    {
      title: 'Pink Python Cheatsheet',
      description: 'Syntax, but make it cute.',
      icon: Eye,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFD1DC] via-[#FFC0CB] to-[#FFB6C1] relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#FF69B4]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#FFD1DC]/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/5 rounded-full blur-3xl" />
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        
        {/* Section 1: The Hero - "The Waitlist" */}
        <section className="py-32 px-6">
          <div className="max-w-6xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="font-['Fraunces'] text-6xl md:text-8xl font-bold text-[#590D22] mb-8"
              style={{ fontFamily: 'Fraunces, serif' }}
            >
              You Can Sit With Us.
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-xl md:text-2xl text-[#590D22]/80 mb-12 max-w-3xl mx-auto leading-relaxed"
            >
              The ultimate headquarters for It-Girls in tech is loading... Join the priority list to be the first inside.
            </motion.p>
            
            {/* Loading Bar */}
            <div className="mb-16">
              <LoadingBar />
            </div>
            
            {/* Email Signup */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="max-w-2xl mx-auto"
            >
              <div className="flex flex-col sm:flex-row gap-4 bg-white/50 backdrop-blur-md rounded-2xl p-4 border-2 border-white/60 shadow-2xl">
                <input
                  type="email"
                  placeholder="your.email@gmail.com"
                  className="flex-grow px-6 py-4 rounded-xl bg-white/80 border-2 border-[#590D22]/20 text-[#590D22] placeholder-[#590D22]/50 focus:outline-none focus:border-[#FF69B4] transition-colors text-lg"
                />
                <button className="px-8 py-4 bg-[#590D22] text-white rounded-xl font-bold text-lg hover:bg-[#FF69B4] transition-colors duration-300 whitespace-nowrap shadow-lg hover:shadow-xl">
                  Notify Me 💌
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Section 2: The Social Grid - "Choose Your Character" */}
        <section className="py-32 px-6 bg-white/20 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-5xl md:text-6xl font-bold text-[#590D22] mb-4">
                Choose Your Character 📱
              </h2>
              <p className="text-xl text-[#590D22]/70 max-w-2xl mx-auto">
                Pick your platform. We're everywhere.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {socialPlatforms.map((platform, index) => (
                <SocialCard
                  key={platform.platform}
                  {...platform}
                  delay={index * 0.1}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Section 3: The Aux Cord - "Set The Tone" */}
        <section className="py-32 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-5xl md:text-6xl font-bold text-[#590D22] mb-4">
                Set The Tone 🎧
              </h2>
              <p className="text-xl text-[#590D22]/70 max-w-2xl mx-auto">
                Coding Moods
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <SpotifyPlaceholder title="Focus Mode" mood="🧠" />
              <SpotifyPlaceholder title="Villain Era" mood="😈" />
            </div>
          </div>
        </section>

        {/* Section 4: The Locker - "The Secret Stash" */}
        <section className="py-32 px-6 bg-white/20 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-5xl md:text-6xl font-bold text-[#590D22] mb-4">
                Open The Locker 📂
              </h2>
              <p className="text-xl text-[#590D22]/70 max-w-2xl mx-auto">
                Gatekeeping? We don't know her. Steal my personal resources.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {resources.map((resource, index) => (
                <ResourceCard
                  key={resource.title}
                  {...resource}
                  delay={index * 0.15}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Bottom spacing before footer */}
        <div className="py-16" />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
