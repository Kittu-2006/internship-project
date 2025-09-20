import React from "react";
import { useAuth } from "../context/AuthContext";

function MentorDashboard() {
  const { user, logout } = useAuth();

  return (
    <div style={{ padding: "20px" }}>
      <h1>👨‍🏫 Mentor Dashboard</h1>
      <p>Welcome, {user?.name || "Mentor"}!</p>
      <p>Your role: {user?.role}</p>

      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default MentorDashboard;
