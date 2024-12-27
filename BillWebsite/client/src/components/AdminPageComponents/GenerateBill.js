import React, { useState, useEffect } from "react";
import axios from "axios";
import dayjs from "dayjs";
import UploadData from "./UploadData";
import Loading from '../Loading';

const GenerateBill = ({ handleMonthlyUploadFileUpload, handleSave }) => {
  const [dateSetting, setDateSetting] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const apiUrl = `${process.env.REACT_APP_SERVER_URL}/api/date-setting`

  // Fetch date settings from the backend
  useEffect(() => {
    const fetchDateSettings = async () => {
      try {
        const response = await axios.get(apiUrl);
        const fetchedSettings = response.data.dateSettings;
        // console.log("fetchedSettings: ", fetchedSettings); // Debugging log
        setDateSetting(fetchedSettings);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch date settings");
        setLoading(false);
      }
    };

    fetchDateSettings();
  }, []);

  // Handle input change
  const handleUpdateDateSetting = (key, newValue) => {
    setDateSetting((prevSettings) =>
      prevSettings.map((setting) =>
        setting.key === key ? { ...setting, value: newValue } : setting
      )
    );
  };

  // Convert values to the correct format for the backend
  const prepareDateSettingsForBackend = () => {
    return dateSetting.map((setting) => {
      if (setting.key === "billMonthDate" || setting.key === "billFPADate") {
        // Convert YYYY-MM to MMM-YYYY
        return {
          key: setting.key,
          value: dayjs(setting.value, "YYYY-MM").isValid()
            ? dayjs(setting.value, "YYYY-MM").format("MMM-YYYY")
            : "",
        };
      }
      return setting; // Keep other formats unchanged
    });
  };

  // Save updated date settings to the backend
  const saveDateSettings = async () => {
    try {
      const updatedSettings = prepareDateSettingsForBackend();
      console.log("dateSetting inside update function: ", updatedSettings); // Debugging log
      await axios.put(apiUrl, { dateSettings: updatedSettings });
      alert("Date settings updated successfully");
      window.location.reload(); // Reload the page to fetch updated values
    } catch (err) {
      setError("Failed to update date settings");
    }
  };

  // Handle Generate Button Click Function
  // Handle Generate Button Click Function
  const handleGenerateButton = async () => {
    try {
      const updatedSettings = prepareDateSettingsForBackend();

      // Update date settings in the backend
      await axios.put(apiUrl, { dateSettings: updatedSettings });
      //   alert("Date settings updated successfully");

      // Call handleSave to save the file data
      await handleSave();

      alert("Bill generated Successfully!");
      // Optionally reload the page to fetch updated values
      //   window.location.reload();
    } catch (err) {
      setError("Failed to update date settings");
    }
  };

  // Formatting Key Function
  const formatKey = (key) => {
    return key
      .replace(/([A-Z])/g, " $1") // Insert a space before each uppercase letter
      .replace(/^./, (str) => str.toUpperCase()); // Capitalize the first letter
  };

  // Render loading or error state
  if (loading) {
    return <Loading/>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  // RETURN JSX
  return (
    <div className="bg-white shadow-md rounded-lg p-8 w-[90%] md:w-[60%]">
      <h1 className="text-3xl font-bold text-center mb-4 text-indigo-600">
        Bill Generate Section
      </h1>
      {/* Date Section */}
      <p className="text-2xl font-semibold text-indigo-600 my-2">
        {" "}
        Date Section
      </p>
      <div className="grid grid-cols-12 gap-2">
        {dateSetting.map((item) => (
          <div key={item.key} className="mb-4 col-span-6 md:col-span-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2 capitalize"
              htmlFor={item.key}
            >
              {item.key == "billFPADate"
                ? "Bill FPA Date"
                : formatKey(item.key)}
            </label>
            <input
              type={
                item.key === "billMonthDate" || item.key === "billFPADate"
                  ? "month"
                  : "date"
              }
              id={item.key}
              value={
                item.key === "billMonthDate" || item.key === "billFPADate"
                  ? dayjs(item.value, "MMM-YYYY").isValid()
                    ? dayjs(item.value, "MMM-YYYY").format("YYYY-MM")
                    : ""
                  : dayjs(item.value, "DD-MM-YYYY").isValid()
                  ? dayjs(item.value, "DD-MM-YYYY").format("YYYY-MM-DD")
                  : ""
              }
              onChange={(e) =>
                handleUpdateDateSetting(item.key, e.target.value)
              }
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        ))}
      </div>

      {/* File Upload Section */}
      <p className="text-2xl font-semibold text-indigo-600 my-2">
        {" "}
        File Upload Section
      </p>
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
            onChange={handleMonthlyUploadFileUpload}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Download Sample Button */}
        <div className="mt-6">
          <a
            href="/MonthlyUploadData.xlsx" // Link to the file in public folder
            download="MonthlyUploadData.xlsx"
            className="bg-indigo-500  text-white px-4 py-2 rounded-md hover:bg-indigo-600"
          >
            Download Sample File
          </a>
        </div>
      </div>

      {/* <button
        onClick={saveDateSettings}
        className="w-full py-2 px-4 bg-indigo-500 text-white font-semibold rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400"
      >
        Save Settings
      </button> */}
      <button
        onClick={handleGenerateButton}
        className="w-full py-2 px-4 bg-indigo-500 text-white font-semibold rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400"
      >
        Generate Bill
      </button>
    </div>
  );
};

export default GenerateBill;
