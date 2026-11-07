/**
 * The toolkit — third-party tools actually used here.
 *
 * The bar for this list is *used on real work*, not "looks interesting". A tools page
 * that lists everything is a bookmark dump; one that lists what survived contact with
 * a deadline is worth reading.
 *
 * Say what it is used FOR, not what its marketing says it does. And where a tool has a
 * real limitation worth knowing, put it in `caveat` — that is the part a reader cannot
 * get from the vendor.
 */
export interface Tool {
  id: string;
  name: string;
  url: string;
  /** Grouping. Keep the set small; a category per tool is not a category. */
  category: 'Video & motion' | 'Image' | 'Agents & code' | 'Build & ship';
  /** What it is reached for here. */
  use: string;
  /** Optional: the honest limitation. Omit rather than invent one. */
  caveat?: string;
}

export const tools: Tool[] = [
  {
    id: 'codex', name: 'Codex', url: 'https://openai.com/codex/', category: 'Agents & code',
    use: 'Repository work, implementation, and verification across the sites, agent tools, and BrineSpace.',
  },
  {
    id: 'godot', name: 'Godot', url: 'https://godotengine.org/', category: 'Build & ship',
    use: 'The engine behind BrineSpace: station simulation, room placement, interface work, and desktop builds.',
  },
  {
    id: 'higgsfield',
    name: 'Higgsfield',
    url: 'https://higgsfield.ai',
    category: 'Video & motion',
    use: 'AI video generation for motion tests and shot ideas, where the point is to see whether an idea reads before committing a real shoot to it.',
  },
  {
    id: 'topaz',
    name: 'Topaz',
    url: 'https://www.topazlabs.com',
    category: 'Video & motion',
    use: 'Upscaling and cleanup on footage and stills that are otherwise fine but were not captured at the size the final needs.',
  },
  {
    id: 'claude-code',
    name: 'Claude Code',
    url: 'https://claude.com/product/claude-code',
    category: 'Agents & code',
    use: 'An agent workspace for building and maintaining sites and tools. The published skills include Claude Code workflows alongside portable instructions and standalone helpers.',
  },
  {
    id: 'vercel',
    name: 'Vercel',
    url: 'https://vercel.com',
    category: 'Build & ship',
    use: 'Git-connected deployment for the studio’s web apps. Redirects and headers live in each repo, so hosting config is reviewable in the same diff as the code.',
  },
];
