"use client";

import { useState } from "react";
import {
  Layers, Plane, BedDouble, CalendarDays, Siren, Baby,
  Users, CheckCheck, CircleX, Download,
} from "lucide-react";
import TopHeader from "@/components/layout/TopHeader";
import { PageContent } from "@/components/common/Card";
import { MetricCardGrid } from "@/components/common/MetricCard";
import { DateControl, FilterButton } from "@/components/common/Controls";
import SearchInput from "@/components/common/SearchInput";
import PrimaryButton from "@/components/common/PrimaryButton";
import { UnderlineTabs, PillTabs } from "@/components/common/Tabs";
import { FullPagination } from "@/components/common/Pagination";
import AttendanceTable from "@/components/tables/AttendanceTable";
import AddAttendanceModal from "@/components/attendance/AddAttendanceModal";
import EmployeeAttendanceDetails from "@/components/attendance/EmployeeAttendanceDetails";
import { useAttendance } from "@/components/attendance/AttendanceStore";

const typeTabs = [
  { label: "Attendance", icon: Layers },
  { label: "On Leave", icon: Plane },
  { label: "Sick Leave", icon: BedDouble },
  { label: "Annual Leave", icon: CalendarDays },
  { label: "Emergency Leave", icon: Siren },
  { label: "Maternity Leave", icon: Baby },
];

const attendanceMetrics = [
  { label: "Total Employees", value: "280", trend: 12, dir: "up", icon: <Users size={22} /> },
  { label: "Present", value: "251", trend: 20, dir: "down", icon: <CheckCheck size={22} /> },
  { label: "Absent", value: "18", trend: 20, dir: "down", icon: <CircleX size={22} /> },
  { label: "On Leave", value: "11", trend: 12, dir: "up", icon: <CalendarDays size={22} /> },
];

export default function AttendancePage() {
  const { records } = useAttendance();
  const [typeTab, setTypeTab] = useState("Attendance");
  const [subTab, setSubTab] = useState("All");
  const [modalOpen, setModalOpen] = useState(false);
  const [detailRecord, setDetailRecord] = useState(null);

  const filtered = records.filter((r) => {
    if (subTab === "Early") return r.status === "Early";
    if (subTab === "Late") return r.status === "Late";
    return true;
  });

  return (
    <>
      <TopHeader
        title="Attendance Management"
        right={<PrimaryButton onClick={() => setModalOpen(true)}>Add Attendance</PrimaryButton>}
      />
      <PageContent>
        <div className="mb-6">
          <UnderlineTabs tabs={typeTabs} active={typeTab} onChange={setTypeTab} />
        </div>

        <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-[22px] font-semibold text-text">Attendance Overview</h2>
          <div className="flex items-center gap-3">
            <DateControl>This Month</DateControl>
            <DateControl>Feb. 10th, 2025 - Feb. 20th 2025</DateControl>
            <button className="inline-flex h-[52px] items-center gap-2 rounded-lg border border-border bg-white px-5 text-[16px] text-text-secondary hover:bg-subtle">
              Export Attendance Report <Download size={18} />
            </button>
          </div>
        </div>

        <div className="mb-6">
          <MetricCardGrid items={attendanceMetrics} />
        </div>

        {typeTab !== "Attendance" ? (
          <div className="rounded-xl border border-dashed border-border bg-subtle p-12 text-center">
            <p className="text-[18px] font-medium text-text">{typeTab}</p>
            <p className="mt-2 text-text-secondary">This leave-type view uses the same layout; wire it to its data when ready.</p>
          </div>
        ) : (
          <>
            <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
              <PillTabs tabs={["All", "Early", "Late"]} active={subTab} onChange={setSubTab} />
              <div className="flex items-center gap-3">
                <SearchInput className="w-[420px]" />
                <FilterButton />
              </div>
            </div>

            <AttendanceTable rows={filtered} onRowClick={setDetailRecord} />
            <FullPagination />
          </>
        )}
      </PageContent>

      <AddAttendanceModal open={modalOpen} onClose={() => setModalOpen(false)} />
      {detailRecord && (
        <EmployeeAttendanceDetails
          record={detailRecord}
          onClose={() => setDetailRecord(null)}
          onAddAttendance={() => { setDetailRecord(null); setModalOpen(true); }}
        />
      )}
    </>
  );
}
