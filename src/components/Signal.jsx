import { useEffect, useState } from 'react';

/**
 * The hero motif: four independent forms, one promoter.
 *
 * A single orchestrated page-load sequence — the forms activate in order
 * (Vision, Structure, Execution, Outcome) and then hold. This is the only
 * non-user-triggered motion on the site. The geometry is the brand's shape
 * language drawn on the 2x2 grid; it is not the logo and never substitutes for
 * it. The notch in the large circle stays open, as the brand requires.
 */
export default function Signal({ className = '', tone = 'ink' }) {
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setArmed(true);
      return;
    }
    const t = setTimeout(() => setArmed(true), 140);
    return () => clearTimeout(t);
  }, []);

  const fill = tone === 'paper' ? '#FFFFFF' : '#000000';
  const delays = [0, 150, 300, 450];

  const style = (i) => ({
    fill,
    opacity: armed ? 1 : 0,
    transform: armed ? 'none' : 'scale(0.9)',
    transformOrigin: 'center',
    transformBox: 'fill-box',
    transition:
      `opacity 560ms cubic-bezier(0.22,0.61,0.36,1) ${delays[i]}ms,` +
      `transform 560ms cubic-bezier(0.22,0.61,0.36,1) ${delays[i]}ms`,
  });

  return (
    <svg viewBox="0 0 200 200" className={className} role="img" aria-label="Four forms, one signal">
      <path style={style(0)} d="M44,95.6 A46,46 0 1 1 56,95.6 L50,84 Z" />
      <rect style={style(1)} x="110" y="8" width="84" height="84" rx="27" />
      <path style={style(2)} d="M50,106 94,192 6,192 Z" />
      <circle style={style(3)} cx="152" cy="150" r="42" />
    </svg>
  );
}
