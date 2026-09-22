/**
 * Ambient signal. Never noise.
 *
 * The brand's background rule: enlarge a form until it becomes environment,
 * keep it faint, and always leave a text-safe zone. This renders the supplied
 * white-to-black linear gradient as a heavily blurred ambient layer behind the
 * page — the same construction as the Figma layer (linear fill, #FFFFFF stop at
 * 0%, #000000 stop at 100%, layer blur), held at low opacity so type keeps its
 * contrast ratio.
 *
 * `tone="paper"` is for Ink surfaces, where the gradient runs the other way.
 */
export default function AmbientGradient({ tone = 'ink', className = '', intensity = 0.12 }) {
  const gradient =
    tone === 'paper'
      ? 'linear-gradient(160deg, #000000 0%, #FFFFFF 100%)'
      : 'linear-gradient(160deg, #FFFFFF 0%, #000000 100%)';

  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      <div
        className="absolute -inset-[20%]"
        style={{
          backgroundImage: gradient,
          filter: 'blur(120px)',
          opacity: intensity,
        }}
      />
    </div>
  );
}
