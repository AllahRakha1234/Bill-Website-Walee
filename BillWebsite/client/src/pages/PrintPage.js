import React, { useRef } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import BillTemplate from "../components/BillTemplate";
import DownloadBill from "../components/DownloadBill";

const billDetails = {
  referenceNo: "12345678912345U",
  amount: 480,
  totalAmount: 500,
}

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
    }, 1000); // Delay capture to ensure all content is loaded
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
