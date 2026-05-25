"use client";

import { useState } from "react";
import { Layers, Layers3, Timer, ListChecks, List, LayoutGrid, Diamond } from "lucide-react";
import TopHeader from "@/components/layout/TopHeader";
import { PageContent } from "@/components/common/Card";
import { MetricCardGrid } from "@/components/common/MetricCard";
import { DateControl } from "@/components/common/Controls";
import PrimaryButton from "@/components/common/PrimaryButton";
import { UnderlineTabs } from "@/components/common/Tabs";
import TaskListGroups from "@/components/tables/TaskListGroups";
import CreateTaskModal from "@/components/tasks/CreateTaskModal";
import { taskMetrics } from "@/data/mockData";

const metricIcons = {
  "Total Tasks Created": <Layers size={22} />,
  "Average Time on Task": <Timer size={22} />,
  "Task Completion Rate": <ListChecks size={22} />,
  "Overdue Tasks Count": <Layers3 size={22} />,
};

const TABS = [
  { label: "All Tasks", icon: Layers },
  { label: "List View", icon: List },
  { label: "Table View", icon: LayoutGrid },
  { label: "Kanban View", icon: Diamond },
];

export default function TasksPage() {
  const [tab, setTab] = useState("All Tasks");
  const [modalOpen, setModalOpen] = useState(false);
  const metrics = taskMetrics.map((m) => ({ ...m, icon: metricIcons[m.label] }));

  const showList = tab === "All Tasks" || tab === "List View";

  return (
    <>
      <TopHeader
        title="Task Management"
        right={<PrimaryButton onClick={() => setModalOpen(true)}>Create New</PrimaryButton>}
      />
      <PageContent>
        <div className="mb-6">
          <UnderlineTabs tabs={TABS} active={tab} onChange={setTab} />
        </div>

        <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-[22px] font-semibold text-text">Task Overview</h2>
          <div className="flex items-center gap-3">
            <DateControl>This Month</DateControl>
            <DateControl>Feb. 10th, 2025 - Feb. 20th 2025</DateControl>
          </div>
        </div>

        <div className="mb-6">
          <MetricCardGrid items={metrics} />
        </div>

        {showList && <TaskListGroups />}

        {tab === "Table View" && (
          <div className="rounded-lg border border-border bg-white p-10 text-center text-text-secondary">
            Table View uses the same task data in a flat table. (List View shows the grouped layout from the screenshots.)
          </div>
        )}

        {tab === "Kanban View" && (
          <div className="rounded-lg border border-dashed border-border bg-subtle p-12 text-center">
            <p className="text-[18px] font-medium text-text">Kanban View</p>
            <p className="mt-2 text-text-secondary">
              No design was provided for this view yet, so it is left as a placeholder.
            </p>
          </div>
        )}
      </PageContent>

      <CreateTaskModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
