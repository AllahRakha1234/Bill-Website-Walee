import React, { useState } from 'react';
import Papa from 'papaparse';
import * as XLSX from 'xlsx'; // Import the xlsx library

const AdminPage = () => {
  const [fileData, setFileData] = useState([]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      // Get the file extension
      const fileType = file.name.split('.').pop().toLowerCase();
      const validFileTypes = ['csv', 'xlsx']; // Allowed file types

      if (!validFileTypes.includes(fileType)) {
        alert("Invalid file type! Please upload a CSV or Excel (.xlsx) file.");
        return;
      }

      // Parse CSV file
      if (fileType === 'csv') {
        Papa.parse(file, {
          header: true,
          complete: (result) => {
            // console.log(result.data, typeof(result.data)); // Parsed data from CSV
            setFileData(result.data); // Store the data in state
            localStorage.setItem('bills', JSON.stringify(result.data)); // Store in local storage
          },
          error: (error) => {
            console.error("Error parsing CSV:", error);
          }
        });
      } 
      // Parse Excel (.xlsx) file
      else if (fileType === 'xlsx') {
        const reader = new FileReader();
        reader.onload = (e) => {
          const data = new Uint8Array(e.target.result);
          const workbook = XLSX.read(data, { type: 'array' });
          const sheetName = workbook.SheetNames[0]; // Get the first sheet
          const worksheet = workbook.Sheets[sheetName];
          const parsedData = XLSX.utils.sheet_to_json(worksheet); // Convert to JSON
          setFileData(parsedData); // Store Excel data in state
          localStorage.setItem('bills', JSON.stringify(parsedData)); // Store in local storage
        };
        reader.readAsArrayBuffer(file);
      }
    }
  };

  const handleSave = () => {
    console.log("Saving file data", fileData);
    // You can send the fileData to the backend or use it as needed
  };

  // Function to retrieve data from local storage
  // const getDataFromLocalStorage = () => {
  //   const storedData = localStorage.getItem('fileData');
  //   if (storedData) {
  //     const parsedData = JSON.parse(storedData);
  //     console.log("Retrieved data:", parsedData);
  //     // You can set this data to a state variable if needed
  //   }
  // };

  return (
    <div className="h-[80vh] flex flex-col justify-center items-center bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 w-[90%] md:w-[50%]">
        <h1 className="text-3xl font-bold text-center mb-6 text-indigo-600">Admin Section</h1>

        {/* File Upload Input */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="file-upload">
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

        {/* Save Button */}
        <button
          onClick={handleSave}
          className="w-full py-2 px-4 bg-indigo-500 text-white font-semibold rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        >
          Save
        </button>

        {/* Button to retrieve data for testing */}
        {/* <button
          onClick={getDataFromLocalStorage}
          className="mt-4 w-full py-2 px-4 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
        >
          Retrieve Data
        </button> */}
      </div>
    </div>
  );
};

export default AdminPage;
