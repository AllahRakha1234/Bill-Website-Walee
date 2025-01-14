import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="body-font shadow-lg">
      <div className="container mx-auto flex flex-wrap p-5 flex-col text-sm md:flex-row items-center">
        <Link
          to="/" // Changed from href to 'to' for routing
          className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
        >
          <img
            src="/walee-logo.png"
            alt="Walee - NUST Bill System Logo"
            className="h-10 w-auto"
            loading="lazy"
            decoding="async"
          />
          <span className="ml-3 text-xl">NUST Bill System</span>
        </Link>
        <nav className="md:ml-auto flex flex-wrap items-center text-black justify-center">
          <Link
            to="/"
            className="text-xl font-semibold mr-5 hover:text-blue-500"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="text-xl font-semibold mr-5 hover:text-blue-500"
          >
            About
          </Link>
          <Link
            to="/adminlogin"
            className="text-xl font-semibold mr-5 hover:text-blue-500"
          >
            Admin
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
