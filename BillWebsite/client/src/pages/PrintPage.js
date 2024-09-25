import React, { useRef, useState, useEffect } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import BillTemplate from "../components/BillTemplate";
import DownloadBill from "../components/DownloadBill";

// PRINT PAGE COMPONENT
const PrintPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [billDetails, setBillDetails] = useState({});
  const downloadBillRef = useRef();

  useEffect(() => {
    // Retrieve the MeterNo from local storage
    const storedMeterNo = JSON.parse(localStorage.getItem("referenceNo"));
    const storedData = JSON.parse(localStorage.getItem("bills")) || [];
    // console.log("storedData inside printpage: ", storedData);
    
    // Find the bill details based on MeterNo
    const billData = storedData.find(bill => parseInt(bill.MeterNo) === parseInt(storedMeterNo));
    
    if (billData) {
      const amount = parseInt(billData.Amount);
      const totalAmount = amount + 50; // Adjusting total amount as per your requirement

      // Set the bill details
      setBillDetails({
        referenceNo: `${storedMeterNo}U`,
        amount: amount,
        totalAmount: totalAmount,
      });

    } else {
      console.error("No bill found for the provided MeterNo.");
    }

    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
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
    }, 1000);
  };

  return (
    <div className="flex items-center flex-col">
      {isLoading && (
        <div className="fixed inset-0 bg-white z-50 flex justify-center items-center">
          <div className="loader"></div>
        </div>
      )}

      <div className="mx-auto">
        <button
          className="text-white bg-indigo-500 border-0 py-1 px-4 focus:outline-none hover:bg-indigo-600 rounded text-md"
          onClick={downloadPdfDocument}
          disabled={!billDetails} // Disable button if billDetails is not set
        >
          DOWNLOAD BILL
        </button>
      </div>

      {/* Pass billDetails as prop */}
      {billDetails && (
        <div>
          <BillTemplate billDetails={billDetails} />
        </div>
      )}

      <div style={{ position: "absolute", top: "-200vh", left: "-200vw" }}>
        <div ref={downloadBillRef}>
          {/* Pass billDetails as prop */}
          <DownloadBill billDetails={billDetails} />
        </div>
      </div>
    </div>
  );
};

export default PrintPage;
