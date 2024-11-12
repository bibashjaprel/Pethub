import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar'; 
import Dashboard from './pages/Dashboard/Dashborad'; 
import AllPets from './pages/AllPets'; 
import AdoptPage from './pages/AdoptPetForm';
import AboutUs from './pages/AboutUs';
import Login from './pages/Login'; 
import Signup from './pages/Signup';
import Home from './pages/Home';
import DonatePet from './pages/DonatePetForm';
import Footer from './components/Footer';
import UnauthorizedPage from './components/UnauthorizedPage';

const App = () => {
  return (
    <Router>
      <Navbar /> 
         <Routes>
         <Route path="/admin/v1/dashboard" element={<Dashboard />} />
         <Route path="/" element={<Home />} />
        <Route path="/all-pets" element={<AllPets />} />
        <Route path="/:species/:id" element={<AdoptPage />} />
        <Route path="/donatepet" element={<DonatePet />} />
        <Route path="/contact" element={<AboutUs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/test" element={<UnauthorizedPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
