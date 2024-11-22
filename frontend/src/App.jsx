import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar'; 
import Dashboard from './pages/Dashboard/Dashborad'; 
import AllPets from './pages/Dashboard/pets/AllPets'; 
import AdoptPage from './pages/Dashboard/adoption/AdoptPetForm';
import AboutUs from './pages/AboutUs';
import Login from './pages/Login'; 
import Signup from './pages/Signup';
import Home from './pages/Home';
import DonatePet from './pages/Dashboard/donate/DonatePetForm';
import Footer from './components/Footer';
import UnauthorizedPage from './components/UnauthorizedPage';
import Editpage from './pages/Dashboard/pets/EditPet'

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
        <Route path="/admin/dashboard/pets/edit/:id" element={<Editpage />} />
        <Route path="*" element={<UnauthorizedPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
