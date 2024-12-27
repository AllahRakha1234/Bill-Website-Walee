import React, { useState, useEffect } from "react";
import axios from "axios";
import Loading from "../Loading"; // Ensure the Loading component is properly imported

const UsersData = () => {
  const [usersData, setUsersData] = useState([]);
  const [loading, setLoading] = useState(true); // Track loading state

  useEffect(() => {
    const fetchUsersData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/user-info`);
        if (response.status === 200) {
          setUsersData(response.data.userInfo);
        } else {
          setUsersData([]);
        }
      } catch (error) {
        console.error("Error fetching users data:", error);
        setUsersData([]);
      } finally {
        setLoading(false); // Stop loading once data is fetched
      }
    };
    fetchUsersData();
  }, []);

  // Show loading spinner while data is being fetched
  if (loading) {
    return <Loading />;
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-4 w-[90%] md:w-[80%] mx-auto">
      <h1 className="text-3xl font-bold text-center text-indigo-600 mb-6">
        Users Data Section
      </h1>
      {/* USERS DATA DISPLAY SECTION */}
      {usersData?.length > 0 ? (
        <table className="w-full text-left border-collapse border border-gray-300">
          <thead>
            <tr className="bg-indigo-100">
              <th className="border border-gray-300 px-4 py-2">User ID</th>
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Location</th>
              <th className="border border-gray-300 px-4 py-2">
                Tariff Category
              </th>
              <th className="border border-gray-300 px-4 py-2">Phase</th>
              <th className="border border-gray-300 px-4 py-2">Meter Type</th>
            </tr>
          </thead>
          <tbody>
            {usersData.map((user) => (
              <tr key={user.userId} className="hover:bg-indigo-50">
                <td className="border border-gray-300 px-4 py-2">
                  {user.userId}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {user.name}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {user.location}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {user.tariffCategory}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {user.phase}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {user.meterType}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center text-gray-600">No user data available.</p>
      )}
    </div>
  );
};

export default UsersData;
