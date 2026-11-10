const base = '/webp-example/labs-homepage';
const alt = 'Shadewater Labs homepage with its headline, flask logo, and links to BrineSpace and open-source tools.';

export const webpExample = {
  title: 'From one screenshot to four WebPs',
  description: 'A worked Webp Me Daddy example showing how to serve responsive WebP images with srcset and sizes.',
  source: { src: `${base}-source.jpg`, width: 1440, height: 850, bytes: 96423, alt },
  preview: { src: `${base}.webp`, width: 800, height: 450, alt },
  variants: [
    { src: `${base}-320w.webp`, width: 320, height: 180, bytes: 7386, use: 'Narrow cards' },
    { src: `${base}-480w.webp`, width: 480, height: 270, bytes: 13408, use: 'Wider cards' },
    { src: `${base}-768w.webp`, width: 768, height: 432, bytes: 24906, use: 'Wide or high-density cards' },
    { src: `${base}.webp`, width: 800, height: 450, bytes: 26556, use: 'Largest preview and fallback' },
  ],
} as const;
