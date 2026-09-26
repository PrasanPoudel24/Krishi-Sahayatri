import React from "react";
import { Sprout, TrendingUp, FlaskConical } from "lucide-react";
import { tokens, FONT_IMPORT } from "../../styles/tokens";
import Logo from "../shared/Logo";
import farmer from "../../assets/farmer.png"
import TerraceDivider from "../shared/TerraceDivider";

export default function AuthShell({ children }) {
  return (
    <div  style={{ minHeight: 640, display: "flex", background: tokens.bg, borderRadius: 16, overflow: "hidden", fontFamily: "Inter, sans-serif" }} > 
      <style>{FONT_IMPORT}</style>
      <div
        style={{
          flex: "0 0 42%", background: tokens.bgAlt, position: "relative",
          padding: "40px 36px", display: "flex", flexDirection: "column", justifyContent: "space-between",
          borderRight: `1px solid ${tokens.line}`,
          backgroundImage: `linear-gradient(135deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.7) 100%), url(${farmer})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Logo size={38} />
        
        <TerraceDivider />
      </div>
      <div style={{ flex: 1, padding: "48px 56px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <div style={{ maxWidth: 380, width: "100%", margin: "0 auto" }}>{children}</div>
      </div>
    </div>
  );
}
