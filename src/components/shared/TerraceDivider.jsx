import React from "react";
import { tokens } from "../../styles/tokens";

export default function TerraceDivider({ flip }) {
  return (
    <svg
      viewBox="0 0 400 24"
      preserveAspectRatio="none"
      style={{ width: "100%", height: 20, display: "block", transform: flip ? "scaleY(-1)" : "none" }}
    >
      <polyline
        points="0,24 0,16 50,16 50,10 100,10 100,4 150,4 150,14 200,14 200,6 250,6 250,18 300,18 300,8 350,8 350,20 400,20 400,24"
        fill="none"
        stroke={tokens.line}
        strokeWidth="1.5"
      />
    </svg>
  );
}
