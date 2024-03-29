import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './login.module.css';
import InputField from './InputField/InputField';
import Button from './Button/Button';
import OTP from './OTP/OTP';
import axios from 'axios';
import { toastMeError, toastMeSuccess } from '../../shared/components/util/functions';
let otpBackend = 0;

function Component1({ setTab2 , email }) {
  const [otp, setOtp] = useState('');

  const handleVerifyCode = async (e) => {
    const response = await axios
      .get('http://localhost:3000/auth/resetPassword')
      .then((res) => {
        otpBackend = res.data.code;
        if (otpBackend == otp) {
          setTab2(true);
        } else {
          return toastMeError('Incorrect OTP');
        }
      });
  };

  const handleOTPChange = (otpValue) => {
    setOtp(otpValue);
  };

  const handleResendCode = async (e) => {
    const response = await axios
    .post(`http://localhost:3000/auth/resetPassword/${email}`)
    .then((res) => {
    })
    .catch((err) => {
      toastMeError(err.response.data.message);
    });
    toastMeSuccess('An OTP has been sent to your email!');
  };
  return (
    <div className="col-md-7" id={styles.rightCol}>
      <div className={styles.titleResetPass}>
        <p>
          <strong>Verify OTP</strong>
        </p>
      </div>
      <div className={styles.p3}>
        <p>
          <strong>Enter OTP (One-time password) sent to {email}</strong>
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
}

export default Component1;
