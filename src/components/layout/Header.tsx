import { useState } from 'react';
import { Link, useLocation } from 'react-router';
import { Menu, X } from 'lucide-react';
import { Container } from './Container';
import { getNavRoutes } from '@/config/routes';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navRoutes = getNavRoutes();

  const handleNavClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Skip to main content link for keyboard accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2 focus:bg-brand focus:text-on-brand focus:font-semibold focus:rounded-md focus:shadow-md focus:outline-2 focus:outline-focus"
      >
        Skip to content
      </a>

      <header
        className="sticky top-0 z-40 w-full border-b border-subtle backdrop-blur-sm"
        style={{ background: 'rgba(255,255,255,0.97)' }}
      >
        <Container className="flex items-center justify-between h-16">
          {/* Logo / Wordmark */}
          <Link
            to="/"
            className="flex items-center gap-3 no-underline text-default focus-visible:ring-2 focus-visible:ring-focus rounded-md py-1 shrink-0"
            aria-label="Amartya Finance Society - Home"
            onClick={handleNavClick}
          >
            <img
              src="/favicon.svg"
              alt="Amartya Finance Society"
              width="36"
              height="36"
              className="w-9 h-9 rounded-lg shrink-0 object-contain shadow-xs border border-subtle/50 bg-white"
            />
            <div className="flex flex-col">
              <span className="font-display font-bold text-xl tracking-tight leading-none text-default whitespace-nowrap">
                Amartya
              </span>
              <span className="text-[10px] text-muted tracking-wide leading-tight whitespace-nowrap">
                Finance Society · IITM BS
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav
            className="hidden md:flex items-center gap-6 lg:gap-8 h-full shrink-0"
            aria-label="Main Navigation"
          >
            {navRoutes.map((route) => {
              const isActive =
                route.path === '/'
                  ? location.pathname === '/'
                  : location.pathname.startsWith(route.path);

              return (
                <Link
                  key={route.id}
                  to={route.path}
                  className="text-sm font-medium transition-colors no-underline h-full flex items-center whitespace-nowrap"
                  style={{
                    color: isActive ? 'var(--c-ink)' : 'var(--c-ink-mid)',
                    fontWeight: isActive ? 600 : 500,
                    borderBottom: isActive
                      ? '2px solid var(--c-orange)'
                      : '2px solid transparent',
                  }}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {route.label}
                </Link>
              );
            })}

            {/* Contact Nav Item (scrolls to footer #contact) */}
            <a
              href="#contact"
              className="text-sm font-medium text-muted hover:text-default transition-colors no-underline h-full flex items-center whitespace-nowrap"
              style={{ borderBottom: '2px solid transparent' }}
            >
              Contact
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-default hover:text-brand min-w-[44px] min-h-[44px] transition-colors focus-visible:ring-2 focus-visible:ring-focus"
              aria-controls="mobile-navigation"
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? 'Close main menu' : 'Open main menu'}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" aria-hidden="true" />
              ) : (
                <Menu className="w-6 h-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </Container>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <nav
            id="mobile-navigation"
            className="md:hidden border-t border-subtle px-4 py-3 space-y-1 shadow-lg"
            style={{ background: 'rgba(255,255,255,0.98)' }}
            aria-label="Mobile Navigation"
          >
            {navRoutes.map((route) => {
              const isActive =
                route.path === '/'
                  ? location.pathname === '/'
                  : location.pathname.startsWith(route.path);

              return (
                <Link
                  key={route.id}
                  to={route.path}
                  className="block py-2.5 text-base font-medium min-h-[44px] flex items-center no-underline transition-colors border-l-2 pl-3"
                  style={{
                    color: isActive ? 'var(--c-orange)' : 'var(--c-ink-mid)',
                    fontWeight: isActive ? 600 : 500,
                    borderLeftColor: isActive ? 'var(--c-orange)' : 'transparent',
                  }}
                  aria-current={isActive ? 'page' : undefined}
                  onClick={handleNavClick}
                >
                  {route.label}
                </Link>
              );
            })}
            <a
              href="#contact"
              className="block py-2.5 text-base font-medium min-h-[44px] flex items-center no-underline transition-colors border-l-2 pl-3 border-transparent"
              style={{ color: 'var(--c-ink-mid)' }}
              onClick={handleNavClick}
            >
              Contact
            </a>
          </nav>
        )}
      </header>
    </>
  );
}
