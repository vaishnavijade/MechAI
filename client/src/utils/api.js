// src/utils/api.js
const API_BASE = "http://localhost:5000"; // Replace with your actual backend URL

export const fetchProfile = async () => {
  const response = await fetch(`${API_BASE}/profile`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    },
  });
  return response.json();
};

export const updateProfile = async (username) => {
  const token = localStorage.getItem("authToken");
  const response = await fetch(`${API_BASE}/user-profile`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // Pass JWT for authentication
    },
    body: JSON.stringify({ username }),
  });
  return response.json();
};

export const resetPassword = async (email, newPassword) => {
  const response = await fetch(`${API_BASE}/reset-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, newPassword }),
  });
  return response.json();
};
