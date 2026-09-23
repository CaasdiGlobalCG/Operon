import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Link, NavLink } from 'react-router-dom';
import { Mark, PlatformLogo } from '../components/Logo';
import SearchDog from '../components/SearchDog';
import { Button, Container, ExternalLink, MonoLabel, ScrollProgress, useNavHidden } from '../components/ui';
import { O360, O360_FOOTER, O360_NAV, O360_NAV_CTA } from '../lib/site';

/**
 * Operon 360 shell. The product site runs chrome in Ink, per the brand's
 * in-application rules — navigation and footer are dark, the working canvas
 * stays Paper. Same design system, inverted surface.
 */
export default function Operon360Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <O360Nav />
      <main id="main" className="flex-1">
        <Outlet />
      </main>
      <O360Footer />
      <SearchDog />
    </div>
  );
}

function O360Nav() {
  const [open, setOpen] = useState(false);
  const navHidden = useNavHidden();
  const { pathname } = useLocation();
  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={`sticky top-0 z-40 bg-ink text-paper transition-transform duration-300 ease-signal ${
        navHidden && !open ? '-translate-y-full' : ''
      }`}
      style={{ paddingTop: 'env(safe-area-inset-top, 0px)' }}
    >
      <ScrollProgress tone="paper" />
      <Container className="flex h-16 items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <PlatformLogo tone="white" height={20} />
          <Link
            to="/"
            className="hidden border-l border-paper-14 pl-4 font-mono text-mono-xs uppercase text-paper-55 transition-colors duration-180 hover:text-paper sm:block"
          >
            by Operon Softwares
          </Link>
        </div>

        <nav aria-label="Operon 360 primary" className="hidden items-center gap-7 lg:flex">
          {O360_NAV.map((item) => (
            <NavLink
              key={item.label}
              to={item.to}
              end={item.to === O360}
              className={({ isActive }) =>
                `relative pb-1 text-sm transition-colors duration-180 after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-left after:bg-current after:transition-transform after:duration-200 ${
                  isActive && !item.to.includes('#')
                    ? 'text-paper after:scale-x-100'
                    : 'text-paper-55 after:scale-x-0 hover:text-paper'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
          <ExternalLink
            tone="paper"
            className="pb-1 text-sm text-paper-55 transition-colors duration-180 hover:text-paper"
          >
            Graviyx
          </ExternalLink>
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          {O360_NAV_CTA.map((cta) => (
            <Button key={cta.label} to={cta.to} tone="ink" variant={cta.primary ? 'primary' : 'secondary'}>
              {cta.label}
            </Button>
          ))}
        </div>

        <button
          type="button"
          className="lg:hidden"
          aria-expanded={open}
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((o) => !o)}
        >
          <svg viewBox="0 0 20 14" width="22" height="16" stroke="currentColor" strokeWidth="1.5" fill="none" aria-hidden="true">
            {open ? <path d="M3 2l14 10M17 2 3 12" strokeLinecap="square" /> : <path d="M0 1h20M0 7h20M0 13h20" />}
          </svg>
        </button>
      </Container>

      {open && (
        <div className="animate-menu-in border-t border-paper-14 bg-ink lg:hidden">
          <Container className="py-6">
            <nav aria-label="Operon 360 mobile" className="flex flex-col">
              {O360_NAV.map((item, i) => (
                <NavLink
                  key={item.label}
                  to={item.to}
                  className="menu-link border-b border-paper-08 py-3.5 font-display text-h4 font-semibold"
                  style={{ animationDelay: `${60 + i * 45}ms` }}
                >
                  {item.label}
                </NavLink>
              ))}
              <ExternalLink tone="paper" className="py-3.5 font-display text-h4 font-semibold text-paper">
                Graviyx
              </ExternalLink>
            </nav>
            <div className="mt-6 flex flex-col gap-3">
              {O360_NAV_CTA.map((cta) => (
                <Button key={cta.label} to={cta.to} tone="ink" variant={cta.primary ? 'primary' : 'secondary'} className="w-full">
                  {cta.label}
                </Button>
              ))}
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}

function O360Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-ink-14 bg-cloud text-ink">
      <Container className="py-16 md:py-20">
        <div className="grid grid-cols-2 gap-x-8 gap-y-10 border-b border-ink-14 pb-12 md:grid-cols-3 lg:grid-cols-5">
          {O360_FOOTER.map((col) => (
            <div key={col.title}>
              <MonoLabel>{col.title}</MonoLabel>
              <ul className="mt-4 flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    {link.external ? (
                      <ExternalLink target={link.external} className="text-sm text-ink-70 hover:text-ink">
                        {link.label}
                      </ExternalLink>
                    ) : (
                      <Link to={link.to} className="text-sm text-ink-70 transition-colors duration-180 hover:text-ink">
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-6 pt-10 md:flex-row md:items-end md:justify-between">
          <div className="max-w-prose">
            <Mark variant="symbol" height={24} />
            <p className="mt-5 text-sm text-ink-70">
              Operon 360 is a platform built and operated by Operon Softwares Private Limited. Operon 360 is not a separate
              legal entity.
            </p>
          </div>
          <div className="flex flex-col gap-2 md:items-end">
            <a href="mailto:support@operon360.com" className="font-mono text-mono uppercase text-ink-55 hover:text-ink">
              support@operon360.com
            </a>
            <p className="font-mono text-mono uppercase text-ink-55">
              © {year} Operon Softwares Private Limited. All rights reserved.
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
