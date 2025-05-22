import React from "react";
import { Button } from "../UI/Button";

export const LandingPage: React.FC = () => {
  return (
    <div style={{
      minHeight: "100vh",
      background: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('https://images.unsplash.com/photo-1615461066841-6116e61058f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80')`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      color: "white",
      position: "relative",
      paddingTop: "70px"
    }}>
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "calc(100vh - 70px)",
        textAlign: "center",
        padding: "0 20px"
      }}>
        <h1 style={{
          fontSize: "clamp(2.5rem, 6vw, 3.5rem)",
          marginBottom: "1.5rem",
          fontWeight: "900"
        }}>
          BloodChain
        </h1>
        <p style={{
          fontSize: "clamp(1.1rem, 3vw, 1.5rem)",
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
          justifyContent: "space-around",
          marginTop: "80px",
          textAlign: "center",
          width: "100%",
          maxWidth: "900px",
          flexWrap: "wrap",
          gap: "20px"
        }}>
          {[
            {title: "100%", text: "Secure Blockchain Tracking"},
            {title: "24/7", text: "Real-time Information"},
            {title: "0%", text: "Data Tampering"}
          ].map(item => (
            <div key={item.title} style={{ flex: "1 1 200px" }}>
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
};