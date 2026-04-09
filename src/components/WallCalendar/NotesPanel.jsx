import { useState, useEffect } from "react";
import { THEMES } from "./constants";

function formatNoteKey(key) {
  const parts = key.split("__");
  const fmt = (k) => {
    const [y, m, d] = k.split("-");
    return new Date(+y, +m, +d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };
  if (parts.length === 2) return `${fmt(parts[0])} → ${fmt(parts[1])}`;
  const segs = key.split("-");
  if (segs.length === 3) return fmt(key);
  const [y, m] = segs;
  return `${THEMES[+m]?.name} ${y}`;
}

export function NotesPanel({ noteKey, notes, saveNote, deleteNote, accent, theme }) {
  const [text, setText] = useState("");
  const [saved, setSaved] = useState(false);

  // When the active key changes, load that note's text
  useEffect(() => {
    setText(notes[noteKey]?.text || "");
  }, [noteKey]);

  const handleSave = () => {
    if (!text.trim()) return;
    saveNote(text);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleKeyDown = (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "s") {
      e.preventDefault();
      handleSave();
    }
  };

  const activeLabel = formatNoteKey(noteKey);
  const allNotes    = Object.entries(notes);

  return (
    <section
      aria-label="Notes"
      style={{
        borderTop: "1px solid rgba(255,255,255,0.06)",
        background: theme.surface,
        padding: "16px 20px 20px",
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 10 }}>
        <span style={{
          fontSize: 10, color: "rgba(255,255,255,0.35)",
          letterSpacing: "0.15em", textTransform: "uppercase",
          fontWeight: 500, fontFamily: "'DM Sans',sans-serif",
        }}>Notes</span>
        <span style={{
          fontSize: 12, color: "rgba(255,255,255,0.22)",
          fontFamily: "'Cormorant Garamond',serif", fontStyle: "italic",
        }}>{activeLabel}</span>
        <span style={{
          fontSize: 10, color: "rgba(255,255,255,0.15)",
          fontFamily: "'DM Sans',sans-serif", marginLeft: "auto",
        }}>Ctrl+S to save</span>
      </div>

      {/* Textarea + Save button */}
      <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={`Add a note for ${activeLabel}…`}
          aria-label={`Notes for ${activeLabel}`}
          rows={3}
          style={{
            flex: 1, resize: "vertical", minHeight: 68,
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 10, color: "rgba(255,255,255,0.75)",
            fontSize: 13, padding: "9px 13px",
            fontFamily: "'DM Sans',sans-serif",
            outline: "none",
          }}
        />

        <div style={{ display: "flex", flexDirection: "column", gap: 5, flexShrink: 0 }}>
          <button
            onClick={handleSave}
            aria-label="Save note"
            style={{
              background: accent, border: "none", borderRadius: 8,
              color: "#000", fontSize: 12, fontWeight: 600, padding: "9px 15px",
              cursor: "pointer", fontFamily: "'DM Sans',sans-serif",
              whiteSpace: "nowrap", transition: "opacity 0.15s",
            }}
          >
            {saved ? "Saved ✓" : "Save"}
          </button>

          {text.trim() && (
            <button
              onClick={() => setText("")}
              aria-label="Clear draft"
              style={{
                background: "transparent", border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 8, color: "rgba(255,255,255,0.35)",
                fontSize: 11, padding: "5px 8px", cursor: "pointer",
                fontFamily: "'DM Sans',sans-serif",
              }}
            >Clear</button>
          )}
        </div>
      </div>

      {/* Saved notes history */}
      {allNotes.length > 0 && (
        <div style={{ marginTop: 14 }}>
          <div style={{
            fontSize: 10, color: "rgba(255,255,255,0.2)", letterSpacing: "0.12em",
            textTransform: "uppercase", marginBottom: 7,
            fontFamily: "'DM Sans',sans-serif",
          }}>
            {allNotes.length} saved note{allNotes.length > 1 ? "s" : ""}
          </div>
          <ul style={{
            listStyle: "none", margin: 0, padding: 0,
            display: "flex", flexDirection: "column", gap: 5,
            maxHeight: 160, overflowY: "auto",
          }}>
            {allNotes.map(([k, n]) => (
              <li key={k} style={{
                padding: "8px 11px",
                background: k === noteKey ? theme.glow : "rgba(255,255,255,0.04)",
                borderRadius: 8,
                borderLeft: `2px solid ${k === noteKey ? accent : "rgba(255,255,255,0.1)"}`,
                display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 10,
              }}>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: 10, color: "rgba(255,255,255,0.28)", marginBottom: 2, fontFamily: "'DM Sans',sans-serif" }}>
                    {formatNoteKey(k)}
                  </div>
                  <div style={{
                    fontSize: 12, color: "rgba(255,255,255,0.6)",
                    fontFamily: "'DM Sans',sans-serif",
                    whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                  }}>
                    {n.text}
                  </div>
                </div>
                <button
                  onClick={() => deleteNote(k)}
                  aria-label={`Delete note for ${formatNoteKey(k)}`}
                  style={{
                    background: "transparent", border: "none", cursor: "pointer",
                    color: "rgba(255,255,255,0.2)", fontSize: 16, padding: 0, flexShrink: 0,
                    lineHeight: 1, fontFamily: "sans-serif",
                  }}
                >×</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
