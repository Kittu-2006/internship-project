import React from "react";
import { useAuth } from "../context/AuthContext";

function StudentDashboard() {
  const { user, logout } = useAuth();

  return (
    <div style={{ padding: "20px" }}>
      <h1>🎓 Student Dashboard</h1>
      <p>Welcome, {user?.name || "Student"}!</p>
      <p>Your role: {user?.role}</p>

      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default StudentDashboard;
