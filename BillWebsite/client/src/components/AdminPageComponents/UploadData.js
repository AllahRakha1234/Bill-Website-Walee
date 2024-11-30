import React from "react";

const UploadData = ({handleFileUpload, handleSave}) => {
  return (
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
  );
};

export default UploadData;
