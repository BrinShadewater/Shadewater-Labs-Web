import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { stats } from '../content/home';
import { discordInfo } from '../content/community';
import { socialLinks } from '../content/links';

const reachStats = [
  {
    value: stats.followers,
    label: 'Followers',
    detail: 'Cross-platform audience',
    suffix: '+',
  },
  {
    value: stats.hoursWatched,
    label: 'Hours Watched',
    detail: 'Deep viewing engagement',
  },
  {
    value: stats.hoursStreamed,
    label: 'Hours Streamed',
    detail: 'Consistent time on air',
  },
  {
    value: 250,
    label: 'Discord Members',
    detail: 'Active community hub',
    suffix: '+',
  },
];

const specializations = [
  {
    title: 'Live Streaming',
    description: 'Late-night streams that blend games, film talk, tech curiosity, and genuine conversation.',
  },
  {
    title: 'Reviews & Essays',
    description: 'Thoughtful coverage of games, movies, television, products, and emerging technology.',
  },
  {
    title: 'Creative Projects',
    description: 'A filmmaker’s perspective that brings narrative taste, production value, and strong opinions.',
  },
  {
    title: 'Community Energy',
    description: 'A cozy, smart audience that shows up for thoughtful discussion as much as entertainment.',
  },
];

const audienceProfile = [
  {
    title: 'Curious Generalists',
    description: 'People who move easily between games, film, tech, and internet culture rather than staying in one lane.',
  },
  {
    title: 'High-Trust Regulars',
    description: 'An engaged returning audience that values authenticity, taste, and long-form conversation.',
  },
  {
    title: 'Creative & Tech-Minded',
    description: 'Viewers drawn to storytelling, production craft, future-facing tools, and strange side quests.',
  },
];

const opportunities = [
  {
    number: '01',
    title: 'Sponsored Streams',
    description: 'Natural, personality-driven live integrations with room for genuine reactions and audience interaction.',
  },
  {
    number: '02',
    title: 'Product Reviews',
    description: 'Candid coverage of gear, tools, software, and products that fit the audience’s interests.',
  },
  {
    number: '03',
    title: 'Brand Partnerships',
    description: 'Multi-touch campaigns spanning live mentions, social support, community activations, and editorial coverage.',
  },
  {
    number: '04',
    title: 'Custom Creative',
    description: 'Campaign concepts shaped around Brin’s voice, taste, and the specific story a brand wants to tell.',
  },
];

const creatorPrograms = [
  { name: 'Fellowship of the Furies', image: '/fellowship-of-the-furies-creator-program.webp', width: 300, height: 300 },
  { name: 'Fulqrum Publishing', image: '/fulqrum-publishing-creator-program.webp', width: 350, height: 300 },
  { name: 'THQ Nordic', image: '/thqnordic-creator-program.webp', width: 384, height: 384 },
  { name: 'E.I.F Creator Program', image: '/eif-creator-program.webp', width: 128, height: 128 },
  { name: 'Dungeonborne', image: '/dungeonborne-creator-program.webp', width: 384, height: 384 },
  { name: 'Enshrouded', image: '/enshrouded-creator-program.webp', width: 384, height: 329 },
  { name: 'Expedition 33', image: '/expedition33-creator-program.webp', width: 384, height: 333 },
  { name: 'inZOI', image: '/inzoi-creator-program.webp', width: 640, height: 480 },
  { name: 'Once Human', image: '/once-human-creator-program.webp', width: 384, height: 384 },
  { name: 'Pax Dei', image: '/paxdei-creator-program.webp', width: 350, height: 300 },
  { name: 'Return to Moria', image: '/return-to-moria-creator-program.webp', width: 350, height: 300 },
  { name: 'Solasta II', image: '/solasta2-creator-program.webp', width: 244, height: 216 },
];

const brandFits = [
  'Games and games-adjacent products',
  'Film, TV, and entertainment campaigns',
  'Creative technology and AI tools',
  'Consumer tech, lifestyle, and internet-native brands',
];

const HERO_ILLUSTRATION_ALT = 'Illustration of Brin Shadewater and Margot gaming together';
const HERO_ILLUSTRATION_SRCSET =
  '/hero-illustration-640w.webp 640w, /hero-illustration-960w.webp 960w, /hero-illustration-1200w.webp 1200w, /hero-illustration.webp 1574w';
const HERO_ILLUSTRATION_SIZES = '(min-width: 640px) 360px, 300px';

function SocialIcon({ platform }: { platform: string }) {
  switch (platform) {
    case 'twitch':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-5 w-5">
          <path d="M5 3 3 8v11h4v3l3-3h4l7-7V3H5Zm14 8-4 4h-4l-3 3v-3H5V5h14v6Zm-8-1h2V7h-2v3Zm5 0h2V7h-2v3Z" />
        </svg>
      );
    case 'youtube':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-5 w-5">
          <path d="M21.8 8.2a2.9 2.9 0 0 0-2-2.1C18 5.6 12 5.6 12 5.6s-6 0-7.8.5a2.9 2.9 0 0 0-2 2.1A30.7 30.7 0 0 0 1.7 12c0 1.3.2 2.6.5 3.8a2.9 2.9 0 0 0 2 2.1c1.8.5 7.8.5 7.8.5s6 0 7.8-.5a2.9 2.9 0 0 0 2-2.1c.3-1.2.5-2.5.5-3.8s-.2-2.6-.5-3.8ZM10 15.3V8.7l5.7 3.3-5.7 3.3Z" />
        </svg>
      );
    case 'discord':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-5 w-5">
          <path d="M20.3 5.4A16.7 16.7 0 0 0 16.2 4l-.2.4a11.5 11.5 0 0 1 3.4 1.7c-3.3-1.5-7-1.5-10.3 0a11.5 11.5 0 0 1 3.4-1.7l-.2-.4a16.7 16.7 0 0 0-4.1 1.4C5.7 8.9 4.4 12.3 4.8 15.6a16.9 16.9 0 0 0 5 2.5l1.2-1.7c-.7-.2-1.4-.5-2.1-.9l.5-.4c1.9.9 4.1.9 6 0l.5.4c-.7.4-1.4.7-2.1.9l1.2 1.7a16.9 16.9 0 0 0 5-2.5c.5-3.8-.8-7.2-3.7-10.2ZM9.8 13.6c-.8 0-1.4-.7-1.4-1.6 0-.9.6-1.6 1.4-1.6.8 0 1.4.7 1.4 1.6 0 .9-.6 1.6-1.4 1.6Zm4.4 0c-.8 0-1.4-.7-1.4-1.6 0-.9.6-1.6 1.4-1.6.8 0 1.4.7 1.4 1.6 0 .9-.6 1.6-1.4 1.6Z" />
        </svg>
      );
    case 'twitter':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-5 w-5">
          <path d="M18.9 2H22l-6.8 7.8L23 22h-6.1l-4.8-6.3L6.6 22H3.5l7.3-8.4L1 2h6.3L11.7 8 18.9 2Zm-1.1 18h1.7L6.4 3.9H4.6L17.8 20Z" />
        </svg>
      );
    case 'instagram':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-5 w-5">
          <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2.2A2.8 2.8 0 0 0 4.2 7v10A2.8 2.8 0 0 0 7 19.8h10a2.8 2.8 0 0 0 2.8-2.8V7A2.8 2.8 0 0 0 17 4.2H7Zm10.5 1.7a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2.2a2.8 2.8 0 1 0 0 5.6 2.8 2.8 0 0 0 0-5.6Z" />
        </svg>
      );
    case 'letterboxd':
      return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-5 w-5">
          <circle cx="6" cy="12" r="3.25" fill="currentColor" opacity="0.8" />
          <circle cx="12" cy="12" r="3.25" fill="currentColor" />
          <circle cx="18" cy="12" r="3.25" fill="currentColor" opacity="0.6" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-5 w-5">
          <path
            d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm-6.4-8.5h12.8M12 3.3c2.1 2.2 3.3 5.2 3.3 8.7S14.1 18.5 12 20.7M12 3.3C9.9 5.5 8.7 8.5 8.7 12s1.2 6.5 3.3 8.7"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
  }
}

interface SponsorAnimatedStatProps {
  value: number;
  label: string;
  detail: string;
  suffix?: string;
}

function SponsorAnimatedStat({ value, label, detail, suffix = '' }: SponsorAnimatedStatProps) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observedNode = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.35 }
    );

    if (observedNode) {
      observer.observe(observedNode);
    }

    return () => {
      if (observedNode) {
        observer.unobserve(observedNode);
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2200;
    const startTime = Date.now();

    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutCubic(progress);

      setCount(Math.floor(value * easedProgress));

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(value);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, value]);

  const formattedValue = count >= 1000 ? `${(count / 1000).toFixed(1)}K` : count.toLocaleString();

  return (
    <div
      ref={ref}
      className="rounded-[1.75rem] border-2 border-white/10 bg-[hsl(220_20%_13%/0.92)] p-6 shadow-[0_14px_36px_hsl(210_66%_3%/0.2)]"
    >
      <p className="text-4xl font-bold text-white">
        {formattedValue}
        {suffix}
      </p>
      <p className="mt-3 text-lg font-semibold text-[hsl(var(--sandstone-soft))]">{label}</p>
      <p className="mt-2 text-sm text-foreground/60">{detail}</p>
    </div>
  );
}

export default function SponsorDeck() {
  return (
    <div className="mx-auto max-w-7xl px-4 pb-12 pt-6 sm:px-6 lg:px-8">
      <section className="rounded-[2.25rem] border-2 border-white/10 bg-[linear-gradient(135deg,hsl(192_29%_19%),hsl(220_22%_11%),hsl(210_32%_12%))] px-6 py-10 shadow-[0_22px_50px_hsl(210_66%_3%/0.32)] sm:px-10 sm:py-12">
        <div className="grid gap-10 lg:grid-cols-[0.72fr_1fr] lg:items-center">
          <div className="mx-auto max-w-md">
            <div className="overflow-hidden rounded-[2rem] border-2 border-white/10 bg-[hsl(220_20%_13%/0.88)] shadow-[0_20px_44px_hsl(210_66%_3%/0.28)]">
              <img
                src="/alex-image.webp"
                width={1200}
                height={1200}
                alt="Brin Shadewater portrait"
                loading="eager"
                decoding="async"
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          <div className="text-center lg:text-left">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.38em] text-[hsl(var(--sandstone-soft))]/85">
              Sponsor Deck
            </p>
            <h1 className="mb-4 text-5xl font-bold text-white md:text-6xl">Partner With Brin Shadewater</h1>
            <p className="max-w-3xl text-lg font-semibold text-[hsl(var(--sandstone-soft))] md:text-2xl">
              A cinematic, community-first creator covering games, film, television, tech, products, and the strange corners in between.
            </p>
          </div>
        </div>
      </section>

      <section className="pt-20 pb-22">
        <div className="mb-10 text-center">
          <h2 className="text-4xl font-bold text-white">About Brin 🎬</h2>
          <p className="mt-3 text-base font-semibold uppercase tracking-[0.28em] text-[hsl(var(--sandstone-soft))]/80">
            Voice, Tone, Perspective
          </p>
        </div>

        <div className="mx-auto max-w-4xl rounded-[2rem] border-2 border-[hsl(var(--sandstone)/0.35)] bg-[hsl(220_20%_13%/0.9)] p-8 shadow-[0_18px_45px_hsl(210_66%_3%/0.22)] backdrop-blur-sm md:p-10">
          <p className="text-lg leading-9 text-foreground/78 md:text-xl">
            Brin Shadewater brings a rare mix of thoughtful criticism, late-night streamer energy, and filmmaker instinct. The content is
            rooted in taste and curiosity, whether the topic is a game release, a new piece of tech, an AI workflow, or a film worth
            obsessing over. Partnerships work best here when they feel aligned, conversational, and genuinely interesting to the audience.
          </p>
        </div>

        <div className="mt-16 mb-8 flex flex-wrap justify-center gap-x-14 gap-y-12">
          <div className="movie-pill-callout movie-pill-callout--mirrored relative mb-24 inline-flex sm:mb-28">
            <Button
              variant="hero-outline"
              size="lg"
              className="relative z-10 border-[hsl(188_42%_22%)] bg-[hsl(188_42%_16%)] px-9 text-[hsl(185_55%_90%)] shadow-[0_0_18px_hsl(188_42%_22%/0.22)] hover:border-[hsl(188_42%_28%)] hover:bg-[hsl(188_42%_20%)] hover:text-white"
              onClick={() => {
                window.location.hash = '#/home';
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              Alex Yesilcimen
            </Button>

            <div
              className="movie-pill-callout__annotation movie-pill-callout__annotation--mirrored pointer-events-none absolute left-0 top-full z-0 w-[14rem] max-w-[78vw] -translate-x-[3.6rem] pt-1 sm:w-[15.5rem] sm:-translate-x-[4.4rem]"
              aria-hidden="true"
            >
              <svg
                className="movie-pill-callout__arrow movie-pill-callout__arrow--mirrored h-[6.6rem] w-full overflow-visible"
                viewBox="0 0 240 120"
                fill="none"
              >
                <path
                  className="movie-pill-callout__path"
                  d="M166 104 C 124 104, 92 97, 74 78 C 58 60, 58 36, 74 18"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  className="movie-pill-callout__head"
                  d="M58 29 L74 18 L90 27"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <p className="movie-pill-callout__label movie-pill-callout__label--mirrored font-display -mt-4 text-[1.51rem] font-black italic tracking-[0.02em] sm:text-[1.61rem]">
                Brin&apos;s Personal Website
              </p>
            </div>
          </div>

          <div className="movie-pill-callout relative mb-24 inline-flex sm:mb-28">
            <Button
              variant="hero-outline"
              size="lg"
              className="relative z-10 border-[hsl(356_18%_28%)] bg-[hsl(356_18%_20%)] px-10 text-[1.02rem] text-[hsl(12_20%_90%)] shadow-[0_0_18px_hsl(356_18%_28%/0.2)] hover:border-[hsl(356_18%_34%)] hover:bg-[hsl(356_18%_24%)] hover:text-white"
              onClick={() => window.open('https://strangeharvestmovie.com', '_blank', 'noopener,noreferrer')}
            >
              Strange Harvest
            </Button>

            <div
              className="movie-pill-callout__annotation pointer-events-none absolute right-0 top-full z-0 w-[14rem] max-w-[78vw] translate-x-[2.2rem] pt-1 sm:w-[15.5rem] sm:translate-x-[2.8rem]"
              aria-hidden="true"
            >
              <svg
                className="movie-pill-callout__arrow h-[6.6rem] w-full overflow-visible"
                viewBox="0 0 240 120"
                fill="none"
              >
                <path
                  className="movie-pill-callout__path"
                  d="M166 104 C 124 104, 92 97, 74 78 C 58 60, 58 36, 74 18"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  className="movie-pill-callout__head"
                  d="M58 29 L74 18 L90 27"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <p className="movie-pill-callout__label font-display -mt-4 text-[1.51rem] font-black italic tracking-[0.02em] sm:text-[1.61rem]">
                The movie I produced!
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="pt-0 pb-14">
        <div className="mb-10 text-center">
          <h2 className="text-4xl font-bold text-white">Audience Reach 🚀</h2>
          <p className="mt-3 text-base font-semibold uppercase tracking-[0.28em] text-[hsl(var(--sandstone-soft))]/80">
            Built Through Consistency
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {reachStats.map((item) => (
            <SponsorAnimatedStat
              key={item.label}
              value={item.value}
              label={item.label}
              detail={item.detail}
              suffix={item.suffix}
            />
          ))}
        </div>
      </section>

      <section className="pb-16">
        <div className="rounded-[2rem] border-2 border-white/10 bg-[linear-gradient(135deg,hsl(220_22%_11%/0.94),hsl(192_26%_16%/0.92),hsl(220_18%_12%/0.96))] px-6 py-8 shadow-[0_20px_46px_hsl(210_66%_3%/0.24)] sm:px-8">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">Find Brin Across the Internet 🌐</h2>
            <p className="mt-3 text-base font-semibold uppercase tracking-[0.28em] text-[hsl(var(--sandstone-soft))]/80">
              Platforms, Community, Conversation
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {socialLinks.map((link) => (
              <a
                key={link.platform}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 rounded-[1.5rem] border border-white/10 bg-[hsl(220_20%_13%/0.82)] px-5 py-4 transition-all duration-300 hover:-translate-y-1 hover:border-[hsl(var(--sandstone)/0.45)] hover:bg-[hsl(220_20%_15%/0.96)]"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-[hsl(188_42%_16%)] text-[hsl(185_55%_90%)] shadow-[0_10px_20px_hsl(188_42%_10%/0.28)]">
                  <SocialIcon platform={link.platform} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-lg font-semibold text-white transition-colors group-hover:text-[hsl(var(--sandstone-soft))]">{link.name}</p>
                  <p className="text-sm text-foreground/68">{link.description}</p>
                </div>
                <svg className="h-5 w-5 shrink-0 text-foreground/45 transition-colors group-hover:text-white" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M7 17 17 7M9 7h8v8"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="rounded-[2.25rem] border-2 border-white/10 bg-[hsl(220_12%_10%/0.96)] px-6 py-10 shadow-[0_20px_48px_hsl(210_66%_3%/0.26)] sm:px-8 md:px-10">
          <div className="mb-20">
            <div className="mb-10 text-center">
              <h2 className="text-4xl font-bold text-white">Content Specialization 🎯</h2>
              <p className="mt-3 text-base font-semibold uppercase tracking-[0.28em] text-[hsl(var(--sandstone-soft))]/80">
                What Brin Brings
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {specializations.map((item) => (
                <div
                  key={item.title}
                  className="rounded-[1.75rem] border-2 border-white/10 bg-[hsl(220_20%_13%/0.92)] p-6 shadow-[0_14px_36px_hsl(210_66%_3%/0.2)]"
                >
                  <h3 className="text-2xl font-semibold text-white">{item.title}</h3>
                  <p className="mt-3 text-foreground/68">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-20">
            <div className="mb-10 text-center">
              <h2 className="text-4xl font-bold text-white">Audience Profile 👥</h2>
              <p className="mt-3 text-base font-semibold uppercase tracking-[0.28em] text-[hsl(var(--sandstone-soft))]/80">
                Who This Resonates With
              </p>
            </div>

            <div className="grid gap-5 lg:grid-cols-3">
              {audienceProfile.map((item) => (
                <div
                  key={item.title}
                  className="rounded-[1.75rem] border-2 border-[hsl(var(--sandstone)/0.4)] bg-[hsl(220_20%_13%/0.9)] p-6 shadow-[0_14px_36px_hsl(210_66%_3%/0.2)]"
                >
                  <h3 className="text-2xl font-semibold text-[hsl(var(--sandstone-soft))]">{item.title}</h3>
                  <p className="mt-3 text-foreground/68">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-10 text-center">
              <h2 className="text-4xl font-bold text-white">Partnership Opportunities 🤝</h2>
              <p className="mt-3 text-base font-semibold uppercase tracking-[0.28em] text-[hsl(var(--sandstone-soft))]/80">
                Ways To Collaborate
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {opportunities.map((item) => (
                <div
                  key={item.number}
                  className="rounded-[1.75rem] border-2 border-white/10 bg-[hsl(220_20%_13%/0.92)] p-6 shadow-[0_14px_36px_hsl(210_66%_3%/0.2)]"
                >
                  <p className="text-4xl font-bold text-[hsl(var(--sandstone-soft))]/35">{item.number}</p>
                  <h3 className="mt-6 text-2xl font-semibold text-white">{item.title}</h3>
                  <p className="mt-3 text-foreground/68">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="mb-10 flex justify-center">
          <img
            src="/hero-illustration.webp"
            srcSet={HERO_ILLUSTRATION_SRCSET}
            sizes={HERO_ILLUSTRATION_SIZES}
            width={1574}
            height={1200}
            alt={HERO_ILLUSTRATION_ALT}
            loading="lazy"
            decoding="async"
            className="h-auto w-full max-w-[300px] sm:max-w-[360px]"
          />
        </div>

        <div className="mb-10 text-center">
          <h2 className="text-4xl font-bold text-white">Official Creator Programs 🏛️</h2>
          <p className="mt-3 text-base font-semibold uppercase tracking-[0.28em] text-[hsl(var(--sandstone-soft))]/80">
            CURRENT &amp; PAST TRUSTED INDUSTRY RELATIONSHIPS
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {creatorPrograms.map((program) => (
            <div
              key={program.name}
              className="group rounded-[1.75rem] border-2 border-white/10 bg-[hsl(220_20%_13%/0.92)] p-6 shadow-[0_14px_36px_hsl(210_66%_3%/0.2)] transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="flex min-h-[8.5rem] items-center justify-center rounded-[1.25rem] border border-white/10 bg-[linear-gradient(180deg,hsl(220_22%_11%),hsl(210_18%_9%))] p-5">
                <img
                  src={program.image}
                  width={program.width}
                  height={program.height}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="max-h-24 w-auto max-w-full object-contain drop-shadow-[0_10px_18px_hsl(210_66%_3%/0.28)]"
                />
              </div>
              <p className="mt-5 text-center text-lg font-semibold text-[hsl(var(--sandstone-soft))] transition-colors group-hover:text-white">
                {program.name}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="pb-20">
        <div className="mb-8 flex justify-center">
          <img
            src="/margot-spinning-gif-transparent.webp"
            width={220}
            height={220}
            alt="Spinning Margot"
            loading="lazy"
            decoding="async"
            className="h-auto w-full max-w-[190px] sm:max-w-[235px]"
          />
        </div>

        <div className="rounded-[2.25rem] border-2 border-white/10 bg-[linear-gradient(135deg,hsl(220_22%_11%),hsl(192_29%_18%),hsl(34_26%_26%))] px-6 py-14 shadow-[0_22px_50px_hsl(210_66%_3%/0.3)] sm:px-10">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-4xl font-bold text-white md:text-5xl">Let&apos;s Work Together ✉️</h2>
            <p className="mx-auto mt-4 max-w-3xl text-lg text-[hsl(var(--sandstone-soft))]">
              Best fit partnerships are thoughtful, on-brand, and built for long-term trust with the audience.
            </p>
            <div className="mx-auto mt-8 max-w-2xl rounded-[1.5rem] border-2 border-[hsl(var(--sandstone)/0.28)] bg-[hsl(220_20%_13%/0.75)] p-6 text-left">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[hsl(var(--sandstone-soft))]/80">
                Ideal Brand Fits
              </p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {brandFits.map((fit) => (
                  <div key={fit} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-foreground/78">
                    {fit}
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button
                variant="hero"
                className="min-w-[12rem]"
                onClick={() => {
                  window.location.href = 'mailto:Brinshadewater@gmail.com';
                }}
              >
                Contact via Email
              </Button>
              <Button
                variant="hero-outline"
                className="min-w-[12rem] border-[hsl(var(--sandstone)/0.45)] bg-[hsl(220_20%_13%/0.8)] text-[hsl(var(--sandstone-soft))] hover:border-[hsl(var(--sandstone-soft))] hover:bg-[hsl(var(--sandstone)/0.14)] hover:text-white"
                onClick={() => window.open(discordInfo.inviteUrl, '_blank', 'noopener,noreferrer')}
              >
                Join Discord
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
