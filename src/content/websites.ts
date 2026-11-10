/**
 * Managed web properties. `updated` is the last push to each site's repo, written by
 * `scripts/refresh-updated.mjs` on every build; the two private repos keep the last value
 * that resolved (see that script for how to refresh them with a token).
 */
import { lastPush } from './lastPush';

export const managedWebsites = [
  {
    id: 'brinshadewater',
    name: 'Brin Shadewater',
    url: 'https://brinshadewater.com',
    role: 'Creator hub',
    status: 'Live',
    description:
      'Brin Shadewater’s creator site for late-night streams, game and film reviews, and community updates.',
    updated: lastPush('brinshadewater'),
  },
  {
    id: 'shadewaterlabs',
    name: 'Shadewater Labs',
    url: 'https://shadewaterlabs.com',
    role: 'Technology studio',
    status: 'Live',
    description:
      'The studio site for BrineSpace, open-source tools, managed websites, and creative technology prototypes.',
    updated: lastPush('shadewaterlabs'),
  },
  {
    id: 'datagoblin',
    name: 'Data Goblin',
    url: 'https://datagoblin.ca',
    role: 'Field guide',
    status: 'Live',
    description:
      'A free, bilingual field guide to AI, power, and data in Canada. Chapters, a glossary, receipts, search, notes, and listening tools. Open verification flags stay visible in the reader.',
    updated: lastPush('datagoblin'),
  },
  {
    id: 'inkmasterstudio',
    name: 'InkMaster Studio',
    url: 'https://inkmasterstudio.com',
    role: 'Print-prep editor',
    status: 'Live',
    description:
      'A canvas editor for apparel artwork with layers, background removal, upscaling, mockups, and Printify-ready PNG exports. Projects are saved in the browser. Optional AI cleanup sends the image to a server-side service.',
    updated: lastPush('inkmasterstudio'),
  },
  {
    id: 'strangeharvestmovie',
    name: 'Strange Harvest Movie',
    url: 'https://strangeharvestmovie.com',
    role: 'Film site',
    status: 'Live',
    description:
      'The official site for the 2025 horror mockumentary, with the trailer, viewing options, DVD information, press coverage, and behind-the-scenes material.',
    updated: lastPush('strangeharvestmovie'),
  },
  {
    id: 'strangeharvestmerch',
    name: 'Strange Harvest Merch Store',
    url: 'https://strangeharvestmovie.myshopify.com',
    role: 'Shopify store',
    status: 'Unavailable',
    description:
      'The Shopify storefront for Strange Harvest merchandise is currently unavailable.',
    updated: lastPush('strangeharvestmerch'),
  },
  {
    id: 'losthills',
    name: 'Lost Hills Online',
    url: 'https://losthills.net',
    role: 'Fiction site',
    status: 'Live',
    description:
      'An interactive period-piece fiction: the restored municipal information network of Lost Hills, Washington, frozen in its 1993 CityNet form — public records, civic notices, and a town that is not quite right.',
    updated: lastPush('losthills'),
  },
] as const;
