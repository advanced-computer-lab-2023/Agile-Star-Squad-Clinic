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
import AddFamilyForm from './patient/pages/AddFamily';
import PatientFamily from './patient/pages/PatientFamily';
import NavBar from './shared/components/NavBar/NavBar';
import HealthPackages from './patient/pages/healthPackages/HealthPackages';
import AddingInfo from './checkout/pages/AddingInformation';
import StripeContainer from './checkout/components/StripeContainer';
import Trial2 from './checkout/components/Trial2';
import Payment from "../src/checkout/components/payment/Payment";
import Completion from "../src/checkout/components/payment/Completion";
import './App.css';
import Appointments from './patient/pages/appointments/Appointments';
import BookAppointment from './patient/pages/bookAppointment/BookAppointment';

// import {getAllPatients} from '../src/data/controllers/patientController';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} exact />
          {/* <Route path="/" element={<NavBar />} exact /> */}
          <Route
            path="/patient/register"
            element={<PatientRegisterForm />}
            exact
          />
          <Route path="/patient/home" element={<PatientHome />} exact />
          <Route
            path="/patient/appointment/book"
            element={<BookAppointment />}
            exact
          />
          <Route
            path="/doctor/register"
            element={<DoctorRegisterForm />}
            exact
          />
          <Route path="/healthPackages" element={<HealthPackages/>} exact />
          <Route path="/appointments" element={<Appointments/>} exact/>
          <Route path="/doctor/home" element={<DoctorHome />} exact />
          <Route path="/admin/home" element={<AdminHome />} exact />
          <Route path="/addPackage" element={<NewPackage />} exact />
          <Route path="/updatePackage/:id" element={<UpdatePackage />} exact />
          <Route path="/packages" element={<AdminPackagesView />} exact />
          <Route path="admin/manage" element={<ManageUsersPage />} />
          <Route path="/PatientFamily" element={<PatientFamily />} exact />
          <Route path="/payment" element={<StripeContainer />} exact />
          <Route path="/payment2" element={<Trial2 />} exact />
          <Route path="/payment3" element={<AddingInfo />} exact />
          <Route path="/completion" element={<Completion />} exact />
          
          
          <Route path="*" element={<Navigate to="/" />} />{' '}
        </Routes>
      </BrowserRouter>
    </div>
  );
}


export default App;
