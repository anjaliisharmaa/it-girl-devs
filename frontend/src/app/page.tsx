'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Home() {
  const visionBoardCards = [
    {
      id: 1,
      title: 'The First Date',
      subtitle: 'Linear Regression',
      emoji: '☕',
      description: 'When one variable affects another... like coffee dates leading to feelings.',
      gradient: 'from-pink-100 via-white to-pink-50',
    },
    {
      id: 2,
      title: 'The Situationship',
      subtitle: 'Multiple Regression',
      emoji: '🧶',
      description: "It's complicated. Multiple factors, multiple feelings, one messy equation.",
      gradient: 'from-purple-100 via-white to-pink-50',
    },
    {
      id: 3,
      title: 'The Glow Up',
      subtitle: 'Polynomial Regression',
      emoji: '✨',
      description: 'Non-linear growth. Sometimes you level up in curves, not straight lines.',
      gradient: 'from-yellow-100 via-white to-pink-50',
    },
  ];

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="min-h-screen bg-gradient-to-br from-it-girl-pink via-it-girl-cream to-white flex items-center justify-center px-6 py-24">
        <div className="text-center space-y-6 max-w-4xl">
          <h1 className="font-syne font-extrabold text-6xl md:text-8xl text-it-girl-maroon">
            it-girl devs
          </h1>
          <p className="font-outfit font-extrabold text-xl md:text-2xl text-it-girl-maroon/70">
            minimizing loss, maximizing gloss! 🎀
          </p>
          <p className="font-outfit text-lg text-it-girl-maroon/60 max-w-2xl mx-auto">
            You spotting bad vibes is actually Anomaly Detection. We just teach you the code for it. Turn your gut feeling into a high performance algorithm. ✨
          </p>

          {/* CTA Button */}
          <div className="pt-8">
            <Link href="/dashboard">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="bg-it-girl-maroon text-white font-outfit font-bold text-lg px-10 py-5 rounded-full shadow-[0_8px_30px_rgba(89,13,34,0.3)] hover:shadow-[0_12px_40px_rgba(89,13,34,0.4)] transition-all duration-300 backdrop-blur-sm"
              >
                Unlock It Girl Status 🔓
              </motion.button>
            </Link>
          </div>
        </div>
      </section>

      {/* The Vision Board Section */}
      <section className="min-h-screen bg-it-girl-cream py-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="font-syne font-extrabold text-5xl md:text-6xl text-it-girl-maroon mb-4">
              The Vision Board 📌
            </h2>
            <p className="font-outfit text-lg text-it-girl-maroon/70 max-w-2xl mx-auto">
              Your aesthetic guide to machine learning. Pin these vibes, collect the knowledge. ✨
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {visionBoardCards.map((card, index) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, scale: 1.02 }}
                className={`relative bg-gradient-to-br ${card.gradient} backdrop-blur-md rounded-3xl p-8 shadow-[0_8px_30px_rgba(89,13,34,0.1)] hover:shadow-[0_12px_40px_rgba(89,13,34,0.15)] transition-all duration-300 border border-white/50`}
              >
                {/* Emoji Icon */}
                <div className="text-6xl mb-4">{card.emoji}</div>

                {/* Card Content */}
                <h3 className="font-syne font-extrabold text-2xl text-it-girl-maroon mb-2">
                  {card.title}
                </h3>
                <p className="font-outfit font-semibold text-sm text-it-girl-maroon/60 uppercase tracking-wide mb-3">
                  {card.subtitle}
                </p>
                <p className="font-outfit text-base text-it-girl-maroon/70 leading-relaxed">
                  {card.description}
                </p>

                {/* Decorative Corner Element */}
                <div className="absolute top-4 right-4 w-3 h-3 rounded-full bg-it-girl-maroon/20"></div>
              </motion.div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-16">
            <p className="font-outfit text-it-girl-maroon/60 mb-6">
              Ready to start collecting? 💅
            </p>
            <Link href="/dashboard">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="bg-white text-it-girl-maroon font-outfit font-bold text-lg px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-it-girl-maroon/10"
              >
                Explore The Collection →
              </motion.button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
