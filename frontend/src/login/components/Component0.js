import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './login.module.css';
import InputField from './InputField/InputField';
import Button from './Button/Button';

function Component0({ setTab }){
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleRequestLink= (e) => {
    setEmail(e.target.value);
    setTab(true);
  };

  const handleEmailCancel = () => {
    navigate('/');
  };
  return (
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
        style={{ width: '500px', height: '28px', marginTop: '20px' }}
        type="email"
        placeholder="Email Address"
        onChange={handleRequestLink}
        value={email}
      />
      <Button
        style={{ width: '400px', height: '40.541px' }}
        onClick={handleRequestLink}
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
  );
};

export default Component0;
