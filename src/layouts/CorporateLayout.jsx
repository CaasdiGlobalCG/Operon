import { useEffect, useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { CorporateLogo, Mark } from '../components/Logo';
import SearchDog from '../components/SearchDog';
import { Button, Container, ExternalLink, MonoLabel, Pending, useScrolled } from '../components/ui';
import { CORPORATE_FOOTER, CORPORATE_NAV, CORPORATE_NAV_CTA } from '../lib/site';

export default function CorporateLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <CorporateNav />
      <main id="main" className="flex-1">
        <Outlet />
      </main>
      <CorporateFooter />
      <SearchDog />
    </div>
  );
}

function CorporateNav() {
  const scrolled = useScrolled();
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={`sticky top-0 z-40 bg-paper/95 backdrop-blur-sm transition-colors duration-240 ease-signal ${
        scrolled ? 'border-b border-ink-14' : 'border-b border-transparent'
      }`}
      style={{ paddingTop: 'env(safe-area-inset-top, 0px)' }}
    >
      <Container className="flex h-16 items-center justify-between gap-6">
        <CorporateLogo height={24} />

        <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex">
          {CORPORATE_NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `text-sm transition-colors duration-180 ${isActive ? 'text-ink' : 'text-ink-55 hover:text-ink'}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Button to={CORPORATE_NAV_CTA.to}>{CORPORATE_NAV_CTA.label}</Button>
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
        <div className="border-t border-ink-14 bg-paper lg:hidden">
          <Container className="py-6">
            <nav aria-label="Primary mobile" className="flex flex-col">
              {CORPORATE_NAV.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className="border-b border-ink-08 py-3.5 font-display text-h4 font-semibold"
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>
            <Button to={CORPORATE_NAV_CTA.to} className="mt-6 w-full">
              {CORPORATE_NAV_CTA.label}
            </Button>
          </Container>
        </div>
      )}
    </header>
  );
}

function CorporateFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-ink text-paper">
      <Container className="py-16 md:py-20">
        <div className="flex flex-col gap-10 border-b border-paper-14 pb-12 md:flex-row md:items-start md:justify-between">
          <div className="max-w-[26rem]">
            <Link to="/" aria-label="Operon Softwares — home" className="inline-flex items-center gap-3">
              <Mark variant="symbol" tone="white" height={26} />
              <Mark variant="wordmark" tone="white" height={20} />
            </Link>
            <p className="mt-6 font-display text-h4 font-semibold">One signal. One flow. One system.</p>
          </div>
          <div className="flex flex-col gap-3">
            <MonoLabel tone="paper">Registered office</MonoLabel>
            <Pending id="registered-address" tone="paper" label="Registered address" />
            <Pending id="cin" tone="paper" label="CIN" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-8 gap-y-10 py-12 md:grid-cols-3 lg:grid-cols-5">
          {CORPORATE_FOOTER.map((col) => (
            <div key={col.title}>
              <MonoLabel tone="paper">{col.title}</MonoLabel>
              <ul className="mt-4 flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    {link.external ? (
                      <ExternalLink target={link.external} tone="paper" className="text-sm text-paper-70 hover:text-paper">
                        {link.label}
                      </ExternalLink>
                    ) : (
                      <Link to={link.to} className="text-sm text-paper-70 transition-colors duration-180 hover:text-paper">
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-4 border-t border-paper-14 pt-8 md:flex-row md:items-center md:justify-between">
          <p className="font-mono text-mono uppercase text-paper-55">
            © {year} Operon Softwares Private Limited. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Pending id="social" tone="paper" label="Social links" />
          </div>
        </div>
        <p className="mt-6 max-w-prose text-xs text-paper-55">
          Operon 360 is a platform built and operated by Operon Softwares Private Limited.
        </p>
      </Container>
    </footer>
  );
}
