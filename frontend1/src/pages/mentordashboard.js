import React from "react";
import { useAuth } from "../context/AuthContext";

const MentorDashboard = () => {
  const { user, logout } = useAuth();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-purple-600">Mentor Dashboard</h1>
      <p className="mt-2">Hello, {user?.name || "Mentor"} 👨‍🏫</p>

      <div className="mt-6 space-y-4">
        <button
          className="px-4 py-2 bg-yellow-600 text-white rounded"
          onClick={() => alert("Open approval requests here")}
        >
          Approve Applications
        </button>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded"
          onClick={() => alert("Show interview calendar")}
        >
          View Calendar
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

export default MentorDashboard;
