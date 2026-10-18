import { stations } from "../content/cv";
import { TOWER_HEIGHTS } from "../walk/layout";

/** 2D trading floor: six candlestick towers in isometric-ish perspective, a gold price line and the ticker tag. */
export function FloorSvg() {
  const W = 560, H = 380, base = 320, sx = 78, x0 = 70, unit = 22, bw = 34;
  const tops = TOWER_HEIGHTS.map((h, i) => ({ x: x0 + i * sx, y: base - h * unit - (i % 2) * 8 }));
  const line = tops.map((t, i) => `${i ? "L" : "M"}${t.x + bw / 2},${t.y - 16}`).join(" ");
  return (
    <svg className="floor-svg" viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Six candlestick towers rising from left to right, one per career station, with a gold price line across their tops">
      <defs>
        <pattern id="fl-grid" width="24" height="12" patternUnits="userSpaceOnUse" patternTransform="skewX(-35)">
          <path d="M24 0H0V12" fill="none" stroke="#24414B" strokeWidth="1" />
        </pattern>
      </defs>
      <polygon points={`0,${base + 4} ${W},${base + 4} ${W - 40},${H} 40,${H}`} fill="url(#fl-grid)" opacity="0.8" />
      {tops.map((t, i) => {
        const h = base - t.y;
        const big = i === 1 || i === 4;
        return (
          <g key={stations[i].n} className="tower">
            <rect x={t.x + bw / 2 - 2} y={t.y - 22} width="4" height={h + 22} fill="#E0AE5E" />
            <rect x={t.x} y={t.y} width={bw} height={h} fill={i >= 4 ? "#3FB08A" : i === 0 ? "#5D7480" : "#2C8A9C"} />
            <polygon points={`${t.x + bw},${t.y} ${t.x + bw + 10},${t.y - 7} ${t.x + bw + 10},${base - 7} ${t.x + bw},${base}`} fill="#0F3E48" />
            <polygon points={`${t.x},${t.y} ${t.x + 10},${t.y - 7} ${t.x + bw + 10},${t.y - 7} ${t.x + bw},${t.y}`} fill="#7FD0DE" opacity="0.6" />
            <text x={t.x + bw / 2} y={base + 26} textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="13" fill="#E0AE5E">{stations[i].n}</text>
            {big && <text x={t.x - 6} y={t.y - 30} fontFamily="JetBrains Mono, monospace" fontSize="10" fill="#6FD39E">▲ jump</text>}
          </g>
        );
      })}
      <path className="price" d={line} fill="none" stroke="#E0AE5E" strokeWidth="2.5" strokeDasharray="7 5" />
      <g className="tag-pos" transform={`translate(${tops[5].x + bw + 8}, ${tops[5].y - 44})`}><g className="tag">
        <rect width="62" height="22" fill="#E0AE5E" />
        <text x="31" y="15" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="12" fontWeight="700" fill="#1A1206">MBC ▲</text>
      </g></g>
    </svg>
  );
}
