import React, { useState } from "react";
import { tokens } from "../../styles/tokens";
import { PREDICT_CONFIG } from "../../data/mockData";

export default function PredictForm({ kind }) {
  const config = PREDICT_CONFIG[kind];
  const [vals, setVals] = useState(Object.fromEntries(config.fields.map(([l, d]) => [l, d])));
  const [result, setResult] = useState(null);

  return (
    <div style={{ background: tokens.surface, border: `1px solid ${tokens.line}`, borderRadius: 14, padding: 26 }}>
      <div style={{ fontFamily: "'Fraunces', serif", fontSize: 19, fontWeight: 600, color: tokens.cream, marginBottom: 4 }}>{config.title}</div>
      <div style={{ fontSize: 13, color: tokens.muted, marginBottom: 22 }}>{config.desc}</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 16px" }}>
        {config.fields.map(([label]) => (
          <div key={label} style={{ marginBottom: 14 }}>
            <label style={{ display: "block", fontSize: 12, color: tokens.muted, marginBottom: 6, fontWeight: 600 }}>{label}</label>
            <input
              value={vals[label]}
              onChange={(e) => setVals({ ...vals, [label]: e.target.value })}
              style={{ width: "100%", background: tokens.bgAlt, border: `1px solid ${tokens.line}`, borderRadius: 8, padding: "10px 12px", color: tokens.cream, fontSize: 13.5, fontFamily: "'IBM Plex Mono', monospace", outline: "none", boxSizing: "border-box" }}
            />
          </div>
        ))}
      </div>
      <button
        onClick={() => setResult(config)}
        style={{ marginTop: 8, background: tokens.gold, color: "#241B06", border: "none", borderRadius: 9, padding: "11px 20px", fontSize: 13.5, fontWeight: 700, cursor: "pointer", fontFamily: "Inter, sans-serif" }}
      >
        Run prediction
      </button>

      {result && (
        <div style={{ marginTop: 22, paddingTop: 20, borderTop: `1px dashed ${tokens.line}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <div style={{ fontSize: 12, color: tokens.muted, fontWeight: 600, marginBottom: 4 }}>{result.resultLabel}</div>
            <div style={{ fontFamily: "'Fraunces', serif", fontSize: 22, fontWeight: 600, color: tokens.goldText }}>{result.resultValue}</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 11, color: tokens.muted, fontWeight: 600 }}>Confidence</div>
            <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 18, color: tokens.sage }}>{result.conf}%</div>
          </div>
        </div>
      )}
    </div>
  );
}
