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
