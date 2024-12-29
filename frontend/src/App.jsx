import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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
import Editpage from './pages/Dashboard/pets/EditPet';
import MyRequest from './pages/MyRequest';
import { isAuthenticated, getUser } from './utils/authHelpers';

const App = () => {
  const user = getUser();
  const isLoggedIn = isAuthenticated();

  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Admin Routes - Only accessible by admin */}
        <Route
          path="/admin/v1/dashboard"
          element={isLoggedIn && user?.role === 'admin' ? <Dashboard /> : <Navigate to="/unauthorized" />}
        />
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/all-pets" element={isLoggedIn ? <AllPets /> : <Navigate to="/unauthorized" />} />
        <Route path="/:species/:id" element={<AdoptPage />} />
        <Route path="/donate-pet" element={isLoggedIn ? <DonatePet /> : <Navigate to="/unauthorized" />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/login" element={!isLoggedIn ? <Login /> : <Navigate to="/" />} />
        <Route path="/signup" element={!isLoggedIn ? <Signup /> : <Navigate to="/" />} />

        {/* User Routes - Accessible by logged-in users */}
        <Route
          path="/user/requests/"
          element={isLoggedIn ? <MyRequest /> : <Navigate to="/login" />}
        />

        {/* Edit Pet - Accessible by admin */}
        <Route
          path="/admin/dashboard/pets/edit/:id"
          element={isLoggedIn && user?.role === 'admin' ? <Editpage /> : <Navigate to="/unauthorized" />}
        />

        {/* Catch-all Route for Unauthorized Access */}
        <Route path="/unauthorized" element={<UnauthorizedPage />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
