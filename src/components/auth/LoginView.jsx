import React, { useState } from "react";
import { AtSign, Lock, Eye, EyeOff, ChevronRight } from "lucide-react";
import { tokens } from "../../styles/tokens";
import { validateUsername, validatePassword } from "../../utils/validators";
import Field from "../shared/Field";
import PrimaryButton from "../shared/PrimaryButton";
import { loginUser } from "../../api/client";

export default function LoginView({ setView, onLogin, authError, setAuthError }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const checkField = (field, value) => {
    const msg = field === "username" ? validateUsername(value) : validatePassword(value);
    setErrors((e) => ({ ...e, [field]: msg }));
    return msg;
  };

  const submit = async () => {
    const uErr = validateUsername(username);
    const pErr = validatePassword(password);
    setErrors({ username: uErr, password: pErr });
    setTouched({ username: true, password: true });

    if (uErr || pErr) return;

    try {
      setSubmitting(true);
      setAuthError("");
      const data = await loginUser({ username, password });
      onLogin(data);
    } catch (error) {
      setAuthError(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <div style={{ fontFamily: "'Fraunces', serif", fontWeight: 600, fontSize: 26, color: tokens.cream, marginBottom: 6 }}>
        Welcome back {username}
      </div>
      <div style={{ fontSize: 13.5, color: tokens.muted, marginBottom: 30 }}>
        Sign in to your Kishan Sahayatri dashboard.
      </div>
      {authError && (
        <div style={{ marginBottom: 12, background: "rgba(255,96,96,0.1)", border: "1px solid rgba(255,96,96,0.35)", borderRadius: 8, padding: "8px 10px", color: "#ffb3b3", fontSize: 12.5 }}>
          {authError}
        </div>
      )}
      <Field
        label="Username" icon={AtSign} value={username}
        onChange={(e) => { setUsername(e.target.value); if (touched.username) checkField("username", e.target.value); }}
        onBlur={() => { setTouched((t) => ({ ...t, username: true })); checkField("username", username); }}
        placeholder="anish_thapa" error={touched.username ? errors.username : ""}
      />
      <Field
        label="Password" icon={Lock} type={showPw ? "text" : "password"} value={password}
        onChange={(e) => { setPassword(e.target.value); if (touched.password) checkField("password", e.target.value); }}
        onBlur={() => { setTouched((t) => ({ ...t, password: true })); checkField("password", password); }}
        placeholder="Enter your password" error={touched.password ? errors.password : ""}
        rightSlot={
          <button onClick={() => setShowPw(!showPw)} style={{ background: "none", border: "none", cursor: "pointer", display: "flex" }}>
            {showPw ? <EyeOff size={16} color={tokens.muted} /> : <Eye size={16} color={tokens.muted} />}
          </button>
        }
      />
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 22 }}>
        <button onClick={() => setView("forgot")} style={{ background: "none", border: "none", color: tokens.gold, fontSize: 12.5, fontWeight: 600, cursor: "pointer", fontFamily: "Inter, sans-serif" }}>
          Forgot password?
        </button>
      </div>
      <PrimaryButton onClick={submit} disabled={submitting}>{submitting ? "Signing in..." : "Sign in"} <ChevronRight size={16} /></PrimaryButton>
      <div style={{ textAlign: "center", marginTop: 22, fontSize: 13, color: tokens.muted }}>
        New here?{" "}
        <button onClick={() => setView("signup")} style={{ background: "none", border: "none", color: tokens.goldText, fontWeight: 600, cursor: "pointer", fontFamily: "Inter, sans-serif" }}>
          Create an account
        </button>
      </div>
    </div>
  );
}
