import React, { useState } from "react";
import { ArrowLeft, Mail } from "lucide-react";
import { tokens } from "../../styles/tokens";
import { validateEmail } from "../../utils/validators";
import Field from "../shared/Field";
import PrimaryButton from "../shared/PrimaryButton";

export default function ForgotView({ setView }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  const submit = () => {
    const msg = validateEmail(email);
    setError(msg);
    if (!msg) setSent(true);
  };

  return (
    <div>
      <button onClick={() => setView("login")} style={{ background: "none", border: "none", color: tokens.muted, display: "flex", alignItems: "center", gap: 6, cursor: "pointer", fontSize: 13, marginBottom: 22, fontFamily: "Inter, sans-serif" }}>
        <ArrowLeft size={14} /> Back to sign in
      </button>
      {!sent ? (
        <>
          <div style={{ fontFamily: "'Fraunces', serif", fontWeight: 600, fontSize: 26, color: tokens.cream, marginBottom: 6 }}>
            Reset your password
          </div>
          <div style={{ fontSize: 13.5, color: tokens.muted, marginBottom: 30, lineHeight: 1.6 }}>
            Enter the email on your account and we'll send a reset link.
          </div>
          <Field label="Email" icon={Mail} value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" error={error} />
          <PrimaryButton onClick={submit}>Send reset link</PrimaryButton>
        </>
      ) : (
        <div style={{ textAlign: "center" }}>
          <div style={{ width: 52, height: 52, borderRadius: "50%", background: tokens.surfaceRaised, border: `1px solid ${tokens.goldDim}`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
            <Mail size={22} color={tokens.gold} />
          </div>
          <div style={{ fontFamily: "'Fraunces', serif", fontWeight: 600, fontSize: 22, color: tokens.cream, marginBottom: 8 }}>Check your inbox</div>
          <div style={{ fontSize: 13.5, color: tokens.muted, marginBottom: 26, lineHeight: 1.6 }}>
            A reset link was sent to {email}. It expires in 30 minutes.
          </div>
          <PrimaryButton onClick={() => setView("login")}>Back to sign in</PrimaryButton>
        </div>
      )}
    </div>
  );
}
