import React, { useState } from 'react';
import axios from 'axios';
import { setTokenWithExpiry } from '../utils/authHelpers';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    firstname: '',
    lastname: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await axios.post('http://localhost:5000/api/v1/user/signup', formData);
      setTokenWithExpiry(response.data.token, 30);
      console.log('Signup successful:', response.data);
      window.location.href = '/login';
    } catch (error) {
      setError(error.response?.data?.error || 'Something went wrong, please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Sign Up</h2>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-6">
          {[ 
            { label: 'Username', name: 'username', type: 'text' },
            { label: 'Email', name: 'email', type: 'email' },
            { label: 'Password', name: 'password', type: 'password' },
            { label: 'First Name', name: 'firstname', type: 'text' },
            { label: 'Last Name', name: 'lastname', type: 'text' }
          ].map(({ label, name, type }) => (
            <div key={name} className="mb-4">
              <label htmlFor={name} className="block text-gray-700 text-sm font-medium">
                {label}
                <span className="text-red-500">*</span>
              </label>
              <input
                type={type}
                id={name}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder={label}
                required
              />
            </div>
          ))}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-semibold py-3 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Sign Up
          </button>
          <p className="mt-4 text-center text-gray-600">
            Already have an account?{' '}
            <a href="/login" className="text-blue-500 hover:underline">Login</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
