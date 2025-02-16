/**
 * Validates the meter info object
 * @param {Object} meterInfo - The meter info object to validate
 * @returns {boolean} - Returns true if the meter info is valid, false otherwise
 */
const validateMeterInfo = (meterInfo) => {
    if (!meterInfo || typeof meterInfo !== 'object') {
      return false;
    }
  
    const requiredFields = ['userId', 'present_peak_reading', 'present_off_peak_reading'];
    for (const field of requiredFields) {
      if (!(field in meterInfo)) {
        return false;
      }
    }
  
    // Allow userId to be either a string or a number
    if (typeof meterInfo.userId !== 'string' && typeof meterInfo.userId !== 'number') {
      return false;
    }
  
    if (typeof meterInfo.userId === 'string' && meterInfo.userId.trim() === '') {
      return false;
    }
  
    if (!Number.isFinite(meterInfo.present_peak_reading) || meterInfo.present_peak_reading < 0) {
      return false;
    }
  
    if (!Number.isFinite(meterInfo.present_off_peak_reading) || meterInfo.present_off_peak_reading < 0) {
      return false;
    }
  
    return true;
  };
  
  module.exports = {
    validateMeterInfo
  };