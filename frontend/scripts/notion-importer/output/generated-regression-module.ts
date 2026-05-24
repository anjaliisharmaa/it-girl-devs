import React from 'react';
import { Module } from '@/types/course';

/**
 * Generated Regression Module
 * Auto-generated from Notion exports via notion-importer script
 * Last updated: 2026-05-24T19:44:09.687Z
 * 
 * To update:
 * 1. Export lessons from Notion as Markdown files
 * 2. Place files in scripts/notion-importer/input/
 * 3. Run: npm run import-notion
 */

export const regressionModule: Module = {
  'simple-linear-regression': {
    title: 'Simple Linear Regression',
    content: () => React.createElement('div', { dangerouslySetInnerHTML: { __html: `# Simple Linear Regression

## What is Simple Linear Regression?

Simple Linear Regression is a fundamental machine learning technique that models the relationship between two variables: one independent variable (X) and one dependent variable (Y). It assumes a linear relationship between the input features and the target output.

### Key Concepts

- **Independent Variable (X)**: The input feature we use to make predictions
- **Dependent Variable (Y)**: The output we're trying to predict
- **Line of Best Fit**: The linear equation that best represents the relationship

## The Mathematics Behind It

The formula for a simple linear regression line is:

```
Y = mX + b
```

Where:
- **Y** is the predicted value
- **X** is the input feature
- **m** is the slope of the line
- **b** is the y-intercept

## Real-World Example: House Prices

Imagine you want to predict house prices based on square footage:

- **X** (independent): Square footage of the house
- **Y** (dependent): Price of the house

Simple Linear Regression finds the best-fit line through your data points, allowing you to predict prices for new houses.

## When to Use Simple Linear Regression

✅ You have a linear relationship between variables
✅ You want a simple, interpretable model
✅ Your dataset is relatively small
✅ You need fast training and prediction times

❌ Don't use it when the relationship is clearly non-linear
❌ Don't use it when you have many independent variables (use Multiple Linear Regression instead)

## Implementing Simple Linear Regression

### Using Python and Scikit-Learn

```python
from sklearn.linear_model import LinearRegression
import numpy as np

# Sample data
X = np.array([[1], [2], [3], [4], [5]])  # Square footage (in hundreds)
y = np.array([200, 250, 300, 350, 400])  # Price (in thousands)

# Create and fit the model
model = LinearRegression()
model.fit(X, y)

# Make predictions
new_house = np.array([[6]])
predicted_price = model.predict(new_house)
print(f"Predicted price: ${predicted_price[0] * 1000}")

# Get model parameters
print(f"Slope (m): {model.coef_[0]}")
print(f"Intercept (b): {model.intercept_}")
```

## Key Takeaways

1. Simple Linear Regression models a linear relationship between two variables
2. The goal is to find the line that minimizes the distance from all data points
3. It's interpretable and fast, but limited to linear relationships
4. Use it as a baseline model before trying more complex algorithms

---

**Ready to practice?** Try building a simple linear regression model with your own dataset!` } }),
    metadata: {
      sipTime: '8 mins',
      difficulty: 'First Date Energy (Beginner-Friendly)',
      prerequisites: 'Basic Python, knowing what a graph is',
    },
    prevLesson: 'intro-to-regression',
    nextLesson: 'multiple-linear-regression',
    datasetFile: 'simple-linear-regression.csv',
    projectRubric: 'AI Evaluator Rubric: [TODO - Add detailed instructions for evaluating Simple Linear Regression. Include acceptance criteria, code quality expectations, and test coverage requirements.]',
  },
};
