import React from "react";

const BillDesign = () => {
  return (
    <div className="my-4 border-2 border-blue-800 max-w-4xl mx-auto">
      {/* <-- HEADER SECTION --> */}
      <div className="headerSection grid grid-cols-8 text-center">
        {/* Left Side with NUST Logo */}
        <div className="leftSide col-span-2 border-r">
          <div className="ml-4 mt-2 ">
            <img
              src="./nustlogo.jpg"
              alt="NUST Logo"
              className="h-auto w-auto"
            />
          </div>
        </div>

        {/* Right Side Text */}
        <div className="rightSide col-span-6 flex flex-col justify-center">
          <div className="border-b grid grid-rows-3">
            <div className="row-span-2 flex items-center justify-center">
              <h1 className="text-xl font-semibold italic uppercase underline decoration-gray-500 decoration-[1px]">
                National University of Sciences & Technology
              </h1>
            </div>
          </div>

          <div className="border-b grid grid-rows-1">
            <h1 className="text-xl font-semibold italic uppercase underline decoration-gray-500 decoration-[1px]">
              Sector H-12, Islamabad
            </h1>
          </div>

          <div className="grid grid-rows-1 ">
            <h1 className="text-xl font-semibold italic uppercase underline decoration-gray-500 decoration-[1px]">
              Electricity Consumer Bill
            </h1>
          </div>
        </div>
      </div>

      {/* <-- BILL INFORMATION SECTION --> */}
      <div className="billInformationSection grid grid-cols-12 text-center mb-44">
        {/* Left Side */}
        <div className="leftSide col-span-4 border-2 border-l-0 border-b-0 border-black ">
          <div className="uppercase pl-2 text-start text-sm text-[#1301ff] font-semibold border-b-2 border-black">
            Connection Date
          </div>

          <div className="uppercase pl-2 text-start text-sm font-semibold border-b-2 border-black">
            -
          </div>

          <div className="uppercase pl-2 text-start text-sm text-[#1301ff] font-semibold border-b-2 border-black">
            REFERENCE NO
          </div>

          <div className="uppercase pl-2 text-start text-sm text-[#1301ff] font-semibold border-b-2 border-black">
            -
          </div>
        </div>

        {/* Middle Side */}
        <div className="middleSide col-span-4 border-2 border-l-0 border-b-0 border-black ">
          <div className="uppercase text-center text-sm text-[#1301ff] font-semibold border-b-2 border-black">
            <div className="grid grid-flow-col grid-cols-12">
              <div className="col-span-6 border-r-2 border-black">
                Connection Load
              </div>

              <div className="col-span-2 border-r-2 border-black">ED @</div>

              <div className="col-span-4">Bill Month</div>
            </div>
          </div>

          <div className="text-center text-sm font-semibold border-b-2 border-black">
            <div className="grid grid-flow-col grid-cols-12">
              <div className="col-span-6 border-r-2 border-black">3 phase</div>

              <div className="col-span-2 border-r-2 border-black"></div>

              <div className="col-span-4">Aug-2024</div>
            </div>
          </div>

          <div className="uppercase text-center text-sm text-[#1301ff] font-semibold border-b-2 border-black">
            <div className="grid grid-flow-col grid-cols-12">
              <div className="col-span-3 border-r-2 border-black">Tariff</div>

              <div className="col-span-3 border-r-2 border-black">Load</div>

              <div className="col-span-6">OLD A/C NUMBER</div>
            </div>
          </div>

          <div className="text-center text-sm font-semibold border-b-2 border-black">
            <div className="grid grid-flow-col grid-cols-12">
              <div className="col-span-3 border-r-2 border-black">Domistic</div>

              <div className="col-span-3 border-r-2 border-black"></div>

              <div className="col-span-6"></div>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="rightSide col-span-4 border-t-2 border-black ">
          {/* Div 1 */}
          <div className="text-center text-sm text-[#1301ff] font-semibold border-b-2 border-black">
            <div className="grid grid-flow-col grid-cols-12">
              <div className="col-span-8 border-r-2 border-black">
                Bill Duraction
              </div>

              <div className="uppercase col-span-4">DUE DATE</div>
            </div>
          </div>
          {/* Div 2 */}
          <div className="text-center text-sm font-semibold border-b-2 border-black">
            <div className="grid grid-flow-col grid-cols-12">
              <div className="col-span-4 border-r-2 border-black">02-07-2024</div>

              <div className="col-span-4 border-r-2 border-black">02-08-2024</div>

              <div className="col-span-4"></div>
            </div>
          </div>
          {/* Div 3 */}
          <div className="text-sm font-semibold border-b-2 border-black">
            <div className="grid grid-flow-col grid-cols-12">
              <div className="uppercase text-[#1301ff] text-left pl-1 col-span-4 border-r-2 border-black">DIVISION</div>

              <div className="col-span-2 border-r-2 border-black"></div>

              <div className="col-span-6">NUST</div>
            </div>
          </div>
          {/* Div 4 */}
          <div className="text-sm font-semibold border-b-2 border-black">
            <div className="grid grid-flow-col grid-cols-12">
              <div className="uppercase text-[#1301ff] text-left pl-1 col-span-6 border-r-2 border-black">SUB DIVISION</div>

              <div className="col-span-6">SECTOR H-12</div>
            </div>
          </div>
        </div>
      </div>

      {/* Charges Breakdown Section */}
      {/* <div className="border-t border-gray-300 pt-4 mb-6">
        <h3 className="text-xl font-bold text-center mb-4">
          Charges Breakdown
        </h3>
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b bg-gray-100">
              <th className="py-2">Description</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="py-2">Energy Charges</td>
              <td>PKR 5000</td>
            </tr>
            <tr className="border-b">
              <td className="py-2">Meter Rent</td>
              <td>PKR 200</td>
            </tr>
            <tr className="border-b">
              <td className="py-2">GST (17%)</td>
              <td>PKR 850</td>
            </tr>
            <tr className="border-b">
              <td className="py-2">Total Amount</td>
              <td>PKR 6050</td>
            </tr>
          </tbody>
        </table>
      </div> */}

      {/* Placeholder for an image */}
      {/* <div className="border-t border-gray-300 pt-4 mb-6">
        <img
          src="your-image-link-here"
          alt="Bill Image"
          className="w-full h-auto object-cover"
        />
      </div> */}

      {/* Footer Section */}
      {/* <div className="text-center mt-8 border-t border-gray-300 pt-4">
        <p className="text-gray-700 font-medium">
          For any inquiries, contact the billing department.
        </p>
      </div> */}
    </div>
  );
};

export default BillDesign;
