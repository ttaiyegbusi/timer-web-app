"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ChevronLeft, User, Briefcase, FolderClosed, Layers, CircleUser, Contact, Home, ChevronRight } from "lucide-react";
import { useEmployees } from "@/components/employees/EmployeeStore";
import { Avatar } from "@/components/common/Avatar";
import { StatusPill } from "@/components/common/Pills";
import { UnderlineTabs } from "@/components/common/Tabs";
import ProfileSection from "@/components/employees/ProfileSection";
import ProfileField from "@/components/employees/ProfileField";

const TABS = [
  { label: "Profile", icon: User },
  { label: "Employment Details", icon: Briefcase },
  { label: "Documents", icon: FolderClosed },
  { label: "Agreements", icon: Layers },
];

function StatCard({ label, value }) {
  return (
    <div className="rounded-xl border border-border bg-white px-5 py-4">
      <div className="flex items-start justify-between">
        <span className="text-[14px] text-text-secondary">{label}</span>
        <button className="flex items-center gap-0.5 text-[13px] text-text-muted hover:text-text">
          See All <ChevronRight size={13} />
        </button>
      </div>
      <p className="mt-1 text-[24px] font-semibold text-text">{value}</p>
    </div>
  );
}

export default function EmployeeProfilePage() {
  const { empId } = useParams();
  const router = useRouter();
  const { getEmployee, updateProfile, loaded } = useEmployees();
  const employee = getEmployee(empId);

  const [tab, setTab] = useState("Profile");
  const [editing, setEditing] = useState({ basic: false, contact: false, origin: false });
  const [draft, setDraft] = useState({});

  if (!loaded) return <div className="p-10 text-text-secondary">Loading…</div>;
  if (!employee) {
    return (
      <div className="p-10">
        <p className="text-text-secondary">Employee not found.</p>
        <button onClick={() => router.push("/employees")} className="mt-3 text-primary hover:underline">
          Back to Employee Management
        </button>
      </div>
    );
  }

  const p = { ...employee.profile, ...draft };
  const set = (key, val) => setDraft((d) => ({ ...d, [key]: val }));

  const toggleSection = (section) => {
    if (editing[section]) {
      // Save: commit draft to store
      updateProfile(empId, draft);
      setDraft({});
    }
    setEditing((e) => ({ ...e, [section]: !e[section] }));
  };

  return (
    <div className="px-8 pb-12">
      {/* Breadcrumb */}
      <div className="-mx-8 mb-6 flex h-[64px] items-center gap-3 border-b border-border px-8 text-[15px]">
        <button onClick={() => router.push("/employees")} className="flex items-center gap-1 text-text hover:text-primary">
          <ChevronLeft size={18} /> Go Back
        </button>
        <span className="text-border">|</span>
        <span className="text-text-secondary">Dashboard</span>
        <span className="text-text-muted">›</span>
        <span className="text-text-secondary">Employee Management</span>
        <span className="text-text-muted">›</span>
        <span className="font-medium text-primary">{employee.name}</span>
      </div>

      {/* Tabs */}
      <div className="mb-6">
        <UnderlineTabs tabs={TABS} active={tab} onChange={setTab} />
      </div>

      {tab !== "Profile" ? (
        <div className="rounded-xl border border-dashed border-border bg-subtle p-12 text-center">
          <p className="text-[18px] font-medium text-text">{tab}</p>
          <p className="mt-2 text-text-secondary">No design was provided for this tab yet, so it is left as a placeholder.</p>
        </div>
      ) : (
        <>
          {/* Header card + stat cards */}
          <div className="mb-8 grid grid-cols-1 gap-5 xl:grid-cols-[1fr_320px]">
            <div className="flex items-center justify-between rounded-xl border border-border bg-white p-6">
              <div className="flex items-center gap-4">
                <Avatar name={employee.name} size={64} />
                <div>
                  <p className="text-[22px] font-semibold text-text">{employee.name}</p>
                  <p className="text-[15px] text-text-secondary">{employee.role}</p>
                </div>
              </div>
              <StatusPill status={employee.status} />
            </div>
            <div className="grid grid-cols-1 gap-3">
              <StatCard label="Sick Leave Balance" value={p.sickLeave} />
              <StatCard label="Vacation Leave Balance" value={p.vacationLeave} />
              <StatCard label="Carry Over Leave Balance" value={p.carryOver} />
            </div>
          </div>

          {/* Basic Information */}
          <div className="mb-6">
            <ProfileSection icon={CircleUser} title="Basic Information" editing={editing.basic} onToggle={() => toggleSection("basic")}>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                <ProfileField label="First Name" value={p.firstName} editing={editing.basic} onChange={(v) => set("firstName", v)} />
                <ProfileField label="Middle Name" value={p.middleName} editing={editing.basic} onChange={(v) => set("middleName", v)} />
                <ProfileField label="Last Name" value={p.lastName} editing={editing.basic} onChange={(v) => set("lastName", v)} />
                <ProfileField label="Gender" type="select" options={["Female", "Male"]} value={p.gender} editing={editing.basic} onChange={(v) => set("gender", v)} />
                <ProfileField label="Birth Date" type="date" value={p.birthDate} editing={editing.basic} onChange={(v) => set("birthDate", v)} />
                <ProfileField label="Title" type="select" options={["Miss", "Mrs", "Mr", "Dr"]} value={p.title} editing={editing.basic} onChange={(v) => set("title", v)} />
                <ProfileField label="Religion" type="select" options={["Christianity", "Islam", "Other"]} value={p.religion} editing={editing.basic} onChange={(v) => set("religion", v)} />
                <ProfileField label="Marital Status" type="select" options={["Single", "Married", "Divorced"]} value={p.maritalStatus} editing={editing.basic} onChange={(v) => set("maritalStatus", v)} />
              </div>
              <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
                <ProfileField label="Nationality" type="select" options={["Nigerian", "Ghanaian", "Other"]} value={p.nationality} editing={editing.basic} onChange={(v) => set("nationality", v)} />
                <ProfileField label="Home Address" value={p.homeAddress} editing={editing.basic} onChange={(v) => set("homeAddress", v)} />
                <ProfileField label="Spouse's Name" value={p.spouseName} editing={editing.basic} onChange={(v) => set("spouseName", v)} />
                <ProfileField label="Spouse's Phone Number" value={p.spousePhone} editing={editing.basic} onChange={(v) => set("spousePhone", v)} />
                <ProfileField label="Number of Children" type="select" options={["0", "1", "2", "3", "4+"]} placeholder="Select" value={p.numberOfChildren} editing={editing.basic} onChange={(v) => set("numberOfChildren", v)} />
                <ProfileField label="Mother's Maiden Name" value={p.mothersMaidenName} editing={editing.basic} onChange={(v) => set("mothersMaidenName", v)} />
                <ProfileField label="Genotype" value={p.genotype} editing={editing.basic} onChange={(v) => set("genotype", v)} />
                <ProfileField label="Blood Group" value={p.bloodGroup} editing={editing.basic} onChange={(v) => set("bloodGroup", v)} />
              </div>
            </ProfileSection>
          </div>

          {/* Contact Information */}
          <div className="mb-6">
            <ProfileSection icon={Contact} title="Contact Information" editing={editing.contact} onToggle={() => toggleSection("contact")}>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <ProfileField label="Email Address" value={p.email} editing={editing.contact} onChange={(v) => set("email", v)} />
                <ProfileField label="Alternate Email" value={p.altEmail} editing={editing.contact} onChange={(v) => set("altEmail", v)} />
                <ProfileField label="Phone Number" value={p.phone} editing={editing.contact} onChange={(v) => set("phone", v)} />
                <ProfileField label="Alternate Phone Number" value={p.altPhone} editing={editing.contact} onChange={(v) => set("altPhone", v)} />
              </div>
            </ProfileSection>
          </div>

          {/* Origin */}
          <div className="mb-6">
            <ProfileSection icon={Home} title="Origin" editing={editing.origin} onToggle={() => toggleSection("origin")}>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <ProfileField label="Country of Origin" value={p.countryOfOrigin} editing={editing.origin} onChange={(v) => set("countryOfOrigin", v)} />
                <ProfileField label="State" value={p.state} editing={editing.origin} onChange={(v) => set("state", v)} />
                <ProfileField label="Local Government" value={p.localGovernment} editing={editing.origin} onChange={(v) => set("localGovernment", v)} />
                <ProfileField label="Ethnic Group" value={p.ethnicGroup} editing={editing.origin} onChange={(v) => set("ethnicGroup", v)} />
              </div>
            </ProfileSection>
          </div>
        </>
      )}
    </div>
  );
}
