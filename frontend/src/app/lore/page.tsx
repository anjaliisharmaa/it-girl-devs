'use client';

import Image from 'next/image';
import Link from 'next/link';
import Footer from '@/components/layout/Footer';

interface SocialLink {
  title: string;
  emoji: string;
  description: string;
  url?: string;
}

const socialLinks: SocialLink[] = [
  {
    title: 'Instagram',
    emoji: '📸',
    description: 'This is where the vibes happen. I share reels, life updates, and maybe even some behind-the-scenes of me stressing over code. It is the best place to keep in loop with what I am building.',
    url: 'https://www.instagram.com/itgirldevs/',
  },
  {
    title: 'YouTube',
    emoji: '🎬',
    description: 'The big screen! I am posting everything from detailed tech tutorials to art vlogs. I might even take you with me to tech events so we can experience them together.',
    url: '#',
  },
  {
    title: 'Twitter / X',
    emoji: '🗣️',
    description: 'My unhinged diary. Come here for random rants, relatable coding struggles, and just pure chaos.',
    url: 'https://x.com/itgirldevs',
  },
  {
    title: 'The Group Chat (WhatsApp)',
    emoji: '💬',
    description: 'This is for the inner circle. Especially if you are from IGDTUW, this is where we help each other debug, plan projects, and just hype each other up.',
    url: '#',
  },
  {
    title: 'LinkedIn',
    emoji: '💼',
    description: 'The professional side, but still with a girly twist. I share official updates and career wins here.',
    url: '#',
  },
  {
    title: 'The Newsletter',
    emoji: '💌',
    description: 'This is the exclusive club. I send out the really good stuff here, like cold emailing templates, secret resources, and things I do not share anywhere else.',
    url: '#',
  },
];

export default function LorePage() {
  return (
    <div className="min-h-screen bg-[#FFD1DC] text-[#590D22] pt-32 px-4">
      <article className="max-w-3xl mx-auto">
        {/* Main Title */}
        <h1 className="font-fraunces text-4xl md:text-5xl font-bold text-center mb-12">
          The Girl Behind The Screen
        </h1>

        {/* Profile Picture - Sticker Style */}
        <div className="flex justify-center mb-12">
          <div className="relative w-48 h-48 md:w-56 md:h-56">
            <Image
              src="/images/lore/picture.png"
              alt="Anjali - It-Girl Devs"
              fill
              className="rounded-full border-4 border-[#590D22] shadow-xl object-cover"
              priority
            />
          </div>
        </div>

        {/* Body Content */}
        <div className="font-outfit space-y-4 text-lg leading-relaxed">
          {/* Introduction */}
          <p className="text-justify">
            Hi bestie! I'm Anjali, but you can call me Anjo. 🎀
          </p>

          <p className="text-justify">
            If you are wondering who is writing all these pink tutorials and turning Python into an aesthetic, it is me. 
            I am a third-year CSE-AI student at IGDTUW, but honestly, I am just a girl who loves building cool things.
          </p>

          <p className="text-justify">
            For a long time, I thought I had to choose. I thought I could either be the "creative art girl" who spends 
            hours sketching and digital painting, or the "serious tech girl" who builds AI models. But then I realized... 
            why not both?
          </p>

          <p className="text-justify">
            That is actually how this whole platform started. I literally drew the It-Girl Devs logo myself on my tablet 
            while sipping my third coffee of the day (yes, I survive entirely on caffeine). I realized that coding is just 
            another form of art. Instead of paintbrushes, we use syntax. Instead of a canvas, we use an IDE.
          </p>

          {/* The Serious Stuff Section */}
          <h2 className="font-fraunces text-3xl md:text-4xl font-bold mt-16 mb-6">
            The Serious Stuff (But Make It Cute)
          </h2>

          <p className="text-justify">
            Okay, I know everything here looks pink and sparkly, but I promise I know my stuff! 👩‍💻
          </p>

          <p className="text-justify">
            When I am not listening to Jade Thirlwall's solo music on repeat, I am actually deep into AI research. 
            I recently interned at DRDO, where I built SHAKTI-AI, a system designed to help women scientist access health 
            and legal info easily. It was such a special project for me because I have always wanted to use tech to help 
            other women. I stood in front of a room full of women scientists and presented my work, which was terrifying 
            but also kind of a power move. 💅
          </p>

          <p className="text-justify">
            I also published a research paper on Deepfake Detection (yep, the scary AI stuff) at an international conference. 
            Wanna read?{' '}
            <Link 
              href="#" 
              className="text-[#590D22] font-bold underline decoration-2 hover:decoration-4 transition-all"
            >
              Here
            </Link>
          </p>

          {/* Why I Built This Section */}
          <h2 className="font-fraunces text-3xl md:text-4xl font-bold mt-16 mb-6">
            Why I Built This
          </h2>

          <p className="text-justify">
            I started It-Girl Devs because I was tired of the gatekeeping. Tech can feel so intimidating, especially when 
            you are the only girl in the room or when tutorials feel like they are written by robots.
          </p>

          <p className="text-justify">
            I wanted to create a space where we can be smart and cute. Where we can talk about Neural Networks and nail art 
            in the same sentence. This isn't about me teaching you from a pedestal; it is about us growing together. I am 
            still learning every day, and I want to take you along for the ride.
          </p>

          {/* Where To Find Me Section */}
          <h2 className="font-fraunces text-3xl md:text-4xl font-bold mt-16 mb-6">
            Where To Find Me 🗺️
          </h2>

          <p className="text-justify mb-8">
            I am basically living on the internet, so here is where you can come say hi:
          </p>

          {/* Social Links Cards */}
          <div className="space-y-6">
            {socialLinks.map((social, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                {social.url && social.url !== '#' ? (
                  <Link href={social.url} target="_blank" rel="noopener noreferrer">
                    <h3 className="font-fraunces text-2xl font-bold mb-3 hover:underline">
                      {social.title} {social.emoji}
                    </h3>
                  </Link>
                ) : (
                  <h3 className="font-fraunces text-2xl font-bold mb-3">
                    {social.title} {social.emoji}
                  </h3>
                )}
                <p className="text-[#590D22] opacity-90">
                  {social.description}
                </p>
              </div>
            ))}
          </div>

          {/* Say Hello Section */}
          <h2 className="font-fraunces text-3xl md:text-4xl font-bold mt-16 mb-6">
            Say Hello 👋
          </h2>

          <p className="text-justify">
            Seriously, my email is always open. Whether you are stuck on a bug, want career advice, or just want to talk 
            about Little Mix, drop me a message at{' '}
            <Link 
              href="mailto:itgirldevs@gmail.com"
              className="text-[#590D22] font-bold underline decoration-2 hover:decoration-4 transition-all"
            >
              itgirldevs@gmail.com
            </Link>
            .
          </p>

          <p className="text-justify">
            I reply to everyone because you are the reason I am doing this.
          </p>

          {/* Signature */}
          <div className="mt-16 text-center">
            <p className="text-2xl">
              <span className="italic font-light tracking-wide">
                Love, Anjo 💖
              </span>
            </p>
          </div>
        </div>
      </article>
      <Footer />
    </div>
  );
}
