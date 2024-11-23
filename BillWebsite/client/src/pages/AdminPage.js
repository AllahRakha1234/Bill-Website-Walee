import React, { useState } from "react";
import Papa from "papaparse";
import axios from "axios";
import * as XLSX from "xlsx"; // Import the xlsx library
import { useNavigate } from "react-router-dom";
import FixedSetting from "../components/AdminPageComponents/FixedSetting";

const AdminPage = () => {
  const [fileData, setFileData] = useState([]);
  const [activeOption, setActiveOption] = useState(""); // Set the default active option to be shown on the page when the admin page opens like "Once Upload Data"
  const [activeSubOption, setActiveSubOption] = useState(null);
  const [onceOrMonthlyOption, setOnceOrMonthlyOption] = useState("");
  const navigate = useNavigate();

  const handleFileUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      const fileType = file.name.split(".").pop().toLowerCase();
      const validFileTypes = ["csv", "xlsx"]; // Allowed file types

      if (!validFileTypes.includes(fileType)) {
        alert("Invalid file type! Please upload a CSV or Excel (.xlsx) file.");
        return;
      }

      if (fileType === "csv") {
        Papa.parse(file, {
          header: true,
          complete: (result) => {
            setFileData(result.data);
          },
          error: (error) => {
            console.error("Error parsing CSV:", error);
          },
        });
      } else if (fileType === "xlsx") {
        const reader = new FileReader();
        reader.onload = (e) => {
          const data = new Uint8Array(e.target.result);
          const workbook = XLSX.read(data, { type: "array" });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const parsedData = XLSX.utils.sheet_to_json(worksheet);
          setFileData(parsedData);
        };
        reader.readAsArrayBuffer(file);
      }
    }
  };

  const handleSave = async () => {
    if (fileData.length > 0) {
      try {
        // Send the data to the backend using axios
        let response = null;
        if (activeOption === "Monthly Upload Data") {
          response = await axios.post(
            "http://localhost:3001/api/meter-info",
            fileData
          );
        } else if (activeOption === "Once Upload Data") {
          console.log("Inside Monthly Upload Data");
          response = await axios.post(
            "http://localhost:3001/api/upload-once-bill-data",
            fileData
          );
        }

        if (response.status === 200) {
          console.log("Data saved successfully:", fileData);
          alert("Data saved successfully!");
          window.location.reload();
        } else {
          console.error("Failed to save data:", response);
          alert("Error saving data. Please try again.");
        }
      } catch (error) {
        console.error("Error saving data:", error);
        alert("Error saving data. Please try again.");
      }
    } else {
      alert("No data found! Please upload a file first.");
    }
  };

  // RETURN JSX CODE
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-1/4 bg-indigo-700 text-white flex flex-col">
        <div className="p-6 text-2xl font-bold border-b border-indigo-500">
          Admin Menu
        </div>
        <div className="flex flex-col p-4">
          <div className="relative mb-2">
            <button
              className={`text-left p-2 rounded-md w-full ${
                activeOption === "Terif" ? "bg-indigo-500" : ""
              }`}
              onClick={() => setActiveOption("Terif")}
            >
              Tariff
            </button>
            {activeOption === "Terif" && (
              <div className="pl-4">
                <button
                  className={`text-left p-2 rounded-md mb-2 w-full ${
                    activeSubOption === "Residential" ? "bg-indigo-400" : ""
                  }`}
                  onClick={() => setActiveSubOption("Residential")}
                >
                  Residential
                </button>
                <button
                  className={`text-left p-2 rounded-md mb-2 w-full ${
                    activeSubOption === "Industrial" ? "bg-indigo-400" : ""
                  }`}
                  onClick={() => setActiveSubOption("Industrial")}
                >
                  Industrial
                </button>
                <button
                  className={`text-left p-2 rounded-md mb-2 w-full ${
                    activeSubOption === "Commercial" ? "bg-indigo-400" : ""
                  }`}
                  onClick={() => setActiveSubOption("Commercial")}
                >
                  Commercial
                </button>
              </div>
            )}
          </div>
          {/* Protected Terrif Section */}
          <div className="relative mb-2">
            <button
              className={`text-left p-2 rounded-md w-full ${
                activeOption === "Protected Terif" ? "bg-indigo-500" : ""
              }`}
              onClick={() => setActiveOption("Protected Terif")}
            >
              Protected Terif
            </button>
            {activeOption === "Protected Terif" && (
              <div className="pl-4">
                <button
                  className={`text-left p-2 rounded-md mb-2 w-full ${
                    activeSubOption === "Residential Protected"
                      ? "bg-indigo-400"
                      : ""
                  }`}
                  onClick={() => setActiveSubOption("Residential Protected")}
                >
                  Residential
                </button>
                <button
                  className={`text-left p-2 rounded-md mb-2 w-full ${
                    activeSubOption === "Industrial Protected"
                      ? "bg-indigo-400"
                      : ""
                  }`}
                  onClick={() => setActiveSubOption("Industrial Protected")}
                >
                  Industrial
                </button>
                <button
                  className={`text-left p-2 rounded-md mb-2 w-full ${
                    activeSubOption === "Commercial Protected"
                      ? "bg-indigo-400"
                      : ""
                  }`}
                  onClick={() => setActiveSubOption("Commercial Protected")}
                >
                  Commercial
                </button>
              </div>
            )}
          </div>
          {/* New Option - Upload Data */}
          <button
            className={`text-left p-2 rounded-md mb-2 ${
              activeOption === "Once Upload Data" ? "bg-indigo-500" : ""
            }`}
            onClick={() => {
              setActiveOption("Once Upload Data");
              setActiveSubOption(null);
            }}
          >
            Once Upload Data
          </button>

          {/* New Option - Monthly Upload Data */}
          <button
            className={`text-left p-2 rounded-md mb-2 ${
              activeOption === "Monthly Upload Data" ? "bg-indigo-500" : ""
            }`}
            onClick={() => {
              setActiveOption("Monthly Upload Data");
              setActiveSubOption(null);
            }}
          >
            Monthly Upload Data
          </button>

          {/* New Option - Fixed Setting */}
          <button
            className={`text-left p-2 rounded-md mb-2 ${
              activeOption === "Fixed Setting" ? "bg-indigo-500" : ""
            }`}
            onClick={() => {
              setActiveOption("Fixed Setting");
              setActiveSubOption(null);
            }}
          >
            Fixed Setting
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-3/4 h-full flex flex-col justify-center items-center bg-gray-100">
        {/* Once Upload Data Section */}
        {activeOption === "Once Upload Data" && (
          <div className="bg-white shadow-md rounded-lg p-8 w-[90%] md:w-[50%]">
            <h1 className="text-3xl font-bold text-center mb-6 text-indigo-600">
              Admin Section
            </h1>

            {/* File Upload and Download Button Row */}
            <div className="mb-4 flex justify-between items-center">
              <div className="flex-1 mr-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="file-upload"
                >
                  Upload CSV/Excel File
                </label>
                <input
                  type="file"
                  id="file-upload"
                  accept=".csv, .xlsx"
                  onChange={handleFileUpload}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Download Sample Button */}
              <div className="mt-6">
                <a
                  href="/SampleFile.csv" // Link to the file in public folder
                  download="SampleFile.csv"
                  className="bg-indigo-500  text-white px-4 py-2 rounded-md hover:bg-indigo-600"
                >
                  Download Sample File
                </a>
              </div>
            </div>

            {/* Save Button */}
            <button
              onClick={handleSave}
              className="w-full py-2 px-4 bg-indigo-500 text-white font-semibold rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
              Save
            </button>
          </div>
        )}

        {/* Monthly Upload Data Section */}
        {activeOption === "Monthly Upload Data" && (
          <div className="bg-white shadow-md rounded-lg p-8 w-[90%] md:w-[50%]">
            <h1 className="text-3xl font-bold text-center mb-6 text-indigo-600">
              Admin Section
            </h1>

            {/* File Upload and Download Button Row */}
            <div className="mb-4 flex justify-between items-center">
              <div className="flex-1 mr-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="file-upload"
                >
                  Upload CSV/Excel File
                </label>
                <input
                  type="file"
                  id="file-upload"
                  accept=".csv, .xlsx"
                  onChange={handleFileUpload}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Download Sample Button */}
              <div className="mt-6">
                <a
                  href="/SampleFile.csv" // Link to the file in public folder
                  download="SampleFile.csv"
                  className="bg-indigo-500  text-white px-4 py-2 rounded-md hover:bg-indigo-600"
                >
                  Download Sample File
                </a>
              </div>
            </div>

            {/* Save Button */}
            <button
              onClick={handleSave}
              className="w-full py-2 px-4 bg-indigo-500 text-white font-semibold rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
              Save
            </button>
          </div>
        )}

        {(activeSubOption === "Residential" ||
          activeSubOption === "Industrial" ||
          activeSubOption === "Commercial") && (
          <div className="bg-white shadow-md rounded-lg p-8 w-[90%] md:w-[50%]">
            <h1 className="text-3xl font-bold text-center mb-6 text-indigo-600">
              {activeSubOption} Terif Section
            </h1>
            <form>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="tariff-rate"
                >
                  Tariff Rate
                </label>
                <input
                  type="text"
                  id="tariff-rate"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="tariff-description"
                >
                  Description
                </label>
                <input
                  type="text"
                  id="tariff-description"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 px-4 bg-indigo-500 text-white font-semibold rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              >
                Update
              </button>
            </form>
          </div>
        )}
        {(activeSubOption === "Residential Protected" ||
          activeSubOption === "Industrial Protected" ||
          activeSubOption === "Commercial Protected") && (
          <div className="bg-white shadow-md rounded-lg p-8 w-[90%] md:w-[50%]">
            <h1 className="text-3xl font-bold text-center mb-6 text-indigo-600">
              {activeSubOption} Protected Terif Section
            </h1>
            <form>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="tariff-rate"
                >
                  Tariff Rate
                </label>
                <input
                  type="text"
                  id="tariff-rate"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="tariff-description"
                >
                  Description
                </label>
                <input
                  type="text"
                  id="tariff-description"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 px-4 bg-indigo-500 text-white font-semibold rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              >
                Update
              </button>
            </form>
          </div>
        )}
        {activeOption === "Fixed Setting" && <FixedSetting />}
      </div>
    </div>
  );
};

export default AdminPage;
