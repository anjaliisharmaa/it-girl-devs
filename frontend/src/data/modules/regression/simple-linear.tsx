// Syntax Highlighter Component
const PythonTerminal = ({ code }: { code: string }) => {
  const highlightLine = (line: string): (string | JSX.Element)[] => {
    const result: (string | JSX.Element)[] = [];
    let lastIndex = 0;

    // Regex to match: strings, comments, keywords, numbers
    const tokenRegex = /('([^'\\]|\\.)*'|"([^"\\]|\\.)*"|#.*?$|\b(import|from|as|def|class|if|else|elif|for|while|return|in|and|or|not|True|False|None|reshape|array|split|fit|predict)\b|\b\d+\.?\d*\b)/gm;
    
    let match;
    while ((match = tokenRegex.exec(line)) !== null) {
      // Text before match
      if (match.index > lastIndex) {
        result.push(
          <span key={`text-${lastIndex}`} style={{ color: '#F5E6E8' }}>
            {line.substring(lastIndex, match.index)}
          </span>
        );
      }

      // Determine token type and color
      let color = '#F5E6E8'; // Default
      if (match[0].startsWith('#')) {
        color = '#E8B4E4'; // Comments: Lavender
      } else if (match[0].startsWith('"') || match[0].startsWith("'")) {
        color = '#A8E6CF'; // Strings: Mint green
      } else if (/^\d+\.?\d*$/.test(match[0])) {
        color = '#FFE082'; // Numbers: Soft yellow
      } else {
        color = '#FF4C9A'; // Keywords: Bright pink
      }

      result.push(
        <span key={`token-${match.index}`} style={{ color }}>
          {match[0]}
        </span>
      );
      lastIndex = match.index + match[0].length;
    }

    // Remaining text
    if (lastIndex < line.length) {
      result.push(
        <span key={`text-end`} style={{ color: '#F5E6E8' }}>
          {line.substring(lastIndex)}
        </span>
      );
    }

    return result.length ? result : [<span key="empty" style={{ color: '#F5E6E8' }}>{line}</span>];
  };

  return (
    <div style={{ margin: '2.5rem 0' }}>
      {/* Terminal Window */}
      <div style={{ background: '#1E1E2E', borderRadius: '1rem', overflow: 'hidden', border: '1px solid rgba(236, 72, 153, 0.2)', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3)' }}>
        {/* Window Header */}
        <div style={{ background: '#2d2a3e', padding: '0.75rem 1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(236, 72, 153, 0.1)' }}>
          {/* Traffic Light Buttons */}
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#FFB6C1', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.2)' }}></div>
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#D8BFD8', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.2)' }}></div>
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#F0F0F0', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.2)' }}></div>
          </div>
          {/* Filename Label */}
          <span style={{ fontSize: '0.75rem', fontFamily: 'monospace', color: '#F4A6D3', letterSpacing: '0.05em' }}>bestie_bot.py</span>
          <div style={{ width: '48px' }}></div>
        </div>

        {/* Code Content */}
        <div style={{ padding: '1.5rem', overflowX: 'auto', maxHeight: '400px', overflowY: 'auto', backgroundColor: '#1E1E2E' }}>
          <div style={{ fontFamily: 'monospace', fontSize: '0.875rem', lineHeight: '1.5' }}>
            {code.split('\n').map((line, idx) => (
              <div key={idx} style={{ margin: 0, padding: 0, minHeight: '1.5rem' }}>
                {highlightLine(line)}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Python code content
const pythonCode = `# 🎀 Let's predict how many compliments you get based on skincare time
# Importing our IT girl toolkit
import numpy as np
import matplotlib.pyplot as plt
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error, r2_score

# 📊 Our messy real-life data
# Hours spent on skincare routine per day
skincare_hours = np.array([0.5, 1.0, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0, 4.5, 5.0]).reshape(-1, 1)

# Compliments received that day (we're tracking EVERYTHING ✨)
compliments_received = np.array([2, 4, 5, 7, 8, 10, 11, 13, 14, 16])

# 🎯 Splitting our data (because we need a test group, duh)
# 80% for training our bestie_bot, 20% for testing her predictions
hours_train, hours_test, compliments_train, compliments_test = train_test_split(
    skincare_hours, 
    compliments_received, 
    test_size=0.2, 
    random_state=42  # this number keeps results consistent (it's giving organization icon)
)

# 🤖 Creating our prediction bestie
bestie_bot = LinearRegression()

# 📚 Teaching her the pattern (this is where the magic happens)
bestie_bot.fit(hours_train, compliments_train)

# 🔮 Making predictions on our test data
predicted_compliments = bestie_bot.predict(hours_test)

# 📈 Checking her accuracy (is she giving or is she GIVING?)
mse = mean_squared_error(compliments_test, predicted_compliments)
r2 = r2_score(compliments_test, predicted_compliments)

print(f"✨ The Slope (how much each hour matters): {bestie_bot.coef_[0]:.2f}")
print(f"💅 The Intercept (your natural baseline glow): {bestie_bot.intercept_:.2f}")
print(f"📉 Mean Squared Error (total regret): {mse:.2f}")
print(f"💯 R² Score (accuracy percentage): {r2:.2f}")

# 🎨 Let's visualize this
plt.figure(figsize=(10, 6))
plt.scatter(skincare_hours, compliments_received, color='#FF69B4', s=100, alpha=0.6, label='Real Life Data')
plt.plot(skincare_hours, bestie_bot.predict(skincare_hours), color='#FF1493', linewidth=3, label='Prediction Line')
plt.xlabel('Hours on Skincare 💆‍♀️', fontsize=12)
plt.ylabel('Compliments Received 💕', fontsize=12)
plt.title('The Glow-Up Formula', fontsize=14, fontweight='bold')
plt.legend()
plt.grid(alpha=0.3)
plt.show()

# 🔮 Future prediction: If I do 6 hours tomorrow, what happens?
future_routine = np.array([[6.0]])
future_compliments = bestie_bot.predict(future_routine)
print(f"\\n💫 If you do {future_routine[0][0]} hours tomorrow, expect {future_compliments[0]:.0f} compliments!")`;

export default function SimpleLinearContent() {
  return (
    <>
      {/* 🎀 The Metadata Badges */}
      <div className="flex flex-wrap gap-3 mb-12">
        <span className="bg-pink-100 text-pink-600 px-4 py-1.5 rounded-2xl text-base font-mono text-wrap leading-normal inline-flex items-center w-fit max-w-full shadow-sm border border-pink-200">
          ☕ Sip Time: 8 mins
        </span>
        <span className="bg-pink-100 text-pink-600 px-4 py-1.5 rounded-2xl text-base font-mono text-wrap leading-normal inline-flex items-center w-fit max-w-full shadow-sm border border-pink-200">
          🎀 Difficulty: First Date Energy (Beginner-Friendly)
        </span>
        <span className="bg-pink-100 text-pink-600 px-4 py-1.5 rounded-2xl text-base font-mono text-wrap leading-normal inline-flex items-center w-fit max-w-full shadow-sm border border-pink-200">
          🎒 Prerequisites: Basic Python, knowing what a graph is
        </span>
      </div>

      {/* 🎬 The Episode Teaser */}
      <h2 className="font-serif text-2xl text-pink-600 mt-[2.5rem] mb-[5rem]">🎬 The Episode Teaser</h2>
      <p className="text-[#590D22] leading-[2.5rem] mb-[2.5rem]">
        You&apos;re sitting in your favorite coffee shop, scrolling through that influencer&apos;s Instagram (we&apos;ve all been there ✨). You notice something: every time she posts a gym selfie, her engagement rate SPIKES. Like, clockwork. You start thinking... is there a <em>formula</em> to this? Can you predict your own Instagram engagement based on how many times you post workout content?
      </p>
      <p className="text-[#590D22] leading-[2.5rem] mb-[10rem]">
        Welcome to your villain origin story, bestie. You&apos;re about to build your first prediction model, and honestly? It&apos;s giving main character energy. <strong>Simple Linear Regression</strong> is your new bestie. She finds straight-line relationships in messy data. She is that friend who can spot a toxic pattern from a MILE away. She&apos;s about to help you predict outcomes based on ONE single input. No drama, just math. Let&apos;s get into it.
      </p>

      {/* 🖼️ The Mood Board */}
      <h2 className="font-serif text-2xl text-pink-600 mt-[2.5rem] mb-[5rem]">🖼️ The Mood Board (Visuals)</h2>
      <img 
        src="/images/modules/regression/slr/linear_regression_graph.png" 
        alt="Linear Regression Graph" 
        className="rounded-2xl shadow-sm border-2 border-pink-100 w-full my-[2.5rem]" 
      />
      <p className="text-[#590D22] leading-[2.5rem] mb-[2.5rem] text-center italic">
        &quot;The line doesn&apos;t touch every point because life isn&apos;t perfect, but it shows the TREND, and that&apos;s what matters 💅&quot;
      </p>

      {/* 🍵 The Technical Tea */}
      <h2 className="font-serif text-2xl text-pink-600 mt-[2.5rem] mb-[2.5rem]">🍵 The Technical Tea</h2>
      <p className="text-[#590D22] leading-[2.5rem] mb-[2.5rem]">
        Okay, let&apos;s break this down like we&apos;re explaining it to our group chat.
      </p>
      <p className="text-[#590D22] leading-[2.5rem] mb-96">
        <strong>Simple Linear Regression</strong> is all about finding the relationship between TWO variables: one input (<strong>independent variable</strong>, let&apos;s call her X) and one output (<strong>dependent variable</strong>, let&apos;s call her Y). The goal? Draw the best-fitting straight line through your data points so you can make predictions.
      </p>
      <p className="text-[#590D22] leading-[2.5rem] mb-[2.5rem]">
        She’s iconic, she’s a legend, she’s... the equation:
      </p>

      <div className="bg-white p-6 rounded-lg border-2 border-[#590D22] shadow-[4px_4px_0px_0px_#FFD1DC] text-center my-10 mx-4">
        <p className="font-mono text-2xl text-[#590D22] font-black tracking-wider m-0">Y = mX + b</p>
      </div>

      <p className="text-[#590D22] leading-[2.5rem] mb-[2.5rem]">
        Or in ML terms:
      </p>

      <div className="bg-white p-6 rounded-lg border-2 border-[#590D22] shadow-[4px_4px_0px_0px_#FFD1DC] text-center my-10 mx-4">
        <p className="font-mono text-lg text-[#590D22] font-black tracking-wider m-0">y = β₁x + β₀</p>
      </div>

      <p className="text-[#590D22] leading-[2.5rem] mb-[2.5rem]">
        <strong>Translation time:</strong>
      </p>
      <ul className="text-[#590D22] leading-[2.5rem] mb-[2.5rem]">
        <li className="leading-[2.5rem]">y = Your <strong>predicted outcome</strong> (like &quot;expected compliments&quot;)</li>
        <li className="leading-[2.5rem]">x = Your <strong>input feature</strong> (like &quot;hours on skincare&quot;)</li>
        <li className="leading-[2.5rem]">β₁ (or m) = The <strong>slope</strong> (how much Y changes when X increases by 1)</li>
        <li className="leading-[2.5rem]">β₀ (or b) = The <strong>intercept</strong> (where the line crosses the Y-axis—your baseline vibe even with ZERO effort)</li>
      </ul>

      <h3 className="font-serif text-xl text-pink-500 mt-[2.5rem] mb-[2.5rem]">How Does She Find This Line?</h3>
      <p className="text-[#590D22] leading-[2.5rem] mb-[2.5rem]">
        Here&apos;s where it gets spicy. The algorithm tries MULTIPLE lines and picks the one that minimizes the <strong>Cost Function</strong> (also called <strong>Mean Squared Error</strong> or MSE). Think of the cost function as &quot;total regret&quot;—how far off your predictions are from reality.
      </p>
      <p className="text-[#590D22] leading-[2.5rem] mb-[2.5rem]">
        The formula for MSE is:
      </p>

      <div className="bg-white p-6 rounded-lg border-2 border-[#590D22] shadow-[4px_4px_0px_0px_#FFD1DC] text-center my-10 mx-4">
        <p className="font-mono text-2xl text-[#590D22] font-black tracking-wider m-0">MSE = (1/n) × Σ(yᵢ - ŷᵢ)²</p>
      </div>

      <p className="text-[#590D22] leading-[2.5rem] mb-[2.5rem]">
        Where:
      </p>
      <ul className="text-[#590D22] leading-[2.5rem] mb-[2.5rem]">
        <li className="leading-[2.5rem]">yᵢ = <strong>Actual value</strong> (real compliments you got)</li>
        <li className="leading-[2.5rem]">ŷᵢ = <strong>Predicted value</strong> (what the model THOUGHT you&apos;d get)</li>
        <li className="leading-[2.5rem]">n = Number of data points</li>
      </ul>

      <p className="text-[#590D22] leading-[2.5rem] mb-[2.5rem]">
        We square the errors because negative differences would cancel out positive ones (and we&apos;re not about that toxic behavior). The algorithm uses <strong>Gradient Descent</strong>—basically trial and error on steroids—to adjust the slope and intercept until the MSE is minimized.
      </p>

      <h3 className="font-serif text-xl text-pink-500 mt-[2.5rem] mb-[2.5rem]">The Assumptions (Yes, She Has Standards)</h3>
      <p className="text-[#590D22] leading-[2.5rem] mb-[2.5rem]">
        Linear regression has some non-negotiables:
      </p>
      <ol className="text-[#590D22] leading-[2.5rem] mb-[2.5rem]">
        <li className="leading-[2.5rem]"><strong>Linearity</strong> – The relationship must be straight-line-ish</li>
        <li className="leading-[2.5rem]"><strong>Independence</strong> – Each data point is its own person (no copying homework)</li>
        <li className="leading-[2.5rem]"><strong>Homoscedasticity</strong> (sorry for the SAT word 😭) – The &quot;scatter&quot; around the line should be consistent, not going wild</li>
        <li className="leading-[2.5rem]"><strong>Normality</strong> – Errors should be normally distributed (bell curve vibes)</li>
      </ol>
      <p className="text-[#590D22] leading-[2.5rem] mb-[2.5rem]">
        If your data violates these? She won&apos;t work. It&apos;s giving &quot;I can fix him&quot; energy, and we DON&apos;T do that here.
      </p>

      {/* 💻 The Code */}
      <h2 className="font-serif text-2xl text-pink-600 mt-[2.5rem] mb-[2.5rem]">💻 The Code</h2>
      <PythonTerminal code={pythonCode} />


      <h3 className="font-serif text-xl text-pink-500 mt-[2.5rem] mb-[2.5rem]">What&apos;s Happening Here?</h3>
      <p className="text-[#590D22] leading-[2.5rem] mb-[2.5rem]">
        We&apos;re using <strong>sklearn&apos;s LinearRegression</strong> class (she&apos;s THAT girl). The <code className="bg-pink-100 px-2 py-1 rounded text-sm">.fit()</code> method does all the heavy lifting—finding the perfect slope and intercept. Then <code className="bg-pink-100 px-2 py-1 rounded text-sm">.predict()</code> uses that formula to guess outcomes.
      </p>
      <p className="text-[#590D22] leading-[2.5rem] mb-[2.5rem]">
        The <strong>R² Score</strong> (R-squared) tells you how well your line fits. If it&apos;s 1.0, you found the EXACT pattern. If it&apos;s 0.0, your model is useless (giving &quot;he&apos;s just not that into you&quot; energy). Anything above 0.7 is considered solid.
      </p>

      {/* 💅 Mini-Project */}
      <div className="bg-gradient-to-br from-pink-50 to-white p-8 rounded-2xl border-2 border-pink-100 shadow-sm">
        <h2 className="font-serif text-2xl text-pink-600 !-mt-[5rem] mb-[2.5rem]">💅 Mini-Project: &quot;The Latte Factor&quot;</h2>
        <p className="text-[#590D22] leading-[2.5rem] mb-[2.5rem]">
          <strong>Your Mission:</strong> Track how much money you spend on coffee each week and predict your monthly spending.
        </p>
        <p className="text-[#590D22] leading-[2.5rem] mb-[2.5rem]">
          <strong>Dataset:</strong> <a href="https://www.kaggle.com/datasets/anjaliisharmaa/the-latte-factor" target="_blank" rel="noreferrer" className="text-pink-600 hover:text-pink-800 underline">The Latte Factor on Kaggle</a> (10 weeks of coffee purchases)
        </p>
        <p className="text-[#590D22] leading-[2.5rem] mb-[2.5rem]">
          <strong>Goal:</strong> Build a linear regression model and answer:
        </p>
        <ol className="text-[#590D22] leading-[2.5rem] mb-[2.5rem]">
          <li className="leading-[2.5rem]">What&apos;s your predicted spending if you buy 15 cups next week?</li>
          <li className="leading-[2.5rem]">What&apos;s the slope? (How much does each cup increase your spending?)</li>
          <li className="leading-[2.5rem]">Plot it and make it CUTE (pink theme mandatory 💕)</li>
        </ol>
        <p className="text-[#590D22] leading-[2.5rem] mb-0">
          <strong>Deliverable:</strong> A Python script + one aesthetic plot. Bonus points if you realize you need to cut back and make better financial decisions ✨
        </p>
      </div>
    </>
  );
}