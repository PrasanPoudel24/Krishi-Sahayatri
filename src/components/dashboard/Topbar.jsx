import React from "react";
import { Search, Bell } from "lucide-react";
import { tokens } from "../../styles/tokens";
import { NAV } from "../../data/mockData";

export default function Topbar({ active, user, onProfileClick }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 26px", borderBottom: `1px solid ${tokens.line}` }}>
      <div>
        <div style={{ fontFamily: "'Fraunces', serif", fontSize: 19, fontWeight: 600, color: tokens.cream }}>
          {NAV.find((n) => n.id === active)?.label}
        </div>
        <div style={{ fontSize: 12, color: tokens.muted, marginTop: 2 }}>
          Kathmandu · {new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, background: tokens.surface, border: `1px solid ${tokens.line}`, borderRadius: 9, padding: "8px 12px" }}>
          <Search size={14} color={tokens.muted} />
          <span style={{ fontSize: 12.5, color: tokens.muted }}>Search predictions</span>
        </div>
        <div style={{ width: 34, height: 34, borderRadius: 9, background: tokens.surface, border: `1px solid ${tokens.line}`, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
          <Bell size={15} color={tokens.creamDim} />
          <div style={{ position: "absolute", top: 7, right: 7, width: 6, height: 6, borderRadius: "50%", background: tokens.rust }} />
        </div>
        <button
          onClick={onProfileClick}
          style={{ width: 34, height: 34, borderRadius: 9, background: `linear-gradient(160deg, ${tokens.sage}, ${tokens.sageDim})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12.5, fontWeight: 700, color: tokens.bg, border: "none", cursor: "pointer" }}
        >
          {user.username.slice(0, 2).toUpperCase()}
        </button>
      </div>
    </div>
  );
}
