import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UserContext from '../../user-store/user-context';
import axios from 'axios';

const AdminAccount = () => {
  const navigate = useNavigate();
  const userCtx = useContext(UserContext);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const logout = async () => {
    await userCtx.logout();
    navigate('/');
  };


  const changePasswordHandler = () => {
    navigate('/changePassword');
  };

  return (
    <div>
      <h2>Admin Account Page</h2>
      <div>
        <button onClick={logout}>Logout</button>
      </div>
      
      <div>
        {/* Use the button to navigate to the "Change Password" page */}
        <button onClick={changePasswordHandler}>Go to Change Password Page</button>
      </div>
      <div>
        <Link to="/admin/home">Back to Admin Home</Link>
      </div>
    </div>
  );
};

export default AdminAccount;
