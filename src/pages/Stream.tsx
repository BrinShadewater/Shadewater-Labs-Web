import { useState } from 'react';
import TwitchStreamEmbed from '../components/TwitchStreamEmbed';
import { communityRules, streamAbout, streamSchedule, streamSetupSections } from '../content/stream';

const STREAM_SETUP_ALT = 'Brin Shadewater streaming setup with monitors, desk, and ambient lighting';
const STREAM_SETUP_SRCSET =
  '/brin-setup-480w.webp 480w, /brin-setup-768w.webp 768w, /brin-setup-1200w.webp 1200w, /brin-setup.webp 1600w';
const STREAM_SETUP_SIZES = '(min-width: 1280px) 76rem, 100vw';

export default function Stream() {
  const [streamStatus, setStreamStatus] = useState<'loading' | 'live' | 'offline'>('loading');

  return (
    <div className="mx-auto max-w-7xl px-4 pb-12 pt-3 sm:px-6 lg:px-8">
      <div className="mb-8 text-center">
        <h1 className="mb-4 bg-gradient-to-r from-primary via-foreground to-secondary bg-clip-text text-4xl font-bold text-transparent md:text-5xl">
          Live Stream
        </h1>
      </div>

      <div className="mb-10">
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <h2 className="text-2xl font-bold md:text-3xl">Watch Now</h2>
          <div className="inline-flex items-center gap-2 rounded-full border-2 border-white/10 bg-[hsl(220_20%_13%/0.92)] px-4 py-2 text-sm font-medium text-foreground/80">
            <span className={`h-2.5 w-2.5 rounded-full ${streamStatus === 'live' ? 'bg-red-500' : 'bg-zinc-500'}`}></span>
            {streamStatus === 'live' ? 'Stream Online' : 'Stream Offline'}
          </div>
        </div>
        <TwitchStreamEmbed channel="brinshadewater" onStatusChange={setStreamStatus} />
      </div>

      <section className="mb-12 rounded-[2rem] border-2 border-border bg-[hsl(220_20%_13%/0.92)] p-8 shadow-[0_18px_45px_hsl(210_66%_3%/0.24)] backdrop-blur-sm">
        <h2 className="text-3xl font-bold">About Stream</h2>
        <p className="mt-3 text-lg font-semibold text-[hsl(var(--sandstone-soft))]">
          {streamAbout.heading}
        </p>
        <div className="mt-6 space-y-5 text-foreground/72">
          {streamAbout.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </section>

      <div className="mb-12 flex justify-center">
        <img
          src="/margot-trans.webp"
          width={351}
          height={596}
          alt=""
          role="presentation"
          loading="lazy"
          decoding="async"
          className="h-auto w-full max-w-[176px]"
        />
      </div>

      <div className="mb-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
        <section className="rounded-[2rem] border-2 border-border bg-[hsl(220_20%_13%/0.92)] p-8 shadow-[0_18px_45px_hsl(210_66%_3%/0.24)] backdrop-blur-sm">
          <h2 className="text-3xl font-bold">Stream Schedule</h2>
          <div className="mt-8 space-y-5">
            {streamSchedule.map((schedule) => (
              <div
                key={schedule.day}
                className="rounded-2xl border-2 border-white/10 bg-white/5 p-5"
              >
                <div className="mb-3 flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-xl font-semibold">{schedule.day}</p>
                    <p className="mt-1 text-sm text-foreground/55">{schedule.time}</p>
                  </div>
                  <span className="rounded-full bg-primary/20 px-3 py-1 text-sm font-medium text-primary-glow">
                    {schedule.category}
                  </span>
                </div>
                <p className="text-sm leading-7 text-foreground/70">{schedule.description}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm text-foreground/50">
            * Times may vary. Follow on Twitch and Discord for notifications!
          </p>
        </section>

        <section className="rounded-[2rem] border-2 border-border bg-[hsl(220_20%_13%/0.92)] p-8 shadow-[0_18px_45px_hsl(210_66%_3%/0.24)] backdrop-blur-sm">
          <h2 className="text-3xl font-bold">Community Rules</h2>
          <ul className="mt-8 space-y-4">
            {communityRules.map((rule, index) => (
              <li key={rule} className="flex gap-4 rounded-2xl border-2 border-white/10 bg-white/5 p-4">
                <span className="text-base font-bold text-primary-glow">{index + 1}.</span>
                <span className="text-foreground/80">{rule}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <div className="mb-4 text-center">
        <h2 className="text-3xl font-bold md:text-4xl">Brin&apos;s Stream Setup &amp; Equipment</h2>
      </div>

      <div className="mb-8 overflow-hidden rounded-[2rem] border-2 border-border bg-[hsl(220_20%_13%/0.92)] shadow-[0_18px_45px_hsl(210_66%_3%/0.24)] backdrop-blur-sm">
        <img
          src="/brin-setup.webp"
          srcSet={STREAM_SETUP_SRCSET}
          sizes={STREAM_SETUP_SIZES}
          width={1600}
          height={900}
          alt={STREAM_SETUP_ALT}
          loading="lazy"
          decoding="async"
          className="h-auto w-full object-cover"
        />
      </div>

      <section className="rounded-[2rem] border-2 border-border bg-[hsl(220_20%_13%/0.92)] p-6 shadow-[0_18px_45px_hsl(210_66%_3%/0.24)] backdrop-blur-sm md:p-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold md:text-3xl">Setup Breakdown</h2>
          <p className="mt-2 text-xs uppercase tracking-[0.24em] text-[hsl(var(--sandstone-soft))]/85">
            Stream Setup
          </p>
        </div>

        <div className="grid gap-4 md:auto-rows-fr md:grid-cols-2 xl:grid-cols-3">
          {streamSetupSections.map((section) => (
            <div
              key={section.title}
              className="flex h-full flex-col rounded-2xl border-2 border-white/10 bg-[hsl(210_10%_7%/0.98)] p-4"
            >
              <h3 className="mb-3 text-xl font-semibold text-foreground md:text-2xl">{section.title}</h3>
              <div className="space-y-3">
                {section.items.map((item) => (
                  <div key={item.name}>
                    <p className="text-sm font-medium text-foreground">{item.name}</p>
                    {item.details.length > 0 && (
                      <ul className="mt-1.5 space-y-1.5 text-sm text-foreground/65">
                        {item.details.map((detail) => (
                          <li key={detail}>{detail}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
