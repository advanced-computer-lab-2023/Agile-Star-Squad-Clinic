import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './login.module.css';
import InputField from './InputField/InputField';
import Button from './Button/Button';

function Component2({ setTab3 }) {
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState('');
  const [retypePassword, setRetypePassword] = useState('');

  const handleEmailCancel = () => {
    navigate('/');
  };

  const handleNewPassword = (e) => { 
    setNewPassword(e.target.value);
  };
  const handleRetypePassword = (e)=>{
    setRetypePassword(e.target.value);
  }  
  const handleSubmit = (e) => {
    if (newPassword === retypePassword) {
      setTab3(true);
    } else {
      setNewPassword('');
      setRetypePassword('');
      alert("Passwords do not match");
    }
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
        value={newPassword}
        onChange={(e) => handleNewPassword()}
      />
      <InputField
        style={{ width: '500px', height: '28px' }}
        type="password"
        placeholder="Re-type Password"
        value={retypePassword} 
        onChange={(e) => handleRetypePassword()}
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
