import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './login.module.css';
import InputField from './InputField/InputField';
import Button from './Button/Button';

function Component2({ setTab3 }) {
  const navigate = useNavigate();
  const handleNewPassword = (e) => {};

  const handleEmailCancel = () => {
    navigate('/');
  };

  const handleSubmit = (e) => {
    setTab3(true);
  };

  return (
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
            <li>
              Password must contain at least one number or special character
            </li>
          </strong>
        </ul>
      </div>
      <InputField
        style={{ width: '500px', height: '28px' }}
        type="password"
        placeholder="New Password"
        onChange={handleNewPassword}
      />
      <InputField
        style={{ width: '500px', height: '28px' }}
        type="password"
        placeholder="Re-type Password"
        onChange={handleNewPassword}
      />
      <Button
        style={{ width: '300px', height: '40.541px', marginTop: '-40px' }}
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
  );
}
export default Component2;
