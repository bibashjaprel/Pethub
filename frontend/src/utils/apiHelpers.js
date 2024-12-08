import axios from 'axios';

const BASE_URL = 'https://pethub-backend-3te5.onrender.com';

// Set default configurations for axios
axios.defaults.baseURL = BASE_URL;

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

// Handle API errors
const handleError = (error) => {
  console.error('API Error:', error?.response?.data || error.message);
  throw error;
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
export const fetchRecentPets = async () => apiGet('/api/v1/pets/availabe/');
export const getPet = async () => apiGet('/api/v1/pets');
export const deletePet = async (petId) => apiDelete(`/api/v1/pets/${petId}`);

// Adoption APIs
export const getAdoptionRequests = async () => apiGet('/api/adoption-requests');
export const getAdoptionApplications = async () => apiGet('/api/adoption-applications');
