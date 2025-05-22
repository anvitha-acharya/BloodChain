import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Component imports
import { Navbar } from "./components/Layout/Navbar";
import { Sidebar } from "./components/Layout/Sidebar";
import { LandingPage } from "./components/Pages/LandingPage";
import { LoginPage } from "./components/Pages/LoginPage";
import { RegisterPage } from "./components/Pages/RegisterPage";
import { RoleRoutes } from "./components/Routes/RoleRoutes";

export default function App() {
  const [role, setRole] = useState(localStorage.getItem("userRole") || "Donor");
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("isLoggedIn") === "true");
  const [currentUser, setCurrentUser] = useState(localStorage.getItem("currentUser") || null);

  const handleLogin = (userRole: string, userIdentifier: string) => {
    setRole(userRole);
    setIsLoggedIn(true);
    setCurrentUser(userIdentifier);
    localStorage.setItem("userRole", userRole);
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("currentUser", userIdentifier);
    // Force navigation to dashboard after login
    window.location.href = `/${userRole.toLowerCase()}/dashboard`;
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    localStorage.removeItem("userRole");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("currentUser");
    // Navigate to home after logout
    window.location.href = "/";
  };

  const dashboardBasePath = isLoggedIn ? `/${role.toLowerCase()}` : "/";

  return (
    <Router>
      <Navbar role={role} onRoleChange={setRole} isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route 
          path="/login" 
          element={
            isLoggedIn ? 
            <Navigate to={dashboardBasePath} replace /> : 
            <LoginPage onLogin={handleLogin} />
          } 
        />
        <Route 
          path="/register" 
          element={
            isLoggedIn ? 
            <Navigate to={dashboardBasePath} replace /> : 
            <RegisterPage onRegister={handleLogin} />
          } 
        />

        {isLoggedIn && (
          <>
            <Route
              path={`${dashboardBasePath}/*`}
              element={
                <div style={{ display: "flex", paddingTop: "70px" }}>
                  <Sidebar role={role} />
                  <main style={{ flex: 1, padding: "20px 3vw" }}>
                    <RoleRoutes role={role} />
                  </main>
                </div>
              }
            />
            {/* Redirect from /dashboard to role-specific dashboard */}
            <Route 
              path="/dashboard" 
              element={<Navigate to={`/${role.toLowerCase()}/dashboard`} replace />} 
            />
          </>
        )}

        {!isLoggedIn && <Route path="*" element={<Navigate to="/login" replace />} />}
        {isLoggedIn && <Route path="*" element={<Navigate to={dashboardBasePath} replace />} />}
      </Routes>
    </Router>
  );
}