import React from "react";
import { Link } from "react-router-dom";

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

interface SidebarProps {
  role: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ role }) => {
  return (
    <aside className="sidebar" style={{
      width: 220,
      padding: 30,
      minHeight: 'calc(100vh - 70px)',
      background: '#fffbe6',
      borderRight: '1px solid rgba(237,84,51,0.1)',
      position: 'sticky',
      top: '70px',
      alignSelf: 'flex-start'
    }}>
      <nav>
        {pages[role as keyof typeof pages].map(({ path, name }) => (
          <Link
            key={path}
            to={`/${role.toLowerCase()}${path}`}
            style={{
              display: 'block',
              margin: '14px 0',
              fontWeight: 500,
              color: 'var(--primary)',
              textDecoration: 'none',
              padding: '8px 0',
              borderBottom: '1px solid rgba(237,84,51,0.05)'
            }}
          >
            {name}
          </Link>
        ))}
      </nav>
    </aside>
  );
};