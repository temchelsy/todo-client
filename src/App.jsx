import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from "react-router-dom";
import { AuthProvider } from './Pages/AuthPage/AuthContext';
import { Toaster } from 'sonner';

// Pages
import Home from './Pages/HomePage/Home';
import Login from './Pages/AuthPage/Login';
import Registrations from './Pages/AuthPage/Registrations';
import Dashboard from './Pages/Dashboard/Dashboard';
import Overview from './Pages/Dashboard/Overview';
import SupervisorTodoPage from './Pages/SupervisorTodoPage';

// Components
import VerifyEmail from './Components/VerifyEmail';
import VerifyEmails from './Components/VerifyEmails';
import OauthCallback from './Components/OauthCallback';

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const token = localStorage.getItem('token');
  
  if (!token) {
    sessionStorage.setItem('redirectTo', location.pathname + location.search);
    return <Navigate to="/login" />;
  }
  
  return children;
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <Toaster position="top-center" />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registrations />} />
          <Route path="/verify" element={<VerifyEmail />} />
          <Route path="/verify-emails" element={<VerifyEmails />} />
          <Route path="/oauth/callback" element={<OauthCallback />} />
          
          {/* Protected Routes */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          >
            <Route index element={<Overview />} />
          </Route>

          
          <Route 
            path="/todos/:id" 
            element={
              <ProtectedRoute>
                <SupervisorTodoPage />
              </ProtectedRoute>
            } 
          />

          {/* 404 Route */}
          <Route 
            path="*" 
            element={
              <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                  <h1 className="text-4xl font-bold mb-2">404</h1>
                  <p className="text-gray-600">Page not found</p>
                </div>
              </div>
            } 
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;