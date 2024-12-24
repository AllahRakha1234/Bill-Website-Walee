import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="text-gray-600 body-font">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <Link
          to="/" // Changed from href to 'to' for routing
          className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
        >
          {/* <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full"
            viewBox="0 0 24 24"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
          </svg> */}
          <img
            src="/walee-logo.png"
            alt="Walee - NUST Bill System Logo"
            className="h-10 w-auto"
            loading="lazy"
            decoding="async"
          />

          <span className="ml-3 text-xl">NUST Bill System</span>
        </Link>
        <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
          <Link to="/" className="text-xl mr-5 hover:text-blue-500">
            Home
          </Link>
          <Link to="/about" className="text-xl mr-5 hover:text-blue-500">
            About
          </Link>
          <Link to="/admin" className="text-xl mr-5 hover:text-blue-500">
            Admin
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
