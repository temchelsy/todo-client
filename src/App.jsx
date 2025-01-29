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
import SupervisorTodoPage from './Pages/invite'; 

function App() {
  return (
    <Router>
      <AuthProvider>
        <Toaster />
        <Routes>
          {/* Top-level routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registrations />} />
          <Route path="/verify" element={<VerifyEmail />} />
          <Route path="/verify-emails" element={<VerifyEmails />} />
          <Route path="/oauth/callback" element={<OauthCallback />} />
          <Route path="/supervisor/todos/:id" element={<SupervisorTodoPage />} />
          
          {/* Nested routes for Dashboard */}
          <Route path="/dashboard" element={<Dashboard />}>
            <Route index element={<Overview />} /> 
          </Route>
          
          {/* Supervisor Todo Page Route */}
          
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;