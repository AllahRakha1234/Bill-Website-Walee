import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook


const SearchBox = () => {
  const [radioValue, setRadioValue] = useState("reference-no");
  const [selectedOption, setSelectedOption] = useState("");
  const [referenceNo, setReferenceNo] = useState("");
  const [referenceNoFlag, setReferenceNoFlag] = useState(true);

  const navigate = useNavigate(); // Initialize navigate function

  const handleRadioChange = (event) => {
    setRadioValue(event.target.value);
    setReferenceNoFlag(event.target.value === "reference-no");
  };

  const handleCheckBoxChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleSearchBtnClick = () => {
    if(referenceNo === "12345678912345") {
      navigate("/print"); // Navigate to /print URL
    } else {
      alert("Reference No does not Exist.");
    }
    setReferenceNo("");
  };

  return (
    <div className="container mx-auto flex items-center justify-center flex-col mt-10">
      <div className="text-2xl font-semibold mb-3">
        <h2>Walee Bill</h2>
      </div>
      <div className="border border-gray-400 w-[60%] flex flex-col">
        {/* SEARCH BOX HEADER */}
        <div className="text-lg font-semibold mb-2 bg-slate-300 p-2">
          Search Your Electricity Bill
        </div>
        {/* CHECK BOXES */}
        <div className="flex flex-row p-2">
          <div>
            <div className="flex items-center">
              <input
                type="radio"
                id="reference-no-radio"
                name="filter-option"
                value="reference-no"
                checked={radioValue === "reference-no"}
                onChange={handleRadioChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded-full"
              />
              <label htmlFor="reference-no-radio" className="ml-2 text-gray-700">
                Reference No
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="customer-id-radio"
                name="filter-option"
                value="customer-id"
                checked={radioValue === "customer-id"}
                onChange={handleRadioChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded-full"
              />
              <label htmlFor="customer-id-radio" className="ml-2 text-gray-700">
                Customer ID
              </label>
            </div>
          </div>
          {/* REFERENCE NO / CUSTOMER ID INPUT FIELD */}
          <div className="px-2 pt-1">
            <input
              type="text"
              value={referenceNo}
              onChange={(e) => setReferenceNo(e.target.value)}
              placeholder={referenceNoFlag ? "Enter 14-digit valid Reference No" : "Enter 10-digit valid Customer ID"}
              className="border border-gray-300 p-2 rounded w-96"
            />
          </div>
          {/* DROPDOWN LIST */}
          {referenceNoFlag && (
            <div>
              <select
                id="dropdown"
                value={selectedOption}
                onChange={handleCheckBoxChange}
                className="h-10 w-10 mt-1 block border border-gray-400 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              >
                <option value="U">U</option>
                <option value="R">R</option>
              </select>
            </div>
          )}
        </div>
        {/* SEARCH BUTTON */}
        <div className="p-2">
          <button onClick={handleSearchBtnClick} className="flex text-white bg-indigo-500 border-0 py-1 px-4 focus:outline-none hover:bg-indigo-600 rounded text-md">
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBox;