"use client";

import { X, Copy, ChevronLeft, ChevronRight, Download, ListFilter, Building2, CircleUser, Briefcase, Clock, Timer, MoreVertical } from "lucide-react";
import { Avatar } from "@/components/common/Avatar";
import { AttendancePill } from "@/components/common/Pills";
import { useAttendance } from "@/components/attendance/AttendanceStore";

function InfoRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-3 py-2">
      <span className="flex items-center gap-2 text-[15px] text-text-secondary">
        <Icon size={18} /> {label}
      </span>
      <span className="ml-auto text-[15px] font-medium text-text">{value}</span>
    </div>
  );
}

function SummaryCard({ label, value }) {
  return (
    <div className="rounded-lg border border-border px-4 py-3">
      <p className="text-[14px] text-text-secondary">{label}</p>
      <p className="mt-1 text-[18px] font-semibold text-text">{value}</p>
    </div>
  );
}

export default function EmployeeAttendanceDetails({ record, onClose, onAddAttendance }) {
  const { getMonthlyLog } = useAttendance();
  if (!record) return null;
  const log = getMonthlyLog(record.name);

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/30" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="flex h-full w-[760px] max-w-full flex-col bg-white shadow-dropdown">
        {/* Header bar */}
        <div className="flex items-center justify-between border-b border-border px-8 py-5">
          <span className="rounded-md bg-subtle px-3 py-1.5 text-[13px] font-semibold tracking-wide text-text-secondary">
            EMPLOYEE ATTENDANCE DETAILS
          </span>
          <button onClick={onClose} aria-label="Close" className="grid h-8 w-8 place-items-center rounded-full text-text-muted hover:bg-subtle">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-8 py-6">
          {/* Profile header card */}
          <div className="rounded-xl border border-border bg-subtle/40 p-6">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <div>
                <div className="mb-3 flex items-start gap-4">
                  <div className="relative">
                    <Avatar name={record.name} size={64} />
                    <span className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-white bg-success" />
                  </div>
                  <button className="ml-auto rounded-lg border border-border bg-white px-4 py-2 text-[14px] text-text-secondary hover:bg-subtle">
                    View Details
                  </button>
                </div>
                <p className="flex items-center gap-2 text-[14px] text-text-secondary">
                  EMP12345 <Copy size={14} className="cursor-pointer hover:text-text" />
                </p>
                <div className="mt-1 flex items-center gap-3">
                  <h3 className="text-[24px] font-semibold text-text">{record.name}</h3>
                  <AttendancePill status="Early" />
                </div>
                <p className="mt-1 text-[15px] text-text-secondary">Product Designer (Remote)</p>
              </div>

              <div className="lg:border-l lg:border-border lg:pl-6">
                <InfoRow icon={Building2} label="Department" value="IT" />
                <InfoRow icon={CircleUser} label="Role" value={record.role || "Lead Designer"} />
                <InfoRow icon={Briefcase} label="Employment" value="Full Time" />
                <InfoRow icon={Clock} label="Avg. Work Hours" value="9hrs 43 mins" />
                <InfoRow icon={Timer} label="Avg. Overtime" value="1hrs 30mins" />
              </div>
            </div>
          </div>

          {/* Attendance Summary */}
          <h4 className="mb-3 mt-6 text-[16px] text-text-secondary">Attendance Summary</h4>
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            <SummaryCard label="Year of Employment" value="2021" />
            <SummaryCard label="Total Presents Days" value="1,298 days" />
            <SummaryCard label="Total Absent Days" value="30 Days" />
            <SummaryCard label="Total Leave Days" value="423 Days" />
          </div>

          {/* Monthly log */}
          <div className="mb-3 mt-8 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h4 className="text-[18px] font-semibold text-text">March 2025</h4>
              <button className="grid h-7 w-7 place-items-center rounded-md border border-border text-text-secondary hover:bg-subtle"><ChevronLeft size={16} /></button>
              <button className="grid h-7 w-7 place-items-center rounded-md border border-border text-text-secondary hover:bg-subtle"><ChevronRight size={16} /></button>
            </div>
            <div className="flex items-center gap-2">
              <button className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-[14px] text-text-secondary hover:bg-subtle"><Download size={16} /> Export CSV</button>
              <button className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-[14px] text-text-secondary hover:bg-subtle"><ListFilter size={16} /> Filter</button>
            </div>
          </div>

          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="text-[14px] text-text-secondary">
                <th className="py-3 font-medium">Start Date</th>
                <th className="py-3 font-medium">Clock in - Clock Out</th>
                <th className="py-3 font-medium">Overtime</th>
                <th className="py-3 font-medium">Location</th>
                <th className="py-3 font-medium">Status</th>
                <th className="py-3 font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {log.map((d, i) => (
                <tr key={i} className="border-t border-border-light">
                  <td className="py-3.5 text-[15px] text-text">{d.date}</td>
                  <td className="py-3.5 text-[15px] text-text">{d.clock}</td>
                  <td className="py-3.5">
                    {d.overtime !== "-" ? (
                      <span className="rounded-md bg-subtle px-2.5 py-1 text-[13px] text-text-secondary">{d.overtime}</span>
                    ) : <span className="text-text-muted">-</span>}
                  </td>
                  <td className="py-3.5 text-[14px] text-text-secondary">{d.location}</td>
                  <td className="py-3.5"><AttendancePill status={d.status} /></td>
                  <td className="py-3.5">
                    <button className="grid h-7 w-7 place-items-center rounded-md text-text-muted hover:bg-subtle"><MoreVertical size={18} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 border-t border-border px-8 py-4">
          <button onClick={onClose} className="rounded-lg border border-border px-5 py-2.5 text-[15px] text-text-secondary hover:bg-subtle">Cancel</button>
          <button onClick={onAddAttendance} className="rounded-lg bg-primary px-5 py-2.5 text-[15px] font-medium text-white hover:bg-primary-hover">Add Attendance</button>
        </div>
      </div>
    </div>
  );
}
