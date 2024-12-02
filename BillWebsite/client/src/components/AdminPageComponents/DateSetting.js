import React, { useState } from "react";
import dayjs from "dayjs"; // Install this package for easier date formatting and parsing

const DateSetting = () => {
  const [dateSetting, setDateSetting] = useState([
    { key: "billMonthDate", value: "Aug-2024" },
    { key: "billDueDate", value: "12-08-2024" },
    { key: "billDurationStartDate", value: "02-07-2024" },
    { key: "billDurationEndDate", value: "02-08-2024" },
    { key: "billFPADate", value: "Jun-2024" },
  ]);

  // Helper to convert custom formats to appropriate formats for input fields
  const formatDateForInput = (date, isMonthPicker) => {
    const parsedDate = isMonthPicker
      ? dayjs(date, "MMM-YYYY")
      : dayjs(date, "DD-MM-YYYY");

    // Check if the date is valid, if not return an empty string
    return parsedDate.isValid()
      ? parsedDate.format(isMonthPicker ? "YYYY-MM" : "YYYY-MM-DD")
      : ""; // Empty string for invalid date
  };

  // Helper to format 'YYYY-MM' or 'YYYY-MM-DD' back to the desired custom format
  const formatDateForDisplay = (date, format) => {
    const parsedDate = dayjs(date);
    if (!parsedDate.isValid()) return ""; // Return empty if invalid date
    if (format === "MMM-YYYY") {
      return parsedDate.format("MMM-YYYY");
    }
    return parsedDate.format("DD-MM-YYYY");
  };

  // Update the dateSetting state on input change
  const handleUpdateDateSetting = (key, newValue) => {
    // Convert to the correct format for the input change
    const formattedDate = key === "billMonthDate" || key === "billFPADate"
      ? dayjs(newValue, "YYYY-MM").format("MMM-YYYY")
      : dayjs(newValue, "YYYY-MM-DD").format("DD-MM-YYYY");

    setDateSetting((prevSettings) =>
      prevSettings.map((setting) =>
        setting.key === key
          ? {
              ...setting,
              value: formattedDate,
            }
          : setting
      )
    );
  };

  console.log("dateSetting: ", dateSetting);

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
              type={item.key === "billMonthDate" || item.key === "billFPADate" ? "month" : "date"} // Use "month" input type for billMonthDate
              id={item.key}
              value={formatDateForInput(
                item.value,
                item.key === "billMonthDate" || item.key === "billFPADate" 
              )}
              onChange={(e) =>
                handleUpdateDateSetting(item.key, e.target.value)
              }
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        ))}
      </div>
      <button
        className="w-full py-2 px-4 bg-indigo-500 text-white font-semibold rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400"
      >
        Save Settings
      </button>
    </div>
  );
};

export default DateSetting;
