import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { DashboardPage } from "../Pages/DashboardPage";

// Import the new form components
import DonorDashboard from "../../DonorDashboard";
import ScheduleDonationPage from "../../ScheduleDonationPage";
import DonationHistoryPage from "../../DonationHistoryPage";
import BloodRequestForm from "../Pages/BloodRequestForm";
import DonationTrackingForm from "../Pages/DonationTrackingForm";
import BloodInventoryForm from "../Pages/BloodInventoryForm";
import UserManagementForm from "../Pages/UserManagementForm";

// Navigation pages per role
const pages = {
  Donor: [
    { path: "/dashboard", name: "Dashboard", component: DonorDashboard },
    { path: "/profile", name: "Profile" },
    { path: "/schedule", name: "Schedule Donation", component: ScheduleDonationPage },
    { path: "/history", name: "Donation History", component: DonationHistoryPage },
    { path: "/track", name: "Track Donation", component: DonationTrackingForm },
    { path: "/rewards", name: "Rewards" },
  ],
  Recipient: [
    { path: "/dashboard", name: "Dashboard" },
    { path: "/profile", name: "Profile" },
    { path: "/request", name: "Request Blood", component: BloodRequestForm },
    { path: "/search", name: "Search Blood" },
    { path: "/status", name: "Request Status" },
    { path: "/track", name: "Track Request", component: DonationTrackingForm },
  ],
  Hospital: [
    { path: "/dashboard", name: "Dashboard" },
    { path: "/manage", name: "Manage Donations" },
    { path: "/inventory", name: "Blood Inventory", component: BloodInventoryForm },
    { path: "/requests", name: "Blood Requests" },
    { path: "/track", name: "Track Units", component: DonationTrackingForm },
  ],
  Admin: [
    { path: "/dashboard", name: "Dashboard" },
    { path: "/users", name: "User Management", component: UserManagementForm },
    { path: "/inventory-admin", name: "System Inventory", component: BloodInventoryForm },
    { path: "/requests-admin", name: "All Requests" },
    { path: "/rewards-admin", name: "Rewards Setup" },
    { path: "/audit", name: "System Audit" },
    { path: "/track-admin", name: "Track All", component: DonationTrackingForm },
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
      {rolePages.map(({ path, name, component: Component }) => {
        // If a specific component is provided, use it; otherwise use the generic DashboardPage
        if (Component) {
          return (
            <Route
              key={`${baseRoutePath}${path}`}
              path={path}
              element={<Component />}
            />
          );
        } else {
          const pageTitle = `${role} - ${name}`;
          const pageDescription = `Content for ${pageTitle}.`;
          return (
            <Route
              key={`${baseRoutePath}${path}`}
              path={path}
              element={<DashboardPage title={pageTitle} description={pageDescription} />}
            />
          );
        }
      })}
      <Route path="*" element={<Navigate to={rolePages[0].path} replace />} />
    </Routes>
  );
};