import { AuroraPage, ad, pp, type AuroraNavigate } from '@/components/aurora/chrome';

export default function Research({ onNavigate }: { onNavigate: AuroraNavigate }) {
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
            Physiological State and Executive Function in ADHD
          </h2>
          <p style={pp.projectBlurb}>Alex Yesilcimen · 6 September 2026 · Illustrated edition v34</p>
          <p style={pp.projectBlurb}>
            The paper asks whether changes in the body can help explain day-to-day shifts in attention, mental effort, and recovery. It lays out ways to test that idea while accounting for sleep, medication timing, and context.
          </p>
          <p style={pp.projectBlurb}>
            The paper draws on existing studies and proposes hypotheses for future research. It has not been peer reviewed and contains no original participant data.
          </p>
          <a
            href="/research/physiological-state-and-executive-function-in-adhd-v34.pdf"
            style={{ ...ad.btnPrimary, marginTop: 16 }}
          >
            Read the paper (PDF, 6.9 MB)
          </a>
        </article>
      </section>
    </AuroraPage>
  );
}
