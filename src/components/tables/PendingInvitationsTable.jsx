"use client";

import { useState } from "react";
import { Mail } from "lucide-react";
import { Avatar } from "@/components/common/Avatar";
import { Checkbox, CopyableId } from "@/components/common/Inputs";
import { departmentColor } from "@/data/mockData";
import { useEmployees } from "@/components/employees/EmployeeStore";

export default function PendingInvitationsTable() {
  const { employees } = useEmployees();
  const [checked, setChecked] = useState({});
  const toggle = (id) => setChecked((c) => ({ ...c, [id]: !c[id] }));

  // Show a subset as "pending" — the design shows 8 rows.
  const pending = employees.slice(0, 8);

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
            <th className="rounded-r-lg px-4 py-4 font-medium">Action</th>
          </tr>
        </thead>
        <tbody>
          {pending.map((e) => (
            <tr key={e.empId} className="border-b border-border-light">
              <td className="px-4 py-4">
                <Checkbox checked={!!checked[e.empId]} onChange={() => toggle(e.empId)} />
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
                <button className="inline-flex items-center gap-2 text-[16px] font-medium text-primary hover:underline">
                  Resend Invite
                  <Mail size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
