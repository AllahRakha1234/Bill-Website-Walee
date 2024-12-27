import React, { useState, useEffect } from "react";
import axios from "axios";
import Loading from "../Loading";

const FixedSetting = () => {
  const [fixedSettings, setFixedSettings] = useState([]);
  const [loading, setLoading] = useState(true); // Track loading state

  const handleUpdateSetting = (name, newValue) => {
    setFixedSettings((prevSettings) =>
      prevSettings.map((setting) =>
        setting.name === name ? { ...setting, value: parseFloat(newValue) } : setting
      )
    );
  };

  const handleSaveSettings = async () => {
    try {
      const dataToSend = fixedSettings.map(({ name, value }) => ({
        name,
        value,
      }));
      console.log("Saving settings with data:", dataToSend);

      const response = await axios.put(
        `${process.env.REACT_APP_SERVER_URL}/api/fixed-settings`,
        { settings: dataToSend }
      );

      if (response.status === 200) {
        console.log("Settings saved successfully, server response:", response.data);
        alert("Settings saved successfully!");
        window.location.reload();
      } else {
        console.warn("Unexpected response status:", response.status);
      }
    } catch (error) {
      console.error("Error saving settings:", error.response || error.message || error);
      alert("Failed to save settings. Please try again.");
    }
  };

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        console.log("Fetching settings from the server...");
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/fixed-settings`);
        console.log(response);
        if (response.status === 200) {
          console.log("Settings fetched successfully:", response.data);
          setFixedSettings(response.data.settings);
        } else {
          console.warn("Unexpected response status:", response.status);
        }
      } catch (error) {
        console.error("Error fetching settings:", error.response || error.message || error);
        alert("Failed to fetch settings. Please try again.");
      } finally {
        setLoading(false); // Stop loading once data is fetched
      }
    };
    fetchSettings();
  }, []);

  // RETURN LOADING
  if (loading) {
    return <Loading />; // Show loading spinner while data is being fetched
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-8 w-[90%] md:w-[60%]">
      <h1 className="text-3xl font-bold text-center mb-6 text-indigo-600">
        Fixed Charges Section
      </h1>
      <div className="grid grid-cols-12 gap-2">
        {fixedSettings?.map((item) => (
          <div key={item.name} className="mb-4 col-span-3">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor={item.name}
            >
              {item.name}
            </label>
            <input
              type="number"
              id={item.name}
              value={item.value}
              onChange={(e) => handleUpdateSetting(item.name, e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        ))}
      </div>
      <button
        onClick={handleSaveSettings}
        className="w-full py-2 px-4 bg-indigo-500 text-white font-semibold rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400"
      >
        Save Settings
      </button>
    </div>
  );
};

export default FixedSetting;
