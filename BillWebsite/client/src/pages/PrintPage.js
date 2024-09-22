import React, { useRef, useState, useEffect } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import BillTemplate from "../components/BillTemplate";
import DownloadBill from "../components/DownloadBill";

// FUNCTION TO GET RANDOM NUMBER BETWEEN MIN AND MAX
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// FUNCTION TO GENERATE RANDOM 14-DIGIT NUMBER
function generateRandom14DigitNumber() {
  const min = 10000000000000; // SMALLEST 14-DIGIT NUMBER (10^13)
  const max = 99999999999999; // LARGEST 14-DIGIT NUMBER (10^14 - 1)

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const random14Digit = generateRandom14DigitNumber();
const randomNumber = getRandomNumber(10, 30);
const amount = Math.floor(Math.random() * 300); // RANDOM AMOUNT OF BILL

// BILL DETAILS
const billDetails = {
  referenceNo: random14Digit + "U",
  amount: amount,
  totalAmount: amount + randomNumber,
};

// PRINT PAGE COMPONENT
const PrintPage = () => {
  const [isLoading, setIsLoading] = useState(true); // LOADER STATE
  const downloadBillRef = useRef(); // REFERENCE TO THE DOWNLOADBILL COMPONENT FOR DOWNLOAD

  useEffect(() => {
    // SIMULATING LOADING TIME TO RENDER THE BILL PROPERLY
    const timer = setTimeout(() => {
      setIsLoading(false); // REMOVE THE LOADER AFTER 1.5 SECONDS
    }, 1500); // YOU CAN ADJUST THIS TIME AS PER YOUR NEED

    return () => clearTimeout(timer); // CLEANUP THE TIMEOUT IF THE COMPONENT IS UNMOUNTED
  }, []);

  const downloadPdfDocument = () => {
    const input = downloadBillRef.current;
    if (!input) {
      console.error("NO INPUT ELEMENT FOUND FOR DOWNLOAD");
      return;
    }

    setTimeout(() => {
      html2canvas(input, { logging: true, useCORS: true })
        .then((canvas) => {
          const imgData = canvas.toDataURL("image/png");
          const pdf = new jsPDF({
            orientation: "p",
            unit: "px",
            format: [input.offsetWidth, input.offsetHeight],
          });
          pdf.addImage(imgData, "PNG", 0, 0);
          pdf.save("bill.pdf");
        })
        .catch((err) =>
          console.error("ERROR CAPTURING THE DOWNLOAD BILL: ", err)
        );
    }, 1000); // DELAY TO ALLOW HTML2CANVAS TO CAPTURE THE ELEMENT
  };

  return (
    <div className="flex items-center flex-col">
      {/* LOADER THAT WILL SHOW UNTIL BILL IS RENDERED */}
      {isLoading && (
        <div className="fixed inset-0 bg-white z-50 flex justify-center items-center">
          <div className="loader"></div>
        </div>
      )}

      {/* PRINT BUTTON */}
      <div className="mx-auto">
        <button
          className="text-white bg-indigo-500 border-0 py-1 px-4 focus:outline-none hover:bg-indigo-600 rounded text-md"
          onClick={downloadPdfDocument}
        >
          DOWNLOAD BILL
        </button>
      </div>

      {/* BILL TEMPLATE ONLY DISPLAYED */}
      <div>
        <BillTemplate billDetails={billDetails} />
      </div>

      {/* DOWNLOAD BILL HIDDEN OFF-SCREEN FOR DOWNLOAD */}
      <div style={{ position: "absolute", top: "-200vh", left: "-200vw" }}>
        <div ref={downloadBillRef}>
          <DownloadBill billDetails={billDetails} />
        </div>
      </div>
    </div>
  );
};

export default PrintPage;
