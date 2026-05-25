---
title: Polynomial Regression
sipTime: 27 mins
difficulty: Intermediate but you are totally ready for this
prerequisites: Module 2 (MLR), comfort with lines & curves
---

## The episode teaser

Your life graph is definitely not a straight line anymore.

At sixteen, you were just figuring it all out. At nineteen, you finally perfected that slicked back hair and claw clip combo. At twenty one, the college burnout hit hard and you needed a full everything shower just to feel human again. Now you are out here serving absolute main character energy in your cute matching sets.

If you tried to draw a straight line through all those phases, it would literally be lying. Your journey is beautifully curved and full of plot twists. Your data acts the exact same way.

Enter Polynomial Regression. This is the logic we use when the connection between your input and output curves instead of going perfectly straight. It still makes total sense but it just has a little more flavor.

Picture the time you spend doing your daily gua sha routine versus how sculpted you feel. Or the hours you spend romanticizing your life on Pinterest versus how aesthetic your outfits actually become. Sometimes things just do not move in a straight line and we love that for us.

## The mood board

![polynomial regression graph.png](../../../public/images/modules/regression/3-polynomial-linear-regression/polynomial_regression_graph.png)

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

$X = \begin{bmatrix}
1 & x_1 & x_1^2 & x_1^3 \\
1 & x_2 & x_2^2 & x_2^3 \\
\vdots & \vdots & \vdots & \vdots
\end{bmatrix}$

Then we just solve it using our classic formula.

$$
y=Xβ+ϵ
$$

The cost function stays exactly the same as before. We still use Mean Squared Error to measure our progress.

$$
MSE = \frac{1}{n} \sum_{i=1}^{n} (y_i - \hat{y}_i)^2
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

```python
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
```

### What's happening here?

Let us see exactly what your results are telling you. Look at that degree two formula output. Your base energy at year zero was a solid 14. That is your starting point before you even curated your first vision board or started romanticizing your coding sessions.

![colab_output_1.png](../../../public/images/modules/regression/3-polynomial-linear-regression/colab_output_1.png)

The coefficients show exactly what is working. Your daily habits give you a steady little boost but that squared term is where the real magic happens. That is the compounding effect of your everything showers and healthy boundaries finally paying off. And that R squared score of almost one basically means your model perfectly understands your aesthetic.

Then we have the gorgeous plot. Look at how perfectly that smooth curve swoops up and catches almost every single point of your timeline. A basic flat line would have totally missed those high energy peaks later in your journey. This visual is the ultimate proof that putting time into yourself creates a beautiful compounding arc.

![colab_output_2.png](../../../public/images/modules/regression/3-polynomial-linear-regression/colab_output_2.png)

The best part is looking at your future predictions. The model looked at your current trajectory and saw massive potential. By year 10, your energy hits over 150. By year 12, you are pushing past 200. This proves that sticking to your routines and keeping that unbothered mindset just keeps multiplying your success. You are quite literally mathematically projected to keep thriving.

![colab_output_3.png](../../../public/images/modules/regression/3-polynomial-linear-regression/colab_output_3.png)

Finally we have the degree three drama check. You already know from building your own smart AI projects that more math is not always better. We added an extra layer of complexity to see if it would understand your vibe more accurately. The results are super clear. The error score barely dropped and the accuracy score stayed exactly the same.

![colab_output_4.png](../../../public/images/modules/regression/3-polynomial-linear-regression/colab_output_4.png)

Adding that third degree of drama did absolutely nothing to improve your model. It is the perfect reminder that sometimes a simple solid routine is all you need and overcomplicating things just invites unnecessary chaos.

## Mini-Project: "The Study-Overload Curve"

Let us figure out exactly how much studying is genuinely too much.”

**Your Mission:** You are going to build a gorgeous Polynomial Regression model to prove exactly when your brain officially clocks out. We need to capture that messy non linear reality between the hours you spend romanticizing your study sessions and your actual exam scores.

**Dataset: [The Study-Overload Curve](https://www.kaggle.com/datasets/anjaliisharmaa/the-study-overload-curve)** (Or you can just use **pd.read_csv('study.csv')** and let Pyxie load it for you right here!) ****25 highly relatable data points of effort vs. exhaustion. X = hours studied, Y = exam score.

**Your Goals:**

- Train your models using polynomial degrees one two and three.
- Compare their R squared scores on your test set to see which model is actually telling the truth.
- Figure out which degree perfectly captures that delicate balance of focused effort versus total burnout without being dramatic and overfitting your data.