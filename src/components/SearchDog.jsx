import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES, O360 } from '../lib/site';
import { ArrowOut, Button, MonoLabel } from './ui';

/**
 * Search Dog — sitewide navigation router.
 *
 * Scope note (content doc, open gap `search-dog-scope`): repositioning Search
 * Dog as a business consultant that analyses a visitor's problem is a product
 * capability change, not a copy change. Until product/eng confirm what it can
 * reason about, this component ships the routing behaviour only: it matches a
 * query to a page, confirms before navigating, and escalates to a person.
 * No answer is ever invented.
 */

const SUGGESTIONS = [
  'Our vendor coordination is a mess — where do we start?',
  'I want to see Operon 360',
  "I'm a vendor — how do I join?",
  "I'm an investor",
  "I'm looking for open roles",
];

const KEYWORDS = {
  '/': ['operon softwares', 'company', 'home', 'what do you do'],
  '/about': ['about', 'legal identity', 'who are you', 'mission', 'vision', 'company model'],
  '/approach': ['approach', 'method', 'how you work', 'five stages', 'process'],
  '/platforms': ['platform', 'platforms', 'portfolio', 'graviyx'],
  '/industries': ['industry', 'industries', 'sector', 'construction', 'retail', 'manufacturing'],
  '/insights': ['insight', 'research', 'article', 'report', 'news', 'press'],
  '/careers': ['job', 'jobs', 'role', 'roles', 'hiring', 'career', 'careers', 'apply'],
  '/contact': ['contact', 'talk', 'enquiry', 'partnership', 'investor', 'get in touch'],
  '/grow': ['referral', 'refer', 'case study', 'calculator', 'savings', 'webinar'],
  [O360]: ['operon 360', '360', 'product', 'workspace', 'see the platform'],
  [`${O360}/features`]: ['feature', 'features', 'ledger', 'cipher', 'canvas', 'tenders', 'bids', 'kyc', 'operonified'],
  [`${O360}/process`]: ['how it works', 'workflow', 'steps', 'requirement', 'delivery'],
  [`${O360}/why-us`]: ['why', 'trust', 'verified', 'speed'],
  [`${O360}/ecosystem`]: ['ecosystem', 'vendors', 'clients', 'materials', 'services'],
  [`${O360}/get-demo`]: ['demo', 'walkthrough', 'book', 'get started'],
  [`${O360}/login`]: ['login', 'log in', 'sign in', 'password', 'account'],
  [`${O360}/industries`]: ['which modules', 'my industry', 'fit'],
};

function match(query) {
  const q = query.trim().toLowerCase();
  if (!q) return null;
  let best = null;
  for (const [path, words] of Object.entries(KEYWORDS)) {
    for (const w of words) {
      if (q.includes(w)) {
        const score = w.length;
        if (!best || score > best.score) best = { path, score };
      }
    }
  }
  if (!best) return null;
  return ROUTES.find((r) => r.path === best.path) || null;
}

export default function SearchDog() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [state, setState] = useState('idle'); // idle | loading | result | error
  const [result, setResult] = useState(null);
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const timer = useRef(null);

  useEffect(() => () => clearTimeout(timer.current), []);

  // Any page can open Search Dog: window.dispatchEvent(new CustomEvent('searchdog:open'))
  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener('searchdog:open', onOpen);
    return () => window.removeEventListener('searchdog:open', onOpen);
  }, []);

  useEffect(() => {
    if (open) inputRef.current?.focus();
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  function ask(value) {
    const q = value ?? query;
    if (!q.trim()) return;
    setQuery(q);
    setState('loading');
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      const hit = match(q);
      if (hit) {
        setResult(hit);
        setState('result');
      } else {
        setState('error');
      }
    }, 420);
  }

  const panelId = useMemo(() => 'search-dog-panel', []);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls={panelId}
        className="group fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-lg bg-ink text-paper shadow-[0_4px_20px_rgba(0,0,0,0.18)] transition-transform duration-180 ease-signal hover:-translate-y-0.5"
      >
        <DogMark />
        <span className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-md bg-ink px-2.5 py-1.5 font-mono text-mono-xs uppercase text-paper opacity-0 transition-opacity duration-180 group-hover:opacity-100 group-focus-visible:opacity-100 md:block">
          Search Dog
        </span>
        <span className="sr-only">Search Dog</span>
      </button>

      {open && (
        <div
          id={panelId}
          role="dialog"
          aria-label="Search Dog"
          className="fixed bottom-24 right-4 z-50 w-[min(420px,calc(100vw-2rem))] rounded-lg border border-ink-14 bg-paper shadow-[0_16px_50px_rgba(0,0,0,0.22)]"
        >
          <div className="flex items-start justify-between gap-4 border-b border-ink-14 p-5">
            <div>
              <h2 className="font-display text-h4 font-semibold">What&rsquo;s going on in your business?</h2>
              <p className="mt-2 text-xs text-ink-55">
                Tell me what you&rsquo;re working through and I&rsquo;ll point you to the right page. If it&rsquo;s better handled by
                a person, I&rsquo;ll connect you with one.
              </p>
            </div>
            <button type="button" onClick={() => setOpen(false)} aria-label="Close Search Dog" className="text-ink-40 hover:text-ink">
              <svg viewBox="0 0 14 14" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d="M2 2l10 10M12 2 2 12" strokeLinecap="square" />
              </svg>
            </button>
          </div>

          <div className="p-5">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                ask();
              }}
              className="flex gap-2"
            >
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Describe what you need"
                aria-label="Ask Search Dog"
                className="h-11 flex-1 rounded-md border border-ink-14 bg-paper px-3 text-sm outline-none transition-colors duration-180 placeholder:text-ink-30 focus:border-ink"
              />
              <Button type="submit" onClick={() => ask()}>
                Ask
              </Button>
            </form>

            {state === 'idle' && (
              <div className="mt-4 flex flex-wrap gap-2">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => ask(s)}
                    className="rounded-md border border-ink-14 px-2.5 py-1.5 text-left text-xs text-ink-70 transition-colors duration-180 hover:border-ink hover:text-ink"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            {state === 'loading' && (
              <p className="mt-4 font-mono text-mono uppercase text-ink-55">One moment — finding the right page.</p>
            )}

            {state === 'result' && result && (
              <div className="mt-4 rounded-md border border-ink-14 p-4">
                <MonoLabel>{result.path}</MonoLabel>
                <p className="mt-2 font-display text-h4 font-semibold">{result.title}</p>
                <div className="mt-4">
                  <Button
                    onClick={() => {
                      navigate(result.path);
                      setOpen(false);
                      setState('idle');
                      setQuery('');
                    }}
                  >
                    Go there
                  </Button>
                </div>
              </div>
            )}

            {state === 'error' && (
              <div className="mt-4 rounded-md border border-ink-14 p-4">
                <p className="text-sm text-ink-70">
                  I couldn&rsquo;t work out a good answer for that. Try rephrasing, or{' '}
                  <button
                    type="button"
                    onClick={() => {
                      navigate('/contact#general');
                      setOpen(false);
                    }}
                    className="border-b border-ink-30 pb-0.5 font-medium text-ink hover:border-ink"
                  >
                    talk to a person instead
                  </button>
                  .
                </p>
              </div>
            )}

            <div className="mt-5 flex items-center justify-between border-t border-ink-14 pt-4">
              <span className="font-mono text-mono-xs uppercase text-ink-40">Navigation assistant</span>
              <button
                type="button"
                onClick={() => {
                  navigate('/contact#general');
                  setOpen(false);
                }}
                className="inline-flex items-center gap-1.5 font-mono text-mono-xs uppercase text-ink-55 hover:text-ink"
              >
                Talk to a person <ArrowOut />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/** Dog motif built from the brand's own primitives — no new shape vocabulary. */
function DogMark() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
      <path d="M4 5.5 8 3v5.5z" />
      <path d="M20 5.5 16 3v5.5z" />
      <rect x="5" y="7" width="14" height="13" rx="5.5" />
      <circle cx="9.4" cy="12.4" r="1.15" fill="#000" />
      <circle cx="14.6" cy="12.4" r="1.15" fill="#000" />
      <rect x="10.5" y="15.2" width="3" height="2.2" rx="1.1" fill="#000" />
    </svg>
  );
}
