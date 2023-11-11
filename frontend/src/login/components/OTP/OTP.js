import React, { useState, createRef  } from 'react';
import styles from './OTP.module.css';

function OTPInput() {
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const otpInputs = Array.from({ length: 6 }, (_, index) => index);
  
    const inputRefs = otpInputs.map(() => createRef());
  
    const handleInputChange = (e, index) => {
      const value = e.target.value;
  
      if (isNaN(value)) {
        return; // Allow only numeric input
      }
  
      const updatedOtp = [...otp];
      updatedOtp[index] = value;
      setOtp(updatedOtp);
  
      // Move to the next input field, if available
      if (value !== '' && index < otpInputs.length - 1) {
        inputRefs[index + 1].current.focus();
      }
    };
  

  return (
      <div className={styles.otpInputContainer}>
        {otpInputs.map((index) => (
          <input
            key={index}
            ref={inputRefs[index]}
            type="text"
            value={otp[index]}
            onChange={(e) => handleInputChange(e, index)}
            maxLength="1"
          />
        ))}
      </div>
  );
}

export default OTPInput;
