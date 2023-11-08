import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import LandingPage from './shared/pages/LandingPage';
import AdminHome from './admin/pages/ManageUsers/AdminHome';
import NewPackage from './package/pages/NewPackage';
import AdminPackagesView from './package/pages/AdminPackagesView';
import UpdatePackage from './package/pages/UpdatePackage';
import PatientRegisterForm from './patient/pages/PatientRegister';
import PatientHome from './patient/pages/PatientHome';
import DoctorRegisterForm from './doctor/pages/DoctorRequest';
import DoctorHome from './doctor/pages/DoctorHome';
import ManageUsersPage from './admin/pages/ManageUsers/ManageUsersPage'
import './App.css';
import AddFamilyForm from './patient/pages/AddFamily';
import PatientFamily from './patient/pages/PatientFamily';
import NavBar from './shared/components/NavBar/NavBar';
import HomePage from './patient/pages/HomePage';

// import {getAllPatients} from '../src/data/controllers/patientController';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} exact />
          {/* <Route path="/" element={<NavBar />} exact /> */}
          
          <Route
            path="/patient/register"
            element={<PatientRegisterForm />}
            exact
          />
          <Route path="/patient/home" element={<PatientHome />} exact />
          <Route
            path="/doctor/register"
            element={<DoctorRegisterForm />}
            exact
          />
          <Route path="/doctor/home" element={<DoctorHome />} exact />
          <Route path="/admin/home" element={<AdminHome />} exact />
          <Route path="/addPackage" element={<NewPackage />} exact />
          <Route path="/updatePackage/:id" element={<UpdatePackage />} exact />
          <Route path="/packages" element={<AdminPackagesView />} exact />
          <Route path="admin/manage" element={<ManageUsersPage/>}/>
          <Route path="/PatientFamily" element={<PatientFamily />} exact />
          {/*redirect to landing page if wrong url*/}
          <Route path="*" element={<Navigate to="/" />} />{' '}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

