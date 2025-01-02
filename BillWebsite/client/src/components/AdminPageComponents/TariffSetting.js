import React, { useState, useEffect } from "react";
import axios from "axios";
import Loading from "../Loading";

const TariffSetting = ({ activeSubOption }) => {
  const [tariffSettings, setTariffSettings] = useState([]);
  const [loading, setLoading] = useState(true); // Track loading state

  // Update a specific setting's value in local state
  const handleUpdateSetting = (name, newValue) => {
    setTariffSettings((prevSettings) =>
      prevSettings.map((setting) =>
        setting.name === name
          ? { ...setting, value: parseFloat(newValue) }
          : setting
      )
    );
  };

  // Function to save updated settings to the backend
  const handleSaveSettings = async () => {
    // Validate values before saving
    const invalidSettings = tariffSettings.filter(({ value }) => value <= 0);

    if (invalidSettings.length > 0) {
      alert("All values must be greater than 0.");
      return; // Stop execution if there are invalid values
    }
    try {
      // Prepare data to send to backend
      const residentailTariffValues = tariffSettings.map(({ name, value }) => ({
        name,
        value,
      }));

      // Send data to backend API
      const response = await axios.put(
        `${process.env.REACT_APP_SERVER_URL}/api/resid-tariff-values`,
        { residentailTariffValues: residentailTariffValues }
      );

      // Confirm save to the user
      if (response.status === 200) {
        alert("Tariff Settings saved successfully!");
        window.location.reload();
      }
    } catch (error) {
      console.error("Error saving tariff settings:", error);
      alert("Failed to save tariff settings. Please try again.");
    }
  };

  // Function to fetch settings from the backend
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/api/resid-tariff-values`
        );
        if (response.status === 200) {
          setTariffSettings(response.data.residentailTariffValues);
        }
      } catch (error) {
        console.error("Error fetching settings:", error);
        alert("Failed to fetch settings. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []); // Removed tariffSettings from dependency array to prevent re-fetching

  // RETURN LOADING
  if (loading) {
    return <Loading />; // Show loading spinner while data is being fetched
  }

  // RETURN JSX
  return (
    <div className="bg-white shadow-md rounded-lg p-8 w-[90%] md:w-[50%]">
      <h1 className="text-3xl font-bold text-center mb-6 text-indigo-600">
        Tariff Section
      </h1>
      <div className="grid grid-cols-10 gap-2">
        {tariffSettings?.map((item) => (
          <div key={item.name} className="mb-4 col-span-5">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor={item.name}
            >
              {item.name === "peakValue" ? "Peak Value" : "Off Peak Value"}
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

export default TariffSetting;
