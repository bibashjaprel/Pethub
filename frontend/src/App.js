import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import { isAuthenticated, getUser } from './utils/authHelpers';

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (isAuthenticated()) {
      const fetchedUser = getUser();
      setUser(fetchedUser);
    } else {
      setUser(null);
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={user ? <Navigate to="/dashboard" /> : <Login />}
        />
        <Route
          path="/signup"
          element={user ? <Navigate to="/dashboard" /> : <Signup />}
        />
        <Route
          path="/dashboard"
          element={user ? <Dashboard user={user} /> : <Navigate to="/login" />}
        />
        {/* <Route
          path="*"
          element={<Navigate to={user ? "/dashboard" : "/login"} />}
        /> */}
      </Routes>
    </Router>
  );
};

export default App;
