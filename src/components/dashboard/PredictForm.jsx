import React, { useMemo, useState } from "react";
import { tokens } from "../../styles/tokens";
import { PREDICT_CONFIG } from "../../data/mockData";
import { createCropPrediction, createYieldPrediction } from "../../api/client";

export default function PredictForm({ kind }) {
  const config = PREDICT_CONFIG[kind];
  const [vals, setVals] = useState(() => Object.fromEntries(config.fields.map(([l, d]) => [l, d])));
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const payload = useMemo(() => {
    if (kind === "crop") {
      return {
        N: Number(vals["Nitrogen (N)"] || 0),
        P: Number(vals["Phosphorus (P)"] || 0),
        K: Number(vals["Potassium (K)"] || 0),
        temperature: Number(vals["Temperature (°C)"] || 0),
        humidity: Number(vals["Humidity (%)"] || 0),
        ph: Number(vals["Soil pH"] || 0),
        rainfall: Number(vals["Rainfall (mm)"] || 0),
      };
    }

    if (kind === "yield") {
      return {
        Area: vals["Area"] || "",
        Item: vals["Item"] || "",
        average_rain_fall_mm_per_year: Number(vals["Average rainfall (mm)"] || 0),
        pesticides_tonnes: Number(vals["Pesticides used (kg/ha)"] || 0),
        avg_temp: Number(vals["Temperature (°C)"] || 0),
      };
    }

    return {};
  }, [kind, vals]);

  const handleSubmit = async () => {
    if (kind === "fertilizer") {
      setError("Fertilizer prediction is not available because no fertilizer ML API is configured.");
      setResult(null);
      return;
    }

    try {
      setSubmitting(true);
      setError("");

      const response =
        kind === "crop"
          ? await createCropPrediction(payload)
          : await createYieldPrediction(payload);

      const modelResult = response.result || {};
      setResult({
        resultLabel: kind === "crop" ? "Recommended crop" : "Estimated yield",
        resultValue: kind === "crop" ? modelResult.recommended_crop : `${modelResult.predicted_yield_kg_per_ha} kg/ha`,
        conf: kind === "crop" ? `${(modelResult.confidence * 100).toFixed(1)}%` : "--",
      });
    } catch (err) {
      setError(err.message || "Prediction failed");
      setResult(null);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ background: tokens.surface, border: `1px solid ${tokens.line}`, borderRadius: 14, padding: 26 }}>
      <div style={{ fontFamily: "'Fraunces', serif", fontSize: 19, fontWeight: 600, color: tokens.cream, marginBottom: 4 }}>{config.title}</div>
      <div style={{ fontSize: 13, color: tokens.muted, marginBottom: 22 }}>{config.desc}</div>
      {error && (
        <div style={{ marginBottom: 12, background: "rgba(255,96,96,0.1)", border: "1px solid rgba(255,96,96,0.35)", borderRadius: 8, padding: "8px 10px", color: "#ffb3b3", fontSize: 12.5 }}>
          {error}
        </div>
      )}
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
        onClick={handleSubmit}
        disabled={submitting}
        style={{ marginTop: 8, background: tokens.gold, color: "#241B06", border: "none", borderRadius: 9, padding: "11px 20px", fontSize: 13.5, fontWeight: 700, cursor: submitting ? "wait" : "pointer", fontFamily: "Inter, sans-serif", opacity: submitting ? 0.7 : 1 }}
      >
        {submitting ? "Running..." : "Run prediction"}
      </button>

      {result && (
        <div style={{ marginTop: 22, paddingTop: 20, borderTop: `1px dashed ${tokens.line}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <div style={{ fontSize: 12, color: tokens.muted, fontWeight: 600, marginBottom: 4 }}>{result.resultLabel}</div>
            <div style={{ fontFamily: "'Fraunces', serif", fontSize: 22, fontWeight: 600, color: tokens.goldText }}>{result.resultValue}</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 11, color: tokens.muted, fontWeight: 600 }}>Confidence</div>
            <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 18, color: tokens.sage }}>{result.conf}</div>
          </div>
        </div>
      )}
    </div>
  );
}
