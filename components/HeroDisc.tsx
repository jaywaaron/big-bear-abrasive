import Image from "next/image";
import type { CSSProperties } from "react";

// Fixed spark set (no Math.random) so server and client render the same.
// a = throw angle in degrees (0 = right, 90 = down), d = distance, t = duration.
export const SPARKS = [
  { a: 8, d: 170, t: 0.9, delay: 0 },
  { a: 18, d: 210, t: 1.1, delay: 0.25 },
  { a: 26, d: 140, t: 0.8, delay: 0.5 },
  { a: 34, d: 190, t: 1.0, delay: 0.1 },
  { a: 12, d: 120, t: 0.7, delay: 0.65 },
  { a: 42, d: 160, t: 1.2, delay: 0.35 },
  { a: 22, d: 240, t: 1.3, delay: 0.8 },
  { a: 50, d: 110, t: 0.8, delay: 0.95 },
  { a: 4, d: 200, t: 1.0, delay: 1.1 },
  { a: 30, d: 230, t: 1.2, delay: 1.25 },
  { a: 16, d: 150, t: 0.9, delay: 1.4 },
  { a: 38, d: 130, t: 0.75, delay: 1.55 },
];

/**
 * The real BigBear 100 mm grinding disc (A/F24Q4BF), turning slowly (counter-clockwise, so
 * the bottom edge moves right and throws sparks away from the headline).
 */
export default function HeroDisc() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[560px]">
      {/* Floor glow */}
      <div className="bg-spark/25 absolute inset-[12%] rounded-full blur-3xl" aria-hidden />
      <div className="animate-spin-slow absolute inset-0 [animation-direction:reverse]">
        <Image
          src="/products/disc-grinding.webp"
          alt="BigBear 100 mm resin bonded grinding disc for metal and stainless steel"
          fill
          preload
          sizes="(max-width: 1024px) 90vw, 560px"
          className="object-contain drop-shadow-[0_30px_40px_rgba(0,0,0,0.6)]"
        />
      </div>
      {/* Spark emitter at the disc's bottom edge */}
      <div className="pointer-events-none absolute top-[97%] left-[58%]" aria-hidden>
        {SPARKS.map((s, i) => (
          <span
            key={i}
            className="spark"
            style={
              {
                "--a": `${s.a}deg`,
                "--d": `${s.d}px`,
                "--t": `${s.t}s`,
                "--delay": `${s.delay}s`,
              } as CSSProperties
            }
          />
        ))}
      </div>
    </div>
  );
}
