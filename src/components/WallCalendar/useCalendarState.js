"use client";
import { useState, useEffect, useCallback } from "react";

const toNum = ({ y, m, d }) => new Date(y, m, d).getTime();
const fromDate = (date) => ({ y: date.getFullYear(), m: date.getMonth(), d: date.getDate() });

export function useCalendarState() {
  const today = new Date();

  const [month, setMonth]         = useState(today.getMonth());
  const [year,  setYear]          = useState(today.getFullYear());
  const [startDate, setStartDate] = useState(null);
  const [endDate,   setEndDate]   = useState(null);
  const [hovered,   setHovered]   = useState(null);
  const [notes, setNotes] = useState(() => {
    if (typeof window === "undefined") return {};
    try { return JSON.parse(localStorage.getItem("wall-cal-notes") || "{}"); }
    catch { return {}; }
  });
  const [direction, setDirection] = useState(1); // 1=forward, -1=backward

  // Persist notes to localStorage whenever they change
  useEffect(() => {
    try { localStorage.setItem("wall-cal-notes", JSON.stringify(notes)); }
    catch {}
  }, [notes]);

  const navigate = useCallback((delta) => {
    setDirection(delta);
    if (delta === 1) {
      if (month === 11) { setYear(y => y + 1); setMonth(0); }
      else setMonth(m => m + 1);
    } else {
      if (month === 0) { setYear(y => y - 1); setMonth(11); }
      else setMonth(m => m - 1);
    }
  }, [month]);

  const goToToday = useCallback(() => {
    const d = new Date();
    setDirection(d.getMonth() > month || d.getFullYear() > year ? 1 : -1);
    setMonth(d.getMonth());
    setYear(d.getFullYear());
  }, [month, year]);

  const handleDayClick = useCallback((day) => {
    const clicked = { y: year, m: month, d: day };
    if (!startDate || (startDate && endDate)) {
      setStartDate(clicked);
      setEndDate(null);
    } else {
      if (toNum(clicked) === toNum(startDate)) { setStartDate(null); return; }
      if (toNum(clicked) < toNum(startDate)) {
        setEndDate(startDate);
        setStartDate(clicked);
      } else {
        setEndDate(clicked);
      }
    }
  }, [startDate, endDate, year, month]);

  const clearSelection = useCallback(() => { setStartDate(null); setEndDate(null); }, []);

  // Range check: works across months
  const isInRange = useCallback((day) => {
    if (!startDate) return false;
    const curr = new Date(year, month, day).getTime();
    const d1   = toNum(startDate);
    const d2   = endDate ? toNum(endDate) : hovered ? toNum(hovered) : null;
    if (!d2) return false;
    return curr > Math.min(d1, d2) && curr < Math.max(d1, d2);
  }, [startDate, endDate, hovered, year, month]);

  const isStart = useCallback((day) =>
    startDate && startDate.y === year && startDate.m === month && startDate.d === day,
    [startDate, year, month]);

  const isEnd = useCallback((day) =>
    endDate && endDate.y === year && endDate.m === month && endDate.d === day,
    [endDate, year, month]);

  const isToday = useCallback((day) =>
    today.getDate() === day && today.getMonth() === month && today.getFullYear() === year,
    [month, year]);

  const noteKey = (() => {
    if (startDate && endDate) {
      const lo = toNum(startDate) < toNum(endDate) ? startDate : endDate;
      const hi = toNum(startDate) < toNum(endDate) ? endDate   : startDate;
      return `${lo.y}-${lo.m}-${lo.d}__${hi.y}-${hi.m}-${hi.d}`;
    }
    if (startDate) return `${startDate.y}-${startDate.m}-${startDate.d}`;
    return `${year}-${month}`;
  })();

  const saveNote = useCallback((text) => {
    if (!text.trim()) return;
    setNotes(prev => ({ ...prev, [noteKey]: { text: text.trim(), savedAt: new Date().toISOString() } }));
  }, [noteKey]);

  const deleteNote = useCallback((key) => {
    setNotes(prev => { const n = { ...prev }; delete n[key]; return n; });
  }, []);

  const rangeDays = () => {
    if (!startDate || !endDate) return 0;
    return Math.abs(Math.round((toNum(endDate) - toNum(startDate)) / 86400000)) + 1;
  };

  const jumpToMonth = useCallback((targetMonth) => {
    setDirection(targetMonth >= month ? 1 : -1);
    setMonth(targetMonth);
  }, [month]);

  return {
    month, year, today: fromDate(today),
    startDate, endDate, hovered,
    notes, noteKey,
    direction,
    navigate, goToToday, jumpToMonth,
    handleDayClick, clearSelection,
    setHovered,
    isInRange, isStart, isEnd, isToday,
    saveNote, deleteNote,
    rangeDays,
  };
}
