import { useRef, useEffect } from "react";
import { WEEKDAYS, HOLIDAYS, THEMES } from "./constants";

export function CalendarGrid({
  month, year, direction,
  handleDayClick, setHovered,
  isStart, isEnd, isInRange, isToday,
  startDate, endDate, accent,
  navigate, goToToday,
}) {
  const gridRef  = useRef(null);
  const animKey  = `${year}-${month}`;
  const theme    = THEMES[month];

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startDow    = new Date(year, month, 1).getDay();
  const cells       = [...Array(startDow).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => i + 1)];

  const thisMonthHolidays = Object.entries(HOLIDAYS).filter(([k]) => parseInt(k.split("-")[0]) === month);

  // Keyboard navigation: arrow keys move focus inside the grid
  const handleGridKeyDown = (e) => {
    const focused = document.activeElement;
    const dayEls  = Array.from(gridRef.current?.querySelectorAll("[data-day]") || []);
    const idx     = dayEls.indexOf(focused);
    if (idx === -1) return;

    if (e.key === "ArrowRight") { e.preventDefault(); dayEls[idx + 1]?.focus(); }
    if (e.key === "ArrowLeft")  { e.preventDefault(); dayEls[idx - 1]?.focus(); }
    if (e.key === "ArrowDown")  { e.preventDefault(); dayEls[idx + 7]?.focus(); }
    if (e.key === "ArrowUp")    { e.preventDefault(); dayEls[idx - 7]?.focus(); }
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); focused.click(); }
  };

  const fmtDate = (d) => d
    ? new Date(d.y, d.m, d.d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
    : "";

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      {/* Navigation bar */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 18px 0" }}>
        <button
          onClick={() => navigate(-1)}
          aria-label="Previous month"
          style={navBtnStyle}
        >‹</button>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
          <span style={{ color: "rgba(255,255,255,0.65)", fontSize: 13, fontWeight: 500, fontFamily: "'DM Sans',sans-serif", letterSpacing: "0.06em" }}>
            {THEMES[month].name} {year}
          </span>
          <button onClick={goToToday} style={{
            background: "transparent", border: "none", cursor: "pointer",
            fontSize: 10, color: accent, fontFamily: "'DM Sans',sans-serif",
            letterSpacing: "0.1em", textTransform: "uppercase", padding: 0, opacity: 0.7,
          }}>Today</button>
        </div>

        <button
          onClick={() => navigate(1)}
          aria-label="Next month"
          style={navBtnStyle}
        >›</button>
      </div>

      {/* Grid with page-flip animation */}
      <div
        key={animKey}
        className={direction >= 0 ? "flip-in-forward" : "flip-in-backward"}
        style={{ flex: 1, padding: "12px 14px 14px" }}
      >
        {/* Weekday headers */}
        <div role="row" style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 3, marginBottom: 4 }}>
          {WEEKDAYS.map(d => (
            <div key={d} role="columnheader" aria-label={d} style={{
              textAlign: "center", fontSize: 10, fontWeight: 500,
              color: "rgba(255,255,255,0.26)", letterSpacing: "0.08em",
              textTransform: "uppercase", padding: "4px 0",
              fontFamily: "'DM Sans',sans-serif",
            }}>{d}</div>
          ))}
        </div>

        {/* Day cells */}
        <div
          ref={gridRef}
          role="grid"
          aria-label={`${THEMES[month].name} ${year}`}
          onKeyDown={handleGridKeyDown}
          style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 3 }}
        >
          {cells.map((day, i) => {
            if (!day) return <div key={`empty-${i}`} role="gridcell" aria-hidden="true" />;

            const start   = isStart(day);
            const end     = isEnd(day);
            const inRange = isInRange(day);
            const tod     = isToday(day);
            const holiday = HOLIDAYS[`${month}-${day}`];

            let bg    = "transparent";
            let color = "rgba(255,255,255,0.65)";
            let border = "1px solid transparent";
            let fw    = 400;

            if (start || end) { bg = accent; color = "#000"; border = `1px solid ${accent}`; fw = 600; }
            else if (inRange) { bg = theme.glow; color = accent; border = `1px solid ${accent}30`; }
            else if (tod)     { border = `1px solid ${accent}60`; color = accent; }

            const label = `${day} ${THEMES[month].name} ${year}${holiday ? `, ${holiday}` : ""}${start ? ", range start" : ""}${end ? ", range end" : ""}${inRange ? ", in selected range" : ""}${tod ? ", today" : ""}`;

            return (
              <div
                key={day}
                role="gridcell"
                data-day={day}
                tabIndex={0}
                aria-label={label}
                aria-selected={start || end || inRange}
                aria-pressed={start || end}
                onClick={() => handleDayClick(day)}
                onMouseEnter={() => setHovered({ y: year, m: month, d: day })}
                onMouseLeave={() => setHovered(null)}
                onFocus={() => setHovered({ y: year, m: month, d: day })}
                onBlur={() => setHovered(null)}
                className="cal-day"
                style={{
                  position: "relative",
                  background: bg, border, borderRadius: 7,
                  padding: "7px 3px 5px",
                  textAlign: "center", cursor: "pointer", userSelect: "none",
                  outline: "none",
                }}
              >
                <span style={{ fontSize: 13, fontWeight: fw, color, fontFamily: "'DM Sans',sans-serif", lineHeight: 1 }}>
                  {day}
                </span>

                {holiday && (
                  <div
                    title={holiday}
                    aria-hidden="true"
                    style={{
                      position: "absolute", bottom: 3, left: "50%", transform: "translateX(-50%)",
                      width: 4, height: 4, borderRadius: "50%",
                      background: start || end ? "rgba(0,0,0,0.45)" : accent, opacity: 0.8,
                    }}
                  />
                )}

                {tod && !start && !end && (
                  <div aria-hidden="true" style={{
                    fontSize: 7, color: accent, letterSpacing: "0.05em",
                    textTransform: "uppercase", marginTop: 2,
                    fontFamily: "'DM Sans',sans-serif",
                  }}>now</div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Holiday chips */}
      {thisMonthHolidays.length > 0 && (
        <div style={{ padding: "0 14px 14px", display: "flex", flexWrap: "wrap", gap: 5 }}>
          {thisMonthHolidays.map(([k, name]) => (
            <div key={k} style={{
              fontSize: 10, color: "rgba(255,255,255,0.35)",
              background: "rgba(255,255,255,0.05)", borderRadius: 5, padding: "3px 7px",
              fontFamily: "'DM Sans',sans-serif",
            }}>
              <span style={{ color: accent, marginRight: 3 }}>{k.split("-")[1]}</span>{name}
            </div>
          ))}
        </div>
      )}

      {/* Selection summary bar */}
      {startDate && (
        <div style={{
          margin: "0 14px 14px",
          padding: "8px 12px",
          borderRadius: 8,
          background: theme.glow,
          border: `1px solid ${accent}30`,
          display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8,
        }}>
          <div style={{ fontSize: 12, color: accent, fontFamily: "'DM Sans',sans-serif" }}>
            {fmtDate(startDate)}{endDate ? ` → ${fmtDate(endDate)}` : " (click an end date)"}
          </div>
        </div>
      )}
    </div>
  );
}

const navBtnStyle = {
  background: "transparent",
  border: "1px solid rgba(255,255,255,0.12)",
  color: "rgba(255,255,255,0.6)",
  width: 32, height: 32, borderRadius: 8,
  cursor: "pointer", fontSize: 18,
  display: "flex", alignItems: "center", justifyContent: "center",
  fontFamily: "sans-serif", transition: "opacity 0.15s",
};
