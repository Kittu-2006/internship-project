// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./ pages/LoginPage";
import RegisterPage from "./ pages/RegisterPage";
import StudentDashboard from "./ pages/StudentDashboard";
import MentorDashboard from "./ pages/MentorDashboard";
import PlacementDashboard from "./ pages/PlacementDashboard";
import ProtectedRoute from "./ components/ProtectedRoute";
import { AuthProvider } from "./ context/AuthContext";  // ✅ wrap everything in AuthProvider

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Protected routes */}
          <Route
            path="/student"
            element={
              <ProtectedRoute>
                <StudentDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/mentor"
            element={
              <ProtectedRoute>
                <MentorDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/placement"
            element={
              <ProtectedRoute>
                <PlacementDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
