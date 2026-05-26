"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { attendanceRows } from "@/data/mockData";

const STORAGE_KEY = "timeinapp.attendance.v1";

// --- Business rules (easy to tweak) ----------------------------------------
// Standard shift length in hours; anything beyond counts as overtime.
const STANDARD_SHIFT_HOURS = 8;
// On-time cutoff: clocking in at or before this is "Early", after is "Late".
const ON_TIME_CUTOFF_MIN = 7 * 60 + 30; // 7:30 AM in minutes

// Parse "7:30 AM" style into minutes since midnight.
export function parseTime(hourMin, period) {
  // hourMin like "7:30" or "7:00"; period "AM"/"PM"
  const [hStr, mStr] = String(hourMin).split(":");
  let h = parseInt(hStr, 10) || 0;
  const m = parseInt(mStr, 10) || 0;
  if (period === "PM" && h !== 12) h += 12;
  if (period === "AM" && h === 12) h = 0;
  return h * 60 + m;
}

export function formatMins(totalMin) {
  if (totalMin <= 0) return "-";
  const h = Math.floor(totalMin / 60);
  const m = totalMin % 60;
  if (h && m) return `${h}hrs ${m} min`;
  if (h) return `${h}hrs`;
  return `${m}mins`;
}

// Given in/out times, compute overtime label and Early/Late status.
export function computeFromTimes(inTime, inPeriod, outTime, outPeriod) {
  const start = parseTime(inTime, inPeriod);
  const end = parseTime(outTime, outPeriod);
  const worked = Math.max(0, end - start);
  const overtimeMin = Math.max(0, worked - STANDARD_SHIFT_HOURS * 60);
  const status = start <= ON_TIME_CUTOFF_MIN ? "Early" : "Late";
  return {
    overtime: formatMins(overtimeMin),
    status,
    clock: `${inTime} ${inPeriod}  -  ${outTime} ${outPeriod}`,
  };
}

// Seed: enrich existing mock rows with id + overtime + parsed display.
function buildSeed() {
  return attendanceRows.map((r, i) => ({
    id: `att_${i + 1}`,
    name: r.name,
    role: r.role,
    clock: i % 2 === 0 ? "7:30 AM  -  3:30 PM" : "7:30 AM  -  3:30 PM",
    overtime: i % 3 === 0 ? "2hrs 30 min" : "-",
    location: r.location,
    status: r.status === "Late" ? "Late" : "Early",
  }));
}

const AttendanceContext = createContext(null);

export function AttendanceProvider({ children }) {
  const [records, setRecords] = useState(buildSeed);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length) setRecords(parsed);
      }
    } catch {
      // ignore
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
    } catch {
      // non-fatal
    }
  }, [records, loaded]);

  // Add one record per selected employee.
  const addAttendance = ({ employees, inTime, inPeriod, outTime, outPeriod, location }) => {
    const computed = computeFromTimes(inTime, inPeriod, outTime, outPeriod);
    const stamp = Date.now().toString(36);
    const newRecords = employees.map((name, idx) => ({
      id: `att_${stamp}_${idx}`,
      name,
      role: "Employee",
      clock: computed.clock,
      overtime: computed.overtime,
      location: location || "—",
      status: computed.status,
    }));
    setRecords((prev) => [...newRecords, ...prev]);
  };

  // A fabricated monthly log for the employee details slide-over.
  const getMonthlyLog = (name) => {
    const days = ["1st", "2nd", "3rd", "4th", "5th", "6th"];
    return days.map((d, i) => ({
      date: `${d} May 2025`,
      clock: "7:30 AM  -  3:30 PM",
      overtime: i % 2 === 0 ? "2hrs 30 min" : "-",
      location: "Withston Street, Ware...",
      status: i % 2 === 0 ? "Late" : "Early",
    }));
  };

  return (
    <AttendanceContext.Provider value={{ records, loaded, addAttendance, getMonthlyLog }}>
      {children}
    </AttendanceContext.Provider>
  );
}

export function useAttendance() {
  const ctx = useContext(AttendanceContext);
  if (!ctx) throw new Error("useAttendance must be used within AttendanceProvider");
  return ctx;
}
