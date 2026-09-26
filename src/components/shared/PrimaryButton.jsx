import React from "react";
import { tokens } from "../../styles/tokens";

export default function PrimaryButton({ children, onClick, full = true, type = "button" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      style={{
        width: full ? "100%" : "auto",
        background: tokens.gold, color: "#241B06", border: "none",
        borderRadius: 10, padding: "13px 20px", fontSize: 14.5, fontWeight: 700,
        fontFamily: "Inter, sans-serif", cursor: "pointer",
        display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
      }}
    >
      {children}
    </button>
  );
}
