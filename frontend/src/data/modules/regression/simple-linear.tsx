import React from 'react';

export default function SimpleLinearContent() {
  return (
    <>
      {/* 🎀 The Metadata Badges */}
      <div className="flex flex-wrap gap-3 mb-10">
        <span className="bg-[#FFD1DC] text-[#590D22] px-4 py-1.5 rounded-full text-xs font-mono font-bold shadow-sm">
          ☕ Sip Time: 8 mins
        </span>
        <span className="bg-purple-100 text-purple-700 px-4 py-1.5 rounded-full text-xs font-mono font-bold shadow-sm">
          🎀 Difficulty: First Date Energy
        </span>
        <span className="bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-xs font-mono font-bold shadow-sm">
          🎒 Prereqs: Basic Python, Graphs
        </span>
      </div>

      {/* 🎬 The Episode Teaser */}
      <h2>🎬 The Episode Teaser</h2>
      <p>
        You're sitting in your favorite coffee shop, scrolling through your ex's new girlfriend's Instagram (we've all been there ✨). You notice something: every time she posts a gym selfie, her engagement rate SPIKES. Like, clockwork. You start thinking... is there a <em>formula</em> to this? Can you predict your own Instagram engagement based on how many times you post workout content?
      </p>
      <p>
        Welcome to your villain origin story, bestie. You're about to build your first prediction model, and honestly? It's giving main character energy. <strong>Simple Linear Regression</strong> is your new bestie. She finds straight-line relationships in messy data. She is that friend who can spot a toxic pattern from a MILE away. She's about to help you predict outcomes based on ONE single input. No drama, just math. Let's get into it.
      </p>

      {/* 🖼️ The Mood Board */}
      <h2>🖼️ The Mood Board (Visuals)</h2>
      {/* NOTE: Download your Notion image and save it in public/images/lessons/linear_regression_graph.png */}
      <div className="my-8 p-4 bg-pink-50/50 rounded-2xl border-2 border-pink-100 shadow-sm rotate-1">
        <img 
          src="/images/lessons/linear_regression_graph.png" 
          alt="Linear Regression Graph" 
          className="rounded-xl w-full"
        />
        <p className="text-sm text-center text-[#590D22]/60 mt-4 italic font-medium leading-normal">
          "The line doesn't touch every point because life isn't perfect, but it shows the TREND, and that's what matters 💅"
        </p>
      </div>

      {/* 🍵 The Technical Tea */}
      <h2>🍵 The Technical Tea</h2>
      <p>
        Okay, let's break this down like we're explaining it to our group chat. <strong>Simple Linear Regression</strong> is all about finding the relationship between TWO variables: one input (<strong>independent variable</strong>, let's call her X) and one output (<strong>dependent variable</strong>, let's call her Y). The goal? Draw the best-fitting straight line through your data points so you can make predictions.
      </p>

      <p>The equation is giving main character:</p>
      <div className="bg-pink-50 p-6 rounded-xl border border-pink-200 text-center my-6">
        <p className="font-mono text-2xl text-[#590D22] font-bold m-0">Y = mX + b</p>
        <p className="font-mono text-lg text-pink-600 mt-2 m-0">y = β₁x + β₀</p>
      </div>

      <p><strong>Translation time:</strong></p>
      <ul>
        <li><strong>y</strong> = Your <strong>predicted outcome</strong> (like "expected compliments")</li>
        <li><strong>x</strong> = Your <strong>input feature</strong> (like "hours on skincare")</li>
        <li><strong>β₁ (or m)</strong> = The <strong>slope</strong> (how much Y changes when X increases by 1)</li>
        <li><strong>β₀ (or b)</strong> = The <strong>intercept</strong> (where the line crosses the Y-axis—your baseline vibe even with ZERO effort)</li>
      </ul>

      <h3>How Does She Find This Line?</h3>
      <p>
        Here's where it gets spicy. The algorithm tries MULTIPLE lines and picks the one that minimizes the <strong>Cost Function</strong> (also called <strong>Mean Squared Error</strong> or MSE). Think of the cost function as "total regret"—how far off your predictions are from reality.
      </p>

      <div className="bg-pink-50 p-6 rounded-xl border border-pink-200 text-center my-6">
        <p className="font-mono text-xl text-[#590D22] m-0">MSE = (1/n) * Σ(y_actual - y_predicted)²</p>
      </div>

      <p>
        We square the errors because negative differences would cancel out positive ones (and we're not about that toxic behavior). The algorithm uses <strong>Gradient Descent</strong>—basically trial and error on steroids—to adjust the slope and intercept until the MSE is minimized.
      </p>

      <h3>The Assumptions (Yes, She Has Standards)</h3>
      <p>Linear regression has some non-negotiables:</p>
      <ol>
        <li><strong>Linearity</strong> – The relationship must be straight-line-ish</li>
        <li><strong>Independence</strong> – Each data point is its own person (no copying homework)</li>
        <li><strong>Homoscedasticity</strong> (sorry for the SAT word 😭) – The "scatter" around the line should be consistent, not going wild</li>
        <li><strong>Normality</strong> – Errors should be normally distributed (bell curve vibes)</li>
      </ol>
      <p>If your data violates these? She won't work. It's giving "I can fix him" energy, and we DON'T do that here.</p>

      {/* 💻 The Code */}
      <h2>💻 The Code</h2>
      <pre><code className="language-python">
{`# 🎀 Let's predict how many compliments you get based on skincare time
# Importing our IT girl toolkit
import numpy as np
import matplotlib.pyplot as plt
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error, r2_score

# 📊 Our messy real-life data
skincare_hours = np.array([0.5, 1.0, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0, 4.5, 5.0]).reshape(-1, 1)
compliments_received = np.array([2, 4, 5, 7, 8, 10, 11, 13, 14, 16])

# 🎯 Splitting our data
hours_train, hours_test, compliments_train, compliments_test = train_test_split(
    skincare_hours, compliments_received, test_size=0.2, random_state=42
)

# 🤖 Creating our prediction bestie
bestie_bot = LinearRegression()
bestie_bot.fit(hours_train, compliments_train)

# 🔮 Making predictions
predicted_compliments = bestie_bot.predict(hours_test)

# 📈 Checking her accuracy
mse = mean_squared_error(compliments_test, predicted_compliments)
r2 = r2_score(compliments_test, predicted_compliments)

print(f"✨ The Slope: {bestie_bot.coef_[0]:.2f}")
print(f"💅 The Intercept: {bestie_bot.intercept_:.2f}")
print(f"📉 Mean Squared Error: {mse:.2f}")
print(f"💯 R² Score: {r2:.2f}")`}
      </code></pre>

      <h3>What's Happening Here?</h3>
      <p>
        We're using <strong>sklearn's LinearRegression</strong> class (she's THAT girl). The <code>.fit()</code> method does all the heavy lifting—finding the perfect slope and intercept. Then <code>.predict()</code> uses that formula to guess outcomes.
      </p>
      <p>
        The <strong>R² Score</strong> (R-squared) tells you how well your line fits. If it's 1.0, you found the EXACT pattern. If it's 0.0, your model is useless (giving "he's just not that into you" energy). Anything above 0.7 is considered solid.
      </p>

      {/* 💅 Mini-Project */}
      <div className="bg-gradient-to-br from-pink-50 to-white p-8 rounded-2xl border-2 border-pink-100 shadow-sm mt-12 mb-6">
        <h2 className="mt-0">💅 Mini-Project: "The Latte Factor"</h2>
        <p><strong>Your Mission:</strong> Track how much money you spend on coffee each week and predict your monthly spending.</p>
        <p><strong>Dataset:</strong> <a href="https://www.kaggle.com/datasets/anjaliisharmaa/the-latte-factor" target="_blank" rel="noreferrer" className="text-pink-600 hover:text-pink-800">The Latte Factor on Kaggle</a> (10 weeks of coffee purchases)</p>
        <p><strong>Goal:</strong> Build a linear regression model and answer:</p>
        <ol>
          <li>What's your predicted spending if you buy 15 cups next week?</li>
          <li>What's the slope? (How much does each cup increase your spending?)</li>
          <li>Plot it and make it CUTE (pink theme mandatory 💕)</li>
        </ol>
        <p className="mb-0"><strong>Deliverable:</strong> A Python script + one aesthetic plot. Bonus points if you realize you need to cut back and make better financial decisions ✨</p>
      </div>
    </>
  );
}