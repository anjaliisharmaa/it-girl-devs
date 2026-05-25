import React from 'react';
import { Module } from '@/types/course';

/**
 * Generated Regression Module
 * Auto-generated from Notion exports via notion-importer script
 * Last updated: 2026-05-25T12:55:20.471Z
 * 
 * To update:
 * 1. Export lessons from Notion as Markdown files
 * 2. Place files in scripts/notion-importer/input/
 * 3. Run: npm run import-notion
 */

export const regressionModule: Module = {
  'intro-to-regression': {
    title: 'Introduction to Regression',
    markdownContent: `## Regression glow-up

Picture your skincare routine. You layer gua sha, ice roller, dewy sunscreen, and that perfect pimple patch. Each step builds on the last to get you that glass-skin glow. Now imagine predicting how glowy your skin will look based on how many steps you do. One step? Meh. Full routine? Chef’s kiss perfection. Zero steps? Back to square one.

Regression is that exact vibe. It predicts a number (like glow level, sales, salary, temperature) based on one or more inputs. No yes/no categories, just smooth, precise numbers.

## The mood board

![Simple Linear Regression Graph](/images/modules/regression/0-introduction-to-regression/simple_linear_regression_graph.png)

The line doesn't touch every point because life isn't perfect, but it shows the TREND, and that's what matters

## Why we need regression?

Real life gives us endless numbers to predict: house prices from size and location, sales from ad spend, your exam score from study hours, delivery time from distance and traffic. Regression learns from past data to make these predictions.

It shows relationships between variables and gives actionable numbers. Instead of “ads help,” it tells you “$1000 spend = 25 extra sales.” Precision is everything.

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

Regression is your first skincare glow-up in ML. Master this, and you’re set to slay the fancier models next. You got this, bestie!`,
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

The math behind this is actually so cute and simple. The equation looks like this:

$$
Y=mX+b
$$

Or if we want to sound super official in our ML era:

$$
y=β_1x+β_0
$$

Let us translate what these letters actually mean for our art project.

- *y* is your predicted outcome. This is the total number of saves your aesthetic reel is going to get.
- *x* is your input feature. This is the exact number of hours you spent crafting your clay and filming the process.
- *β₁* or *m* is the slope (your engagement boost). For every extra hour you spend perfecting your art, how many extra saves do you get. It shows exactly how your hard work pays off.
- *β₀* or *b* is the intercept. This is your baseline aesthetic. Even if you spent zero extra hours planning and just posted a quick unedited clip of your messy desk, this is the guaranteed love your supportive mutuals will show you anyway.

### How does she find this line?

How does our algorithm actually find this perfect line. Here is where the tea gets extra hot. She does not just guess once. She tries out multiple different lines and picks the exact one that minimizes something called the Cost Function. You will also hear this called Mean Squared Error or MSE.

The cost function is your total regret level. It measures exactly how far off your prediction was from reality. When you expect a massive wave of saves on your clay sculpting video but get totally different numbers that gap is your error.

The formula for MSE looks like this:

$$
MSE = \\frac{1}{n} \\sum_{i=1}^{n} (y_i - \\hat{y}_i)^2
$$

Let us translate the variables.

- $y_i$  is your actual value. This is the real amount of saves your aesthetic reel actually got.
- $\hat{y}_i$ is the predicted value. This is what your model thought you were going to get.
- *n* is the total number of data points or the total number of posts you made.

You might be wondering why we square the errors. If we did not do that, the negative differences would just cancel out the positive ones. We are completely skipping that toxic behavior because every single error matters whether it was too high or too low.

To fix these errors, the algorithm uses something called Gradient Descent. It is as an incredibly smart trial and error strategy. She keeps adjusting the slope and the baseline until that MSE is as tiny as possible. She does all the heavy math work so you can just focus on creating your beautiful art.

### The assumptions (Yes, she has standards)

Simple Linear Regression has a few strict rules before she agrees to help you predict your aesthetic reel saves. She is a true girls girl but she needs your data to follow some basic logic before she puts in the work.

1. First is Linearity. The relationship between your clay crafting hours and your engagement needs to be somewhat straight. Putting in more effort should generally result in more love from your supportive mutuals.
2. Second is Independence. Every single video you post has to be its own unique moment. You cannot just upload the exact same sketching process twice and expect the algorithm to treat them as brand new separate events.
3. Third is Homoscedasticity. Please forgive the massive textbook word. It just means the scatter of your data should be consistent. The difference between your expected saves and actual saves should stay within a normal range instead of being wildly unpredictable.
4. Finally we have Normality. Your hits and misses should balance out naturally. Most of your predictions will be super close to reality with only a rare few, completely missing the mark.

If your data completely ignores these rules, she simply will not work. Trying to force it is like putting a heavy facial oil right over your dewy sunscreen. It is just going to pill and make a huge mess. We do not force things that do not blend. We just find a better model.

## [The Code](https://colab.research.google.com/drive/1aF03ygzHi8VA-8USnvkV6hMkt2Mrop26?usp=sharing)

Time to actually write the code and make this real. We are taking the exact logic we just talked about and putting it straight into Python. It is incredibly satisfying to watch the algorithm learn your specific creative patterns.

\\\`\\\`\\\`python
# Let us predict how many saves your aesthetic reel gets based on creation time
# Importing our it girl toolkit
import numpy as np
import matplotlib.pyplot as plt
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error, r2_score

# Our real life data
# Hours spent on clay sculpting and filming per post
clay_hours = np.array([0.5, 1.0, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0, 4.5, 5.0]).reshape(10, 1)

# Saves received on that specific reel
# Tracking everything because we love data
reel_saves = np.array([20, 40, 50, 70, 80, 100, 110, 130, 140, 160])

# Splitting our data because we need a test group
# 80 percent for training our model and 20 percent for testing her predictions
hours_train, hours_test, saves_train, saves_test = train_test_split(
    clay_hours, 
    reel_saves, 
    test_size=0.2, 
    random_state=42  # this number keeps results completely organized
)

# Creating our prediction bestie
bestie_bot = LinearRegression()

# Teaching her the pattern so she can learn your aesthetic
bestie_bot.fit(hours_train, saves_train)

# Making predictions on our test data
predicted_saves = bestie_bot.predict(hours_test)

# Checking her accuracy to see if she is getting it right
mse = mean_squared_error(saves_test, predicted_saves)
r2 = r2_score(saves_test, predicted_saves)

print(f"The Slope or how much each hour matters: {bestie_bot.coef_[0]:.2f}")
print(f"The Intercept or your natural baseline saves: {bestie_bot.intercept_:.2f}")
print(f"Mean Squared Error or total regret: {mse:.2f}")
print(f"R Squared Score or accuracy percentage: {r2:.2f}")

# Let us visualize this
plt.figure(figsize=(10, 6))
plt.scatter(clay_hours, reel_saves, color='#FF69B4', s=100, alpha=0.6, label='Real Life Data')
plt.plot(clay_hours, bestie_bot.predict(clay_hours), color='#FF1493', linewidth=3, label='Prediction Line')
plt.xlabel('Hours on Creating', fontsize=12)
plt.ylabel('Saves Received', fontsize=12)
plt.title('The Pinterest Virality Formula', fontsize=14, fontweight='bold')
plt.legend()
plt.grid(alpha=0.3)
plt.show()

# Future prediction what happens if I spend 6 hours tomorrow
future_routine = np.array([[6.0]])
future_saves = bestie_bot.predict(future_routine)
print(f"\nIf you do {future_routine[0][0]} hours tomorrow expect {future_saves[0]:.0f} saves!")
\\\`\\\`\\\`

### What's happening here?

Let us look at those numbers our algorithm just dropped. The slope is 31.03 which means for every extra hour you spend perfecting your clay details, you are expected to get around 31 more saves. 

![slr_colab_output_1.png](/images/modules/regression/1-simple-linear-regression/slr_colab_output_1.png)

Your intercept is 4.66, which is your baseline. Even if you spend practically zero time planning, you still get those supportive saves from your regular mutuals. Your total regret or Mean Squared Error is only 18.58, which is super low. That tells us the model is making really smart guesses.

Now look at that R Squared score of 0.99. This is basically your model telling you she aced the assignment. A perfect score is 1.0 so hitting 0.99 means your prediction line fits your real life data almost perfectly. The math completely backs up your creative process.

Now, the plot itself is literal visual perfection. Those light pink dots are your actual past posts. That bright pink line running straight through them is your algorithm predicting the future. Notice how closely the dots hug the line. That means your aesthetic is super reliable and your engagement grows steadily the more effort you pour into your art.

![slr_colab_output_2.png](/images/modules/regression/1-simple-linear-regression/slr_colab_output_2.png)

Then we asked her to predict the future. We told the algorithm you are going to spend 6.0 hours tomorrow sculpting something amazing. She calculated the math and told us to expect exactly 191 saves. You literally just predicted your own Pinterest virality before even touching the clay.

![slr_colab_output_3.png](/images/modules/regression/1-simple-linear-regression/slr_colab_output_3.png)

## Mini-Project: "The Latte Factor"

**Your Mission:** We are tracking exactly how much we spend on our daily coffee runs and using code to predict our future budget. Because an organized developer always knows her data.

**Dataset:** You can grab your starter data right here at [https://www.kaggle.com/datasets/anjaliisharmaa/the-latte-factor](https://www.kaggle.com/datasets/anjaliisharmaa/the-latte-factor). (Or you can just use **pd.read_csv('latte.csv')** and let Pyxie load it for you right here!) It holds ten weeks of cute coffee purchases. X is the amount of cups per week and Y is the total money spent.

**Goal:** Build a linear regression model and answer:

1. What's your predicted spending if you buy 15 cups next week?
2. What's the slope? (How much does each cup increase your spending?)

**Deliverable:** You will create one clean Python script. Bonus points if analyzing your own data inspires you to start romanticizing making your dark roast at home.`  ,
    content: () => React.createElement('div', {}),
    metadata: {
      sipTime: '23 mins',
      difficulty: 'Soft Launch Era (Completely Beginner Friendly)',
      prerequisites: 'Basic Python, knowing what a graph is',
    },
    prevLesson: 'intro-to-regression',
    nextLesson: 'multiple-linear-regression',
    datasetFile: 'simple-linear-regression.csv',
    projectRubric: "AI Evaluator Rubric for 'The Latte Factor': 1. DATA: Must load 'latte.csv' using pandas. 2. COLUMNS: X must strictly be 'Cups Purchased (X)' (remember it expects a 2D array, e.g., df[['Cups Purchased (X)']]) and y must strictly be 'Total Spent in ₹ (Y)'. Look at their execution output—if they got a KeyError, explicitly point out the typo in their column names. 3. MODEL: Must import and fit sklearn's LinearRegression. 4. OUTPUTS: Must dynamically calculate and print the slope (expected approx 245.33) and the predicted spending for 15 cups (expected approx 3681.33). HARD FAIL if they just print the hardcoded numbers without calculating them via the model. If any step is missing, mathematically wrong, or hardcoded, set status to TRY_AGAIN and give specific, sassy, but helpful hints about exactly which step they messed up.",
  },
  'multiple-linear-regression': {
    title: 'Multiple Linear Regression',
    markdownContent: `## The episode teaser

Plot twist: getting that perfect dewy glass skin does not just happen from drinking water. We all know the drill. That flawless base actually depends on so many different steps. It is about using a gentle cleanser. It is applying hydrating serums on damp skin. It is whether you used your ice roller this morning and locked it all in with the right dewy sunscreen. Your glow is a combination of all those things working together perfectly. Welcome to Multiple Linear Regression. It is the upgraded version of our basic math girl. She finally gets that you have a whole routine and your final result depends on multiple different variables.

We are officially moving past asking if just variable $X$ gives you a glow. Now we are asking how $X_1$, $X_2$, $X_3$, and $X_4$ all work together to create your final look. This is the math we use when we realize a flawless base is an entire ecosystem. We love to see everyone glowing and we know it takes a complete routine to get there. You are going from asking if one simple moisturizer is good to tracking your active ingredients, your application order, and exactly how long you wait between layers. Let us get into the multivariate details.

## The mood board

![multiple_linear_regression_graph.png](/images/modules/regression/2-multiple-linear-regression/multiple_linear_regression_graph.png)

We went from 2D to 3D because you're too complex for just one variable.

## Decoding the pattern

Multiple Linear Regression is literally just Simple Linear Regression that finally invested in a proper skincare system and learned to handle actual complexity. Instead of relying on just one basic moisturizer as your only feature, you now have an entire routine. You have your clearing serums, your barrier creams, and your dewy sunscreen. All of these multiple features are working together to contribute to your final flawless prediction.

The math literally got an upgrade. We went from our basic era equation like this:

$$
y = β_1 x + β_0
$$

To this fully stacked routine:

$$
y = β_0 + β_1 x_1 + β_2 x_2 + β_3 x_3 + ... + β_n x_n
$$

Or in matrix form because we love an organized vanity cabinet:

$$
y=Xβ+ϵ
$$

Let us break down the ingredients list.

- *y* is your predicted outcome (your final glass skin result).
- *x*₁, *x*₂, *x*₃... are your actual routine steps. Your hydrating toner, your Vitamin C, and your daily SPF.
- *β*₁, *β*₂, *β*₃... are the coefficients. This is how hard each product is actually working. Some steps carry the whole routine and some just add a cute little bonus glow.
- *β*₀ is the intercept. This is your baseline skin status when you wake up and do absolutely nothing. You are already gorgeous and this is just your starting canvas.
- *ϵ* is the error term. These are the random hormonal breakouts or weather changes we literally cannot predict. Life happens to all of us and that is completely okay.

### The math behind finding the perfect ratio

We are still trying to minimize our Mean Squared Error. This error is the difference between the flawless base we actually want and what we end up with if our routine is unbalanced. Since we are layering multiple active ingredients now, the math has to juggle it all. Here is what that cost function looks like:

$$
MSE = \\frac{1}{n} \\sum_{i=1}^{n} (y_i - \\hat{y}_i)^2
$$

Where your predicted glow is calculated like this:

$$
\\hat{y}_i = \\beta_0 + \\beta_1x_{i1} + \\beta_2x_{i2} + ... + \\beta_nx_{in}
$$

To find the exact right amount of each product to use, the algorithm uses something called the Normal Equation. It gives us the direct answer in matrix form:

$$
\\beta=(X^T X)^{-1}X^T y
$$

Do not let the matrix math stress you out at all. Python libraries like *sklearn* completely handle this part for us behind the scenes. We love a tool that does the heavy lifting for us. Basically, it is just the algorithm figuring out the exact perfect combination of your serums and creams that minimizes any chance of a bad skin day. It is finding the ultimate routine with zero regrets.

### New metrics you need to know

1. **Adjusted R²**: Adjusted R² is the real one. Regular R² can be a bit of a fake friend because it will increase every time you add a new product to your shelf, even if it does absolutely nothing for your skin. Adjusted R² is your honest bestie who tells you if that extra step is actually helping your glow or just wasting your time. It is all about quality over quantity.
2. **Multicollinearity**: Multicollinearity is basically the drama that happens when you have two products that do the exact same thing. Like using a hydrating serum and then a hydrating essence that both have the same main ingredient. It just confuses your routine and the model. We check for this using the Variance Inflation Factor or VIF. If that score is over 10 then one of those features is redundant and we should probably let it go.
3. **Feature Importance**: Feature Importance helps us find the holy grail products on our vanity. The coefficients show us exactly which steps are doing the heavy lifting for your results. A coefficient of 5.2 means that for every one unit increase in that specific step your glow increases by 5.2 points while everything else stays the same. It helps us see what is truly making the biggest difference in the ecosystem.

### The assumptions (Yes, she still has standards)

Even though we upgraded to a full routine, our skin still has boundaries. We cannot just throw everything at our face and hope it works. There are rules to keep your barrier intact and glowing.

- **No multicollinearity:** Your products should not be identical twins. You do not need a liquid salicylic acid and a gel salicylic acid in the exact same routine. They do the exact same thing. Layering them just irritates your face and makes it impossible to tell which one is actually working. Every step needs its own unique job.
- **Linear relationship:** Every product should have a direct and clear relationship with your final glow. If you apply a pump of hydration, you get a direct boost in your skin plumpness. It is a straight path to your desired results. We will talk about what happens when too much of a good thing actually ruins your base when we get to our advanced polynomial routine later.

## [The Code](https://colab.research.google.com/drive/1VkxlwKUh6JsbQ5m9ohbeYJncpr2pyJI1?usp=sharing)

Now we are putting our entire morning routine into Python. Every girl has a totally unique and beautiful base and we love seeing everyone find what works for them.

This code is how we figure out exactly which steps in our routine are giving us that glass skin glow and which ones we can probably skip.

We are tracking our hydration levels, our gua sha massage minutes, the number of active serums we use, and our daily sunscreen layers. Balance is everything.

\\\`\\\`\\\`python
# Predicting our flawless base with multiple factors
# Because a one product routine just does not work for our complex skin

import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error, r2_score
from sklearn.preprocessing import StandardScaler
import seaborn as sns

# Our comprehensive routine data
# We are tracking everything to find our perfect balance
data = {
    'hydration_level': [9, 12, 15, 18, 21, 10, 14, 19, 22, 8, 13, 17, 20, 11, 16],
    'gua_sha_minutes': [5, 12, 8, 20, 15, 6, 9, 18, 16, 4, 10, 14, 17, 7, 11],
    'active_serums': [2, 4, 3, 5, 4, 2, 3, 5, 4, 1, 2, 4, 5, 3, 3],
    'sunscreen_layers': [1, 3, 2, 3, 3, 1, 2, 3, 3, 1, 2, 3, 3, 2, 2],  
    'glow_score': [120, 450, 280, 890, 650, 180, 320, 780, 720, 90, 380, 580, 850, 240, 420]
}

df = pd.DataFrame(data)

# Separating our steps from our final glowing result
feature_names = ['hydration_level', 'gua_sha_minutes', 'active_serums', 'sunscreen_layers']
routine_steps = df[feature_names]  
final_glow = df['glow_score'] 

# Standardizing our routine so one product does not overpower the rest
# We want all our ingredients to play nicely together
scaler = StandardScaler()
routine_steps_scaled = scaler.fit_transform(routine_steps)

# Splitting our data to test if the routine actually works
# 80 percent for training and 20 percent to verify our results
X_train, X_test, y_train, y_test = train_test_split(
    routine_steps_scaled, 
    final_glow, 
    test_size=0.2, 
    random_state=42
)

# Creating our routine prediction model
glow_oracle = LinearRegression()

# Training the model on our daily habits
glow_oracle.fit(X_train, y_train)

# Making predictions on our test days
predicted_glow = glow_oracle.predict(X_test)

# Evaluating how well our routine is working
mse = mean_squared_error(y_test, predicted_glow)
r2 = r2_score(y_test, predicted_glow)

print("THE FLAWLESS BASE FORMULA")
print(f"Baseline Glow Intercept: {glow_oracle.intercept_:.2f}")
print("\nProduct Impact Coefficients:")
for feature, coef in zip(feature_names, glow_oracle.coef_):
    print(f"   {feature}: {coef:.2f}")

print(f"\nMean Squared Error: {mse:.2f}")
print(f"R Squared Score: {r2:.3f}")

# Visualizing which steps actually matter
# Aesthetic pink bar chart incoming
plt.figure(figsize=(10, 6))
colors = ['#FF69B4', '#FF1493', '#C71585', '#DB7093']
plt.barh(feature_names, glow_oracle.coef_, color=colors)
plt.xlabel('Impact on Overall Glow', fontsize=12, fontweight='bold')
plt.title('Which Routine Steps Actually Matter?', fontsize=14, fontweight='bold')
plt.axvline(x=0, color='gray', linestyle='dotted', linewidth=1)
plt.grid(axis='x', alpha=0.3)
plt.tight_layout()
plt.show()

# Predicting a brand new routine performance
# Scenario: Hydration level 15, 10 minutes of gua sha, 2 serums, and 2 sunscreen layers
new_routine = np.array([[15, 10, 2, 2]])
new_routine_scaled = scaler.transform(new_routine)
predicted_results = glow_oracle.predict(new_routine_scaled)

print(f"\nNEW ROUTINE PREDICTION:")
print(f"   If you focus on level 15 hydration and 10 minutes of facial massage")
print(f"   with just 2 active serums and 2 layers of SPF...")
print(f"   Expected glow score: {predicted_results[0]:.0f} points!")

# Checking for redundant products so we do not damage our skin barrier
plt.figure(figsize=(8, 6))
correlation_matrix = df[feature_names].corr()
sns.heatmap(correlation_matrix, annot=True, cmap='RdPu', center=0, 
            square=True, linewidths=1, cbar_kws={"shrink": 0.8})
plt.title('Product Overlap Check', fontsize=14, fontweight='bold')
plt.tight_layout()
plt.show()

# Actual glow vs predicted glow scatter plot
plt.figure(figsize=(8, 6))
plt.scatter(y_test, predicted_glow, color='#FF69B4', s=100, alpha=0.6, edgecolors='#C71585')
plt.plot([y_test.min(), y_test.max()], [y_test.min(), y_test.max()], 
         color='black', linestyle='dotted', lw=2, label='Perfect Glow Line')
plt.xlabel('Actual Glow Score', fontsize=12)
plt.ylabel('Predicted Glow Score', fontsize=12)
plt.title('How Accurate Is Our Routine Tracker?', fontsize=14, fontweight='bold')
plt.legend()
plt.grid(alpha=0.3)
plt.tight_layout()
plt.show()
\\\`\\\`\\\`

### What’s happening here?

We just ran the numbers on our morning routine and the results are officially in. Let us look at exactly what the math told us about achieving that flawless base.

**The holy grail and the flops**

Look at the printout and the bar chart. Your baseline glow is sitting at a gorgeous 460 points. That is you waking up and doing absolutely nothing. You are already winning.

![mlr_colab_output_1.png](/images/modules/regression/2-multiple-linear-regression/mlr_colab_output_1.png)

But look at the product impact. Your gua sha massage is carrying the entire routine. With a massive score of 227 it is the absolute main character of your morning. Your hydration level and active serums are giving a cute little boost of about 29 points each.

![mlr_colab_output_2.png](/images/modules/regression/2-multiple-linear-regression/mlr_colab_output_2.png)

The plot twist? The sunscreen layers have a negative score of 22. We are absolutely never skipping SPF but the math says layering it too thick is ruining your immediate dewy finish. It is probably pilling or giving a white cast. Quality over quantity always.

**The prediction check**

We tested a totally new scenario. We asked the model what happens with level 15 hydration and 10 minutes of facial massage. It predicted a solid 366 glow score. 

![mlr_colab_output_3.png](/images/modules/regression/2-multiple-linear-regression/mlr_colab_output_3.png)

There is a little warning message there too but do not stress. That is just Python being a protective bestie reminding us that we passed raw numbers without the official column names. The math still works perfectly.

**The routine overlap**

Now look at the purple squares here. This is where we catch the routine overlap. See those super high numbers like 0.93 between your active serums and your gua sha minutes?

![mlr_colab_output_4.png](/images/modules/regression/2-multiple-linear-regression/mlr_colab_output_4.png)

That means whenever you do your facial massage, you are almost always using your active serums at the exact same time. Because they always happen together the math gets a little confused about which one is doing the real work. Your routine needs better boundaries so each step can get the credit it deserves.

Finally check the scatter plot. Those pink dots are hugging that dotted line like their life depends on it.

![mlr_colab_output_5.png](/images/modules/regression/2-multiple-linear-regression/mlr_colab_output_5.png)

Our R² score was 0.983 which means our formula is incredibly accurate. When the model predicts a certain level of glass skin you are guaranteed to walk out the door looking exactly that flawless.

## Mini-Project: "The Salary Prediction System"

**Your Mission:** You are sitting at the negotiation table with top tech companies. You need to know your exact worth and back it up with data. Build a model to predict your starting salary based on your entire profile instead of just one single skill.

**Dataset:  [Get That Bag: Tech Salary Predictor](https://www.kaggle.com/datasets/anjaliisharmaa/get-that-bag-tech-salary-predictor)** (Or you can just use **pd.read_csv('salary.csv')** and let Pyxie load it for you right here!)

**Goal:**

1. Build a multiple linear regression model
2. Identify which factor has the BIGGEST impact on salary
3. Predict YOUR expected salary based on your real stats

**Deliverable:** A clean Python script with your model metrics..

**Bonus Challenge:** Check for overlapping variables and drop the redundant ones so your model stays perfectly balanced. If you get stuck just check the discussion tab in the dataset for a little help.`  ,
    content: () => React.createElement('div', {}),
    metadata: {
      sipTime: '20 mins',
      difficulty: 'Balancing your skin barrier (Intermediate)',
      prerequisites: 'Module 1 (SLR), Matrix basics',
    },
    prevLesson: 'simple-linear-regression',
    nextLesson: 'polynomial-regression',
    datasetFile: 'multiple-linear-regression.csv',
    projectRubric: "AI Evaluator Rubric for 'The Salary Prediction System': 1. DATA: Must load 'salary.csv' using pandas. 2. COLUMNS & CLEANING: y must strictly be 'Salary_LPA'. X must be a 2D subset of the numeric features (e.g., Experience_Years, Languages_Known, Education_Level, Company_Size, Location_Index). If their execution output shows a ValueError because they forgot to drop the 'Notes' or 'Candidate' strings from X, sassily remind them that machine learning models do not speak English and they need to filter out text columns! 3. MODEL: Must import and fit sklearn's LinearRegression. 4. OUTPUTS - BIGGEST IMPACT: They must access the model's coefficients (using `.coef_`) and print which feature has the highest weight/impact. 5. OUTPUTS - PREDICTION: They must pass a custom 2D array of their own hypothetical stats into `model.predict()` and print their expected salary. HARD FAIL if they just `print()` a fake salary or guess the biggest factor without actually writing the code to prove it. BONUS: If they mention checking for correlation/overlapping variables, give them massive extra credit hype. If any core step is missing or hardcoded, set status to TRY_AGAIN with precise, actionable feedback.",
  },
  'polynomial-regression': {
    title: 'Polynomial Regression',
    markdownContent: `## The episode teaser

Your life graph is definitely not a straight line anymore.

At sixteen, you were just figuring it all out. At nineteen, you finally perfected that slicked back hair and claw clip combo. At twenty one, the college burnout hit hard and you needed a full everything shower just to feel human again. Now you are out here serving absolute main character energy in your cute matching sets.

If you tried to draw a straight line through all those phases, it would literally be lying. Your journey is beautifully curved and full of plot twists. Your data acts the exact same way.

Enter Polynomial Regression. This is the logic we use when the connection between your input and output curves instead of going perfectly straight. It still makes total sense but it just has a little more flavor.

Picture the time you spend doing your daily gua sha routine versus how sculpted you feel. Or the hours you spend romanticizing your life on Pinterest versus how aesthetic your outfits actually become. Sometimes things just do not move in a straight line and we love that for us.

## The mood board

![polynomial regression graph.png](/images/modules/regression/3-polynomial-regression/polynomial_regression_graph.png)

Not everything in life is linear, especially your glow-up arc!

## Decoding the pattern

Polynomial Regression is honestly just Linear Regression wearing a beautifully fitted corset and a glossy lip. The secret here is that you do not change the core algorithm at all. You just give your features a total makeover.

In basic linear regression your model looks like this:

$$
y = β_0 + β_1 x
$$

When we upgrade to Polynomial Regression of degree two which is quadratic it gets a little more glamorous:

$$
y = β_0 + β_1 x + β_2 x^2
$$

And for degree three we add even more drama:

$$
y = β_0 + β_1 x + β_2 x^2 + β_3 x^3
$$

Let us translate this into our language. Imagine $x$ is the time you spend curating your aesthetic and working on your goals.

The $x²$ represents your compounding effort. This is how your morning journaling builds on top of your everything shower to create serious inner peace and outer radiance.

The $x³$ is the dramatic plot twist in your journey like finally finding the exact shade of blush or the perfect claw clip that changes your entire face card.

The $y$ is your ultimate main character energy and confidence score.

Those little $β$ symbols are just the weights. They measure exactly how much each step of your routine actually contributes to your final glow up.

Notice something really beautiful here. The equation is still completely linear when you look at those beta parameters. That is exactly why we can still use our trusty Linear Regression logic behind the scenes. We are just running it on our newly upgraded features. The model stays linear in its weights but becomes perfectly curved and dynamic in its inputs.

### How it actually works

Step one is taking your original baseline feature. Let us call it your glow up years.

Step two is where we create the extra features. We take those years and square them for your compounding daily habits and cube them for your sudden major plot twists. You are just layering your data the exact same way you layer your hydrating serums and dewy sunscreens.

Step three is feeding all of these upgraded features into your model as separate items. We arrange everything into a gorgeous layout called a design matrix. 

$X = \\begin{bmatrix}
1 & x_1 & x_1^2 & x_1^3 \\
1 & x_2 & x_2^2 & x_2^3 \\
\\vdots & \\vdots & \\vdots & \\vdots
\\end{bmatrix}$

Then we just solve it using our classic formula.

$$
y=X\\beta+\\epsilon
$$

The cost function stays exactly the same as before. We still use Mean Squared Error to measure our progress.

$$
MSE = \\frac{1}{n} \\sum_{i=1}^{n} (y_i - \\hat{y}_i)^2
$$

The only real change is that our predicted value now includes all those beautiful powers of x. We are basically measuring the difference between your expected energy and your actual daily vibe so we can minimize any off days and keep you glowing perfectly.

So when exactly do we reach for this algorithm? You bring out Polynomial Regression when your data plot clearly curves like a beautiful swooping eyeliner wing. If you try to force a completely flat straight line over that it just underfits.

But we really have to talk about the overfitting drama.

If you keep your degree low like a two or three it captures your general aesthetic arc perfectly and stays extremely classy. It gives the exact energy of a reliable three step skincare routine. But if you push that polynomial degree way up to a ten or twenty the model starts tracing every single minor mood swing and random text you sent at two in the morning.

That is exactly what overfitting is. The algorithm is just memorizing all the chaotic temporary noise instead of actually learning your authentic core vibe.

You will know this is happening when your training error is super low but your test error is embarrassingly high. Picture doing your makeup in your dim bathroom lighting where you look completely flawless. But the second you step out into natural sunlight, the reality is completely different. Your model was only prepared for the bathroom lighting and failed the real world test.

To protect your peace and avoid this entire situation you need to keep your polynomial degree small and manageable. Always use a train-test split to verify your results in the real world before committing. Sometimes you can even add a little bit of regularization to smooth everything out like a blurring face primer.

Let us talk about the boundaries we need to set. Even the most stunning algorithm needs a few ground rules to work properly.

The connection has to be completely smooth. We are talking about a graceful curve like your perfect slicked back hair on day three. No random zig zag energy or erratic chaos allowed.

The little mistakes or variations in our data still need to behave. We expect them to be independent and spread out evenly just like a flawlessly blended cream bronzer. We call this being roughly normal but honestly it just means no single bad day is going to ruin your entire vibe.

You cannot go wild adding layers of complexity just because it looks cute right now. Trying to force a massive polynomial degree on your training data is a complete trap. It is exactly like buying an entirely new aesthetic wardrobe in one day. It feels good in the moment but it will completely clash with your actual lifestyle later.

This algorithm is strictly for capturing those gorgeous sweeping arcs in your life. It is absolutely not for drawing chaotic scribbles all over your carefully curated vision board.

## [The Code](https://colab.research.google.com/drive/1xFNX2vtKvhAQpfRqjODjKE-rhXpdXg7c?usp=sharing)

Let us actually write the code for your perfect aesthetic arc. We are calling it The Glow Up Curve Predictor.

We are going to predict your Main Character Energy based on the years you have spent curating your life and building those beautiful habits. The code is just taking your daily routines and turning them into mathematical art.

\\\`\\\`\\\`python
import numpy as np
import matplotlib.pyplot as plt
from sklearn.linear_model import LinearRegression
from sklearn.preprocessing import PolynomialFeatures
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error, r2_score

# step 1 is creating our life timeline data
# X represents the years you have been actively curating your aesthetic and routines
glowup_years = np.array([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]).reshape(-1, 1)

# Y represents your main character energy score
main_char_energy = np.array([10, 20, 35, 25, 30, 50, 70, 90, 110, 130])

# Step two is our train test split so we do not lie to ourselves
years_train, years_test, energy_train, energy_test = train_test_split(
    glowup_years,
    main_char_energy,
    test_size=0.2,
    random_state=42
)

# step 3 is adding our polynomial magic
# we will start with a degree of two for a beautiful gentle curve
curve_maker = PolynomialFeatures(degree=2, include_bias=False)
years_train_glow = curve_maker.fit_transform(years_train)
years_test_glow = curve_maker.transform(years_test)

# Step four is creating our regression model
glowup_oracle = LinearRegression()

# Teach her your storyline
glowup_oracle.fit(years_train_glow, energy_train)

# step five is predicting the future
energy_pred_test = glowup_oracle.predict(years_test_glow)

# evaluate the actual vibes
mse = mean_squared_error(energy_test, energy_pred_test)
r2 = r2_score(energy_test, energy_pred_test)

print("GLOW UP CURVE FORMULA degree two")
print(f"Intercept base energy at year zero: {glowup_oracle.intercept_:.2f}")
print("Coefficients impact of each step in your routine:")
for name, coef in zip(["glowup_years", "glowup_years_squared"], glowup_oracle.coef_):
    print(f"  {name}: {coef:.2f}")

print(f"\nMean Squared Error on test set: {mse:.2f}")
print(f"R Squared Score on test set: {r2:.3f}")

# Step six is visualizing the curve
years_smooth = np.linspace(glowup_years.min(), glowup_years.max(), 200).reshape(-1, 1)
years_smooth_glow = curve_maker.transform(years_smooth)
energy_smooth_pred = glowup_oracle.predict(years_smooth_glow)

plt.figure(figsize=(9, 6))
plt.scatter(glowup_years, main_char_energy, s=80, alpha=0.7, label='Real life timeline points')
plt.plot(years_smooth, energy_smooth_pred, linewidth=3, label='Polynomial curved trajectory')
plt.xlabel('Years curating your aesthetic', fontsize=12)
plt.ylabel('Main character energy', fontsize=12)
plt.title('Your journey is not a straight line', fontsize=14, fontweight='bold')
plt.grid(alpha=0.3)
plt.legend()
plt.tight_layout()
plt.show()

# Step seven is seeing where you are headed
future_years = np.array([[10], [12]]) 
future_years_glow = curve_maker.transform(future_years)
future_energy = glowup_oracle.predict(future_years_glow)

for yrs, energy in zip(future_years.flatten(), future_energy):
    print(f"After {yrs} years of consistent routines")
    print(f"   your predicted main character energy: {energy:.1f}\n")

# Checking for extra drama with degree three
extra_curvy_maker = PolynomialFeatures(degree=3, include_bias=False)
years_train_extra = extra_curvy_maker.fit_transform(years_train)
years_test_extra = extra_curvy_maker.transform(years_test)

extra_glowup_oracle = LinearRegression()
extra_glowup_oracle.fit(years_train_extra, energy_train)
energy_pred_extra = extra_glowup_oracle.predict(years_test_extra)

mse_extra = mean_squared_error(energy_test, energy_pred_extra)
r2_extra = r2_score(energy_test, energy_pred_extra)

print("Degree Three Drama Check:")
print(f"   MSE deg two vs deg three: {mse:.2f} vs {mse_extra:.2f}")
print(f"   R Squared  deg two vs deg three: {r2:.3f} vs {r2_extra:.3f}")
print("   If degree three hurts the test score it is giving overfit drama.\n")
\\\`\\\`\\\`

### What's happening here?

Let us see exactly what your results are telling you. Look at that degree two formula output. Your base energy at year zero was a solid 14. That is your starting point before you even curated your first vision board or started romanticizing your coding sessions.

![colab_output_1.png](/images/modules/regression/3-polynomial-regression/colab_output_1.png)

The coefficients show exactly what is working. Your daily habits give you a steady little boost but that squared term is where the real magic happens. That is the compounding effect of your everything showers and healthy boundaries finally paying off. And that R squared score of almost one basically means your model perfectly understands your aesthetic.

Then we have the gorgeous plot. Look at how perfectly that smooth curve swoops up and catches almost every single point of your timeline. A basic flat line would have totally missed those high energy peaks later in your journey. This visual is the ultimate proof that putting time into yourself creates a beautiful compounding arc.

![colab_output_2.png](/images/modules/regression/3-polynomial-regression/colab_output_2.png)

The best part is looking at your future predictions. The model looked at your current trajectory and saw massive potential. By year 10, your energy hits over 150. By year 12, you are pushing past 200. This proves that sticking to your routines and keeping that unbothered mindset just keeps multiplying your success. You are quite literally mathematically projected to keep thriving.

![colab_output_3.png](/images/modules/regression/3-polynomial-regression/colab_output_3.png)

Finally we have the degree three drama check. You already know from building your own smart AI projects that more math is not always better. We added an extra layer of complexity to see if it would understand your vibe more accurately. The results are super clear. The error score barely dropped and the accuracy score stayed exactly the same.

![colab_output_4.png](/images/modules/regression/3-polynomial-regression/colab_output_4.png)

Adding that third degree of drama did absolutely nothing to improve your model. It is the perfect reminder that sometimes a simple solid routine is all you need and overcomplicating things just invites unnecessary chaos.

## Mini-Project: "The Study-Overload Curve"

Let us figure out exactly how much studying is genuinely too much.”

**Your Mission:** You are going to build a gorgeous Polynomial Regression model to prove exactly when your brain officially clocks out. We need to capture that messy non linear reality between the hours you spend romanticizing your study sessions and your actual exam scores.

**Dataset: [The Study-Overload Curve](https://www.kaggle.com/datasets/anjaliisharmaa/the-study-overload-curve)** (Or you can just use **pd.read_csv('study.csv')** and let Pyxie load it for you right here!) 25 highly relatable data points of effort vs. exhaustion. X = hours studied, Y = exam score.

**Your Goals:**

- Train your models using polynomial degrees one two and three.
- Compare their R squared scores on your test set to see which model is actually telling the truth.
- Figure out which degree perfectly captures that delicate balance of focused effort versus total burnout without being dramatic and overfitting your data.`  ,
    content: () => React.createElement('div', {}),
    metadata: {
      sipTime: '27 mins',
      difficulty: 'Intermediate but you are totally ready for this',
      prerequisites: 'Module 2 (MLR), comfort with lines & curves',
    },
    prevLesson: 'multiple-linear-regression',
    nextLesson: 'support-vector-regression',
    datasetFile: 'polynomial-regression.csv',
    projectRubric: "AI Evaluator Rubric for 'The Study-Overload Curve': 1. DATA & CLEANING: Must load 'study.csv'. X must be 'Hours Studied (X)' and y must be 'Exam Score (Y)'. They MUST ignore the 'Vibe Check' text column. If they get a ValueError, sassily remind them that sklearn cannot read their Instagram notes. 2. SPLITTING: Must use `train_test_split` to create train and test sets. 3. TRANSFORMATION: They must use `PolynomialFeatures` for degrees 1, 2, and 3. Watch closely: they must `fit_transform` the training data, but ONLY `transform` the testing data. If they fit the test data, gently call them out for data leakage! 4. MODELING & OUTPUT: They must train a LinearRegression model on the polynomial features for each degree and dynamically calculate/print the R-squared scores for the test set. 5. CONCLUSION: They must print a conclusion identifying that Degree 2 (the quadratic curve) is the sweet spot that captures the burnout drop-off without wildly overfitting like Degree 3. HARD FAIL if they hardcode the R-squared numbers. If the pipeline is broken or steps are missing, set status to TRY_AGAIN with precise, step-by-step debugging advice.",
  },
  'support-vector-regression': {
    title: 'Support Vector Regression',
    markdownContent: `## The episode teaser

You know that one friend who refuses to let every little piece of drama ruin her peace. She only reacts when things cross a very specific boundary. Otherwise, she is just thriving, moisturized, and staying completely in her own lane. That is Support Vector Regression for you.

Unlike Linear Regression, who stresses over every single data point and lets outliers ruin her mood, SVR is selective. She creates an acceptable error zone around her prediction line called the epsilon tube. She only bothers to react when data points fall outside this safe space.

It is literally the data science equivalent of setting healthy boundaries. If the points are matching your vibe and staying in your zone, we love that for you. But if they start acting weird and crossing those boundaries, that is exactly when she clocks it and handles the situation.

SVR is perfect for messy datasets with crazy outliers, nonlinear relationships, and chaotic energy that would make regular regression completely spiral. She stays focused and only uses the most important data points called support vectors to make her decisions. Less drama and way more peace of mind. 

## The mood board

![support vector regression graph.png](/images/modules/regression/4-support-vector-regression/support_vector_regression_graph.png)

She only cares about the points that cross her boundaries. Icon behavior!

## Decoding the pattern

Support Vector Regression is the regression sister of Support Vector Machines. SVM is usually busy categorizing things, kind of like sorting your vanity into skincare and makeup. SVR takes that exact same organized energy but uses it to predict continuous numbers instead.

Linear regression tries to accommodate everyone. We absolutely love a caring friend who wants everyone to be happy, but taking on all that stress gets exhausting.

SVR has a completely different philosophy about what deserves her energy. She is entirely fine with small errors. If a data point is slightly off but stays inside her acceptable zone, she simply ignores it and keeps glowing. She only penalizes the points that stray way too far and ruin the vibe.

### The core concept: the epsilon tube

Picture the epsilon tube as your absolute favorite thick lip oil or a heavy layer of dewy sunscreen. It creates a flawless protective barrier around your main prediction line with a width of exactly $2\epsilon$.

Any data point within this tube? Ignored. Zero penalty. The model only cares about points that fall outside this boundary, those are the support vectors that shape the final model.

The actual math behind this vibe check looks like this:

$$
f(x)=w^Tx+b
$$

Where:

- $*w*$ is the weight vector.
- $*b*$ is the intercept. This is your baseline starting point.
- $*x*$ represents your input features. These are the raw materials and details you are working with to create the final look.

### The clean girl balance

Support Vector Regression is all about prioritizing her peace. She basically has three main goals. She wants her protective bubble as wide as possible to protect her energy. She wants the absolute minimum amount of boundary violations. And most importantly, she wants to keep her entire routine effortless and simple.

This balancing act actually has a mathematical formula. It is her personal blueprint for staying entirely unbothered while still getting everything done perfectly.

$$
\text{Minimize: } \frac{1}{2} \|w\|^2 + C \sum_{i=1}^{n} (\\xi_i + \\xi_i^*)
$$

Let us translate the math into English. That first part with the $w$ is all about keeping things sleek and minimalistic. It is about achieving the maximum aesthetic impact with zero complication.

Those little greek letters $\\xi_i$ and $\\xi_i^*$ are called the slack variables. In our world these represent exactly how far a data point stepped over your line. It is the literal mathematical measurement of the audacity.

Then we have $C$ which is basically your personal tolerance level for the drama. If your $C$ is high, you are taking absolutely zero disrespect and heavily penalizing every single violation. If your $C$ is low you are letting a few minor things slide. You know that protecting your overall peace is way more important than fighting every single little battle.

### The parameter vanity

Let us talk about the specific settings you can tweak to protect your peace. These are basically the core products in your SVR routine.

**1. Epsilon: the unbothered zone**

This determines exactly how wide your protective bubble is. A large epsilon is like applying a super thick layer of overnight lip mask. You are virtually untouchable and simply do not sweat the small stuff. Your routine stays incredibly simple because very few things actually reach you.

A small epsilon is more like a very lightweight daytime serum. You are definitely going to notice a lot more of what is happening around you. Your boundaries are tighter and your model becomes more complex because you are paying attention to way more data points.

**2. Cost and penalty: the C parameter)**

This is your personal boundary enforcement. It decides exactly how you handle the points that dare to step outside your protective tube.

A very large C means you have a strict zero tolerance policy. Cross the line once and there are consequences. You are setting high standards but constantly watching every single detail can lead to total exhaustion. In data science, we call that overfitting.

A small C means you are in a much more forgiving era. You let things slide and stay incredibly flexible. Sometimes you might be a little too relaxed and miss important details but you are keeping your overall stress levels at an absolute minimum.

**3. The kernel: your decision aesthetic**

This defines the overall shape and style of your boundaries.

The Linear kernel is your sleek slicked back bun. It is completely direct and perfect for situations that are simple and clear.

The RBF kernel is the ultimate flawless bouncy blowout. It is smooth and adaptable to almost any situation. This is your primary choice when the data is messy and nonlinear.

The Polynomial kernel is like a very specific sculpted claw clip updo. It has specific angles and curves designed to fit a very particular vibe when standard styles just will not work.

## [The Code](https://colab.research.google.com/drive/1Nnp5ED0vNt1T_9sIt0ty1nHn4D_Drovp?usp=sharing)

Let us put this entire philosophy into practice. We are building a model that predicts your overall unbothered energy based on the daily minor annoyances of campus life. We will also throw in some massive drama to see exactly how our different models handle the chaos.

Here is the exact blueprint for building your own boundary setting model.

\\\`\\\`\\\`python
# building the boundary queen
# predicting your unbothered energy based on minor annoyances and dramatic outliers

import numpy as np
import matplotlib.pyplot as plt
from sklearn.svm import SVR
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import mean_squared_error, r2_score
from sklearn.preprocessing import RobustScaler

# Creating our dataset because life gets complicated and we need a solid sample size
np.random.seed(42) 

# X is 100 instances of minor inconveniences
minor_annoyances = np.arange(1, 101).reshape(100, 1)

# Y is your unbothered energy score starting at 100 and slowly draining
# We add some random noise because everyday peace naturally fluctuates
unbothered_energy = 100 - (minor_annoyances.flatten() * 0.6) + np.random.normal(0, 5, 100)

# Injecting the dramatic boundary setting moments which act as our outliers
unbothered_energy[25] = 260  # First time you had to stand on business
unbothered_energy[75] = 290  # The ultimate block and delete moment
                             
# Using RobustScaler because she completely ignores the drama while doing her job
scaler_x = RobustScaler()
scaler_y = RobustScaler()

minor_annoyances_scaled = scaler_x.fit_transform(minor_annoyances)
unbothered_energy_scaled = scaler_y.fit_transform(unbothered_energy.reshape(100, 1)).flatten()

# Splitting the data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(
    minor_annoyances_scaled,
    unbothered_energy_scaled,
    test_size=0.2,
    random_state=42
)

# Creating three models to compare their vibes

# Model 1 Linear Regression the absolute people pleaser who cares about everyone
linear_model = LinearRegression()
linear_model.fit(X_train, y_train)

# Model 2 SVR with linear kernel setting boundaries with very straight lines
svr_linear = SVR(kernel='linear', C=100, epsilon=0.1)
svr_linear.fit(X_train, y_train)

# Model 3 SVR with RBF kernel the adaptable queen who protects her peace
svr_rbf = SVR(kernel='rbf', C=100, epsilon=0.1, gamma='scale')
svr_rbf.fit(X_train, y_train)

# Making our predictions
y_pred_linear = linear_model.predict(X_test)
y_pred_svr_linear = svr_linear.predict(X_test)
y_pred_svr_rbf = svr_rbf.predict(X_test)

# Evaluating who handled the drama best
print("MODEL COMPARISON Who Handles Outliers Better\n")

models = {
    "Linear Regression No Boundaries": y_pred_linear,
    "SVR Linear Straight Boundaries": y_pred_svr_linear,
    "SVR RBF Curvy Boundaries": y_pred_svr_rbf
}

for name, preds in models.items():
    mse = mean_squared_error(y_test, preds)
    r2 = r2_score(y_test, preds)
    print(f"{name}")
    print(f"   MSE {mse:.4f} | R² {r2:.4f}\n")
    
# Visualization the ultimate showdown
# Creating a smooth line for plotting
X_plot = np.linspace(minor_annoyances_scaled.min(), minor_annoyances_scaled.max(), 200).reshape(200, 1)
y_plot_linear = linear_model.predict(X_plot)
y_plot_svr_linear = svr_linear.predict(X_plot)
y_plot_svr_rbf = svr_rbf.predict(X_plot)

plt.figure(figsize=(12, 7))

# Plotting our training data
plt.scatter(X_train, y_train, color='#FF69B4', s=80, alpha=0.6, 
            label='Training Data Your Everyday Peace', zorder=3)

# Plotting the outlier specifically
outlier_mask = y_train > 2  
plt.scatter(X_train[outlier_mask], y_train[outlier_mask], 
            color='#FF1493', s=200, marker='*', 
            label='OUTLIER The Boundary Setting Moment', zorder=4, edgecolors='black', linewidth=1.5)

# Plotting all three models
plt.plot(X_plot, y_plot_linear, color='#87CEEB', linewidth=2, 
         label='Linear Regression The Anxious Bestie', linestyle='--') # Python syntax requires the double dash here for the line style
plt.plot(X_plot, y_plot_svr_linear, color='#9370DB', linewidth=2.5, 
         label='SVR Linear')
plt.plot(X_plot, y_plot_svr_rbf, color='#FF1493', linewidth=2.5, 
         label='SVR RBF The Unbothered Queen')

# Showing the epsilon tube for SVR RBF
epsilon = 0.1
plt.fill_between(X_plot.flatten(), 
                 y_plot_svr_rbf - epsilon, 
                 y_plot_svr_rbf + epsilon,
                 alpha=0.2, color='#FF69B4', 
                 label='Epsilon Tube Tolerance Zone')

plt.xlabel('Minor Annoyances Scaled', fontsize=12, fontweight='bold')
plt.ylabel('Unbothered Energy Scaled', fontsize=12, fontweight='bold')
plt.title('SVR vs Linear Regression Who Protects Her Peace Better', 
          fontsize=14, fontweight='bold')
plt.legend(loc='best', fontsize=9)
plt.grid(alpha=0.3)
plt.tight_layout()
plt.show()

# Key insight printer
print("\nTHE TEA")
print("Notice how Linear Regression lets one toxic data point drag her entire mood down")
print("SVR says that does not align with my peace and stays completely unbothered")
print("Quick note on the graph If you are wondering why our huge outliers look smaller on the axis")
print("We had to scale the data so the SVR model could do her job flawlessly")
print("The 290 energy spike is still there she is just wearing a scaled down outfit")
print("The math is absolutely mathing and this is exactly why SVR is the ultimate girls girl for messy real world data")

# future prediction what if the minor annoyances pile up
future_annoyance = np.array([[90]])
future_annoyance_scaled = scaler_x.transform(future_annoyance)
future_energy_svr = svr_rbf.predict(future_annoyance_scaled)
future_energy_actual = scaler_y.inverse_transform(future_energy_svr.reshape(1, 1))

print(f"\nPREDICTION If minor annoyances hit level 90")
print(f"Your unbothered energy dips to {future_energy_actual[0][0]:.1f} out of 100")
print("Time to put your phone on Do Not Disturb do your skincare and protect your peace bestie")
\\\`\\\`\\\`

### What's happening here?

**1. The math check**

The numbers are speaking for themselves. Linear regression is really struggling out here with low accuracy and high error rates. She let those two massive dramatic moments completely ruin her entire calculation. We all have that one anxious bestie who overthinks the drama and lets it drain her energy. We love her but that approach is totally exhausting.

![colab_output_1.png](/images/modules/regression/4-support-vector-regression/colab_output_1.png)

But look at our SVR models. Both the linear and RBF versions absolutely crushed the assignment with incredibly high accuracy. They saw the massive drama spikes and completely ignored them to protect their peace. They proved mathematically that having strict boundaries actually works.

**2. The visual evidence**

This graph is absolute perfection. Take a look at those giant star points. Those represent your massive boundary setting moments where you really had to stand your ground.

![colab_output_2.png](/images/modules/regression/4-support-vector-regression/colab_output_2.png)

Notice how the line for linear regression gets completely dragged upwards toward the chaos. She totally lost the plot. She let a couple of dramatic moments pull her entirely off track.

Now look at the hot pink line for SVR RBF. She stayed perfectly grounded. She gracefully curves right through your actual everyday peace and completely ignores those massive spikes. She literally looked at the drama and said no thank you. And that light pink shaded area around her? That is her epsilon tube, which is her official tolerance zone. Any minor drama happening inside that zone is just background noise and she does not even react to it. 

**3. The future prediction**

We asked our winning model to predict the future. What actually happens if those daily minor annoyances pile up to level 90.

![colab_output_3.png](/images/modules/regression/4-support-vector-regression/colab_output_3.png)

The model mathematically proves that your peace will drop to critically low levels. The algorithm has spoken: it is time to put your phone on DND, do a face mask, and protect your energy.

## Mini-Project: "The Salary Negotiation Outlier Handler"

**Your mission**

You are a tech career coach analyzing salary data. Most people follow a normal trend, but some data points are totally wild. We are talking about early founders with massive stock options or people who got a huge lottery win level signing bonus. These are called **Outliers**. If you use a basic model, these wild points will ruin your data. Your goal is to build an SVR model that handles these outliers like a pro.
Grab the 200-row salary dataset: [**The Salary Negotiation Outlier Handler**](https://www.kaggle.com/datasets/anjaliisharmaa/the-salary-negotiation-outlier-handler) (Or you can just use **pd.read_csv('salary.csv')** and let Pyxie load it for you right here!) and let the model battle begin! Your mission is to build both Linear Regression and SVR (RBF) models to see who handles wild salary outliers better. Compare their MSE and R² scores across 3 different C and epsilon combos, then write a 3-sentence verdict on which model you’d trust for a real-world salary negotiation.`  ,
    content: () => React.createElement('div', {}),
    metadata: {
      sipTime: '40 mins',
      difficulty: 'Standing On Business (Advanced)',
      prerequisites: 'Module 1 & 2, understanding of margins & boundaries',
    },
    prevLesson: 'polynomial-regression',
    nextLesson: 'decision-tree-regression',
    datasetFile: 'support-vector-regression.csv',
    projectRubric: "AI Evaluator Rubric for 'The Salary Negotiation Outlier Handler': 1. DATA: Must load 'salary.csv'. X must strictly be 'Experience' (as a 2D array, e.g., df[['Experience']]) and y must be 'Salary'. They must ignore the 'Type' text column. 2. MODELS: Must import and fit both LinearRegression and SVR (specifically using kernel='rbf'). 3. HYPERPARAMETER TUNING: This is critical. They MUST train the SVR model testing at least 3 different combinations of the 'C' and 'epsilon' parameters. If they just use a default SVR(), sassily call them out for being basic and not tuning their model! 4. METRICS: Must calculate and print MSE (Mean Squared Error) and R-squared for the Linear model and their SVR models. 5. VERDICT: They must `print()` a 2 or 3-sentence conclusion declaring which model handles the wild outliers better (SVR should win if tuned right). HARD FAIL if they skip the hyperparameter tuning or forget the final verdict. If their math breaks, set status to TRY_AGAIN and give them precise, bestie-level debugging advice.",
  },
  'decision-tree-regression': {
    title: 'Decision Tree Regression',
    markdownContent: `## The episode teaser

Planning the perfect Friday night is literally an art form. You are basically building your own Dream Life OS to figure out exactly what the vibe should be. You have to consider how drained you are after classes, the state of your bank account, if your girls are free, and whether your hair is giving slicked back perfection or needs an everything shower.

You definitely do not want a basic math equation telling you what to do. You need your brain to process everything in a series of specific questions. If you are totally exhausted and your budget is zero, then you and your bestie are staying in with pimple patches and sketching in your journals. That predicts a happiness score of 85.

But if you have high energy and the girls are ready to dress up in matching fits, then you are heading to that cute new rooftop spot for a solid 95. That is what Decision Tree Regression actually does. Instead of drawing straight lines on a graph, it builds a literal flowchart. It splits all your options into cute little groups and predicts the average outcome for each one. It is very much giving ‘let me explain my entire thought process energy’.

## The mood board

![decision tree regression graph.png](/images/modules/regression/5-decision-tree-regression/decision_tree_regression_graph.png)

Each split is just a new poll in the group chat and the leaf is the final plan we all agree on.

## Decoding the pattern

Let us talk about the actual logic. Decision Tree Regression predicts continuous values. We are not just picking between two basic categories. We are calculating an exact vibe score for your Friday night using a flow of simple yes or no questions.

**The core structure**

Every perfect tree has three main parts to keep the group chat organized.

1. The Root Node. This is the ultimate first question. It is the single most important factor. Are we getting ready to go out or are we doing a cozy night in.
2. The Internal Nodes. These are the follow up questions. Do we have the energy for slicked back hair or are we just securing the claw clips. Did everyone apply their dewy sunscreen.
3. The Leaf Nodes. This is the final prediction.

Imagine you and the girls end up in a specific leaf node. This leaf holds the data from five past Friday nights where you were tired and stayed in with ice rollers. Your happiness scores for those nights were 66, 67, 68, 69, and 70. The model looks at that history, calculates the average, and predicts a solid 68 for tonight. It is just using your past experiences to protect your peace and guarantee a good time for everyone.

**How splits are chosen?**

When making the Friday night plan we want everyone on the exact same wavelength. We want zero chaos. In decision trees this is called minimizing variance. The main goal is to maximize Standard Deviation Reduction.

At every single step the algorithm asks a question. It looks at every possible option. Do we want a late night dark roast coffee run or are we doing face masks. Are we wearing matching sets or just oversized hoodies.

It checks how much the vibe fluctuates after making a decision. It calculates the variance in the new smaller groups. It picks the option that creates the most aligned mood for the girls. The choice with the least amount of mixed feelings wins the split.

Here is the exact formula for Standard Deviation Reduction.

$$
\text{SDR} = \text{SD}(\text{parent}) - \sum \frac{N_{\text{child}}}{N_{\text{parent}}} \times \text{SD}(\text{child})
$$

Let us look at what these letters actually mean for us.

- SD is the standard deviation. This measures the chaos or mixed feelings in our target happiness score.
- N is the total number of girls in the group chat for that specific plan.

The algorithm subtracts the chaos of the new split from the chaos of the original group. The split with the largest reduction in chaos gets to be the next official step in our night. It is literally just math protecting our peace.

**Prediction process**

When a brand new Friday night rolls around, we need a solid plan. We start right at the top with our biggest question. Are we feeling a high energy night out or a lowkey self care evening.

We just answer each question as it comes. Do we have the budget for dinner. Is everyone bringing their lip oils and glosses. We follow the yes or no path down through the group chat until we land in our final designated leaf node. That is our final agreed upon routine.

Once we land in our specific leaf we know exactly what to expect. The model just gives us the average happiness score from the last few times we did this exact same plan.

In the math world, this is called being piecewise constant. It just means your whole universe of choices gets chopped into neat little aesthetic boxes. If you and your girls fall into a specific box, you get that exact same flat prediction every single time. It keeps things so predictable and peaceful.

### Decision trees: Classification vs Regression

Sometimes we want our code to pick a specific aesthetic and sometimes we need exact numbers. Trees can do both but they handle the logic completely differently. Let us look at the two different modes.

Classification Trees are all about sorting things into neat little groups. Are we wearing matching sets or oversized hoodies. Is this message from your bestie or a random guy. It looks at the most popular vote in the group chat to make its final choice. The math focuses on cleaning up messy mixed vibes using a concept called Gini Impurity.

Regression Trees are exactly what we just used for our Friday night plans. They predict a continuous exact number. Instead of picking a category, they calculate the true average of the leaf you land in. The math here is all about reducing pure chaos using Variance.

Here is the exact comparison for your study notes.

- The Final Output
Classification picks a specific category or class label. Regression predicts a continuous number.
- The Splitting Focus
Classification cleans up mixed groups using Gini Impurity or Entropy. Regression reduces chaos using Variance and Standard Deviation.
- The Final Answer
Classification goes with the most popular vote. Regression calculates the exact average.
- The Perfect Example
Classification decides if an email is spam or not. Regression predicts the exact price of a vintage digicam or your exact mood score after an everything shower.

**The good vibes (pros)**

We love an algorithm that communicates clearly. You can literally draw out the whole group chat logic as a cute aesthetic flowchart. It is completely transparent with you and keeps everyone on the same page.

It handles complicated situations naturally. Life is not a perfectly straight line and this algorithm totally gets that. You do not need to force your data to be something it is not. We love accepting our data exactly the way it is.

It mixes all kinds of information flawlessly. Whether you are tracking exactly how much money is in the going out budget or just checking if the girls are free, it takes everything in perfectly.

You do not have to stress about scaling or trying to perfect your numbers before feeding them in. The math just works beautifully on its own.

It automatically catches how different choices support each other. It just knows that staying in with a gua sha and reading a good book is the ultimate healing combination.

**The drama (cons)**

The Overthinking Era. If you let the tree ask way too many questions, it starts memorizing every single tiny detail of your past weekends. It gets stuck on random noise instead of looking at the big beautiful picture.

The Sensitivity. It can be a little unstable. Just changing one minor detail about your data can make the algorithm scrap everything and rewrite the entire plan from scratch.

The Blocky Predictions. You do not get soft smooth curves. Your universe gets chopped into exact boxes. It is a little rigid if you wanted a softer and more flowing vibe for your predictions.

The Immediate Focus. The algorithm can get a bit distracted by instant gratification. It picks the absolute best option for the very next step but sometimes misses out on a much better master plan for the entire night. We always want to protect the peace and secure the absolute best night for the whole group.

**Controlling the overfitting**

To protect the peace and keep our tree from memorizing random noise we have to set some boundaries. We call these hyperparameters. You can adjust them right inside your Pyxie workspace to keep your model completely grounded.

**max_depth**
This controls how deep your overthinking goes. Are we just deciding between a rooftop bar and a cozy night in. Or are we stressing about the exact minute we apply our dewy sunscreen. Keeping the depth shallow gives you a simple and relaxed plan that works for everyone.

**min_samples_split**
This is how much data we need before we complicate things. How many past weekends do we need to look at before we decide to split our logic into a brand new path. It stops the group chat from getting chaotic over just one or two random nights.

**min_samples_leaf**
This is the ultimate vibe check for your final plan. It sets the minimum number of past experiences required for a final decision to be valid. If a specific routine only happened once, we are not making it an official aesthetic yet.

**max_features**
This limits how many details we obsess over at once. Instead of stressing about the budget and the weather and the outfits and the coffee all at the exact same time, we just pick a few key details to focus on for each choice.

The golden rule is simple. Shallow trees give you a flexible plan that always guarantees a good time for the girls. Deep trees just overcomplicate the night and ruin the vibe.

## [The Code](https://colab.research.google.com/drive/1GsGsLUyeM63NIoyirhy2dyQwko5tqycN?usp=sharing)

It is time to make this official. We are going to train our own Decision Tree to predict our exact mood score and secure the perfect plans. We are creating a dataset of past Friday nights. We are tracking our energy levels, checking our budget for matcha and aesthetic dinners, seeing if the girls are free, and checking if the weather is cute enough for taking digicam pictures. Then we split our data to test if our tree actually knows our aesthetic or if she is just memorizing past events. We keep the depth shallow so she does not start overthinking every tiny detail

\\\`\\\`\\\`python
# Friday night mood forecaster decision tree regression edition

import numpy as np
import pandas as pd
from sklearn.tree import DecisionTreeRegressor, plot_tree
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error, r2_score
import matplotlib.pyplot as plt

# Step 1 creating the friday life dataset
# Features are:
# tired_level where 1 is fresh and 10 is exhausted
# wallet_power is money available to go out
# bestie_available where 1 if yes and 0 if no
# weather_cute where 1 if nice weather and 0 if grey

np.random.seed(42)
n_rows = 1000

# generating features
tired_level = np.random.randint(1, 11, n_rows)
wallet_power = np.random.randint(50, 2001, n_rows)
bestie_available = np.random.randint(0, 2, n_rows)
weather_cute = np.random.randint(0, 2, n_rows)

friday_vibes = pd.DataFrame({
    "tired_level": tired_level,
    "wallet_power": wallet_power,
    "bestie_available": bestie_available,
    "weather_cute": weather_cute
})

# target mood score
# logic start at 50 subtract for tired add for money, bestie and weather
mood_score = (
    50 
    - (friday_vibes["tired_level"] * 4)          
    + (friday_vibes["wallet_power"] / 50)        
    + (friday_vibes["bestie_available"] * 15)    
    + (friday_vibes["weather_cute"] * 10)        
)

# clip scores to stay between 0 and 100 and add a bit of random life noise
mood_score = np.clip(mood_score + np.random.normal(0, 5, n_rows), 0, 100).astype(int)

# check the first few rows
print(friday_vibes.head())
print(f"Dataset Size {len(friday_vibes)} rows")

# Step 2 train and test split
vibe_features = friday_vibes
vibe_train, vibe_test, mood_train, mood_test = train_test_split(
    vibe_features,
    mood_score,
    test_size=0.25,
    random_state=42
)

# Step 3 create our decision tree regression queen
# max_depth controls how detailed she gets
mood_oracle = DecisionTreeRegressor(
    max_depth=5,            
    min_samples_leaf=2,     
    min_samples_split=20,
    random_state=42
)

# Step 4 train her on your historical Fridays
mood_oracle.fit(vibe_train, mood_train)

# Step 5 predictions and evaluation
mood_pred_train = mood_oracle.predict(vibe_train)
mood_pred_test = mood_oracle.predict(vibe_test)

mse_train = mean_squared_error(mood_train, mood_pred_train)
mse_test = mean_squared_error(mood_test, mood_pred_test)
r2_test = r2_score(mood_test, mood_pred_test)

print("Friday Night Mood Tree")
print(f"Training MSE {mse_train:.2f}")
print(f"Test MSE {mse_test:.2f}")
print(f"Test R squared Score {r2_test:.3f}\n")

# Step 6 inspect feature importance who matters most
print("Feature Importance who is running your life:")
for name, importance in zip(vibe_features.columns, mood_oracle.feature_importances_):
    print(f"  {name} {importance:.3f}")

# Step 7 visualize the tree the entire decision flowchart
plt.figure(figsize=(14, 8))
plot_tree(
    mood_oracle,
    feature_names=vibe_features.columns,
    filled=True,
    rounded=True,
    fontsize=10
)
plt.title("Friday Night Mood Decision Tree", fontsize=16, fontweight="bold")
plt.tight_layout()
plt.show()

# Step 8 compare actual vs predicted
plt.figure(figsize=(8, 6))
plt.scatter(mood_test, mood_pred_test, color='#FF69B4', s=100, alpha=0.6, edgecolors='#C71585')
plt.plot([mood_test.min(), mood_test.max()], [mood_test.min(), mood_test.max()], 
         'k:', lw=2, label='Perfect prediction')
plt.xlabel('Actual mood score', fontsize=12)
plt.ylabel('Predicted mood score', fontsize=12)
plt.title('How well does the tree know your vibes', fontsize=14, fontweight='bold')
plt.legend()
plt.grid(alpha=0.3)
plt.tight_layout()
plt.show()

# Step 9 let the model plan your next Friday
# scenario moderately tired, decent budget, bestie free, weather is cute
future_friday = pd.DataFrame({
    "tired_level":      [6],
    "wallet_power":     [700],
    "bestie_available": [1],
    "weather_cute":     [1]
})

future_mood = mood_oracle.predict(future_friday)[0]
print(f"\nPrediction for your next friday:")
print(f"   Tired 6 out of 10 | Budget 700 | Bestie Yes | Weather Cute")
print(f"   Expected mood score {future_mood:.1f} out of 100")

if future_mood >= 80:
    print("   Verdict ICONIC. Go out and serve looks.")
elif future_mood >= 60:
    print("   Verdict Decent vibes. Maybe a cozy cafe.")
else:
    print("   Verdict Stay home babe. Self care era.")

# Step 10 test different depths to show overthinking drama
print("\nTesting different tree depths for overthinking check:")
for depth in [2, 3, 5, 10]:
    temp_tree = DecisionTreeRegressor(max_depth=depth, random_state=42)
    temp_tree.fit(vibe_train, mood_train)
    train_r2 = r2_score(mood_train, temp_tree.predict(vibe_train))
    test_r2 = r2_score(mood_test, temp_tree.predict(vibe_test))
    print(f"  Depth {depth} gives Train R squared {train_r2:.3f} and Test R squared {test_r2:.3f}")
    
print("\nIf Train R squared is way higher than Test R squared, your tree is overthinking.")
\\\`\\\`\\\`

### What's happening here?

Let us look at what is actually running your life. The code spits out the feature importance and it is honestly so validating. Your energy level and your budget are taking up roughly 80% of the decision making power. Having your bestie available definitely saves the mood but whether the weather is cute or not barely even registers. The algorithm knows that if you are completely drained a sunny day is simply not going to fix the vibe.

![colab_output_1.png](/images/modules/regression/5-decision-tree-regression/colab_output_1.png)

Then we get the visual representation of how well the model knows you. Look at the dotted black line in the scatter plot as absolute perfection. If every single pink dot landed exactly on that line it would mean your algorithm can read your mind flawlessly. Our dots are clustering really nicely around the line which means the tree genuinely understands your aesthetic and predicts a solid night out. There is a little bit of spread because life is naturally unpredictable. Sometimes a fresh set of nails or an impromptu matcha run shifts the mood and you just have to account for that natural chaos.

![colab_output_2.png](/images/modules/regression/5-decision-tree-regression/colab_output_2.png)

Finally we have the overthinking check. Look at what happens when we set the depth to ten. The training score is practically perfect at 99%. The tree literally memorized every single tiny detail of your past weekends. But when we test it on brand new plans, the score completely drops. That is pure overfitting. It is overcomplicating things for absolutely no reason. It is stressing over a complicated slicked back hair routine when a simple claw clip would have given you the exact same clean girl aesthetic. Keeping the depth around five gives you a solid and reliable plan without completely ruining the peace of the group chat.

![colab_output_3.png](/images/modules/regression/5-decision-tree-regression/colab_output_3.png)

## Mini-Project: "The Everything Shower Time Predictor"

**Mission:** Build a Decision Tree Regression model entirely from scratch. You will predict exactly how many minutes an everything shower will take depending on specific mood and routine inputs.

**The data inputs**
You will create a custom dataset with at least five hundred rows. Here are the exact inputs you need to track.

- Stress Level. Rate it 1 to 10. 10 means you desperately need to romanticize your life.
- Hair Wash Day. 1 for yes and 0 for no.
- Shaving Required. 1 for yes and 0 for no.
- New Products Waiting. Do you have a brand new body scrub or hair mask to try. 1 for yes and 0 for no.

Generate your dataset using random numbers just like we did for the Friday night code. Make sure the logic is realistic. A hair wash day should add at least fifteen minutes.

**The target**
Total Shower Minutes. This is your continuous prediction. The base time is 20 minutes but it increases drastically when the other inputs are involved.`  ,
    content: () => React.createElement('div', {}),
    metadata: {
      sipTime: '48 mins',
      difficulty: 'Plot Twist Era (Intermediate)',
      prerequisites: 'Regression basics (Modules 1–4), if/else logic in code',
    },
    prevLesson: 'support-vector-regression',
    nextLesson: 'random-forest-regression',
    datasetFile: 'decision-tree-regression.csv',
    projectRubric: "AI Evaluator Rubric for 'The Everything Shower Time Predictor': 1. DATA GENERATION: No CSVs this time! They MUST write Python code (using numpy/pandas) to generate a synthetic dataset of at least 500 rows. If they try to load a file or generate a tiny dataset, give them a TRY_AGAIN and tell them a Decision Tree needs way more data to learn! 2. COLUMNS: The dataframe must include features: 'Stress Level', 'Hair Wash Day', 'Shaving Required', 'New Products Waiting', and the target 'Total Shower Minutes'. 3. LOGIC CHECK: Read their data generation math. Ensure the base time is around 20 minutes and that 'Hair Wash Day' logically adds at least 15 minutes. 4. MODEL: Must import and fit `DecisionTreeRegressor` from sklearn.tree. 5. THE ULTIMATE PREDICTION: They must use `model.predict()` to calculate and print the total time for the ultimate self-care night (Stress=10, Hair Wash=1, Shave=1, New Products=1). Watch out for the 1D array trap—remind them predict() needs a 2D array like `[[10, 1, 1, 1]]` if they get a shape error. HARD FAIL if they just hardcode the final answer without training the tree. Set status to TRY_AGAIN with sassy, supportive debugging advice if any step is missed.",
  },
  'random-forest-regression': {
    title: 'Random Forest Regression',
    markdownContent: `## The episode teaser

You know when you ask just one person for a dewy sunscreen recommendation and they swear by a product that leaves a terrible chalky layer. It happens to the best of us. Trusting a single source can sometimes lead you astray.

Now imagine you drop the question into a massive group chat of girls who just get it. There are a hundred of them. Each friend only tests the sunscreen under different specific conditions so everyone has a unique perspective.

One friend wears it while running errands. Another tries it while romanticizing her morning clay sculpting session. Another wears it out on campus with her slicked back hair and claw clip.

They all give their rating out of ten. You take the average of all their scores. Suddenly you are getting the absolute best advice because all the random chaos balances out and the actual truth emerges.

That is Random Forest Regression. It is not just one decision tree making predictions. It is an entire forest of trees that each look at slightly different pieces of your data and then they all decide together.

## The mood board

![random forest regression graph.png](/images/modules/regression/6-random-forest-regression/random_forest_regression_graph.png)

She's not just one opinion, she's the collective wisdom of the entire forest

## Decoding the pattern

The actual science behind this is called an ensemble method. Instead of relying on just one girl who might have a very specific skin type to make the call, we gather the whole squad.

Every single friend acts as her own decision tree. She tests the product, weighs the pros and cons, and gives it a final score.

When you combine all these different opinions, the final rating becomes incredibly reliable. If one girl had a bad skin day and rated it poorly, the other 99 glowing reviews will balance it out.

By averaging everyone's input, the algorithm gives you a really solid prediction. It is just girls supporting girls to make sure nobody walks out with a white cast.

**The core algorithm: Bagging + Randomness**

The secret behind the group chat success is mixing things up so nobody is copying each other.

First we do something called Bootstrap Sampling. For every friend in the chat we give them a slightly different set of test days. We pick random days from your month. Sometimes the same everything shower day gets picked twice and some chill reading days get skipped entirely. This makes sure every single girl has her own unique experience to base her review on.

Next is Random Feature Selection which is the real magic. When each friend is deciding her rating she is not allowed to look at every single detail. We give her a random smaller list of things to care about.

If there are twenty things to judge like price or texture or how it looks with your minimalistic jewellery, she only gets to look at maybe five of them. This stops everyone from just obsessing over one obvious thing like a viral brand name. If a girl does not even know the brand, she is forced to pay attention to how the formula actually feels.

Then we let them Grow Deep Trees. We let every friend go as deep into her thoughts as she wants. She can completely overthink her specific list of features just like that one friend who overanalyzes every single text message. On her own she might be overcomplicating things but that is completely fine because the group always balances her out.

Finally we Aggregate Predictions. When you need to make a final choice you ask the whole chat. Every girl gives her final score. Since we are doing regression which means predicting a number, we just find the average of all their scores.

$$
\displaystyle \hat{y}_{\text{forest}} = \frac{1}{B} \sum_{b=1}^{B} \hat{y}_b
$$

Here B is the total number of girls in the chat and the y variable is the score from each friend. If we were trying to just say yes or no to buying the product, we would take a majority vote instead. But for a specific rating we stick to the beautiful average.

**Why this is genius**

Relying on just one decision tree is like trusting that one friend who tried a bad vitamin C serum once and now believes all active ingredients will ruin your skin. Her opinion swings wildly based on one single bad experience. If one tiny detail changes, her entire perspective flips completely. She memorizes every little quirk of her own routine and refuses to see the broader truth. She completely overfits to her own daily life.

The random forest solution is turning to your supportive group chat. Everyone brings a completely diverse perspective based on their own unique skin journeys. Because you average all their thoughts, the wild individual takes get smoothed out. You get a beautifully balanced and reliable answer.

This method is incredibly strong against random noise and weird outliers. If one girl had a random breakout from a totally normal ingredient, it only affects her single vote. The rest of the girls keep the final rating accurate. The little mistakes from different girls cancel each other out naturally. As long as everyone is making their own choices and not just blindly copying the exact same influencer, you get the absolute best advice every single time.

**Feature Importance: Who's actually running your life?**

The random forest can actually tell you which specific detail is doing the heavy lifting in your routine. It tracks exactly how much each little thing clears up the confusion across every single review from the girls. This process measures how much a specific step like using an ice roller or applying a glossy lip oil helps everyone reach a clear and solid decision. We average this helpfulness score across the entire group chat. The details with the highest importance scores are the ones that constantly predict a good outcome, no matter what else is going on. It is like finally realizing that romanticizing your morning by working with clay and having a dark roast espresso sets your mood up for success way more than having perfect weather on campus. You only figure that absolute truth out after the girls analyze a hundred different daily routines. Random forests can tell you which features matter most by tracking how much each feature reduces variance across all splits in all trees.

**When your bestie squad thrives**

The absolute best part of having a massive group chat is how she handles the drama. Even if one friend is spiraling and overthinking a single text, the entire squad keeps things perfectly grounded.

She is completely unbothered by random weird moments. If one girl had a wild allergic reaction to a perfectly good lip gloss, the rest of the chat will not let that ruin the product for you.

You do not even need to organize your thoughts before asking for advice. There is no need to prep or perfectly aestheticize your data. If you drop a messy paragraph with missing details about your campus life, she still understands exactly what you mean.

She can process so much information at once. You can throw hundreds of details at her from your digicam photos to your reading list and she will not get confused.

She tells you exactly what actually matters so you stop worrying about the wrong things. Plus she is incredibly versatile. She can help you rate a new routine out of ten or just give you a simple yes or no answer.

**When she gets overwhelmed**

Of course relying on a huge group chat has some downsides. Waiting for a hundred girls to reply takes a lot more time and energy than just texting your one solo friend.

It is also way harder to explain how you reached your final choice. You cannot just draw a simple chart or point to one single text message. The answer is scattered across hundreds of different voice notes.

She can still get carried away if you give her too little information. If you only show her a few days of your life and let her overanalyze them, the advice will still miss the mark.

Asking for a fresh opinion is always extra work because you have to run your new situation past every single person in the chat all over again.

Finally she really struggles to imagine things outside her own reality. If you ask for advice on a completely new aesthetic that nobody in the chat has ever tried before, she will just average out her past experiences instead of giving you a truly new perspective.

**Setting the boundaries for your squad**

Just like every supportive chat needs some unspoken rules, your random forest needs boundaries so things do not spiral out of control. These are the settings you tweak to get the perfect results.

- First is **n_estimators** which is literally just how many friends you invite to the chat. Having more friends gives you better advice but adding more than two hundred girls just drains your phone battery without really changing the final verdict.
- Next is **max_feature**s which limits how much drama you drop at once. Instead of letting them judge your entire routine, you only let them look at a few details at a time. This keeps them focused.
- Then we have **max_depth** which controls how intense the overthinking gets. If you leave it unlimited, the girls will analyze every tiny detail until the early morning. Usually letting them go as deep as they want is totally fine but sometimes you need to cut the conversation short.
- For **min_samples_split** you are basically setting a minimum requirement for recognizing a pattern. It decides how many times a situation has to happen before your friends are allowed to draw a new conclusion. You cannot just declare a new beauty rule after trying a product only twice.
- Finally **min_samples_leaf** makes sure nobody is giving highly specific advice based on one weird isolated incident. It requires a minimum number of similar experiences to back up a final opinion so you do not end up with completely chaotic suggestions.

## [The Code](https://colab.research.google.com/drive/1c7jmTD7Z8KPY1AIu1GGvXuicc1GMXka1?usp=sharing)

Let us put all this theory into action. We are building the ultimate Friday planning algorithm. We are officially swapping out that one overthinking friend for a fully supportive group chat of decision trees.

\\\`\\\`\\\`python
# The friday night oracle forest
# because one single opinion is chaos but a hundred trees bring pure wisdom

import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestRegressor
from sklearn.tree import DecisionTreeRegressor
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error, r2_score
import matplotlib.pyplot as plt

# Step 1 create the ultimate friday dataset
# features
# energy_level 1 is absolute exhaustion 10 is fresh out of an everything shower
# wallet_power shopping budget available for the night
# bestie_available 1 if she is ready 0 if she is busy
# weather_cute 1 if it is a good hair day 0 if it is raining

np.random.seed(42)
n_rows = 2000

energy_level = np.random.randint(1, 11, n_rows)
wallet_power = np.random.randint(50, 3001, n_rows)
bestie_available = np.random.randint(0, 2, n_rows)
weather_cute = np.random.randint(0, 2, n_rows)

friday_plans = pd.DataFrame({
    "energy_level": energy_level,
    "wallet_power": wallet_power,
    "bestie_available": bestie_available,
    "weather_cute": weather_cute
})

# target is mood score out of 100
# random forests love complex situations so we use some math here
mood_score = (
    15
    + (friday_plans["energy_level"] * 3.5)
    + (np.log1p(friday_plans["wallet_power"]) * 5)
    + (friday_plans["bestie_available"] * 18)
    + (friday_plans["weather_cute"] * 12)
)

# adding some random life chaos noise
mood_score = np.clip(mood_score + np.random.normal(0, 7, n_rows), 0, 100).astype(int)

print(f"Dataset size {len(friday_plans)} rows")
print(friday_plans.head())

# Step 2 keep the receipts on unseen fridays
features_train, features_test, mood_train, mood_test = train_test_split(
    friday_plans,
    mood_score,
    test_size=0.2,
    random_state=42
)

# Step 3 build the models

# The solo overconfident friend who definitely overthinks
solo_tree = DecisionTreeRegressor(random_state=42)
solo_tree.fit(features_train, mood_train)

# the supportive group chat energy with a hundred trees
forest_oracle = RandomForestRegressor(
    n_estimators=100,
    max_features='sqrt',
    min_samples_leaf=2,
    random_state=42
)
forest_oracle.fit(features_train, mood_train)

# Step 4 get advice from both
solo_pred_train = solo_tree.predict(features_train)
solo_pred_test = solo_tree.predict(features_test)

forest_pred_train = forest_oracle.predict(features_train)
forest_pred_test = forest_oracle.predict(features_test)

# Step 5 compare the drama
print("SOLO FRIEND VERSUS THE GROUP CHAT")

print("Solo Decision Tree")
print(f"   Training R2 {r2_score(mood_train, solo_pred_train):.3f}")
print(f"   Test R2 {r2_score(mood_test, solo_pred_test):.3f}")
print(f"   Test MSE {mean_squared_error(mood_test, solo_pred_test):.2f}")

print("\nRandom Forest Group Chat")
print(f"   Training R2 {r2_score(mood_train, forest_pred_train):.3f}")
print(f"   Test R2 {r2_score(mood_test, forest_pred_test):.3f}")
print(f"   Test MSE {mean_squared_error(mood_test, forest_pred_test):.2f}")

print("\nNotice how the solo tree has a way higher training score than test score")
print("She completely overfits to her own experience")
print("The forest has closer scores which means better real world advice")

# Step 6 feature importance
importances = forest_oracle.feature_importances_
feature_names = friday_plans.columns

print("\nFEATURE IMPORTANCE Who is actually running your life")
importance_df = pd.DataFrame({
    'feature': feature_names,
    'importance': importances
}).sort_values('importance', ascending=False)

for idx, row in importance_df.iterrows():
    bar = '█' * int(row['importance'] * 50)
    print(f"   {row['feature']:20s} {bar} {row['importance']:.3f}")

# Step 7 visualize feature importance
plt.figure(figsize=(10, 6))
colors = ['#FF69B4', '#FF1493', '#C71585', '#DB7093']
importance_df_sorted = importance_df.sort_values('importance')
plt.barh(importance_df_sorted['feature'], importance_df_sorted['importance'], color=colors)
plt.xlabel('Importance score', fontsize=12, fontweight='bold')
plt.title('What actually matters for your night', fontsize=14, fontweight='bold')
plt.grid(axis='x', alpha=0.3)
plt.tight_layout()
plt.show()

# Step 8 actual vs predicted comparison
fig, axes = plt.subplots(1, 2, figsize=(14, 6))

# solo tree
axes[0].scatter(mood_test, solo_pred_test, color='#87CEEB', s=100, alpha=0.6, edgecolors='#4682B4')
axes[0].plot([mood_test.min(), mood_test.max()], [mood_test.min(), mood_test.max()],
             'k', lw=2, label='Perfect Prediction')
axes[0].set_xlabel('Actual Mood', fontsize=11)
axes[0].set_ylabel('Predicted Mood', fontsize=11)
axes[0].set_title('Solo Tree Energy', fontsize=12, fontweight='bold')
axes[0].legend()
axes[0].grid(alpha=0.3)

# random forest
axes[1].scatter(mood_test, forest_pred_test, color='#FF69B4', s=100, alpha=0.6, edgecolors='#C71585')
axes[1].plot([mood_test.min(), mood_test.max()], [mood_test.min(), mood_test.max()],
             'k', lw=2, label='Perfect Prediction')
axes[1].set_xlabel('Actual Mood', fontsize=11)
axes[1].set_ylabel('Predicted Mood', fontsize=11)
axes[1].set_title('Group Chat Wisdom', fontsize=12, fontweight='bold')
axes[1].legend()
axes[1].grid(alpha=0.3)

plt.tight_layout()
plt.show()

# step 9 predict your next Friday
future_friday = pd.DataFrame({
    "energy_level":     [8],
    "wallet_power":     [850],
    "bestie_available": [1],
    "weather_cute":     [1]
})

forest_prediction = forest_oracle.predict(future_friday)[0]
solo_prediction = solo_tree.predict(future_friday)[0]

print(f"\nNEXT FRIDAY PREDICTION")
print(f"   Setup Energy 8 out of 10 Budget 850 Bestie Yes Weather Cute")
print(f"\n   Solo tree says {solo_prediction:.1f} out of 100 mood")
print(f"   Forest squad says {forest_prediction:.1f} out of 100 mood")
print(f"\n   Trust the forest she has seen more patterns")

# Step 10 show how more trees equals better predictions
print("\nFOREST SIZE EXPERIMENT Do more trees equal better advice")
tree_counts = [10, 50, 100, 200, 300]
test_scores = []

for n_trees in tree_counts:
    temp_forest = RandomForestRegressor(n_estimators=n_trees, random_state=42)
    temp_forest.fit(features_train, mood_train)
    test_r2 = r2_score(mood_test, temp_forest.predict(features_test))
    test_scores.append(test_r2)
    print(f"   {n_trees:3d} trees gives Test R2 {test_r2:.4f}")

print("\nAfter a hundred to two hundred trees adding more does not help much")
print("We love setting healthy boundaries")
\\\`\\\`\\\`

### What's happening here?

**Reading the group chat receipts**

Look at the first set of graphs. The Solo Tree Energy side is exactly what happens when you trust one person who overthinks everything. The blue dots are literally all over the place. She is projecting her own past experiences onto a completely new Friday night and missing the mark completely.

![colab_output_1.png](/images/modules/regression/6-random-forest-regression/colab_output_1.png)

But then look at the Group Chat Wisdom graph. The pink dots hug that perfect prediction line so beautifully. When a hundred girls average out their thoughts you get a wonderfully clear and reliable answer. The chaos completely disappears.

**The overthinking intervention**

Check the numbers showing the solo friend versus the group chat. That solo decision tree scored an almost perfect 99% on her training data. She basically memorized her own past experiences perfectly.

![colab_output_4.png](/images/modules/regression/6-random-forest-regression/colab_output_4.png)

But when tested on completely new situations her score dropped drastically down to 64%. That is textbook overfitting. She panicked when things changed. The random forest stayed completely grounded. Her scores between training and testing are super close together which means her advice actually works in the real world.

**Spilling the real tea on your routine**

Now let us look at the pink bar chart telling us what actually matters. We love a good data reveal. It turns out that having cute weather or an unlimited shopping budget is not even the most important thing.

![colab_output_2.png](/images/modules/regression/6-random-forest-regression/colab_output_2.png)

Your energy level straight out of an everything shower and whether your best friend is free completely dominate the results. The math literally proved that protecting your peace and keeping your girls close is the ultimate secret to a perfect night.

**Setting healthy boundaries**

Finally look at the forest size experiment numbers. You might think adding more and more friends to the chat would just keep making the advice better forever. But the data shows something completely different.

![colab_output_3.png](/images/modules/regression/6-random-forest-regression/colab_output_3.png)

Going from 10 friends to 50 friends gives a nice little boost to the score. But once you hit a 100 friends, the score basically stops improving. Adding 200 or 300 girls just drains your phone battery for no reason. We love setting a strict boundary and knowing exactly when to close the chat.

## Mini-Project: "The Campus Life Optimizer"

**Mission**

Build a Random Forest model that predicts the perfect campus day out of a 100. You will use real messy data to figure out what actually makes a day successful. 

**The dataset info**

You will generate 200 rows of data based on your life.

- **Hours of Sleep** A number from 4 to 10.
- **Outfit Coordination** Score from 1 to 5. (matching sets or just sweatpants)
- **Caffeine Intake** Number of iced coffees or matcha lattes.
- **Study Session Quality** Score from 1 to 10.
- **Target Variable** Daily Success Score out of 100.

**Your tasks**

- **Data Prep** Clean up the data. Handle any missing values because life gets messy.
- **Train the Forest** Build a Random Forest Regressor with a 100 trees.
- **Compare and Prove** Train a single decision tree and show how it completely overfits compared to your forest.
- **Feature Importance** Run the code to see what actually runs your day. Is it the sleep or the outfit.
- **Predict Tomorrow** Feed your actual plans for tomorrow into the model and get your predicted success score.

**Deliverables**

- A clean Python script.
- Print a short paragraph sharing your biggest realization.`  ,
    content: () => React.createElement('div', {}),
    metadata: {
      sipTime: '50 mins',
      difficulty: 'Group Project Energy (Intermediate-Advanced)',
      prerequisites: 'Module 5, understanding of voting/averaging',
    },
    prevLesson: 'decision-tree-regression',
    nextLesson: 'evaluating-regression-models',
    datasetFile: 'random-forest-regression.csv',
    projectRubric: "AI Evaluator Rubric for 'The Campus Life Optimizer': 1. DATA PREP & CLEANING: They must generate a 200-row synthetic dataset with features ['Hours of Sleep', 'Outfit Coordination', 'Caffeine Intake', 'Study Session Quality'] and target 'Daily Success Score'. Crucially, they MUST intentionally introduce missing values (NaNs) and handle them using pandas `.fillna()` or `.dropna()`. If they skip the cleaning step, give them a TRY_AGAIN and remind them that It-Girls clean their data! 2. MODEL COMPARISON: They must train both a basic DecisionTreeRegressor AND a RandomForestRegressor (specifically checking that they set `n_estimators=100`). They need to compare the train/test scores to prove the single tree overfits. 3. FEATURE IMPORTANCE: They must access `model.feature_importances_` and print which factor actually runs their day. 4. THE TOMORROW PREDICTION: They must pass a custom 2D array into the forest's predict() method for their plans tomorrow. Watch for the 1D array shape error again! 5. VERDICT: They must `print()` a short paragraph with their biggest realization. HARD FAIL if they skip the comparison, the feature importance, or the printed realization. Give precise, sassy debugging advice if they miss any step.",
  },
  'evaluating-regression-models': {
    title: 'Evaluating Regression Models Performance',
    markdownContent: `## The episode teaser

You and the girls are planning a cute digicam photoshoot. Everyone brings their holy grail lip oils and dewy sunscreens to share. Each product promises to give that perfect glass skin finish. But before stepping outside, you all gather by the window for a quick front camera check. You help each other see which gloss actually catches the natural light best and if the blush blends flawlessly. That final mirror check to see if the makeup truly holds up or just looks good in the bathroom lighting is exactly what evaluating a regression model means. We need the model that predicts actual results and performs in real life. We are not just making things look pretty in theory.

**Why evaluation matters?**

Trusting a regression model without evaluating it first is exactly like buying a lip oil just because the bottle is pretty. You put it on and it instantly dries out your lips. You would never let your best friend walk outside with a flaky pout. We bring that exact same supportive energy to our code. Checking our work shows us if the predictions actually sit right with the real numbers. It tells us if the model is doing way too much or if it completely missed the mark.

**Shared setting and data story**

Let us set the scene for the group chat. We are trying to predict the exact minutes of skincare prep needed for a flawless makeup base before the camera flashes. One girl in your group swears by her slow morning routine with ice rollers and a calming gua sha massage. Another friend trusts a quick everything shower and slapping on a few star shaped pimple patches. Every regression model we test is basically just trying out these different prep routines. We want to see which routine actually gives everyone that perfect glowing base for the pictures so we can all look amazing together.

## What good looks like for regression

When we want to see if our model is actually working we look for four specific things to make sure all the girls are covered.

- First we look at prediction closeness to see if the predictions match the actual numbers. This is exactly like making sure your foundation matches your neck perfectly in the natural sunlight. We want everyone to have an immaculate base.
- Next we look at the error size to see how big the mistakes are. Small errors are just a tiny eyeliner smudge that your bestie can easily fix with some concealer. Big errors are like spilling iced coffee all over your fit right before the first picture.
- Then we check for systematic bias. Does the model always guess way too high or way too low? This happens when a friend accidentally keeps buying a dewy sunscreen that leaves a massive white cast. We step in and gently help her find a clear formula so she glows instead.
- Finally we look for stability to see if the model works on totally different days. A good model is exactly like a reliable skincare routine. It makes your skin look amazing whether you just had a long everything shower or you stayed up all night sketching in your journal.

## The “Does it work?” test

**Mean Absolute Error MAE**

What it tells us: The average amount the model misses the mark in totally normal terms. If the MAE is 2 minutes, it means our guess for the skincare routine is off by about two minutes on average.

Why we care: It is super straightforward and does not make a huge deal out of one bad guess. You being a few minutes late to meet the girls because you were deciding between claw clips? We totally get it and nobody is mad.

**Mean Squared Error MSE**

What it tells us: The squared average of the misses. This one is way more strict about huge mistakes.

Why we care: We use this when we absolutely need to avoid a total disaster. Picture someone bringing a totally wrong foundation shade to the shoot that makes everyone look orange. We want to catch those major slip ups before they ruin the photos.

**Root Mean Squared Error RMSE**

What it tells us: The square root of MSE. This brings the numbers back to the exact same units we started with so it is way easier to read.

Why we care: This is the standard beauty check for our models. It gives us a really realistic view of how well the prep routine worked without doing too much math in our heads while we are just trying to get ready.

**R squared**

What it tells us: The percentage of the final look that the model actually explains. If your R squared is 0.7, then the model explains 70% of the whole pattern.

Why we care: It gives us a super quick read on how helpful the routine actually is. We can immediately see if our lip gloss and blush combo is doing the heavy lifting for the final pictures or if we need to try something else.

**Adjusted R squared**

What it tells us: A more honest version of R squared. It makes sure a model does not get extra credit just for adding totally random steps that do nothing.

Why we care: It helps us decide between a clean minimalist aesthetic and total maximalism. You do not need 20 different serums if three actually do the work. This metric tells us exactly which products to keep so our routine stays perfect and unbothered.

## Evaluating each model

Now we get to try our beauty checklist on every single routine. We are keeping our main goal of that flawless group photo in mind.

**Simple linear regression**

Simple linear regression is like styling one beautiful statement piece. Picture a gorgeous satin slip dress that speaks for itself. It assumes one single product like a really good hydrating serum does all the work.

This is perfect when your skin is already having a clear and happy day. Just check your MAE and RMSE to be sure. If you notice weird patchy spots later then the single step routine was definitely incomplete.

**Multiple linear regression**

Multiple linear regression brings different features together just like a perfectly curated matching set. Every single piece plays a part in the final aesthetic. This model mixes several different products to get that glowing base.

We just need to watch our adjusted R squared so we avoid over accessorizing. We also check for multicollinearity to make sure our water based foundation does not clash with our silicone based primer. We want everything to blend beautifully for all the girls.

**Polynomial regression**

Polynomial regression lets your data curve gracefully like a gorgeous draped skirt. It naturally shapes to the actual bends and waves of the numbers. We use this when a basic straight line just is not working for us.

But we have to be super careful about overfitting. That is when the outfit becomes a super busy pattern that looks weird on camera. We check our RMSE on brand new data to make sure the look actually works in the real world.

**Support vector regression**

Support vector regression is exactly like using an exact brow shaping pencil. It focuses completely on keeping your predictions within a very specific acceptable margin.

It can look incredibly sculpted and elegant but you have to choose your settings really carefully. We inspect the errors and try out a few different margins to find that perfect soft but defined arch that flatters everyone.

**Decision tree regression**

Decision tree regression is like choosing what to wear based on specific questions. Is it sunny out? Are we doing a coffee run or a picnic? It splits the data using really clear choices.

Trees are super cute and easy to understand. But if you just use one tree it might overthink tiny details and overfit. We always look at our MAE and RMSE and check the depth of the tree so we do not end up with a totally chaotic outfit.

**Random forest regression**

Random forest regression is basically your entire squad of friends bringing their outfit suggestions and then voting on the final look. Combining all those different opinions completely smooths out any weird individual choices.

It usually gives us the most reliable and gorgeous result without any drama. We still check our RMSE and MAE on our test photos to make sure the squad is actually giving good advice and not just blindly agreeing with each other.

## Practical evaluation workflow

Here is our essential getting ready checklist to run through before anyone steps in front of the camera.

- First we split our data into training and testing sets. We never judge our final look in the exact same bathroom mirror we used to get ready because we need fresh natural lighting.
- Next we fit the model on our training data only. We are basically trying out the new skincare routine on a chill Sunday morning at home first.
- Then we predict on the test data and check our MAE, RMSE and R squared. We step outside into the actual sunlight and see if the glow holds up in the real world.
- After that we look at our residuals plotted against the predicted values. We are checking to see how the makeup wears throughout the day. If it creases in the exact same spot every single time then something is definitely wrong with the prep.
- If the performance feels a little shaky, we use cross validation. This just means we try wearing the look on a few totally different days to make sure it is actually reliable for everyone.
- Finally we compare our adjusted R squared to pick a model that is both accurate and completely effortless. We want the absolute best glow without making our vanity a totally chaotic mess.

## Quick diagnostic tips

These are those tiny little checks we do right before pressing the camera shutter. We do this just like a quick front camera swipe with our girls.

- Residual plot is flat and scattered. Yes! this means our model is behaving beautifully. The foundation is smooth and the skin looks flawless all over.
- Residuals are showing a curve. No! this means the makeup is settling into lines awkwardly. We might need to switch to polynomial regression so our look actually moves naturally with us.
- Residuals fan out as predictions change. No! this means your T zone is getting super oily while your cheeks are completely dry. We need to transform our target or use models that handle totally different skin textures at the same time.
- One single variable is dominating with crazy values. No! this means someone applied way too much liquid blush and it is overpowering the whole face. We need to check for multicollinearity and make sure our products actually compliment each other instead of fighting for attention.

## Overfitting and Underfitting

Underfitting is like throwing on some plain lip balm and entirely skipping the rest of your prep. The model is way too simple and totally misses the glowing aesthetic we want.

Overfitting is like wearing your statement claw clip and all your minimalistic jewellery and three different lip oils all at once. It might look okay in your exact bathroom lighting but it is way too much for a casual day outside.

We use our validation tests to catch when we are trying way too hard. We always prefer a clean aesthetic that looks gorgeous no matter where we go.

## Final note

Getting your regression model right is exactly like prepping for picture day with the girls. You always have to check your final look in real natural lighting before anyone pulls out their digicam. Trust your quick makeup checks and pick the routine that actually works perfectly for everyone in the group chat. We are making sure we all look our absolute best. We just want models that give us that flawless finish and actually hold up all day long.`  ,
    content: () => React.createElement('div', {}),
    metadata: {
      sipTime: '20 mins',
      difficulty: 'Advanced',
      prerequisites: 'Module 0-6',
    },
    prevLesson: 'random-forest-regression',
    nextLesson: 'regression-model-selection',
  },
  'regression-model-selection': {
    title: 'Regression Model Selection',
    markdownContent: `## The episode teaser

You and your girls are planning outfits for exam week and it is basically a micro runway on campus. Some days you just need that fuss free dewy sunscreen and a slicked back bun to survive a long study session. Other days you are pulling up in a cute matching set and minimalistic jewellery to completely own a big presentation. Choosing a regression model is just picking your outfit for the day. We are looking for what feels right and actually works for the exact situation you are in. We are helping each other find the absolute best fit that gets the job done perfectly instead of just looking good in a textbook.

## Quick checklist before choosing

Before you pull an outfit from your closet, you naturally do a quick scan. We just need to assess the situation first so we know exactly what we are working with.

Ask yourself a few friendly questions to get started. How big is the problem we are trying to solve? Do you need a model that is super easy to explain so your whole group project team totally gets it? Are you juggling a ton of different features or just focusing on one detail? How messy is the connection between your features and your final target?

Answering these questions helps us narrow down the closet instantly. It gives you the clarity you need so you and your girls can make the perfect choice without any stress.

**Model 1 Simple linear regression**
This is your classic lip gloss. One swipe and you get that beautiful glossy shine. You reach for this when one strong predictor is doing all the heavy lifting and everything looks completely straight and predictable. It is so easy to explain to your study group and looks absolutely flawless in your project reports. If things start looking a bit off or the fit feels too tight you might just need to layer something else over it.

**Model 2 Multiple linear regression**
This is your favorite matching set moment. You are combining several cute pieces and each one adds a little something extra. The whole outfit stays totally gorgeous as long as all the pieces play well together. Just watch out for pieces that clash when two features are basically repeating the exact same thing. When that happens your look gets a little too busy and confusing. We use adjusted R squared and quick feature checks to keep the final look perfectly clean and put together.

**Model 3 Polynomial regression**
Imagine a flowy skirt that naturally curves exactly as you move around campus. When the data bends, you just add gentle curves instead of forcing a perfectly straight line that does not belong there. It looks beautiful but if you add way too many curves, the pattern gets really loud and only looks flattering under studio lighting. Always validate your model on fresh data so you know the fit stays gorgeous under natural daylight.

**Model 4 Support vector regression**
Picture doing your brows with a really light hand. You are just focusing on keeping everything within a completely acceptable margin of error. It looks so stunning for small and medium sized datasets when you really care about controlling any flyaways or deviations. You just need to make careful choices for the margin and kernel so the whole look does not become too stiff or unnatural.

**Model 5 Decision tree regression**
This is totally your mood based outfit for the day. You are picking pieces by clear yes or no decisions like is the weather warm then yes grab the skirt but if it is rainy then absolutely no. Trees are so intuitive and really easy to explain to your girls in a group discussion. They can get a little dramatic though if you start splitting on tiny little details. Just prune the tree or limit the depth so your outfit stays cute and does not turn into a literal costume.

**Model 6 Random forest regression**
This is literally your supportive friend group chat. Each friend suggests an outfit and then you all reach a consensus together. Random forest just averages many trees so any completely odd choices naturally cancel out. It usually gives you really reliable performance without any unnecessary styling drama. We still check validation errors just to make sure the whole group circle is not accidentally echoing the exact same bad idea.

## How to match models to data like matching skincare to skin

**Small data and simple relationships**
When you just have a little bit of data and everything is straightforward, reach for simple linear regression or SVR with a smooth kernel. These are completely lightweight and so easy to justify exactly like throwing on your favorite tee before an early campus lecture.

**Many features and need for explanation**
If your dataset has a ton of features and you need to explain what each one does to your study group, multiple linear regression keeps everything totally readable. You pull this out when you absolutely must tell the exact story behind your predictions just like walking your friends through every single step of your everything shower routine.

**Curvy relationships**
Polynomial regression adds gentle curves exactly where you need them. It acts just like using a smooth gua sha to naturally follow the shape of your face. Just keep the degree low so it stays looking effortless unless you have a massive amount of data to support the extra styling.

**Nonlinear messy patterns**
When your data is completely messy and all over the place, decision trees and random forests step in to handle those complex splits. It is like finally putting up a messy hair day in a cute claw clip so you can actually sit down and focus on your reading. The random forest is always gentler and totally reliable for general performance.

**Concerned about extreme errors**
If you are worried about making huge mistakes, you want models that actively reduce those big misses. Random forest or MSE focused tuning act exactly like an overnight pimple patch that catches a huge breakout before it ruins your morning. You can also use SVR with a narrower margin to keep everything perfectly under control.

## Practical selection flow

This is a short routine you can follow just like your morning skincare steps. Getting ready for the day should feel effortless and completely natural and choosing a model follows the exact same process. Let us walk through the steps together so you feel completely confident.

- First you want to grab a quick exploratory plot of your feature versus the target. We just want to see if the patterns look completely straight or if they have a natural curve to them. It is exactly like checking the screen on your digicam to see your lighting before you actually start getting ready.
- Always start with a simple linear regression as your reliable base layer. Treat it as your daily dewy sunscreen that preps your face perfectly. Then you can gradually add more features into a multiple regression. Just keep a really close eye on your adjusted R squared exactly like layering your favorite lip glosses to see what combination looks the best.
- If a beautiful curve naturally appears, you can absolutely add some polynomial terms. Just remember to check your validation error so the whole look does not get too heavy. If the relationships start looking completely irregular and messy just reach for a decision tree or a random forest. It smooths out the chaos instantly just like a cold ice roller soothes a puffy face in the morning.
- For every single candidate you test compute your MAE, RMSE and R squared on a held out set or through cross validation. We just want to pick the model that beautifully balances accuracy, simplicity and stability across all the folds. It is all about finding that glowing final look that actually lasts all day and helps you and your girls get the best pictures.

## Avoid overfitting like avoiding too many filters on a selfie

Overfitting is literally like putting way too many filters on a cute selfie before posting it on your close friends story. It might look totally flawless on your screen but then it just does not match up with reality. Your model is just trying way too hard to memorize every single tiny wrinkle in the training data instead of learning the actual natural pattern.

To fix this we just use validation sets or cross validation to make sure your model actually works out in the real world. If two models are giving you similar results always choose the simpler one. It is exactly like going with a clean slicked back bun instead of a complicated hairstyle that completely falls apart the second you step outside. Using regularization helps keep everything completely grounded and authentic.

## Model interpretability matters too

Sometimes you actually have to stand up and present your whole project to your study group or a really strict professor. Linear models and small decision trees read exactly like a quick outfit check video where you can effortlessly explain exactly where you got every single piece. They are totally transparent and easy for everyone to get right away. Things like a random forest or SVR might be a little harder to explain clearly to your girls but they usually give you way more accurate results. You just have to sit down and decide what matters more for your specific task that day. Are we going for a totally clear look everyone understands immediately or do we really need that ultimate accuracy to secure the perfect grade together.

## Closing pep talk

You are selecting your models exactly like curating your dream Pinterest wardrobe.  Always start simple with your cute basics and then slowly add more pieces only if you actually need them. Trust your validation scores the exact same way you trust your girls when they tell you a fit looks absolutely gorgeous on you. Just keep your explanations ready so you can gracefully help your teammates understand exactly what you built. We completely support making choices that are actually useful and crystal clear rather than just picking something flashy that totally breaks under pressure. You are going to do so incredibly well with this and your whole community is right here cheering you on every single step of the way.`  ,
    content: () => React.createElement('div', {}),
    metadata: {
      sipTime: '20 mins',
      difficulty: 'The Archive Collection (Advanced)',
      prerequisites: 'Regression Foundations',
    },
    prevLesson: 'evaluating-regression-models',
    nextLesson: undefined,
  },
};
