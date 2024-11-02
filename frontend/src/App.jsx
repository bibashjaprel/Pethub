import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar'; 
import Dashboard from './pages/Dashboard/Dashborad'; 
import AllPets from './pages/AllPets'; 
import AdoptPage from './pages/AdoptPage';
import AboutUs from './pages/AboutUs';
import Login from './pages/Login'; 
import Signup from './pages/Signup';
import Home from './pages/Home';
import DonatePet from './pages/DonatePet';
import Footer from './components/Footer';

const App = () => {
  return (
    <Router>
      <Navbar /> {/* Navbar will be visible on all routes */}
      <Routes>
         <Route path="/dashboard" element={<Dashboard />} />
         <Route path="/" element={<Home />} />
        <Route path="/all-pets" element={<AllPets />} />
        <Route path="/:species/:id" element={<AdoptPage />} />
        <Route path="/donatepet" element={<DonatePet />} />
        <Route path="/contact" element={<AboutUs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
