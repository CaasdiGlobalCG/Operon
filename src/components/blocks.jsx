import { useId, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { Body, Button, Container, Display, Lead, MonoLabel, Reveal, Rule, Section } from './ui';

/* ------------------------------------------------------------------- heroes */

export function PageHero({ eyebrow, headline, lead, actions, surface = 'paper', aside }) {
  const dark = surface === 'ink';
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 72]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.25]);
  return (
    <Section surface={surface} ambient bleed className="sticky top-0 z-0 pb-16 pt-14 md:pb-24 md:pt-20">
      <Container>
        <motion.div
          ref={ref}
          style={reduce ? undefined : { y, opacity }}
          className={aside ? 'grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20' : ''}
        >
          <div>
            {eyebrow ? (
              <div className="animate-hero-in" style={{ animationDelay: '0ms' }}>
                <MonoLabel tone={dark ? 'paper' : 'ink'}>{eyebrow}</MonoLabel>
              </div>
            ) : null}
            <h1 className="animate-hero-in mt-6 max-w-[20ch] text-h1 md:text-h1-lg" style={{ animationDelay: '90ms' }}>
              {headline}
            </h1>
            {lead ? (
              <div className="animate-hero-in" style={{ animationDelay: '180ms' }}>
                <Lead tone={dark ? 'paper' : 'ink'} className="mt-8">
                  {lead}
                </Lead>
              </div>
            ) : null}
            {actions ? (
              <div className="animate-hero-in mt-10 flex flex-wrap gap-3" style={{ animationDelay: '260ms' }}>
                {actions}
              </div>
            ) : null}
          </div>
          {aside ? <div className="animate-hero-in lg:justify-self-end" style={{ animationDelay: '180ms' }}>{aside}</div> : null}
        </motion.div>
      </Container>
    </Section>
  );
}

/** Section header: label, headline, optional supporting paragraph.
 *  Columns enter from opposite sides — left text, right copy. */
export function SectionHead({ eyebrow, headline, children, tone = 'ink', className = '' }) {
  return (
    <div className={`grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20 ${className}`}>
      <Reveal from="left">
        {eyebrow ? <MonoLabel tone={tone}>{eyebrow}</MonoLabel> : null}
        <Display level={2} className="mt-6">
          {headline}
        </Display>
      </Reveal>
      {children ? (
        <Reveal from="right" delay={90} className="lg:pt-3">
          {children}
        </Reveal>
      ) : null}
    </div>
  );
}

/** Closing CTA band. One fork, never a cluster of competing buttons. */
export function CTABand({ eyebrow, headline, body, actions, surface = 'ink' }) {
  const dark = surface === 'ink';
  return (
    <Section surface={surface} ambient>
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-20">
          <Reveal from="left">
            {eyebrow ? <MonoLabel tone={dark ? 'paper' : 'ink'}>{eyebrow}</MonoLabel> : null}
            <Display level={2} className="mt-6 max-w-[18ch]">
              {headline}
            </Display>
            {body ? (
              <Body tone={dark ? 'paper' : 'ink'} className="mt-6">
                {body}
              </Body>
            ) : null}
          </Reveal>
          <Reveal from="right" delay={90} className="flex flex-wrap gap-3 lg:justify-end">
            {actions}
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

/* -------------------------------------------------------------------- lists */

/** Rule-divided definition list. The structural device of this system. */
export function DefinitionList({ items, tone = 'ink' }) {
  const border = tone === 'paper' ? 'border-paper-14' : 'border-ink-14';
  const muted = tone === 'paper' ? 'text-paper-70' : 'text-ink-70';
  return (
    <dl className={`border-t ${border}`}>
      {items.map((item, i) => (
        <Reveal
          key={item.term}
          delay={i * 55}
          className={`grid gap-3 border-b ${border} py-8 md:grid-cols-[0.8fr_1.2fr] md:gap-12`}
        >
          <dt className="font-display text-h4 font-semibold">{item.term}</dt>
          <dd className={`max-w-prose text-body ${muted}`}>{item.copy}</dd>
        </Reveal>
      ))}
    </dl>
  );
}

/** Numbered steps. Used only where the content is genuinely a sequence. */
export function Steps({ steps, tone = 'ink' }) {
  const border = tone === 'paper' ? 'border-paper-14' : 'border-ink-14';
  const muted = tone === 'paper' ? 'text-paper-70' : 'text-ink-70';
  return (
    <ol className={`border-t ${border}`}>
      {steps.map((step, i) => (
        <Reveal
          as="li"
          key={step.term}
          delay={i * 55}
          className={`grid gap-4 border-b ${border} py-8 md:grid-cols-[3rem_0.7fr_1.3fr] md:gap-8`}
        >
          <span className="font-mono text-mono uppercase tabular-nums opacity-55">
            {String(i + 1).padStart(2, '0')}
          </span>
          <h3 className="font-display text-h4 font-semibold">{step.term}</h3>
          <p className={`max-w-prose text-body ${muted}`}>{step.copy}</p>
        </Reveal>
      ))}
    </ol>
  );
}

/** Card grid held together by hairlines rather than shadows. */
export function CardGrid({ cols = 3, tone = 'ink', className = '', children }) {
  const bg = tone === 'paper' ? 'bg-paper-14' : 'bg-ink-14';
  const map = { 2: 'md:grid-cols-2', 3: 'md:grid-cols-3', 4: 'sm:grid-cols-2 lg:grid-cols-4' };
  return <div className={`grid gap-px overflow-hidden rounded-lg ${bg} ${map[cols]} ${className}`}>{children}</div>;
}

export function Card({ tone = 'ink', className = '', children }) {
  const bg = tone === 'paper' ? 'bg-ink' : 'bg-paper';
  return (
    <article
      className={`flex flex-col gap-4 ${bg} p-7 transition-transform duration-200 ease-signal hover:-translate-y-1 md:p-8 ${className}`}
    >
      {children}
    </article>
  );
}

/* ------------------------------------------------------------------- tables */

export function ComparisonTable({ head, rows }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[640px] border-collapse text-left">
        <thead>
          <tr className="border-y border-ink-14">
            {head.map((h) => (
              <th key={h} scope="col" className="py-4 pr-6 font-mono text-mono uppercase text-ink-55">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row[0]} className="border-b border-ink-14 align-top">
              {row.map((cell, i) => (
                <td
                  key={i}
                  className={`py-6 pr-6 text-body ${i === 0 ? 'font-display font-semibold' : 'text-ink-70'} ${
                    i === row.length - 1 ? 'text-ink' : ''
                  }`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* --------------------------------------------------------------------- tabs */

export function Tabs({ tabs, tone = 'ink' }) {
  const [active, setActive] = useState(tabs[0].id);
  const border = tone === 'paper' ? 'border-paper-14' : 'border-ink-14';
  return (
    <div>
      <div role="tablist" className={`flex flex-wrap gap-6 border-b ${border}`}>
        {tabs.map((tab) => {
          const is = tab.id === active;
          const on = tone === 'paper' ? 'text-paper border-paper' : 'text-ink border-ink';
          const off = tone === 'paper' ? 'text-paper-55 border-transparent' : 'text-ink-55 border-transparent';
          return (
            <button
              key={tab.id}
              role="tab"
              type="button"
              aria-selected={is}
              onClick={() => setActive(tab.id)}
              className={`-mb-px border-b-2 pb-3 text-sm font-medium transition-colors duration-180 ${is ? on : off}`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
      <div role="tabpanel" className="pt-10">
        {tabs.find((t) => t.id === active)?.content}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- accordion */

export function Accordion({ items, tone = 'ink', defaultOpen = null }) {
  const [open, setOpen] = useState(defaultOpen);
  const border = tone === 'paper' ? 'border-paper-14' : 'border-ink-14';
  return (
    <div className={`border-t ${border}`}>
      {items.map((item) => {
        const is = open === item.id;
        return (
          <div key={item.id} id={item.id} className={`border-b ${border}`}>
            <h3>
              <button
                type="button"
                aria-expanded={is}
                onClick={() => setOpen(is ? null : item.id)}
                className="flex w-full items-center justify-between gap-6 py-6 text-left"
              >
                <span className="font-display text-h4 font-semibold">{item.title}</span>
                <span className="flex h-7 w-7 shrink-0 items-center justify-center">
                  <svg viewBox="0 0 14 14" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                    <path d="M0 7h14" />
                    <path d="M7 0v14" style={{ opacity: is ? 0 : 1, transition: 'opacity 180ms' }} />
                  </svg>
                </span>
              </button>
            </h3>
            {is ? <div className="pb-8">{item.content}</div> : null}
          </div>
        );
      })}
    </div>
  );
}

/* -------------------------------------------------------------------- forms */

export function Field({ label, hint, error, children, className = '' }) {
  return (
    <label className={`flex flex-col gap-2 ${className}`}>
      <span className="text-xs font-medium text-ink-70">{label}</span>
      {children}
      {hint && !error ? <span className="text-xs text-ink-55">{hint}</span> : null}
      {error ? <span className="font-mono text-mono-xs uppercase text-ink">{error}</span> : null}
    </label>
  );
}

const INPUT =
  'h-11 w-full rounded-md border bg-paper px-3 text-sm text-ink outline-none transition-colors duration-180 ' +
  'placeholder:text-ink-30 focus:border-ink';

export function Input({ error, className = '', ...rest }) {
  return <input className={`${INPUT} ${error ? 'border-ink' : 'border-ink-14'} ${className}`} {...rest} />;
}

export function Select({ error, className = '', children, ...rest }) {
  return (
    <select className={`${INPUT} ${error ? 'border-ink' : 'border-ink-14'} ${className}`} {...rest}>
      {children}
    </select>
  );
}

export function Textarea({ error, className = '', ...rest }) {
  return (
    <textarea
      rows={5}
      className={`${INPUT} h-auto py-3 leading-6 ${error ? 'border-ink' : 'border-ink-14'} ${className}`}
      {...rest}
    />
  );
}

/** Result banner for a submitted form. Calm, specific, never blaming. */
export function FormNotice({ state, message }) {
  return (
    <AnimatePresence initial={false}>
      {state ? (
        <motion.div
          key={state}
          role="status"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, transition: { duration: 0.12 } }}
          transition={{ duration: 0.24, ease: [0.22, 0.61, 0.36, 1] }}
          className={`mt-6 rounded-md border p-4 text-sm ${
            state === 'success' ? 'border-ink bg-ink text-paper' : 'border-ink-14 bg-cloud text-ink'
          }`}
        >
          {message}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

/**
 * Shared form controller. No backend exists yet (open gap: CRM routing), so
 * submission validates, then shows the content doc's exact success copy.
 */
export function useFormState(requiredFields) {
  const [errors, setErrors] = useState({});
  const [state, setState] = useState(null);

  function submit(event, values) {
    event.preventDefault();
    const next = {};
    for (const field of requiredFields) {
      const value = (values[field] || '').trim();
      if (!value) next[field] = 'This field is required.';
      else if (field.toLowerCase().includes('email') && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
        next[field] = 'Enter a valid email address.';
    }
    setErrors(next);
    setState(Object.keys(next).length ? 'error' : 'success');
    return Object.keys(next).length === 0;
  }

  return { errors, state, submit, reset: () => setState(null) };
}

export { Container, Section, Display, Lead, Body, MonoLabel, Reveal, Rule, Button, Link };
