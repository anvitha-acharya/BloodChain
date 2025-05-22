import React from "react";
import { Link } from "react-router-dom";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  primary?: boolean;
  outline?: boolean;
  to?: string;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  primary, 
  outline, 
  to, 
  ...props 
}) => {
  const baseStyle: React.CSSProperties = {
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

  if (to) {
    const { type, ...rest } = props;
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