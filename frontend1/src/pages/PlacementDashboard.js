import React from "react";
import { useAuth } from "../context/AuthContext";

const PlacementDashboard = () => {
  const { user, logout } = useAuth();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-green-600">Placement Cell Dashboard</h1>
      <p className="mt-2">Welcome, {user?.name || "Placement Officer"} 🏢</p>

      <div className="mt-6 space-y-4">
        <button
          className="px-4 py-2 bg-indigo-600 text-white rounded"
          onClick={() => alert("Post new internship")}
        >
          Post Internship
        </button>
        <button
          className="px-4 py-2 bg-teal-600 text-white rounded"
          onClick={() => alert("Open analytics dashboard")}
        >
          View Analytics
        </button>
        <button
          className="px-4 py-2 bg-red-600 text-white rounded"
          onClick={logout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default PlacementDashboard;
