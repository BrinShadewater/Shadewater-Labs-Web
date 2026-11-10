import { useState } from 'react';
import { AuroraPage, TG_MUTED, ad, pp, type AuroraNavigate } from '@/components/aurora/chrome';
import { researchPaper } from '@/content/researchPaper';
import { CONTACT_EMAIL } from '@/lib/routes';

const { pdf: paperPdf, url: paperUrl, author: paperAuthor, title: paperTitle, date: paperDate, edition: paperEdition, citationTitle } = researchPaper;
const archivePdf = '/research/physiological-state-and-executive-function-in-adhd-v34.pdf';
const citationDetails = `${paperAuthor}. (${paperDate}). ${citationTitle} (${paperEdition}). Shadewater Labs.`;
const correctionEmail = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent('ADHD research paper, November 2026 edition: Suggested correction')}`;

const readingGuide = [
  {
    title: 'The idea in plain language',
    label: 'Overview',
    page: 4,
    summary: 'A fictional noon deadline shows why the same lapse in attention can have different consequences for two people.',
  },
  {
    title: 'What this framework adds',
    label: 'Proposed framework',
    page: 12,
    summary: 'The paper separates how much performance changes from whether that change makes someone miss a real task requirement.',
  },
  {
    title: 'What ADHD studies have found',
    label: 'Existing evidence',
    page: 13,
    summary: 'In one sleep study of teens with ADHD, parents reported more inattention after shorter sleep, while scores on a sustained-attention task did not show a clear change.',
    source: 'https://pubmed.ncbi.nlm.nih.gov/30768404/',
  },
  {
    title: 'Sleep and next-day attention',
    label: 'Proposed study',
    page: 21,
    summary: 'The main study compares missed targets after shorter and usual nights. A separate optional task asks whether time to spare helps predict a missed deadline.',
  },
  {
    title: 'How the pilot would work',
    label: 'Appendix L',
    page: 130,
    summary: 'Read the proposed schedule, the rules for choosing the attention measure, and how the study would handle missed tests.',
  },
] as const;

const sourceNotes = [
  {
    reference: 126,
    page: 154,
    title: 'Exenatide trial in Parkinson’s disease',
    note: 'The Lancet published an expression of concern about this trial after a regulatory inspection raised concerns about trial conduct and oversight at one study site.',
    notice: 'Expression of concern',
    url: 'https://pubmed.ncbi.nlm.nih.gov/42330995/',
  },
  {
    reference: 190,
    page: 160,
    title: 'RECOVER-VITAL trial',
    note: 'The October 2026 correction in The Lancet Infectious Diseases only added Marta Cerda to the author list. Figure 42’s estimates and confidence intervals are unchanged.',
    notice: 'Publisher correction',
    url: 'https://www.thelancet.com/journals/laninf/article/PIIS1473-3099(26)00586-4/fulltext',
  },
  {
    reference: 215,
    page: 162,
    title: 'PROMOTe trial',
    note: 'Read the journal’s author correction alongside the trial report.',
    notice: 'Author correction',
    url: 'https://doi.org/10.1038/s41467-025-58771-w',
  },
  {
    reference: 223,
    page: 163,
    title: 'Microplastics in human brain tissue',
    note: 'Read the journal’s author correction alongside the original article.',
    notice: 'Author correction',
    url: 'https://doi.org/10.1038/s41591-025-03675-x',
  },
  {
    reference: 238,
    page: 164,
    title: 'Dietary preferences and the autism microbiome',
    note: 'The journal’s correction updates analyses and supplementary material. The authors report that their overall conclusions are unchanged.',
    notice: 'Published correction',
    url: 'https://doi.org/10.1016/j.cell.2023.12.001',
  },
] as const;

export default function Research({ onNavigate }: { onNavigate: AuroraNavigate }) {
  const [copyStatus, setCopyStatus] = useState('');

  const copyCitation = async () => {
    try {
      await navigator.clipboard.writeText(`${citationDetails} ${paperUrl}`);
      setCopyStatus('Citation copied.');
    } catch {
      setCopyStatus('Select the citation above and copy it manually.');
    }
  };

  return (
    <AuroraPage
      active="research"
      layout="reading"
      onNavigate={onNavigate}
      sectionLabel="Research"
      eyebrow="SHADEWATER LABS"
      title="Research"
      lede="Research from Shadewater Labs on how attention, effort, and daily functioning change from one day to the next in ADHD."
    >
      <section aria-labelledby="adhd" style={pp.section}>
        <article style={pp.projectCard}>
          <p style={{ ...pp.projectBlurb, margin: '0 0 10px' }}>Research perspective · ADHD</p>
          <h2 id="adhd" style={{ margin: 0, color: '#fff', fontSize: 'clamp(1.5rem, 4vw, 2.25rem)', lineHeight: 1.15 }}>
            {paperTitle}
          </h2>
          <p style={pp.projectBlurb}>{paperAuthor}</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '12px 20px', marginTop: 20 }}>
            <a href={paperPdf} style={ad.btnPrimary}>Read the paper (PDF)</a>
            <div style={{ color: TG_MUTED, fontSize: 14 }}>
              <strong style={{ display: 'block', color: '#fff' }}>{paperEdition}</strong>
              <span><time dateTime={researchPaper.datePublished}>{paperDate}</time> · 188 pages · 10.2 MB</span>
              <div>
                <a href="#source-notes" className="underline underline-offset-4">Source notes</a>
                {' · '}
                <a href={archivePdf} className="underline underline-offset-4">Archived v34 PDF</a>
              </div>
            </div>
          </div>
          <p style={{ ...pp.projectBlurb, marginTop: 22 }}>
            Why might the same person find a task harder on one day than another? The paper proposes a way to measure changes in attention, effort, and daily functioning. It starts with a proposed sleep study in adults with ADHD and a comparison group.
          </p>
          <p style={{ ...pp.projectBlurb, marginBottom: 0 }}>
            The full edition includes the illustrated manuscript, evidence reviews, and proposed study methods. It is a research perspective with no original participant data or independent peer review.
          </p>
        </article>
        <nav aria-labelledby="research-contents" style={{ marginTop: 24 }}>
          <h2 id="research-contents" style={{ margin: '0 0 12px', color: '#fff', fontSize: 18 }}>On this page</h2>
          <ul role="list" style={{ display: 'flex', flexWrap: 'wrap', gap: 8, listStyle: 'none', margin: 0, padding: 0 }}>
            {[
              ['study-at-a-glance', 'Study at a glance'],
              ['start-here', 'Start here'],
              ['figure-1', 'Figure 1'],
              ['key-terms', 'Key terms'],
              ['what-would-change-our-minds', 'What would change our minds?'],
              ['source-notes', 'Source notes'],
              ['suggest-a-correction', 'Suggest a correction'],
              ['cite-this-paper', 'Cite this paper'],
            ].map(([id, label]) => (
              <li key={id}>
                <a href={`#${id}`} style={{ ...ad.btnGhost, minHeight: 44, padding: '8px 13px', fontSize: 14 }}>{label}</a>
              </li>
            ))}
          </ul>
        </nav>
      </section>
      <section id="study-at-a-glance" aria-labelledby="study-at-a-glance-heading" style={pp.section}>
        <p style={{ ...pp.projectBlurb, margin: '0 0 10px' }}>Proposed research</p>
        <h2 id="study-at-a-glance-heading" style={{ ...pp.sectionTitle, margin: 0 }}>Study at a glance</h2>
        <ol style={{ ...pp.projectBlurb, paddingInlineStart: '1.5em', listStyle: 'decimal', display: 'grid', gap: 10 }}>
          <li><strong>14-day pilot.</strong> Check whether adults can record their sleep and complete brief attention tests reliably in everyday life.</li>
          <li><strong>28-day study, if the pilot checks pass.</strong> Compare how missed targets on the attention test change after shorter nights in adults with ADHD and in the comparison group.</li>
        </ol>
        <p style={pp.projectBlurb}><strong>Optional deadline task.</strong> Track a recurring task participants already do and test whether estimated time to spare helps predict missed deadlines.</p>
        <figure style={{ margin: '20px 0' }}>
          <img
            src="/research/adhd-study-sequence.webp"
            alt="Proposed study sequence. The team reviews pilot measurements without seeing the difference between groups, then finalizes the design or revises it before proceeding."
            width={1458}
            height={669}
            loading="lazy"
            decoding="async"
            style={pp.figureImage}
          />
          <figcaption style={{ marginTop: 10, color: TG_MUTED, fontSize: 14 }}>
            <a href={`${paperPdf}#page=21`} className="underline underline-offset-4">Study sequence in the manuscript (Figure 30, PDF p. 21)</a>
          </figcaption>
        </figure>
        <a href={`${paperPdf}#page=130`} className="underline underline-offset-4">Read the pilot methods (Appendix L, PDF p. 130)</a>
      </section>
      <section id="start-here" aria-labelledby="start-here-heading" style={pp.section}>
        <h2 id="start-here-heading" style={{ ...pp.sectionTitle, margin: 0 }}>Start here</h2>
        <p style={pp.projectBlurb}>Start with the example, then follow the evidence and the proposed study. These page numbers match the November PDF.</p>
        <ul role="list" style={{ listStyle: 'none', padding: 0, margin: '20px 0 0' }}>
          {readingGuide.map((entry) => (
            <li key={entry.page} style={{ padding: '18px 0', borderTop: '1px solid hsl(186 50% 40% / 0.28)' }}>
              <p style={{ margin: '0 0 6px', color: TG_MUTED, fontSize: 14 }}>{entry.label}</p>
              <h3 style={{ margin: 0, color: '#fff', fontSize: 20 }}>
                <a href={`${paperPdf}#page=${entry.page}`} className="underline underline-offset-4">
                  {entry.title} <span style={{ color: TG_MUTED, fontSize: 15 }}>(PDF, p. {entry.page})</span>
                </a>
              </h3>
              <p style={{ ...pp.projectBlurb, margin: '8px 0 0' }}>
                {entry.summary}
                {'source' in entry && <> (<a href={entry.source} className="underline underline-offset-4">Becker et al., 2019</a>)</>}
              </p>
            </li>
          ))}
        </ul>
      </section>
      <section id="figure-1" aria-labelledby="figure-1-heading" style={pp.section}>
        <h2 id="figure-1-heading" style={{ ...pp.sectionTitle, margin: 0 }}>Figure 1. The same drop can have different effects</h2>
        <figure style={{ margin: '20px 0 0' }}>
          <img
            src="/research/adhd-v34-figure-1.jpg"
            alt="Line chart showing three hypothetical changes in task performance against a 60-point requirement."
            width={2025}
            height={1181}
            loading="lazy"
            decoding="async"
            style={pp.figureImage}
          />
          <figcaption style={{ marginTop: 10, color: TG_MUTED, fontSize: 14 }}>
            Hypothetical values for illustration. A, B, and C do not represent diagnostic groups.{' '}
            <a href={`${paperPdf}#page=10`} className="underline underline-offset-4">View Figure 1 in the paper (PDF, p. 10)</a>
          </figcaption>
        </figure>
        <p style={pp.projectBlurb}>
          The task requires 60 points. A and B both lose 10 points, but A goes from 85 to 75 and still meets the requirement, while B goes from 65 to 55 and falls below it. C starts at 65, just like B, but drops to 45. B had less room to lose points than A, while C’s score was more sensitive to the same change.
        </p>
      </section>
      <section id="key-terms" aria-labelledby="key-terms-heading" style={pp.section}>
        <h2 id="key-terms-heading" style={{ ...pp.sectionTitle, margin: 0 }}>Key terms</h2>
        <dl style={{ ...pp.projectBlurb, display: 'grid', gap: 14 }}>
          {[
            ['Functional margin', 'A person’s margin is the gap between their current performance and what a specific task requires.'],
            ['Bodily reactivity', 'This describes how strongly the body responds to a given challenge.'],
            ['Cognitive sensitivity', 'This describes how much thinking or task performance changes for a given amount of bodily change.'],
            ['Recovery', 'This describes how a measured outcome returns toward a defined level after a disturbance.'],
          ].map(([term, definition]) => (
            <div key={term}>
              <dt style={{ fontWeight: 700, color: '#fff' }}>{term}</dt>
              <dd style={{ margin: 0 }}>{definition}</dd>
            </div>
          ))}
        </dl>
        <figure style={{ margin: '20px 0' }}>
          <img
            src="/research/adhd-recovery-example.webp"
            alt="Hypothetical example. A bodily measure returns to its starting level in one hour for both people. Attention returns in one hour for one person and three hours for the other."
            width={1540}
            height={902}
            loading="lazy"
            decoding="async"
            style={pp.figureImage}
          />
          <figcaption style={{ marginTop: 10, color: TG_MUTED, fontSize: 14 }}>
            The chart uses invented times to show how attention and a bodily measure could recover at different rates.{' '}
            <a href={`${paperPdf}#page=12`} className="underline underline-offset-4">Read the worked example (PDF, p. 12)</a>
          </figcaption>
        </figure>
        <a href={`${paperPdf}#page=102`} className="underline underline-offset-4">Read the full glossary (PDF, p. 102)</a>
      </section>
      <section id="what-would-change-our-minds" aria-labelledby="what-would-change-our-minds-heading" style={pp.section}>
        <h2 id="what-would-change-our-minds-heading" style={{ ...pp.sectionTitle, margin: 0 }}>What would change our minds?</h2>
        <ul style={{ ...pp.projectBlurb, listStyle: 'disc', paddingInlineStart: '1.25em', display: 'grid', gap: 14 }}>
          <li>
            <strong>What would warrant a follow-up.</strong> A clear, meaningful difference in how missed targets change after shorter nights would justify testing the sleep question under controlled conditions.{' '}
            <a href={`${paperPdf}#page=25`} className="underline underline-offset-4">What the results would justify (PDF, p. 25)</a>
          </li>
          <li>
            <strong>What would weaken the predictions.</strong> A precise, negligible sleep difference would narrow the attention claim. For the optional task, use the simpler model if the comparison rules out a worthwhile gain from estimating time to spare.{' '}
            <a href={`${paperPdf}#page=23`} className="underline underline-offset-4">Table 7A. How to interpret both results (PDF, p. 23)</a>
          </li>
          <li>
            <strong>What’s still open.</strong> Unreliable measurements or too few observations would leave either study question open. How strongly the body responds to a challenge and how long recovery takes require separate tests.
          </li>
        </ul>
      </section>
      <section id="source-notes" aria-labelledby="source-notes-heading" style={pp.section}>
        <h2 id="source-notes-heading" style={{ ...pp.sectionTitle, margin: 0 }}>Source notes</h2>
        <p style={pp.projectBlurb}>Appendix I records which sources were checked and where questions remain. Read these journal notices alongside the studies.</p>
        <a href={`${paperPdf}#page=120`} className="underline underline-offset-4">Read the source audit (PDF, p. 120)</a>
        <ul role="list" style={{ listStyle: 'none', padding: 0, margin: '20px 0 0' }}>
          {sourceNotes.map(({ reference, title, page, note, notice, url }) => (
            <li key={reference} style={{ padding: '16px 0', borderTop: '1px solid hsl(186 50% 40% / 0.28)' }}>
              <h3 style={{ margin: 0, color: '#fff', fontSize: 18 }}>{title}</h3>
              <p style={{ ...pp.projectBlurb, margin: '8px 0' }}>{note}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px 16px', fontSize: 15 }}>
                <a href={url} className="underline underline-offset-4" aria-label={`${notice} for ${title}`}>{notice}</a>
                <a href={`${paperPdf}#page=${page}`} className="underline underline-offset-4">Reference {reference} (PDF, p. {page})</a>
              </div>
            </li>
          ))}
        </ul>
      </section>
      <section id="suggest-a-correction" aria-labelledby="suggest-a-correction-heading" style={pp.section}>
        <h2 id="suggest-a-correction-heading" style={{ ...pp.sectionTitle, margin: 0 }}>Suggest a correction</h2>
        <p style={pp.projectBlurb}>
          Include the edition, PDF page or reference number, what needs correcting, and a source link if you have one.
        </p>
        <a href={correctionEmail} style={{ ...ad.btnGhost, marginTop: 16 }}>Email a correction</a>
      </section>
      <section id="cite-this-paper" aria-labelledby="cite-this-paper-heading" style={pp.section}>
        <h2 id="cite-this-paper-heading" style={{ ...pp.sectionTitle, margin: 0 }}>Cite this paper</h2>
        <p style={{ ...pp.projectBlurb, overflowWrap: 'anywhere', userSelect: 'text' }}>
          {citationDetails}{' '}
          <a href={paperUrl} className="underline underline-offset-4">{paperUrl}</a>
        </p>
        <style>{'[data-prerender-route] .research-copy-citation { display: none !important; }'}</style>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '8px 14px', marginTop: 16 }}>
          <button type="button" className="research-copy-citation" onClick={() => void copyCitation()} style={ad.btnGhost}>Copy citation</button>
          <span role="status" style={{ color: TG_MUTED, fontSize: 14 }}>{copyStatus}</span>
        </div>
      </section>
    </AuroraPage>
  );
}
