import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { isAuthenticated, getUser, clearToken } from '../utils/authHelpers'; 

const Navbar = () => {
  const navigate = useNavigate(); 
  const isLoggedIn = isAuthenticated();
  const user = getUser();
  
  const handleLogout = () => {
    clearToken();
    navigate('/login'); 
  };

  return (
    <nav className="bg-white shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-800">Pet Adoption</h1>
        <ul className="flex space-x-4">
          {!isLoggedIn ? (
            <>
              <li><Link to="/login" className="hover:text-blue-500">Login</Link></li>
              <li><Link to="/signup" className="hover:text-blue-500">Sign Up</Link></li>
            </>
          ) : (
            <>
              <li className="text-gray-700">
                Welcome, <span className='text-blue-700 font-bold'>
                  {user?.firstname ? user.firstname : 'User'}
                </span>
              </li>
              <li>
                <button 
                  onClick={handleLogout} 
                  className="hover:text-red-500 cursor-pointer"
                >
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
