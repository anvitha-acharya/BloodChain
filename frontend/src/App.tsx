import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useLocation } from "react-router-dom";

// User roles
const roles = ["Donor", "Recipient", "Hospital", "Admin"];

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

// UI Components
const Button = ({ children, primary, outline, ...props }) => {
  const baseStyle = {
    padding: "10px 24px",
    borderRadius: "8px",
    fontWeight: "600",
    cursor: "pointer",
    border: outline ? "2px solid var(--primary)" : "none",
    background: primary ? "var(--primary)" : outline ? "transparent" : "#f8f8f8",
    color: primary ? "white" : outline ? "var(--primary)" : "#333",
    transition: "all 0.2s ease",
    fontSize: "16px",
    display: "inline-block",
    textDecoration: "none"
  };

  if (props.to) {
    const { type, to, ...rest } = props; // Ensure 'type' is not passed to Link
    return (
      <Link style={baseStyle} to={to} {...rest}>
        {children}
      </Link>
    );
  }
  return (
    <button style={baseStyle} {...props}>
      {children}
    </button>
  );
};

// Navbar Component
function Navbar({ role, onRoleChange, isLoggedIn, onLogout }) {
  const location = useLocation();
  const isLandingPage = location.pathname === "/";
  const isAuthPage = ["/login", "/register"].includes(location.pathname);

  return (
    <nav className="navbar" style={{
      padding: "1rem 2rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      background: isLandingPage ? "transparent" : "#fffbe6",
      borderBottom: isLandingPage ? "none" : "2px solid var(--primary)",
      position: isLandingPage ? "absolute" : "relative",
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000
    }}>
      <Link to="/" style={{
        fontWeight: 'bold',
        fontSize: 24,
        color: isLandingPage ? '#fff' : 'var(--primary)',
        textDecoration: 'none'
      }}>
        BloodChain
      </Link>

      {!isAuthPage && !isLandingPage && isLoggedIn && (
        <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
          <span style={{marginRight: 8, color: '#666'}}>Role: {role}</span>
          <select
            value={role}
            onChange={(e) => onRoleChange(e.target.value)}
            style={{
              padding: "5px 16px",
              borderRadius: 8,
              background: '#fff',
              border: '1px solid var(--primary)',
              color: '#222'
            }}
          >
            {roles.map((r) => (
              <option value={r} key={r}>{r}</option>
            ))}
          </select>
          <Button outline onClick={onLogout}>Logout</Button>
        </div>
      )}

      {isLandingPage && !isLoggedIn && (
        <div style={{display: 'flex', gap: '12px'}}>
          <Button to="/login" outline>Login</Button>
          <Button to="/register" primary>Sign Up</Button>
        </div>
      )}
       {isLoggedIn && isLandingPage && (
         <Button primary onClick={onLogout}>Logout</Button>
       )}

      {isAuthPage && (
        <div>
          <Button to="/" outline>Back to Home</Button>
        </div>
      )}
    </nav>
  );
}

// Sidebar Component
function Sidebar({ role }) {
  return (
    <aside className="sidebar" style={{
      width: 220,
      padding: 30,
      minHeight: 'calc(100vh - 70px)', // Adjusted for navbar height
      background: '#fffbe6',
      borderRight: '1px solid rgba(237,84,51,0.1)'
    }}>
      <nav>
        {pages[role].map(({ path, name }) => (
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
}

// Card Component
function Card({ children, style = {} }) {
  return (
    <div
      className="card"
      style={{
        background: "#fff",
        borderRadius: "16px",
        boxShadow: "0 2px 12px 0 rgba(237,84,51,0.08)",
        padding: "2.5rem 2rem",
        margin: "1rem auto",
        maxWidth: 600,
        ...style
      }}
    >
      {children}
    </div>
  );
}

// Input Component
function Input({ label, ...props }) {
  return (
    <div style={{ marginBottom: "18px" }}>
      {label && (
        <label
          style={{
            display: "block",
            marginBottom: "6px",
            fontWeight: "500",
            color: "#555"
          }}
        >
          {label}
        </label>
      )}
      <input
        style={{
          width: "100%",
          padding: "12px 16px",
          borderRadius: "8px",
          border: "1px solid #ddd",
          fontSize: "16px",
          outline: "none",
          boxSizing: "border-box",
          transition: "border 0.2s ease-in-out", // Added ease
        }}
        onFocus={(e) => e.target.style.borderColor = "var(--primary)"}
        onBlur={(e) => e.target.style.borderColor = "#ddd"}
        {...props}
      />
    </div>
  );
}

// Select Component
function Select({ label, options, ...props }) {
  return (
    <div style={{ marginBottom: "18px" }}>
      {label && (
        <label
          style={{
            display: "block",
            marginBottom: "6px",
            fontWeight: "500",
            color: "#555"
          }}
        >
          {label}
        </label>
      )}
      <select
        style={{
          width: "100%",
          padding: "12px 16px",
          borderRadius: "8px",
          border: "1px solid #ddd",
          fontSize: "16px",
          outline: "none",
          background: "white",
          boxSizing: "border-box"
        }}
        {...props}
      >
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

// Landing Page Component
function LandingPage() {
  return (
    <div style={{
      minHeight: "100vh",
      background: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('https://images.unsplash.com/photo-1615461066841-6116e61058f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80')`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      color: "white",
      position: "relative", // For navbar positioning
      paddingTop: "70px" // Adjust if navbar height changes
    }}>
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "calc(100vh - 70px)", // Full height minus navbar
        textAlign: "center",
        padding: "0 20px"
      }}>
        <h1 style={{
          fontSize: "clamp(2.5rem, 6vw, 3.5rem)", // Responsive font size
          marginBottom: "1.5rem",
          fontWeight: "900"
        }}>
          BloodChain
        </h1>
        <p style={{
          fontSize: "clamp(1.1rem, 3vw, 1.5rem)", // Responsive font size
          marginBottom: "2.5rem",
          fontWeight: "300",
          letterSpacing: "0.5px",
          lineHeight: "1.6",
          maxWidth: "800px"
        }}>
          A blockchain-based blood donation tracking system ensuring secure, transparent, and tamper-proof management of blood supplies.
        </p>
        <div style={{ display: "flex", gap: "20px", justifyContent: "center", flexWrap: "wrap" }}>
          <Button to="/register" primary style={{ fontSize: "18px", padding: "14px 32px" }}>Get Started</Button>
          <Button to="/login" outline style={{ fontSize: "18px", padding: "14px 32px" }}>Sign In</Button>
        </div>

        <div style={{
          display: "flex",
          justifyContent: "space-around", // Better spacing for different screen sizes
          marginTop: "80px", // Adjusted margin
          textAlign: "center",
          width: "100%",
          maxWidth: "900px",
          flexWrap: "wrap", // Allow wrapping on smaller screens
          gap: "20px" // Gap between items when wrapped
        }}>
          {[
            {title: "100%", text: "Secure Blockchain Tracking"},
            {title: "24/7", text: "Real-time Information"},
            {title: "0%", text: "Data Tampering"}
          ].map(item => (
            <div key={item.title} style={{ flex: "1 1 200px" }}> {/* Flex basis for responsiveness */}
              <div style={{
                fontSize: "clamp(2rem, 5vw, 2.5rem)",
                color: "var(--primary)",
                fontWeight: "bold",
                marginBottom: "10px"
              }}>
                {item.title}
              </div>
              <div style={{ fontSize: "clamp(0.9rem, 2vw, 1.1rem)" }}>{item.text}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Login Page Component
function LoginPage({ onLogin }) {
  const [credentials, setCredentials] = useState({ email: "", password: "", role: "Donor" });
  // No local redirect state needed here, App component handles it

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(credentials.role, credentials.email); // Pass role and email (or other identifier)
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "var(--secondary)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "80px 20px 20px" // Adjusted padding for navbar
    }}>
      <Card style={{ maxWidth: "450px", width: "100%" }}>
        <h2 style={{
          color: "var(--primary)",
          marginBottom: "24px",
          textAlign: "center",
          fontSize: "28px"
        }}>
          Login to BloodChain
        </h2>

        <form onSubmit={handleSubmit}>
          <Input
            label="Email Address"
            type="email"
            name="email"
            placeholder="Enter your email"
            value={credentials.email}
            onChange={handleChange}
            required
          />
          <Input
            label="Password"
            type="password"
            name="password"
            placeholder="Enter your password"
            value={credentials.password}
            onChange={handleChange}
            required
          />
          <Select
            label="Role"
            name="role"
            value={credentials.role}
            onChange={handleChange}
            options={roles.map(role => ({ value: role, label: role }))}
          />
          <div style={{ marginTop: "30px" }}>
            <Button type="submit" primary style={{ width: "100%" }}>
              Login
            </Button>
          </div>
        </form>
        <div style={{ marginTop: "24px", textAlign: "center" }}>
          Don't have an account? <Link to="/register" style={{ color: "var(--primary)" }}>Sign up</Link>
        </div>
      </Card>
    </div>
  );
}

// Register Page Component
function RegisterPage({ onRegister }) {
  const [formData, setFormData] = useState({
    name: "", email: "", password: "", confirmPassword: "",
    role: "Donor", bloodGroup: "", hospital: ""
  });
  // No local redirect state needed here

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    onRegister(formData.role, formData.email); // Pass role and email
  };

  const bloodGroups = [
    { value: "", label: "Select Blood Group" }, { value: "A+", label: "A+" }, { value: "A-", label: "A-" },
    { value: "B+", label: "B+" }, { value: "B-", label: "B-" }, { value: "AB+", label: "AB+" },
    { value: "AB-", label: "AB-" }, { value: "O+", label: "O+" }, { value: "O-", label: "O-" }
  ];

  return (
    <div style={{
      minHeight: "100vh",
      background: "var(--secondary)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "80px 20px 20px"
    }}>
      <Card style={{ maxWidth: "500px", width: "100%" }}>
        <h2 style={{ color: "var(--primary)", marginBottom: "24px", textAlign: "center", fontSize: "28px" }}>
          Create an Account
        </h2>
        <form onSubmit={handleSubmit}>
          <Select label="Register As" name="role" value={formData.role} onChange={handleChange} options={roles.map(r => ({ value: r, label: r }))} />
          <Input label="Full Name" type="text" name="name" placeholder="Enter your full name" value={formData.name} onChange={handleChange} required />
          <Input label="Email Address" type="email" name="email" placeholder="Enter your email" value={formData.email} onChange={handleChange} required />
          {(formData.role === "Donor" || formData.role === "Recipient") && (
            <Select label="Blood Group" name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} options={bloodGroups} required />
          )}
          {formData.role === "Hospital" && (
            <Input label="Hospital Name" type="text" name="hospital" placeholder="Enter hospital name" value={formData.hospital} onChange={handleChange} required />
          )}
          <Input label="Password" type="password" name="password" placeholder="Create a password" value={formData.password} onChange={handleChange} required />
          <Input label="Confirm Password" type="password" name="confirmPassword" placeholder="Confirm your password" value={formData.confirmPassword} onChange={handleChange} required />
          <div style={{ marginTop: "30px" }}>
            <Button type="submit" primary style={{ width: "100%" }}>Register</Button>
          </div>
        </form>
        <div style={{ marginTop: "24px", textAlign: "center" }}>
          Already have an account? <Link to="/login" style={{ color: "var(--primary)" }}>Login</Link>
        </div>
      </Card>
    </div>
  );
}

// Placeholder Page Component for Dashboards
const DashboardPage = ({ title, description }) => (
  <Card>
    <h2 style={{ color: 'var(--primary)', marginBottom: 16 }}>{title}</h2>
    <p style={{ fontSize: 18 }}>{description}</p>
  </Card>
);

// Dynamically create routes for each role
const RoleRoutes = ({ role }) => {
  const baseRoutePath = `/${role.toLowerCase()}`;
  return (
    <Routes>
      {pages[role].map(({ path, name }) => {
        // For demonstration, using a generic DashboardPage
        // In a real app, each path would map to a specific component
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
      {/* Default redirect for the role's base path */}
      <Route path="*" element={<Navigate to={pages[role][0].path} replace />} />
    </Routes>
  );
};

// Main App Component
export default function App() {
  const [role, setRole] = useState(localStorage.getItem("userRole") || "Donor");
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("isLoggedIn") === "true");
  const [currentUser, setCurrentUser] = useState(localStorage.getItem("currentUser") || null);

  const handleLogin = (userRole, userIdentifier) => {
    setRole(userRole);
    setIsLoggedIn(true);
    setCurrentUser(userIdentifier); // Store email or unique ID
    localStorage.setItem("userRole", userRole);
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("currentUser", userIdentifier);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    localStorage.removeItem("userRole");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("currentUser");
    // Navigate to home after logout by default
  };

  // Base path for dashboard, depends on role
  const dashboardBasePath = isLoggedIn ? `/${role.toLowerCase()}` : "/";

  return (
    <Router>
      <Navbar role={role} onRoleChange={setRole} isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={isLoggedIn ? <Navigate to={dashboardBasePath} replace /> : <LoginPage onLogin={handleLogin} />} />
        <Route path="/register" element={isLoggedIn ? <Navigate to={dashboardBasePath} replace /> : <RegisterPage onRegister={handleLogin} />} />

        {isLoggedIn && (
          <Route
            path={`${dashboardBasePath}/*`}
            element={ (
              <div style={{ display: "flex", paddingTop: "70px" /* Account for fixed navbar */ }}>
                <Sidebar role={role} />
                <main style={{ flex: 1, padding: "20px 3vw" }}>
                  <RoleRoutes role={role} />
                </main>
              </div>
            )}
          />
        )}

        {/* Fallback for any other route when not logged in, redirect to login */}
        {!isLoggedIn && <Route path="*" element={<Navigate to="/login" replace />} />}
        {/* If logged in and an unknown route is hit, redirect to their dashboard home */}
        {isLoggedIn && <Route path="*" element={<Navigate to={dashboardBasePath} replace />} />}
      </Routes>
    </Router>
  );
}
