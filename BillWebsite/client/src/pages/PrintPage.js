import React, { useRef } from "react";
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
  const min = 10000000000000;  // SMALLEST 14-digit number (10^13)
  const max = 99999999999999;  // LARGE 14-digit number (10^14 - 1)
  
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const random14Digit = generateRandom14DigitNumber();
const randomNumber = getRandomNumber(10, 30);
const amount = Math.floor((Math.random() * 300)); // RANDOM AMOUNT OF BILL

// BILL DETAILS
const billDetails = {
  referenceNo: random14Digit + "U",
  amount: amount,
  totalAmount: amount + randomNumber,
}


// PRINT PAGE COMPONENT
const PrintPage = () => {
  const downloadBillRef = useRef(); // Reference to the DownloadBill component for download

  const downloadPdfDocument = () => {
    const input = downloadBillRef.current;
    if (!input) {
      console.error("No input element found for download");
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
        .catch((err) => console.error("Error capturing the download bill: ", err));
    }, 1000); // DELAY TO ALLOW HTML2CANVAS TO CAPTURE THE ELEMENT
  };

  return (
    <div className="flex items-center flex-col">
      {/* PRINT BUTTON */}
      <div className="mx-auto">
        <button
          className="text-white bg-indigo-500 border-0 py-1 px-4 focus:outline-none hover:bg-indigo-600 rounded text-md"
          onClick={downloadPdfDocument}
        >
          Download Bill
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
