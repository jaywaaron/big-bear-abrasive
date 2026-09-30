import type { Product } from "@/lib/products";

/**
 * A drawn BigBear disc, styled after the real label: grey/black split with
 * a coloured band, a steel centre ring and a textured abrasive body.
 * Used where we don't have a photo of the exact model.
 *
 * `toScale` shrinks smaller diameters so a row of cards reads 4" → 9".
 */
export default function DiscArt({
  product,
  toScale = false,
  uid,
  className,
}: {
  product: Product;
  toScale?: boolean;
  /** Unique per render on a page — SVG ids (filters, masks) must not clash. */
  uid?: string;
  className?: string;
}) {
  const id = `disc-${uid ?? product.slug}`;
  const { diameter, bore } = product.size;
  const C = 120;
  const rOuter = toScale ? 70 + ((diameter - 100) / 130) * 46 : 114;
  const rLabel = rOuter * 0.6;
  const rHole = Math.max(rOuter * (bore / diameter), 6);
  const rRing = rHole * 1.9;
  const band = rLabel * 0.16;
  // Label text sits midway between the steel ring and the label edge, sized
  // to fit that strip (it runs vertically, like the printed label).
  const textOffset = (rRing + rLabel) / 2;
  const strip = rLabel - rRing;
  const chord = 2 * Math.sqrt(rLabel ** 2 - textOffset ** 2) * 0.85;
  const brandSize = Math.min(strip * 0.62, chord / 3.6);
  const codeSize = Math.min(strip * 0.48, chord / 4.4);
  const body = product.abrasive === "Silicon carbide" ? "#23282a" : "#3a2420";
  const bodyEdge = product.abrasive === "Silicon carbide" ? "#15181a" : "#241512";

  return (
    <svg
      viewBox="0 0 240 240"
      className={className}
      role="img"
      aria-label={`${product.code} ${product.name}, ${diameter} mm disc`}
    >
      <defs>
        {/* Grain: fractal noise tinted and laid over the disc body. */}
        <filter id={`${id}-grain`} x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="1.4" numOctaves="2" seed={diameter} result="n" />
          <feColorMatrix
            in="n"
            type="matrix"
            values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.55 -0.18"
          />
          <feComposite in2="SourceGraphic" operator="in" />
        </filter>
        <radialGradient id={`${id}-body`} cx="50%" cy="50%" r="50%">
          <stop offset={product.conical ? "0.45" : "0.7"} stopColor={body} />
          <stop offset="1" stopColor={bodyEdge} />
        </radialGradient>
        <linearGradient id={`${id}-steel`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f1f2f4" />
          <stop offset="0.5" stopColor="#b9bcc1" />
          <stop offset="1" stopColor="#e3e5e8" />
        </linearGradient>
        <pattern id={`${id}-mesh`} width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <path d="M0 0H7M0 0V7" stroke="#000" strokeOpacity="0.35" strokeWidth="1" />
        </pattern>
        <clipPath id={`${id}-label`}>
          <circle cx={C} cy={C} r={rLabel} />
        </clipPath>
        {/* Punch the centre hole out so the page shows through. */}
        <mask id={`${id}-hole`}>
          <rect width="240" height="240" fill="#fff" />
          <circle cx={C} cy={C} r={rHole} fill="#000" />
        </mask>
      </defs>

      <g mask={`url(#${id}-hole)`}>
        {/* Body */}
        <circle cx={C} cy={C} r={rOuter} fill={`url(#${id}-body)`} />
        <circle cx={C} cy={C} r={rOuter} fill={`url(#${id}-mesh)`} />
        <circle cx={C} cy={C} r={rOuter} fill="#fff" filter={`url(#${id}-grain)`} opacity="0.5" />
        {product.conical &&
          [0.92, 0.82, 0.72].map((f) => (
            <circle key={f} cx={C} cy={C} r={rOuter * f} fill="none" stroke="#000" strokeOpacity="0.35" strokeWidth="1.2" />
          ))}
        <circle cx={C} cy={C} r={rOuter - 0.75} fill="none" stroke="#fff" strokeOpacity="0.12" strokeWidth="1.5" />

        {/* Label: grey left, black right, accent band down the middle */}
        <g clipPath={`url(#${id}-label)`}>
          <rect x="0" y="0" width={C} height="240" fill="#c9cbcf" />
          <rect x={C} y="0" width={C} height="240" fill="#161719" />
          <rect x={C - band / 2} y="0" width={band} height="240" fill={product.accent} />
        </g>
        <text
          x={C + textOffset}
          y={C}
          transform={`rotate(90 ${C + textOffset} ${C})`}
          textAnchor="middle"
          dominantBaseline="middle"
          fill="#f3f2ee"
          fontFamily="var(--font-barlow-condensed), sans-serif"
          fontWeight="800"
          fontSize={brandSize}
          letterSpacing="0.5"
        >
          BIGBEAR
        </text>
        <text
          x={C - textOffset}
          y={C}
          transform={`rotate(90 ${C - textOffset} ${C})`}
          textAnchor="middle"
          dominantBaseline="middle"
          fill="#1b1c1f"
          fontFamily="var(--font-barlow-condensed), sans-serif"
          fontWeight="700"
          fontSize={codeSize}
        >
          {product.code}
        </text>

        {/* Steel centre ring with rivets */}
        <circle cx={C} cy={C} r={rRing} fill={`url(#${id}-steel)`} />
        {[45, 135, 225, 315].map((deg) => {
          const a = (deg * Math.PI) / 180;
          const rr = (rRing + rHole) / 2;
          return <circle key={deg} cx={C + Math.cos(a) * rr} cy={C + Math.sin(a) * rr} r={Math.max(rRing * 0.07, 0.9)} fill="#6b6e73" />;
        })}
        <circle cx={C} cy={C} r={rHole + 0.6} fill="none" stroke="#7d8086" strokeWidth="1" />
      </g>
    </svg>
  );
}
