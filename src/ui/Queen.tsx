/** Illustration: a chess queen on a sunlit square, built from simple shapes. Colours follow the theme. */
export function Queen() {
  return (
    <svg viewBox="0 0 400 400" role="img" aria-label="Illustration of a chess queen standing on a board">
      <circle cx="200" cy="200" r="190" fill="var(--blush)" />
      {/* Board squares fanning out in perspective */}
      <g opacity="0.9">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <polygon key={i}
            points={`${60 + i * 46},300 ${106 + i * 46},300 ${116 + i * 50},352 ${66 + i * 50},352`}
            fill={i % 2 ? "var(--paper)" : "var(--ink)"} opacity={i % 2 ? 0.9 : 0.12} />
        ))}
      </g>
      {/* Shadow */}
      <ellipse cx="200" cy="304" rx="78" ry="12" fill="var(--ink)" opacity="0.18" />
      {/* Base */}
      <rect x="128" y="276" width="144" height="26" rx="13" fill="var(--ink)" />
      <rect x="142" y="256" width="116" height="24" rx="12" fill="var(--ink)" />
      {/* Body */}
      <path d="M156 258 C 168 210, 176 170, 172 128 L 228 128 C 224 170, 232 210, 244 258 Z" fill="var(--ink)" />
      {/* Collar */}
      <rect x="160" y="118" width="80" height="16" rx="8" fill="var(--accent)" />
      {/* Crown */}
      <path d="M160 120 L 150 72 L 176 98 L 200 62 L 224 98 L 250 72 L 240 120 Z" fill="var(--ink)" />
      {[150, 176, 200, 224, 250].map((x, i) => (
        <circle key={x} cx={x} cy={[66, 90, 54, 90, 66][i]} r="9" fill="var(--accent)" />
      ))}
      {/* Light catching the body */}
      <path d="M186 140 C 188 180, 184 220, 176 252" stroke="var(--paper)" strokeOpacity="0.35" strokeWidth="6" strokeLinecap="round" fill="none" />
    </svg>
  );
}
