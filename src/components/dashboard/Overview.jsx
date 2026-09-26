import React from "react";
import { LayoutDashboard, TrendingUp, CloudRain, Droplets, Sprout, FlaskConical } from "lucide-react";
import {
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  PieChart, Pie, Cell
} from "recharts";
import { tokens } from "../../styles/tokens";
import { yieldTrend, cropDist, recentPredictions } from "../../data/mockData";
import StatCard from "./StatCard";

export default function Overview() {
  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 22 }}>
        <StatCard label="Predictions run" value="1,284" delta="12% this month" up icon={LayoutDashboard} />
        <StatCard label="Avg yield forecast" value="3.6 t/ha" delta="0.4 t/ha" up icon={TrendingUp} />
        <StatCard label="Rainfall (7d)" value="42 mm" delta="8mm below normal" up={false} icon={CloudRain} />
        <StatCard label="Soil moisture" value="61%" delta="steady" up icon={Droplets} />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 14, marginBottom: 14 }}>
        <div style={{ background: tokens.surface, border: `1px solid ${tokens.line}`, borderRadius: 14, padding: "20px 22px" }}>
          <div style={{ fontSize: 13.5, fontWeight: 600, color: tokens.cream, marginBottom: 16 }}>Yield trend (t/ha)</div>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={yieldTrend}>
              <CartesianGrid stroke={tokens.lineSoft} vertical={false} />
              <XAxis dataKey="m" tick={{ fill: tokens.muted, fontSize: 11 }} axisLine={{ stroke: tokens.line }} tickLine={false} />
              <YAxis tick={{ fill: tokens.muted, fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: tokens.surfaceRaised, border: `1px solid ${tokens.line}`, borderRadius: 8, fontSize: 12 }} labelStyle={{ color: tokens.cream }} />
              <Line type="monotone" dataKey="yield" stroke={tokens.gold} strokeWidth={2.5} dot={{ r: 3, fill: tokens.gold }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div style={{ background: tokens.surface, border: `1px solid ${tokens.line}`, borderRadius: 14, padding: "20px 22px" }}>
          <div style={{ fontSize: 13.5, fontWeight: 600, color: tokens.cream, marginBottom: 16 }}>Crop distribution</div>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie data={cropDist} dataKey="value" nameKey="name" innerRadius={42} outerRadius={64} paddingAngle={3}>
                {cropDist.map((c, i) => <Cell key={i} fill={c.color} stroke={tokens.surface} strokeWidth={2} />)}
              </Pie>
              <Tooltip contentStyle={{ background: tokens.surfaceRaised, border: `1px solid ${tokens.line}`, borderRadius: 8, fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px 14px", marginTop: 6 }}>
            {cropDist.map((c, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11.5, color: tokens.creamDim }}>
                <div style={{ width: 8, height: 8, borderRadius: 2, background: c.color }} /> {c.name}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div style={{ background: tokens.surface, border: `1px solid ${tokens.line}`, borderRadius: 14, padding: "20px 22px" }}>
        <div style={{ fontSize: 13.5, fontWeight: 600, color: tokens.cream, marginBottom: 14 }}>Recent predictions</div>
        {recentPredictions.map((p) => (
          <div key={p.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 0", borderTop: `1px solid ${tokens.lineSoft}` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 30, height: 30, borderRadius: 8, background: tokens.bgAlt, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                {p.type === "Crop" ? <Sprout size={14} color={tokens.gold} /> : p.type === "Yield" ? <TrendingUp size={14} color={tokens.sage} /> : <FlaskConical size={14} color={tokens.rustText} />}
              </div>
              <div>
                <div style={{ fontSize: 13, color: tokens.cream, fontWeight: 500 }}>{p.type} · <span style={{ color: tokens.goldText }}>{p.result}</span></div>
                <div style={{ fontSize: 11.5, color: tokens.muted, fontFamily: "'IBM Plex Mono', monospace" }}>{p.input}</div>
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 12, color: tokens.sage, fontFamily: "'IBM Plex Mono', monospace" }}>{p.conf}%</div>
              <div style={{ fontSize: 11, color: tokens.muted }}>{p.time}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
