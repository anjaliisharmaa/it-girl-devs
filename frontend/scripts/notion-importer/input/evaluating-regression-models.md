---
title: Evaluating Regression Models Performance
sipTime: 20 mins
difficulty: Advanced
prerequisites: Module 0-6
---
## The episode teaser

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

Getting your regression model right is exactly like prepping for picture day with the girls. You always have to check your final look in real natural lighting before anyone pulls out their digicam. Trust your quick makeup checks and pick the routine that actually works perfectly for everyone in the group chat. We are making sure we all look our absolute best. We just want models that give us that flawless finish and actually hold up all day long.