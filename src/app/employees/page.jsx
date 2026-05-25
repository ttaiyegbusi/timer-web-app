"use client";

import { useState } from "react";
import { Layers, Clock, User, UserPlus, UserCheck, UserX, Upload } from "lucide-react";
import TopHeader from "@/components/layout/TopHeader";
import { PageContent } from "@/components/common/Card";
import { MetricCardGrid } from "@/components/common/MetricCard";
import { DateControl, FilterButton } from "@/components/common/Controls";
import SearchInput from "@/components/common/SearchInput";
import OutlineButton from "@/components/common/OutlineButton";
import PrimaryButton from "@/components/common/PrimaryButton";
import { UnderlineTabs } from "@/components/common/Tabs";
import { SimplePagination } from "@/components/common/Pagination";
import EmployeeTable from "@/components/tables/EmployeeTable";
import { employeeMetrics } from "@/data/mockData";

const metricIcons = {
  "Total Employees": <User size={22} />,
  "New Hires": <UserPlus size={22} />,
  "Active Employees": <UserCheck size={22} />,
  "Inactive Employees": <UserX size={22} />,
};

export default function EmployeesPage() {
  const [tab, setTab] = useState("All Employees");
  const metrics = employeeMetrics.map((m) => ({
    ...m,
    icon: metricIcons[m.label],
  }));

  return (
    <>
      <TopHeader
        title="Employee Management"
        right={<PrimaryButton>Add Employee</PrimaryButton>}
      />
      <PageContent>
        <div className="mb-6">
          <UnderlineTabs
            tabs={[
              { label: "All Employees", icon: Layers },
              { label: "Pending Invitations", icon: Clock },
            ]}
            active={tab}
            onChange={setTab}
          />
        </div>

        <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-[26px] font-semibold text-text">
            Employee Overview
          </h2>
          <div className="flex items-center gap-3">
            <DateControl>This Month</DateControl>
            <DateControl>Feb. 10th, 2025 - Feb. 20th 2025</DateControl>
          </div>
        </div>

        <div className="mb-6">
          <MetricCardGrid items={metrics} />
        </div>

        <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
          <SearchInput className="w-[640px]" />
          <div className="flex items-center gap-3">
            <OutlineButton icon={Upload}>Export</OutlineButton>
            <FilterButton />
          </div>
        </div>

        <EmployeeTable />
        <SimplePagination />
      </PageContent>
    </>
  );
}
