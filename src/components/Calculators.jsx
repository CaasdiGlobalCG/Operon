import { useMemo, useState } from 'react';
import { Button, MonoLabel } from './ui';

/**
 * Two working calculators for the Marketing/Growth page, replacing the
 * placeholder Procurement Savings Calculator and Project Cost Estimator.
 * The calculation models here are complete and are not placeholders — both
 * were supplied directly as reference implementations
 * (fragmentation-tax-calculator.jsx, ChasingCostCalculator.jsx) and are
 * reproduced with the same formulas, rebuilt onto Ink/Paper/Cloud tokens and
 * Poppins/Inter/JetBrains Mono in place of the reference palette and fonts.
 * Every number shown is computed from what the visitor enters — nothing is
 * fetched, looked up, or invented.
 */

const inr = (n) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(
    Math.max(0, Math.round(Number.isFinite(n) ? n : 0)),
  );

const inrShort = (n) => {
  const v = Math.max(0, Math.round(Number.isFinite(n) ? n : 0));
  if (v >= 10000000) return `₹${(v / 10000000).toFixed(2)} Cr`;
  if (v >= 100000) return `₹${(v / 100000).toFixed(1)} L`;
  if (v >= 1000) return `₹${(v / 1000).toFixed(0)}K`;
  return inr(v);
};

/* -------------------------------------------------------------- primitives */

function FieldRow({ index, label, hint, children }) {
  return (
    <div className="flex flex-col gap-3 border-b border-ink-14 py-5 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
      <div className="flex gap-3 sm:max-w-[60%]">
        <span className="pt-0.5 font-mono text-mono-xs uppercase text-ink-40">{String(index).padStart(2, '0')}</span>
        <div>
          <div className="text-sm font-medium text-ink">{label}</div>
          {hint ? <p className="mt-1 text-xs leading-relaxed text-ink-55">{hint}</p> : null}
        </div>
      </div>
      <div className="sm:w-[220px] sm:shrink-0 sm:text-right">{children}</div>
    </div>
  );
}

function NumField({ value, onChange, prefix, suffix, placeholder, width = 'w-full' }) {
  return (
    <div className={`flex items-center gap-1.5 rounded-md border border-ink-14 bg-paper px-3 ${width} focus-within:border-ink`}>
      {prefix ? <span className="font-mono text-mono-xs text-ink-40">{prefix}</span> : null}
      <input
        type="number"
        inputMode="decimal"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="h-10 w-full min-w-0 bg-transparent text-right font-mono text-sm text-ink outline-none"
      />
      {suffix ? <span className="shrink-0 font-mono text-mono-xs text-ink-40">{suffix}</span> : null}
    </div>
  );
}

function Slider({ value, onChange, min, max, step = 1, display }) {
  return (
    <div className="flex flex-col items-end gap-2 sm:items-stretch">
      <div className="text-right font-mono text-sm text-ink">{display}</div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-black"
      />
    </div>
  );
}

/** Monochrome donut — Ink at full and reduced opacity, no colour vocabulary. */
function Donut({ segments, size = 116, thickness = 18 }) {
  const total = segments.reduce((s, x) => s + Math.max(x.value, 0), 0) || 1;
  const r = (size - thickness) / 2;
  const c = 2 * Math.PI * r;
  let offset = 0;
  const arcs = segments.map((seg) => {
    const frac = Math.max(seg.value, 0) / total;
    const dash = frac * c;
    const arc = { dash, gap: c - dash, offset };
    offset += dash;
    return arc;
  });
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} role="img" aria-hidden="true">
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth={thickness} />
      {arcs.map((arc, i) => (
        <circle
          key={i}
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={segments[i].tone}
          strokeWidth={thickness}
          strokeDasharray={`${arc.dash} ${arc.gap}`}
          strokeDashoffset={-arc.offset}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      ))}
    </svg>
  );
}

function MathRow({ label, formula, value, note }) {
  return (
    <div className="border-b border-paper-14 py-4">
      <div className="flex items-baseline justify-between gap-4">
        <div className="text-sm font-medium text-paper">{label}</div>
        <div className="font-mono text-sm text-paper">{inr(value)}</div>
      </div>
      <div className="mt-1 font-mono text-mono-xs text-paper-55">{formula}</div>
      <div className="mt-1.5 text-xs leading-relaxed text-paper-55">{note}</div>
    </div>
  );
}

/* ------------------------------------------------- fragmentation tax model */

const TOOL_OPTIONS = [
  { id: 'email', label: 'Email threads' },
  { id: 'sheets', label: 'Excel / Sheets' },
  { id: 'whatsapp', label: 'WhatsApp groups' },
  { id: 'erp', label: 'ERP module' },
  { id: 'pm', label: 'PM / project tool' },
  { id: 'accounting', label: 'Accounting software' },
  { id: 'paper', label: 'Site diaries / paper' },
];

const DEFAULT_DELAY_COST = 750000;
const TOOL_OVERHEAD_RATE = 0.08;

export function FragmentationTaxCalculator() {
  const [vendors, setVendors] = useState(18);
  const [tools, setTools] = useState({
    email: true,
    sheets: true,
    whatsapp: true,
    erp: false,
    pm: false,
    accounting: false,
    paper: false,
  });
  const [coordinators, setCoordinators] = useState('1.5');
  const [coordCost, setCoordCost] = useState('90000');
  const [sites, setSites] = useState(6);
  const [delayPct, setDelayPct] = useState(35);
  const [delayCostInput, setDelayCostInput] = useState('');
  const [showMath, setShowMath] = useState(false);

  const toolCount = Object.values(tools).filter(Boolean).length;
  const usingDefaultDelayCost = delayCostInput === '' || Number(delayCostInput) <= 0;
  const delayCost = usingDefaultDelayCost ? DEFAULT_DELAY_COST : Number(delayCostInput);

  const calc = useMemo(() => {
    const fte = Number(coordinators) || 0;
    const monthlyCost = Number(coordCost) || 0;
    const laborCost = fte * monthlyCost * 12;
    const toolOverhead = Math.max(0, toolCount - 1) * TOOL_OVERHEAD_RATE * laborCost;
    const delayRework = (delayPct / 100) * sites * delayCost;
    const total = laborCost + toolOverhead + delayRework;
    return { laborCost, toolOverhead, delayRework, total, low: total * 0.85, high: total * 1.15 };
  }, [coordinators, coordCost, toolCount, delayPct, sites, delayCost]);

  const pmEquivalent = calc.total / Math.max(1, (Number(coordCost) || 1) * 12);

  return (
    <article className="overflow-hidden rounded-lg border border-ink-14 bg-paper">
      <div className="border-b border-ink-14 p-7 md:p-8">
        <MonoLabel>Fragmentation Tax Calculator</MonoLabel>
        <h3 className="mt-4 font-display text-h4 font-semibold">
          What disconnected tools and informal coordination are costing your program.
        </h3>
        <p className="mt-3 max-w-measure text-sm text-ink-70">
          Estimates the annual cost of coordinating vendors across too many disconnected tools, plus delay and rework
          from coordination gaps — not material or design issues.
        </p>
      </div>

      <div className="grid gap-10 p-7 md:p-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
        {/* inputs */}
        <div>
          <MonoLabel>Your numbers</MonoLabel>
          <div className="mt-2 border-t border-ink-14">
            <FieldRow index={1} label="Active vendors currently engaged" hint="Contractors, suppliers and sub-vendors across all live sites.">
              <Slider value={vendors} onChange={setVendors} min={1} max={150} display={vendors} />
            </FieldRow>

            <FieldRow index={2} label="Tools used to coordinate them" hint="Every additional system adds handoffs and reconciliation time.">
              <div className="flex flex-col gap-2 sm:items-end">
                {TOOL_OPTIONS.map((t) => (
                  <label key={t.id} className="flex items-center gap-2.5 text-sm text-ink-70">
                    <input
                      type="checkbox"
                      checked={tools[t.id]}
                      onChange={() => setTools((s) => ({ ...s, [t.id]: !s[t.id] }))}
                      className="h-4 w-4 accent-black"
                    />
                    {t.label}
                  </label>
                ))}
              </div>
            </FieldRow>

            <FieldRow index={3} label="People spent coordinating vendors/tools" hint="FTE headcount chasing updates, reconciling schedules, resolving handoffs. Can be fractional.">
              <NumField value={coordinators} onChange={setCoordinators} suffix="FTE" />
            </FieldRow>

            <FieldRow index={4} label="Fully-loaded monthly cost of that headcount" hint="Average salary plus overhead, per person, per month.">
              <NumField value={coordCost} onChange={setCoordCost} prefix="₹" />
            </FieldRow>

            <FieldRow index={5} label="Active sites / projects running concurrently" hint="Sites currently in fit-out, build, or handover.">
              <Slider value={sites} onChange={setSites} min={1} max={60} display={sites} />
            </FieldRow>

            <FieldRow index={6} label="Projects with a coordination-related delay, rework, or dispute" hint="Over the last 12 months — share attributable to vendor coordination, not material or design issues.">
              <Slider value={delayPct} onChange={setDelayPct} min={0} max={100} display={`${delayPct}%`} />
            </FieldRow>

            <FieldRow
              index={7}
              label="Cost of a delayed opening or reworked milestone"
              hint={usingDefaultDelayCost ? `Optional. Left blank — using a conservative default of ${inr(DEFAULT_DELAY_COST)}.` : 'Average cost when a site opening slips or a milestone needs rework.'}
            >
              <NumField value={delayCostInput} onChange={setDelayCostInput} prefix="₹" placeholder={String(DEFAULT_DELAY_COST)} />
            </FieldRow>
          </div>
        </div>

        {/* output */}
        <div>
          <div className="rounded-lg bg-ink p-7 text-paper md:p-8">
            <MonoLabel tone="paper">Estimated annual fragmentation tax</MonoLabel>
            <div className="mt-3 font-mono text-3xl font-semibold leading-tight md:text-4xl">
              {inrShort(calc.low)} – {inrShort(calc.high)}
            </div>
            <div className="mt-2 font-mono text-mono-xs text-paper-55">
              {inr(calc.low)} – {inr(calc.high)} per year
            </div>

            <div className="mt-7 flex items-center gap-6">
              <Donut
                size={104}
                thickness={16}
                segments={[
                  { value: calc.laborCost, tone: '#FFFFFF' },
                  { value: calc.toolOverhead, tone: 'rgba(255,255,255,0.55)' },
                  { value: calc.delayRework, tone: 'rgba(255,255,255,0.28)' },
                ]}
              />
              <div className="flex flex-1 flex-col gap-2.5">
                {[
                  { name: 'Coordination labor', value: calc.laborCost, sw: '#FFFFFF' },
                  { name: 'Tool overhead', value: calc.toolOverhead, sw: 'rgba(255,255,255,0.55)' },
                  { name: 'Delay / rework', value: calc.delayRework, sw: 'rgba(255,255,255,0.28)' },
                ].map((d) => (
                  <div key={d.name} className="flex items-center justify-between gap-3 text-xs">
                    <span className="flex items-center gap-2 text-paper-70">
                      <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: d.sw }} aria-hidden="true" />
                      {d.name}
                    </span>
                    <span className="font-mono text-paper-70">{inrShort(d.value)}</span>
                  </div>
                ))}
              </div>
            </div>

            <p className="mt-6 border-t border-paper-14 pt-5 text-sm leading-relaxed text-paper-70">
              That&rsquo;s roughly equivalent to funding <strong className="text-paper">{pmEquivalent.toFixed(1)} additional full-time coordinators</strong> you&rsquo;re already paying for indirectly, through delay and rework alone.
            </p>

            <div className="mt-6">
              <Button to="/contact#general" tone="ink" className="w-full">
                Talk to us about reducing this
              </Button>
            </div>

            <p className="mt-4 text-xs leading-relaxed text-paper-55">
              Estimate based on the inputs provided. Actual costs vary by organization.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowMath((s) => !s)}
            className="mt-6 flex items-center gap-2 text-sm font-medium text-ink"
          >
            <span
              className="inline-block font-mono transition-transform duration-180"
              style={{ transform: showMath ? 'rotate(90deg)' : 'rotate(0deg)' }}
              aria-hidden="true"
            >
              ▸
            </span>
            How we calculated this
          </button>

          {showMath ? (
            <div className="mt-4 rounded-lg bg-ink p-6 text-paper">
              <MathRow
                label="Coordination labor cost"
                formula="FTE headcount × monthly cost × 12"
                value={calc.laborCost}
                note={`${coordinators || 0} FTE × ${inr(Number(coordCost) || 0)}/mo × 12 months.`}
              />
              <MathRow
                label="Tool overhead"
                formula={`(tools selected − 1) × ${TOOL_OVERHEAD_RATE * 100}% × labor cost`}
                value={calc.toolOverhead}
                note={`${toolCount} tools selected. Each additional system beyond the first compounds handoffs and reconciliation time — modelled as ${TOOL_OVERHEAD_RATE * 100}% of labor cost per extra tool.`}
              />
              <MathRow
                label="Delay / rework cost"
                formula="% of projects affected × active sites × cost per incident"
                value={calc.delayRework}
                note={`${delayPct}% × ${sites} sites × ${inr(delayCost)}${usingDefaultDelayCost ? ' (conservative default — no figure entered)' : ''} per incident.`}
              />
              <div className="flex justify-between pt-4 font-mono text-sm font-semibold">
                <span>Total (midpoint)</span>
                <span>{inr(calc.total)}</span>
              </div>
              <p className="mt-3 text-xs leading-relaxed text-paper-55">
                Displayed as a ±15% range because more than one input here is an estimate rather than a hard figure. This
                is a directional model, not an audited cost — use it to size the problem, not to book it.
              </p>
            </div>
          ) : null}
        </div>
      </div>
    </article>
  );
}

/* ------------------------------------------------------- chasing cost model */

export function ChasingCostCalculator() {
  const [quotesPerMonth, setQuotesPerMonth] = useState('8');
  const [conversionPct, setConversionPct] = useState(25);
  const [hoursPerQuote, setHoursPerQuote] = useState('6');
  const [timeMode, setTimeMode] = useState('hourly');
  const [hourlyRate, setHourlyRate] = useState('800');
  const [monthlyRevenue, setMonthlyRevenue] = useState('150000');
  const [workingHours, setWorkingHours] = useState('200');
  const [clientsOwing, setClientsOwing] = useState('3');
  const [outstandingAmount, setOutstandingAmount] = useState('450000');
  const [daysDelayed, setDaysDelayed] = useState('');
  const [borrowRate, setBorrowRate] = useState('14');
  const [ctaOpen, setCtaOpen] = useState(false);

  const calc = useMemo(() => {
    const qpm = Number(quotesPerMonth) || 0;
    const conv = Math.min(Math.max(conversionPct, 0), 100) / 100;
    const hrs = Number(hoursPerQuote) || 0;
    const hourly = timeMode === 'hourly' ? Number(hourlyRate) || 0 : (Number(monthlyRevenue) || 0) / (Number(workingHours) || 1);

    const unwonQuotesPerYear = qpm * 12 * (1 - conv);
    const wastedCost = unwonQuotesPerYear * hrs * hourly;

    const rate = (Number(borrowRate) || 0) / 100;
    const outstanding = Number(outstandingAmount) || 0;
    const hasDays = daysDelayed !== '' && Number(daysDelayed) > 0;
    const dayFraction = hasDays ? Math.min(Number(daysDelayed) / 365, 1.5) : 1;
    const delayCost = outstanding * rate * dayFraction;

    const total = wastedCost + delayCost;
    const low = total * 0.85;
    const high = total * 1.15;
    const weeksOfTime = hourly > 0 ? total / hourly / 40 : 0;

    return { hrs, hourly, unwonQuotesPerYear, wastedCost, delayCost, total, low, high, weeksOfTime, hasDays, outstanding };
  }, [quotesPerMonth, conversionPct, hoursPerQuote, timeMode, hourlyRate, monthlyRevenue, workingHours, outstandingAmount, daysDelayed, borrowRate]);

  return (
    <article className="overflow-hidden rounded-lg border border-ink-14 bg-paper">
      <div className="border-b border-ink-14 p-7 md:p-8">
        <MonoLabel>Chasing Cost Calculator</MonoLabel>
        <h3 className="mt-4 font-display text-h4 font-semibold">
          What unwon quotes and slow-paying clients are costing you.
        </h3>
        <p className="mt-3 max-w-measure text-sm text-ink-70">
          Rough figures are fine — the estimate updates as you go. Nothing entered here is saved or sent anywhere.
        </p>
      </div>

      <div className="grid gap-10 p-7 md:p-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
        {/* inputs */}
        <div>
          <MonoLabel>Your numbers</MonoLabel>
          <div className="mt-2 border-t border-ink-14">
            <FieldRow index={1} label="Quotes or RFQs you respond to" hint="Per month, roughly.">
              <NumField value={quotesPerMonth} onChange={setQuotesPerMonth} suffix="/mo" />
            </FieldRow>

            <FieldRow index={2} label="Of those, how many turn into a won project?" hint="Your rough win rate.">
              <Slider value={conversionPct} onChange={setConversionPct} min={0} max={100} display={`${conversionPct}%`} />
            </FieldRow>

            <FieldRow index={3} label="Hours spent on a single quote" hint="Estimation, site visit, costing — all in.">
              <NumField value={hoursPerQuote} onChange={setHoursPerQuote} suffix="hrs" />
            </FieldRow>

            <FieldRow index={4} label="What your time is worth" hint="Use whichever is easier to estimate.">
              <div className="flex flex-col gap-2 sm:items-end">
                <div className="flex overflow-hidden rounded-md border border-ink-14">
                  <button
                    type="button"
                    onClick={() => setTimeMode('hourly')}
                    className={`px-3 py-1.5 text-xs font-medium ${timeMode === 'hourly' ? 'bg-ink text-paper' : 'bg-paper text-ink-55'}`}
                  >
                    Per hour
                  </button>
                  <button
                    type="button"
                    onClick={() => setTimeMode('monthly')}
                    className={`border-l border-ink-14 px-3 py-1.5 text-xs font-medium ${timeMode === 'monthly' ? 'bg-ink text-paper' : 'bg-paper text-ink-55'}`}
                  >
                    Revenue ÷ hours
                  </button>
                </div>
                {timeMode === 'hourly' ? (
                  <NumField value={hourlyRate} onChange={setHourlyRate} prefix="₹" suffix="/hr" />
                ) : (
                  <div className="flex w-full flex-col gap-2">
                    <NumField value={monthlyRevenue} onChange={setMonthlyRevenue} prefix="₹" suffix="/mo" />
                    <NumField value={workingHours} onChange={setWorkingHours} suffix="hrs/mo" />
                  </div>
                )}
              </div>
            </FieldRow>

            <FieldRow index={5} label="Clients currently owing you past due date" hint="Right now, roughly.">
              <NumField value={clientsOwing} onChange={setClientsOwing} />
            </FieldRow>

            <FieldRow index={6} label="Total amount currently outstanding" hint="Across those delayed payments.">
              <NumField value={outstandingAmount} onChange={setOutstandingAmount} prefix="₹" />
            </FieldRow>

            <FieldRow index={7} label="Typical delay beyond the agreed date" hint="Optional — leave blank if it varies too much.">
              <NumField value={daysDelayed} onChange={setDaysDelayed} suffix="days" placeholder="—" />
            </FieldRow>
          </div>

          <div className="mt-5 rounded-md border border-dashed border-ink-30 p-3 text-xs leading-relaxed text-ink-55">
            We treat delayed payment as tying up cash at an assumed{' '}
            <input
              type="number"
              value={borrowRate}
              onChange={(e) => setBorrowRate(e.target.value)}
              className="w-12 rounded-sm border border-ink-14 bg-cloud px-1 text-center font-mono text-xs text-ink"
            />
            % a year — roughly what short-term working capital costs. Change it if your own cost of borrowing is
            different.
          </div>
        </div>

        {/* output */}
        <div>
          <div className="rounded-lg bg-ink p-7 text-paper md:p-8">
            <MonoLabel tone="paper">Your estimated chasing cost</MonoLabel>
            <div className="mt-3 font-mono text-3xl font-semibold leading-tight md:text-4xl">
              {inrShort(calc.low)} – {inrShort(calc.high)}
              <span className="ml-2 text-base font-normal text-paper-55">/year</span>
            </div>
            <p className="mt-2 text-xs text-paper-55">
              Based on {inr(calc.total)} at the midpoint, widened into a range since more than one figure here is an
              estimate.
            </p>

            <div className="mt-7 flex items-center gap-6">
              <Donut
                size={104}
                thickness={16}
                segments={[
                  { value: calc.wastedCost, tone: '#FFFFFF' },
                  { value: calc.delayCost, tone: 'rgba(255,255,255,0.4)' },
                ]}
              />
              <div className="flex flex-1 flex-col gap-3">
                <div>
                  <div className="flex items-center justify-between gap-3 text-xs">
                    <span className="flex items-center gap-2 text-paper-70">
                      <span className="h-2 w-2 shrink-0 rounded-full bg-paper" aria-hidden="true" />
                      Wasted quoting
                    </span>
                    <span className="font-mono text-paper-70">{inr(calc.wastedCost)}</span>
                  </div>
                  <p className="mt-1 pl-4 text-[11px] leading-snug text-paper-55">
                    ~{Math.round(calc.unwonQuotesPerYear)} quotes/yr that didn&rsquo;t convert, at {calc.hrs}hrs each and {inr(calc.hourly)}/hr
                  </p>
                </div>
                <div>
                  <div className="flex items-center justify-between gap-3 text-xs">
                    <span className="flex items-center gap-2 text-paper-70">
                      <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: 'rgba(255,255,255,0.4)' }} aria-hidden="true" />
                      Payment delay
                    </span>
                    <span className="font-mono text-paper-70">{inr(calc.delayCost)}</span>
                  </div>
                  <p className="mt-1 pl-4 text-[11px] leading-snug text-paper-55">
                    {inr(calc.outstanding)} outstanding at {borrowRate}%{calc.hasDays ? `, for ${daysDelayed} days` : ', assumed as a running average'}
                  </p>
                </div>
              </div>
            </div>

            <p className="mt-6 border-t border-paper-14 pt-5 text-sm leading-relaxed text-paper-70">
              {calc.weeksOfTime >= 1 ? (
                <>
                  That&rsquo;s close to <span className="font-mono text-paper">{calc.weeksOfTime.toFixed(1)} weeks</span> of
                  your own billable time a year, spent chasing instead of building — across {clientsOwing || 0} clients
                  currently past due.
                </>
              ) : (
                <>
                  That&rsquo;s time and cash tied up chasing instead of building — across {clientsOwing || 0} clients
                  currently past due.
                </>
              )}
            </p>

            <button
              type="button"
              onClick={() => setCtaOpen((v) => !v)}
              className="mt-6 w-full rounded-md bg-paper px-5 py-3 text-left text-sm font-medium text-ink transition-colors duration-180 hover:bg-paper-70"
            >
              See how verified vendors get paid differently
            </button>
            {ctaOpen ? (
              <div className="mt-3 rounded-md border border-paper-14 bg-paper-08 p-4 text-xs leading-relaxed text-paper-70">
                <strong className="text-paper">Payment on milestone, not on chase.</strong> Vendors on Graviyx get paid
                against agreed project milestones through The Ledger, instead of relying on informal follow-up after
                work is done. It doesn&rsquo;t remove client risk entirely, but it moves the chasing off your desk and onto
                a verified process.
              </div>
            ) : null}

            <p className="mt-4 text-xs leading-relaxed text-paper-55">Estimate based on the inputs provided. Actual costs vary.</p>
          </div>
        </div>
      </div>
    </article>
  );
}
