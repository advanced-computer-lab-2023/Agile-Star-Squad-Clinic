import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './login.module.css';
import InputField from './InputField/InputField';
import Button from './Button/Button';
import OTP from './OTP/OTP';
import axios from 'axios';
let otp = 0;


function Component1({ setTab2 }) {

  const [otp, setOtp] = useState('');

  const handleVerifyCode = async (e) => {

    const response = await axios
      .get('http://localhost:3000/resetPassword')
      .then((res) => {
        otp = res.data.code;
        // setTab2(true);
      })

  };

  const handleOTPChange = (otpValue) => {
    setOtp(otpValue);
    console.log(otp);
  };


  const handleResendCode = () => { };

  return (
    <div className="col-md-7" id={styles.rightCol}>
      <div className={styles.titleResetPass}>
        <p>
          <strong>Link Expired</strong>
        </p>
      </div>
      <div className={styles.p3}>
        <p>
          <strong>Enter OTP (One-time password) sent to user@email.com</strong>
        </p>
      </div>
      <OTP onOTPChange={handleOTPChange} />
      <Button
        style={{ width: '400px', height: '40.541px' }}
        onClick={handleVerifyCode}
        name="Verify Code"
      />
      <Button
        style={{
          backgroundColor: 'white',
          color: '#193842',
          borderStyle: 'none',
        }}
        onClick={handleResendCode}
        name="Resend Code"
      />
    </div>
  );
};

export default Component1;