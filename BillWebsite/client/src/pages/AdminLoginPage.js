import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import Loading from "../components/Loading";
import { toast } from "react-toastify";

const AdminLoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      navigate("/admin");
    }
  }, [navigate]);

  const handleLogin = async () => {
    if (!email || !password) {
      toast.warn("Email and password are required.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/api/admin-login/login`,
        {
          email,
          password,
        }
      );

      const { token } = response.data;
      if (token) {
        localStorage.setItem("authToken", token);
        navigate("/admin");
        toast.success("Login successful!");
      } else {
        toast.error("Login failed. Please try again.");
      }
    } catch (error) {
      toast.error("Invalid credentials. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-400">
      <div className="w-full max-w-md bg-white p-6 lg:p-8  mx-5 md:my-0 rounded-lg shadow-lg transform transition-all hover:scale-105">
        <h2 className="text-lg md:text-xl lg:text-3xl font-bold text-center text-indigo-600 mb-2 lg:mb-4">
          Admin Login
        </h2>
        <p className="text-center text-gray-500 text-sm lg:text-lg mb-2 lg:mb-6">
          Enter your credentials to access the admin panel.
        </p>
        <div className="mb-2 md:mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-1 md:py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            placeholder="Enter your email"
          />
        </div>
        <div className="mb-4 md:mb-6">
          <label className="block text-gray-700 font-semibold mb-2">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-1 md:py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            placeholder="Enter your password"
          />
        </div>
        <button
          onClick={handleLogin}
          className="w-full py-2 mb-0 md:mb-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition duration-200"
          disabled={isLoading}
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>
        {/* {isLoading && <Loading />} */}
        <div className="mt-2 md:mt-4 text-center">
          <a
            href="/forgot-password"
            className="text-sm text-indigo-500 hover:underline"
          >
            Forgot Password?
          </a>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;
