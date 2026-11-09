import { useState } from 'react';
import { AuroraPage, TG_MUTED, ad, pp, type AuroraNavigate } from '@/components/aurora/chrome';
import { LABS_ORIGIN } from '@/lib/routes';

const paperPdf = '/research/physiological-state-and-executive-function-in-adhd-v34.pdf';
const paperUrl = `${LABS_ORIGIN}${paperPdf}`;
const paperAuthor = 'Alex Yesilcimen';
const paperTitle = 'Physiological State and Executive Function in ADHD';
const paperDate = '6 September 2026';
const paperEdition = 'Illustrated research edition v34';
const citationTitle = `${paperTitle}: An integrated brain–body hypothesis of fluctuating attention, effort and recovery`;
const citationDetails = `${paperAuthor}. (${paperDate}). ${citationTitle} (${paperEdition}). Shadewater Labs.`;

const readingGuide = [
  {
    title: 'The idea in plain language',
    label: 'Proposed hypothesis',
    page: 2,
    summary: 'The paper asks whether changes in the body could help explain why attention and mental effort vary from day to day for the same person.',
  },
  {
    title: 'How to read the evidence',
    label: 'Reading guide',
    page: 5,
    summary: 'Learn to tell published results and calculations based on them apart from explanatory diagrams, and check what each chart actually measures.',
  },
  {
    title: 'Sleep, alertness, and effort in ADHD',
    label: 'Existing studies',
    page: 15,
    summary: 'In one sleep study of teens with ADHD, parents reported more inattention after shorter sleep, while scores on a sustained-attention task did not show a clear change.',
    source: 'https://pubmed.ncbi.nlm.nih.gov/30768404/',
  },
  {
    title: 'How the hypothesis could be tested',
    label: 'Proposed research',
    page: 74,
    summary: 'The paper proposes repeated daily measurements of attention, sleep, symptoms, and everyday functioning to test whether the added measures improve on simpler explanations.',
  },
] as const;

const sourceNotes = [
  {
    reference: 126,
    title: 'Exenatide trial in Parkinson’s disease',
    page: 47,
    note: 'The Lancet published an expression of concern about this trial after a regulatory inspection raised concerns about trial conduct and oversight at one study site. Read the result in v34 alongside that notice.',
    notice: 'Expression of concern',
    url: 'https://pubmed.ncbi.nlm.nih.gov/42330995/',
  },
  {
    reference: 190,
    title: 'RECOVER-VITAL trial',
    page: 113,
    note: 'The Lancet Infectious Diseases added Marta Cerda as an author in its October 2026 correction. The estimates and confidence intervals in Figure 42 match the corrected article.',
    notice: 'Publisher correction',
    url: 'https://www.thelancet.com/journals/laninf/article/PIIS1473-3099(26)00586-4/fulltext',
  },
  {
    reference: 215,
    title: 'PROMOTe trial',
    page: 65,
    note: 'The paper discusses the correction. This is the link to the journal’s notice.',
    notice: 'Author correction',
    url: 'https://doi.org/10.1038/s41467-025-58771-w',
  },
  {
    reference: 223,
    title: 'Microplastics in human brain tissue',
    page: 67,
    note: 'The paper discusses the correction. This is the link to the journal’s notice.',
    notice: 'Author correction',
    url: 'https://doi.org/10.1038/s41591-025-03675-x',
  },
  {
    reference: 238,
    title: 'Dietary preferences and the autism microbiome',
    page: 72,
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
      onNavigate={onNavigate}
      sectionLabel="Research"
      eyebrow="SHADEWATER LABS"
      title="Research"
      lede="Research perspectives from Shadewater Labs, starting with a question about why attention and effort can vary from day to day for the same person with ADHD."
    >
      <section aria-labelledby="adhd" style={{ ...pp.section, maxWidth: 800 }}>
        <article style={{ padding: 'clamp(1.25rem, 4vw, 2.25rem)', borderRadius: 'var(--ad-card-radius)', background: 'var(--ad-panel)', border: '1px solid hsl(186 50% 40% / 0.28)' }}>
          <p style={{ ...pp.projectBlurb, margin: '0 0 10px' }}>Research perspective · ADHD</p>
          <h2 id="adhd" style={{ margin: 0, color: '#fff', fontSize: 'clamp(1.5rem, 4vw, 2.25rem)', lineHeight: 1.15 }}>
            {paperTitle}
          </h2>
          <p style={pp.projectBlurb}>{paperAuthor} · {paperDate} · {paperEdition}</p>
          <p style={pp.projectBlurb}>
            The paper asks whether changes in the body can help explain day-to-day shifts in attention, mental effort, and recovery. It lays out ways to test that idea while accounting for sleep, medication timing, and context.
          </p>
          <p style={pp.projectBlurb}>
            The paper draws on existing studies and proposes hypotheses for future research. It has not been peer reviewed and contains no original participant data.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '12px 20px', marginTop: 20 }}>
            <a href={paperPdf} style={ad.btnPrimary}>Read the paper (PDF, 6.9 MB)</a>
            <a href="#start-here" className="underline underline-offset-4">Jump to the reading guide</a>
            <a href="#source-notes" className="underline underline-offset-4">Source notes for v34</a>
          </div>
        </article>
      </section>
      <section id="start-here" aria-labelledby="start-here-heading" style={{ ...pp.section, maxWidth: 800 }}>
        <h2 id="start-here-heading" style={{ margin: 0, color: '#fff', fontSize: 'clamp(1.5rem, 4vw, 2.25rem)' }}>Start here</h2>
        <p style={pp.projectBlurb}>Four places to begin in the illustrated edition. Each link includes the page number so you can also find it in a downloaded copy.</p>
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
      <section id="what-would-change-our-minds" aria-labelledby="what-would-change-our-minds-heading" style={{ ...pp.section, maxWidth: 800 }}>
        <h2 id="what-would-change-our-minds-heading" style={{ margin: 0, color: '#fff', fontSize: 'clamp(1.5rem, 4vw, 2.25rem)' }}>What would change our minds?</h2>
        <ul style={{ ...pp.projectBlurb, listStyle: 'disc', paddingInlineStart: '1.25em', display: 'grid', gap: 14 }}>
          <li>
            <strong>What would support it.</strong> Measures like pain and fatigue would need to improve predictions of later changes in attention or daily functioning beyond what usual performance, recent sleep, and medication timing can already explain.{' '}
            <a href={`${paperPdf}#page=74`} className="underline underline-offset-4">Proposed study design (PDF, p. 74)</a>
          </li>
          <li>
            <strong>What would weaken it.</strong> If the simpler model predicts later changes just as well, or the pattern disappears when tested in new observations, the broader hypothesis loses support.{' '}
            <a href={`${paperPdf}#page=83`} className="underline underline-offset-4">Table 7. Results that would weaken the hypothesis (PDF, p. 83)</a>
          </li>
          <li>
            <strong>What’s still open.</strong> The existing studies leave open whether people with ADHD start from a different baseline, experience a larger change, or recover more slowly under comparable conditions.
          </li>
        </ul>
      </section>
      <section id="source-notes" aria-labelledby="source-notes-heading" style={{ ...pp.section, maxWidth: 800 }}>
        <h2 id="source-notes-heading" style={{ margin: 0, color: '#fff', fontSize: 'clamp(1.5rem, 4vw, 2.25rem)' }}>Source notes for v34</h2>
        <p style={pp.projectBlurb}>Read these journal notices alongside the cited studies in the illustrated edition.</p>
        <ul role="list" style={{ listStyle: 'none', padding: 0, margin: '20px 0 0' }}>
          {sourceNotes.map(({ reference, title, page, note, notice, url }) => (
            <li key={reference} style={{ padding: '16px 0', borderTop: '1px solid hsl(186 50% 40% / 0.28)' }}>
              <h3 style={{ margin: 0, color: '#fff', fontSize: 18 }}>{title}</h3>
              <p style={{ ...pp.projectBlurb, margin: '8px 0' }}>{note}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px 16px', fontSize: 15 }}>
                <a href={url} className="underline underline-offset-4" aria-label={`${notice} for ${title}`}>{notice}</a>
                <a href={`${paperPdf}#page=${page}`} className="underline underline-offset-4">Reference {reference} discussion (PDF, p. {page})</a>
              </div>
            </li>
          ))}
        </ul>
      </section>
      <section id="cite-this-paper" aria-labelledby="cite-this-paper-heading" style={{ ...pp.section, maxWidth: 800 }}>
        <h2 id="cite-this-paper-heading" style={{ margin: 0, color: '#fff', fontSize: 'clamp(1.5rem, 4vw, 2.25rem)' }}>Cite this paper</h2>
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
