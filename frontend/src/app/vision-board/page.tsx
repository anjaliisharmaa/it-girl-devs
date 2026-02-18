'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

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
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-it-girl-cream via-white to-pink-50">
      {/* Page Header */}
      <section className="pt-24 pb-12 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-syne font-extrabold text-5xl md:text-7xl text-it-girl-maroon mb-6">
              The Complete Collection 🎀
            </h1>
            <p className="font-outfit text-lg md:text-xl text-it-girl-maroon/70 max-w-3xl mx-auto leading-relaxed">
              Every algorithm, every library, and every vibe you will master. This is your new personality.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pinterest Masonry Grid */}
      <section className="pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6">
            {modules.map((module, index) => (
              <motion.div
                key={module.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="break-inside-avoid mb-6"
              >
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-[#590D22]/10 shadow-[0_4px_20px_rgba(89,13,34,0.08)] hover:shadow-[0_8px_30px_rgba(89,13,34,0.12)] transition-all duration-300 p-6">
                  {/* Module Badge */}
                  <div className="inline-block bg-it-girl-maroon/10 text-it-girl-maroon font-outfit font-bold text-xs px-3 py-1 rounded-full mb-4">
                    {module.moduleNumber}
                  </div>

                  {/* Header */}
                  <h2 className="font-fraunces font-bold text-2xl md:text-3xl text-it-girl-maroon mb-2 leading-tight">
                    {module.vibeTitle}
                  </h2>
                  <p className="font-outfit font-semibold text-sm text-it-girl-maroon/60 uppercase tracking-wide mb-6">
                    {module.techTitle}
                  </p>

                  {/* Topics List */}
                  <ul className="space-y-3">
                    {module.topics.map((topic, topicIndex) => (
                      <li
                        key={topicIndex}
                        className="flex items-start gap-3 font-outfit text-sm text-it-girl-maroon/80 leading-relaxed"
                      >
                        <span className="text-pink-400 mt-0.5 flex-shrink-0">✨</span>
                        <span>{topic}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
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
          >
            <p className="font-outfit text-it-girl-maroon/60 mb-6">
              Ready to start your journey? 💅
            </p>
            <Link href="/episodes">
              <motion.button
                whileHover={{ scale: 1.05 }}
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
