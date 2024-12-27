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
        `${process.env.REACT_APP_SERVER_URL}/api/get-bill-template-data/${referenceNo}`
      );
      if (response.status === 200) {
        localStorage.setItem("referenceNo", JSON.stringify(referenceNo));
        localStorage.setItem("billDetails", JSON.stringify(response.data)); // Store fetched data for `DownloadBillPage`
        navigate("/print"); // Navigate to DownloadBillPage
      }
    } catch (error) {
      if (error.response?.status === 404) {
        alert("Consumber ID does not exist.");
      } else {
        alert("Error occurred while searching for Meter ID.");
      }
    }
  };


  // RETURN JSX
  return (
    <div className="container mx-auto flex items-center justify-center flex-col mt-20">
      <div className="text-2xl font-semibold mb-3">
        <h2>NUST Bill</h2>
      </div>
      <div className="border border-gray-400 w-[35%] flex flex-col">
        {/* SEARCH BOX HEADER */}
        <div className="text-lg font-semibold mb-2 bg-slate-300 p-2">
          Search Electricity Bill
        </div>
        {/* INPUT FIELD FOR USER INPUT*/}
        <div className="flex flex-row items-center justify-center p-2">
          <div>
            <h3 className="font-semibold text-blue-800">NUST/RESIDENT/</h3>
          </div>
          <div className="px-2 pt-1">
            <input
              type="number"
              value={referenceNo}
              onChange={(e) => {
                const value = e.target.value;
                // Allow only positive numbers
                // if (value === "" || /^[1-9]+$/.test(value)) {
                //   setReferenceNo(value);
                // }
                setReferenceNo(value);

              }}
              placeholder="Enter consumer ID"
              className="border border-gray-300 p-2 rounded w-56 h-8"
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
