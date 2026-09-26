export const USERNAME_RE = /^[a-zA-Z0-9_]{4,20}$/;
export const PASSWORD_RE = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateUsername(v) {
  if (!v) return "Enter a username";
  if (v.length < 4) return "Username must be at least 4 characters";
  if (v.length > 20) return "Username must be under 20 characters";
  if (!USERNAME_RE.test(v)) return "Only letters, numbers and underscores allowed";
  return "";
}

export function validatePassword(v) {
  if (!v) return "Enter a password";
  if (v.length < 8) return "Password must be at least 8 characters";
  if (!/[a-z]/.test(v)) return "Add a lowercase letter";
  if (!/[A-Z]/.test(v)) return "Add an uppercase letter";
  if (!/\d/.test(v)) return "Add a number";
  if (!/[\W_]/.test(v)) return "Add a special character";
  return "";
}

export function validateEmail(v) {
  if (!v) return "Enter your email";
  if (!EMAIL_RE.test(v)) return "Enter a valid email address";
  return "";
}
