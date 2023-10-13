import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ManageUsersPage from './admin/pages/ManageUsers/ManageUsersPage';
import DoctorHome from './doctor/pages/DoctorHome';
import PatientHome from './patient/pages/PatientHome'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <div id="backdrop-root"></div>
    <PatientHome />
  </>
);

reportWebVitals();