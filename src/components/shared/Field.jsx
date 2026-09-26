import React from "react";
import { tokens } from "../../styles/tokens";

export default function Field({ label, icon: Icon, type = "text", value, onChange, onBlur, placeholder, error, hint, rightSlot }) {
  return (
    <div style={{ marginBottom: 18 }}>
      <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: tokens.creamDim, marginBottom: 7, fontFamily: "Inter, sans-serif" }}>
        {label}
      </label>
      <div
        style={{
          display: "flex", alignItems: "center", gap: 10,
          background: tokens.bgAlt, border: `1px solid ${error ? tokens.rust : tokens.line}`,
          borderRadius: 10, padding: "12px 14px",
        }}
      >
        {Icon && <Icon size={16} color={tokens.muted} strokeWidth={2} />}
        <input
          type={type}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          style={{
            flex: 1, background: "transparent", border: "none", outline: "none",
            color: tokens.cream, fontSize: 14, fontFamily: "Inter, sans-serif",
          }}
        />
        {rightSlot}
      </div>
      {error ? (
        <div style={{ fontSize: 12, color: tokens.rustText, marginTop: 6, fontFamily: "Inter, sans-serif" }}>{error}</div>
      ) : hint ? (
        <div style={{ fontSize: 12, color: tokens.muted, marginTop: 6, fontFamily: "Inter, sans-serif" }}>{hint}</div>
      ) : null}
    </div>
  );
}
