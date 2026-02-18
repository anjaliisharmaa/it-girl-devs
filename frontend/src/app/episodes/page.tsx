"use client";

import React from "react";

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
      <div className="max-w-7xl mx-auto px-6 py-12 pt-32">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="font-fraunces text-5xl md:text-6xl font-bold text-gray-900 mb-4">
            Season 1: The Foundation
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            From zero to deployed. Binge-watch your way to a career.
          </p>
        </div>

        {/* Episodes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((module) => (
            <div
              key={module.id}
              className="bg-white/40 backdrop-blur-md rounded-2xl shadow-lg overflow-hidden border border-white/60 hover:scale-105 transition-transform duration-300 flex flex-col"
            >
              {/* Card Content */}
              <div className="p-6 flex-grow">
                {/* Episode Header */}
                <div className="mb-4">
                  <div className="text-sm font-semibold text-pink-600 mb-1">
                    EP {String(module.id).padStart(2, "0")}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {module.title}
                  </h3>
                  <div className="text-lg font-semibold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                    {module.vibeTitle}
                  </div>
                </div>

                {/* Topics List */}
                <ul className="space-y-2 mb-6">
                  {module.topics.slice(0, 3).map((topic, index) => (
                    <li
                      key={index}
                      className="text-sm text-gray-700 flex items-start"
                    >
                      <span className="mr-2 text-pink-500">•</span>
                      <span>{topic}</span>
                    </li>
                  ))}
                  {module.topics.length > 3 && (
                    <li className="text-sm text-gray-500 italic ml-4">
                      and more...
                    </li>
                  )}
                </ul>

                {/* Action Button */}
                <button
                  disabled={module.status === "locked"}
                  className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-200 ${
                    module.status === "unlocked"
                      ? "bg-pink-600 text-white hover:bg-pink-700 shadow-md hover:shadow-lg"
                      : "bg-gray-400 text-gray-200 opacity-50 cursor-not-allowed"
                  }`}
                >
                  {module.status === "unlocked" ? "Play ▶️" : "Locked 🔒"}
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
    </div>
  );
}
