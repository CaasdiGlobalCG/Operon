import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { EXTERNAL } from '../lib/site';
import AmbientGradient from './AmbientGradient';
import { GAPS } from '../content/gaps';

/* ------------------------------------------------------------------ layout */

export function Container({ as: As = 'div', width = 'content', className = '', children }) {
  const w = width === 'narrow' ? 'max-w-[880px]' : 'max-w-content';
  return <As className={`mx-auto w-full ${w} px-6 md:px-10 ${className}`}>{children}</As>;
}

/**
 * Section surfaces. Ratio discipline from the brand guidelines:
 * 55 Paper · 25 Cloud · 15 Ink · 05 matte signal. Ink sections are rationed.
 */
const SURFACES = {
  paper: 'bg-paper text-ink',
  cloud: 'bg-cloud text-ink',
  ink: 'bg-ink text-paper',
};

export function Section({ surface = 'paper', id, className = '', bleed = false, ambient = false, children }) {
  return (
    <section
      id={id}
      className={`relative ${SURFACES[surface]} ${bleed ? '' : 'py-20 md:py-30'} ${className}`}
    >
      {ambient ? <AmbientGradient tone={surface === 'ink' ? 'paper' : 'ink'} /> : null}
      <div className="relative">{children}</div>
    </section>
  );
}

export function Rule({ tone = 'ink', className = '' }) {
  return <hr className={`border-0 border-t ${tone === 'paper' ? 'border-paper-14' : 'border-ink-14'} ${className}`} />;
}

/* --------------------------------------------------------------- typography */

export function MonoLabel({ tone = 'ink', className = '', children }) {
  const c = tone === 'paper' ? 'text-paper-55' : 'text-ink-55';
  return <span className={`block font-mono text-mono uppercase ${c} ${className}`}>{children}</span>;
}

export function Display({ level = 2, size, className = '', children }) {
  const As = `h${level}`;
  const s = size || (level === 1 ? 'text-h1 md:text-h1-lg' : level === 2 ? 'text-h2 md:text-h2-lg' : 'text-h3');
  return <As className={`${s} ${className}`}>{children}</As>;
}

export function Lead({ tone = 'ink', className = '', children }) {
  return (
    <p className={`max-w-prose text-body md:text-lead ${tone === 'paper' ? 'text-paper-70' : 'text-ink-70'} ${className}`}>
      {children}
    </p>
  );
}

export function Body({ tone = 'ink', className = '', children }) {
  return (
    <p className={`max-w-prose text-body ${tone === 'paper' ? 'text-paper-70' : 'text-ink-70'} ${className}`}>
      {children}
    </p>
  );
}

/* ------------------------------------------------------------------ actions */

const BTN_BASE =
  'inline-flex items-center justify-center gap-2 font-sans text-sm font-medium rounded-md ' +
  'px-5 h-11 transition-colors duration-180 ease-signal whitespace-nowrap';

const BTN = {
  'primary-on-paper': `${BTN_BASE} bg-ink text-paper hover:bg-ink-70`,
  'secondary-on-paper': `${BTN_BASE} border border-ink-14 text-ink hover:border-ink hover:bg-cloud`,
  'primary-on-ink': `${BTN_BASE} bg-paper text-ink hover:bg-paper-70`,
  'secondary-on-ink': `${BTN_BASE} border border-paper-30 text-paper hover:border-paper hover:bg-paper-08`,
};

export function Button({ to, href, variant = 'primary', tone = 'paper', className = '', children, ...rest }) {
  const cls = `${BTN[`${variant}-on-${tone === 'ink' ? 'ink' : 'paper'}`]} ${className}`;
  if (to) return <Link to={to} className={cls} {...rest}>{children}</Link>;
  if (href) return <a href={href} className={cls} {...rest}>{children}</a>;
  return <button type="button" className={cls} {...rest}>{children}</button>;
}

/** Quiet inline link with a rule that draws on hover. */
export function TextLink({ to, href, tone = 'ink', className = '', children, ...rest }) {
  const cls =
    `inline-flex items-center gap-1.5 text-sm font-medium border-b pb-0.5 transition-colors duration-180 ` +
    (tone === 'paper'
      ? 'text-paper border-paper-30 hover:border-paper '
      : 'text-ink border-ink-30 hover:border-ink ') +
    className;
  if (href) return <a href={href} className={cls} {...rest}>{children}</a>;
  return <Link to={to} className={cls} {...rest}>{children}</Link>;
}

/** External destinations always announce themselves. */
export function ExternalLink({ target = 'graviyx', tone = 'ink', className = '', children }) {
  const dest = EXTERNAL[target];
  return (
    <a
      href={dest.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${children || dest.label} (opens in a new tab)`}
      className={`inline-flex items-center gap-1.5 ${tone === 'paper' ? 'text-paper' : 'text-ink'} ${className}`}
    >
      {children || dest.label}
      <ArrowOut />
      <span className="sr-only">Opens in a new tab</span>
    </a>
  );
}

export function ArrowOut({ className = '' }) {
  return (
    <svg viewBox="0 0 12 12" width="11" height="11" aria-hidden="true" className={className} fill="none" stroke="currentColor" strokeWidth="1.4">
      <path d="M3.5 8.5 8.5 3.5M4.5 3.5h4v4" strokeLinecap="square" />
    </svg>
  );
}

/* ------------------------------------------------------- shape language */

/** Four brand primitives: Vision, Structure, Execution, Outcome. */
export function Shape({ form = 'circle', size = 14, tone = 'currentColor', className = '' }) {
  const s = { width: size, height: size, color: tone };
  const common = { viewBox: '0 0 16 16', fill: 'currentColor', 'aria-hidden': true, style: s, className };
  if (form === 'square') return <svg {...common}><rect x="1" y="1" width="14" height="14" rx="4" /></svg>;
  if (form === 'triangle') return <svg {...common}><path d="M8 1.5 15 14.5H1z" /></svg>;
  if (form === 'small-circle') return <svg {...common}><circle cx="8" cy="8" r="5" /></svg>;
  return <svg {...common}><circle cx="8" cy="8" r="7" /></svg>;
}

export const SHAPE_MEANING = [
  { form: 'circle', name: 'Vision', note: 'Purpose, continuity, scale.' },
  { form: 'square', name: 'Structure', note: 'Process, logic, governance.' },
  { form: 'triangle', name: 'Execution', note: 'Momentum, decisions, progress.' },
  { form: 'small-circle', name: 'Outcome', note: 'Results, feedback, next cycle.' },
];

/* ------------------------------------------------------------ content gaps */

/** Honest placeholder for an unresolved content gap. Never a fabricated fact. */
export function Pending({ id, label, tone = 'ink', className = '' }) {
  const text = label || GAPS[id] || 'Input required';
  return (
    <span
      data-gap={id}
      title={GAPS[id]}
      className={
        `inline-flex items-center gap-2 font-mono text-mono-xs uppercase px-2 py-1 rounded-sm border border-dashed ` +
        (tone === 'paper' ? 'border-paper-30 text-paper-55 ' : 'border-ink-30 text-ink-55 ') +
        className
      }
    >
      Input required — {text}
    </span>
  );
}

/** Empty state. An empty screen is an invitation to act, never a fake card. */
export function EmptyState({ message, action, tone = 'ink' }) {
  return (
    <div className={`border border-dashed ${tone === 'paper' ? 'border-paper-30' : 'border-ink-14'} rounded-lg p-10 text-center`}>
      <p className={`text-body ${tone === 'paper' ? 'text-paper-70' : 'text-ink-70'}`}>{message}</p>
      {action ? <div className="mt-6 flex justify-center">{action}</div> : null}
    </div>
  );
}

/* ------------------------------------------------------------------ motion */

/**
 * One reveal per section, transform/opacity only. Honours reduced motion by
 * rendering the final state immediately.
 */
export function Reveal({ as: As = 'div', delay = 0, className = '', children }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.05 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <As ref={ref} className={`reveal ${className}`} data-shown={shown} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </As>
  );
}

/** Scroll position hook, used by the sticky nav. */
export function useScrolled(threshold = 8) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);
  return scrolled;
}
