import React, { useRef, useState, useEffect } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import BillDesign from './../components/BillDesign';
import BillDesignDownload from './../components/BillDesignDownload';

// PRINT PAGE COMPONENT
const DownloadBillPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [billDetails, setBillDetails] = useState({});
  const downloadBillPageRef = useRef();

  useEffect(() => {
    // Retrieve the MeterNo from local storage
    const storedMeterNo = JSON.parse(localStorage.getItem("referenceNo"));
    const storedData = JSON.parse(localStorage.getItem("bills")) || [];

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
    const input = downloadBillPageRef.current;
  
    if (!input) {
      console.error("No input element found for download");
      return;
    }
  
    // Wait for fonts to load before capturing
    document.fonts.ready.then(() => {
      html2canvas(input, {
        scale: 2, 
        width: 932,
        height: input.scrollHeight,
      }).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF({
          orientation: "portrait",
          unit: "px",
          format: [canvas.width, canvas.height],
        });
        pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
        pdf.save("bill.pdf");
      });
    });
  };
  
  

  return (
    <div className="flex items-center flex-col">
      {isLoading && (
        <div className="fixed inset-0 bg-white z-50 flex justify-center items-center">
          <div className="loader"></div>
        </div>
      )}

      <div className="mx-auto mb-4">
        <button
          className="text-white bg-indigo-500 border-0 py-1 px-4 focus:outline-none hover:bg-indigo-600 rounded text-md"
          onClick={downloadPdfDocument}
          disabled={!billDetails} // Disable button if billDetails is not set
        >
          DOWNLOAD BILL
        </button>
      </div>

      {/* Only capture this specific div for the PDF */}
      {/* FOR DOWNLOAD THE BILL */}
      <div ref={downloadBillPageRef} style={{ position: "absolute", top: "-200vh", left: "-200vw" }} className="p-4 bg-white shadow-lg">
        <BillDesignDownload billDetails={billDetails} />
      </div>
      {/* FOR DISPLAY */}
      <div className="p-4 bg-white shadow-lg">
        <BillDesign billDetails={billDetails} />
      </div>
    </div>
  );
};

export default DownloadBillPage;
