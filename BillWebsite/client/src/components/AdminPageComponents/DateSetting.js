import React, { useState, useEffect } from "react";
import axios from "axios";
import dayjs from "dayjs";

const DateSetting = () => {
  const [dateSetting, setDateSetting] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const apiUrl = "http://localhost:3001/api/date-setting";

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

  // Render loading or error state
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-8 w-[90%] md:w-[50%]">
      <h1 className="text-3xl font-bold text-center mb-6 text-indigo-600">
        Date Section
      </h1>
      <div className="grid grid-cols-12 gap-2">
        {dateSetting.map((item) => (
          <div key={item.key} className="mb-4 col-span-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor={item.key}
            >
              {item.key}
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
      <button
        onClick={saveDateSettings}
        className="w-full py-2 px-4 bg-indigo-500 text-white font-semibold rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400"
      >
        Save Settings
      </button>
    </div>
  );
};

export default DateSetting;
