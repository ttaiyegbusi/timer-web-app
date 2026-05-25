// Central mock data for TimeinApp.
// All pages import from here.

export const currentUser = {
  name: "Tope Aiyegbusi",
  email: "ttaiyegbusi@gmail.com",
};

export const departments = [
  { name: "Marketing", color: "#F47621" },
  { name: "Product", color: "#3B5CF6" },
  { name: "Design", color: "#2DA676" },
];

export const departmentColor = (name) =>
  departments.find((d) => d.name === name)?.color || "#87909E";

// ---------------------------------------------------------------------------
// Employees
// ---------------------------------------------------------------------------
export const employees = [
  {
    id: "100123",
    name: "Tope Aiyegbusi",
    email: "tope@easepay.com",
    role: "Product Manager",
    department: "Product",
    status: "Active",
  },
  {
    id: "100123",
    name: "John Niyon",
    email: "john@easepay.com",
    role: "Motion Designer",
    department: "Design",
    status: "Active",
  },
  {
    id: "100123",
    name: "Tope Aiyegbusi",
    email: "tope@easepay.com",
    role: "Product Manager",
    department: "Product",
    status: "Active",
  },
  {
    id: "100123",
    name: "Tope Aiyegbusi",
    email: "tope@easepay.com",
    role: "Product Manager",
    department: "Product",
    status: "Active",
  },
  {
    id: "100123",
    name: "Faith Onasanya",
    email: "faith@easepay.com",
    role: "Content Creator",
    department: "Marketing",
    status: "Active",
  },
  {
    id: "100123",
    name: "John Niyon",
    email: "john@easepay.com",
    role: "Motion Designer",
    department: "Design",
    status: "On Leave",
  },
  {
    id: "100123",
    name: "Faith Onasanya",
    email: "faith@easepay.com",
    role: "Content Creator",
    department: "Marketing",
    status: "Active",
  },
  {
    id: "100123",
    name: "Tope Aiyegbusi",
    email: "tope@easepay.com",
    role: "Product Manager",
    department: "Product",
    status: "Active",
  },
  {
    id: "100123",
    name: "Faith Onasanya",
    email: "faith@easepay.com",
    role: "Content Creator",
    department: "Marketing",
    status: "Active",
  },
];

export const employeeMetrics = [
  { label: "Total Employees", value: "500", trend: 12, dir: "up" },
  { label: "New Hires", value: "5", trend: 20, dir: "down" },
  { label: "Active Employees", value: "467", trend: 20, dir: "down" },
  { label: "Inactive Employees", value: "33", trend: 12, dir: "up" },
];

// ---------------------------------------------------------------------------
// Tasks
// ---------------------------------------------------------------------------
export const taskGroups = [
  {
    title: "TODO",
    count: 8,
    tasks: [
      { name: "Design Landing Page for Yaraa", dueDate: "4th May, 2024", priority: "High" },
      { name: "Design Landing Page for Yaraa", dueDate: "4th May, 2024", priority: "Low" },
    ],
  },
  {
    title: "In Progress",
    count: 8,
    tasks: [
      { name: "Design Landing Page for Yaraa", dueDate: "4th May, 2024", priority: "Low" },
      { name: "Design Landing Page for Yaraa", dueDate: "4th May, 2024", priority: "Mid" },
    ],
  },
  {
    title: "Pending",
    count: 8,
    tasks: [
      { name: "Design Landing Page for Yaraa", dueDate: "4th May, 2024", priority: "Low" },
      { name: "Design Landing Page for Yaraa", dueDate: "4th May, 2024", priority: "Low" },
    ],
  },
  {
    title: "Done",
    count: 8,
    tasks: [
      { name: "Design Landing Page for Yaraa", dueDate: "4th May, 2024", priority: "Mid" },
      { name: "Design Landing Page for Yaraa", dueDate: "4th May, 2024", priority: "High" },
    ],
  },
];

export const taskMetrics = [
  { label: "Total Tasks Created", value: "300", trend: 12, dir: "up" },
  { label: "Average Time on Task", value: "25 mins", trend: 20, dir: "down" },
  { label: "Task Completion Rate", value: "80%", trend: 20, dir: "down" },
  { label: "Overdue Tasks Count", value: "20", trend: 12, dir: "up" },
];

export const taskSummaryList = Array.from({ length: 5 }).map(() => ({
  name: "Design Landing Page for Yaraa",
  dueDate: "4th May, 2024",
  priority: "High",
}));

// ---------------------------------------------------------------------------
// Leave
// ---------------------------------------------------------------------------
export const leaveRequests = [
  { id: "EMP12345", name: "Tope Aiyegbusi", role: "Lead Designer", leaveType: "Sick", dateRange: "12th Apr - 13th May 2025", duration: "30 Days", status: "Pending" },
  { id: "EMP12345", name: "John Niyon", role: "Lead Designer", leaveType: "Vacation", dateRange: "12th Apr - 14th May 2025", duration: "30 Days", status: "Pending" },
  { id: "EMP12345", name: "Faith Onasanya", role: "Vice President", leaveType: "Annual", dateRange: "12th Apr - 13th May 2025", duration: "30 Days", status: "Pending" },
  { id: "EMP12345", name: "Jenny Wilson", role: "Trust Administrator", leaveType: "Emergency", dateRange: "12th Apr - 13th May 2025", duration: "30 Days", status: "Rejected" },
  { id: "EMP12345", name: "Theresa Webb", role: "Lead Designer", leaveType: "Maternity", dateRange: "12th Apr - 13th May 2025", duration: "30 Days", status: "Approved" },
  { id: "EMP12345", name: "Marvin McKinney", role: "Tax Officer", leaveType: "Emergency", dateRange: "12th Apr - 13th May 2025", duration: "30 Days", status: "Pending" },
  { id: "EMP12345", name: "Courtney Henry", role: "Accountant", leaveType: "Vacation", dateRange: "12th Apr - 13th May 2025", duration: "30 Days", status: "Pending" },
  { id: "EMP12345", name: "Ralph Edwards", role: "Regional Manager", leaveType: "Vacation", dateRange: "12th Apr - 13th May 2025", duration: "30 Days", status: "Pending" },
  { id: "EMP12345", name: "Wade Warren", role: "Trust Administrator", leaveType: "Vacation", dateRange: "12th Apr - 13th May 2025", duration: "30 Days", status: "Pending" },
];

export const leaveMetrics = [
  { label: "Total Requests", value: "280", trend: 12, dir: "up" },
  { label: "Approved Requests", value: "251", trend: 20, dir: "down" },
  { label: "Pending Requests", value: "18", trend: 20, dir: "down" },
  { label: "Rejected Requests", value: "11", trend: 12, dir: "up" },
];

export const leaveTypeTabs = [
  "All Leave",
  "Vacation Leave",
  "Sick Leave",
  "Annual Leave",
  "Emergency Leave",
  "Maternity Leave",
];

// ---------------------------------------------------------------------------
// Dashboard
// ---------------------------------------------------------------------------
export const dashboardMetrics = [
  { label: "Tasks", value: "300", trend: 12, dir: "up", icon: "tasks" },
  { label: "Leave Requests", value: "18", trend: 20, dir: "down", icon: "leave" },
  { label: "Attendance", value: "300", trend: 20, dir: "down", icon: "attendance" },
  { label: "Total Employees", value: "11", trend: 12, dir: "up", icon: "employees" },
];

export const recentActivities = [
  { name: "Tope Aiyegbusi", role: "Lead Designer", activity: "Requested sick leave starting fro..." },
  { name: "John Niyon", role: "Lead Designer", activity: "Clocked in at 7:12 AM" },
  { name: "Faith Onasanya", role: "Vice President", activity: "Created a new high priority task" },
  { name: "Jenny Wilson", role: "Trust Administrator", activity: "Completed a task" },
  { name: "Theresa Webb", role: "Lead Designer", activity: "Requested sick leave" },
];

export const dashboardLeaveRequests = [
  { name: "Tope Aiyegbusi", role: "Lead Designer", leave: "Sick Leave", date: "12th Apr - 14th May 2025", status: "Rejected" },
  { name: "John Niyon", role: "Lead Designer", leave: "Vacation Leave", date: "12th Apr - 14th May 2025", status: "Approved" },
  { name: "Faith Onasanya", role: "Vice President", leave: "Annual Leave", date: "12th Apr - 14th May 2025", status: "Pending" },
  { name: "Jenny Wilson", role: "Trust Administrator", leave: "Emergency Leave", date: "12th Apr - 14th May 2025", status: "Rejected" },
  { name: "Theresa Webb", role: "Lead Designer", leave: "Maternity Leave", date: "12th Apr - 14th May 2025", status: "Pending" },
];

export const attendanceRows = [
  { name: "Tope Aiyegbusi", role: "Lead Designer", status: "Late" },
  { name: "John Niyon", role: "Lead Designer", status: "Early" },
  { name: "Faith Onasanya", role: "Vice President", status: "Late" },
  { name: "Jenny Wilson", role: "Trust Administrator", status: "Late" },
  { name: "Theresa Webb", role: "Lead Designer", status: "Early" },
  { name: "Marvin McKinney", role: "Tax Officer", status: "Early" },
  { name: "Courtney Henry", role: "Accountant", status: "Late" },
  { name: "Ralph Edwards", role: "Regional Manager", status: "Early" },
  { name: "Wade Warren", role: "Trust Administrator", status: "Early" },
].map((r) => ({
  ...r,
  clock: "7:30 AM  -  N/A",
  overtime: "-",
  location: "Withston Street, Warehouse Building 32, New York City",
}));

// Chart datasets
export const taskSummaryPie = [
  { name: "Pending", value: 25, fill: "#EAF0FF" },
  { name: "Ongoing", value: 35, fill: "#3B5CF6" },
  { name: "Completed", value: 40, fill: "#172762" },
];

export const leaveSummaryPie = [
  { name: "Rejected", value: 25, fill: "#EAF0FF" },
  { name: "Pending", value: 35, fill: "#3B5CF6" },
  { name: "Approved", value: 40, fill: "#172762" },
];

export const employmentTypePie = [
  { name: "Intern", value: 25, fill: "#EAF0FF", staffs: 30 },
  { name: "Part Time", value: 35, fill: "#3B5CF6", staffs: 30 },
  { name: "Full Time", value: 40, fill: "#172762", staffs: 30 },
];

export const workModePie = [
  { name: "Remote", value: 25, fill: "#EAF0FF", staffs: 30 },
  { name: "Hybrid", value: 35, fill: "#3B5CF6", staffs: 30 },
  { name: "On Site", value: 40, fill: "#172762", staffs: 30 },
];

export const employeeSummaryBars = [
  { day: "Mon", present: 33, onLeave: 7 },
  { day: "Tue", present: 0, onLeave: 0 },
  { day: "Wed", present: 0, onLeave: 0 },
  { day: "Thur", present: 0, onLeave: 0 },
  { day: "Fri", present: 0, onLeave: 0 },
  { day: "Sat", present: 0, onLeave: 0 },
  { day: "Sun", present: 0, onLeave: 0 },
];

// Heatmap: rows = time slots (top to bottom), cols = weekdays.
// state: "in" (clock in / blue), "out" (clock out / navy), "lunch" (striped), "" (empty)
export const attendanceHeatmap = {
  times: ["04 PM", "03 PM", "02 PM", "12 PM", "10 AM", "09 AM", "08 AM"],
  days: ["Mon", "Tue", "Wed", "Thur", "Fri"],
  cells: [
    ["out", "", "out", "", ""],
    ["", "out", "", "out", "out"],
    ["", "", "", "", ""],
    ["lunch", "lunch", "lunch", "lunch", "lunch"],
    ["", "in", "", "", ""],
    ["in", "", "in", "", ""],
    ["", "", "", "in", ""],
  ],
};
