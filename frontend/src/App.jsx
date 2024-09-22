import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar'; 
import Dashboard from './pages/Dashborad'; 
import AllPets from './pages/AllPets'; 
import Login from './pages/Login'; 
import Signup from './pages/Signup';
import UserManagement from './components/UserManagement';
const App = () => {
  return (
    <Router>
      <Navbar /> {/* Navbar will be visible on all routes */}
      <Routes>
         <Route path="/" element={<Dashboard />} />
         <Route path="/manage-users" element={<UserManagement />} />
        <Route path="/pets" element={<AllPets />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;
