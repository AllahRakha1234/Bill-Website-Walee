import React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import Toastify styles

const styles = {
  toastStyle: {
    marginTop: "70px", // Adjust based on your Navbar's height
    zIndex: 1050, // Manage stacking order
  },
};

const Layout = ({ children }) => {

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      {/* Add the ToastContainer at the top level with custom style */}
      <ToastContainer
        position="top-right"
        autoClose={2000}
        style={styles.toastStyle} // Apply the custom style
      />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
