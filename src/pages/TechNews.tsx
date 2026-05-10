import { techNewsItems } from '@/content/techNews';
import {
  AuroraPage,
  pp,
} from '@/components/aurora/chrome';
import type { AuroraNavigate } from '@/components/aurora/chrome';

interface TechNewsProps {
  onNavigate: AuroraNavigate;
}

const ACCENTS: Record<string, string> = {
  'AI Tools': '186 90% 60%',
  'Creative Technology': '210 85% 65%',
  'Product Experiments': '150 65% 55%',
};

const TAGS: Record<string, string[]> = {
  'ai-tooling-watchlist': ['claude', 'agents', 'eval'],
  'creative-tech-signals': ['video', 'image', 'pipeline'],
  'product-experiment-log': ['ship', 'spike', 'maybe'],
};

export default function TechNews({ onNavigate }: TechNewsProps) {
  return (
    <AuroraPage
      active="tech-news"
      onNavigate={onNavigate}
      sectionLabel="Tech News"
      eyebrow="§ 02 · TRANSMISSIONS"
      title="AI & creative-tech notes."
      lede="A manually curated feed of AI signals, creative-tech ideas, and workflow changes worth tracking."
    >
      <section style={pp.section}>
        <div style={pp.newsList}>
          {techNewsItems.map((n, idx) => {
            const accent = ACCENTS[n.category] ?? '186 90% 60%';
            const tags = TAGS[n.id] ?? [];
            const sig = String(idx + 1).padStart(2, '0');
            return (
              <article key={n.id} style={pp.newsCard}>
                <div style={pp.newsRail}>
                  <div style={pp.newsRailNum}>{sig}</div>
                  <div
                    style={{
                      ...pp.newsRailDot,
                      background: `hsl(${accent})`,
                      boxShadow: `0 0 18px hsl(${accent})`,
                    }}
                  />
                  <div style={pp.newsRailLine} />
                </div>

                <div style={pp.newsBody}>
                  <div style={pp.newsMeta}>
                    <span style={{ ...pp.newsCat, color: `hsl(${accent})` }}>
                      {n.category.toUpperCase()}
                    </span>
                    <span style={pp.newsSep}>/</span>
                    <span style={pp.newsMono}>{n.date}</span>
                    <span style={pp.newsSep}>/</span>
                    <span style={pp.newsMono}>{n.source}</span>
                  </div>
                  <h3 style={pp.newsTitle}>{n.title}</h3>
                  <p style={pp.newsSummary}>{n.summary}</p>
                  <div style={pp.newsTags}>
                    {tags.map((t) => (
                      <span key={t} style={pp.newsTag}>#{t}</span>
                    ))}
                    {n.href ? (
                      <a
                        href={n.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ ...pp.newsRead, color: `hsl(${accent})` }}
                      >
                        Read transmission <span style={{ marginLeft: 4 }}>↗</span>
                      </a>
                    ) : null}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </AuroraPage>
  );
}
