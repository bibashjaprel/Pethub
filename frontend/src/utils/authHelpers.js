const setTokenWithExpiry = (token, expiryDays, user, role) => {
  const now = new Date();
  const expiryDate = now.getTime() + expiryDays * 24 * 60 * 60 * 1000; // Expiry in milliseconds

  // Store the token, expiry date, user, and role in localStorage
  localStorage.setItem('authToken', token);
  localStorage.setItem('expiryDate', expiryDate.toString());
  localStorage.setItem('user', JSON.stringify(user)); // Store user as JSON string
  localStorage.setItem('role', role); // Store the role
};

const isTokenValid = () => {
  const expiryDate = localStorage.getItem('expiryDate');
  if (expiryDate) {
    const expiryTime = parseInt(expiryDate, 10);
    if (new Date().getTime() > expiryTime) {
      clearToken(); // Clear all data if expired
      return false;
    }
  }
  return true; // If no expiry date or not expired, the token is valid
};

const isAuthenticated = () => {
  // Check if the token is valid and not null
  return isTokenValid() && localStorage.getItem('authToken') !== null;
};

const clearToken = () => {
  // Remove all relevant items from localStorage
  localStorage.removeItem('authToken');
  localStorage.removeItem('expiryDate');
  localStorage.removeItem('user');
  localStorage.removeItem('role'); // Clear role as well
};

const getUser = () => {
  const user = localStorage.getItem('user');
  if (!user) {
    console.error('No user found in localStorage');
    return null;
  }

  try {
    return JSON.parse(user); // Parse and return user data if available
  } catch (error) {
    console.error('Error parsing user data from localStorage:', error);
    return null;
  }
};

const getRole = () => {
  const role = localStorage.getItem('role');
  if (!role) {
    console.error('No role found in localStorage');
    return null;
  }
  return role;
};

export { setTokenWithExpiry, isAuthenticated, clearToken, getUser, getRole };
