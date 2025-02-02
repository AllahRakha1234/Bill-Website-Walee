import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "./Loading"; // Assuming you have a Loading component
import { toast } from "react-toastify";

const PrivateRoute = ({ children }) => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const verifyAuth = async () => {
      const token = localStorage.getItem("authToken");

      if (!token) {
        toast.error("Authentication required.");
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
          toast.error("Session expired. Please log in again.");
          localStorage.removeItem("authToken");
          navigate("/adminlogin");
        }
      } catch (error) {
        toast.error("Authentication failed. Please log in again.");
        localStorage.removeItem("authToken");
        navigate("/adminlogin");
      }
    };

    verifyAuth();
  }, [navigate]);

  if (isAuthenticated === null) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <Loading />
      </div>
    ); // Show loader while verifying authentication
  }

  return isAuthenticated ? children : null;
};

export default PrivateRoute;
