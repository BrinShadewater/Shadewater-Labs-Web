# Brin Shadewater Website - AI Agent Instructions

## Project Overview
Personal brand website for streamer/content creator Brin Shadewater. Built with React + Vite + TypeScript + Tailwind CSS + shadcn/ui.

**Stack:** React 19, Vite 7, TypeScript 5.9, no additional libraries

## Core Rules (Non-Negotiable)

### DO NOT Modify Core Files
Never touch these without explicit instruction:
- [main.tsx](../src/main.tsx)
- [App.tsx](../src/App.tsx)
- [vite.config.ts](../vite.config.ts)
- Any routing or root layout files

### DO NOT Refactor Working Code
If it works, leave it alone. No "cleanup," "simplification," or "optimization" unless requested.

### DO NOT Introduce New Libraries
Use only: React, Vite, TypeScript, Tailwind CSS, shadcn/ui. No date-fns, framer-motion, class-variance-authority, or any other packages.

### DO NOT Change File Structure
Respect existing folder organization. New components go where similar components live.

## Design System (Strict - Do Not Substitute)

### Color Palette
```css
--background: hsl(220 25% 8%)     /* Deep charcoal (never pure black) */
--primary: hsl(320 80% 65%)       /* Soft magenta/violet glow (never neon) */
--secondary: hsl(150 30% 45%)     /* Muted plant green */
--foreground: hsl(45 20% 95%)     /* Warm off-white (never pure white) */
```

### Typography
- **UI/headings:** Space Grotesk
- **Long-form reading:** Crimson Pro
- Use comfortable reading width and line height for essays

### UI Language
- Rounded cards with soft shadows
- Minimal borders
- Subtle hover/focus states (no aggressive animations)
- No glassmorphism or heavy gradients
- "Cozy nighttime room" aesthetic

## Project Structure

```
src/
  components/     # Reusable UI components
  pages/          # Page-level components
  content/        # Mock data objects
```

## Required Components
- `StatPill` - Stats display (followers, views, etc.)
- `ContentCard` - Featured content cards
- `CategoryChip` - Filter chips for notes
- `LiveStatusBadge` - Stream status indicator
- Sticky Navbar
- Footer with social icons

## Pages to Implement
1. **Home:** Hero, stats, featured content, Discord callout
2. **Stream:** Twitch embed placeholder, schedule, community rules
3. **Notes:** Filterable grid (Movies/TV/Games/Tech), links to detail pages
4. **Post Detail:** Long-form reading layout, YouTube embed placeholder
5. **Community:** Discord invite, values list, "Meet Margot" mention
6. **About:** First-person bio, interest tags
7. **Links:** Social hub with large touch-friendly buttons

## Data Handling
- Use structured placeholder/mock data objects in `/content`
- Do NOT hardcode copy directly in JSX where data structures are appropriate
- No backend, auth, or real API integrations
- Use embed placeholders (Twitch, YouTube) - do not implement real iframes yet

## Coding Style
- Small, explicit, readable components
- Tailwind utility classes preferred over custom CSS
- Clear prop interfaces with TypeScript
- Mobile-first responsive design
- Avoid over-engineering, clever tricks, or "enterprise" patterns

## When Unsure
Ask for clarification instead of guessing. Never assume future requirements.
