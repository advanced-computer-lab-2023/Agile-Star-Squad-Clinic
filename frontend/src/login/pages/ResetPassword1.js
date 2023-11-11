import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../components/login.module.css';
import logo from '../images/logo.svg';
import img from '../images/Bandage.png';
import InputField from '../components/InputField/InputField';
import Button from '../components/Button/Button';

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleEmailCancel = () => {
    navigate("/")
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
              <p className={styles.text}>
                <strong>Forgot Password</strong>
              </p>
            </div>
            <div>
              <p className={styles.text}>
                <strong>
                  Provide your account's email for which you want to reset your
                  password
                </strong>
              </p>
            </div>
            <InputField
              style={{ width: '500px', height: '28px' , marginTop: '20px'}}
              type="email"
              placeholder="Email Address"
              onChange={handleEmailChange}
              value={email}
            />
            <Button
              style={{ width: '400px', height: '40.541px' }}
              onClick={handleEmailChange}
              name="Request reset password link"
            />
            <Button
              style={{
                backgroundColor: 'white',
                color: '#193842',
                borderStyle: 'none',
              }}
              onClick={handleEmailCancel}
              name="Cancel"
            />
          </div>
        </div>
      </div>
    </body>
  );
};

export default ResetPassword;
