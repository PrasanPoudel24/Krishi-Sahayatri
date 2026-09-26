import React, { useState } from "react";
import { Pencil, Check, X } from "lucide-react";
import { tokens } from "../../styles/tokens";
import { validateUsername, validateEmail } from "../../utils/validators";

function ProfileRow({ label, value, editing, onChange, error }) {
  return (
    <div style={{ padding: "14px 0", borderTop: `1px solid ${tokens.lineSoft}` }}>
      <div style={{ fontSize: 12, color: tokens.muted, fontWeight: 600, marginBottom: 6 }}>{label}</div>
      {editing ? (
        <div>
          <input
            value={value}
            onChange={onChange}
            style={{ width: "100%", background: tokens.bgAlt, border: `1px solid ${error ? tokens.rust : tokens.line}`, borderRadius: 8, padding: "9px 12px", color: tokens.cream, fontSize: 13.5, fontFamily: "Inter, sans-serif", outline: "none", boxSizing: "border-box" }}
          />
          {error && <div style={{ fontSize: 11.5, color: tokens.rustText, marginTop: 5 }}>{error}</div>}
        </div>
      ) : (
        <div style={{ fontSize: 14, color: tokens.cream }}>{value}</div>
      )}
    </div>
  );
}

export default function Profile({ user }) {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: user.name, username: user.username, email: user.email, district: user.district });
  const [errors, setErrors] = useState({});

  const save = () => {
    const e = {
      username: validateUsername(form.username),
      email: validateEmail(form.email),
      name: !form.name ? "Enter your full name" : "",
    };
    setErrors(e);
    if (Object.values(e).every((m) => !m)) setEditing(false);
  };

  return (
    <div style={{ maxWidth: 520 }}>
      <div style={{ background: tokens.surface, border: `1px solid ${tokens.line}`, borderRadius: 14, padding: 26 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ width: 52, height: 52, borderRadius: 12, background: `linear-gradient(160deg, ${tokens.sage}, ${tokens.sageDim})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, fontWeight: 700, color: tokens.bg, fontFamily: "'Fraunces', serif" }}>
              {form.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase() || "U"}
            </div>
            <div>
              <div style={{ fontFamily: "'Fraunces', serif", fontSize: 19, fontWeight: 600, color: tokens.cream }}>{form.name}</div>
              <div style={{ fontSize: 12.5, color: tokens.muted, fontFamily: "'IBM Plex Mono', monospace" }}>@{form.username}</div>
            </div>
          </div>
          {editing ? (
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={save} style={{ width: 32, height: 32, borderRadius: 8, background: tokens.gold, border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                <Check size={15} color="#241B06" />
              </button>
              <button onClick={() => { setEditing(false); setErrors({}); }} style={{ width: 32, height: 32, borderRadius: 8, background: tokens.surfaceRaised, border: `1px solid ${tokens.line}`, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                <X size={15} color={tokens.creamDim} />
              </button>
            </div>
          ) : (
            <button onClick={() => setEditing(true)} style={{ display: "flex", alignItems: "center", gap: 6, background: tokens.surfaceRaised, border: `1px solid ${tokens.line}`, borderRadius: 8, padding: "8px 12px", cursor: "pointer" }}>
              <Pencil size={13} color={tokens.creamDim} />
              <span style={{ fontSize: 12.5, color: tokens.creamDim }}>Edit profile</span>
            </button>
          )}
        </div>

        <ProfileRow label="Full name" value={form.name} editing={editing} onChange={(e) => setForm({ ...form, name: e.target.value })} error={errors.name} />
        <ProfileRow label="Username" value={form.username} editing={editing} onChange={(e) => setForm({ ...form, username: e.target.value })} error={errors.username} />
        <ProfileRow label="Email" value={form.email} editing={editing} onChange={(e) => setForm({ ...form, email: e.target.value })} error={errors.email} />
        
      </div>

      <div style={{ background: tokens.surface, border: `1px solid ${tokens.line}`, borderRadius: 14, padding: 22, marginTop: 14 }}>
        <div style={{ fontSize: 13.5, fontWeight: 600, color: tokens.cream, marginBottom: 14 }}>Activity</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
          <div>
            <div style={{ fontFamily: "'Fraunces', serif", fontSize: 20, fontWeight: 600, color: tokens.goldText }}>1,284</div>
            <div style={{ fontSize: 11.5, color: tokens.muted }}>Predictions run</div>
          </div>
          <div>
            <div style={{ fontFamily: "'Fraunces', serif", fontSize: 20, fontWeight: 600, color: tokens.goldText }}>4</div>
            <div style={{ fontSize: 11.5, color: tokens.muted }}>Crops tracked</div>
          </div>
          <div>
            <div style={{ fontFamily: "'Fraunces', serif", fontSize: 20, fontWeight: 600, color: tokens.goldText }}>Aug 2025</div>
            <div style={{ fontSize: 11.5, color: tokens.muted }}>Member since</div>
          </div>
        </div>
      </div>
    </div>
  );
}
