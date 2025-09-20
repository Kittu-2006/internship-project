import React from "react";
import { useAuth } from "../context/AuthContext";

const StudentDashboard = () => {
  const { user, logout } = useAuth();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-blue-600">Student Dashboard</h1>
      <p className="mt-2">Welcome, {user?.name || "Student"} 🎓</p>

      <div className="mt-6 space-y-4">
        <button
          className="px-4 py-2 bg-green-600 text-white rounded"
          onClick={() => alert("Open internships listing here")}
        >
          View Internships
        </button>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded"
          onClick={() => alert("Open profile editor here")}
        >
          Edit Profile
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

export default StudentDashboard;
