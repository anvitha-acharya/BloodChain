import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Input: React.FC<InputProps> = ({ label, ...props }) => {
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
          transition: "border 0.2s ease-in-out",
        }}
        onFocus={(e) => e.target.style.borderColor = "var(--primary)"}
        onBlur={(e) => e.target.style.borderColor = "#ddd"}
        {...props}
      />
    </div>
  );
};