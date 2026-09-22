import { Link } from 'react-router-dom';
import { O360 } from '../lib/site';

import symbolBlack from '../assets/brand/operon-symbol-black-trim.png';
import symbolWhite from '../assets/brand/operon-symbol-white-trim.png';
import wordmarkBlack from '../assets/brand/operon-wordmark-black-trim.png';
import wordmarkWhite from '../assets/brand/operon-wordmark-white-trim.png';
import platformBlack from '../assets/brand/Platform_black-trim.png';
import platformWhite from '../assets/brand/Platform_white-trim.png';

// Brand rules enforced here, so they cannot be broken at call sites:
//   01  Black is the primary logo, white is the reversed logo. No third variant.
//   03  Geometry is fixed — assets are used as supplied, never redrawn or tinted.
//   07  Clear space equals the height of the symbol's small circle.
// The notch is part of the supplied artwork and is never filled or covered.

const CLEAR_SPACE = 0.43; // small-circle height ÷ symbol height

const ASSETS = {
  symbol: { black: symbolBlack, white: symbolWhite, ratio: 579 / 533, alt: 'Operon' },
  wordmark: { black: wordmarkBlack, white: wordmarkWhite, ratio: 993 / 391, alt: 'Operon Softwares' },
  platform: { black: platformBlack, white: platformWhite, ratio: 770 / 219, alt: 'Operon 360' },
};

export function Mark({ variant = 'symbol', tone = 'black', height = 28, clearSpace = false, className = '' }) {
  const asset = ASSETS[variant];
  return (
    <span
      className={`inline-block ${className}`}
      style={clearSpace ? { padding: `${height * CLEAR_SPACE}px` } : undefined}
    >
      <img
        src={tone === 'white' ? asset.white : asset.black}
        alt={asset.alt}
        width={Math.round(height * asset.ratio)}
        height={height}
        style={{ height, width: 'auto', display: 'block' }}
      />
    </span>
  );
}

/** Corporate lockup: symbol + Operon Softwares wordmark. */
export function CorporateLogo({ tone = 'black', height = 26, className = '' }) {
  return (
    <Link
      to="/"
      aria-label="Operon Softwares — home"
      className={`inline-flex items-center gap-3 ${className}`}
      style={{ gap: height * CLEAR_SPACE }}
    >
      <Mark variant="symbol" tone={tone} height={height} />
      <Mark variant="wordmark" tone={tone} height={height * 0.78} />
    </Link>
  );
}

/** Platform lockup: the sanctioned Operon 360 asset. */
export function PlatformLogo({ tone = 'black', height = 22, className = '' }) {
  return (
    <Link to={O360} aria-label="Operon 360 — home" className={`inline-flex items-center ${className}`}>
      <Mark variant="platform" tone={tone} height={height} />
    </Link>
  );
}
