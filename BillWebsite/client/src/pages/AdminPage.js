import React, { useState } from "react";
import Papa from "papaparse";
import axios from "axios";
import * as XLSX from "xlsx"; // Import the xlsx library
import { useNavigate } from "react-router-dom";
import FixedSetting from "../components/AdminPageComponents/FixedSetting";
import UploadData from "../components/AdminPageComponents/UploadData";
import TariffSetting from "./../components/AdminPageComponents/TariffSetting";
import DateSetting from "./../components/AdminPageComponents/DateSetting";
import UsersData from "./../components/AdminPageComponents/UsersData";
import ProtectedTariffSetting from "./../components/AdminPageComponents/ProtectedTariffSetting";

// VALIDATION FUNCTION
const validateColumns = (fileData, expectedColumns) => {
  const fileColumns = Object.keys(fileData[0]); // Get column names from the first row

  const missingColumns = expectedColumns.filter(
    (col) => !fileColumns.includes(col)
  );
  const extraColumns = fileColumns.filter(
    (col) => !expectedColumns.includes(col)
  );

  return { missingColumns, extraColumns };
};

// MAIN ADMINPAGE
const AdminPage = () => {
  // USESTATES AND OTHER
  const [fileData, setFileData] = useState([]);
  const [activeOption, setActiveOption] = useState("welcome"); // Set the default active option to be shown on the page when the admin page opens like "Once Upload Data"
  const [activeSubOption, setActiveSubOption] = useState(null);
  const [onceOrMonthlyOption, setOnceOrMonthlyOption] = useState("");
  const navigate = useNavigate();

  // EXPECTED COLUMN NAMES OF THE FILE UPLOAD
  const expectedUserColumns = [
    "userId",
    "name",
    "location",
    "tariffCategory",
    "phase",
    "meterType",
  ];
  const expectedMonthlyUploadColumns = [
    "userId",
    "present_peak_reading",
    "present_off_peak_reading",
  ];
  const expectedOnceUploadColumns = [
    "userId",
    "previous_peak_1",
    "previous_off_peak_1",
    "previous_peak_2",
    "previous_off_peak_2",
    "previous_peak_3",
    "previous_off_peak_3",
    "previous_peak_4",
    "previous_off_peak_4",
    "previous_peak_5",
    "previous_off_peak_5",
    "previous_peak_6",
    "previous_off_peak_6",
    "previous_peak_7",
    "previous_off_peak_7",
    "previous_peak_8",
    "previous_off_peak_8",
    "previous_peak_9",
    "previous_off_peak_9",
    "previous_peak_10",
    "previous_off_peak_10",
    "previous_peak_11",
    "previous_off_peak_11",
    "previous_peak_12",
    "previous_off_peak_12",
  ];

  // HANDLE FILE UPLOAD FUNCTION
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

  // HANDLE SAVE FILE FUNCTION
  const handleSave = async () => {
    if (fileData.length > 0) {
      //VALIDATING DATA BEFORE SENDING TO BACKEND
      let expectedColumns = [];
      // Determine expected columns based on file type
      if (activeOption === "Users Data") {
        expectedColumns = expectedUserColumns;
      } else if (activeOption === "Once Upload Data") {
        expectedColumns = expectedOnceUploadColumns;
      } else if (activeOption === "Monthly Upload Data") {
        expectedColumns = expectedMonthlyUploadColumns;
      }

      // Validate columns before saving
      const validation = validateColumns(fileData, expectedColumns);
      if (validation.missingColumns.length || validation.extraColumns.length) {
        alert(
          `Column mismatch! Missing: ${validation.missingColumns.join(
            ", "
          )}, Extra: ${validation.extraColumns.join(", ")}`
        );
        return;
      }

      // SENDING DATA TO BACKEND
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
        } else if (
          activeOption === "Users Data" &&
          activeSubOption === "Upload Users Data"
        ) {
          console.log("Inside Users Upload Data");
          response = await axios.post(
            "http://localhost:3001/api/user-info",
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
                activeOption === "Tariff" ? "bg-indigo-500" : ""
              }`}
              onClick={() => setActiveOption("Tariff")}
            >
              Tariff
            </button>
            {activeOption === "Tariff" && (
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
                activeOption === "Protected Tariff" ? "bg-indigo-500" : ""
              }`}
              onClick={() => setActiveOption("Protected Tariff")}
            >
              Protected Tariff
            </button>
            {activeOption === "Protected Tariff" && (
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

          {/* New Option - Date Setting */}
          <button
            className={`text-left p-2 rounded-md mb-2 ${
              activeOption === "Date Setting" ? "bg-indigo-500" : ""
            }`}
            onClick={() => {
              setActiveOption("Date Setting");
              setActiveSubOption(null);
            }}
          >
            Date Setting
          </button>

          {/* New Option - Once Upload Data */}
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

          {/* Users Data Section */}
          <div className="relative mb-2">
            <button
              className={`text-left p-2 rounded-md w-full ${
                activeOption === "Users Data" ? "bg-indigo-500" : ""
              }`}
              onClick={() => setActiveOption("Users Data")}
            >
              Users Data
            </button>
            {activeOption === "Users Data" && (
              <div className="pl-4">
                <button
                  className={`text-left p-2 rounded-md mb-2 w-full ${
                    activeSubOption === "View Users Data" ? "bg-indigo-400" : ""
                  }`}
                  onClick={() => setActiveSubOption("View Users Data")}
                >
                  View Data
                </button>
                <button
                  className={`text-left p-2 rounded-md mb-2 w-full ${
                    activeSubOption === "Upload Users Data"
                      ? "bg-indigo-400"
                      : ""
                  }`}
                  onClick={() => setActiveSubOption("Upload Users Data")}
                >
                  Upload Data
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* MAIN CONTENT PORTION */}
      <div className="w-3/4 h-full flex flex-col justify-center items-center bg-gray-100">
        {activeOption === "welcome" && (
          <div className="bg-white shadow-md shadow-indigo-500 rounded-lg p-4 mb-36">
            <h1 className="text-3xl font-bold text-center text-indigo-600">
              Welcome to Admin Section
            </h1>
          </div>
        )}

        {/* Once Upload Data Section */}
        {activeOption === "Once Upload Data" && (
          <UploadData
            handleFileUpload={handleFileUpload}
            handleSave={handleSave}
            title={"Once Upload Data Section"}
          />
        )}

        {/* Monthly Upload Data Section */}
        {activeOption === "Monthly Upload Data" && (
          <UploadData
            handleFileUpload={handleFileUpload}
            handleSave={handleSave}
            title={"Monthly Upload Data Section"}
          />
        )}

        {/* Tariff Section */}
        {(activeSubOption === "Residential" ||
          activeSubOption === "Industrial" ||
          activeSubOption === "Commercial") && (
          <TariffSetting activeSubOption={activeSubOption} />
        )}

        {/* Protected Tariff Section */}
        {(activeSubOption === "Residential Protected" ||
          activeSubOption === "Industrial Protected" ||
          activeSubOption === "Commercial Protected") && (
          <ProtectedTariffSetting activeOption={activeOption} />
        )}

        {/* Fixed Setting Section */}
        {activeOption === "Fixed Setting" && <FixedSetting />}

        {/* Date Setting Section */}
        {activeOption === "Date Setting" && <DateSetting />}

        {/* User Data Section */}
        {activeSubOption === "View Users Data" && <UsersData />}
        {activeSubOption === "Upload Users Data" && (
          <UploadData
            handleFileUpload={handleFileUpload}
            handleSave={handleSave}
          />
        )}
      </div>
    </div>
  );
};

export default AdminPage;
