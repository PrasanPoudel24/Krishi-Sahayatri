import React from "react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { tokens } from "../../styles/tokens";

export default function StatCard({ label, value, delta, up, icon: Icon }) {
  return (
    <div style={{ background: tokens.surface, border: `1px solid ${tokens.line}`, borderRadius: 12, padding: "18px 20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
        <span style={{ fontSize: 12.5, color: tokens.muted, fontWeight: 600 }}>{label}</span>
        <Icon size={16} color={tokens.gold} />
      </div>
      <div style={{ fontFamily: "'Fraunces', serif", fontSize: 26, fontWeight: 600, color: tokens.cream, marginBottom: 6 }}>{value}</div>
      <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, color: up ? tokens.sage : tokens.rustText, fontWeight: 600 }}>
        {up ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />} {delta}
      </div>
    </div>
  );
}
