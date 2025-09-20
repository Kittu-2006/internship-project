import React from "react";
import { useAuth } from "../context/AuthContext";

function PlacementDashboard() {
  const { user, logout } = useAuth();

  return (
    <div style={{ padding: "20px" }}>
      <h1>🏢 Placement Cell Dashboard</h1>
      <p>Welcome, {user?.name || "Placement Officer"}!</p>
      <p>Your role: {user?.role}</p>

      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default PlacementDashboard;
