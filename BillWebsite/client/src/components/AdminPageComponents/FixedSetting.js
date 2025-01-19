import React, { useState, useEffect } from "react";
import axios from "axios";
import Loading from "../Loading";
import { toast } from "react-toastify";

const FixedSetting = () => {
  const [fixedSettings, setFixedSettings] = useState([]);
  const [loading, setLoading] = useState(true); // Track loading state
  const [saveButtonLoading, setSaveButtonLoading] = useState(false); // Track save button loading state

  const handleUpdateSetting = (name, newValue) => {
    setFixedSettings((prevSettings) =>
      prevSettings.map((setting) =>
        setting.name === name
          ? { ...setting, value: parseFloat(newValue) }
          : setting
      )
    );
  };

  const handleSaveSettings = async () => {
    try {


      setSaveButtonLoading(true); // Start loading
      // Prepare data to send to backend
      const dataToSend = fixedSettings.map(({ name, value }) => ({
        name,
        value,
      }));

      const response = await axios.put(
        `${process.env.REACT_APP_SERVER_URL}/api/fixed-settings`,
        { settings: dataToSend }
      );

      // Confirm save to the user
      if (response.status === 200) {
        toast.success("Fixed Settings saved successfully!");
      }
    } catch (error) {
      toast.error("Failed to save fixed settings. Please try again.");
    } finally {
      setSaveButtonLoading(false); // Ensure to turn off the loading state
    }
  };

  // Function to fetch settings from the backend
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/api/fixed-settings`
        );
        if (response.status === 200) {
          setFixedSettings(response.data.settings);
        }
      } catch (error) {
        toast.error("Failed to fetch settings. Please try again.");
      } finally {
        setLoading(false);
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
        {saveButtonLoading ? "Saving..." : "Save Settings"}
      </button>
    </div>
  );
};

export default FixedSetting;
