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
      'The main Brin Shadewater home base for streams, reviews, community updates, sponsor information, and creator identity.',
    updated: lastPush('brinshadewater'),
  },
  {
    id: 'shadewaterlabs',
    name: 'Shadewater Labs',
    url: 'https://shadewaterlabs.com',
    role: 'Technology studio',
    status: 'Live',
    description:
      'The dedicated home for Labs projects, AI tools, managed websites, product experiments, and future technology notes.',
    updated: lastPush('shadewaterlabs'),
  },
  {
    id: 'datagoblin',
    name: 'Data Goblin',
    url: 'https://datagoblin.ca',
    role: 'Field guide',
    status: 'Live',
    description:
      'A free, bilingual field guide to AI, power, and data in Canada. Twenty-one chapters with a receipt behind every claim, plus a glossary, source ledger, and a claim-testing toolkit.',
    updated: lastPush('datagoblin'),
  },
  {
    id: 'inkmasterstudio',
    name: 'InkMaster Studio',
    url: 'https://inkmasterstudio.com',
    role: 'Product site',
    status: 'Beta',
    description:
      'A focused web product for apparel artwork cleanup, DTG print prep, underbase generation, mockup previews, and export workflows.',
    updated: lastPush('inkmasterstudio'),
  },
  {
    id: 'strangeharvestmovie',
    name: 'Strange Harvest Movie',
    url: 'https://strangeharvestmovie.com',
    role: 'Film site',
    status: 'Live',
    description:
      'A dedicated movie website for the Strange Harvest project, maintained as part of the Shadewater Labs managed web portfolio.',
    updated: lastPush('strangeharvestmovie'),
  },
  {
    id: 'strangeharvestmerch',
    name: 'Strange Harvest Merch Store',
    url: 'https://strangeharvestmovie.myshopify.com',
    role: 'Shopify store',
    status: 'Live',
    description:
      'Official merchandise store for Strange Harvest, built on Shopify. Apparel, prints, and collectibles tied to the film.',
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
