'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Unlock } from 'lucide-react';
import { useClerk, useUser, UserButton } from '@clerk/nextjs';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { openSignIn } = useClerk();
  const { isSignedIn } = useUser();

  // Scroll detection hook
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Episodes', href: '/episodes' },
    { name: 'Lore', href: '/lore' },
    { name: 'Threads', href: '/threads' },
  ];

  return (
    <>
      <motion.nav
        initial={{ backgroundColor: 'rgba(255, 255, 255, 0)' }}
        animate={{
          backgroundColor: isScrolled
            ? 'rgba(255, 240, 245, 0.7)' // it-girl-cream with opacity
            : 'rgba(255, 255, 255, 0)',
          backdropFilter: isScrolled ? 'blur(12px)' : 'blur(0px)',
          boxShadow: isScrolled
            ? '0 4px 6px -1px rgba(89, 13, 34, 0.1)'
            : '0 0 0 0 rgba(0, 0, 0, 0)',
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="fixed top-0 left-0 right-0 z-50 px-6 py-4 lg:px-12 overflow-visible"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between overflow-visible">
          {/* Logo - Left */}
          <Link href="/" className="flex items-center overflow-visible -mb-2">
            <span 
              className="font-syne font-extrabold text-2xl lg:text-3xl text-it-girl-maroon hover:opacity-80 transition-opacity inline-block"
              style={{ lineHeight: '1.75', paddingBottom: '0.5rem' }}
            >
              it-girl devs
            </span>
          </Link>

          {/* Navigation Links - Center (Desktop only) */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="font-syne font-extrabold text-lg text-it-girl-maroon hover:text-[#e3d0d9] hover:drop-shadow-[0_2px_4px_rgba(89,13,34,0.8)] transition-all duration-200"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* CTA Button - Right (Desktop only) */}
          <div className="hidden lg:flex items-center gap-4">
            {!isSignedIn ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => openSignIn()}
                className="flex items-center gap-2 bg-it-girl-maroon text-white px-6 py-3 rounded-full font-outfit font-semibold hover:bg-opacity-90 transition-all shadow-lg cursor-pointer"
              >
                <span>Unlock</span>
                <Unlock size={18} />
              </motion.button>
            ) : (
              <UserButton />
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden text-it-girl-maroon hover:text-it-girl-pink transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu - Full Screen */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed inset-0 z-40 bg-it-girl-pink lg:hidden"
          >
            <div className="flex flex-col items-center justify-center h-full space-y-8 px-6">
              {/* Mobile Navigation Links */}
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="font-syne font-extrabold text-4xl text-it-girl-maroon hover:text-white transition-colors duration-200 leading-relaxed pb-1"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}

              {/* Mobile CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.1 }}
                className="mt-8 flex gap-4 items-center"
              >
                {!isSignedIn ? (
                  <button 
                    onClick={() => openSignIn()}
                    className="flex items-center gap-3 bg-it-girl-maroon text-white px-8 py-4 rounded-full font-outfit font-semibold text-xl shadow-xl cursor-pointer"
                  >
                    <span>Unlock</span>
                    <Unlock size={22} />
                  </button>
                ) : (
                  <UserButton />
                )}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
