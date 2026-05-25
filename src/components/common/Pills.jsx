import {
  CircleCheck,
  Sun,
  CircleX,
  Flag,
  Check,
} from "lucide-react";

// Employee status: Active / On Leave
export function StatusPill({ status }) {
  if (status === "On Leave") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-pill bg-warning-bg px-3 py-1.5 text-[14px] font-medium text-warning">
        <Sun size={15} />
        On Leave
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 rounded-pill bg-success-bg px-3 py-1.5 text-[14px] font-medium text-success">
      <CircleCheck size={15} />
      Active
    </span>
  );
}

// Leave request status: Approved / Rejected / Pending(action buttons handled in table)
export function LeaveStatusPill({ status }) {
  if (status === "Approved") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-pill bg-success-bg px-3 py-1.5 text-[14px] font-medium text-success">
        <CircleCheck size={15} />
        Approved
      </span>
    );
  }
  if (status === "Rejected") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-pill bg-danger-bg px-3 py-1.5 text-[14px] font-medium text-danger">
        <CircleX size={15} />
        Rejected
      </span>
    );
  }
  return null;
}

// Task priority: High / Low / Mid
export function PriorityPill({ priority }) {
  const map = {
    High: "bg-danger-bg text-danger",
    Low: "bg-low-bg text-low-text",
    Mid: "bg-mid-bg text-mid-text",
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-pill px-3 py-1.5 text-[14px] font-medium ${
        map[priority] || map.Mid
      }`}
    >
      <Flag size={14} />
      {priority}
    </span>
  );
}

// Attendance status: Late / Early
export function AttendancePill({ status }) {
  const late = status === "Late";
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-pill px-3 py-1.5 text-[14px] font-medium ${
        late ? "bg-warning-bg text-warning" : "bg-success-bg text-success"
      }`}
    >
      {late ? <Sun size={14} /> : <Check size={14} />}
      {status}
    </span>
  );
}
