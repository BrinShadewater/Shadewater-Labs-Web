import { useState } from 'react';
import LiveStatusBadge from '../components/LiveStatusBadge';
import AnimatedStat from '../components/AnimatedStat';
import { Button } from '@/components/ui/button';
import { featuredNoteIds, featuredProjectSlugs, stats, liveStatus } from '../content/home';
import { noteAuthorThemes, notes, type NoteHeroImage } from '../content/notes';
import { streamAbout, streamSchedule } from '../content/stream';
import { socialLinks } from '../content/links';
import { projectStatuses } from '../content/projects';

interface HomeProps {
  onNavigate: (page: string, noteId?: string) => void;
}

const categoryEmoji: Record<string, string> = {
  Games: '🎮',
  Movies: '🎬',
  TV: '📺',
  Tech: '✨',
};

const streamVibes = [
  {
    title: 'Thoughtful Discussion',
    description:
      'Chat can jump from memes to genuine media analysis surprisingly fast. We welcome different perspectives and keep conversations curious, respectful, and (mostly) appropriate.',
  },
  {
    title: 'A Future-Oriented Community',
    description:
      'A lot of people here love building things — films, games, technology, art, and strange creative projects. The stream tends to attract curious minds who enjoy thinking about where things are going next.',
  },
  {
    title: 'Curious People Welcome',
    description:
      "This community is full of people who like learning new things, asking questions, and exploring ideas. Whether it's games, filmmaking, technology, or something completely unexpected, curiosity is always encouraged.",
  },
  {
    title: 'Film Nights & Trailer Reactions',
    description:
      'We host occasional watch parties on Discord and react to new trailers on stream. Expect spontaneous breakdowns of cinematography, storytelling choices, and the occasional film industry tangent.',
  },
  {
    title: 'Deep Rabbit Holes',
    description:
      'Sometimes the conversation veers into fascinating territory. One minute we’re discussing a game mechanic, the next we’re exploring robotics, longevity science, or why Bryan Johnson is experimenting with extreme anti-aging routines.',
  },
  {
    title: 'Margot Sightings',
    description:
      'An underrated but very real feature of the experience. My cat daughter Margot occasionally appears on stream to supervise operations and judge everyone silently.',
  },
];

const HERO_ILLUSTRATION_ALT = 'Illustration of Brin Shadewater and Margot gaming together';
const HERO_ILLUSTRATION_SRCSET =
  '/hero-illustration-640w.webp 640w, /hero-illustration-960w.webp 960w, /hero-illustration-1200w.webp 1200w, /hero-illustration.webp 1574w';
const HERO_ILLUSTRATION_SIZES = '(min-width: 1024px) 38rem, (min-width: 640px) 32rem, 100vw';

type HomeFeedMode = 'latest' | 'featured';

interface HomeFeedItem {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  publishedAt: number;
  category: string;
  typeLabel: string;
  author: 'Brin' | 'Teegly' | 'Krusher' | 'Crafty';
  kind: 'note' | 'project';
  featured: boolean;
  heroImage?: NoteHeroImage;
  projectLogo?: {
    src: string;
    srcSet?: string;
    sizes?: string;
    width: number;
    height: number;
  };
  projectGlow?: string;
  projectLogoWrapperClass?: string;
  projectLogoClass?: string;
  onClick: () => void;
}

function parsePublishedAt(value: string) {
  const parsed = Date.parse(value);
  return Number.isNaN(parsed) ? 0 : parsed;
}

function SocialIcon({ platform }: { platform: string }) {
  switch (platform) {
    case 'twitch':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-4 w-4">
          <path d="M5 3 3 8v11h4v3l3-3h4l7-7V3H5Zm14 8-4 4h-4l-3 3v-3H5V5h14v6Zm-8-1h2V7h-2v3Zm5 0h2V7h-2v3Z" />
        </svg>
      );
    case 'youtube':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-4 w-4">
          <path d="M21.8 8.2a2.9 2.9 0 0 0-2-2.1C18 5.6 12 5.6 12 5.6s-6 0-7.8.5a2.9 2.9 0 0 0-2 2.1A30.7 30.7 0 0 0 1.7 12c0 1.3.2 2.6.5 3.8a2.9 2.9 0 0 0 2 2.1c1.8.5 7.8.5 7.8.5s6 0 7.8-.5a2.9 2.9 0 0 0 2-2.1c.3-1.2.5-2.5.5-3.8s-.2-2.6-.5-3.8ZM10 15.3V8.7l5.7 3.3-5.7 3.3Z" />
        </svg>
      );
    case 'discord':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-4 w-4">
          <path d="M20.3 5.4A16.7 16.7 0 0 0 16.2 4l-.2.4a11.5 11.5 0 0 1 3.4 1.7c-3.3-1.5-7-1.5-10.3 0a11.5 11.5 0 0 1 3.4-1.7l-.2-.4a16.7 16.7 0 0 0-4.1 1.4C5.7 8.9 4.4 12.3 4.8 15.6a16.9 16.9 0 0 0 5 2.5l1.2-1.7c-.7-.2-1.4-.5-2.1-.9l.5-.4c1.9.9 4.1.9 6 0l.5.4c-.7.4-1.4.7-2.1.9l1.2 1.7a16.9 16.9 0 0 0 5-2.5c.5-3.8-.8-7.2-3.7-10.2ZM9.8 13.6c-.8 0-1.4-.7-1.4-1.6 0-.9.6-1.6 1.4-1.6.8 0 1.4.7 1.4 1.6 0 .9-.6 1.6-1.4 1.6Zm4.4 0c-.8 0-1.4-.7-1.4-1.6 0-.9.6-1.6 1.4-1.6.8 0 1.4.7 1.4 1.6 0 .9-.6 1.6-1.4 1.6Z" />
        </svg>
      );
    case 'twitter':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-4 w-4">
          <path d="M18.9 2H22l-6.8 7.8L23 22h-6.1l-4.8-6.3L6.6 22H3.5l7.3-8.4L1 2h6.3L11.7 8 18.9 2Zm-1.1 18h1.7L6.4 3.9H4.6L17.8 20Z" />
        </svg>
      );
    case 'instagram':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-4 w-4">
          <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2.2A2.8 2.8 0 0 0 4.2 7v10A2.8 2.8 0 0 0 7 19.8h10a2.8 2.8 0 0 0 2.8-2.8V7A2.8 2.8 0 0 0 17 4.2H7Zm10.5 1.7a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2.2a2.8 2.8 0 1 0 0 5.6 2.8 2.8 0 0 0 0-5.6Z" />
        </svg>
      );
    case 'letterboxd':
      return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-4 w-4">
          <circle cx="6" cy="12" r="3.25" fill="currentColor" opacity="0.8" />
          <circle cx="12" cy="12" r="3.25" fill="currentColor" />
          <circle cx="18" cy="12" r="3.25" fill="currentColor" opacity="0.6" />
        </svg>
      );
    default:
      return null;
  }
}

export default function Home({ onNavigate }: HomeProps) {
  const [feedMode, setFeedMode] = useState<HomeFeedMode>('latest');

  const noteFeedItems: HomeFeedItem[] = notes.map((note) => ({
    id: note.id,
    title: note.title,
    excerpt: note.excerpt,
    date: note.date,
    publishedAt: parsePublishedAt(note.date),
    category: note.category,
    typeLabel: note.type,
    author: note.author,
    kind: 'note',
    featured: featuredNoteIds.includes(note.id),
    heroImage: note.heroImage,
    onClick: () => onNavigate('post', note.id),
  }));

  const projectFeedItems: HomeFeedItem[] = (['webp-me-daddy', 'inkmaster-studio'] as const).map((slug) => {
    const project = projectStatuses[slug];
    const homeProjectLogo =
      slug === 'webp-me-daddy'
        ? {
            src: '/webp-me-daddy-home-card.webp',
            width: 1200,
            height: 900,
          }
        : project.hero.logo
          ? {
              src: project.hero.logo.src,
              srcSet: project.hero.logo.srcSet,
              sizes: project.hero.logo.sizes,
              width: project.hero.logo.width,
              height: project.hero.logo.height,
            }
          : undefined;

    return {
      id: project.slug,
      title: project.name,
      excerpt: project.summary,
      date: project.lastUpdated,
      publishedAt: parsePublishedAt(project.lastUpdated),
      category: 'Shadewater Labs',
      typeLabel: 'Project',
      author: 'Brin',
      kind: 'project',
      featured: featuredProjectSlugs.includes(project.slug),
      projectLogo: homeProjectLogo,
      projectGlow:
        slug === 'webp-me-daddy'
          ? 'drop-shadow-[0_18px_36px_hsl(184_85%_58%/0.18)]'
          : 'drop-shadow-[0_18px_36px_hsl(219_90%_58%/0.2)]',
      projectLogoWrapperClass: 'items-center py-8',
      projectLogoClass:
        slug === 'webp-me-daddy'
          ? 'max-h-[6.9rem] max-w-[8.2rem]'
          : 'max-h-[6.9rem] max-w-[8.2rem]',
      onClick: () => onNavigate(project.slug),
    };
  });

  const homeFeedItems = [...noteFeedItems, ...projectFeedItems]
    .sort((left, right) => right.publishedAt - left.publishedAt);

  const visibleFeedItems = homeFeedItems
    .filter((item) => (feedMode === 'featured' ? item.featured : true))
    .slice(0, 4);

  const upcomingStreams = streamSchedule.slice(0, 3);

  return (
    <div>
      <div className="relative overflow-visible">
        <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-8 sm:px-6 md:pb-20 md:pt-12 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <div className="mb-6 flex flex-wrap items-center gap-4">
                <LiveStatusBadge isLive={liveStatus.isLive} viewerCount={liveStatus.viewerCount} />
                <span className="rounded-full border-2 border-[hsl(var(--sandstone)/0.28)] bg-[hsl(var(--sandstone)/0.1)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-[hsl(var(--sandstone-soft))]">
                  Reviews, streams, and very specific opinions
                </span>
              </div>

              <h1 className="font-display mb-4 text-5xl font-bold leading-[0.95] md:text-7xl">
                <span className="text-[hsl(192_40%_35%)]" style={{ textShadow: '0 0 16px hsl(0 0% 100% / 0.24)' }}>
                  Brin
                </span>
                <br />
                <span className="text-foreground" style={{ textShadow: '0 0 16px hsl(0 0% 100% / 0.18)' }}>
                  Shadewater.
                </span>
              </h1>

              <p className="mb-4 max-w-3xl text-lg font-semibold text-[hsl(var(--sandstone-soft))] md:text-2xl">
                Twitch Streamer, Tech Creative and Filmmaker
              </p>

              <p className="mb-8 max-w-2xl text-lg text-foreground-muted md:text-2xl">
                Late-night streams, sharp reviews, and a cozy internet corner for people who love Games, Film, TV and Tech.
              </p>

              <div className="mb-8 grid gap-4 md:grid-cols-3">
                <div className="rounded-2xl border-2 border-white/10 bg-white/5 p-4">
                  <p className="mb-1 text-xs font-semibold uppercase tracking-[0.25em] text-white">Current Vibe ✨</p>
                  <p className="text-sm text-[hsl(var(--sandstone-soft))]">Recalibrating Life & Looking Ahead</p>
                </div>
                <div className="rounded-2xl border-2 border-white/10 bg-white/5 p-4">
                  <p className="mb-1 text-xs font-semibold uppercase tracking-[0.25em] text-white">Recent Focus 🛠️</p>
                  <p className="text-sm text-[hsl(var(--sandstone-soft))]">Building Websites, Writing Reviews and learning new techology</p>
                </div>
                <div className="rounded-2xl border-2 border-white/10 bg-white/5 p-4">
                  <p className="mb-1 text-xs font-semibold uppercase tracking-[0.25em] text-white">Margot Status 🐈</p>
                  <p className="text-sm text-[hsl(var(--sandstone-soft))]">Likely napping or waiting for more treats</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 overflow-visible">
                <Button variant="hero" onClick={() => onNavigate('stream')}>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                  </svg>
                  Watch Live
                </Button>
                <Button variant="hero-outline" onClick={() => onNavigate('notes')}>
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  Reviews
                </Button>
                <div className="movie-pill-callout relative mb-24 inline-flex sm:mb-28">
                  <Button
                    variant="hero-outline"
                    className="relative z-10 border-[hsl(356_18%_28%)] bg-[hsl(356_18%_20%)] px-10 text-[1.02rem] text-[hsl(12_20%_90%)] shadow-[0_0_18px_hsl(356_18%_28%/0.2)] hover:border-[hsl(356_18%_34%)] hover:bg-[hsl(356_18%_24%)] hover:text-white"
                    onClick={() => window.open('https://strangeharvestmovie.com', '_blank', 'noopener,noreferrer')}
                  >
                    Strange Harvest Movie
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
            </div>

            <div className="flex items-center justify-center">
              <img
                src="/hero-illustration.webp"
                srcSet={HERO_ILLUSTRATION_SRCSET}
                sizes={HERO_ILLUSTRATION_SIZES}
                width={1574}
                height={1200}
                alt={HERO_ILLUSTRATION_ALT}
                loading="eager"
                decoding="async"
                fetchPriority="high"
                className="relative z-10 h-auto w-full max-w-lg drop-shadow-[0_20px_45px_hsl(210_66%_3%/0.55)] lg:max-w-xl"
              />
            </div>
          </div>
        </div>

        <div className="defer-render mx-auto max-w-7xl px-4 pb-2 sm:px-6 lg:px-8">
          <div className="rounded-[2rem] border-2 border-border/70 bg-[hsl(220_22%_11%/0.88)] px-4 py-8 shadow-[0_18px_45px_hsl(210_66%_3%/0.28)] sm:px-6 lg:px-8">
            <div className="mb-6 text-center">
              <h2 className="text-3xl font-bold">Quick Stats & Audience Reach 🚀</h2>
            </div>
            <div className="flex flex-wrap justify-center gap-6 md:gap-12">
              <AnimatedStat
                value={stats.followers}
                label="Followers"
                icon={
                  <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                  </svg>
                }
              />
              <AnimatedStat
                value={stats.hoursWatched}
                label="Total Hours Watched"
                icon={
                  <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                  </svg>
                }
              />
              <AnimatedStat
                value={stats.hoursStreamed}
                label="Total Hours Streamed"
                icon={
                  <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                }
              />
            </div>
            <div className="mt-8 border-t border-white/10 pt-6">
              <p className="mb-4 text-center text-xs font-semibold uppercase tracking-[0.32em] text-[hsl(var(--sandstone-soft))]/85">
                Find Me Around The Internet
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                {socialLinks.map((link) => (
                  <a
                    key={link.platform}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-[hsl(var(--sandstone-soft))] transition-all hover:-translate-y-0.5 hover:border-[hsl(var(--sandstone)/0.45)] hover:text-white"
                  >
                    <SocialIcon platform={link.platform} />
                    <span>{link.name}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="defer-render mx-auto max-w-7xl px-4 pb-20 pt-16 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] border-2 border-border bg-[hsl(220_20%_13%/0.9)] p-8 shadow-[0_18px_45px_hsl(210_66%_3%/0.24)] md:p-10">
          <div className="mb-12 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-3xl font-bold">Latest Reviews, Notes & Projects 📕</h2>
              <p className="mt-3 text-xs font-semibold uppercase tracking-[0.35em] text-[hsl(var(--sandstone-soft))]/85">
                Pulled From Reviews & Notes And Shadewater Labs
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <div className="inline-flex rounded-full border border-white/10 bg-white/5 p-1">
                {(['latest', 'featured'] as const).map((mode) => (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => setFeedMode(mode)}
                    className={`rounded-full px-4 py-2 text-sm font-semibold capitalize transition-all ${
                      feedMode === mode
                        ? 'bg-[linear-gradient(135deg,hsl(192_29%_21%),hsl(192_36%_28%))] text-white shadow-[0_0_18px_hsl(192_40%_30%/0.28)]'
                        : 'text-foreground/68 hover:text-white'
                    }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>
              <Button variant="hero-outline" onClick={() => onNavigate('notes')}>
                Explore Reviews & Notes
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {visibleFeedItems.map((item) => {
              const authorTheme = noteAuthorThemes[item.author];

              return (
              <button
                key={item.id}
                onClick={item.onClick}
                className="group relative flex h-full flex-col overflow-hidden rounded-3xl border-2 border-white/10 bg-[hsl(220_10%_18%)] text-left shadow-[0_4px_12px_hsl(0_0%_0%/0.3),0_0_20px_hsl(192_49%_14%/0.1)] transition-all hover:-translate-y-1 hover:bg-[hsl(220_10%_20%)] hover:shadow-[0_8px_20px_hsl(0_0%_0%/0.4),0_0_30px_hsl(192_49%_14%/0.2)]"
              >
                <div className={`relative aspect-[16/10] overflow-hidden ${item.kind === 'project' ? 'bg-[linear-gradient(135deg,hsl(220_22%_11%),hsl(192_26%_16%),hsl(220_18%_12%))]' : 'bg-[hsl(220_18%_10%)]'}`}>
                  <div className="absolute left-4 top-4 z-10 rounded-full bg-background/75 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-foreground backdrop-blur-sm">
                    {item.typeLabel}
                  </div>
                  {item.kind === 'note' && item.heroImage ? (
                    <img
                      src={item.heroImage.src}
                      alt={item.heroImage.alt}
                      width={item.heroImage.width}
                      height={item.heroImage.height}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                    />
                  ) : item.projectLogo ? (
                    <div className={`flex h-full justify-center px-8 ${item.projectLogoWrapperClass ?? 'items-center py-8'}`}>
                      <img
                        src={item.projectLogo.src}
                        srcSet={item.projectLogo.srcSet}
                        sizes={item.projectLogo.sizes}
                        width={item.projectLogo.width}
                        height={item.projectLogo.height}
                        alt=""
                        loading="lazy"
                        decoding="async"
                        className={`h-auto w-auto object-contain opacity-95 transition-transform duration-500 group-hover:scale-[1.03] ${item.projectLogoClass ?? 'max-h-[7rem] max-w-[12rem]'} ${item.projectGlow ?? ''}`}
                      />
                    </div>
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-7xl">
                      {categoryEmoji[item.category] ?? '✨'}
                    </div>
                  )}
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="mb-3 flex flex-wrap gap-2">
                    <span className="rounded-full border border-primary/25 bg-primary/18 px-3 py-1 text-xs font-medium text-primary-glow">
                      {item.category}
                    </span>
                    <span className={`rounded-full border border-white/10 px-3 py-1 text-xs font-medium ${authorTheme.badge}`}>
                      {item.author}
                    </span>
                    <span className="rounded-full border border-secondary/25 bg-secondary-glow/20 px-3 py-1 text-xs font-medium text-secondary-glow">
                      {item.date}
                    </span>
                  </div>
                  <h3 className="mb-3 text-2xl font-bold transition-colors group-hover:text-primary-glow">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-7 text-foreground-muted">
                    {item.excerpt}
                  </p>
                </div>
              </button>
              );
            })}
          </div>
        </div>
      </section>

      <div className="mx-auto flex max-w-7xl justify-center px-4 pb-2 sm:px-6 lg:px-8">
        <img
          src="/margot-trans.webp"
          width={351}
          height={596}
          alt=""
          role="presentation"
          loading="lazy"
          decoding="async"
          className="h-auto w-full max-w-[124px] opacity-95 drop-shadow-[0_14px_32px_hsl(210_66%_3%/0.28)] sm:max-w-[146px]"
        />
      </div>

      <section className="defer-render mx-auto max-w-7xl px-4 pb-20 pt-16 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.05fr]">
          <div className="rounded-[2rem] border-2 border-white/10 bg-[linear-gradient(135deg,hsl(220_20%_13%/0.9),hsl(210_66%_7%/0.88))] p-8 shadow-[0_20px_60px_hsl(210_66%_3%/0.35)]">
            <h2 className="text-3xl font-bold">Weekly Stream Schedule 🔮</h2>
            <p className="mt-3 text-xs font-semibold uppercase tracking-[0.35em] text-[hsl(var(--sandstone-soft))]/85">
              {streamAbout.heading}
            </p>
            <div className="mt-8 space-y-4 text-foreground/72">
              {streamAbout.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <div className="mt-8 space-y-4">
              {upcomingStreams.map((slot) => (
                <div key={slot.day} className="rounded-2xl border-2 border-white/10 bg-white/5 px-5 py-4">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold text-foreground">{slot.day}</p>
                      <p className="text-sm text-foreground/55">{slot.time}</p>
                    </div>
                    <span className="rounded-full bg-primary/20 px-3 py-1 text-sm font-medium text-primary-glow">
                      {slot.category}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-7 text-foreground/68">{slot.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border-2 border-white/10 bg-[hsl(220_20%_13%/0.9)] p-8 shadow-[0_4px_12px_hsl(0_0%_0%/0.3),0_0_20px_hsl(192_49%_14%/0.1)]">
            <h2 className="text-3xl font-bold">Stream Vibe & Activities ☕</h2>
            <p className="mt-3 text-xs font-semibold uppercase tracking-[0.35em] text-[hsl(var(--sandstone-soft))]/85">
              Why People Stay
            </p>
            <div className="mt-8 grid gap-4">
              {streamVibes.map((item) => (
                <div key={item.title} className="rounded-2xl border-2 border-white/10 bg-white/5 p-5">
                  <p className="mb-2 text-sm font-semibold text-foreground">{item.title}</p>
                  <p className="text-sm text-foreground/60">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="defer-render mx-auto max-w-7xl overflow-hidden px-4 pb-20 pt-16 sm:px-6 lg:px-8">
        <div className="relative mx-auto max-w-4xl rounded-3xl border-2 border-border bg-[linear-gradient(180deg,hsl(220_22%_11%/0.92),hsl(210_66%_7%/0.9))] p-12 text-center shadow-[0_4px_12px_hsl(0_0%_0%/0.3),0_0_20px_hsl(192_49%_14%/0.1)]">
          <div className="mb-8 inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/20 text-primary-glow shadow-lg shadow-primary-glow/20">
            <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
              <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
            </svg>
          </div>
          <h2 className="mb-6 text-4xl font-bold md:text-5xl">Join the Community 💬</h2>
          <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-foreground-muted md:text-xl">
            Late-night watch parties, game nights, and good vibes. Come hang out on Discord. Margot the cat might even make an appearance.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button
              variant="default"
              size="lg"
              onClick={() => window.open('https://discord.gg/brinshadewater', '_blank', 'noopener,noreferrer')}
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
              </svg>
              Join Discord
            </Button>
            <Button variant="hero-outline" size="lg" onClick={() => onNavigate('stream')}>
              See Stream Schedule
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
