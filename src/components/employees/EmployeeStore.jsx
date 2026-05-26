"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { employees as baseEmployees } from "@/data/mockData";

const STORAGE_KEY = "timeinapp.employees.v1";

// Per-name profile defaults so each person has realistic, consistent data.
// Faith mirrors the design screenshot exactly.
const PROFILE_BY_NAME = {
  "Faith Onasanya": {
    firstName: "Faith", middleName: "Modupeoluwa", lastName: "Onasanya",
    gender: "Female", birthDate: "07-06-2001", title: "Miss",
    religion: "Christianity", maritalStatus: "Single", nationality: "Nigerian",
    homeAddress: "No 7 Graceland Estate, Jakande, Lekki",
    spouseName: "", spousePhone: "+234", numberOfChildren: "",
    mothersMaidenName: "Adeyemi", genotype: "AA", bloodGroup: "O+",
    altEmail: "faithonas@gmail.com", phone: "+234 908 7893 7899",
    altPhone: "+234 908 7893 7899",
    countryOfOrigin: "Nigeria", state: "Ogun",
    localGovernment: "Ijebu Ode", ethnicGroup: "Yoruba",
    sickLeave: 25, vacationLeave: 25, carryOver: 25,
  },
  "Tope Aiyegbusi": {
    firstName: "Tope", middleName: "Oluwaseun", lastName: "Aiyegbusi",
    gender: "Male", birthDate: "12-03-1995", title: "Mr",
    religion: "Christianity", maritalStatus: "Married", nationality: "Nigerian",
    homeAddress: "12 Admiralty Way, Lekki Phase 1, Lagos",
    spouseName: "Mary Aiyegbusi", spousePhone: "+234 801 234 5678", numberOfChildren: "2",
    mothersMaidenName: "Balogun", genotype: "AS", bloodGroup: "A+",
    altEmail: "tope.alt@gmail.com", phone: "+234 802 345 6789",
    altPhone: "+234 803 456 7890",
    countryOfOrigin: "Nigeria", state: "Lagos",
    localGovernment: "Eti-Osa", ethnicGroup: "Yoruba",
    sickLeave: 20, vacationLeave: 18, carryOver: 10,
  },
  "John Niyon": {
    firstName: "John", middleName: "Chukwuemeka", lastName: "Niyon",
    gender: "Male", birthDate: "22-09-1998", title: "Mr",
    religion: "Christianity", maritalStatus: "Single", nationality: "Nigerian",
    homeAddress: "5 Banana Island Road, Ikoyi, Lagos",
    spouseName: "", spousePhone: "+234", numberOfChildren: "",
    mothersMaidenName: "Okafor", genotype: "AA", bloodGroup: "B+",
    altEmail: "john.alt@gmail.com", phone: "+234 805 678 9012",
    altPhone: "+234 806 789 0123",
    countryOfOrigin: "Nigeria", state: "Anambra",
    localGovernment: "Onitsha North", ethnicGroup: "Igbo",
    sickLeave: 22, vacationLeave: 25, carryOver: 8,
  },
};

function profileFor(name) {
  return (
    PROFILE_BY_NAME[name] || {
      firstName: name.split(" ")[0] || "",
      middleName: "",
      lastName: name.split(" ").slice(1).join(" ") || "",
      gender: "—", birthDate: "", title: "", religion: "", maritalStatus: "",
      nationality: "Nigerian", homeAddress: "", spouseName: "", spousePhone: "+234",
      numberOfChildren: "", mothersMaidenName: "", genotype: "", bloodGroup: "",
      altEmail: "", phone: "", altPhone: "",
      countryOfOrigin: "Nigeria", state: "", localGovernment: "", ethnicGroup: "",
      sickLeave: 25, vacationLeave: 25, carryOver: 25,
    }
  );
}

// Build the enriched seed: unique empId per row + full profile + role mapped
// to a "Product Designer"-style title used on the profile header.
function buildSeed() {
  return baseEmployees.map((e, i) => ({
    ...e,
    empId: `emp_${i + 1}`,
    profile: { ...profileFor(e.name), email: e.email },
  }));
}

const EmployeeContext = createContext(null);

export function EmployeeProvider({ children }) {
  const [list, setList] = useState(buildSeed);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length) setList(parsed);
      }
    } catch {
      // ignore corrupt storage
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    } catch {
      // non-fatal
    }
  }, [list, loaded]);

  const getEmployee = (empId) => list.find((e) => e.empId === empId);

  const updateProfile = (empId, patch) => {
    setList((prev) =>
      prev.map((e) =>
        e.empId === empId ? { ...e, profile: { ...e.profile, ...patch } } : e
      )
    );
  };

  return (
    <EmployeeContext.Provider value={{ employees: list, loaded, getEmployee, updateProfile }}>
      {children}
    </EmployeeContext.Provider>
  );
}

export function useEmployees() {
  const ctx = useContext(EmployeeContext);
  if (!ctx) throw new Error("useEmployees must be used within EmployeeProvider");
  return ctx;
}
