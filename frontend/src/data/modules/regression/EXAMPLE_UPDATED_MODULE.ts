import React from 'react';
import { Module } from '@/types/course';

/**
 * Generated Regression Module
 * Auto-generated from Notion exports via notion-importer script
 * Last updated: 2026-05-25T12:55:20.471Z
 * 
 * UPDATED TO USE MARKDOWN CONTENT
 * 
 * To update:
 * 1. Export lessons from Notion as Markdown files
 * 2. Place files in scripts/notion-importer/input/
 * 3. Run: npm run import-notion
 * 4. Update each lesson with markdownContent property containing raw markdown
 */

export const regressionModule: Module = {
  'intro-to-regression': {
    title: 'Introduction to Regression',
    markdownContent: `## Regression glow-up

Picture your skincare routine. You layer gua sha, ice roller, dewy sunscreen, and that perfect pimple patch. Each step builds on the last to get you that glass-skin glow. Now imagine predicting how glowy your skin will look based on how many steps you do. One step? Meh. Full routine? Chef's kiss perfection. Zero steps? Back to square one.

Regression is that exact vibe. It predicts a number (like glow level, sales, salary, temperature) based on one or more inputs. No yes/no categories, just smooth, precise numbers.

## The mood board

![Simple Linear Regression Graph](/images/modules/regression/0-introduction-to-regression/simple_linear_regression_graph.png)

The line doesn't touch every point because life isn't perfect, but it shows the TREND, and that's what matters

## Why we need regression?

Real life gives us endless numbers to predict: house prices from size and location, sales from ad spend, your exam score from study hours, delivery time from distance and traffic. Regression learns from past data to make these predictions.

It shows relationships between variables and gives actionable numbers. Instead of "ads help," it tells you "$1000 spend = 25 extra sales." Precision is everything.

## Types of regression

Quick rundown (full glam details in later modules):

- Simple linear: One input, straight line.
- Multiple linear: Many inputs, still straight.
- Polynomial: Curved lines for bendy patterns.
- Support vector: Finds the best boundary for complex data.
- Decision tree: Tree-like splits for decisions.
- Random forest: Many trees voting together for better accuracy.

## Applications

- Predicting house prices or salaries.
- Forecasting sales and demand.
- Estimating health recovery time or drug doses.
- Weather temps and rainfall.
- Student grades from study habits.
- Marketing ROI from campaigns.

## Advantages

- Super easy to get and explain.
- Predicts exact numbers.
- Spots variable connections.
- Solid starting point for any project.
- Flexible with tweaks.

## Disadvantages

- Can miss curved or messy patterns.
- Outliers mess it up.
- Needs all key inputs or it flops.
- Complex versions might overfit without checks.

Regression is your first skincare glow-up in ML. Master this, and you're set to slay the fancier models next. You got this, bestie!`,
    content: () => React.createElement('div', {}),
    metadata: {
      sipTime: '6 mins',
      difficulty: 'Beginner (your first glow-up)',
      prerequisites: 'None, just your curiosity',
    },
    prevLesson: undefined,
    nextLesson: 'simple-linear-regression',
  },
  'simple-linear-regression': {
    title: 'Simple Linear Regression',
    markdownContent: `## The episode teaser

You are romanticizing your Sunday afternoon, working with some clay to make those cute Pinterest trinket dishes, fueled by a ridiculously strong dark roast espresso. You notice a pattern. Every single time you post a video of your sketching or clay process, the saves and reposts completely skyrocket. You start wondering if there is an actual formula to this. Can you predict exactly how much love your art will get based on the hours you spend creating it?

Welcome to your newest obsession. You are about to build your first prediction model. Simple Linear Regression is about to be your new favorite tool for your it girl devs journey. She finds the straight line relationship hidden inside messy data. She is that one organized friend who can spot a clear pattern in pure chaos. She is going to help you predict exactly what will happen based on one single input. No drama and pure logic. Let us get right into it.

## The mood board

![linear regression graph.png](/images/modules/regression/1-simple-linear-regression/linear_regression_graph.png)

The line doesn't touch every point because life isn't perfect, but it shows the TREND, and that's what matters.

## Decoding the pattern

Okay let us spill the technical tea like we are dropping voice notes in the group chat.

Simple Linear Regression is basically just figuring out how two things relate to each other. You have your one input which is the independent variable. Let us call her X. In our current art era, X is the hours you spend smoothing out that clay or perfecting your sketches.

Then you have your one output which is the dependent variable. We can call her Y. She is called dependent because she depends completely on X. For us, Y is the amount of saves your aesthetic reel gets.

The whole goal here is to draw the absolute best straight line directly through all your data points. Once you have that perfect line you can predict exactly how much love your next project will get before you even post it.

The math behind this is actually so cute and simple. The equation looks like this: \`Y = mX + b\`

Or if we want to sound super official in our ML era: \`y = β₁x + β₀\`

## Breaking down the variables

Let us translate what these letters actually mean for our art project:

- \`y\` = Your **predicted outcome** (like "expected saves")
- \`x\` = Your **input feature** (like "hours on creating")
- \`β₁\` or \`m\` = The **slope** (how much Y changes when X increases by 1)
- \`β₀\` or \`b\` = The **intercept** (where the line crosses the Y-axis—your baseline vibe even with ZERO effort)

## How does she find this line?

Here is where it gets spicy. The algorithm tries MULTIPLE lines and picks the one that minimizes the **Cost Function** (also called **Mean Squared Error** or MSE). Think of the cost function as "total regret"—how far off your predictions are from reality.

The formula for MSE is:

\`MSE = (1/n) × Σ(yᵢ - ŷᵢ)²\`

Where:

- \`yᵢ\` = **Actual value** (real saves you got)
- \`ŷᵢ\` = **Predicted value** (what the model THOUGHT you'd get)
- \`n\` = Number of data points

We square the errors because negative differences would cancel out positive ones (and we are not about that toxic behavior). The algorithm uses **Gradient Descent**—basically trial and error on steroids—to adjust the slope and intercept until the MSE is minimized.

## The assumptions (Yes, she has standards)

Linear regression has some non-negotiables:

1. **Linearity** – The relationship must be straight-line-ish
2. **Independence** – Each data point is its own person (no copying homework)
3. **Homoscedasticity** (sorry for the SAT word) – The "scatter" around the line should be consistent, not going wild
4. **Normality** – Errors should be normally distributed (bell curve vibes)

If your data violates these? She won't work. It's giving "I can fix him" energy, and we DON'T do that here.

## The code

\`\`\`python
# Let's predict how many compliments you get based on skincare time

# Importing our IT girl toolkit
import numpy as np
import matplotlib.pyplot as plt
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error, r2_score

# Our messy real-life data
# Hours spent on skincare routine per day
skincare_hours = np.array([0.5, 1.0, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0, 4.5, 5.0]).reshape(-1, 1)

# Compliments received that day
compliments_received = np.array([2, 4, 5, 7, 8, 10, 11, 13, 14, 16])

# Splitting our data (80% train, 20% test)
hours_train, hours_test, compliments_train, compliments_test = train_test_split(
    skincare_hours, 
    compliments_received, 
    test_size=0.2, 
    random_state=42
)

# Creating our prediction bestie
bestie_bot = LinearRegression()

# Teaching her the pattern
bestie_bot.fit(hours_train, compliments_train)

# Making predictions
predicted_compliments = bestie_bot.predict(hours_test)

# Checking accuracy
mse = mean_squared_error(compliments_test, predicted_compliments)
r2 = r2_score(compliments_test, predicted_compliments)

print(f"Slope: {bestie_bot.coef_[0]:.2f}")
print(f"Intercept: {bestie_bot.intercept_:.2f}")
print(f"Mean Squared Error: {mse:.2f}")
print(f"R² Score: {r2:.2f}")
\`\`\`

## What's happening here?

We are using **sklearn's LinearRegression** class (she's THAT girl). The \`.fit()\` method does all the heavy lifting—finding the perfect slope and intercept. Then \`.predict()\` uses that formula to guess outcomes.

The **R² Score** tells you how well your line fits. If it's 1.0, you found the EXACT pattern. If it's 0.0, your model is useless. Anything above 0.7 is considered solid.

## Mini-Project: "The Latte Factor"

**Your Mission:** Track how much money you spend on coffee each week and predict your monthly spending.

**Dataset:** [The Latte Factor on Kaggle](https://www.kaggle.com/datasets/anjaliisharmaa/the-latte-factor) (10 weeks of coffee purchases)

**Goal:** Build a linear regression model and answer:

1. What's your predicted spending if you buy 15 cups next week?
2. What's the slope? (How much does each cup increase your spending?)
3. Plot it and make it CUTE (pink theme mandatory)

**Deliverable:** A Python script + one aesthetic plot. Bonus points if you realize you need to cut back on coffee! `,
    content: () => React.createElement('div', {}),
    metadata: {
      sipTime: '8 mins',
      difficulty: 'First Date Energy (Beginner-Friendly)',
      prerequisites: 'Basic Python, knowing what a graph is',
    },
    prevLesson: 'intro-to-regression',
    nextLesson: 'multiple-linear-regression',
    datasetFile: 'latte.csv',
  },
  // Add remaining lessons following this same pattern
  // Make sure each has markdownContent with raw markdown strings
};
