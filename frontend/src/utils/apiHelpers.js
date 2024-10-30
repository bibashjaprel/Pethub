import axios from 'axios';

export const getAdoptionRequests = async () => {
  try {
    const response = await axios.get('/api/adoption-requests');
    return response.data; // Directly return the data
  } catch (error) {
    console.error("Error fetching adoption requests: ", error);
  }
};

export const getAdoptionApplications = async () => {
  try {
    const response = await axios.get('/api/adoption-applications');
    return response.data; // Directly return the data
  } catch (error) {
    console.error("Error fetching adoption applications: ", error);
  }
};

export const clearToken = () => {
  localStorage.removeItem('token');
};

// Users
export const getUsers = async () => {
  try {
    const response = await axios.get('http://localhost:5000/api/v1/user/users');
    return response.data; // Return the data
  } catch (error) {
    console.error("Error fetching the users: ", error);
  }
};

export const deleteUser = async (userId) => {
  try {
    const response = await axios.delete(`http://localhost:5000/api/v1/user/delete/${userId}`);
    return response.data; // Return the response data after deletion
  } catch (error) {
    console.error(`Error while deleting user: ${error}`);
  }
};
