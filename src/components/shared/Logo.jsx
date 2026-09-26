import React from "react";
import { Sprout } from "lucide-react";
import { tokens } from "../../styles/tokens";

export default function Logo({ size = 34 }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <div
        style={{
          width: size, height: size, borderRadius: 9,
          background: `linear-gradient(160deg, ${tokens.sage}, ${tokens.sageDim})`,
          display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
        }}
      >
        <Sprout size={size * 0.56} color={tokens.bg} strokeWidth={2.4} />
      </div>
      <div style={{ lineHeight: 1.05 }}>
        <div style={{ fontFamily: "'Noto Sans Devanagari', sans-serif", fontWeight: 700, fontSize: 17, color: tokens.cream }}>
          किषान सहयात्री
        </div>
        <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, letterSpacing: "0.12em", color: tokens.kishan, textTransform: "uppercase" }}>
          Kishan Sahayatri
        </div>
      </div>
    </div>
  );
}
