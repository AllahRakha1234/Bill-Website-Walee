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

      console.log("Auth Token in PR: ", token)

      if (!token) {
        toast.error("Authentication required.");
        navigate("/adminlogin");
        return;
      }

      console.log("Token pass: ", token)

      try {
        // console.log("Sending Request Headers: ", {
        //   Authorization: `Bearer ${token}`,
        // });
        
        const response = await axios.post(
          `${process.env.REACT_APP_SERVER_URL}/api/verify-token`,
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );

      console.log("Response: ", response)


        if (response.data.valid) {
          setIsAuthenticated(true);
        } else {
          toast.error("Session expired. Please log in again.");
          localStorage.removeItem("authToken");
          navigate("/adminlogin");
        }
      } catch (error) {
      console.log("Response in catch: ", error)
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
