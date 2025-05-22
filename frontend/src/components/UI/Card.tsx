import React from "react";

interface CardProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export const Card: React.FC<CardProps> = ({ children, style = {} }) => {
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
};