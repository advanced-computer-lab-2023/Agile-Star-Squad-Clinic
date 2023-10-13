import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import LandingPage from './shared/pages/landingPage';
import PatientRegisterForm from './patient/pages/patientRegister';
import PatientHome from './patient/pages/PatientHome';
import DoctorRegiterForm from './doctor/pages/doctorRequest';
import DoctorHome from './doctor/pages/DoctorHome';
import './App.css';

function App() {
  return (
    <div className="App">
      <div id="backdrop-root"></div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} exact />
          <Route
            path="/patient/register"
            element={<PatientRegisterForm />}
            exact
          />
          <Route path="/patient/login" element={<PatientHome />} exact />
          <Route
            path="/doctor/register"
            element={<DoctorRegiterForm />}
            exact
          />
          <Route path="/doctor/login" element={<DoctorHome />} exact />
          {/*redirect to landing page if wrong url*/}
          <Route path="*" element={<Navigate to="/" />} />{' '}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
