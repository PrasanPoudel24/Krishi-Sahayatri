import React, { useState } from "react";
import { tokens, FONT_IMPORT } from "../../styles/tokens";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import Overview from "./Overview";
import PredictForm from "./PredictForm";
import Profile from "./Profile";

export default function Dashboard({ user, onLogout }) {
  const [active, setActive] = useState("overview");

  return (
    <div style={{ minHeight: 640, display: "flex", background: tokens.bg, borderRadius: 16, overflow: "hidden", fontFamily: "Inter, sans-serif" }}>
      <style>{FONT_IMPORT}</style>
      <Sidebar active={active} setActive={setActive} onLogout={onLogout} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <Topbar active={active} user={user} onProfileClick={() => setActive("profile")} />
        <div style={{ padding: "24px 26px", maxWidth: 980 }}>
          {active === "overview" && <Overview />}
          {active === "crop" && <PredictForm kind="crop" />}
          {active === "yield" && <PredictForm kind="yield" />}
          {active === "fertilizer" && <PredictForm kind="fertilizer" />}
          {active === "profile" && <Profile user={user} />}
        </div>
      </div>
    </div>
  );
}
