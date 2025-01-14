import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      // Redirect to admin login page if no token
      navigate('/adminLogin');
    }
  }, [navigate]);

  return children;
};

export default PrivateRoute;
