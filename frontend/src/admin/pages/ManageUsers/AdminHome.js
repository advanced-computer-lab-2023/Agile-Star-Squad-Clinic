import axios from 'axios';
import React, { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UserContext from '../../../user-store/user-context';

const AdminHome = (props) => {
  const userCtx = useContext(UserContext);
  const navigate = useNavigate();

  const logout = () => {
    userCtx.logout();
    navigate("/");
  }
  return (
    <>
      <div>
        <h1>Welcome to Admin Home</h1>
        <Link to="/admin/manage">
          <button>Manage Users</button>
        </Link>

        <Link to="/packages">
          <button>Packages Page</button>
        </Link>
      </div>
      <div>
          <button onClick={logout} id="addingbutton" className="btn btn-primary sm">
            Logout
          </button>
      </div>
    </>
  );
};

export default AdminHome;
