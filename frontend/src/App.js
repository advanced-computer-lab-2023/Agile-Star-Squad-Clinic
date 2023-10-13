import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

import LandingPage from './shared/components/LandingPage/landingPage';
import PatientRegisterForm from './shared/components/FormElements/patientRegisterForm';

// import {getAllPatients} from '../src/data/controllers/patientController';

function App() {
  // const patients = getAllPatients();
  // console.log(patients);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} exact />
          <Route
            path="/patientRegisterForm"
            element={<PatientRegisterForm />}
            exact
          />
          {/*redirect to landing page if wrong url*/}
          <Route path="*" element={<Navigate to="/" />} />{' '}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
