export function MonthArt({ month, accent }) {
  const arts = [
    // January – snowflake
    <svg key={0} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {[0, 60, 120].map(r => (
        <g key={r} transform={`rotate(${r} 100 100)`}>
          <line x1="100" y1="22" x2="100" y2="178" stroke={accent} strokeWidth="1.5" strokeOpacity="0.6" />
          {[55, 80, 120, 145].map(y => (
            <g key={y}>
              <line x1="100" y1={y} x2={100 - (100 - y) * 0.5} y2={y - 12} stroke={accent} strokeWidth="1" strokeOpacity="0.45" />
              <line x1="100" y1={y} x2={100 + (100 - y) * 0.5} y2={y - 12} stroke={accent} strokeWidth="1" strokeOpacity="0.45" />
            </g>
          ))}
        </g>
      ))}
      <circle cx="100" cy="100" r="6" fill={accent} />
      {[[32, 32], [168, 32], [32, 168], [168, 168]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="3" fill={accent} fillOpacity="0.45" />
      ))}
    </svg>,

    // February – heart
    <svg key={1} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M100 162 C30 118 16 76 38 56 C55 40 78 48 100 74 C122 48 145 40 162 56 C184 76 170 118 100 162Z"
        fill={accent} fillOpacity="0.28" stroke={accent} strokeWidth="1.5" />
      <path d="M100 142 C52 110 38 84 54 68 C64 58 82 64 100 84 C118 64 136 58 146 68 C162 84 148 110 100 142Z"
        fill={accent} fillOpacity="0.2" />
      {[[28, 155], [172, 145], [55, 30], [148, 28]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="4" fill={accent} fillOpacity={0.25 + i * 0.08} />
      ))}
    </svg>,

    // March – budding branch
    <svg key={2} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M100 190 Q100 150 100 100" stroke={accent} strokeWidth="2.5" strokeOpacity="0.65" fill="none" />
      <path d="M100 145 Q80 120 55 100" stroke={accent} strokeWidth="1.5" strokeOpacity="0.55" fill="none" />
      <path d="M100 120 Q125 95 155 78" stroke={accent} strokeWidth="1.5" strokeOpacity="0.55" fill="none" />
      <path d="M100 160 Q70 148 45 145" stroke={accent} strokeWidth="1" strokeOpacity="0.45" fill="none" />
      <path d="M100 100 Q78 72 62 52" stroke={accent} strokeWidth="1.5" strokeOpacity="0.55" fill="none" />
      {[[55, 100], [155, 78], [45, 145], [62, 52], [100, 100]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={5 + (i % 3)} fill={accent} fillOpacity="0.75" />
      ))}
    </svg>,

    // April – five-petal blossoms
    <svg key={3} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M100 200 Q100 160 100 110" stroke={accent} strokeWidth="2" strokeOpacity="0.5" fill="none" />
      <path d="M100 150 Q70 120 45 105" stroke={accent} strokeWidth="1.2" strokeOpacity="0.45" fill="none" />
      <path d="M100 125 Q140 100 162 80" stroke={accent} strokeWidth="1.2" strokeOpacity="0.45" fill="none" />
      {[[100, 90], [60, 90], [158, 74], [88, 48]].map(([cx, cy]) => (
        <g key={`${cx}-${cy}`}>
          {[0, 72, 144, 216, 288].map(a => (
            <ellipse key={a}
              cx={cx + Math.cos(a * Math.PI / 180) * 13} cy={cy + Math.sin(a * Math.PI / 180) * 13}
              rx="7" ry="10" fill={accent} fillOpacity="0.52"
              transform={`rotate(${a + 90} ${cx + Math.cos(a * Math.PI / 180) * 13} ${cy + Math.sin(a * Math.PI / 180) * 13})`} />
          ))}
          <circle cx={cx} cy={cy} r="4" fill="rgba(255,255,255,0.65)" />
        </g>
      ))}
    </svg>,

    // May – rolling hills + sun
    <svg key={4} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="100" cy="78" r="26" fill={accent} fillOpacity="0.6" />
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map(a => (
        <line key={a}
          x1={100 + Math.cos(a * Math.PI / 180) * 31} y1={78 + Math.sin(a * Math.PI / 180) * 31}
          x2={100 + Math.cos(a * Math.PI / 180) * 46} y2={78 + Math.sin(a * Math.PI / 180) * 46}
          stroke={accent} strokeWidth="1.5" strokeOpacity="0.4" />
      ))}
      <path d="M0 165 Q50 130 100 148 Q150 166 200 138 L200 200 L0 200Z" fill={accent} fillOpacity="0.32" />
      <path d="M0 182 Q60 162 110 175 Q158 186 200 164 L200 200 L0 200Z" fill={accent} fillOpacity="0.48" />
    </svg>,

    // June – radiant sun
    <svg key={5} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="100" cy="100" r="36" fill={accent} fillOpacity="0.7" />
      {Array.from({ length: 18 }, (_, i) => i * 20).map(a => (
        <line key={a}
          x1={100 + Math.cos(a * Math.PI / 180) * 42} y1={100 + Math.sin(a * Math.PI / 180) * 42}
          x2={100 + Math.cos(a * Math.PI / 180) * (a % 40 === 0 ? 68 : 58)} y2={100 + Math.sin(a * Math.PI / 180) * (a % 40 === 0 ? 68 : 58)}
          stroke={accent} strokeWidth={a % 40 === 0 ? 2 : 1.2} strokeOpacity={a % 40 === 0 ? 0.65 : 0.4} />
      ))}
      <circle cx="100" cy="100" r="20" fill={accent} />
    </svg>,

    // July – fireworks
    <svg key={6} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {[[70, 65, 10], [130, 80, 8], [95, 135, 12]].map(([cx, cy, r], fi) => (
        <g key={fi}>
          {Array.from({ length: 12 }, (_, i) => i * 30).map(a => (
            <g key={a}>
              <line x1={cx + Math.cos(a * Math.PI / 180) * r} y1={cy + Math.sin(a * Math.PI / 180) * r}
                x2={cx + Math.cos(a * Math.PI / 180) * (r + 28 + fi * 4)} y2={cy + Math.sin(a * Math.PI / 180) * (r + 28 + fi * 4)}
                stroke={accent} strokeWidth="1.5" strokeOpacity={0.72 - fi * 0.14} />
              <circle cx={cx + Math.cos(a * Math.PI / 180) * (r + 30 + fi * 4)} cy={cy + Math.sin(a * Math.PI / 180) * (r + 30 + fi * 4)}
                r="2" fill={accent} fillOpacity={0.6 - fi * 0.1} />
            </g>
          ))}
          <circle cx={cx} cy={cy} r={r} fill={accent} fillOpacity={0.85 - fi * 0.15} />
        </g>
      ))}
    </svg>,

    // August – sunflower
    <svg key={7} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <line x1="100" y1="200" x2="100" y2="128" stroke={accent} strokeWidth="2.5" strokeOpacity="0.6" />
      {Array.from({ length: 16 }, (_, i) => i * 22.5).map((a, i) => (
        <ellipse key={i}
          cx={100 + Math.cos(a * Math.PI / 180) * 46} cy={100 + Math.sin(a * Math.PI / 180) * 46}
          rx="11" ry="18" fill={accent} fillOpacity="0.58"
          transform={`rotate(${a + 90} ${100 + Math.cos(a * Math.PI / 180) * 46} ${100 + Math.sin(a * Math.PI / 180) * 46})`} />
      ))}
      <circle cx="100" cy="100" r="24" fill={accent} fillOpacity="0.9" />
      <circle cx="100" cy="100" r="17" fill={accent} />
      {[[-5, -5], [0, -7], [5, -5], [7, 0], [5, 5], [0, 7], [-5, 5], [-7, 0]].map(([dx, dy], i) => (
        <circle key={i} cx={100 + dx} cy={100 + dy} r="2.5" fill="rgba(0,0,0,0.3)" />
      ))}
    </svg>,

    // September – autumn leaves
    <svg key={8} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M100 195 L100 115" stroke={accent} strokeWidth="3" strokeOpacity="0.65" fill="none" />
      <path d="M100 155 Q78 138 55 128" stroke={accent} strokeWidth="2" strokeOpacity="0.55" fill="none" />
      <path d="M100 130 Q132 108 158 95" stroke={accent} strokeWidth="2" strokeOpacity="0.55" fill="none" />
      {[[100, 95], [75, 80], [128, 72], [92, 58], [145, 88], [62, 112]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={10 + i * 2.5} fill={accent} fillOpacity={0.32 + i * 0.04} />
      ))}
      {[[35, 120, 18], [162, 105, 32], [42, 162, 46], [170, 155, 60], [75, 178, 12]].map(([x, y, rot], i) => (
        <path key={i} d={`M${x},${y} C${x - 4},${y - 6} ${x + 4},${y - 8} ${x + 6},${y - 3} C${x + 8},${y + 2} ${x + 2},${y + 5} ${x},${y}Z`}
          fill={accent} fillOpacity="0.55" transform={`rotate(${rot} ${x} ${y})`} />
      ))}
    </svg>,

    // October – crescent moon + bats
    <svg key={9} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M135 95 A52 52 0 1 1 135 105.01 A36 36 0 1 0 135 95Z" fill={accent} fillOpacity="0.8" />
      {[[48, 44], [58, 148], [155, 138], [38, 172], [140, 42]].map(([x, y], i) => (
        <g key={i} transform={`translate(${x},${y}) scale(${0.7 + i * 0.08})`}>
          <path d="M0,0 C-14,-6 -22,-2 -22,5 C-18,8 -10,3 0,0Z" fill={accent} fillOpacity="0.7" />
          <path d="M0,0 C14,-6 22,-2 22,5 C18,8 10,3 0,0Z" fill={accent} fillOpacity="0.7" />
          <circle cx="0" cy="-3" r="4" fill={accent} />
        </g>
      ))}
    </svg>,

    // November – wheat sheaf
    <svg key={10} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {[60, 75, 90, 100, 110, 125, 140].map((x, i) => {
        const lean = (x - 100) * 0.35;
        return (
          <g key={x}>
            <line x1={x} y1="195" x2={x + lean} y2="100" stroke={accent} strokeWidth="1.5" strokeOpacity="0.62" />
            {[100, 115, 130, 145, 160, 175].map(y => (
              <ellipse key={y}
                cx={x + lean * (195 - y) / 95} cy={y} rx="4" ry="7" fill={accent} fillOpacity="0.58"
                transform={`rotate(${lean * 1.5} ${x + lean * (195 - y) / 95} ${y})`} />
            ))}
          </g>
        );
      })}
      <ellipse cx="100" cy="185" rx="22" ry="6" fill={accent} fillOpacity="0.45" />
    </svg>,

    // December – pine tree + stars
    <svg key={11} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <polygon points="100,26 62,90 78,90 48,140 82,140 68,178 132,178 118,140 152,140 122,90 138,90"
        fill={accent} fillOpacity="0.4" stroke={accent} strokeWidth="1.2" />
      <rect x="88" y="178" width="24" height="14" fill={accent} fillOpacity="0.58" />
      {[[100, 18, 6], [30, 35, 4], [175, 28, 3.5], [22, 98, 3], [175, 88, 4], [48, 165, 3], [165, 162, 3.5]].map(([x, y, r], i) => (
        <g key={i}>
          <line x1={x} y1={y - r * 1.6} x2={x} y2={y + r * 1.6} stroke={accent} strokeWidth="1.2" strokeOpacity="0.65" />
          <line x1={x - r * 1.6} y1={y} x2={x + r * 1.6} y2={y} stroke={accent} strokeWidth="1.2" strokeOpacity="0.65" />
          <line x1={x - r} y1={y - r} x2={x + r} y2={y + r} stroke={accent} strokeWidth="0.8" strokeOpacity="0.45" />
          <line x1={x + r} y1={y - r} x2={x - r} y2={y + r} stroke={accent} strokeWidth="0.8" strokeOpacity="0.45" />
        </g>
      ))}
      <circle cx="100" cy="18" r="4" fill={accent} />
      {[[85, 112], [95, 132], [108, 120], [115, 147], [78, 150]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="3" fill={accent} fillOpacity="0.72" />
      ))}
    </svg>,
  ];

  return (
    <div style={{ width: "100%", aspectRatio: "1", display: "flex", alignItems: "center", justifyContent: "center" }}>
      {arts[month]}
    </div>
  );
}
