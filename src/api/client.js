const API_BASE_URL = 'http://localhost:5000/api';

function getToken() {
  return localStorage.getItem('token');
}

async function apiRequest(endpoint, { method = 'GET', body = null, token = getToken() } = {}) {
  const headers = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || 'Request failed');
  }

  return data;
}

export const loginUser = (credentials) =>
  apiRequest('/auth/login', {
    method: 'POST',
    body: credentials,
  });

export const registerUser = (payload) =>
  apiRequest('/auth/register', {
    method: 'POST',
    body: payload,
  });

export const getProfile = (tokenOverride) =>
  apiRequest('/users/me', {
    token: tokenOverride || getToken(),
  });

export const updateProfile = (payload, tokenOverride) =>
  apiRequest('/users/me', {
    method: 'PUT',
    body: payload,
    token: tokenOverride || getToken(),
  });

export const createCropPrediction = (payload, tokenOverride) =>
  apiRequest('/predict/crop', {
    method: 'POST',
    body: payload,
    token: tokenOverride || getToken(),
  });

export const createYieldPrediction = (payload, tokenOverride) =>
  apiRequest('/predict/yield', {
    method: 'POST',
    body: payload,
    token: tokenOverride || getToken(),
  });

export const getPredictionHistory = (tokenOverride) =>
  apiRequest('/predict/history', {
    token: tokenOverride || getToken(),
  });

export default apiRequest;
