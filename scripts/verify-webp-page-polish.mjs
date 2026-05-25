import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const webpPage = fs.readFileSync(path.join(root, 'src/pages/WebpMeDaddy.tsx'), 'utf8');
const productPage = fs.readFileSync(path.join(root, 'src/components/aurora/ProductPage.tsx'), 'utf8');
const pdfGenerator = fs.readFileSync(path.join(root, 'scripts/generate_explainer_pdfs.py'), 'utf8');

const requiredAssets = [
  'public/webp-me-daddy-proof-review-hero.webp',
  'public/webp-me-daddy-proof-logo-lockup.webp',
  'public/webp-me-daddy-proof-batch-contact-sheet.webp',
];

const failures = [];

if (!webpPage.includes("primaryHref: '#core-workflow'")) {
  failures.push('Webp primary CTA should jump to #core-workflow.');
}

if (webpPage.includes("data.cta.primaryHref = '/webp-me-daddy-explainer.pdf'")) {
  failures.push('Webp primary CTA should not be overwritten to the PDF.');
}

if (!productPage.includes('id="core-workflow"')) {
  failures.push('Product workflow section needs a stable core-workflow anchor.');
}

if (!productPage.includes('<img') || !productPage.includes('it.src')) {
  failures.push('Product showcase cards should render real images when a src is provided.');
}

for (const asset of requiredAssets) {
  if (!fs.existsSync(path.join(root, asset))) {
    failures.push(`Missing expected Webp output asset: ${asset}`);
  }

  const src = `/${path.basename(asset)}`;
  if (!webpPage.includes(src)) {
    failures.push(`Webp page should reference ${src}.`);
  }
}

if (!pdfGenerator.includes('webp-me-daddy-logo-lockup.webp')) {
  failures.push('Webp PDF generator should use the current Webp logo asset.');
}

if (!pdfGenerator.includes('webp-me-daddy-proof-batch-contact-sheet.webp')) {
  failures.push('Webp PDF generator should include the output proof imagery.');
}

if (failures.length) {
  console.error(failures.map((failure) => `- ${failure}`).join('\n'));
  process.exit(1);
}

console.log('Webp Me Daddy page polish checks passed.');
