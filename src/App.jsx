import React, { useState } from "react";
import AuthShell from "./components/auth/AuthShell";
import LoginView from "./components/auth/LoginView";
import SignupView from "./components/auth/SignupView";
import ForgotView from "./components/auth/ForgotView";
import Dashboard from "./components/dashboard/Dashboard";

export default function App() {
  const [view, setView] = useState("login");
  const [user, setUser] = useState({
    name: "Anish Sharma",
    username: "anish_shrestha",
    email: "anish@example.com",
  });

  return (
    <div style={{ background: "#080D0A", padding: 20, minHeight: "100vh", boxSizing: "border-box" }}>
      {view === "dashboard" ? (
        <Dashboard user={user} onLogout={() => setView("login")} />
      ) : (
        <AuthShell>
          {view === "login" && (
            <LoginView
              setView={setView}
              onLogin={(u) => {
                setUser((prev) => ({ ...prev, username: u.username }));
                setView("dashboard");
              }}
            />
          )}
          {view === "signup" && <SignupView setView={setView} />}
          {view === "forgot" && <ForgotView setView={setView} />}
        </AuthShell>
      )}
    </div>
  );
}
