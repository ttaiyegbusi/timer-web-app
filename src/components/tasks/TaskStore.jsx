"use client";

import { createContext, useContext, useEffect, useState } from "react";

const STORAGE_KEY = "timeinapp.tasks.v1";

// Seed data: mirrors the original mock groups but with ids, descriptions,
// status, assignees, and tags so the detail page has something to show.
const seedTasks = [
  {
    id: "t1",
    name: "Design Landing Page for Yaraa",
    description:
      "Design a visually appealing and user-friendly landing page that effectively communicates key information, drives engagement, and encourages conversions based on the business goals.",
    status: "Todo",
    priority: "High",
    dueDate: "4th May, 2024",
    assignees: ["Temitope Aiyegbusi"],
    tags: ["Design", "Front End"],
  },
  { id: "t2", name: "Design Landing Page for Yaraa", description: "", status: "Todo", priority: "Low", dueDate: "4th May, 2024", assignees: ["Camila Dennis"], tags: ["Design"] },
  { id: "t3", name: "Design Landing Page for Yaraa", description: "", status: "In Progress", priority: "Low", dueDate: "4th May, 2024", assignees: ["Ayokunle Bamidele"], tags: [] },
  { id: "t4", name: "Design Landing Page for Yaraa", description: "", status: "In Progress", priority: "Mid", dueDate: "4th May, 2024", assignees: ["Temitope Aiyegbusi"], tags: ["Front End"] },
  { id: "t5", name: "Design Landing Page for Yaraa", description: "", status: "Pending", priority: "Low", dueDate: "4th May, 2024", assignees: ["Camila Dennis"], tags: [] },
  { id: "t6", name: "Design Landing Page for Yaraa", description: "", status: "Pending", priority: "Low", dueDate: "4th May, 2024", assignees: ["Ayokunle Bamidele"], tags: [] },
  { id: "t7", name: "Design Landing Page for Yaraa", description: "", status: "Done", priority: "Mid", dueDate: "4th May, 2024", assignees: ["Temitope Aiyegbusi"], tags: ["Design"] },
  { id: "t8", name: "Design Landing Page for Yaraa", description: "", status: "Done", priority: "High", dueDate: "4th May, 2024", assignees: ["Camila Dennis"], tags: [] },
];

// Group display config: title + the fixed count badge from the screenshots.
export const STATUS_ORDER = ["Todo", "In Progress", "Pending", "Done"];
export const STATUS_LABEL = {
  Todo: "TODO",
  "In Progress": "In Progress",
  Pending: "Pending",
  Done: "Done",
};
export const GROUP_COUNT = 8; // badge shown in the screenshots

export const ASSIGNEE_OPTIONS = [
  "Ayokunle Bamidele",
  "Temitope Aiyegbusi",
  "Camila Dennis",
];

const TaskContext = createContext(null);

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState(seedTasks);
  const [loaded, setLoaded] = useState(false);

  // Load from localStorage once on mount (client only).
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length) setTasks(parsed);
      }
    } catch {
      // ignore corrupt storage; fall back to seed
    }
    setLoaded(true);
  }, []);

  // Persist on every change, but only after the initial load so we don't
  // overwrite stored data with the seed on first paint.
  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch {
      // storage may be unavailable; non-fatal
    }
  }, [tasks, loaded]);

  const addTask = (task) => {
    const id = "t" + Date.now().toString(36);
    const newTask = {
      id,
      name: task.name || "Untitled Task",
      description: task.description || "",
      status: task.status || "Todo",
      priority: task.priority || "Mid",
      dueDate: task.dueDate || "",
      assignees: task.assignees || [],
      tags: task.tags || [],
    };
    setTasks((prev) => [newTask, ...prev]);
    return id;
  };

  const updateTask = (id, patch) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...patch } : t))
    );
  };

  const getTask = (id) => tasks.find((t) => t.id === id);

  const resetTasks = () => setTasks(seedTasks);

  return (
    <TaskContext.Provider
      value={{ tasks, loaded, addTask, updateTask, getTask, resetTasks }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  const ctx = useContext(TaskContext);
  if (!ctx) throw new Error("useTasks must be used within TaskProvider");
  return ctx;
}
