'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

// Washi Tape Component
const WashiTape = ({ color = 'pink' }: { color?: 'pink' | 'blue' | 'yellow' }) => {
  const colorClasses = {
    pink: 'bg-pink-400/50',
    blue: 'bg-blue-400/50',
    yellow: 'bg-yellow-400/50',
  };
  
  return (
    <div className={`absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 ${colorClasses[color]} rotate-2 rounded-sm shadow-sm`} />
  );
};

// Coffee Stain Component
const CoffeeStain = () => (
  <div className="absolute top-2 right-4 w-16 h-16 rounded-full bg-[#8B4513] opacity-5 blur-sm" />
);

export default function VisionBoard() {
  const modules = [
    {
      id: 0,
      moduleNumber: 'MOD 00',
      vibeTitle: 'The Skincare Routine 🧖‍♀️',
      techTitle: 'Data Pre-processing',
      topics: [
        'Data preprocessing techniques',
        'ML toolkit: importing numpy, pandas, etc.',
        'Using scikit-learn to replace missing values',
        'Imputing missing data',
        'Handling categorical data',
        'Prepare data for ML',
        'Feature scaling',
      ],
      style: 'todo',
    },
    {
      id: 1,
      moduleNumber: 'MOD 01',
      vibeTitle: 'The Oracle Era 🔮',
      techTitle: 'Regression',
      topics: [
        'Intro to regression',
        'Simple linear regression',
        'Multiple linear regression',
        'Polynomial regression',
        'Support vector regression',
        'Decision tree regression',
        'Random forest regression',
        'Evaluating regression model performance',
        'Regression model selection',
      ],
      style: 'napkin',
    },
    {
      id: 2,
      moduleNumber: 'MOD 02',
      vibeTitle: 'The Sorting Hat 👒',
      techTitle: 'Classification',
      topics: [
        'Intro to classification',
        'Logistic regression',
        'K-nearest neighbors',
        'Support vector machine',
        'Kernel SVM',
        'Naive Bayes',
        'Decision tree classification',
        'Random forest classification',
        'Classification model selection',
        'Evaluating classification model performance',
      ],
      style: 'quiz',
    },
    {
      id: 3,
      moduleNumber: 'MOD 03',
      vibeTitle: 'Finding Your Tribe 👯‍♀️',
      techTitle: 'Clustering',
      topics: [
        'Intro to clustering',
        'K-means clustering',
        'Hierarchical clustering',
      ],
      style: 'sticky',
      stickyColor: 'yellow',
    },
    {
      id: 4,
      moduleNumber: 'MOD 04',
      vibeTitle: 'The Basket Analysis 🛒',
      techTitle: 'Association Rule Learning',
      topics: [
        'Intro to association rule learning',
        'Apriori',
        'Eclat',
      ],
      style: 'sticky',
      stickyColor: 'pink',
    },
    {
      id: 5,
      moduleNumber: 'MOD 05',
      vibeTitle: 'The Gamer Arc 🎮',
      techTitle: 'Reinforcement Learning',
      topics: [
        'Intro to reinforcement learning',
        'Upper confidence bound',
        'Thompson sampling',
      ],
      style: 'index',
    },
    {
      id: 6,
      moduleNumber: 'MOD 06',
      vibeTitle: 'The Group Chat 💬',
      techTitle: 'Natural Language Processing',
      topics: [
        'Intro to NLP',
        'NLP basics',
        'Implementing bag of words in NLP',
        'Sentiment analysis',
      ],
      style: 'chat',
    },
    {
      id: 7,
      moduleNumber: 'MOD 07',
      vibeTitle: 'The Neural Network 🧠',
      techTitle: 'Deep Learning',
      topics: [
        'Intro to deep learning',
        'ANN (Artificial Neural Networks)',
        'CNN (Convolutional Neural Networks)',
      ],
      style: 'polaroid',
    },
    {
      id: 8,
      moduleNumber: 'MOD 08',
      vibeTitle: 'The Declutter 🧹',
      techTitle: 'Dimensionality Reduction',
      topics: [
        'Intro to dimensionality reduction',
        'PCA (Principal Component Analysis)',
        'LDA (Linear Discriminant Analysis)',
        'Kernel PCA',
      ],
      style: 'sticky',
      stickyColor: 'blue',
    },
    {
      id: 9,
      moduleNumber: 'MOD 09',
      vibeTitle: 'The Final Polish 💅',
      techTitle: 'Model Selection & Boosting',
      topics: [
        'Intro to model selection and boosting',
        'Model selection techniques',
        'XGBoost',
      ],
      style: 'index',
    },
  ];

  const rotations = ['-rotate-1', 'rotate-1', '-rotate-2', 'rotate-2', 'rotate-0'];

  return (
    <main className="min-h-screen bg-[#FDF6F8]">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;700&display=swap');
        
        .handwritten {
          font-family: 'Caveat', cursive;
        }
        
        .lined-paper {
          background-image: 
            repeating-linear-gradient(
              transparent,
              transparent 31px,
              #e0e0e0 31px,
              #e0e0e0 32px
            );
        }
      `}</style>

      {/* Page Header */}
      <section className="pt-24 pb-12 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-syne font-extrabold text-5xl md:text-7xl text-it-girl-maroon mb-6">
              The Vision Board 📌
            </h1>
            <p className="font-outfit text-lg md:text-xl text-it-girl-maroon/70 max-w-3xl mx-auto leading-relaxed">
              Pin your goals. Manifest your career. This is your aesthetic roadmap to mastery.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Scrapbook Masonry Grid */}
      <section className="pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
            {modules.map((module, index) => {
              const rotation = rotations[index % rotations.length];
              
              return (
                <motion.div
                  key={module.id}
                  initial={{ opacity: 0, y: 20, rotate: 0 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className={`break-inside-avoid ${rotation}`}
                >
                  {/* Module 0: To-Do List Style */}
                  {module.style === 'todo' && (
                    <div className="relative bg-white rounded-sm shadow-xl p-6 border-l-4 border-pink-300 lined-paper">
                      <CoffeeStain />
                      <div className="mb-4">
                        <span className="text-xs font-outfit text-it-girl-maroon/50 uppercase">{module.moduleNumber}</span>
                        <h2 className="font-syne font-bold text-2xl text-it-girl-maroon mt-1">
                          {module.vibeTitle}
                        </h2>
                        <p className="handwritten text-lg text-it-girl-maroon/60 mt-1">{module.techTitle}</p>
                      </div>
                      <ul className="space-y-2">
                        {module.topics.map((topic, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-pink-500 font-bold mt-1">☑</span>
                            <span className="font-outfit text-sm text-it-girl-maroon/80">{topic}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Module 1: Napkin Sketch Style */}
                  {module.style === 'napkin' && (
                    <div className="relative bg-white rounded-lg shadow-2xl p-6 border border-gray-100">
                      <div className="mb-4">
                        <span className="text-xs font-outfit text-it-girl-maroon/50 uppercase">{module.moduleNumber}</span>
                        <h2 className="handwritten font-bold text-3xl text-it-girl-maroon">
                          {module.vibeTitle}
                        </h2>
                        <p className="font-outfit text-sm text-it-girl-maroon/60 mt-1">{module.techTitle}</p>
                      </div>
                      {/* Hand-drawn graph */}
                      <div className="relative h-32 mb-4">
                        <svg className="w-full h-full" viewBox="0 0 200 100">
                          <path 
                            d="M 10 90 Q 50 70, 70 50 Q 90 30, 120 20 Q 150 15, 190 10" 
                            stroke="#F472B6" 
                            strokeWidth="3" 
                            fill="none"
                            strokeLinecap="round"
                          />
                        </svg>
                      </div>
                      <ul className="space-y-1.5">
                        {module.topics.map((topic, idx) => (
                          <li key={idx} className="handwritten text-lg text-it-girl-maroon/70">
                            → {topic}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Module 2: Quiz Result Style */}
                  {module.style === 'quiz' && (
                    <div className="relative bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl shadow-xl p-6 border-2 border-purple-200">
                      <div className="text-center mb-4">
                        <span className="text-xs font-outfit text-it-girl-maroon/50 uppercase">{module.moduleNumber}</span>
                        <h2 className="font-syne font-bold text-2xl text-it-girl-maroon mt-1">
                          {module.vibeTitle}
                        </h2>
                        <p className="handwritten text-xl text-it-girl-maroon/60">{module.techTitle}</p>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        {module.topics.map((topic, idx) => (
                          <div key={idx} className="bg-white rounded-lg p-3 shadow-sm">
                            <p className="font-outfit text-xs text-it-girl-maroon/80">{topic}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Module 6: Chat Thread Style */}
                  {module.style === 'chat' && (
                    <div className="relative bg-gradient-to-b from-gray-50 to-white rounded-2xl shadow-xl p-6 border border-gray-200">
                      <div className="mb-4">
                        <span className="text-xs font-outfit text-it-girl-maroon/50 uppercase">{module.moduleNumber}</span>
                        <h2 className="font-syne font-bold text-2xl text-it-girl-maroon">
                          {module.vibeTitle}
                        </h2>
                        <p className="font-outfit text-sm text-it-girl-maroon/60">{module.techTitle}</p>
                      </div>
                      <div className="space-y-3">
                        {module.topics.map((topic, idx) => (
                          <div key={idx} className={idx % 2 === 0 ? 'flex justify-start' : 'flex justify-end'}>
                            <div className={`max-w-[80%] px-4 py-2 rounded-2xl ${
                              idx % 2 === 0 
                                ? 'bg-gray-200 text-gray-800 rounded-bl-sm' 
                                : 'bg-pink-500 text-white rounded-br-sm'
                            }`}>
                              <p className="font-outfit text-sm">{topic}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Module 7: Polaroid Style */}
                  {module.style === 'polaroid' && (
                    <div className="relative bg-white rounded-sm shadow-2xl p-4 pb-16">
                      <div className="bg-gradient-to-br from-gray-800 to-gray-900 h-48 rounded-sm mb-4 flex items-center justify-center">
                        <span className="text-white/30 text-6xl">🧠</span>
                      </div>
                      <div className="handwritten text-center space-y-2">
                        <p className="text-xs text-it-girl-maroon/50 uppercase font-outfit">{module.moduleNumber}</p>
                        <h2 className="text-2xl font-bold text-it-girl-maroon">{module.vibeTitle}</h2>
                        <p className="text-lg text-it-girl-maroon/70">{module.techTitle}</p>
                        {module.topics.map((topic, idx) => (
                          <p key={idx} className="text-base text-it-girl-maroon/60">• {topic}</p>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Sticky Note Style */}
                  {module.style === 'sticky' && (
                    <div className="relative">
                      <WashiTape color={module.stickyColor === 'yellow' ? 'yellow' : module.stickyColor === 'blue' ? 'blue' : 'pink'} />
                      <div className={`p-6 shadow-xl ${
                        module.stickyColor === 'yellow' ? 'bg-yellow-100' :
                        module.stickyColor === 'blue' ? 'bg-blue-100' :
                        'bg-pink-100'
                      }`}>
                        <div className="mb-3">
                          <span className="text-xs font-outfit text-it-girl-maroon/50 uppercase">{module.moduleNumber}</span>
                          <h2 className="handwritten font-bold text-3xl text-it-girl-maroon">
                            {module.vibeTitle}
                          </h2>
                          <p className="font-outfit text-sm text-it-girl-maroon/70 mt-1">{module.techTitle}</p>
                        </div>
                        <ul className="space-y-2">
                          {module.topics.map((topic, idx) => (
                            <li key={idx} className="font-outfit text-sm text-it-girl-maroon/80">
                              ✦ {topic}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}

                  {/* Index Card Style */}
                  {module.style === 'index' && (
                    <div className="relative">
                      <WashiTape color="pink" />
                      <div className="bg-white rounded-sm shadow-lg p-6 border border-orange-200">
                        <div className="mb-4 border-b-2 border-orange-200 pb-2">
                          <span className="text-xs font-outfit text-it-girl-maroon/50 uppercase">{module.moduleNumber}</span>
                          <h2 className="font-syne font-bold text-2xl text-it-girl-maroon">
                            {module.vibeTitle}
                          </h2>
                          <p className="handwritten text-xl text-it-girl-maroon/60">{module.techTitle}</p>
                        </div>
                        <ul className="space-y-2">
                          {module.topics.map((topic, idx) => (
                            <li key={idx} className="font-outfit text-sm text-it-girl-maroon/80 pl-4 border-l-2 border-pink-200">
                              {topic}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bottom Navigation */}
      <section className="pb-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="-rotate-1"
          >
            <p className="handwritten text-2xl text-it-girl-maroon/70 mb-6">
              Ready to start manifesting? 💅
            </p>
            <Link href="/episodes">
              <motion.button
                whileHover={{ scale: 1.05, rotate: 2 }}
                whileTap={{ scale: 0.98 }}
                className="bg-it-girl-maroon text-white font-outfit font-bold text-lg px-10 py-5 rounded-full shadow-[0_8px_30px_rgba(89,13,34,0.3)] hover:shadow-[0_12px_40px_rgba(89,13,34,0.4)] transition-all duration-300"
              >
                Start Learning →
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
