import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { AuthProvider } from './Pages/AuthPage/AuthContext';
import { Toaster } from 'sonner';

// Page imports
import Home from './Pages/HomePage/Home';
import Login from './Pages/AuthPage/Login';
import Registrations from './Pages/AuthPage/Registrations';
import Dashboard from './Pages/Dashboard/Dashboard';
import Overview from './Pages/Dashboard/Overview';
import SupervisorTodoPage from './Pages/invite';

// Component imports
import VerifyEmail from './Components/VerifyEmail';
import VerifyEmails from './Components/VerifyEmails';
import OauthCallback from './Components/OauthCallback';

// Protected Route component
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <Toaster />
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registrations />} />
          <Route path="/verify" element={<VerifyEmail />} />
          <Route path="/verify-emails" element={<VerifyEmails />} />
          <Route path="/oauth/callback" element={<OauthCallback />} />
          
          {/* Protected routes */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }>
            <Route index element={<Overview />} />
          </Route>

          
          <Route path="/todos/:id" element={
            <ProtectedRoute>
              <SupervisorTodoPage />
            </ProtectedRoute>
          } />

          {/* Catch all route for 404 */}
          <Route path="*" element={
            <div className="flex min-h-screen items-center justify-center">
              <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
                <p className="text-gray-600">Page not found</p>
              </div>
            </div>
          } />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;