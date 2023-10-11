import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';
import reportWebVitals from './reportWebVitals';
<<<<<<< HEAD
import PatientRegisterForm from './shared/components/FormElements/patientRegisterForm';
import ManageUsersPage from './admin/pages/ManageUsers/ManageUsersPage';
// import NewPackage from './shared/components/FormElements/newPackage';
// import DoctorHome from './doctor/pages/DoctorHome';


=======
import DoctorRequestForm from './shared/components/FormElements/doctorRequestForm';
>>>>>>> d43bb1faf1a26bc7f44c2cf1e90029a73dcbbecc

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <div id="backdrop-root"></div>
<<<<<<< HEAD
    {/* <NewPackage /> */}
=======
    <DoctorRequestForm />
>>>>>>> d43bb1faf1a26bc7f44c2cf1e90029a73dcbbecc
  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
