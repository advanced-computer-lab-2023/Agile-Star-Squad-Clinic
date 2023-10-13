import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import App from './App';
import reportWebVitals from './reportWebVitals';
import PatientRegisterForm from './patientRegisterForm';
import ManageUsersPage from './admin/pages/ManageUsers/ManageUsersPage';
import DoctorHome from './doctor/pages/DoctorHome';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    {/* <div id="backdrop-root"></div>
    <DoctorHome /> */}
    <Switch>
      <Route path="/" exact>
        <LandingPage />
      </Route>
      <Route path="/patientRegisterForm" exact>
        <PatientRegisterForm />
      </Route>
      {/* <Route path="/places/new" exact>
        <NewPlace />
      </Route>
      <Route path="/:userId/places" exact>
        <UserPlaces /> */
      /* </Route> */}
      <Redirect to="/" />
    </Switch>
  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
