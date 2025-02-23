import React from "react";

const AboutPage = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center py-10 px-4">
      <div className="max-w-[80%] bg-white shadow-md rounded-lg p-8">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
          About Walee
        </h1>
        <p className="text-lg text-gray-600 text-center mb-6">
          Founded in 2019, Walee is Pakistan’s largest influencer marketing
          platform with over 70,000 registered users. We are here to make your
          voice heard by the world. Whether you are an influencer or a business,
          our solutions are designed to provide you with winning experiences and
          opportunities.
        </p>

        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Our Solutions
        </h2>
        <ul className="list-disc list-inside text-gray-600 mb-6 font-semibold">
          <li>Automated Influencer Marketing</li>
          <li>Influencer Insights</li>
          <li>Social Listening</li>
          <li>Social Commerce</li>
          <li>Payment Gateway</li>
          <li>Mobility Marketing</li>
        </ul>

        <div className="mt-8 text-center">
          <button className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition">
            Contact Us
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
