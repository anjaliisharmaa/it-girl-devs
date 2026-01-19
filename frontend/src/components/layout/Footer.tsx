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
    <footer className="relative bg-it-girl-pink py-12 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Main Content: Split Layout */}
        <div className="flex flex-col lg:flex-row justify-between gap-12 lg:gap-16">
          
          {/* Left Column: Brand Identity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            {/* Logo */}
            <div>
              <Image
                src="/images/hero/logo.png"
                alt="it-girl devs logo"
                width={96}
                height={96}
                className="object-contain"
              />
            </div>

            {/* Contact Info */}
            <div className="space-y-2">
              <a
                href="mailto:itgirldevs@gmail.com"
                className="font-outfit text-sm text-it-girl-maroon hover:underline block transition-all"
              >
                itgirldevs@gmail.com
              </a>
              <p className="font-outfit text-xs text-it-girl-maroon/80">
                © 2026 It-Girl Devs. Coded with 💖 and a dream.
              </p>
            </div>
          </motion.div>

          {/* Right Column: Connect Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="lg:text-right"
          >
            {/* Header */}
            <h3 className="font-fraunces font-bold text-2xl text-it-girl-maroon mb-6">
              Don't Be A Stranger 💌
            </h3>

            {/* Social Links */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-4">
              {socialLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  target={link.href !== '#' ? '_blank' : '_self'}
                  rel={link.href !== '#' ? 'noopener noreferrer' : ''}
                  className="font-outfit text-sm text-it-girl-maroon hover:text-white hover:drop-shadow-[0_2px_4px_rgba(89,13,34,0.8)] transition-all duration-200 lg:text-right"
                >
                  {link.name}
                </Link>
              ))}
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
        className="absolute bottom-4 right-4 md:bottom-6 md:right-6"
      >
        <p className="font-outfit text-[10px] text-it-girl-maroon/80 font-medium">
          You look pretty today. Now go study. 🪞
        </p>
      </motion.div>
    </footer>
  );
}
