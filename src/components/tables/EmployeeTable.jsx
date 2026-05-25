"use client";

import { useState } from "react";
import { Eye, UserCog, Trash2 } from "lucide-react";
import { Avatar } from "@/components/common/Avatar";
import { StatusPill } from "@/components/common/Pills";
import { Checkbox, CopyableId } from "@/components/common/Inputs";
import KebabMenu from "@/components/common/KebabMenu";
import { employees, departmentColor } from "@/data/mockData";

export default function EmployeeTable() {
  const [checked, setChecked] = useState({});
  const toggle = (i) => setChecked((c) => ({ ...c, [i]: !c[i] }));

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-left">
        <thead>
          <tr className="bg-tableHeader text-[16px] text-text-secondary">
            <th className="rounded-l-lg px-4 py-4 font-medium">
              <Checkbox checked={false} />
            </th>
            <th className="px-4 py-4 font-medium">Employee ID</th>
            <th className="px-4 py-4 font-medium">Employee Details</th>
            <th className="px-4 py-4 font-medium">Department</th>
            <th className="px-4 py-4 font-medium">Job Title</th>
            <th className="px-4 py-4 font-medium">Status</th>
            <th className="rounded-r-lg px-4 py-4 font-medium" />
          </tr>
        </thead>
        <tbody>
          {employees.map((e, i) => (
            <tr key={i} className="border-b border-border-light">
              <td className="px-4 py-4">
                <Checkbox checked={!!checked[i]} onChange={() => toggle(i)} />
              </td>
              <td className="px-4 py-4">
                <CopyableId id={e.id} />
              </td>
              <td className="px-4 py-4">
                <div className="flex items-center gap-3">
                  <Avatar name={e.name} size={38} />
                  <div>
                    <p className="text-[16px] font-medium text-text">{e.name}</p>
                    <p className="text-[14px] text-text-muted">{e.email}</p>
                  </div>
                </div>
              </td>
              <td className="px-4 py-4">
                <span className="flex items-center gap-2 text-[16px] text-text">
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ background: departmentColor(e.department) }}
                  />
                  {e.department}
                </span>
              </td>
              <td className="px-4 py-4 text-[16px] text-text">{e.role}</td>
              <td className="px-4 py-4">
                <StatusPill status={e.status} />
              </td>
              <td className="px-4 py-4">
                <KebabMenu
                  header="Action"
                  items={[
                    { label: "View Profile", icon: Eye, highlight: true },
                    { label: "Suspend Employee", icon: UserCog },
                    { label: "Remove Employee", icon: Trash2, danger: true },
                  ]}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
