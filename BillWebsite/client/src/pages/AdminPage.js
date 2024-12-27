import React, { useState } from "react";
import Papa from "papaparse";
import axios from "axios";
import * as XLSX from "xlsx"; // Import the xlsx library
// import { useNavigate } from "react-router-dom";
import FixedSetting from "../components/AdminPageComponents/FixedSetting";
import UploadData from "../components/AdminPageComponents/UploadData";
import TariffSetting from "./../components/AdminPageComponents/TariffSetting";
import UsersData from "./../components/AdminPageComponents/UsersData";
import ProtectedTariffSetting from "./../components/AdminPageComponents/ProtectedTariffSetting";
import GenerateBill from "./../components/AdminPageComponents/GenerateBill";
import { FiUser, FiFileText, FiUsers, FiSettings, FiUpload, FiEye } from "react-icons/fi";
import { MdOutlinePriceChange } from "react-icons/md";
import { BiShieldQuarter } from "react-icons/bi";
import { RiPriceTag3Line } from "react-icons/ri";
import { HiAdjustments } from "react-icons/hi";
import { AiOutlineCloudDownload } from "react-icons/ai";

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
  const [configurationSubOption, setConfigurationSubOption] = useState(null);

  // EXPECTED COLUMN NAMES OF THE FILE UPLOAD
  const expectedUserColumns = [
    "userId",
    "name",
    "location",
    "tariffCategory",
    "phase",
    "meterType",
  ];

  const expectedMonthlyUploadDataColumns = [
    "userId",
    "present_peak_reading",
    "present_off_peak_reading",
  ];

  // HANDLE ONCE UPLOAD DATA FILE FUNCTION
  const handleFileUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      const fileType = file.name.split(".").pop().toLowerCase();
      const validFileTypes = ["csv", "xlsx"]; // Allowed file types

      if (!validFileTypes.includes(fileType)) {
        alert("Invalid file type! Please upload a CSV or Excel (.xlsx) file.");
        return;
      }

      // Define expected columns for 13 months
      const generateExpectedColumns = () => {
        const baseColumns = ["userId"];
        for (let i = 1; i <= 14; i++) {
          baseColumns.push(
            `previous_peak_${i}`,
            `previous_off_peak_${i}`,
            `month_${i}`,
            `payment_${i}`,
            `bill_${i}`
          );
        }
        return baseColumns;
      };

      const expectedColumns = generateExpectedColumns();

      const validateColumns = (parsedData) => {
        const fileColumns = Object.keys(parsedData[0]);
        // console.log("File Columns:", fileColumns); // Log actual columns
        // console.log("Expected Columns:", expectedColumns); // Log expected columns

        const missingColumns = expectedColumns.filter(
          (col) => !fileColumns.includes(col)
        );
        const extraColumns = fileColumns.filter(
          (col) => !expectedColumns.includes(col)
        );

        return {
          isValid: missingColumns.length === 0 && extraColumns.length === 0,
          missingColumns,
          extraColumns,
        };
      };

      const handleFileParsing = (parsedData) => {
        if (parsedData.length === 0) {
          alert("Uploaded file is empty. Please upload a valid file.");
          return;
        }

        // Validate the columns in the uploaded file
        const { isValid, missingColumns, extraColumns } =
          validateColumns(parsedData);

        if (!isValid) {
          alert(
            `Column mismatch! Missing: ${missingColumns.join(
              ", "
            )}, Extra: ${extraColumns.join(", ")}`
          );
          return;
        }

        const transformedData = parsedData.map((row, rowIndex) => {
          const userId = row.userId;

          // Validate `userId` is present
          if (!userId || String(userId).trim() === "") {
            alert(`Missing userId in row ${rowIndex + 1}.`);
            return;
          }

          const previousReadings = [];

          for (let i = 1; i <= 14; i++) {
            let month = row[`month_${i}`];

            // Handle empty or missing month values
            if (!month || String(month).trim() === "") {
              alert(
                `Missing or empty month_${i} for userId ${userId} in row ${
                  rowIndex + 1
                }.`
              );
              return;
            }

            // Step 1: Remove quotes if present
            if (month.startsWith('"') && month.endsWith('"')) {
              month = month.substring(1, month.length - 1); // Remove outer quotes
            }

            // Step 2: Validate month format
            const isMonthValid = /^[A-Za-z]{3}-\d{2}$/.test(month);
            if (!isMonthValid) {
              alert(
                `Invalid month format for month_${i} in row ${
                  rowIndex + 1
                }. Expected format: "Nov-24".`
              );
              return;
            }

            // Convert numeric fields to numbers
            const convertToNumber = (value, fieldName) => {
              const num = parseFloat(value);
              if (isNaN(num)) {
                alert(
                  `Invalid value for ${fieldName} in month_${i} for userId ${userId}. Expected a number.`
                );
                return null;
              }
              return num;
            };

            const previousPeak = convertToNumber(
              row[`previous_peak_${i}`],
              `previous_peak_${i}`
            );
            const previousOffPeak = convertToNumber(
              row[`previous_off_peak_${i}`],
              `previous_off_peak_${i}`
            );
            const payment = convertToNumber(
              row[`payment_${i}`],
              `payment_${i}`
            );
            const bill = convertToNumber(row[`bill_${i}`], `bill_${i}`);

            if (
              previousPeak === null ||
              previousOffPeak === null ||
              payment === null ||
              bill === null
            ) {
              return; // Skip invalid rows
            }

            previousReadings.push({
              previous_peak: previousPeak,
              previous_off_peak: previousOffPeak,
              month,
              payment,
              bill,
            });
          }

          return { userId, previousReadings };
        });

        // Filter out `undefined` rows caused by validation failures
        const validData = transformedData.filter((row) => row !== undefined);

        if (validData.length === 0) {
          alert("All rows in the uploaded file are invalid.");
          return;
        }

        // console.log("Transformed Data:", validData);
        setFileData(validData);
      };

      if (fileType === "csv") {
        Papa.parse(file, {
          header: true,
          skipEmptyLines: true, // Automatically skip empty rows
          complete: (result) => {
            handleFileParsing(result.data);
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
          handleFileParsing(parsedData);
        };
        reader.readAsArrayBuffer(file);
      }
    }
  };

  // HANDLE USERS UPLOAD DATA FILE FUNCTION
  const handleUserDataFileUpload = (e) => {
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
          skipEmptyLines: true, // Automatically skip completely empty rows
          complete: (result) => {
            const parsedData = result.data;

            // Filter out rows where all columns are empty
            const filteredData = parsedData.filter((row) => {
              return Object.values(row).some(
                (value) => String(value).trim() !== "" // Convert value to string before trimming
              );
            });

            // console.log("Filtered CSV Data:", filteredData);

            if (filteredData.length === 0) {
              alert("The uploaded file is empty or contains no valid data.");
              return;
            }

            setFileData(filteredData);
          },
          error: (error) => {
            console.error("Error parsing CSV:", error);
            alert("Error parsing the CSV file. Please check the file format.");
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

          // Filter out rows where all columns are empty
          const filteredData = parsedData.filter((row) => {
            return Object.values(row).some(
              (value) => String(value).trim() !== "" // Convert value to string before trimming
            );
          });

          // console.log("Filtered Excel Data:", filteredData);

          if (filteredData.length === 0) {
            alert("The uploaded file is empty or contains no valid data.");
            return;
          }

          setFileData(filteredData);
        };
        reader.readAsArrayBuffer(file);
      }
    }
  };

  // HANDLE MONTHLY UPLOAD FILE FUNCTION
  const handleMonthlyUploadFileUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      const fileType = file.name.split(".").pop().toLowerCase();
      const validFileTypes = ["csv", "xlsx"]; // Allowed file types

      if (!validFileTypes.includes(fileType)) {
        alert("Invalid file type! Please upload a CSV or Excel (.xlsx) file.");
        return;
      }

      // Common regex pattern for validating "MMM-YY" format
      const monthYearIdPattern = /^[A-Za-z]{3}-\d{2}$/;

      const validateColumns = (columns) => {
        if (!Array.isArray(columns)) {
          alert("File format error: Unable to read columns.");
          return false;
        }

        const missingColumns = expectedMonthlyUploadDataColumns.filter(
          (col) => !columns.includes(col)
        );
        if (missingColumns.length > 0) {
          alert(`Missing required columns: ${missingColumns.join(", ")}`);
          return false;
        }
        return true;
      };

      const processMeterInfo = (rows, currentMonthYearId) => {
        const meterInfoArray = rows.map((row) => ({
          userId: parseInt(row[0], 10) || 0, // User ID is in the first column
          present_peak_reading: parseFloat(row[1]) || 0.0, // Peak reading is in the second column
          present_off_peak_reading: parseFloat(row[2]) || 0.0, // Off-peak reading is in the third column
        }));

        setFileData({
          currentMonthYearId,
          meterInfoArray,
        });

        // console.log("Processed Meter Info Array:", meterInfoArray);
      };

      if (fileType === "csv") {
        Papa.parse(file, {
          header: false, // Parse without header to handle the second row for columns
          skipEmptyLines: true, // Skip empty rows
          complete: (result) => {
            if (!result || !result.data || result.data.length < 2) {
              alert("File is empty or improperly formatted.");
              return;
            }

            const parsedData = result.data;

            // Extract "Month-Year" from the first row and second column
            let currentMonthYearId = parsedData[0][1]?.trim() || "";

            // Remove extra quotation marks if present
            currentMonthYearId = currentMonthYearId.replace(/^"|"$/g, "");

            if (
              !currentMonthYearId ||
              !monthYearIdPattern.test(currentMonthYearId)
            ) {
              alert(
                'Invalid "Month-Year" format! Please provide the value in the format "MMM-YY" (e.g., "Dec-24").'
              );
              return;
            }

            // console.log("Current Month-Year ID:", currentMonthYearId);

            // Extract column names from the second row
            const columnNames = parsedData[1];
            // console.log("CSV Column Names:", columnNames);

            // Validate column names
            if (!validateColumns(columnNames)) return;

            // Process remaining rows starting from the third row
            processMeterInfo(parsedData.slice(2), currentMonthYearId);
          },
          error: (error) => {
            console.error("Error parsing CSV:", error);
            alert("Error parsing the CSV file. Please check the file format.");
          },
        });
      } else if (fileType === "xlsx") {
        const reader = new FileReader();
        reader.onload = (e) => {
          const data = new Uint8Array(e.target.result);
          const workbook = XLSX.read(data, { type: "array" });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const parsedData = XLSX.utils.sheet_to_json(worksheet, { header: 1 }); // Parse as an array of arrays

          if (!parsedData || parsedData.length < 2) {
            alert("File is empty or improperly formatted.");
            return;
          }

          // Extract "Month-Year" from the first row and second column
          let currentMonthYearId = parsedData[0]?.[1]?.trim() || "";

          // Remove extra quotation marks if present
          currentMonthYearId = currentMonthYearId.replace(/^"|"$/g, "");

          if (
            !currentMonthYearId ||
            !monthYearIdPattern.test(currentMonthYearId)
          ) {
            alert(
              'Invalid "Month-Year" format! Please provide the value in the format "MMM-YY" (e.g., "Dec-24").'
            );
            return;
          }

          // console.log("Current Month-Year ID:", currentMonthYearId);

          // Extract column names from the second row
          const columnNames = parsedData[1];
          // console.log("Excel Column Names:", columnNames);

          // Validate column names
          if (!validateColumns(columnNames)) return;

          // Process remaining rows starting from the third row
          processMeterInfo(parsedData.slice(2), currentMonthYearId);
        };

        reader.readAsArrayBuffer(file);
      }
    }
  };

  // HANDLE SAVE FILE FUNCTION
  const handleSave = async () => {
    if (fileData) {
      //VALIDATING DATA BEFORE SENDING TO BACKEND
      let expectedColumns = [];
      // Determine expected columns based on file type
      if (activeOption === "Users Data") {
        expectedColumns = expectedUserColumns;
      }
      // Validate columns before saving
      if (activeOption == "Users Data") {
        const validation = validateColumns(fileData, expectedColumns);

        if (
          validation.missingColumns.length ||
          validation.extraColumns.length
        ) {
          alert(
            `Column mismatch! Missing: ${validation.missingColumns.join(
              ", "
            )}, Extra: ${validation.extraColumns.join(", ")}`
          );
          return;
        }
      }

      // console.log("file data: ", fileData);

      // SENDING DATA TO BACKEND
      try {
        // Send the data to the backend using axios
        let response = null;
        // if (activeOption === "Monthly Upload Data") {
        //   response = await axios.post(
        //     "http://localhost:3001/api/meter-info",
        //     fileData
        //   );
        // }
        if (activeOption === "Generate Bill") {
          response = await axios.post(
            `${process.env.REACT_APP_SERVER_URL}/api/meter-info`,
            fileData
          );
        } else if (
          activeOption === "Settings" &&
          activeSubOption === "Configuration" &&
          configurationSubOption === "Load Previous Data"
        ) {
          console.log("Inside Monthly Upload Data");
          response = await axios.post(
            `${process.env.REACT_APP_SERVER_URL}/api/upload-once-bill-data`,
            fileData
          );
        } else if (
          activeOption === "Users Data" &&
          activeSubOption === "Upload Users Data"
        ) {
          console.log("Inside Users Upload Data");
          response = await axios.post(
             `${process.env.REACT_APP_SERVER_URL}/api/user-info`,
            fileData
          );
        }

        // RESPONSE HANDLING
        if (response.status === 200) {
          console.log("Data saved successfully:", fileData);
          alert("Data saved successfully!");
          // window.location.reload();
        } else {
          console.error("Failed to save data:", response);
          alert("Error saving data. Please try again.");
        }
      } catch (error) {
        // Handling error response from the backend
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          console.error("Backend error:", error.response.data.message);
          alert(`Error from server: ${error.response.data.message}`);
        } else {
          console.error("Error saving data:", error);
          alert("An unknown error occurred. Please try again.");
        }
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
          <button
            className="flex"
            onClick={() => {
              setActiveOption("welcome");
              setActiveSubOption("");
            }}
          >
            <FiUser className="mt-1 mr-1" /> Admin Menu
          </button>
        </div>
        <div className="flex flex-col p-4">
          {/* Generate Bill */}
          <div className="relative mb-2">
            <button
              className={`flex text-left p-2 rounded-md w-full ${
                activeOption === "Generate Bill" ? "bg-indigo-500" : ""
              }`}
              onClick={() => {
                setActiveOption("Generate Bill");
                setActiveSubOption("");
              }}
            >
              <FiFileText className="mt-1 mr-1" /> Generate Bill
            </button>
          </div>

          {/* Users Data Section */}
          <div className="relative mb-2">
            <button
              className={`flex text-left p-2 rounded-md w-full ${
                activeOption === "Users Data" ? "bg-indigo-500" : ""
              }`}
              onClick={() => {
                setActiveOption("Users Data");
                setActiveSubOption(null);
              }}
            >
              <FiUsers className="mt-1 mr-1" /> Users Data
            </button>
            {activeOption === "Users Data" && (
              <div className="pl-4">
                <button
                  className={`flex text-left p-2 rounded-md mb-2 w-full ${
                    activeSubOption === "View Users Data" ? "bg-indigo-400" : ""
                  }`}
                  onClick={() => setActiveSubOption("View Users Data")}
                >
                  <FiEye className="mt-1 mr-1" />View Data
                </button>
                <button
                  className={`flex text-left p-2 rounded-md mb-2 w-full ${
                    activeSubOption === "Upload Users Data"
                      ? "bg-indigo-400"
                      : ""
                  }`}
                  onClick={() => setActiveSubOption("Upload Users Data")}
                >
                  <FiUpload className="mt-1 mr-1" /> Upload Data
                </button>
              </div>
            )}
          </div>

          {/* Settings Section */}
          <div className="relative mb-2">
            <button
              className={`flex text-left p-2 rounded-md w-full ${
                activeOption === "Settings" ? "bg-indigo-500" : ""
              }`}
              onClick={() => {
                setActiveOption("Settings");
                setActiveSubOption("");
                setConfigurationSubOption(null);
              }}
            >
              <FiSettings className="mt-1 mr-1" />
              Settings
            </button>
            {activeOption === "Settings" && (
              <div className="pl-4">
                <button
                  className={`flex text-left p-2 rounded-md mb-2 w-full ${
                    activeSubOption === "Tariff" ? "bg-indigo-400" : ""
                  }`}
                  onClick={() => {
                    setActiveSubOption("Tariff");
                    setConfigurationSubOption(null);
                  }}
                >
                  <MdOutlinePriceChange className="mt-1 mr-1" /> Tariff
                </button>
                <button
                  className={`flex text-left p-2 rounded-md mb-2 w-full ${
                    activeSubOption === "Protected Tariff"
                      ? "bg-indigo-400"
                      : ""
                  }`}
                  onClick={() => {
                    setActiveSubOption("Protected Tariff");
                    setConfigurationSubOption(null);
                  }}
                >
                  <BiShieldQuarter className="mt-1 mr-1" />
                  Protected Tariff
                </button>
                <button
                  className={`flex text-left p-2 rounded-md mb-2 w-full ${
                    activeSubOption === "Fixed Charges" ? "bg-indigo-400" : ""
                  }`}
                  onClick={() => {
                    setActiveSubOption("Fixed Charges");
                    setConfigurationSubOption(null);
                  }}
                >
                  <RiPriceTag3Line className="mt-1 mr-1" />
                  Fixed Charges
                </button>
                <button
                  className={`flex text-left p-2 rounded-md mb-2 w-full ${
                    activeSubOption === "Configuration" ? "bg-indigo-400" : ""
                  }`}
                  onClick={() => {
                    setActiveSubOption("Configuration");
                    setConfigurationSubOption(null);
                  }}
                >
                  <HiAdjustments className="mt-1 mr-1" />
                  Configuration
                </button>

                {activeOption === "Settings" &&
                  activeSubOption === "Configuration" && (
                    <div className="pl-4">
                      <button
                        className={`flex text-left p-2 rounded-md mb-2 w-full ${
                          configurationSubOption === "Load Previous Data"
                            ? "bg-indigo-400"
                            : ""
                        }`}
                        onClick={() =>
                          setConfigurationSubOption("Load Previous Data")
                        }
                      >
                        <AiOutlineCloudDownload className="mt-1 mr-1" />
                        Load Previous Data
                      </button>
                    </div>
                  )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* MAIN CONTENT PORTION */}
      <div className="w-3/4 h-full flex flex-col justify-center items-center bg-gray-100">
        {/* Welcome Message Section */}
        {activeOption === "welcome" && (
          <div className="bg-white shadow-md shadow-indigo-500 rounded-lg p-4 mb-36">
            <h1 className="text-3xl font-bold text-center text-indigo-600">
              Welcome to Admin Section
            </h1>
          </div>
        )}

        {activeOption === "Users Data" &&
          activeSubOption !== "View Users Data" &&
          activeSubOption !== "Upload Users Data" && (
            <div className="bg-white shadow-md shadow-indigo-500 rounded-lg p-4 mb-36">
              <h1 className="text-3xl font-bold text-center text-indigo-600">
                Welcome to Users Section
              </h1>
            </div>
          )}

        {activeOption === "Settings" && activeSubOption !== "Tariff"  && activeSubOption !== "Protected Tariff" && activeSubOption !== "Fixed Charges" && activeSubOption !== "Configuration" && (
          <div className="bg-white shadow-md shadow-indigo-500 rounded-lg p-4 mb-36">
            <h1 className="text-3xl font-bold text-center text-indigo-600">
              Welcome to Settings Section
            </h1>
          </div>
        )}

        {activeOption === "Settings" &&
          activeSubOption === "Configuration" &&
          configurationSubOption !== "Load Previous Data" && (
            <div className="bg-white shadow-md shadow-indigo-500 rounded-lg p-4 mb-36">
              <h1 className="text-3xl font-bold text-center text-indigo-600">
                Welcome to Configuration Section
              </h1>
            </div>
          )}

        {/* Generate Bill Section */}
        {activeOption === "Generate Bill" && (
          <GenerateBill
            handleMonthlyUploadFileUpload={handleMonthlyUploadFileUpload}
            handleSave={handleSave}
          />
        )}

        {/* User Data Section */}
        {activeSubOption === "View Users Data" && <UsersData />}
        {activeSubOption === "Upload Users Data" && (
          <UploadData
            handleFileUpload={handleUserDataFileUpload}
            handleSave={handleSave}
            activeOption={activeOption}
            title={"User Data Upload Section"}
          />
        )}

        {/* Once Upload Data Section */}
        {activeOption === "Once Upload Data" && (
          <UploadData
            handleFileUpload={handleFileUpload}
            handleSave={handleSave}
            title={"Once Upload Data Section"}
          />
        )}

        {/* SETTINGS OPTIONS SECTION */}

        {/* Tariff Section */}
        {/* {(activeSubOption === "Residential" ||
          activeSubOption === "Industrial" ||
          activeSubOption === "Commercial") && (
          <TariffSetting activeSubOption={activeSubOption} />
        )} */}

        {/* Tariff Section */}
        {activeOption === "Settings" && activeSubOption === "Tariff" && (
          <TariffSetting activeSubOption={activeSubOption} />
        )}

        {/* Protected Tariff Section */}
        {activeOption === "Settings" &&
          activeSubOption === "Protected Tariff" && (
            <ProtectedTariffSetting activeSubOption={activeSubOption} />
          )}

        {/* Fixed Setting Section */}
        {activeSubOption === "Fixed Charges" && <FixedSetting />}

        {/* Configuration Sub Option - Load Previous Data Section */}
        {activeSubOption === "Configuration" &&
          configurationSubOption === "Load Previous Data" && (
            <UploadData
              handleFileUpload={handleFileUpload}
              handleSave={handleSave}
              title={"Load Previous Data Section"}
            />
          )}
      </div>
    </div>
  );
};

export default AdminPage;
