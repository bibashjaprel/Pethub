import axios from 'axios';

// const BASE_URL = 'http://localhost:5000/';
const BASE_URL = 'https://pethub-backend-3te5.onrender.com';
axios.defaults.baseURL = BASE_URL;
axios.defaults.timeout = 10000; // Set timeout for requests 

// Add Authorization header to every request if a token exists
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle API responses
const handleResponse = (response) => response.data;

// Handle API errors with better user feedback
const handleError = (error) => {
  const errorMessage = error?.response?.data?.error || error.message || 'An unexpected error occurred';
  console.error('API Error:', errorMessage);
  throw new Error(errorMessage);
};

// Helper function for GET requests
const apiGet = async (endpoint) => {
  try {
    const response = await axios.get(endpoint);
    return handleResponse(response);
  } catch (error) {
    handleError(error);
  }
};

// Helper function for POST requests
const apiPost = async (endpoint, data) => {
  try {
    const response = await axios.post(endpoint, data);
    return handleResponse(response);
  } catch (error) {
    handleError(error);
  }
};

// Helper function for DELETE requests
const apiDelete = async (endpoint) => {
  try {
    const response = await axios.delete(endpoint);
    return handleResponse(response);
  } catch (error) {
    handleError(error);
  }
};

// API Endpoints

// User APIs
export const loginUser = async (credentials) => apiPost('/api/v1/user/login', credentials);
export const getUser = async () => apiGet('/api/v1/user/users');
export const deleteUser = async (userId) => apiDelete(`/api/v1/user/delete/${userId}`);

// Pet APIs
export const AllPets = async () => apiGet('/api/v1/pets/');
export const getAvailablePets = async () => apiGet('/api/v1/pets/availabe/');
export const getPet = async (petId) => apiGet(`/api/v1/pets/${petId}`);  // Fetch a specific pet
export const deletePet = async (petId) => apiDelete(`/api/v1/pets/${petId}`);

// Adoption APIs

// Get all adoption requests
export const getAdoptionRequests = async () => apiGet('/api/v1/adoption');

// Create an adoption request
export const createAdoptionRequest = async (adoptionData) => apiPost('/api/v1/adoption', adoptionData);

// Get all adoption applications
export const getAdoptionApplications = async () => apiGet('/api/adoption-applications');

//Get donate request
export const getCreateRequests = async () => apiGet('/api/v1/pets/pending');

// Cart request (My adoption requests)
export const getMyAdoptionRequest = async () => apiGet('/api/v1/adoption/user/my-request');
