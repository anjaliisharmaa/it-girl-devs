'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function Home() {
  const visionBoardCards = [
    {
      id: 1,
      title: 'The Skin Tint',
      subtitle: 'Simple Linear Regression',
      emoji: '🦋',
      description: 'A lightweight introduction to predicting patterns with just one essential ingredient because we love clarity.',
      gradient: 'from-pink-100 via-white to-pink-50',
    },
    {
      id: 2,
      title: 'The Full Routine',
      subtitle: 'Multiple Linear Regression',
      emoji: '👠',
      description: "Layering multiple variables like sleep and water and serums to understand the complex recipe for a perfect prediction",
      gradient: 'from-purple-100 via-white to-pink-50',
    },
    {
      id: 3,
      title: 'The Transformation',
      subtitle: 'Polynomial Regression',
      emoji: '✨',
      description: 'Mapping your growth journey which is never a boring straight line but a beautiful dramatic curve full of ups and downs',
      gradient: 'from-yellow-100 via-white to-pink-50',
    },
  ];

  const manifestoItems = [
    {
      id: 1,
      emoji: '📚',
      title: 'Acing the Grades',
      description: 'For the girl who wants a 10.0 GPA but hates the boring textbooks. We turn lectures into lifestyle content.',
    },
    {
      id: 2,
      emoji: '🧴',
      title: 'Prepping the Base',
      description: 'You wouldn\'t put makeup on dirty skin. We show you how to scrub your datasets and prep your environment so your code runs smooth, glowing, and error-free.',
    },
    {
      id: 3,
      emoji: '🔮',
      title: 'Predictive Modeling',
      description: 'Manifesting is cute, but math is faster. Stop guessing what\'s going to happen next and build a Linear Regression model that tells you the exact probability of success.',
    },
  ];

  const toolkitFeatures = [
    {
      id: 1,
      emoji: '🎬',
      title: 'Plot Heavy Tutorials',
      description: 'Textbooks are boring so we wrote a screenplay. Learn to code through storylines that feel like your favorite comfort show. Binge watch your way to a degree.',
    },
    {
      id: 2,
      emoji: '🤖',
      title: 'The Vibe Check',
      description: 'Submit your code and get an instant vibe check. Our system spots the bugs you missed and helps you polish your work until it is perfect. It is self care for your syntax.',
    },
    {
      id: 3,
      emoji: '💼',
      title: 'The Power Move',
      description: 'We do not do basic toy projects here. You are building portfolio ready software that proves you are the smartest person in the room. High impact skills for high ambition girls.',
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

      {/* New Standards Just Dropped Section */}
      <section className="relative min-h-screen py-20 px-6 overflow-hidden bg-it-girl-cream">
        {/* Background Texture - Using a subtle pattern overlay */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23590D22\' fill-opacity=\'0.4\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
            backgroundSize: '60px 60px',
          }}
        />
        
        <div className="max-w-6xl mx-auto relative z-10">
          {/* Editorial Title */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-fraunces font-bold text-5xl md:text-7xl text-it-girl-maroon leading-tight mb-6">
              New Standards just Dropped! 
            </h2>
            <p className="font-outfit text-lg text-it-girl-maroon/70 max-w-2xl mx-auto">
              You don't have to choose between Pink and Python.
            </p>
            <div className="w-24 h-1 bg-it-girl-maroon mx-auto opacity-30"></div>
          </motion.div>

          {/* Manifesto Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {manifestoItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-white/80 backdrop-blur-lg rounded-2xl p-8 shadow-[0_8px_30px_rgba(89,13,34,0.08)] hover:shadow-[0_12px_40px_rgba(89,13,34,0.12)] transition-all duration-300 border border-it-girl-maroon/5"
              >
                <div className="text-5xl mb-4">{item.emoji}</div>
                <h3 className="font-syne font-extrabold text-xl text-it-girl-maroon mb-3">
                  {item.title}
                </h3>
                <p className="font-outfit text-base text-it-girl-maroon/70 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What's In The Bag Section */}
      <section className="relative min-h-screen bg-gradient-to-br from-it-girl-pink via-it-girl-cream to-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          {/* Section Header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-syne font-extrabold text-5xl md:text-6xl text-it-girl-maroon mb-4">
              What's In The Bag? 👜
            </h2>
            <p className="font-outfit text-lg text-it-girl-maroon/70 max-w-2xl mx-auto">
              Your new developer toolkit. Everything you need, nothing you don't.
            </p>
          </motion.div>

          {/* Split Screen Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left Side - Scrolling Feature Cards */}
            <div className="space-y-8">
              {toolkitFeatures.map((feature, index) => (
                <motion.div
                  key={feature.id}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="bg-white/90 backdrop-blur-lg rounded-3xl p-8 shadow-[0_8px_30px_rgba(89,13,34,0.1)] hover:shadow-[0_12px_40px_rgba(89,13,34,0.15)] transition-all duration-300 border border-white/50"
                >
                  <div className="flex items-start gap-4">
                    <div className="text-5xl flex-shrink-0">{feature.emoji}</div>
                    <div>
                      <h3 className="font-syne font-extrabold text-2xl text-it-girl-maroon mb-3">
                        {feature.title}
                      </h3>
                      <p className="font-outfit text-base text-it-girl-maroon/70 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Right Side - Sticky Image */}
            <div className="relative lg:sticky lg:top-24 h-[550px] lg:h-[650px]">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="relative h-full rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(89,13,34,0.2)]"
              >
                <Image
                  src="/images/hero/coffee.jpg"
                  alt="What's in the bag"
                  fill
                  className="object-cover"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
