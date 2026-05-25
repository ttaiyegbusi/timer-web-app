"use client";

import { Layers, Clock, UserCheck, UserX, Timer } from "lucide-react";
import TopHeader from "@/components/layout/TopHeader";
import { PageContent } from "@/components/common/Card";
import { MetricCardGrid } from "@/components/common/MetricCard";
import { DateControl, FilterButton } from "@/components/common/Controls";
import SearchInput from "@/components/common/SearchInput";
import { UnderlineTabs } from "@/components/common/Tabs";
import { FullPagination } from "@/components/common/Pagination";
import AttendanceTable from "@/components/tables/AttendanceTable";

// No screenshot was provided for this page; built by inference from the
// dashboard's Attendance section and the shared overview/table patterns.
const attendanceMetrics = [
  { label: "Total Clock-ins", value: "300", trend: 12, dir: "up", icon: <Clock size={22} /> },
  { label: "On Time", value: "245", trend: 12, dir: "up", icon: <UserCheck size={22} /> },
  { label: "Late Arrivals", value: "38", trend: 20, dir: "down", icon: <Timer size={22} /> },
  { label: "Absent", value: "17", trend: 20, dir: "down", icon: <UserX size={22} /> },
];

export default function AttendancePage() {
  return (
    <>
      <TopHeader title="Attendance Management" />
      <PageContent>
        <div className="mb-6">
          <UnderlineTabs
            tabs={[{ label: "All Attendance", icon: Layers }]}
            active="All Attendance"
          />
        </div>

        <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-[26px] font-semibold text-text">
            Attendance Overview
          </h2>
          <div className="flex items-center gap-3">
            <DateControl>This Month</DateControl>
            <DateControl>Feb. 10th, 2025 - Feb. 20th 2025</DateControl>
          </div>
        </div>

        <div className="mb-6">
          <MetricCardGrid items={attendanceMetrics} />
        </div>

        <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
          <SearchInput className="w-[640px]" />
          <FilterButton />
        </div>

        <AttendanceTable />
        <FullPagination />
      </PageContent>
    </>
  );
}
