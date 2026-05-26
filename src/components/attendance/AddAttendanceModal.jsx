"use client";

import { useState, useRef, useEffect } from "react";
import { X, User, Clock, MapPin, Flag, Trash2, ChevronDown, Search, Check, Info, CircleCheck } from "lucide-react";
import { Avatar } from "@/components/common/Avatar";
import { useAttendance, computeFromTimes } from "@/components/attendance/AttendanceStore";
import { ASSIGNEE_OPTIONS } from "@/components/tasks/TaskStore";

const PERIODS = ["AM", "PM"];

export default function AddAttendanceModal({ open, onClose }) {
  const { addAttendance } = useAttendance();
  const [selected, setSelected] = useState([]);
  const [inTime, setInTime] = useState("9:00");
  const [inPeriod, setInPeriod] = useState("AM");
  const [outTime, setOutTime] = useState("5:00");
  const [outPeriod, setOutPeriod] = useState("PM");
  const [location, setLocation] = useState("Withston Street, Warehouse Building 32, New York City");
  const [useGeo, setUseGeo] = useState(false);
  const [dropOpen, setDropOpen] = useState(false);
  const [query, setQuery] = useState("");
  const dropRef = useRef(null);

  useEffect(() => {
    function onClick(e) {
      if (dropRef.current && !dropRef.current.contains(e.target)) setDropOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  if (!open) return null;

  // Live-computed overtime + status from the entered times.
  const hasEmployees = selected.length > 0;
  const computed = computeFromTimes(inTime, inPeriod, outTime, outPeriod);

  const toggle = (name) =>
    setSelected((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
    );

  const reset = () => {
    setSelected([]); setInTime("9:00"); setInPeriod("AM");
    setOutTime("5:00"); setOutPeriod("PM"); setUseGeo(false); setQuery("");
  };

  const handleAdd = () => {
    if (!hasEmployees) return;
    addAttendance({ employees: selected, inTime, inPeriod, outTime, outPeriod, location });
    reset();
    onClose();
  };

  const filtered = ASSIGNEE_OPTIONS.filter((a) =>
    a.toLowerCase().includes(query.toLowerCase())
  );

  const Row = ({ icon: Icon, label, children, align = "center" }) => (
    <div className={`flex ${align === "top" ? "items-start" : "items-center"} gap-4 py-3`}>
      <span className="flex w-[150px] shrink-0 items-center gap-2 text-[15px] text-text-secondary">
        <Icon size={18} /> {label}
      </span>
      <div className="flex-1">{children}</div>
    </div>
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/30 p-4 pt-[10vh]"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="w-[560px] max-w-full rounded-xl bg-white p-6 shadow-dropdown">
        <div className="mb-4 flex items-center justify-between">
          <span className="rounded-md bg-subtle px-3 py-1.5 text-[13px] font-semibold tracking-wide text-text-secondary">
            ADD ATTENDANCE
          </span>
          <button onClick={onClose} aria-label="Close" className="grid h-7 w-7 place-items-center rounded-full text-text-muted hover:bg-subtle">
            <X size={18} />
          </button>
        </div>

        {/* Select Employee (multi) */}
        <Row icon={User} label="Select Employee" align="top">
          <div className="relative" ref={dropRef}>
            <div
              onClick={() => setDropOpen((o) => !o)}
              className="flex min-h-[52px] cursor-pointer flex-wrap items-center gap-2 rounded-lg border border-border bg-white px-3 py-2"
            >
              {selected.length === 0 && (
                <span className="text-[15px] text-text-muted">Search or select employee</span>
              )}
              {selected.map((n) => (
                <span key={n} className="inline-flex items-center gap-1.5 rounded-pill bg-subtle py-1 pl-1 pr-2 text-[14px] text-text">
                  <Avatar name={n} size={22} />
                  {n.split(" ")[0]} {n.split(" ")[1]?.[0] ? n.split(" ")[1][0] + "." : ""}
                  <button onClick={(e) => { e.stopPropagation(); toggle(n); }}>
                    <X size={13} />
                  </button>
                </span>
              ))}
              <ChevronDown size={18} className="ml-auto text-text-muted" />
            </div>

            {dropOpen && (
              <div className="absolute left-0 top-full z-10 mt-1 w-full rounded-lg border border-border bg-white p-2 shadow-dropdown">
                <div className="mb-2 flex items-center gap-2 rounded-md border border-border px-3 py-2">
                  <Search size={16} className="text-text-muted" />
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search"
                    className="w-full text-[14px] outline-none placeholder:text-text-muted"
                  />
                </div>
                {filtered.map((a) => (
                  <button
                    key={a}
                    onClick={() => toggle(a)}
                    className="flex w-full items-center justify-between rounded-md px-2 py-2 text-left hover:bg-subtle"
                  >
                    <span className="flex items-center gap-2 text-[15px] text-text">
                      <Avatar name={a} size={26} /> {a}
                    </span>
                    <span className={`grid h-5 w-5 place-items-center rounded-[5px] border ${selected.includes(a) ? "border-primary bg-primary text-white" : "border-border"}`}>
                      {selected.includes(a) && <Check size={13} />}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </Row>

        {/* Time In & Out */}
        <Row icon={Clock} label="Time In & Out">
          <div className="flex items-center gap-3">
            <div className="flex h-[52px] flex-1 items-center gap-1 rounded-lg border border-border px-2">
              <span className="text-[13px] text-text-muted">In</span>
              <input value={inTime} onChange={(e) => setInTime(e.target.value)} className="w-14 text-center text-[16px] outline-none" />
              <select value={inPeriod} onChange={(e) => setInPeriod(e.target.value)} className="ml-auto bg-transparent text-[15px] outline-none">
                {PERIODS.map((p) => <option key={p}>{p}</option>)}
              </select>
            </div>
            <div className="flex h-[52px] flex-1 items-center gap-1 rounded-lg border border-border px-2">
              <span className="text-[13px] text-text-muted">Out</span>
              <input value={outTime} onChange={(e) => setOutTime(e.target.value)} className="w-14 text-center text-[16px] outline-none" />
              <select value={outPeriod} onChange={(e) => setOutPeriod(e.target.value)} className="ml-auto bg-transparent text-[15px] outline-none">
                {PERIODS.map((p) => <option key={p}>{p}</option>)}
              </select>
            </div>
          </div>
          {/* Auto overtime */}
          <div className="mt-2 flex items-center justify-between">
            <span className="text-[15px] text-text-secondary">Overtime</span>
            <span className="rounded-md bg-subtle px-3 py-1 text-[14px] text-text-secondary">
              {computed.overtime}
            </span>
          </div>
        </Row>

        {/* Location */}
        <Row icon={MapPin} label="Enter Location" align="top">
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="h-[52px] w-full rounded-lg border border-border px-4 text-[15px] text-text outline-none focus:border-primary"
          />
          <label className="mt-2 flex cursor-pointer items-center justify-between">
            <span className="flex items-center gap-1.5 text-[15px] text-text-secondary">
              Use Geolocation <Info size={15} className="text-text-muted" />
            </span>
            <button
              onClick={() => setUseGeo((g) => !g)}
              className={`grid h-5 w-5 place-items-center rounded-[5px] border ${useGeo ? "border-primary bg-primary text-white" : "border-border"}`}
            >
              {useGeo && <Check size={13} />}
            </button>
          </label>
        </Row>

        {/* Status (auto) */}
        <Row icon={Flag} label="Status">
          {hasEmployees ? (
            <span className={`inline-flex items-center gap-1.5 rounded-pill px-3 py-1.5 text-[14px] font-medium ${computed.status === "Late" ? "bg-warning-bg text-warning" : "bg-success-bg text-success"}`}>
              <CircleCheck size={15} /> {computed.status}
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 rounded-pill bg-subtle px-4 py-1.5 text-[14px] text-text-muted">
              ------
            </span>
          )}
        </Row>

        {/* Footer */}
        <div className="mt-5 flex items-center justify-between border-t border-border-light pt-4">
          <button className="inline-flex items-center gap-2 text-[15px] text-text-secondary hover:text-danger">
            <Trash2 size={18} /> Delete
          </button>
          <div className="flex items-center gap-3">
            <button onClick={onClose} className="rounded-lg border border-border px-5 py-2.5 text-[15px] text-text-secondary hover:bg-subtle">
              Cancel
            </button>
            <button
              onClick={handleAdd}
              disabled={!hasEmployees}
              className="rounded-lg bg-primary px-5 py-2.5 text-[15px] font-medium text-white hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-50"
            >
              Add Attendance
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
