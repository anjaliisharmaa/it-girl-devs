"use client";

import React from "react";
import Footer from "@/components/layout/Footer";

interface Module {
  id: number;
  title: string;
  vibeTitle: string;
  topics: string[];
  status: "locked" | "unlocked";
  progress: number;
}

export default function EpisodesPage() {
  const modules: Module[] = [
    {
      id: 0,
      title: "Data Pre-processing",
      vibeTitle: "The Skincare Routine 🧖‍♀️",
      topics: [
        "Data cleaning",
        "Importing libraries (Pandas/Numpy)",
        "Handling NaN",
        "Encoding categorical data",
        "Feature scaling",
      ],
      status: "unlocked",
      progress: 15,
    },
    {
      id: 1,
      title: "Regression",
      vibeTitle: "The Oracle Era 🔮",
      topics: [
        "Simple/Multiple Linear Regression",
        "Polynomial",
        "SVR",
        "Decision Trees",
        "Random Forest",
        "Model Selection",
      ],
      status: "locked",
      progress: 0,
    },
    {
      id: 2,
      title: "Classification",
      vibeTitle: "The Sorting Hat 👒",
      topics: [
        "Logistic Regression",
        "KNN",
        "SVM",
        "Kernel SVM",
        "Naive Bayes",
        "Decision Trees",
        "Classification metrics",
      ],
      status: "locked",
      progress: 0,
    },
    {
      id: 3,
      title: "Clustering",
      vibeTitle: "Finding Your Tribe 👯‍♀️",
      topics: [
        "K-Means Clustering",
        "Hierarchical Clustering",
        "Dendrograms",
      ],
      status: "locked",
      progress: 0,
    },
    {
      id: 4,
      title: "Association Rule Learning",
      vibeTitle: "The Basket Analysis 🛒",
      topics: [
        "Apriori Algorithm",
        "Eclat Algorithm",
        "Recommendation systems",
      ],
      status: "locked",
      progress: 0,
    },
    {
      id: 5,
      title: "Reinforcement Learning",
      vibeTitle: "The Gamer Arc 🎮",
      topics: [
        "Upper Confidence Bound (UCB)",
        "Thompson Sampling",
        "AI Agents",
      ],
      status: "locked",
      progress: 0,
    },
    {
      id: 6,
      title: "Natural Language Processing",
      vibeTitle: "The Group Chat 💬",
      topics: [
        "Bag of Words",
        "Sentiment Analysis",
        "Tokenization",
        "Stop words",
      ],
      status: "locked",
      progress: 0,
    },
    {
      id: 7,
      title: "Deep Learning",
      vibeTitle: "The Neural Network 🧠",
      topics: [
        "ANN (Artificial Neural Networks)",
        "CNN (Convolutional Neural Networks)",
      ],
      status: "locked",
      progress: 0,
    },
    {
      id: 8,
      title: "Dimensionality Reduction",
      vibeTitle: "The Declutter 🧹",
      topics: [
        "PCA (Principal Component Analysis)",
        "LDA",
        "Kernel PCA",
      ],
      status: "locked",
      progress: 0,
    },
    {
      id: 9,
      title: "Model Selection & Boosting",
      vibeTitle: "The Final Polish 💅",
      topics: [
        "k-Fold Cross Validation",
        "Grid Search",
        "XGBoost",
      ],
      status: "locked",
      progress: 0,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-6 py-12 pt-32 pb-24">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="font-fraunces text-4xl md:text-5xl font-bold text-[#590D22] mb-4">
            The Blueprint 🗺️
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto text-balance">
            The complete roadmap from Python basics to Deep Learning. Trust the process.
          </p>
        </div>

        {/* Episodes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {modules.map((module) => (
            <div
              key={module.id}
              className={`rounded-lg overflow-hidden border-2 border-[#590D22] shadow-[4px_4px_0px_0px_rgba(89,13,34,0.3)] hover:scale-105 transition-all duration-300 flex flex-col ${
                module.status === "locked" ? "opacity-70" : ""
              }`}
            >
              {/* Window Header (Mac-style Terminal) */}
              <div className="h-10 bg-[#590D22] flex items-center px-4 relative">
                {/* Window Control Dots */}
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                {/* Filename */}
                <div className="absolute left-1/2 transform -translate-x-1/2 text-white/60 text-xs font-mono">
                  module_{String(module.id).padStart(2, "0")}.py
                </div>
              </div>

              {/* Window Body */}
              <div className="bg-white/80 backdrop-blur p-6 flex-grow flex flex-col">
                {/* Episode Tag */}
                <div className="font-mono text-xs text-[#590D22] bg-pink-100 px-2 py-1 rounded-md w-fit mb-3">
                  &gt; EP_{String(module.id).padStart(2, "0")}
                </div>

                {/* Module Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {module.title}
                </h3>

                {/* Vibe Title */}
                <div className="text-lg font-semibold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent mb-4">
                  {module.vibeTitle}
                </div>

                {/* Topics List (Code Comments Style) */}
                <ul className="space-y-2 mb-6 flex-grow">
                  {module.topics.slice(0, 3).map((topic, index) => (
                    <li
                      key={index}
                      className="text-xs font-mono text-[#590D22]/70 flex items-start"
                    >
                      <span className="mr-2">//</span>
                      <span>{topic}</span>
                    </li>
                  ))}
                  {module.topics.length > 3 && (
                    <li className="text-xs font-mono text-[#590D22]/70 italic ml-5">
                      // and more...
                    </li>
                  )}
                </ul>

                {/* Action Button */}
                <button
                  disabled={module.status === "locked"}
                  className={`w-full py-3 px-4 rounded-lg font-mono font-semibold transition-all duration-200 ${
                    module.status === "unlocked"
                      ? "bg-[#590D22] text-white hover:bg-[#7a1129] shadow-md hover:shadow-lg"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  {module.status === "unlocked" ? "Run Module ▶" : "Access Denied 🔒"}
                </button>
              </div>

              {/* Progress Bar */}
              <div className="h-2 bg-gray-200">
                <div
                  className="h-full bg-gradient-to-r from-pink-500 to-purple-600 transition-all duration-300"
                  style={{ width: `${module.progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
