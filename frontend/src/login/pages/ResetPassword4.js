import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../components/login.module.css';
import logo from '../images/logo.svg';
import img from '../images/Bandage.png';
import OTP from '../components/OTP/OTP';
import Button from '../components/Button/Button';

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleVerifyCode = (e) => {};

  const handleResendCode = () => {
  };

  return (
    <body>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-5">
            <div className={styles.logo}>
              <img src={logo} alt="logo" />
            </div>
            <img className={styles.bandage} src={img} alt="login" />
          </div>

          <div className="col-md-7" id={styles.rightCol}>
            <div className={styles.titleResetPass}>
              <p>
                <strong>Link Expired</strong>
              </p>
            </div>
            <div className={styles.p1}>
              <p>
                <strong>
                  Enter OTP (One-time password) sent to user@email.com
                </strong>
              </p>
            </div>
            <OTP />
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
        </div>
      </div>
    </body>
  );
};

export default ResetPassword;
