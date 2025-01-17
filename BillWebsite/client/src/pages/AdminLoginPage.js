import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Loading from '../components/Loading'; // Import the Loading component

const AdminLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false); // State to track loading
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      alert('Email and password are required.');
      return;
    }

    setIsLoading(true); // Show loading indicator when the request starts

    try {
      console.log('Sending login request', { email, password }); // Debug log
      const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/admin-login/login`, {
        email,
        password
      });

      console.log("response: ", response)

      // Assuming successful response contains a token
      const { token } = response.data;
      if (token) {
        // Save the token (e.g., in localStorage)
        localStorage.setItem('authToken', token);
        // Redirect to the Admin page
        navigate('/admin');
      } else {
        alert('Login failed. Please try again.');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Invalid credentials. Please try again.');
    } finally {
      setIsLoading(false); // Hide loading indicator once the request is complete
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            placeholder="Enter your email"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            placeholder="Enter your password"
          />
        </div>
        <button
          onClick={handleLogin}
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
          disabled={isLoading} // Disable button when loading
        >
          {isLoading ? 'Logging in...' : 'Login'} {/* Change button text when loading */}
        </button>

        {/* Show Loading component when isLoading is true */}
        {isLoading && <Loading />}
      </div>
    </div>
  );
};

export default AdminLoginPage;
