import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import StudentDashboard from './pages/StudentDashboard';
import MentorDashboard from './pages/MentorDashboard';
import PlacementCellDashboard from './pages/PlacementCellDashboard';
import InternshipDetail from './pages/InternshipDetail';
import ProfilePage from './pages/ProfilePage';
import NotFoundPage from './pages/NotFoundPage';

function PrivateRoute({ children, roles }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;
  if (roles && !roles.includes(user.role)) return <Navigate to="/" />;
  return children;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route path="/dashboard" element={
            <PrivateRoute>
              <DashboardSelector />
            </PrivateRoute>
          } />

          <Route path="/internships/:id" element={
            <PrivateRoute>
              <InternshipDetail />
            </PrivateRoute>
          } />

          <Route path="/profile" element={
            <PrivateRoute>
              <ProfilePage />
            </PrivateRoute>
          } />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

function DashboardSelector() {
  const { user } = useAuth();
  if (!user) return null;
  switch (user.role) {
    case 'student': return <StudentDashboard />;
    case 'mentor': return <MentorDashboard />;
    case 'placement_cell': return <PlacementCellDashboard />;
    default: return <NotFoundPage />;
  }
}

export default App;