import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../utils/apiHelpers';
import { setTokenWithExpiry } from '../utils/authHelpers';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const { token, user } = await loginUser(formData); // Call API via apiHelpers
      setTokenWithExpiry(token, 30, user); // Store token and user
      navigate('/', { replace: true });
    } catch (error) {
      setError(error?.response?.data?.error || 'Invalid login credentials. Please try again.');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Welcome Back!</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-lg font-medium text-gray-700">
              Email Address
              <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="you@example.com"
              required
            />
          </div>
          <div className="relative">
            <label htmlFor="password" className="block text-lg font-medium text-gray-700">
              Password
              <span className="text-red-500">*</span>
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="••••••••"
              required
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute top-1/2 right-3 -translate-y-1/2 flex items-center text-gray-500 hover:text-indigo-500 focus:outline-none"
              aria-label="Toggle password visibility"
            >
              {showPassword ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.98 8.223C5.644 5.64 8.434 4 12 4c3.566 0 6.356 1.64 8.02 4.223M3.98 8.223A11.906 11.906 0 0 0 2.25 12c1.124 2.48 3.126 4.515 5.731 5.635M3.98 8.223l.154-.1m16.885.1a11.906 11.906 0 0 1 1.73 3.777 11.906 11.906 0 0 1-1.73 3.777M20.02 8.223l-.154-.1M3.89 15.635a12.097 12.097 0 0 1-1.389-3.635m18.56 0c-.289-1.049-.762-2.037-1.39-3.635m0 0a11.89 11.89 0 0 0-2.19 1.365m2.19-1.365c-1.665-2.583-4.456-4.223-8.02-4.223m8.02 4.223A11.89 11.89 0 0 0 12 14.577m0-5.354a11.89 11.89 0 0 0-6.02 3.366M3.98 8.223a11.89 11.89 0 0 0 2.19-1.365m0 0C8.345 5.64 11.135 4 14.7 4"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12c0-1.5-1.5-3-3-3s-3 1.5-3 3s1.5 3 3 3s3-1.5 3-3zm5.25 0a6.8 6.8 0 0 1-1.14 3.45l.55.55A11.73 11.73 0 0 0 21.75 12a11.73 11.73 0 0 0-1.14-3.45l-.55.55c.47 1.22.74 2.55.74 3.9zm-.72-1.38a9.94 9.94 0 0 1-1.32 4.59l-.45-.45a4 4 0 0 0-3.74-1.91c-2.65-.53M2.28 2.28L2"
                  />
                </svg>
              )}
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white font-bold py-3 rounded-lg hover:bg-indigo-700 transition duration-300"
          >
            Login
          </button>
          <p className="mt-4 text-center">
            Don't have an account?{' '}
            <Link to="/signup" className="text-blue-500 hover:underline">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
