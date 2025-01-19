import React, { useState } from "react";
import { toast } from "react-toastify";

const UploadData = ({
  handleFileUpload,
  handleSave,
  title,
  activeOption,
  resetFileDataState,
}) => {
  const [saveButtonLoading, setSaveButtonLoading] = useState(false);

  // Handle Save Button Click with error handling
  const handleSaveButtonClick = async () => {
    try {
      // Assuming that handleSave will take care of validation
      setSaveButtonLoading(true);
      await handleSave(); // Handle the save logic
      resetFileDataState();
    } catch (err) {
      // Catch any errors (like the "No file data available" error)
      toast.error(err.message || "Failed to save data");
    } finally {
      setSaveButtonLoading(false); // Ensure to turn off the loading state
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-8 w-[90%] md:w-[50%]">
      <h1 className="text-3xl font-bold text-center mb-6 text-indigo-600">
        {title}
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
            href={
              activeOption === "Users Data"
                ? "/UsersUploadData.xlsx"
                : "/OnceConfigureData.xlsx"
            } // Link to the file in public folder
            download={
              activeOption === "Users Data"
                ? "UsersUploadData.xlsx"
                : "OnceConfigureData.xlsx"
            }
            className="bg-indigo-500  text-white px-4 py-2 rounded-md hover:bg-indigo-600"
          >
            Download Sample File
          </a>
        </div>
      </div>

      {/* Save Button with loading state */}
      <button
        onClick={handleSaveButtonClick}
        className={`w-full py-2 px-4 ${
          saveButtonLoading ? "bg-gray-500 cursor-not-allowed" : "bg-indigo-500"
        } text-white font-semibold rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400`}
        disabled={saveButtonLoading}
      >
        {saveButtonLoading ? "Saving..." : "Save"}
      </button>
    </div>
  );
};

export default UploadData;
