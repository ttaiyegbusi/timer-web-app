"use client";

import { useState } from "react";
import {
  Layers, Plane, BedDouble, CalendarDays, Siren, Baby,
  GitCompareArrows, CheckCheck, Loader, CircleX,
  Plus, Pencil, Trash2,
} from "lucide-react";
import TopHeader from "@/components/layout/TopHeader";
import { PageContent } from "@/components/common/Card";
import { MetricCardGrid } from "@/components/common/MetricCard";
import { DateControl, FilterButton } from "@/components/common/Controls";
import SearchInput from "@/components/common/SearchInput";
import PrimaryButton from "@/components/common/PrimaryButton";
import { UnderlineTabs, PillTabs } from "@/components/common/Tabs";
import KebabMenu from "@/components/common/KebabMenu";
import { FullPagination } from "@/components/common/Pagination";
import LeaveRequestsTable from "@/components/tables/LeaveRequestsTable";
import { leaveRequests, leaveMetrics } from "@/data/mockData";

const typeTabs = [
  { label: "All Leave", icon: Layers },
  { label: "Vacation Leave", icon: Plane },
  { label: "Sick Leave", icon: BedDouble },
  { label: "Annual Leave", icon: CalendarDays },
  { label: "Emergency Leave", icon: Siren },
  { label: "Maternity Leave", icon: Baby },
];

const metricIcons = {
  "Total Requests": <GitCompareArrows size={22} />,
  "Approved Requests": <CheckCheck size={22} />,
  "Pending Requests": <Loader size={22} />,
  "Rejected Requests": <CircleX size={22} />,
};

export default function LeavePage() {
  const [typeTab, setTypeTab] = useState("All Leave");
  const [reqTab, setReqTab] = useState("All Request");
  const metrics = leaveMetrics.map((m) => ({ ...m, icon: metricIcons[m.label] }));

  const filtered = leaveRequests.filter((r) => {
    if (reqTab === "Approved") return r.status === "Approved";
    if (reqTab === "Pending") return r.status === "Pending";
    if (reqTab === "Rejected") return r.status === "Rejected";
    return true;
  });

  return (
    <>
      <TopHeader
        title="Leave Management"
        right={
          <>
            <PrimaryButton>Add Leave</PrimaryButton>
            <KebabMenu
              variant="circle"
              header="Leave Type"
              items={[
                { label: "Create Leave Type", icon: Plus, highlight: true },
                { label: "Edit Leave Type", icon: Pencil },
                { label: "Delete Leave Type", icon: Trash2, danger: true },
              ]}
            />
          </>
        }
      />
      <PageContent>
        <div className="mb-6">
          <UnderlineTabs tabs={typeTabs} active={typeTab} onChange={setTypeTab} />
        </div>

        <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-[26px] font-semibold text-text">Leave Overview</h2>
          <div className="flex items-center gap-3">
            <DateControl>This Month</DateControl>
            <DateControl>Feb. 10th, 2025 - Feb. 20th 2025</DateControl>
          </div>
        </div>

        <div className="mb-6">
          <MetricCardGrid items={metrics} />
        </div>

        <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
          <PillTabs
            tabs={["All Request", "Approved", "Pending", "Rejected"]}
            active={reqTab}
            onChange={setReqTab}
          />
          <div className="flex items-center gap-3">
            <SearchInput className="w-[420px]" />
            <FilterButton />
          </div>
        </div>

        <LeaveRequestsTable rows={filtered} />
        <FullPagination />
      </PageContent>
    </>
  );
}
