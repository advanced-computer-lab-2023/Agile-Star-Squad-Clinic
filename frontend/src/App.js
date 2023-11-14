import React, {  useEffect, useState } from 'react';
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
import ManageUsersPage from './admin/pages/ManageUsers/ManageUsersPage'
import AddFamilyForm from './patient/pages/AddFamily';
import PatientFamily from './patient/pages/PatientFamily';
import NavBar from './shared/components/NavBar/NavBar';
import HealthPackages from './patient/pages/healthPackages/HealthPackages';
import AddingInfo from './checkout/pages/AddingInformation';
import AddingInfo2 from './checkout/pages/AddingInformation2';
import Payment from "../src/checkout/components/payment/Payment";
import Completion from "../src/checkout/components/payment/Completion";
import BookAppointment from './patient/pages/bookAppointment/BookAppointment';
import UserContext from './user-store/user-context';
import './App.css';
import Appointments from './patient/pages/appointments/Appointments';
import Subscription from './checkout/components/payment/SubscriptionForm';

// import {getAllPatients} from '../src/data/controllers/patientController';

function App() {
 
  const [cookies, setCookie, removeCookie] = useCookies(['jwt']);
  const [user, setUser] = useState({
    role: null,
    userId: null,
  });
  const [userData, setUserData] = useState(null);

  const getUserRoutes = () => {
    if (user.role === 'patient') {
      return (
        <Routes>
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
          <Route path="*" element={<Navigate to="/patient/home" />} />
        </Routes>
      );
    } else if (user.role === 'doctor') {
      return (
        <Routes>
          <Route path="/doctor/home" element={<DoctorHome />} exact />
          <Route path="*" element={<Navigate to="/doctor/home" />} />
        </Routes>
      );
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
    } else {
      return (
        <Routes>
          <Route path="/" element={<Login setUser={setUser} />} exact />
          <Route path="/resetPassword" element={<ResetPassword />} exact />
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
          <Route path="/healthPackages" element={<HealthPackages/>} exact />
          <Route path="/doctor/home" element={<DoctorHome />} exact />
          <Route path="/admin/home" element={<AdminHome />} exact />
          <Route path="/addPackage" element={<NewPackage />} exact />
          <Route path="/updatePackage/:id" element={<UpdatePackage />} exact />
          <Route path="/packages" element={<AdminPackagesView />} exact />
          <Route path="admin/manage" element={<ManageUsersPage/>}/>
          <Route path="/PatientFamily" element={<PatientFamily />} exact />
          <Route path="/patient/checkout" element={<AddingInfo />} exact />
          <Route path="/package/checkout" element={<AddingInfo2 />} exact />
          <Route path="/completion" element={<Subscription />} exact />
          
          
         
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
          setUser({ role: 'guest', userId: null });
        } else {
          setUser((prev) => ({
            ...prev,
            role: res.data.data.role,
            userId: res.data.data.id,
          }));
        }
      });
  }, []);

  useEffect(() => {
    if (user.role === null || user.role === 'guest') return;
    axios
      .get(`http://localhost:3000/${user.role}s/${user.userId}`, {
        withCredentials: true,
      })
      .then((res) => {
        setUserData((prev) => ({
          ...res.data.data[user.role],
        }));

        console.log(res.data.data);
      });
  }, [user]);

  const logoutHandler = async () => {
    await axios.get('http://localhost:3000/auth/logout');
    removeCookie('jwt', { path: '/' });
    setUser({ role: 'guest', userId: null });
  };
  return (
    <div className="App">
        {Object.keys(cookies).length > 0 && (
          <button onClick={logoutHandler}>logout</button>
        )}
        <BrowserRouter>{getUserRoutes()}</BrowserRouter>
    </div>
  );
}


export default App;
