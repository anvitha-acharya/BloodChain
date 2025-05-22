import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "../UI/Button";

const roles = ["Donor", "Recipient", "Hospital", "Admin"];

interface NavbarProps {
  role: string;
  onRoleChange: (role: string) => void;
  isLoggedIn: boolean;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  role, 
  onRoleChange, 
  isLoggedIn, 
  onLogout 
}) => {
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
      position: isLandingPage ? "absolute" : "fixed",
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
};