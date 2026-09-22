import { Fragment, useEffect, useMemo, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { PageHero } from './blocks';
import { Container, MonoLabel, Reveal, Section, Shape } from './ui';

/**
 * Legal document renderer.
 *
 * Content lives in src/content/legal/*.json, extracted verbatim from the
 * approved PDFs. Nothing here rewrites copy: this file only decides how each
 * block of that content is drawn, using the site's own primitives (hairline
 * rules, Cloud panels, mono labels, no accent colour).
 *
 * Blocks flagged `draft: true` are internal drafting notes that shipped inside
 * the Privacy Policy PDF (legal-review warnings, the pre-publication checklist).
 * They are hidden unless SHOW_DRAFTING_NOTES is switched on.
 */
export const SHOW_DRAFTING_NOTES = false;

/* ------------------------------------------------------------------ inline */

// [PLACEHOLDER] · email · url · "Section 5.4"
const TOKEN = /(\[[^[\]]*\])|([\w.+-]+@[\w-]+(?:\.[\w-]+)+)|(https?:\/\/[^\s)”"]*[^\s).,”"])|(Section \d+(?:\.\d+)?)/g;

/** Unfilled fact from the source document. Same dashed treatment as <Pending />. */
function Placeholder({ children }) {
  return (
    <span
      data-gap="legal-placeholder"
      className="rounded-sm border border-dashed border-ink-30 px-1.5 py-px font-mono text-[0.78em] leading-[1.6] text-ink-70 [box-decoration-break:clone]"
    >
      {children}
    </span>
  );
}

function Inline({ text, ids, pathname }) {
  const nodes = [];
  let last = 0;
  let m;
  TOKEN.lastIndex = 0;
  while ((m = TOKEN.exec(text))) {
    if (m.index > last) nodes.push(text.slice(last, m.index));
    const [full, placeholder, email, url, section] = m;
    const key = `${m.index}-${full}`;
    const link = 'underline decoration-ink-30 underline-offset-[3px] transition-colors duration-180 hover:decoration-ink';
    if (placeholder) nodes.push(<Placeholder key={key}>{full}</Placeholder>);
    else if (email)
      nodes.push(
        <a key={key} href={`mailto:${full}`} className={`${link} text-ink`}>
          {full}
        </a>,
      );
    else if (url)
      nodes.push(
        <a key={key} href={full} target="_blank" rel="noopener noreferrer" className={`${link} text-ink`}>
          {full}
        </a>,
      );
    else if (section) {
      const num = full.replace('Section ', '');
      const id = `s-${num.replace('.', '-')}`;
      nodes.push(
        ids.has(id) ? (
          <Link key={key} to={`${pathname}#${id}`} className={`${link} text-ink`}>
            {full}
          </Link>
        ) : (
          full
        ),
      );
    }
    last = m.index + full.length;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes.map((n, i) => <Fragment key={i}>{n}</Fragment>);
}

function Runs({ runs, ctx }) {
  return runs.map((r, i) =>
    r.b ? (
      <strong key={i} className="font-semibold text-ink">
        <Inline text={r.t} {...ctx} />
      </strong>
    ) : (
      <Inline key={i} text={r.t} {...ctx} />
    ),
  );
}

/* ------------------------------------------------------------------ blocks */

const GUTTER = 'md:pl-16'; // section numbers sit in this gutter

function Heading({ block, tight }) {
  if (block.t === 'h2') {
    return (
      <h2
        id={block.id}
        className={`relative mt-16 border-t border-ink-14 pt-8 text-h4 first:mt-0 max-lg:first:border-t-0 max-lg:first:pt-0 md:text-h3 ${GUTTER}`}
      >
        {block.num ? (
          <span className="mb-3 block font-mono text-mono-lg font-normal tabular-nums text-ink-55 md:absolute md:left-0 md:top-[2.75rem] md:mb-0">
            {block.num}
          </span>
        ) : null}
        {block.text}
      </h2>
    );
  }
  if (block.t === 'h3') {
    return (
      <h3 id={block.id} className={`relative ${tight ? 'mt-6' : 'mt-12'} font-display text-h4 font-semibold ${GUTTER}`}>
        <span className="mb-1 block font-mono text-mono-lg font-normal tabular-nums text-ink-55 md:absolute md:left-0 md:top-[0.45rem] md:mb-0">
          {block.num}
        </span>
        {block.text}
      </h3>
    );
  }
  return <h4 className={`mt-10 font-display text-body font-semibold ${GUTTER}`}>{block.text}</h4>;
}

function List({ items, level, ctx, caps }) {
  const marker =
    level === 2
      ? 'h-[5px] w-[5px] rounded-full border border-ink'
      : 'h-[5px] w-[5px] rounded-full bg-ink';
  return (
    <ul className={`mt-4 ${level === 2 ? 'ml-6' : ''} ${GUTTER}`}>
      {items.map((b, i) => (
        <li
          key={i}
          className={`relative mt-3 pl-6 first:mt-0 ${caps ? 'text-xs font-medium leading-[22px] text-ink' : 'max-w-prose text-body text-ink-70'}`}
        >
          <span aria-hidden="true" className={`absolute left-0 ${caps ? 'top-[9px]' : 'top-[0.7em]'} ${marker}`} />
          <Runs runs={b.runs} ctx={ctx} />
        </li>
      ))}
    </ul>
  );
}

/** Capitalised legal text (disclaimers, liability): a Cloud panel, not a louder colour. */
function Callout({ blocks, ctx }) {
  const out = [];
  let i = 0;
  while (i < blocks.length) {
    const b = blocks[i];
    if (b.t === 'li') {
      const items = [];
      while (i < blocks.length && blocks[i].t === 'li') items.push(blocks[i++]);
      out.push(<List key={i} items={items} level={1} ctx={ctx} caps />);
    } else {
      out.push(
        <p key={i} className="mt-4 text-xs font-medium leading-[22px] text-ink first:mt-0 max-w-none">
          <Runs runs={b.runs} ctx={ctx} />
        </p>,
      );
      i++;
    }
  }
  return (
    <div className={`mt-6 ${GUTTER}`}>
      <div className="rounded-lg bg-cloud p-6 md:p-8 [&_ul]:pl-0">{out}</div>
    </div>
  );
}

function Note({ block, ctx }) {
  return (
    <div className={`mt-6 ${GUTTER}`}>
      <div className="flex gap-4 rounded-lg border border-ink-14 p-5">
        <Shape form="triangle" size={13} className="mt-[5px] shrink-0" />
        <p className="text-sm text-ink-70">
          <Runs runs={block.runs} ctx={ctx} />
        </p>
      </div>
    </div>
  );
}

function Table({ rows, ctx }) {
  const [head, ...body] = rows;
  return (
    <div className={`mt-6 ${GUTTER}`}>
      <table className="block w-full border-collapse text-left md:table">
        <thead className="hidden md:table-header-group">
          <tr className="border-y border-ink-14">
            {head.map((h, i) => (
              <th
                key={i}
                scope="col"
                className={`py-4 pr-6 font-mono text-mono font-normal uppercase text-ink-55 ${i === 0 ? 'w-[34%]' : ''}`}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="block border-t border-ink-14 md:table-row-group md:border-t-0">
          {body.map((row, r) => (
            <tr key={r} className="block border-b border-ink-14 py-5 md:table-row md:py-0">
              {row.map((cell, c) => (
                <td
                  key={c}
                  className={`block align-top md:table-cell md:py-5 md:pr-6 ${
                    c === 0
                      ? 'pb-1 font-display text-sm font-semibold text-ink md:text-body'
                      : 'text-sm text-ink-70 md:text-body'
                  }`}
                >
                  <Inline text={cell} {...ctx} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Definitions({ items, ctx }) {
  return (
    <dl className={`mt-6 ${GUTTER}`}>
      <div className="border-t border-ink-14">
        {items.map((it) => (
          <div key={it.term} className="grid gap-1.5 border-b border-ink-14 py-5 md:grid-cols-[0.6fr_1.4fr] md:gap-8">
            <dt className="font-display text-body font-semibold">{it.term}</dt>
            <dd className="text-body text-ink-70">
              <Runs runs={it.copy} ctx={ctx} />
            </dd>
          </div>
        ))}
      </div>
    </dl>
  );
}

function KeyValues({ rows, ctx }) {
  return (
    <dl className={`mt-6 ${GUTTER}`}>
      <div className="border-t border-ink-14">
        {rows.map(([k, v]) => (
          <div key={k} className="grid gap-1 border-b border-ink-14 py-4 md:grid-cols-[0.6fr_1.4fr] md:gap-8">
            <dt className="text-sm text-ink-55">{k}</dt>
            <dd className="text-body text-ink">
              <Inline text={v} {...ctx} />
            </dd>
          </div>
        ))}
      </div>
    </dl>
  );
}

function Body({ blocks, ctx }) {
  const out = [];
  let i = 0;
  while (i < blocks.length) {
    const b = blocks[i];
    if (b.t === 'h2' || b.t === 'h3' || b.t === 'h4') {
      out.push(<Heading key={i} block={b} tight={i > 0 && (blocks[i - 1].t === 'h2')} />);
      i++;
    } else if (b.caps) {
      const group = [];
      while (i < blocks.length && blocks[i].caps) group.push(blocks[i++]);
      out.push(<Callout key={i} blocks={group} ctx={ctx} />);
    } else if (b.t === 'li') {
      const items = [];
      const level = b.level;
      while (i < blocks.length && blocks[i].t === 'li' && !blocks[i].caps && blocks[i].level === level) items.push(blocks[i++]);
      out.push(<List key={i} items={items} level={level} ctx={ctx} />);
    } else if (b.t === 'table') {
      out.push(<Table key={i} rows={b.rows} ctx={ctx} />);
      i++;
    } else if (b.t === 'defs') {
      out.push(<Definitions key={i} items={b.items} ctx={ctx} />);
      i++;
    } else if (b.t === 'kv') {
      out.push(<KeyValues key={i} rows={b.rows} ctx={ctx} />);
      i++;
    } else if (b.t === 'note') {
      out.push(<Note key={i} block={b} ctx={ctx} />);
      i++;
    } else if (b.t === 'fine') {
      out.push(
        <p key={i} className={`mt-16 border-t border-ink-14 pt-6 text-xs text-ink-55 ${GUTTER}`}>
          <Runs runs={b.runs} ctx={ctx} />
        </p>,
      );
      i++;
    } else {
      out.push(
        <p key={i} className={`mt-5 max-w-prose text-body text-ink-70 ${GUTTER}`}>
          <Runs runs={b.runs} ctx={ctx} />
        </p>,
      );
      i++;
    }
  }
  return out;
}

/* ---------------------------------------------------------------- contents */

function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 140) current = id;
      }
      setActive(current);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [ids]);
  return active;
}

function ContentsList({ sections, active, pathname, onNavigate }) {
  return (
    <ol className="border-l border-ink-14">
      {sections.map((s) => {
        const is = s.id === active;
        return (
          <li key={s.id}>
            <Link
              to={`${pathname}#${s.id}`}
              onClick={onNavigate}
              aria-current={is ? 'location' : undefined}
              className={`-ml-px grid grid-cols-[1.75rem_1fr] border-l-2 py-1.5 pl-4 text-xs transition-colors duration-180 ${
                is ? 'border-ink font-medium text-ink' : 'border-transparent text-ink-55 hover:text-ink'
              }`}
            >
              <span className="font-mono tabular-nums">{s.num || ''}</span>
              <span>{s.text}</span>
            </Link>
          </li>
        );
      })}
    </ol>
  );
}

function Contents({ sections, pathname }) {
  const ids = useMemo(() => sections.map((s) => s.id), [sections]);
  const active = useActiveSection(ids);
  const [open, setOpen] = useState(false);
  const rail = useRef(null);
  useEffect(() => {
    const nav = rail.current;
    const link = nav?.querySelector('[aria-current]');
    if (!nav || !link) return;
    const top = link.offsetTop;
    if (top < nav.scrollTop + 48) nav.scrollTop = Math.max(0, top - 48);
    else if (top + link.offsetHeight > nav.scrollTop + nav.clientHeight - 24) nav.scrollTop = top - nav.clientHeight + link.offsetHeight + 48;
  }, [active]);
  return (
    <>
      {/* small screens: collapsed disclosure */}
      <div className="border-y border-ink-14 lg:hidden">
        <button
          type="button"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
          className="flex w-full items-center justify-between py-4 text-left"
        >
          <MonoLabel>Contents · {sections.length} sections</MonoLabel>
          <svg viewBox="0 0 14 14" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <path d="M0 7h14" />
            <path d="M7 0v14" style={{ opacity: open ? 0 : 1, transition: 'opacity 180ms' }} />
          </svg>
        </button>
        {open ? (
          <div className="pb-6">
            <ContentsList sections={sections} active={active} pathname={pathname} onNavigate={() => setOpen(false)} />
          </div>
        ) : null}
      </div>

      {/* desktop: sticky rail */}
      <nav ref={rail} aria-label="Contents" className="hidden lg:sticky lg:top-28 lg:block lg:max-h-[calc(100vh-9rem)] lg:overflow-y-auto lg:pr-4">
        <MonoLabel className="mb-5">Contents</MonoLabel>
        <ContentsList sections={sections} active={active} pathname={pathname} />
      </nav>
    </>
  );
}

/* -------------------------------------------------------------------- page */

export default function LegalDocument({ doc, others }) {
  const { pathname } = useLocation();
  const { meta } = doc;

  const blocks = useMemo(() => doc.blocks.filter((b) => SHOW_DRAFTING_NOTES || !b.draft), [doc]);
  const sections = useMemo(() => blocks.filter((b) => b.t === 'h2'), [blocks]);
  const ids = useMemo(() => new Set(blocks.filter((b) => b.id).map((b) => b.id)), [blocks]);
  const ctx = { ids, pathname };

  const facts = [
    { label: 'Effective date', value: <Placeholder>{meta.effectiveDate}</Placeholder> },
    meta.lastUpdated ? { label: 'Last updated', value: <Placeholder>{meta.lastUpdated}</Placeholder> } : null,
    { label: 'Version', value: <span className="font-display text-h4 font-semibold">{meta.version}</span> },
  ].filter(Boolean);

  return (
    <>
      <PageHero eyebrow="Legal" headline={meta.title} lead={meta.tagline} />
      <Section surface="paper" className="!pt-0">
        <Container>
          <Reveal>
            <dl className="flex flex-wrap gap-x-16 gap-y-5 border-y border-ink-14 py-6">
              {facts.map((f) => (
                <div key={f.label}>
                  <MonoLabel>{f.label}</MonoLabel>
                  <dd className="mt-3">{f.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <div className="mt-10 grid gap-10 lg:mt-14 lg:grid-cols-[250px_minmax(0,1fr)] lg:gap-16">
            <div>
              <Contents sections={sections} pathname={pathname} />
            </div>
            <article className="min-w-0" aria-label={meta.title}>
              <Body blocks={blocks} ctx={ctx} />

              {others?.length ? (
                <div className={`mt-20 ${GUTTER}`}>
                  <MonoLabel>Other legal documents</MonoLabel>
                  <ul className="mt-4 border-t border-ink-14">
                    {others.map((o) => (
                      <li key={o.path} className="border-b border-ink-14">
                        <Link
                          to={o.path}
                          className="flex items-center justify-between gap-6 py-5 transition-colors duration-180 hover:bg-cloud"
                        >
                          <span className="font-display text-h4 font-semibold">{o.title}</span>
                          <MonoLabel>{o.path}</MonoLabel>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </article>
          </div>
        </Container>
      </Section>
    </>
  );
}
