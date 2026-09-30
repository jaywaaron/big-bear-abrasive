/** Line icons for the safety rules printed on every BigBear label. */
export type SafetyKind = "guard" | "eyes" | "ears" | "speed" | "mount" | "inspect";

export default function SafetyIcon({ kind, className }: { kind: SafetyKind; className?: string }) {
  const common = {
    viewBox: "0 0 48 48",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className,
    "aria-hidden": true,
  };

  switch (kind) {
    case "guard":
      // Disc partly covered by a guard
      return (
        <svg {...common}>
          <circle cx="24" cy="26" r="12" />
          <circle cx="24" cy="26" r="3" />
          <path d="M8 26a16 16 0 0 1 32 0" strokeWidth="4" />
        </svg>
      );
    case "eyes":
      // Safety goggles
      return (
        <svg {...common}>
          <path d="M6 20h36v8a6 6 0 0 1-6 6h-6l-3-4h-6l-3 4h-6a6 6 0 0 1-6-6z" />
          <path d="M6 22H3M42 22h3" />
        </svg>
      );
    case "ears":
      // Ear defenders
      return (
        <svg {...common}>
          <path d="M12 26v-4a12 12 0 0 1 24 0v4" />
          <rect x="7" y="26" width="8" height="12" rx="3" />
          <rect x="33" y="26" width="8" height="12" rx="3" />
        </svg>
      );
    case "speed":
      // Gauge with the needle below the red line
      return (
        <svg {...common}>
          <path d="M8 34a16 16 0 1 1 32 0" />
          <path d="M24 34l-7-9" />
          <path d="M36 22l3-2" strokeWidth="4" className="text-spark" stroke="currentColor" />
        </svg>
      );
    case "mount":
      // Flange + nut on a spindle
      return (
        <svg {...common}>
          <path d="M24 6v36" />
          <path d="M12 20h24M12 28h24" />
          <path d="M17 14h14l-2 6H19zM19 28h10l2 6H17z" />
        </svg>
      );
    case "inspect":
      // Magnifier over a crack
      return (
        <svg {...common}>
          <circle cx="20" cy="20" r="11" />
          <path d="M28 28l12 12" strokeWidth="4" />
          <path d="M15 15l4 4-3 3 5 4" strokeWidth="2" />
        </svg>
      );
  }
}
