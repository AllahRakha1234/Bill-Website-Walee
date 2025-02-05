import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loading from '../components/Loading'; // Import the Loading component
import { toast } from 'react-toastify'; // Import toast from react-toastify

const SearchBox = () => {
  const [referenceNo, setReferenceNo] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const navigate = useNavigate();

  const handleSearchBtnClick = async () => {
    setIsLoading(true); // Set loading state to true when search starts
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/api/get-bill-template-data/${referenceNo}`
      );
      if (response.status === 200) {
        localStorage.setItem("referenceNo", JSON.stringify(referenceNo));
        localStorage.setItem("billDetails", JSON.stringify(response.data));
        navigate("/print");
        toast.success("Bill details loaded successfully!"); // Success toast
      }
    } catch (error) {
      if (error.response?.status === 404) {
        toast.error("Consumer ID does not exist."); // Error toast for 404
      } else {
        toast.error("Error occurred while searching for Meter ID."); // General error toast
      }
    } finally {
      setIsLoading(false); // Reset loading state after request completes
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearchBtnClick();
    }
  };

  return (
    <div className="container mx-auto flex items-center justify-center flex-col my-20 lg:mt-20">
      <div className="text-2xl font-semibold mb-3">
        <h2>NUST Bill</h2>
      </div>
      <div className="border border-gray-400 w-[90%] sm:w-[80%] md:w-[50%] lg:w-[40%] flex flex-col mb-4">
        <div className="text-lg font-semibold mb-2 bg-slate-300 p-2">
          Search Electricity Bill
        </div>
        <div className="flex flex-col items-center justify-center p-2 md:flex-row">
          <div>
            <h3 className="font-semibold text-blue-800">NUST/RESIDENT/</h3>
          </div>
          <div className="px-2 pt-1">
            <input
              type="number"
              value={referenceNo}
              onChange={(e) => setReferenceNo(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Enter consumer ID"
              className="border border-gray-300 p-2 rounded w-56 h-8"
            />
          </div>
        </div>  
        <div className="w-full p-2 flex justify-center items-center md:justify-start">
          <button
            onClick={handleSearchBtnClick}
            className="flex text-white bg-indigo-500 border-0 py-1 px-4 focus:outline-none hover:bg-indigo-600 rounded text-md"
            disabled={isLoading} // Disable button when loading
          >
            {isLoading ? 'Searching...' : 'Search'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBox;
