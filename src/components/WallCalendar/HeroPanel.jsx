"use client";
import { MonthArt } from "./MonthArt";
import { THEMES } from "./constants";

export function HeroPanel({ month, year, accent, theme, startDate, endDate, clearSelection, rangeDays, setMonth, direction }) {
  const fmtDate = (d) => d
    ? new Date(d.y, d.m, d.d).toLocaleDateString("en-US", { month: "short", day: "numeric" })
    : "";

  return (
    <aside
      aria-label="Calendar hero"
      style={{
        width: 248, minWidth: 248,
        background: theme.surface,
        borderRight: "1px solid rgba(255,255,255,0.06)",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "space-between",
        padding: "26px 20px 18px", gap: 12,
      }}
    >
      {/* Artwork */}
      <div
        key={`${month}-art`}
        className={direction >= 0 ? "art-flip-forward" : "art-flip-backward"}
        style={{ width: "100%", maxWidth: 158 }}
      >
        <MonthArt month={month} accent={accent} />
      </div>

      {/* Month name */}
      <div style={{ textAlign: "center", width: "100%" }}>
        <div
          key={`${month}-name`}
          className={direction >= 0 ? "art-flip-forward" : "art-flip-backward"}
          style={{
            fontFamily: "'Cormorant Garamond',serif",
            fontSize: 42, fontWeight: 600, color: accent, lineHeight: 1,
          }}
        >
          {THEMES[month].name}
        </div>
        <div style={{
          fontFamily: "'Cormorant Garamond',serif", fontStyle: "italic",
          fontSize: 14, color: "rgba(255,255,255,0.28)", marginTop: 4,
        }}>{year}</div>

        {/* Range badge */}
        {startDate && (
          <div style={{
            marginTop: 14, padding: "9px 11px", borderRadius: 10,
            background: theme.glow, border: `1px solid ${accent}35`,
            textAlign: "left",
          }}>
            <div style={{ fontSize: 9, color: "rgba(255,255,255,0.3)", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 3, fontFamily: "'DM Sans',sans-serif" }}>
              Selection
            </div>
            <div style={{ fontSize: 12, color: accent, fontWeight: 500, fontFamily: "'DM Sans',sans-serif" }}>
              {fmtDate(startDate)}
              {endDate ? ` → ${fmtDate(endDate)}` : " → …"}
            </div>
            {endDate && (
              <div style={{ fontSize: 10, color: "rgba(255,255,255,0.28)", marginTop: 2, fontFamily: "'DM Sans',sans-serif" }}>
                {rangeDays()} day{rangeDays() !== 1 ? "s" : ""}
              </div>
            )}
            <button onClick={clearSelection} style={{
              marginTop: 6, fontSize: 10, color: "rgba(255,255,255,0.3)",
              background: "transparent", border: "none", cursor: "pointer", padding: 0,
              fontFamily: "'DM Sans',sans-serif", textDecoration: "underline",
            }}>Clear selection</button>
          </div>
        )}
      </div>

      {/* Month dot navigator */}
      <nav aria-label="Jump to month" style={{ display: "flex", gap: 4, flexWrap: "wrap", justifyContent: "center" }}>
        {THEMES.map((t, i) => (
          <button
            key={i}
            onClick={() => setMonth(i)}
            aria-label={t.name}
            aria-current={i === month ? "true" : undefined}
            style={{
              height: 5,
              width: i === month ? 18 : 5,
              borderRadius: 3,
              background: i === month ? accent : "rgba(255,255,255,0.15)",
              border: "none", cursor: "pointer", padding: 0,
              transition: "width 0.3s ease, background 0.3s ease",
            }}
          />
        ))}
      </nav>
    </aside>
  );
}
