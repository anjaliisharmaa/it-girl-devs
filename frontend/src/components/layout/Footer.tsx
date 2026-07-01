"use client";

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FormEvent, useState } from 'react';
import { Github, Instagram, Twitter, Linkedin, MessageCircle, YoutubeIcon } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const socialLinks = [
    { name: 'The Visuals', href: 'https://www.instagram.com/itgirldevs/', icon: Instagram },
    { name: 'The Series', href: '#', icon: YoutubeIcon },
    { name: 'Group Chat', href: '#', icon: MessageCircle },
    { name: 'Daily Rants', href: 'https://x.com/itgirldevs', icon: Twitter },
    { name: 'The Career', href: '#', icon: Linkedin },
    { name: 'The Code', href: 'https://github.com/anjaliisharmaa/it-girl-devs', icon: Github },
  ];

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      setStatus('error');
      setMessage('Drop your email first, bestie.');
      return;
    }

    setStatus('loading');
    setMessage('');

    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: trimmedEmail,
          source: 'manifest_footer',
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || 'Subscription failed. Please try again.');
      }

      setStatus('success');
      setMessage(data?.message || 'You are in. The Manifest is on the way.');
      setEmail('');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Something went wrong. Try again soon.';
      setStatus('error');
      setMessage(errorMessage);
    }
  };

  return (
    <footer className="relative bg-[#FFD1DC] py-16 px-6 overflow-hidden border-t border-[#590D22]/20">
      <div className="max-w-7xl mx-auto">
        {/* Main Content: 12-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
          
          {/* Left Column: Brand Badge (3 columns) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="col-span-12 md:col-span-3 space-y-6 flex flex-col items-center md:items-start text-center md:text-left"
          >
            {/* Circular Logo Container */}
            <div className="w-24 h-24 rounded-full border-2 border-[#590D22] overflow-hidden">
              <Image
                src="/images/hero/logo.png"
                alt="it-girl devs logo"
                width={96}
                height={96}
                className="object-cover w-full h-full"
              />
            </div>

            {/* Brand Text */}
            <div className="space-y-2">
              <p className="font-fraunces text-lg text-[#590D22]">
                © 2026
              </p>
              <p className="font-outfit text-sm text-[#590D22]/80">
                It-Girl Devs
              </p>
              <a
                href="mailto:itgirldevs@gmail.com"
                className="font-outfit text-sm text-[#590D22]/80 hover:underline block transition-all"
              >
                itgirldevs@gmail.com
              </a>
              <p className="font-outfit text-xs text-[#590D22]/70">
                Coded with 💖 and a dream.
              </p>
            </div>
          </motion.div>

          {/* Middle Column: Newsletter (6 columns) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            viewport={{ once: true }}
            className="col-span-12 md:col-span-6 flex flex-col items-center text-center"
          >
            {/* Header */}
            <h3 className="font-fraunces text-xl text-[#590D22] mb-4">
              The Manifest 🔮
            </h3>

            {/* Subtext */}
            <p className="font-outfit text-sm text-[#590D22]/80 mb-4 leading-relaxed">
              Where manifest.json meets manifesting your dream job. Weekly affirmations, project ideas, and tech updates.
            </p>

            {/* Input Form */}
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 w-full max-w-md mx-auto">
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                disabled={status === 'loading'}
                required
                autoComplete="email"
                className="w-full px-4 py-2 rounded-full border border-[#590D22]/20 bg-white/50 focus:outline-none focus:border-[#590D22] font-outfit text-sm placeholder:text-[#590D22]/40 transition-colors"
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="px-6 py-2 rounded-full bg-[#590D22] text-white font-outfit text-sm font-medium hover:opacity-90 transition-opacity whitespace-nowrap disabled:opacity-70"
              >
                {status === 'loading' ? 'Claiming...' : 'Claim It ✨'}
              </button>
            </form>

            {message ? (
              <p className={`mt-3 font-outfit text-xs ${status === 'error' ? 'text-[#9d174d]' : 'text-[#590D22]/80'}`}>
                {message}
              </p>
            ) : null}
          </motion.div>

          {/* Right Column: Link Stack (3 columns) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="col-span-12 md:col-span-3 flex flex-col items-center md:items-start text-center md:text-left"
          >
            {/* Header */}
            <h3 className="font-fraunces text-xl text-[#590D22] mb-6">
              Don't Be A Stranger 💌
            </h3>

            {/* Social Links with Icons */}
            <div className="flex flex-col gap-3">
              {socialLinks.map((link, index) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={index}
                    href={link.href}
                    target={link.href !== '#' ? '_blank' : '_self'}
                    rel={link.href !== '#' ? 'noopener noreferrer' : ''}
                    className="flex items-center gap-3 font-outfit text-sm text-[#590D22] hover:translate-x-1 transition-transform duration-200 group"
                  >
                    <Icon size={18} className="flex-shrink-0 group-hover:text-[#590D22]/70" />
                    <span className="group-hover:text-[#590D22]/70">{link.name}</span>
                  </Link>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Easter Egg */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        viewport={{ once: true }}
        className="absolute bottom-6 right-6 p-2"
      >
        <p className="font-outfit text-[10px] text-[#590D22]/80 font-medium">
          You look pretty today. Now go study. 🪞
        </p>
      </motion.div>
    </footer>
  );
}
