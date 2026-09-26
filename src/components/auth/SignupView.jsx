import React, { useState } from "react";
import { User, AtSign, Mail, Lock, ChevronRight, Sprout } from "lucide-react";
import { tokens } from "../../styles/tokens";
import { validateUsername, validateEmail, validatePassword } from "../../utils/validators";
import Field from "../shared/Field";
import PrimaryButton from "../shared/PrimaryButton";

export default function SignupView({ setView }) {
  const [form, setForm] = useState({ name: "", username: "", email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [done, setDone] = useState(false);

  const validators = {
    name: (v) => (!v ? "Enter your full name" : ""),
    username: validateUsername,
    email: validateEmail,
    password: validatePassword,
  };

  const checkField = (field, value) => {
    const msg = validators[field](value);
    setErrors((e) => ({ ...e, [field]: msg }));
    return msg;
  };

  const submit = () => {
    const e = {};
    Object.keys(validators).forEach((f) => { e[f] = validators[f](form[f]); });
    setErrors(e);
    setTouched({ name: true, username: true, email: true, password: true });
    if (Object.values(e).every((m) => !m)) setDone(true);
  };

  if (done) {
    return (
      <div style={{ textAlign: "center" }}>
        <div style={{ width: 52, height: 52, borderRadius: "50%", background: tokens.surfaceRaised, border: `1px solid ${tokens.sageDim}`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
          <Sprout size={24} color={tokens.sage} />
        </div>
        <div style={{ fontFamily: "'Fraunces', serif", fontWeight: 600, fontSize: 22, color: tokens.cream, marginBottom: 8 }}>Account created</div>
        <div style={{ fontSize: 13.5, color: tokens.muted, marginBottom: 26, lineHeight: 1.6 }}>
          {form.name.split(" ")[0] || "Welcome"}, your Kishan Sahayatri account is ready.
        </div>
        <PrimaryButton onClick={() => setView("login")}>Continue to sign in</PrimaryButton>
      </div>
    );
  }

  return (
    <div>
      <div style={{ fontFamily: "'Fraunces', serif", fontWeight: 600, fontSize: 26, color: tokens.cream, marginBottom: 6 }}>
        Create your account
      </div>
      <div style={{ fontSize: 13.5, color: tokens.muted, marginBottom: 30 }}>
        Start getting crop, yield and fertilizer predictions.
      </div>
      <Field
        label="Full name" icon={User} value={form.name}
        onChange={(e) => { setForm({ ...form, name: e.target.value }); if (touched.name) checkField("name", e.target.value); }}
        onBlur={() => { setTouched((t) => ({ ...t, name: true })); checkField("name", form.name); }}
        placeholder="Anish Sharma" error={touched.name ? errors.name : ""}
      />
      <Field
        label="Username" icon={AtSign} value={form.username}
        onChange={(e) => { setForm({ ...form, username: e.target.value }); if (touched.username) checkField("username", e.target.value); }}
        onBlur={() => { setTouched((t) => ({ ...t, username: true })); checkField("username", form.username); }}
        placeholder="anish_shrestha" error={touched.username ? errors.username : ""}
        hint="4-20 characters: letters, numbers, underscores only"
      />
      <Field
        label="Email" icon={Mail} value={form.email}
        onChange={(e) => { setForm({ ...form, email: e.target.value }); if (touched.email) checkField("email", e.target.value); }}
        onBlur={() => { setTouched((t) => ({ ...t, email: true })); checkField("email", form.email); }}
        placeholder="you@example.com" error={touched.email ? errors.email : ""}
      />
      <Field
        label="Password" icon={Lock} type="password" value={form.password}
        onChange={(e) => { setForm({ ...form, password: e.target.value }); if (touched.password) checkField("password", e.target.value); }}
        onBlur={() => { setTouched((t) => ({ ...t, password: true })); checkField("password", form.password); }}
        placeholder="At least 8 characters" error={touched.password ? errors.password : ""}
        hint="Needs an uppercase letter, a number and a special character"
      />
      <div style={{ marginTop: 6 }}>
        <PrimaryButton onClick={submit}>Create account <ChevronRight size={16} /></PrimaryButton>
      </div>
      <div style={{ textAlign: "center", marginTop: 22, fontSize: 13, color: tokens.muted }}>
        Already have an account?{" "}
        <button onClick={() => setView("login")} style={{ background: "none", border: "none", color: tokens.goldText, fontWeight: 600, cursor: "pointer", fontFamily: "Inter, sans-serif" }}>
          Sign in
        </button>
      </div>
    </div>
  );
}
