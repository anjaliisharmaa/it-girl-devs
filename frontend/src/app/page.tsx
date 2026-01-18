export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section - Temporary placeholder to see navbar scroll effect */}
      <section className="h-screen bg-gradient-to-br from-it-girl-pink via-it-girl-cream to-white flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="font-syne font-extrabold text-6xl md:text-8xl text-it-girl-maroon">
            it-girl devs
          </h1>
          <p className="font-outfit font-extrabold text-xl md:text-2xl text-it-girl-maroon/70">
            minimizing loss, maximizing gloss! 🎀
          </p>
          <p className="font-outfit text-lg text-it-girl-maroon/60">
            You spotting bad vibes is actually Anomaly Detection. We just teach you the code for it. Turn your gut feeling into a high performance algorithm. ✨
          </p>
        </div>
      </section>

      {/* Extra content to enable scrolling */}
      <section className="h-screen bg-it-girl-cream flex items-center justify-center">
        <div className="text-center">
          <h2 className="font-syne font-bold text-4xl text-it-girl-maroon">
            Notice the navbar? 👀
          </h2>
          <p className="font-outfit text-lg text-it-girl-maroon/70 mt-4">
            It has that frosted glass effect!
          </p>
        </div>
      </section>
    </main>
  );
}
