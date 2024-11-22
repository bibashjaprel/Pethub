const setTokenWithExpiry = (token, expiryDays, user, role) => {
  const now = new Date();
  const expiryDate = now.getTime() + expiryDays * 24 * 60 * 60 * 1000;
  localStorage.setItem('authToken', token);
  localStorage.setItem('expiryDate', expiryDate.toString());
  localStorage.setItem('user', JSON.stringify(user)); // Store user as JSON string
};

const isTokenValid = () => {
  const expiryDate = localStorage.getItem('expiryDate');
  if (expiryDate && new Date().getTime() > parseInt(expiryDate, 10)) { 
    localStorage.removeItem('authToken');
    localStorage.removeItem('expiryDate');
    localStorage.removeItem('user'); 
    return false;
  }
  return true;
};

const isAuthenticated = () => {
  return isTokenValid() && localStorage.getItem('authToken') !== null;
};

const clearToken = () => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('expiryDate');
  localStorage.removeItem('user'); 
};

const getUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null; // Parse and return user data if available
};  

export { setTokenWithExpiry, isAuthenticated, clearToken, getUser };
