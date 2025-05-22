import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Card } from "../UI/Card";
import { Input } from "../UI/Input";
import { Select } from "../UI/Select";
import { Button } from "../UI/Button";

const roles = ["Donor", "Recipient", "Hospital", "Admin"];

interface RegisterPageProps {
  onRegister: (role: string, email: string) => void;
}

export const RegisterPage: React.FC<RegisterPageProps> = ({ onRegister }) => {
  const [formData, setFormData] = useState({
    name: "", 
    email: "", 
    password: "", 
    confirmPassword: "",
    role: "Donor", 
    bloodGroup: "", 
    hospital: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    onRegister(formData.role, formData.email);
  };

  const bloodGroups = [
    { value: "", label: "Select Blood Group" }, 
    { value: "A+", label: "A+" }, 
    { value: "A-", label: "A-" },
    { value: "B+", label: "B+" }, 
    { value: "B-", label: "B-" }, 
    { value: "AB+", label: "AB+" },
    { value: "AB-", label: "AB-" }, 
    { value: "O+", label: "O+" }, 
    { value: "O-", label: "O-" }
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
        <h2 style={{ 
          color: "var(--primary)", 
          marginBottom: "24px", 
          textAlign: "center", 
          fontSize: "28px" 
        }}>
          Create an Account
        </h2>
        <form onSubmit={handleSubmit}>
          <Select 
            label="Register As" 
            name="role" 
            value={formData.role} 
            onChange={handleChange} 
            options={roles.map(r => ({ value: r, label: r }))} 
          />
          <Input 
            label="Full Name" 
            type="text" 
            name="name" 
            placeholder="Enter your full name" 
            value={formData.name} 
            onChange={handleChange} 
            required 
          />
          <Input 
            label="Email Address" 
            type="email" 
            name="email" 
            placeholder="Enter your email" 
            value={formData.email} 
            onChange={handleChange} 
            required 
          />
          {(formData.role === "Donor" || formData.role === "Recipient") && (
            <Select 
              label="Blood Group" 
              name="bloodGroup" 
              value={formData.bloodGroup} 
              onChange={handleChange} 
              options={bloodGroups} 
              required 
            />
          )}
          {formData.role === "Hospital" && (
            <Input 
              label="Hospital Name" 
              type="text" 
              name="hospital" 
              placeholder="Enter hospital name" 
              value={formData.hospital} 
              onChange={handleChange} 
              required 
            />
          )}
          <Input 
            label="Password" 
            type="password" 
            name="password" 
            placeholder="Create a password" 
            value={formData.password} 
            onChange={handleChange} 
            required 
          />
          <Input 
            label="Confirm Password" 
            type="password" 
            name="confirmPassword" 
            placeholder="Confirm your password" 
            value={formData.confirmPassword} 
            onChange={handleChange} 
            required 
          />
          <div style={{ marginTop: "30px" }}>
            <Button type="submit" primary style={{ width: "100%" }}>
              Register
            </Button>
          </div>
        </form>
        <div style={{ marginTop: "24px", textAlign: "center" }}>
          Already have an account? <Link to="/login" style={{ color: "var(--primary)" }}>Login</Link>
        </div>
      </Card>
    </div>
  );
};