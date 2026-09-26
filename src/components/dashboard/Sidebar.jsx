import React from "react";
import { LayoutDashboard, Sprout, TrendingUp, FlaskConical, User, LogOut } from "lucide-react";
import { tokens } from "../../styles/tokens";
import { NAV } from "../../data/mockData";
import Logo from "../shared/Logo";
import TerraceDivider from "../shared/TerraceDivider";

const ICONS = { LayoutDashboard, Sprout, TrendingUp, FlaskConical, User };

export default function Sidebar({ active, setActive, onLogout }) {
  return (
    <div style={{ width: 232, flexShrink: 0, background: tokens.bgAlt, borderRight: `1px solid ${tokens.line}`, padding: "22px 16px", display: "flex", flexDirection: "column" }}>
      <div style={{ padding: "0 6px", marginBottom: 30 }}><Logo size={32} /></div>
      <div style={{ flex: 1 }}>
        {NAV.map((n) => {
          const Icon = ICONS[n.icon];
          return (
            <button
              key={n.id}
              onClick={() => setActive(n.id)}
              style={{
                width: "100%", display: "flex", alignItems: "center", gap: 11, padding: "10px 12px",
                marginBottom: 4, borderRadius: 9, border: "none", cursor: "pointer", textAlign: "left",
                background: active === n.id ? tokens.surfaceRaised : "transparent",
                borderLeft: active === n.id ? `2px solid ${tokens.gold}` : "2px solid transparent",
              }}
            >
              <Icon size={16} color={active === n.id ? tokens.goldText : tokens.muted} />
              <span style={{ fontSize: 13.5, fontWeight: 500, color: active === n.id ? tokens.cream : tokens.creamDim }}>{n.label}</span>
            </button>
          );
        })}
      </div>
      <TerraceDivider />
      <button
        onClick={onLogout}
        style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", background: "none", border: "none", cursor: "pointer", marginTop: 10 }}
      >
        <LogOut size={15} color={tokens.muted} />
        <span style={{ fontSize: 13, color: tokens.muted }}>Sign out</span>
      </button>
    </div>
  );
}
