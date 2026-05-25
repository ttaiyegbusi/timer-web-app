"use client";

import { Layers, CalendarClock, Clock, Users, Megaphone } from "lucide-react";
import TopHeader from "@/components/layout/TopHeader";
import { PageContent } from "@/components/common/Card";
import { MetricCardGrid } from "@/components/common/MetricCard";
import { DateControl } from "@/components/common/Controls";
import SearchInput from "@/components/common/SearchInput";
import { FilterButton } from "@/components/common/Controls";
import { FullPagination } from "@/components/common/Pagination";

import TaskImpactReport from "@/components/dashboard/TaskImpactReport";
import RecentActivities from "@/components/dashboard/RecentActivities";
import TaskSummaryCard from "@/components/dashboard/TaskSummaryCard";
import PieSummaryCard from "@/components/dashboard/PieSummaryCard";
import LeaveRequestsCard from "@/components/dashboard/LeaveRequestsCard";
import EmployeeSummaryChart from "@/components/dashboard/EmployeeSummaryChart";
import AttendanceHeatmap from "@/components/dashboard/AttendanceHeatmap";
import AttendanceTable from "@/components/tables/AttendanceTable";

import {
  dashboardMetrics,
  taskSummaryPie,
  leaveSummaryPie,
  employmentTypePie,
  workModePie,
} from "@/data/mockData";

const metricIcons = {
  tasks: <Layers size={22} />,
  leave: <CalendarClock size={22} />,
  attendance: <Clock size={22} />,
  employees: <Users size={22} />,
};

export default function DashboardPage() {
  const metrics = dashboardMetrics.map((m) => ({
    ...m,
    icon: metricIcons[m.icon],
  }));

  return (
    <>
      <TopHeader title="Dashboard & Analytics" />
      <PageContent>
        {/* Greeting row */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-[26px] font-medium">
            <span className="text-text-secondary">Good Morning, </span>
            <span className="font-semibold text-text">John Arowoka</span>
          </h2>
          <div className="flex items-center gap-3">
            <button className="inline-flex h-[52px] items-center gap-2 rounded-lg border border-border bg-white px-5 text-[16px] text-text-secondary hover:bg-subtle">
              <Megaphone size={20} />
              Send Announcement
            </button>
            <DateControl>This Month</DateControl>
            <DateControl>Feb. 10th, 2025</DateControl>
          </div>
        </div>

        {/* Metrics */}
        <div className="mb-6">
          <MetricCardGrid items={metrics} />
        </div>

        {/* Row: Task Impact + Recent Activities */}
        <div className="mb-6 grid grid-cols-1 gap-6 xl:grid-cols-2">
          <TaskImpactReport />
          <RecentActivities />
        </div>

        {/* Row: Task Summary list + Task Summary pie */}
        <div className="mb-6 grid grid-cols-1 gap-6 xl:grid-cols-[1.4fr_1fr]">
          <TaskSummaryCard />
          <PieSummaryCard
            title="Task Summary"
            data={taskSummaryPie}
            control="Product Dpt"
          />
        </div>

        {/* Row: Leave Summary pie + Leave Requests */}
        <div className="mb-6 grid grid-cols-1 gap-6 xl:grid-cols-[1fr_1.6fr]">
          <PieSummaryCard title="Leave Summary" data={leaveSummaryPie} />
          <LeaveRequestsCard />
        </div>

        {/* Row: Employee Summary bar + Attendance heatmap */}
        <div className="mb-6 grid grid-cols-1 gap-6 xl:grid-cols-2">
          <EmployeeSummaryChart />
          <AttendanceHeatmap />
        </div>

        {/* Row: Employment Type + Work Mode */}
        <div className="mb-8 grid grid-cols-1 gap-6 xl:grid-cols-2">
          <PieSummaryCard
            title="Employment Type"
            data={employmentTypePie}
            showStaffs
          />
          <PieSummaryCard title="Work Mode" data={workModePie} showStaffs />
        </div>

        {/* Attendance table */}
        <div>
          <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
            <h2 className="text-[22px] font-semibold text-text">Attendance</h2>
            <div className="flex items-center gap-3">
              <SearchInput className="w-[320px]" />
              <FilterButton />
            </div>
          </div>
          <AttendanceTable />
          <FullPagination />
        </div>
      </PageContent>
    </>
  );
}
