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

  const handleNewPassword = (e) => {};

  const handleEmailCancel = () => {
    navigate('/');
  };
  const handleSubmit = (e) => {};

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
            <div className={styles.title2}>
              <p>
                <strong>NEW CREDENTIALS</strong>
              </p>
            </div>
            <div className={styles.p1}>
              <ul className={styles.rules}>
                <strong>
                <li>Password must be at least 8 characters long.</li>
                <li>Password must contain at least one upper case.</li>
                <li>One lower case letter.</li>
                <li>Password must contain at least one number or special character</li>
                </strong>
              </ul>
            </div>
            <InputField
              style={{ width: '500px', height: '28px' }}
              type="password"
              placeholder="New Password"
              onChange={handleNewPassword}
              value={email}
            />
            <InputField
              style={{ width: '500px', height: '28px'}}
              type="password"
              placeholder="Re-type Password"
              onChange={handleNewPassword}
              value={email}
            />
            <Button
              style={{ width: '300px', height: '40.541px',marginTop:"-40px" }}
              onClick={handleSubmit}
              name="Submit"
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
