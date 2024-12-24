const setTokenWithExpiry = (token, expiryDays, user, role) => {
  const now = new Date();
  const expiryDate = now.getTime() + expiryDays * 24 * 60 * 60 * 1000; // Expiry in milliseconds

  // Store the token, expiry date, user, and role in localStorage
  localStorage.setItem('authToken', token);
  localStorage.setItem('expiryDate', expiryDate.toString());
  localStorage.setItem('user', JSON.stringify(user)); // Store user as JSON string
  localStorage.setItem('role', role); // Store the role
};

const clearToken = () => {
  // Remove all relevant items from localStorage
  localStorage.removeItem('authToken');
  localStorage.removeItem('expiryDate');
  localStorage.removeItem('user');
  localStorage.removeItem('role'); // Clear role as well
};

const isTokenValid = () => {
  const expiryDate = localStorage.getItem('expiryDate');
  if (!expiryDate) return false;

  const expiryTime = parseInt(expiryDate, 10);
  return new Date().getTime() <= expiryTime; // Return true if token is not expired
};

const isAuthenticated = () => {
  // Check if the token is valid and not null
  return isTokenValid() && localStorage.getItem('authToken') !== null;
};

const getUser = () => {
  const user = localStorage.getItem('user');
  if (!user) return null;

  try {
    return JSON.parse(user); // Parse and return user data if available
  } catch (error) {
    console.error('Error parsing user data from localStorage:', error);
    return null; // Return null if parsing fails
  }
};

const getRole = () => {
  const role = localStorage.getItem('role');
  return role ? role : 'guest'; // Return 'guest' as default role if not found
};

// This function checks if the user is logged in and has a role of 'admin'
const isAdmin = () => {
  const user = getUser();
  return isAuthenticated() && user?.role === 'admin';
};

export { setTokenWithExpiry, isAuthenticated, clearToken, getUser, getRole, isAdmin };
