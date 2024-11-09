
// Calculate Electric Cost
// Electric Cost = (Peak Units * Peak Tariff Rate) + (Off Peak Units * Off Peak Tariff Rate)
const calculateElectricCost = (peakUnits, offPeakUnits, tariffSlabs) => {
  return (peakUnits * tariffSlabs.peak) + (offPeakUnits * tariffSlabs.offPeak);
};

// Calculate GST
// GST = (Electric Cost + Fixed Charges + QTR Tax) * 0.18
const calculateGST = (electricCost, fc, qtrTex) => {
  return (electricCost + fc + qtrTex) * 0.18;
};

// Calculate QTR Tex
// QTR Tex = Total Units * QTR Rate
const calculateQtrTex = (totalUnits, qtrRate) => {
  return totalUnits * qtrRate;
};

// Calculate FPA (Fuel Price Adjustment) | FPA Rate = 3.3287 , 
// FPA = (Total Units * FPA Rate) + GST on FPA + ED on FPA  
const calculateFPA = (totalUnitsOld, fpaRate, edOnFpaRate, gstOnFpaRate) => {
  const fpaCost = totalUnitsOld * fpaRate;
  const edOnFpa = totalUnitsOld * edOnFpaRate; // 1.5% of old total units
  const gstOnFpa = (fpaCost + edOnFpa) * gstOnFpaRate; 
  return (fpaCost + edOnFpa) + gstOnFpa;
};

// ED (Electricity Duty) only applied in Rawalpindi Region
// (This would depend on regional logic, which might be implemented as a conditional check.)

// FC (Fuel Cost)
// FC = Total Units * 3.23
const calculateFC = (totalUnits, fcRate) => {
  return totalUnits * fcRate;
};

module.exports = {
  calculateElectricCost,
  calculateGST,
  calculateQtrTex,
  calculateFPA,
  calculateFC,
};
