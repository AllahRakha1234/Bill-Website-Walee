import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const PrivateRoute = ({ children }) => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      navigate("/adminlogin");
      return;
    }

    // Verify the token with the backend
    axios
      .post(
        `${process.env.REACT_APP_SERVER_URL}/api/verify-token`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        if (response.data.valid) {
          setIsAuthenticated(true);
        } else {
          localStorage.removeItem("authToken");
          navigate("/adminlogin");
        }
      })
      .catch((error) => {
        localStorage.removeItem("authToken");
        navigate("/adminlogin");
      });
  }, [navigate]);

  if (isAuthenticated === null) {
    return <p>Loading...</p>; // Show loading until verification is done
  }

  return isAuthenticated ? children : null;
};

export default PrivateRoute;
