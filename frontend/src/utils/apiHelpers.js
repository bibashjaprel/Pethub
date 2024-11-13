import axios from 'axios';
import { Link, useNavigate, useLocation } from 'react-router-dom';
export const getAdoptionRequests = async () => {
  try {
    const response = await axios.get('/api/adoption-requests');
    return response.data;
  } catch (error) {
    console.error("Error fetching adoption requests: ", error);
    throw error;
  }
};

export const getAdoptionApplications = async () => {
  try {
    const response = await axios.get('/api/adoption-applications');
    return response.data;
  } catch (error) {
    console.error("Error fetching adoption applications: ", error);
    throw error;
  }
};


// Users
export const getUser = async () => {
  try {
    const response = await axios.get('http://localhost:5000/api/v1/user/users');
    return response.data;
  } catch (error) {
    console.error("Error fetching the users: ", error);
    throw error;
  }
};

export const deleteUser = async (userId) => {
  try {
    const response = await axios.delete(`http://localhost:5000/api/v1/user/delete/${userId}`);
    return response.data; 
  } catch (error) {
    console.error(`Error while deleting user: ${error}`);
    throw error;
  }
};

// Pets
export const getPet = async (petId) => {
  try {
    const response = await axios.get(`/api/v1/pets`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching pet with ID ${petId}: `, error);
    throw error;
  }
};

export const deletePet = async (petId) => {
  try {
    const response = await axios.delete(`/api/v1/pets/${petId}`);
    return response.data;
  } catch (error) {
    console.error(`Error while deleting pet with ID ${petId}: `, error); 
    throw error;
  }
};


