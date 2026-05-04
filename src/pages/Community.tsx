import { ArrowUpRight, Clapperboard, Cpu, Gamepad2, MessageCircle, Sparkles, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  canopyInfo,
  chaosPals,
  chaosPalsIntro,
  communityAtmosphere,
  communityHero,
  communityMoments,
  discordInfo,
  type CommunityLink,
} from '../content/community';

const HERO_ILLUSTRATION_ALT = 'Illustration of Brin Shadewater and Margot gaming together';
const HERO_ILLUSTRATION_SRCSET =
  '/hero-illustration-640w.webp 640w, /hero-illustration-960w.webp 960w, /hero-illustration-1200w.webp 1200w, /hero-illustration.webp 1574w';
const HERO_ILLUSTRATION_SIZES = '(min-width: 1024px) 520px, (min-width: 640px) 420px, calc(100vw - 2rem)';
const CANOPY_LOGO_SRCSET =
  '/the-canopy-stream-team-logo-lockup-320w.webp 320w, /the-canopy-stream-team-logo-lockup-640w.webp 640w, /the-canopy-stream-team-logo-lockup-900w.webp 900w, /the-canopy-stream-team-logo-lockup.webp 1200w';
const CANOPY_LOGO_SIZES = '(min-width: 1024px) 320px, (min-width: 768px) 300px, min(100vw - 5rem, 320px)';
const CANOPY_ROUND_LOGO_SRCSET =
  '/the-canopy-stream-team-round-logo-320w.webp 320w, /the-canopy-stream-team-round-logo-640w.webp 640w, /the-canopy-stream-team-round-logo-900w.webp 900w, /the-canopy-stream-team-round-logo.webp 1000w';
const CANOPY_ROUND_LOGO_SIZES = '(min-width: 1024px) 164px, (min-width: 768px) 144px, 128px';

const avatarThemes = {
  teegly: {
    shell: 'border-[hsl(105_34%_42%/0.52)] bg-[radial-gradient(circle_at_30%_30%,hsl(105_34%_34%/0.3),transparent_58%),linear-gradient(145deg,hsl(220_18%_18%),hsl(210_66%_8%))] shadow-[0_0_30px_hsl(105_34%_34%/0.22)]',
    halo: 'from-[hsl(105_34%_34%/0.26)] to-transparent',
    badge: 'border-[hsl(105_34%_34%/0.45)] bg-[hsl(105_34%_34%/0.16)] text-[hsl(95_30%_76%)]',
    link: 'border-[hsl(105_34%_34%/0.35)] bg-[hsl(105_34%_34%/0.12)] text-[hsl(95_30%_78%)] hover:border-[hsl(105_34%_46%)] hover:text-[hsl(95_45%_90%)]',
  },
  crafty: {
    shell: 'border-[hsl(342_70%_58%/0.48)] bg-[radial-gradient(circle_at_30%_30%,hsl(342_62%_46%/0.28),transparent_58%),linear-gradient(145deg,hsl(220_18%_18%),hsl(210_66%_8%))] shadow-[0_0_30px_hsl(342_62%_46%/0.18)]',
    halo: 'from-[hsl(342_62%_46%/0.22)] to-transparent',
    badge: 'border-[hsl(342_62%_46%/0.45)] bg-[hsl(342_62%_46%/0.18)] text-[hsl(342_55%_72%)]',
    link: 'border-[hsl(342_62%_46%/0.35)] bg-[hsl(342_62%_46%/0.12)] text-[hsl(342_55%_74%)] hover:border-[hsl(342_70%_58%)] hover:text-[hsl(340_70%_92%)]',
  },
  krusher: {
    shell: 'border-[hsl(var(--sandstone)/0.48)] bg-[radial-gradient(circle_at_30%_30%,hsl(var(--sandstone)/0.26),transparent_58%),linear-gradient(145deg,hsl(220_18%_18%),hsl(210_66%_8%))] shadow-[0_0_30px_hsl(34_26%_48%/0.16)]',
    halo: 'from-[hsl(var(--sandstone-soft)/0.2)] to-transparent',
    badge: 'border-[hsl(var(--sandstone)/0.45)] bg-[hsl(var(--sandstone)/0.18)] text-[hsl(var(--sandstone-soft))]',
    link: 'border-[hsl(var(--sandstone)/0.35)] bg-[hsl(var(--sandstone)/0.12)] text-[hsl(var(--sandstone-soft))] hover:border-[hsl(var(--sandstone-soft))] hover:text-[hsl(36_30%_92%)]',
  },
} as const;

function TwitchIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M5 3 3 8v11h4v3l3-3h4l7-7V3H5Zm14 8-4 4h-4l-3 3v-3H5V5h14v6Zm-8-1h2V7h-2v3Zm5 0h2V7h-2v3Z" />
    </svg>
  );
}

function LinkIcon({ kind }: { kind: CommunityLink['kind'] }) {
  if (kind === 'twitch') {
    return <TwitchIcon />;
  }

  if (kind === 'discord') {
    return <MessageCircle className="h-4 w-4" aria-hidden="true" />;
  }

  return <ArrowUpRight className="h-4 w-4" aria-hidden="true" />;
}

export default function Community() {
  return (
    <div className="mx-auto max-w-7xl px-4 pb-12 pt-4 sm:px-6 lg:px-8">
      <div className="mb-2 flex justify-center">
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
          className="h-auto w-full max-w-[520px] drop-shadow-[0_24px_48px_hsl(210_66%_3%/0.4)]"
        />
      </div>

      <div className="mb-4 text-center">
        <h1 className="font-display text-5xl font-bold leading-none text-white md:text-7xl">
          {communityHero.title}
        </h1>
        <p className="mt-4 text-base font-semibold uppercase tracking-[0.24em] text-[hsl(var(--sandstone-soft))]/88 md:text-lg">
          It&apos;s about{' '}
          <span className="relative inline-block pr-1">
            Family
            <span className="absolute -bottom-1 left-0 h-[2px] w-full origin-left animate-pulse rounded-full bg-[hsl(var(--sandstone-soft))]" />
          </span>
        </p>
      </div>

      <section className="relative overflow-hidden rounded-[2rem] border-2 border-[hsl(var(--sandstone)/0.2)] bg-[linear-gradient(135deg,hsl(220_22%_11%/0.96),hsl(210_66%_7%/0.94),hsl(192_29%_12%/0.92))] px-6 py-6 shadow-[0_22px_55px_hsl(210_66%_3%/0.3)] md:px-10 md:py-7">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,hsl(var(--sandstone-soft)/0.12),transparent_30%),radial-gradient(circle_at_bottom_left,hsl(192_40%_35%/0.12),transparent_32%)]" />
        <div className="relative grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.34em] text-[hsl(var(--sandstone-soft))]/90">
              {communityHero.eyebrow}
            </p>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-foreground/82 md:text-xl">
              {communityHero.description}
            </p>
            <p className="mt-4 max-w-3xl text-base leading-8 text-foreground/68 md:text-lg">
              {communityHero.followup}
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              {communityHero.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-[hsl(var(--sandstone-soft))]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="grid gap-4">
            <div className="flex items-center gap-4 rounded-[1.6rem] border border-white/10 bg-[linear-gradient(135deg,hsl(220_20%_13%/0.82),hsl(210_66%_8%/0.72))] p-4 backdrop-blur-sm">
              <img
                src="/the-canopy-stream-team-round-logo.webp"
                srcSet={CANOPY_ROUND_LOGO_SRCSET}
                sizes={CANOPY_ROUND_LOGO_SIZES}
                width={1000}
                height={1000}
                alt="The Canopy Stream Team round logo"
                loading="lazy"
                decoding="async"
                className="h-24 w-24 shrink-0 object-contain drop-shadow-[0_12px_24px_hsl(210_66%_3%/0.3)] md:h-28 md:w-28"
              />
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[hsl(var(--sandstone-soft))]/88">
                  Stream Team
                </p>
                <p className="mt-2 text-xl font-bold text-white">Proudly part of The Canopy</p>
                <p className="mt-2 text-sm leading-7 text-foreground/65">
                  A wider circle of creators, collaborations, raids, and community discovery beyond the stream itself.
                </p>
              </div>
            </div>
            {communityHero.orbitCards.map((item) => (
              <div
                key={item.label}
                className="rounded-[1.6rem] border-2 border-white/10 bg-[hsl(220_20%_13%/0.84)] p-5 shadow-[0_8px_24px_hsl(210_66%_3%/0.22)] backdrop-blur-sm"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[hsl(var(--sandstone-soft))]/82">
                  {item.label}
                </p>
                <p className="mt-3 text-2xl font-bold text-white">{item.value}</p>
                <p className="mt-2 text-sm leading-7 text-foreground/62">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pt-20">
        <div className="mb-10 max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.34em] text-[hsl(var(--sandstone-soft))]/85">
            Creator Orbit
          </p>
          <h2 className="mt-3 text-4xl font-bold text-white">{chaosPalsIntro.title}</h2>
          <p className="mt-4 text-lg leading-8 text-foreground/72">
            {chaosPalsIntro.description}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {chaosPals.map((pal) => {
            const theme = avatarThemes[pal.avatarTheme];

            return (
              <article
                key={pal.name}
                className="group relative overflow-hidden rounded-[2rem] border-2 border-white/10 bg-[linear-gradient(180deg,hsl(220_20%_13%/0.94),hsl(210_66%_7%/0.9))] p-6 shadow-[0_12px_30px_hsl(210_66%_3%/0.24)] transition-all hover:-translate-y-1 hover:border-[hsl(var(--sandstone)/0.28)]"
              >
                <div className={`absolute inset-x-0 top-0 h-28 bg-gradient-to-b ${theme.halo}`} />
                <div className="relative flex h-full flex-col">
                  <div className="flex items-start justify-between gap-4">
                    <div
                      className={`relative inline-flex h-[72px] w-[72px] items-center justify-center overflow-hidden rounded-full border-2 ${theme.shell}`}
                      aria-hidden="true"
                    >
                      <img
                        src={pal.avatarSrc}
                        alt={`${pal.name} avatar`}
                        width={70}
                        height={70}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover"
                      />
                      <span className="absolute inset-1 rounded-full border border-white/12" />
                    </div>
                    {pal.recentBadge ? (
                      <span className={`rounded-full px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.22em] ${theme.badge}`}>
                        {pal.recentBadge}
                      </span>
                    ) : null}
                  </div>

                  <div className="mt-6">
                    <h3 className="text-2xl font-bold text-white">{pal.name}</h3>
                    <p className="mt-2 text-sm font-medium uppercase tracking-[0.18em] text-[hsl(var(--sandstone-soft))]/82">
                      {pal.role}
                    </p>
                    <p className="mt-4 text-sm leading-7 text-foreground/68">
                      {pal.description}
                    </p>
                  </div>

                  <div className="mt-auto flex flex-nowrap gap-2 pt-6">
                    {pal.links.map((link) => (
                      <a
                        key={link.label}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex min-w-0 items-center gap-2 rounded-full px-3 py-2 text-xs transition-all hover:-translate-y-0.5 ${theme.link}`}
                      >
                        <LinkIcon kind={link.kind} />
                        <span>{link.label}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="py-20">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[2rem] border-2 border-[hsl(var(--sandstone)/0.22)] bg-[linear-gradient(135deg,hsl(220_22%_11%/0.96),hsl(210_20%_12%/0.92),hsl(34_18%_18%/0.84))] p-8 shadow-[0_18px_45px_hsl(210_66%_3%/0.24)] md:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.34em] text-[hsl(var(--sandstone-soft))]/88">
              Stream Team
            </p>
            <div className="mt-5 flex justify-center">
              <img
                src="/the-canopy-stream-team-logo-lockup.webp"
                srcSet={CANOPY_LOGO_SRCSET}
                sizes={CANOPY_LOGO_SIZES}
                width={1200}
                height={900}
                alt="The Canopy Stream Team logo"
                loading="lazy"
                decoding="async"
                className="h-auto w-full max-w-[400px] object-contain drop-shadow-[0_10px_24px_hsl(210_66%_3%/0.18)]"
              />
            </div>
            <h2 className="mt-3 text-4xl font-bold text-white">{canopyInfo.title}</h2>
            <p className="mt-5 text-lg leading-8 text-foreground/80">{canopyInfo.eyebrow}</p>
            <p className="mt-4 text-base leading-8 text-foreground/72">{canopyInfo.description}</p>
            <p className="mt-4 text-base leading-8 text-foreground/68">{canopyInfo.followup}</p>
            <div className="mt-8">
              <Button
                asChild
                size="lg"
                className="bg-white text-[hsl(var(--sandstone))] shadow-[0_0_0_1px_hsl(0_0%_100%/0.16),0_0_20px_hsl(var(--sandstone)/0.18),0_12px_28px_hsl(210_66%_3%/0.18)] hover:bg-[hsl(36_30%_96%)] hover:text-[hsl(var(--sandstone-soft))] hover:shadow-[0_0_0_1px_hsl(0_0%_100%/0.22),0_0_28px_hsl(var(--sandstone)/0.26),0_14px_32px_hsl(210_66%_3%/0.22)]"
              >
                <a href={canopyInfo.link.url} target="_blank" rel="noopener noreferrer">
                  <ArrowUpRight className="h-5 w-5" aria-hidden="true" />
                  {canopyInfo.link.label}
                </a>
              </Button>
            </div>
          </div>

          <div className="rounded-[2rem] border-2 border-white/10 bg-[hsl(220_20%_13%/0.9)] p-8 shadow-[0_12px_30px_hsl(210_66%_3%/0.24)]">
            <p className="text-xs font-semibold uppercase tracking-[0.34em] text-[hsl(var(--sandstone-soft))]/85">
              What It Feels Like Here
            </p>
            <div className="mt-8 grid gap-4">
              {communityAtmosphere.map((item, index) => {
                const Icon = [Sparkles, Users, Cpu, MessageCircle][index];

                return (
                  <div key={item.title} className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
                    <div className="flex items-center gap-3">
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/15 text-[hsl(var(--sandstone-soft))]">
                        <Icon className="h-4 w-4" aria-hidden="true" />
                      </span>
                      <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                    </div>
                    <p className="mt-3 text-sm leading-7 text-foreground/65">{item.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="rounded-[2rem] border-2 border-white/10 bg-[hsl(220_20%_13%/0.88)] p-8 shadow-[0_18px_45px_hsl(210_66%_3%/0.24)] md:p-10">
          <div className="mb-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.34em] text-[hsl(var(--sandstone-soft))]/85">
                Community Moments
              </p>
              <h2 className="mt-3 text-3xl font-bold text-white">The kinds of nights this space tends to create</h2>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {communityMoments.map((moment, index) => {
              const Icon = [Clapperboard, Gamepad2, Cpu, Users][index];

              return (
                <div
                  key={moment}
                  className="rounded-[1.5rem] border border-white/10 bg-[linear-gradient(180deg,hsl(220_18%_16%),hsl(220_22%_12%))] p-5"
                >
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[hsl(var(--sandstone)/0.14)] text-[hsl(var(--sandstone-soft))]">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <p className="mt-4 text-base leading-7 text-foreground/76">{moment}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="overflow-hidden rounded-[2rem] border-2 border-[hsl(var(--sandstone)/0.22)] bg-[linear-gradient(180deg,hsl(220_22%_11%/0.94),hsl(210_66%_7%/0.92))] px-6 py-10 text-center shadow-[0_20px_52px_hsl(210_66%_3%/0.3)] md:px-10 md:py-12">
        <div className="mx-auto max-w-3xl">
          <span className="inline-flex h-16 w-16 items-center justify-center rounded-2xl border border-[hsl(var(--sandstone)/0.28)] bg-[linear-gradient(145deg,hsl(var(--sandstone)/0.22),hsl(192_29%_21%/0.26))] text-[hsl(var(--sandstone-soft))] shadow-[0_0_28px_hsl(var(--sandstone)/0.16)]">
            <MessageCircle className="h-7 w-7" aria-hidden="true" />
          </span>
          <h2 className="mt-6 text-4xl font-bold text-white md:text-5xl">{discordInfo.title}</h2>
          <p className="mt-5 text-lg leading-8 text-foreground/76 md:text-xl">
            {discordInfo.description}
          </p>
          <p className="mt-4 text-base leading-8 text-[hsl(var(--sandstone-soft))]">
            {discordInfo.followup}
          </p>
          <p className="mt-5 text-sm font-semibold uppercase tracking-[0.32em] text-[hsl(var(--sandstone-soft))]/88">
            {discordInfo.memberCount} members and growing
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button asChild variant="default" size="lg">
              <a href={discordInfo.inviteUrl} target="_blank" rel="noopener noreferrer">
                <LinkIcon kind="discord" />
                Join Discord
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
