import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar'; 
import Dashboard from './pages/Dashboard'; 
import AdminDashboard from './pages/AdminDashborad'; 
import AllPets from './pages/AllPets'; 
import Login from './pages/Login'; 
import Signup from './pages/Signup';

const App = () => {
  return (
    <Router>
      <Navbar /> {/* Navbar will be visible on all routes */}
      <Routes>
        {/* Define routes for each component */}
        <Route path="/" element={<Dashboard />} /> {/* Default to Dashboard */}
        <Route path="/dashboard" element={<AdminDashboard />} />
        <Route path="/pets" element={<AllPets />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;
