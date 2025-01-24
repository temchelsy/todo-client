import React from 'react';
import './App.css';
import Home from './Pages/HomePage/Home';
import Login from './Pages/AuthPage/Login';
import Registrations from './Pages/AuthPage/Registrations';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from './Pages/AuthContext';
import VerifyEmail from './Components/VerifyEmail';
import VerifyEmails from './Components/VerifyEmails';
import Dashboard from './Pages/Dashboard';
import OauthCallback from './Components/OauthCallback';
import { Toaster } from 'sonner';
import Pending from './Pages/DashboardOutlets/Pending';
import Completed from './Pages/DashboardOutlets/Completed';
import Overview from './Pages/DashboardOutlets/Overview';
import Settings from './Pages/DashboardOutlets/Settings';

function App() {
  return (
    <AuthProvider>
      <Toaster richColors />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registrations />} />
          <Route path="/verify-email" element={<VerifyEmails />} />
          <Route path="/verify-email/:token" element={<VerifyEmail />} />
          <Route path="/oauth-callback" element={<OauthCallback />} />
          <Route path="/dashboard" element={<Dashboard />}>
            <Route index element={<Overview />} />
            <Route path="settings" element={<Settings />} />
            <Route path="pending" element={<Pending />} />
            <Route path="completed" element={<Completed />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;