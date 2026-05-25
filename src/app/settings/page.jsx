"use client";

import { useState } from "react";
import { User, Bell, Shield, Building2 } from "lucide-react";
import TopHeader from "@/components/layout/TopHeader";
import { PageContent, Card } from "@/components/common/Card";
import PrimaryButton from "@/components/common/PrimaryButton";
import { currentUser } from "@/data/mockData";

// No screenshot was provided for this page; built as an on-brand placeholder.
const sections = [
  { key: "Profile", icon: User },
  { key: "Notifications", icon: Bell },
  { key: "Security", icon: Shield },
  { key: "Organization", icon: Building2 },
];

function Field({ label, value }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[15px] text-text-secondary">
        {label}
      </span>
      <input
        defaultValue={value}
        className="h-[52px] w-full rounded-lg border border-border bg-white px-4 text-[16px] text-text outline-none focus:border-primary"
      />
    </label>
  );
}

export default function SettingsPage() {
  const [active, setActive] = useState("Profile");

  return (
    <>
      <TopHeader title="Settings" />
      <PageContent>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[260px_1fr]">
          <nav className="flex flex-col gap-1">
            {sections.map((s) => {
              const Icon = s.icon;
              const isActive = active === s.key;
              return (
                <button
                  key={s.key}
                  onClick={() => setActive(s.key)}
                  className={`flex items-center gap-3 rounded-lg px-4 py-3 text-left text-[16px] ${
                    isActive
                      ? "bg-primary-soft font-medium text-primary"
                      : "text-text-secondary hover:bg-subtle"
                  }`}
                >
                  <Icon size={20} />
                  {s.key}
                </button>
              );
            })}
          </nav>

          <Card>
            <h3 className="mb-5 text-[20px] font-medium text-text">
              {active}
            </h3>
            {active === "Profile" && (
              <div className="grid max-w-xl grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Full Name" value={currentUser.name} />
                <Field label="Email Address" value={currentUser.email} />
                <Field label="Job Title" value="Product Manager" />
                <Field label="Department" value="Product" />
              </div>
            )}
            {active !== "Profile" && (
              <p className="text-text-secondary">
                {active} settings would appear here.
              </p>
            )}
            <div className="mt-6">
              <PrimaryButton icon={null}>Save Changes</PrimaryButton>
            </div>
          </Card>
        </div>
      </PageContent>
    </>
  );
}
