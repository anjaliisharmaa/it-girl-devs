import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function Footer() {
  const socialLinks = [
    { name: 'The Code (GitHub)', href: 'https://github.com/anjaliisharmaa/it-girl-devs' },
    { name: 'The Career (LinkedIn)', href: '#' },
    { name: 'The Visuals 🎨 (Instagram)', href: 'https://www.instagram.com/itgirldevs/' },
    { name: 'Daily Rants 🗣️ (Twitter)', href: 'https://x.com/itgirldevs' },
    { name: 'Group Chat (WhatsApp)', href: '#' },
  ];

  return (
    <footer className="relative bg-it-girl-pink py-16 px-6 overflow-hidden">
      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="flex justify-center mb-8"
      >
        <Image
          src="/images/hero/logo.png"
          alt="it-girl devs logo"
          width={120}
          height={120}
          className="object-contain"
        />
      </motion.div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        viewport={{ once: true }}
        className="text-center mb-10"
      >
        <h2 className="font-fraunces font-bold text-3xl md:text-4xl text-it-girl-maroon">
          Don't Be A Stranger 💌
        </h2>
      </motion.div>

      {/* Social Links */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
        className="flex flex-wrap justify-center items-center gap-6 md:gap-8 mb-12 max-w-4xl mx-auto"
      >
        {socialLinks.map((link, index) => (
          <Link
            key={index}
            href={link.href}
            target={link.href !== '#' ? '_blank' : '_self'}
            rel={link.href !== '#' ? 'noopener noreferrer' : ''}
            className="font-syne font-extrabold text-base md:text-lg text-it-girl-maroon hover:text-white hover:drop-shadow-[0_2px_4px_rgba(89,13,34,0.8)] transition-all duration-200"
          >
            {link.name}
          </Link>
        ))}
      </motion.div>

      {/* Copyright & Contact */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        viewport={{ once: true }}
        className="text-center space-y-2"
      >
        <a
          href="mailto:itgirldevs@gmail.com"
          className="font-outfit text-sm text-it-girl-maroon/80 hover:text-it-girl-maroon transition-colors block"
        >
          itgirldevs@gmail.com
        </a>
        <p className="font-outfit text-sm text-it-girl-maroon/70">
          © 2026 It-Girl Devs. Coded with 💖 and a dream.
        </p>
      </motion.div>

      {/* Easter Egg */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.6 }}
        transition={{ duration: 1, delay: 0.5 }}
        viewport={{ once: true }}
        className="absolute bottom-4 right-4 md:bottom-6 md:right-6"
      >
        <p className="font-outfit text-[10px] text-it-girl-maroon opacity-60">
          You look pretty today. Now go study. 🪞
        </p>
      </motion.div>
    </footer>
  );
}
