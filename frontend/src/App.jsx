import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar'; 
import Dashboard from './pages/Dashborad'; 
import AllPets from './pages/AllPets'; 
import Login from './pages/Login'; 
import Signup from './pages/Signup';
import Home from './pages/Home';
import DonatePet from './pages/DonatePet';
import UserManagement from './components/UserManagement';

import Footer from './components/Footer';
const App = () => {
  return (
    <Router>
      <Navbar /> {/* Navbar will be visible on all routes */}
      <Routes>
         <Route path="/dashboard" element={<Dashboard />} />
         <Route path="/" element={<Home />} />
         <Route path="/manage-users" element={<UserManagement />} />
        <Route path="/all-pets" element={<AllPets />} />
        <Route path="/donatepet" element={<DonatePet />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
