import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "./Loading"; 
import { toast } from "react-toastify";

const PrivateRoute = ({ children }) => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const hasCheckedAuth = useRef(false); 

  useEffect(() => {
    if (hasCheckedAuth.current) return; 
    hasCheckedAuth.current = true; 

    const verifyAuth = async () => {
      const token = localStorage.getItem("authToken");

      if (!token) {
        navigate("/adminlogin");
        return;
      }

      try {
        const response = await axios.post(
          `${process.env.REACT_APP_SERVER_URL}/api/verify-token`,
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (response.data.valid) {
          setIsAuthenticated(true);
        } else {
          localStorage.removeItem("authToken");
          toast.error("Session expired. Please log in again.");
          navigate("/adminlogin");
        }
      } catch (error) {
        localStorage.removeItem("authToken");

        if (token) {
          toast.error("Authentication failed. Please log in again.");
        }

        navigate("/adminlogin");
      }
    };

    verifyAuth();
  }, [navigate]);

  if (isAuthenticated === null) {
    return (
      <div className="w-full h-screen flex items-center justify-center overflow-hidden">
        <Loading />
      </div>
    );
  }

  return isAuthenticated ? children : null;
};

export default PrivateRoute;
