import React from "react";

const DownloadBill = ({billDetails}) => {
  return (
    <div className="mainBox container mx-auto">
      <div className="upperBill">
        <img src="./bill_upper.png" alt="upperImg" />
      </div>

      <div className="middleBillBox flex flex-row -mt-1">
        {/* <div className="middleLefttBill ml-9 w-32 h-5  border-[#A493AD] pt-[4px] pl-6 font-semibold text-[#A493AD] text-[10px] border-l-2"> */}
        <div className="middleLefttBill ml-9 w-32 h-5  border-[#A493AD] pl-6 font-semibold text-[#A493AD] text-[10px] border-l-2">
          {" "}
          {billDetails.referenceNo}
        </div>
        <div className="middleRightBill -ml-1">
          <img src="./bill_middle.png" alt="middleImg" />
        </div>
      </div>

      <div className="lowerBill -mt-1">
        <img src="./bill_lower.png" alt="lowerImg" />
      </div>

      <div className="lowestBillBox flex flex-row">

        <div className="lowestLeftBill -mt-2">
          <img src="./bill_lower_1.png" alt="lowerImg" />
        </div>

        <div className="lowestRightBill -ml-1 mt-[39px]">
          <img src="./bill_lower_2.png" alt="lowerImg" />
        </div>

        {/* <div className="lowestMiddle-1-Bill -mt-1 -ml-[181px] w-[138px] h-5  border-b-[2px] border-r-[2px] border-[#A493AD] text-[#a694af] text-[12px] -pt-[105px] pl-14"> */}
        <div className="lowestMiddle-1-Bill -mt-1 -ml-[181px] mb-5 w-[138px] h-5  border-b-[2px] border-r-[2px] border-[#A493AD] text-[#a694af] text-[12px] pl-14">
          {" "}
          <p className="-mt-2">{billDetails.amount}</p>
        </div>

        {/* <div className="lowestMiddle-2-Bill mt-3 -ml-[138px] w-[138px] h-7 border-r-2 border-[#A493AD] font-semibold text-[#A493AD] text-[12px] pt-2 pl-14"> */}
        <div className="lowestMiddle-2-Bill mt-3 -ml-[138px] w-[138px] h-7 border-r-2 border-[#A493AD] font-semibold text-[#A493AD] text-[12px] pl-14">
          {" "}
          {billDetails.totalAmount}
        </div>

        <div className="lowestRightBill ml-[3px]">
          <img src="./bill_lower_3.png" alt="lowerImg" />
        </div>
      </div>
    </div>
  );
};

export default DownloadBill;
