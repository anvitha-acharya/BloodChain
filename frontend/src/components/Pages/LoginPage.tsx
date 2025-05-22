import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Card } from "../UI/Card";
import { Input } from "../UI/Input";
import { Select } from "../UI/Select";
import { Button } from "../UI/Button";

const roles = ["Donor", "Recipient", "Hospital", "Admin"];

interface LoginPageProps {
  onLogin: (role: string, email: string) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({ 
    email: "", 
    password: "", 
    role: "Donor" 
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(credentials.role, credentials.email);
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "var(--secondary)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "80px 20px 20px"
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
};