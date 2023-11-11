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

  const handleLogin = (e) => {
    navigate('/')
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
            <div className={styles.title}>
              <p>
                <strong>PASSWORD UPDATED</strong>
              </p>
            </div>
            <div className={styles.p4}>
              <p>
                <strong>
                  Your password has been updated!
                </strong>
              </p>
            </div>
            <Button
              style={{ width: '300px', height: '40.541px', marginBottom:"-40px" }}
              onClick={handleLogin}
              name="LOGIN"
            />
          </div>
        </div>
      </div>
    </body>
  );
};

export default ResetPassword;
