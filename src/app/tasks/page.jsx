"use client";

import { useState } from "react";
import { Layers, Layers3, Timer, ListChecks, LayoutGrid, List } from "lucide-react";
import TopHeader from "@/components/layout/TopHeader";
import { PageContent } from "@/components/common/Card";
import { MetricCardGrid } from "@/components/common/MetricCard";
import { DateControl, FilterButton } from "@/components/common/Controls";
import SearchInput from "@/components/common/SearchInput";
import PrimaryButton from "@/components/common/PrimaryButton";
import { UnderlineTabs } from "@/components/common/Tabs";
import TaskListGroups from "@/components/tables/TaskListGroups";
import { taskGroups, taskMetrics } from "@/data/mockData";

const metricIcons = {
  "Total Tasks Created": <Layers size={22} />,
  "Average Time on Task": <Timer size={22} />,
  "Task Completion Rate": <ListChecks size={22} />,
  "Overdue Tasks Count": <Layers3 size={22} />,
};

function ViewToggle({ view, onChange }) {
  const item = (key, icon, label) => (
    <button
      onClick={() => onChange(key)}
      className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-[16px] transition-colors ${
        view === key
          ? "bg-primary-soft font-medium text-primary"
          : "text-text-secondary hover:bg-subtle"
      }`}
    >
      {icon}
      {label}
    </button>
  );
  return (
    <div className="flex items-center gap-2">
      {item("list", <List size={18} />, "List View")}
      {item("table", <LayoutGrid size={18} />, "Table View")}
    </div>
  );
}

export default function TasksPage() {
  const [view, setView] = useState("list");
  const metrics = taskMetrics.map((m) => ({ ...m, icon: metricIcons[m.label] }));

  return (
    <>
      <TopHeader
        title="Task Management"
        right={<PrimaryButton>Create New</PrimaryButton>}
      />
      <PageContent>
        <div className="mb-6">
          <UnderlineTabs
            tabs={[{ label: "All Tasks", icon: Layers }]}
            active="All Tasks"
          />
        </div>

        <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-[26px] font-semibold text-text">Task Overview</h2>
          <div className="flex items-center gap-3">
            <DateControl>This Month</DateControl>
            <DateControl>Feb. 10th, 2025 - Feb. 20th 2025</DateControl>
          </div>
        </div>

        <div className="mb-6">
          <MetricCardGrid items={metrics} />
        </div>

        <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
          <ViewToggle view={view} onChange={setView} />
          <div className="flex items-center gap-3">
            <SearchInput className="w-[420px]" />
            <FilterButton />
          </div>
        </div>

        <TaskListGroups groups={taskGroups} />
      </PageContent>
    </>
  );
}
