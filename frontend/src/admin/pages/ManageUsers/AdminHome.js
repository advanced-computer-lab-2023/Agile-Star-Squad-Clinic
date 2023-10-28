import React from 'react';
import { Link } from 'react-router-dom';

const AdminHome = (props) => {
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
      <Link to="/">
          <button id ="addingbutton"className="btn btn-primary sm">Back to Home</button>
        </Link>
    </div>
    </>
  );
};

export default AdminHome;
