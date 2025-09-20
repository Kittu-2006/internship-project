// src/components/ProtectedRoute.js
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  // if user is not logged in, redirect to login page
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // otherwise render the protected content
  return children;
};

export default ProtectedRoute;
