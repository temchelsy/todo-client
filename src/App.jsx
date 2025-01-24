import React from 'react';
import './App.css';
import Home from './Pages/HomePage/Home';
import Login from './Pages/AuthPage/Login';
import Registrations from './Pages/AuthPage/Registrations';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from './Pages/AuthPage/AuthContext';
import VerifyEmail from './Components/VerifyEmail';
import VerifyEmails from './Components/VerifyEmails';
import Dashboard from './Pages/Dashboard/Dashboard';
import OauthCallback from './Components/OauthCallback';
import { Toaster } from 'sonner';
import Overview from './Pages/Dashboard/Overview';


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
           
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;