import React, { useState } from "react";

const BillDesign = ({ billDetails }) => {
  // Below Address Values
  const [belowAddressSection, setBelowAddressSection] = useState({
  });

  useEffect(() => {
    
  }, [])
  


  

  // Electicity Charges Data
  const electricityBill = {
    "TOTAL UNITS CONSUMED": 9,
    "COST OF ELECTRICTY": 388,
    GST: 79,
    "Qtr Tex": 22,
    "FUEL PRICE ADJUSTMENT": 20,
    "Fixed Charged": 1000,
    TOTAL: 1509,
    "DEFERRED AMOUNT": null, // No value provided
    "OUTSTANDING INSTALLMENT": null,
    "PROG IT PAID F-Y": null,
    "PROG GST PAID F-Y": null,
  };

  // Govt Charges Data
  const govtCharges = {
    "E.D": null,
    "PTV FEE": 35,
    "Meter Rent": 25,
    "INCOME TAX": null,
    "EXTRA TAX": null,
    "FURTHER TAX": null,
    "N.J SURCHARGE": null,
    "GST ON FPA": null,
    "IT ON FPA": null,
    "ED ON FPA": null,
    "FC SURCHARGE": 29,
    "TR SURCHARGE": null,
    TOTAL: 89,
  };

  // Arrears - Bill Data
  const arrearsDetails = {
    "CURRENT BILL": 1598,
    "Water BILL": 250,
    "PM RELIEF AMOUNT": 0, // assuming no value provided
    INSTALMENT: 0,
    "PAYABLE WITHIN DUE DATE": 1848,
    "L.P. SURCHAGE": 185,
    "PAYABLE AFTER DUE DATE": 2033,
  };

  console.log("billDetails in billdesign: ", billDetails);

  // RETURN JSX
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
      <div className="billInformationSection grid grid-cols-12 text-center">
        {/* Left Side */}
        <div className="leftSide col-span-4 border-2 border-l-0 border-b-0 border-black ">
          {/* Div 1 */}
          <div className="uppercase pl-2 text-start text-sm text-[#1301ff] font-semibold border-b-2 border-black">
            Connection Date
          </div>
          {/* Div 2 */}

          <div className="uppercase pl-2 text-start text-sm font-semibold border-b-2 border-black">
            -
          </div>
          {/* Div 3 */}

          <div className="uppercase pl-2 text-start text-sm text-[#1301ff] font-semibold border-b-2 border-black">
            REFERENCE NO
          </div>
          {/* Div 4 */}

          <div className="uppercase pl-2 text-start text-sm text-[#1301ff] font-semibold border-b-2 border-black">
            -
          </div>
        </div>

        {/* Middle Side */}
        <div className="middleSide col-span-4 border-2 border-l-0 border-b-0 border-black ">
          {/* Div 1 */}
          <div className="uppercase text-center text-sm text-[#1301ff] font-semibold border-b-2 border-black">
            <div className="grid grid-flow-col grid-cols-12">
              <div className="col-span-6 border-r-2 border-black">
                Connection Load
              </div>

              <div className="col-span-2 border-r-2 border-black">ED @</div>

              <div className="col-span-4">Bill Month</div>
            </div>
          </div>
          {/* Div 2 */}
          <div className="text-center text-sm font-semibold border-b-2 border-black">
            <div className="grid grid-flow-col grid-cols-12">
              <div className="col-span-6 border-r-2 border-black">3 phase</div>

              <div className="col-span-2 border-r-2 border-black"></div>

              <div className="col-span-4">Aug-2024</div>
            </div>
          </div>
          {/* Div 3*/}
          <div className="uppercase text-center text-sm text-[#1301ff] font-semibold border-b-2 border-black">
            <div className="grid grid-flow-col grid-cols-12">
              <div className="col-span-3 border-r-2 border-black">Tariff</div>

              <div className="col-span-3 border-r-2 border-black">Load</div>

              <div className="col-span-6">OLD A/C NUMBER</div>
            </div>
          </div>
          {/* Div 4 */}
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
              <div className="col-span-4 border-r-2 border-black">
                02-07-2024
              </div>

              <div className="col-span-4 border-r-2 border-black">
                02-08-2024
              </div>

              <div className="col-span-4"></div>
            </div>
          </div>
          {/* Div 3 */}
          <div className="text-sm font-semibold border-b-2 border-black">
            <div className="grid grid-flow-col grid-cols-12">
              <div className="uppercase text-[#1301ff] text-left pl-1 col-span-4 border-r-2 border-black">
                DIVISION
              </div>

              <div className="col-span-2 border-r-2 border-black"></div>

              <div className="col-span-6">NUST</div>
            </div>
          </div>
          {/* Div 4 */}
          <div className="text-sm font-semibold border-b-2 border-black">
            <div className="grid grid-flow-col grid-cols-12">
              <div className="uppercase text-[#1301ff] text-left pl-1 col-span-6 border-r-2 border-black">
                SUB DIVISION
              </div>

              <div className="col-span-6">SECTOR H-12</div>
            </div>
          </div>
        </div>
      </div>

      {/* <-- CONSUMER ID TO MONTH, UNITS, BILL PAYMENT (ONLY TITLES) --> */}
      <div className="consumerIdToPaymentSection grid grid-cols-12 text-center ">
        {/* Left Side */}
        <div className="leftSide col-span-5">
          {/* Div 1 */}
          <div className="uppercase pl-2 text-start text-sm text-[#1301ff] font-semibold border-r-2 border-b-2 border-black">
            CONSUMER ID
          </div>
          {/* Div 2 */}
          <div className="uppercase pl-2 text-start text-sm text-[#1301ff] font-semibold border-r-2 border-b-2 border-black">
            -
          </div>
        </div>

        {/* Middle Side */}
        <div className="middleSide col-span-3">
          {/* Div 1 */}
          <div className="uppercase text-center text-sm text-[#1301ff] font-semibold border-r-2 border-b-2 border-black">
            LOCK AGE
          </div>
          {/* Div 2 */}
          <div className="uppercase text-center text-sm text-[#1301ff] font-semibold border-r-2 border-b-2 border-black">
            -
          </div>
        </div>

        {/* Right Side */}
        <div className="middleSide col-span-4">
          {/* Div 1 */}
          <div className="grid grid-flow-col grid-cols-12">
            <div className="uppercase pl-1 text-left text-sm text-[#1301ff] font-semibold col-span-6 border-b-2 border-r-2 border-black">
              FEEDER NAME
            </div>
            <div className="col-span-6 text-sm text-center font-semibold border-b-2 border-black">
              ISLAMABAD
            </div>
          </div>
          {/* Div 2 */}
          <div className="grid grid-flow-col grid-cols-12">
            <div className="uppercase text-center text-sm text-[#1301ff] font-semibold col-span-3 border-b-2 border-r-2 border-black">
              MONTH
            </div>
            <div className="uppercase text-center text-sm text-[#1301ff] font-semibold col-span-3 border-b-2 border-r-2 border-black">
              UNITS
            </div>
            <div className="col-span-3 text-[#1301ff] text-sm text-center font-semibold border-b-2 border-r-2 border-black">
              BILL
            </div>
            <div className="uppercase text-center text-sm text-[#1301ff] font-semibold col-span-3 border-b-2 border-black">
              PAYMENT
            </div>
          </div>
        </div>
      </div>

      {/* ADDRESS AND DETAILS(MONTH, UNITS, BILL PAYMENT) SECTION */}

      <div className="addressAndDetailsSection grid grid-cols-12">
        {/* Left Side */}
        <div className="col-span-8 border-b-2 border-r-2 border-black">
          {/* Upper Part */}
          <div className="border-b-2 border-black">
            <div className="uppercase underline border-b pl-1 text-left text-sm font-bold ">
              NAME & ADDRESS.
            </div>
            <div className="text-[#1301ff] border-b pl-1 text-left text-sm font-bold ">
              Name
            </div>
            <div className="text-[#1301ff] border-b pl-1 text-left text-sm font-bold ">
              Appartment #
            </div>
            <div className="text-[#002060] uppercase border-b pl-1 text-left text-sm font-bold ">
              HQ NUST, SECTOR H-12
            </div>
            <div className="text-[#002060] uppercase border-b pl-1 text-left text-sm font-bold ">
              ISLAMABAD
            </div>
            <div className="pl-1 text-left text-sm ">-</div>
          </div>
          {/* Lower Part */}
          <div className="grid grid-cols-8">
            {/* Left 4 Cols */}
            <div className="col-span-4 border-r-2 border-black">
              <div className="grid grid-flow-col">
                <div className="col-span-1 border-r-2 border-b-2 border-black text-center font-semibold text-[#1301ff]">
                  METER No
                </div>
                <div className="col-span-3 border-b-2 border-black text-center font-semibold text-[#1301ff]">
                  PREVIOUS
                </div>
              </div>
            </div>
            {/* Right 4 Cols */}
            <div className="col-span-4">
              <div className="grid grid-flow-col grid-cols-12">
                <div className="col-span-3 border-r-2 border-b-2 border-black text-center font-semibold text-[#1301ff]">
                  PRESENT
                </div>
                <div className="col-span-3 border-r-2 border-b-2 border-black text-center font-semibold text-[#1301ff]">
                  MF
                </div>
                <div className="col-span-2 border-r-2 border-b-2 border-black text-center font-semibold text-[#1301ff]">
                  UNITS
                </div>
                <div className="col-span-5 border-b-2 border-black text-center font-semibold text-[#1301ff]">
                  STATUS
                </div>
              </div>
            </div>
          </div>

          {/* EXPLAINATION OF LOWER PART - 4 COLS == METER No PREVIOUS PRESENT MF UNITS STATUS */}
          <div className="grid grid-cols-8 ">
            {/* Left 4 Cols */}
            <div className="col-span-4 border-r-2 border-black">
              <div className="grid grid-flow-col grid-cols-8">
                <div className="col-span-3 border-r-2 border-black flex items-center justify-center font-semibold text-sm text-[#CC0000] whitespace-nowrap min-w-[113px] h-[99px]">
                  {belowAddressSection.meterNo}
                </div>
                <div className="col-span-5">
                  <div className="grid grid-flow-row grid-cols-12">
                    <div className="col-span-12 border-b-2 border-black">
                      <div className="grid grid-flow-col grid-cols-12 h-[40px]">
                        <div className="col-span-5 border-r-2 border-black font-bold flex items-center justify-center">
                          Peak
                        </div>
                        <div className="col-span-7 font-semibold flex items-center justify-center">
                          {belowAddressSection.previousReadingPeak}
                        </div>
                      </div>
                    </div>
                    <div className="col-span-12">
                      <div className="grid grid-flow-col grid-cols-12 h-[57px]">
                        <div className="col-span-5 border-r-2 border-black font-bold flex items-center justify-center">
                          Off Peak
                        </div>
                        <div className="col-span-7 font-semibold flex items-center justify-center">
                          {belowAddressSection.previousReadingOffPeak}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Right 4 Cols */}
            <div className="col-span-4">
              <div className="grid grid-flow-col grid-cols-12">
                <div className="col-span-3 border-r-2 border-black text-center font-semibold ">
                  <div className="border-b-2 border-black font-semibold h-[42px] flex items-center justify-center">
                    {belowAddressSection.presentReadingPeak}
                  </div>
                  <div className="font-semibold h-[57px] flex items-center justify-center">
                    {belowAddressSection.presentReadingOffPeak}
                  </div>
                </div>
                <div className="bg-[#FFFF00] col-span-3 border-r-2 border-black text-center font-semibold flex items-center justify-center">
                  {belowAddressSection.mfValue}
                </div>
                <div className="col-span-2 border-r-2 border-black text-center font-semibold">
                  <div className="border-b-2 border-black font-semibold h-[42px] flex items-center justify-center">
                    {belowAddressSection.peakUnits}
                  </div>
                  <div className="font-semibold h-[57px] flex items-center justify-center">
                    {belowAddressSection.peakOffUnits}
                  </div>
                </div>
                <div className="col-span-5 text-center font-semibold"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="col-span-4">
          <div className="grid grid-flow-col grid-cols-8">
            {/* Month Values */}
            <div className="uppercase text-center text-sm text-[#1301ff] font-semibold col-span-2 border-b-2 border-r-2 border-black">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((m, index) => {
                return (
                  <div className="border-b" id={index}>
                    {m}
                  </div>
                );
              })}
            </div>
            {/* Units Values */}
            <div className="uppercase text-center text-sm text-[#1301ff] font-semibold col-span-2 border-b-2 border-r-2 border-black">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((m, index) => {
                return (
                  <div className="border-b" id={index}>
                    {m}
                  </div>
                );
              })}
            </div>
            {/* Bill Values */}
            <div className="text-[#1301ff] text-sm text-center font-semibold col-span-2 border-b-2 border-r-2 border-black">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((m, index) => {
                return (
                  <div className="border-b" id={index}>
                    {m}
                  </div>
                );
              })}
            </div>
            {/* Payment Values */}
            <div className="uppercase text-center text-sm text-[#1301ff] font-semibold col-span-2 border-b-2 border-black">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((m, index) => {
                return (
                  <div className="border-b" id={index}>
                    {m}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ELECTRICITY + GOVT CHARGES + ARREARS SECTIONS */}
      <div className="elecGovtArrearsSection grid grid-cols-12">
        {/* ELECTRICITY CHARGES - LEFT PART (Divided in 3-parts) */}
        <div className="col-span-5 border-b-2 border-r-2 border-black">
          <div className="grid grid-flow-row">
            {/* Upper Part */}
            <div className="uppercase border-b-2 border-black text-center text-sm text-[#CC0000] font-semibold">
              ELECTRICITY CHARGES
            </div>
            {/* Middle Part */}
            <div className="grid grid-flow-row grid-cols-5 grid-rows-5">
              {Object.keys(electricityBill).map((key, index) => {
                return (
                  <>
                    <div
                      className={`col-span-4 border-b border-r-2 border-black pl-1 text-left text-sm text-[#1301ff] font-semibold flex items-center ${
                        key === "GST" ? "row-span-2" : ""
                      } `}
                    >
                      {key}
                    </div>
                    <div
                      className={`col-span-1 border-b border-black uppercase text-sm font-semibold flex items-center justify-center ${
                        key === "GST" ? "row-span-2" : ""
                      } ${
                        key === "FUEL PRICE ADJUSTMENT" ||
                        key === "Fixed Charged"
                          ? "bg-[#92D050]"
                          : ""
                      }`}
                    >
                      {electricityBill[key]}
                    </div>
                  </>
                );
              })}
            </div>

            {/* Lower Part */}
            <div className="grid grid-flow-col grid-cols-5 border-t border-black">
              <div className="col-span-2 border-r-2 border-black text-sm font-semibold">
                <div className="border-b-2 border-black text-[#1301ff] underline pl-1">
                  S/No
                </div>
                {/* Use row-span-2 directly here */}
                <div className="grid grid-rows-5">
                  <div className="row-span-2 border-b flex items-center justify-center">
                    Rate
                  </div>
                  <div className="row-span-2 flex items-center justify-center border-b">
                    TR
                  </div>
                  <div className="flex items-center justify-center border-b">
                    -
                  </div>
                </div>
              </div>
              <div className="col-span-2 border-r-2 border-black text-sm text-[#CC0000] font-semibold">
                <div className="border-b-2 border-black text-[#1301ff] underline text-center">
                  TARIFF
                </div>
                <div className="grid grid-flow-row">
                  <div className="row-span-2 pl-1 border-b">Peak</div>
                  <div className="row-span-2 pl-1 border-b-2 border-black">
                    Off Peak
                  </div>
                  <div className="pl-1 border-b">-</div>
                  <div className="pl-1 border-b">-</div>
                </div>
              </div>
              <div className="col-span-1 text-center text-sm text-[#1301ff] font-semibold">
                <div className="border-b-2 border-black  underline text-center">
                  RS kWh
                </div>
                <div className="grid grid-flow-row">
                  <div className="row-span-2 pl-1 border-b">48.00</div>
                  <div className="row-span-2 pl-1 border-b-2 border-black">
                    41.68
                  </div>
                  <div className="pl-1 border-b">-</div>
                  <div className="pl-1 border-b-2 border-black">-</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* GOVT CHARGES - MIDDLE PART */}
        <div className="col-span-3 border-b-2 border-black">
          <div className="uppercase border-b-2 border-r-2 border-black text-center text-sm text-[#1301ff] font-semibold">
            GOVT CHARGES
          </div>
          <div className="grid grid-flow-row grid-cols-7 grid-rows-7">
            {Object.keys(govtCharges).map((key, index) => {
              return (
                <>
                  <div
                    className={`col-span-4 border-b border-r-2 border-black pl-1 text-left text-sm text-[#CC0000] font-semibold flex items-center ${
                      key === "FURTHER TAX" ? "row-span-2" : ""
                    }`}
                  >
                    {key}
                  </div>
                  <div
                    className={`col-span-3 border-b border-r-2 border-black uppercase text-center text-sm font-semibold flex items-center justify-center ${
                      key === "FURTHER TAX" ? "row-span-2" : ""
                    } ${
                      ["FC SURCHARGE", "TR SURCHARGE", "TOTAL"].includes(key)
                        ? ""
                        : "bg-[#92D050]"
                    }`}
                  >
                    {govtCharges[key]}
                  </div>
                </>
              );
            })}
          </div>
          <div className="uppercase border-t border-t-black border-b border-r-2 border-r-black text-center text-sm font-semibold">
            PAYABLE IN
          </div>
          <div className="uppercase pt-[1px] border-b-2 border-black border-r-2 border-r-black text-center text-sm font-semibold">
            NUST ACCOUNT
          </div>
          <div className="bg-[#FFFF00] text-3xl font-bold flex items-center justify-center pt-1">
            NUST SGI A/C
          </div>
        </div>
        {/* ARREARS - RIGHT PART */}
        <div className="col-span-4 border-b-2 border-black">
          <div className="border-b-2 border-black pl-1 text-left text-sm text-[#1301ff] font-semibold">
            Arrear
          </div>
          <div className="grid grid-flow-row grid-cols-5 grid-rows-8">
            {Object.keys(arrearsDetails).map((key, index) => {
              return (
                <>
                  <div
                    className={`col-span-4 border-b border-r-2 border-black pl-1 text-left text-sm text-[#1301ff] font-semibold flex items-center ${
                      key === "L.P. SURCHAGE" ? "row-span-2" : ""
                    } ${
                      key === "PAYABLE AFTER DUE DATE"
                        ? "text-[#CC0000]"
                        : "text-[#1301ff]"
                    } ${
                      key === "PAYABLE AFTER DUE DATE" ? "bg-[#F2DBDB]" : ""
                    }`}
                  >
                    {key}
                  </div>
                  <div
                    className={`col-span-1 border-b text-[#1301ff] border-black uppercase text-center text-sm font-semibold flex items-center justify-center ${
                      key === "L.P. SURCHAGE" ? "row-span-2" : ""
                    }`}
                  >
                    {arrearsDetails[key]}
                  </div>
                </>
              );
            })}
          </div>
          {/* Fuel Price Adjustment Section*/}
          <div className="border-b-2 border-t border-black text-center pt-[2px] text-xs font-semibold">
            FUEL PRICE ADJUSTMENT
          </div>
          <div className="grid grid-cols-5 grid-flow-col">
            <div className="col-span-2 border-b-2 border-r-2 border-black flex items-center justify-center font-semibold">
              FPA
            </div>
            <div className="col-span-2 border-b-2 border-r-2 border-black text-center text-sm font-semibold">
              <div className="border-b-2 border-black">Month</div>
              <div className="">Jun-24 Rs.</div>
            </div>
            <div className="col-span-2 border-b-2 border-black text-center text-sm font-semibold">
              <div className="border-b-2 border-black">Rate</div>
              <div className="bg-[#92D050]">3.5627</div>
            </div>
          </div>
          {/* Contact Billing Department for any inquiries */}
          <div className="border-b-2 border-black text-[13px] font-semibold">
            <div className="text-[#1301ff] pl-1 underline border-b">
              For Electric Supply Failure Contact
            </div>
            <div className="text-[#1301ff] pl-1 border-b">
              <span className="underline">Sub Engr. E&M </span>: 0301 5596511
            </div>
            <div className="text-[#1301ff] pl-1 border-b">
              <span className="underline">CH. E&M </span>: 0300 5332432
            </div>
            <div className="text-[#1301ff] pl-1 border-b-2 border-black">
              <span className="underline">COMPLAINT OFFICE </span>: 051 9085
              1279
            </div>
            <div className="text-[#1301ff] pl-1 pt-[1px]">-</div>
          </div>
          {/* Nust SGI */}
          <div className="bg-[#FFFF00] pt-1 text-3xl font-bold flex items-center justify-center">
            2292-700026740-1
          </div>
        </div>
      </div>
      {/* Footer Section */}
      <div className="">
        <div className="border-b">-</div>
        <div className="border-b">-</div>
        <div className="border-b">-</div>
        <div className="border-b font-semibold text-right mr-1">AE( E&M)</div>
      </div>
    </div>
  );
};

export default BillDesign;
