import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { DashboardPage } from "../Pages/DashboardPage";

// Navigation pages per role
const pages = {
  Donor: [
    { path: "/dashboard", name: "Dashboard" },
    { path: "/profile", name: "Profile" },
    { path: "/schedule", name: "Schedule Donation" },
    { path: "/history", name: "Donation History" },
    { path: "/rewards", name: "Rewards" },
  ],
  Recipient: [
    { path: "/dashboard", name: "Dashboard" },
    { path: "/profile", name: "Profile" },
    { path: "/request", name: "Request Blood" },
    { path: "/search", name: "Search Blood" },
    { path: "/status", name: "Request Status" },
  ],
  Hospital: [
    { path: "/dashboard", name: "Dashboard" },
    { path: "/manage", name: "Manage Donations" },
    { path: "/inventory", name: "Blood Inventory" },
    { path: "/requests", name: "Blood Requests" },
  ],
  Admin: [
    { path: "/dashboard", name: "Dashboard" },
    { path: "/users", name: "User Management" },
    { path: "/rewards-admin", name: "Rewards Setup" },
    { path: "/audit", name: "System Audit" },
  ]
};

interface RoleRoutesProps {
  role: string;
}

export const RoleRoutes: React.FC<RoleRoutesProps> = ({ role }) => {
  const baseRoutePath = `/${role.toLowerCase()}`;
  const rolePages = pages[role as keyof typeof pages];
  
  return (
    <Routes>
      {rolePages.map(({ path, name }) => {
        const pageTitle = `${role} - ${name}`;
        const pageDescription = `Content for ${pageTitle}.`;
        return (
          <Route
            key={`${baseRoutePath}${path}`}
            path={path}
            element={<DashboardPage title={pageTitle} description={pageDescription} />}
          />
        );
      })}
      <Route path="*" element={<Navigate to={rolePages[0].path} replace />} />
    </Routes>
  );
};