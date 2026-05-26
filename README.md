# TimeinApp

HR / workforce management dashboard built with **Next.js 14 (App Router)**, **JavaScript**, **Tailwind CSS**, **lucide-react**, and **Recharts**.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The root redirects to `/dashboard`.

## Scripts

- `npm run dev` — start the dev server
- `npm run build` — production build
- `npm run start` — serve the production build

## Routes

| Route | Page |
|---|---|
| `/dashboard` | Dashboard & Analytics (charts, metrics, tables) |
| `/tasks` | Task Management (accordion task groups) |
| `/employees` | Employee Management (table + action menu) |
| `/leave` | Leave Management (alternate sidebar, request tabs) |
| `/attendance` | Attendance Management* |
| `/settings` | Settings* |

\* No screenshot was provided for these two; they are built by inference from
the shared patterns and clearly marked with a comment in the source.

## Structure

```
src/
  app/            App Router pages (one folder per route) + layout + globals.css
  components/
    layout/       AppShell, Sidebar (default + leave variants), TopHeader
    common/       Buttons, pills, avatars, tabs, pagination, metric cards, etc.
    tables/       EmployeeTable, LeaveRequestsTable, TaskListGroups, AttendanceTable
    dashboard/    Gauge, pie cards, bar chart, heatmap, list cards
  data/
    mockData.js   All mock entities and chart datasets
```

## Attendance management features

- **Attendance page** (`/attendance`): the real design — leave-type tabs
  (Attendance active; the others are placeholders), metric cards (Total
  Employees, Present, Absent, On Leave), Export Attendance Report, All/Early/Late
  sub-tabs that filter the table, and the attendance table with an Overtime
  column.
- **Add Attendance modal** (functional): multi-select employees, Time In/Out
  with AM/PM, an **auto-computed Overtime and Early/Late Status** (rules in
  `AttendanceStore.jsx`: 8-hour standard shift, 7:30 AM on-time cutoff —
  easy to change), location field, and a Use Geolocation checkbox. Submitting
  adds one record per selected employee to the table.
- **Employee Attendance Details** slide-over (click any employee row): header
  card with avatar/ID/role/department/avg hours, an Attendance Summary, and a
  monthly log table with prev/next, Export CSV, and Filter.
- Records persist in `localStorage` (key `timeinapp.attendance.v1`).

## Employee management features

- **Pending Invitations tab** (`/employees`): a table variant showing invited
  employees with a **Resend Invite** action instead of status/kebab. No
  overview cards or search on this tab, matching the design.
- **Employee profile page** (`/employees/[empId]`, click any employee name or
  "View Profile"): breadcrumb, a tab bar (Profile active; Employment Details /
  Documents / Agreements are placeholders — no design provided), a header card
  with avatar/name/role/status and three leave-balance stat cards, then three
  editable sections — Basic Information, Contact Information, Origin.
- **Functional editing:** each section has an Edit button that unlocks its
  fields; clicking Save commits changes to the employee store. Edits persist in
  `localStorage` (key `timeinapp.employees.v1`) via
  `src/components/employees/EmployeeStore.jsx`.
- Every employee has full profile data (Faith matches the screenshot exactly;
  others get realistic generated values).

## Task management features

- **Create Task modal** (Create New button on `/tasks`): functional. Title,
  description, status / priority / assignee dropdowns, a two-month date picker,
  and tags. Submitting adds the task to the correct status group.
- **Task detail page** (`/tasks/[id]`, click any task name): breadcrumb,
  editable title, a **TipTap** rich-text editor (Bold, Italic, lists, link),
  a Properties panel, an Activity feed, and a Comments section.
- **Persistence:** tasks are stored in `localStorage` (key
  `timeinapp.tasks.v1`) via a React context in
  `src/components/tasks/TaskStore.jsx`, so created/edited tasks survive a
  refresh. Clearing site data resets to the seed tasks.
- The four-tab bar (All Tasks / List View / Table View / Kanban View) matches
  the newer screenshots. **Kanban View is a placeholder** — no design was
  provided for it.

## Notes

- The sidebar switches to the **Users / Authorization** variant on `/leave`,
  matching the Leave Management screenshot. All other pages use the
  **Departments** variant.
- Avatars render as colored initials (deterministic per name) since no image
  assets were provided.
- Design tokens (colors, radii, shadows) live in both `tailwind.config.js`
  (as utilities) and `globals.css` (as CSS variables).
- Charts use Recharts; the Task Impact gauge and the attendance heatmap are
  hand-built SVG/CSS for finer control over the exact look.
- Interactions implemented: route-aware sidebar, active tabs, list/table toggle,
  request-status filtering on the Leave page, kebab dropdowns, copy-ID buttons,
  collapsible task groups, clickable checkboxes.
