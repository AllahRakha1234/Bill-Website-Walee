import React, { useState } from "react";
import axios from "axios"; // Import axios
import { useNavigate } from "react-router-dom"; // Import useNavigate hook

const SearchBox = () => {
  const [referenceNo, setReferenceNo] = useState("");

  const navigate = useNavigate(); // Initialize navigate function

  // HANDLE SEARCH BUTTON FUNCTION
  const handleSearchBtnClick = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/api/get-bill-template-data/${referenceNo}`
      );
      if (response.status === 200) {
        localStorage.setItem("referenceNo", JSON.stringify(referenceNo));
        localStorage.setItem("billDetails", JSON.stringify(response.data)); // Store fetched data for `DownloadBillPage`
        navigate("/print"); // Navigate to DownloadBillPage
      }
    } catch (error) {
      if (error.response?.status === 404) {
        alert("Reference No does not exist.");
      } else {
        alert("Error occurred while searching for Meter ID.");
      }
    }
  };

  // RETURN JSX
  return (
    <div className="container mx-auto flex items-center justify-center flex-col mt-10">
      <div className="text-2xl font-semibold mb-3">
        <h2>Walee Bill</h2>
      </div>
      <div className="border border-gray-400 w-[40%] flex flex-col">
        {/* SEARCH BOX HEADER */}
        <div className="text-lg font-semibold mb-2 bg-slate-300 p-2">
          Search Your Electricity Bill
        </div>
        {/* INPUT FIELD FOR USER INPUT*/}
        <div className="flex flex-row p-2">
          <div className="px-2 pt-1">
            <input
              type="text"
              value={referenceNo}
              onChange={(e) => setReferenceNo(e.target.value)}
              placeholder="Enter your consumer ID"
              className="border border-gray-300 p-2 rounded w-96"
            />
          </div>
        </div>
        {/* SEARCH BUTTON */}
        <div className="p-2">
          <button
            onClick={handleSearchBtnClick}
            className="flex text-white bg-indigo-500 border-0 py-1 px-4 focus:outline-none hover:bg-indigo-600 rounded text-md"
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBox;
