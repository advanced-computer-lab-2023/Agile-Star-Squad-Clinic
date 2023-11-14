import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import axios from 'axios';

import Login from './login/pages/login';
import ResetPassword from './login/pages/ResetPassword';
import AdminHome from './admin/pages/ManageUsers/AdminHome';
import NewPackage from './package/pages/NewPackage';
import AdminPackagesView from './package/pages/AdminPackagesView';
import UpdatePackage from './package/pages/UpdatePackage';
import PatientRegisterForm from './patient/pages/PatientRegister';
import PatientHome from './patient/pages/PatientHome';
import DoctorRegisterForm from './doctor/pages/DoctorRequest';
import DoctorHome from './doctor/pages/DoctorHome';
import ManageUsersPage from './admin/pages/ManageUsers/ManageUsersPage';
import BookAppointment from './patient/pages/bookAppointment/BookAppointment';
import './App.css';
import UserContext from './user-store/user-context';
import SignupOptions from './login/pages/SignupOptions';
import AddFamilyForm from './patient/pages/AddFamily';
import PatientFamily from './patient/pages/PatientFamily';
import NavBar from './shared/components/NavBar/NavBar';
import PatientAccountSettings from './patient/pages/PatientAccountSettings';
import HealthPackages from "./patient/pages/healthPackages/HealthPackages"
import Appointments from './patient/pages/appointments/Appointments';
import PatientHomePage from './patient/pages/PatientHome/HomePage';
import PendingRequest from './requests/pendingRequest';
import RejectedRequest from './requests/rejectedRequest';
import AcceptedRequest from './requests/acceptedRequest';
// import {getAllPatients} from '../src/data/controllers/patientController';

function App() {
  const user = useContext(UserContext);
  const [cookies, setCookie, removeCookie] = useCookies(['jwt']);

  const getUserRoutes = () => {
    if (user.role === 'patient') {
      return (
        <Routes>
        <Route
          path="/patient/appointment/book"
          element={<BookAppointment />}
          exact
        />
        <Route path='/healthPackages' element={<HealthPackages/>} exact/>
        <Route path='/patient/account' element={<PatientAccountSettings/>} exact/>
        <Route path='/appointments' element={<Appointments/>} exact/>
          <Route path="/patient/home" element={<PatientHomePage />} exact />
          <Route path="*" element={<Navigate to="/patient/home" />} />
        </Routes>
      );
    } else if (user.role === 'doctor') {
      if (user.status === "accepted") {
        return <Routes>
          <Route path='/' element={<AcceptedRequest/>}/>
        </Routes>
      } else {
        return (
        <Routes>
          <Route path="/doctor/home" element={<DoctorHome />} exact />
          <Route path="*" element={<Navigate to="/doctor/home" />} />
        </Routes>
      );
      }
      
    } else if (user.role === 'admin') {
      return (
        <Routes>
          <Route path="/admin/home" element={<AdminHome user={user} />} exact />
          <Route path="/addPackage" element={<NewPackage />} exact />
          <Route path="/updatePackage/:id" element={<UpdatePackage />} exact />
          <Route path="/packages" element={<AdminPackagesView />} exact />
          <Route path="admin/manage" element={<ManageUsersPage />} />
          <Route path="*" element={<Navigate to="/admin/home" />} />
        </Routes>
      );
    } else if (user.role === 'request') {
      if (user.status === "Pending") {
        return <Routes>
          <Route path='/' element={<PendingRequest/>}/>
        </Routes>
      } else if (user.status === "Rejected") {
        return (
          <Routes>
            <Route path='/' element={<RejectedRequest/>}/>
          </Routes>
        );
      }
      
    } else {
      return (
        <Routes>
          <Route path="/" element={<Login />} exact />
          <Route path="/resetPassword" element={<ResetPassword />} exact />
          <Route path="signupOptions" element={<SignupOptions/>} exact/>
          <Route
            path="/patient/register"
            element={<PatientRegisterForm />}
            exact
          />
          <Route
            path="/doctor/register"
            element={<DoctorRegisterForm />}
            exact
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      );
    }
  };
  useEffect(() => {
    axios
      .get('http://localhost:3000/auth/me', { withCredentials: true })
      .then((res) => {
        if (res.data.data.user === null) {
          user.logout();
        } else {
          console.log(res.data.data);
          user.login({role: res.data.data.role, userId: res.data.data.id, status: res.data.data.status});
          
        }
      });
  }, []);

  // useEffect(() => {
  //   if (user.role === null || user.role === 'guest') return;
  //   axios
  //     .get(`http://localhost:3000/${user.role}s/${user.userId}`, {
  //       withCredentials: true,
  //     })
  //     .then((res) => {
  //       setUserData((prev) => ({
  //         ...res.data.data[user.role],
  //       }));

  //       console.log(res.data.data);
  //     });
  // }, [user]);

  const logoutHandler = async () => {
    await axios.get('http://localhost:3000/auth/logout');
    removeCookie('jwt', { path: '/' });
    user.logout();
  };
  return (
    <div className="App">
        {/* {Object.keys(cookies).length > 0 && (
          <button onClick={logoutHandler}>logout</button>
        )} */}
        <BrowserRouter>{getUserRoutes()}</BrowserRouter>
    </div>
  );
}

export default App;
