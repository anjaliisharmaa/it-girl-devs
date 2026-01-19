import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Github, Instagram, Twitter, Linkedin, MessageCircle } from 'lucide-react';

export default function Footer() {
  const socialLinks = [
    { name: 'The Code', href: 'https://github.com/anjaliisharmaa/it-girl-devs', icon: Github },
    { name: 'The Career', href: '#', icon: Linkedin },
    { name: 'The Visuals', href: 'https://www.instagram.com/itgirldevs/', icon: Instagram },
    { name: 'Daily Rants', href: 'https://x.com/itgirldevs', icon: Twitter },
    { name: 'Group Chat', href: '#', icon: MessageCircle },
  ];

  return (
    <footer className="relative bg-[#FFD1DC] py-16 px-6 overflow-hidden border-t border-[#590D22]/20">
      <div className="max-w-7xl mx-auto">
        {/* Main Content: 12-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Left Column: Brand Badge (4 columns) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="col-span-1 md:col-span-4 space-y-6"
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

          {/* Middle Column: Newsletter (4 columns) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            viewport={{ once: true }}
            className="col-span-1 md:col-span-4"
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
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="your@email.com"
                className="w-full px-4 py-2 rounded-full border border-[#590D22]/20 bg-white/50 focus:outline-none focus:border-[#590D22] font-outfit text-sm placeholder:text-[#590D22]/40 transition-colors"
              />
              <button className="px-6 py-2 rounded-full bg-[#590D22] text-white font-outfit text-sm font-medium hover:opacity-90 transition-opacity whitespace-nowrap">
                Claim It ✨
              </button>
            </div>
          </motion.div>

          {/* Right Column: Link Stack (4 columns) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="col-span-1 md:col-span-4"
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
