import React, { useEffect, useState } from "react";
import AuthShell from "./components/auth/AuthShell";
import LoginView from "./components/auth/LoginView";
import SignupView from "./components/auth/SignupView";
import ForgotView from "./components/auth/ForgotView";
import Dashboard from "./components/dashboard/Dashboard";
import { getProfile } from "./api/client";

export default function App() {
  const [view, setView] = useState("login");
  const [user, setUser] = useState(null);
  const [authError, setAuthError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    getProfile(token)
      .then((data) => {
        setUser(data.user);
        setView("dashboard");
      })
      .catch(() => {
        localStorage.removeItem("token");
        setUser(null);
        setView("login");
      });
  }, []);

  const handleAuthSuccess = (data) => {
    const userData = data.user || data;
    localStorage.setItem("token", data.token);
    setUser(userData);
    setView("dashboard");
    setAuthError("");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setView("login");
  };

  return (
    <div style={{ background: "#080D0A", padding: 20, minHeight: "100vh", boxSizing: "border-box" }}>
      {view === "dashboard" && user ? (
        <Dashboard user={user} onLogout={handleLogout} />
      ) : (
        <AuthShell>
          {view === "login" && (
            <LoginView
              setView={setView}
              onLogin={handleAuthSuccess}
              authError={authError}
              setAuthError={setAuthError}
            />
          )}
          {view === "signup" && (
            <SignupView
              setView={setView}
              onSuccess={handleAuthSuccess}
              authError={authError}
              setAuthError={setAuthError}
            />
          )}
          {view === "forgot" && <ForgotView setView={setView} />}
        </AuthShell>
      )}
    </div>
  );
}
