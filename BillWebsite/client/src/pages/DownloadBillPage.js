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

  // UseEffect to handle Bill Data
  useEffect(() => {
    // Retrieve the userId and Bill Details from local storage
    const storedData = JSON.parse(localStorage.getItem("billDetails")) || [];

    if (storedData.length > 0){
      const currentBillDetails = storedData[storedData.length -1];// Last Entry Details Means Current Month Details
      const updatedBillData = {
      aboveAddressSection:{
        userId: currentBillDetails.userId, // Will use for Consumer ID 
        name: currentBillDetails.name,
        location: currentBillDetails.location,
        tariffCategory: currentBillDetails.tariffCategory,
        phase: currentBillDetails.phase,
        meterType: currentBillDetails.meterType,
        billMonthDate: currentBillDetails.billMonthDate,
        billDurationStartDate: currentBillDetails.billDurationStartDate,
        billDurationEndDate: currentBillDetails.billDurationEndDate,
        billDueDate: currentBillDetails.billDueDate,
      },
      belowAddressSection: {
        meterNo: currentBillDetails.location,
        previousReadingPeak: currentBillDetails.previousReadingPeak,
        previousReadingOffPeak: currentBillDetails.previousReadingOffPeak,
        presentReadingPeak: currentBillDetails.presentReadingPeak,
        presentReadingOffPeak: currentBillDetails.presentReadingOffPeak,
        mfValue: currentBillDetails.mfValue,
        peakUnits: currentBillDetails.presentReadingPeak - currentBillDetails.previousReadingPeak,
        peakOffUnits: currentBillDetails.presentReadingOffPeak - currentBillDetails.previousReadingOffPeak,
      },
      electricityCharges: {
        costOfElectricity: currentBillDetails.costOfElectricity,
        gst: currentBillDetails.gst,
        qtrTex: currentBillDetails.qtrTex, 
        fuelPriceAdjustment: currentBillDetails.fuelPriceAdjustment,
        fixedCharges: currentBillDetails.fixedCharges,
      },
      govtCharges: {
        ptvFee: currentBillDetails.ptvFee,
        meterRent: currentBillDetails.meterRent,
        fcSurcharge: currentBillDetails.fcSurcharge,
      },
      arrears: {
        waterBill: currentBillDetails.waterBill,
      },
      lpSurchargeRate: currentBillDetails.lpSurchargeRate,
      fpaRate: currentBillDetails.fpaRate,
      billFPADate: currentBillDetails.billFPADate,
      tariffValueSection:{
        peakValue: currentBillDetails.tariffPeakValue,
        offPeakValue: currentBillDetails.tariffOffPeakValue
      }
      // Add more sections here if needed
    };
    setBillDetails(updatedBillData);
    // console.log("billDetails local: ", billDetails)
    }
    else{
      console.log("No Bill found.")
    }

    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // Download pdf Function
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
  
  
  // RETURN JSX
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
