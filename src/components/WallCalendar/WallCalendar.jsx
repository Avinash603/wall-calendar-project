"use client";
import { THEMES } from "./constants";
import { useCalendarState } from "./useCalendarState";
import { HeroPanel } from "./HeroPanel";
import { CalendarGrid } from "./CalendarGrid";
import { NotesPanel } from "./NotesPanel";

const GLOBAL_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,600;1,300&family=DM+Sans:wght@300;400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; }

  /* Page-flip animation (wall calendar page tear) */
  @keyframes flipInForward {
    from { transform: perspective(900px) rotateX(20deg); opacity: 0; transform-origin: top center; }
    to   { transform: perspective(900px) rotateX(0deg);  opacity: 1; transform-origin: top center; }
  }
  @keyframes flipInBackward {
    from { transform: perspective(900px) rotateX(-20deg); opacity: 0; transform-origin: bottom center; }
    to   { transform: perspective(900px) rotateX(0deg);   opacity: 1; transform-origin: bottom center; }
  }

  .flip-in-forward  { animation: flipInForward  0.32s cubic-bezier(0.22,1,0.36,1) both; }
  .flip-in-backward { animation: flipInBackward 0.32s cubic-bezier(0.22,1,0.36,1) both; }

  .art-flip-forward  { animation: flipInForward  0.38s cubic-bezier(0.22,1,0.36,1) both 0.04s; }
  .art-flip-backward { animation: flipInBackward 0.38s cubic-bezier(0.22,1,0.36,1) both 0.04s; }

  /* Day cell hover */
  .cal-day:hover { transform: scale(1.1); z-index: 1; }
  .cal-day:focus-visible { box-shadow: 0 0 0 2px white, 0 0 0 4px rgba(255,255,255,0.3); }

  /* Responsive mobile layout */
  @media (max-width: 660px) {
    .wall-calendar-layout { flex-direction: column !important; }

    .hero-panel {
      width: 100% !important;
      min-width: unset !important;
      flex-direction: row !important;
      align-items: center !important;
      padding: 14px 18px !important;
      gap: 18px;
      border-right: none !important;
      border-bottom: 1px solid rgba(255,255,255,0.06) !important;
    }
    .hero-panel aside { flex-direction: row !important; }
    .hero-art-wrap { width: 110px !important; max-width: 110px !important; flex-shrink: 0; }
    .hero-month-name { font-size: 34px !important; }
    .month-dots { display: none !important; }
    .cal-day span { font-size: 12px !important; }
  }
`;

export default function WallCalendar() {
  const state = useCalendarState();
  const theme = THEMES[state.month];

  return (
    <>
      <style>{GLOBAL_STYLES}</style>

      <div style={{
        fontFamily: "'DM Sans',sans-serif",
        background: theme.bg,
        minHeight: "100vh",
        display: "flex", alignItems: "flex-start", justifyContent: "center",
        padding: "24px 12px",
        transition: "background 0.5s ease",
      }}>
        <div style={{
          width: "100%", maxWidth: 880,
          borderRadius: 18,
          overflow: "hidden",
          boxShadow: "0 40px 100px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.06)",
        }}>
          {/* Top ribbon */}
          <div style={{
            background: theme.surface,
            padding: "8px 22px",
            display: "flex", alignItems: "center", justifyContent: "space-between",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
          }}>
            <span style={{
              color: theme.accent, fontSize: 10, letterSpacing: "0.18em",
              textTransform: "uppercase", fontWeight: 500, fontFamily: "'DM Sans',sans-serif",
            }}>Wall Calendar</span>
            <span style={{ fontSize: 11, color: "rgba(255,255,255,0.22)", fontFamily: "'DM Sans',sans-serif" }}>
              {state.year}
            </span>
          </div>

          {/* Main 2-column layout */}
          <div className="wall-calendar-layout" style={{ display: "flex" }}>
            {/* Left: hero panel */}
            <div className="hero-panel" style={{ display: "contents" }}>
              <HeroPanel
                month={state.month}
                year={state.year}
                accent={theme.accent}
                theme={theme}
                startDate={state.startDate}
                endDate={state.endDate}
                clearSelection={state.clearSelection}
                rangeDays={state.rangeDays}
                setMonth={state.jumpToMonth}
                direction={state.direction}
              />
            </div>

            {/* Right: calendar grid */}
            <CalendarGrid
              month={state.month}
              year={state.year}
              direction={state.direction}
              handleDayClick={state.handleDayClick}
              setHovered={state.setHovered}
              isStart={state.isStart}
              isEnd={state.isEnd}
              isInRange={state.isInRange}
              isToday={state.isToday}
              startDate={state.startDate}
              endDate={state.endDate}
              accent={theme.accent}
              navigate={state.navigate}
              goToToday={state.goToToday}
            />
          </div>

          {/* Bottom: notes panel */}
          <NotesPanel
            noteKey={state.noteKey}
            notes={state.notes}
            saveNote={state.saveNote}
            deleteNote={state.deleteNote}
            accent={theme.accent}
            theme={theme}
          />
        </div>
      </div>
    </>
  );
}
