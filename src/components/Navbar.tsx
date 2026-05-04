import { useState } from 'react';
import { LABS_ORIGIN, buildRouteHref } from '@/lib/routes';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export default function Navbar({ currentPage, onNavigate }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: 'Labs Home', path: 'labs' },
    { name: 'SEO Report', path: 'shadewater-seo-report' },
    { name: 'Webp Me Daddy', path: 'webp-me-daddy' },
    { name: 'InkMaster Studio', path: 'inkmaster-studio' },
    { name: 'Back To Brin', path: 'home' },
  ];

  const brandHref = LABS_ORIGIN;
  const brandEyebrow = 'AI Tools & Tech Experiments';
  const brandLabel = 'Go to Shadewater Labs homepage';

  return (
    <nav className="sticky top-0 z-50 border-b-2 border-white/10 bg-[hsl(210_66%_7%/0.94)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex min-h-18 items-center justify-between gap-4 py-3">
          <a
            href={brandHref}
            onClick={(event) => {
              event.preventDefault();
              onNavigate('labs');
            }}
            className="group min-w-0 max-w-full text-left"
            aria-label={brandLabel}
          >
            <span className="mb-1 block truncate text-[0.65rem] font-semibold uppercase tracking-[0.35em] text-[hsl(var(--sandstone-soft))]/85">
              {brandEyebrow}
            </span>
            <span
              className="block whitespace-nowrap text-[clamp(1.05rem,2vw,1.5rem)] font-bold leading-none transition-opacity group-hover:opacity-80"
              style={{ textShadow: '0 0 18px hsl(192 40% 40% / 0.18)' }}
            >
              <span className="text-[hsl(192_40%_35%)]">Shadewater</span>
              <span className="ml-1.5 text-white">Labs</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1.5 lg:gap-2">
            {navItems.map((item) => (
              <a
                key={item.path}
                href={buildRouteHref(item.path, undefined, 'labs')}
                onClick={(event) => {
                  event.preventDefault();
                  onNavigate(item.path);
                }}
                className={`rounded-full px-2.5 py-2 font-medium transition-all outline-none lg:px-3 ${
                  currentPage === item.path
                    ? 'bg-[linear-gradient(135deg,hsl(192_29%_21%),hsl(192_36%_28%))] text-primary-foreground shadow-[0_0_20px_hsl(192_40%_30%/0.3)]'
                    : 'text-foreground-muted hover:bg-white/5 hover:text-foreground'
                }`}
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="rounded-full border-2 border-white/10 bg-white/5 p-2 text-foreground md:hidden"
            aria-expanded={isMenuOpen}
            aria-label="Toggle navigation menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="space-y-2 border-t-2 border-white/10 py-4 md:hidden">
            {navItems.map((item) => (
              <a
                key={item.path}
                href={buildRouteHref(item.path, undefined, 'labs')}
                onClick={(event) => {
                  event.preventDefault();
                  onNavigate(item.path);
                  setIsMenuOpen(false);
                }}
                className={`block w-full rounded-2xl px-4 py-3 text-left font-medium transition-all outline-none ${
                  currentPage === item.path
                    ? 'bg-[linear-gradient(135deg,hsl(192_29%_21%),hsl(192_36%_28%))] text-primary-foreground shadow-[0_0_20px_hsl(192_40%_30%/0.3)]'
                    : 'text-foreground-muted hover:bg-white/5 hover:text-foreground'
                }`}
              >
                {item.name}
              </a>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
