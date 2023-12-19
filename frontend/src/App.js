import React, { useContext, useEffect } from 'react';
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
import DoctorRegisterForm from './doctor/pages/DoctorRequest';
import DoctorHome from './doctor/pages/DoctorHome';
import ManageUsersPage from './admin/pages/ManageUsers/ManageUsersPage';
import PatientFamily from './patient/pages/PatientFamily';
import HealthPackages from './patient/pages/healthPackages/HealthPackages';
import AddingInfo from './checkout/pages/AddingInformation';
import AddingInfo2 from './checkout/pages/AddingInformation2';
import BookAppointment from './patient/pages/bookAppointment/BookAppointment';
import UserContext from './user-store/user-context';
import SignupOptions from './login/pages/SignupOptions';
import PatientAccountSettings from './patient/pages/AccountSettings/Account';
import Appointments from './patient/pages/appointments/Appointments';
import Messages from './patient/pages/messages/Messages';
import PatientHomePage from './patient/pages/PatientHome/HomePage';
import PendingRequest from './requests/pendingRequest';
import RejectedRequest from './requests/rejectedRequest';
import AcceptedRequest from './requests/acceptedRequest';
import ChangePassword from './login/pages/ChangePassword';
import Subscription from './checkout/components/payment/SubscriptionForm';
import './App.css';
import AdminHome2 from './admin/pages/AdminHome2';
import AdminAccount from './admin/pages/AdminAccount';
import Meeting from './shared/pages/Meeting';
import BrowseDoctors from './patient/pages/PatientHome/BrowseDoctors';
import Prescriptions from './patient/pages/prescriptions/Prescriptions';
import PatientDetails from './doctor/pages/PatientDetails';
import DoctorHomepage from './doctor/pages/home/DoctorHomepage';
import PatientDetails2 from './doctor/pages/PatientDetails2';

function App() {
  const user = useContext(UserContext);
  const [cookies, setCookie, removeCookie] = useCookies(['jwt']);

  const getUserRoutes = () => {
    if (user.role === 'patient') {
      return (
        <Routes>
          <Route path="/patient/home" element={<PatientHomePage />} exact />
          <Route
            path="/patient/appointment/book"
            element={<BookAppointment />}
            exact
          />
          <Route path="/healthPackages" element={<HealthPackages />} exact />
          <Route
            path="/patient/account"
            element={<PatientAccountSettings />}
            exact
          />
          <Route path="/patient/checkout" element={<AddingInfo />} exact />
          <Route path="/appointments" element={<Prescriptions />} exact />
          <Route path="/messages" element={<Messages />} exact />
          <Route path="/doctors" element={<BrowseDoctors />} exact />
          <Route path="changePassword" element={<ChangePassword />} exact />
          <Route path="/patient/family" element={<PatientFamily />} exact />
          <Route path="/patient/checkout" element={<AddingInfo />} exact />
          <Route path="/package/checkout" element={<AddingInfo2 />} exact />
          <Route path="/completion" element={<Subscription />} exact />
          <Route
            path="/meeting"
            element={
              <React.StrictMode>
                <Meeting />
              </React.StrictMode>
            }
            exact
          />
          <Route path="*" element={<Navigate to="/patient/home" />} />
        </Routes>
      );
    } else if (user.role === 'doctor') {
      if (user.status === 'accepted') {
        return (
          <Routes>
            <Route path="/" element={<AcceptedRequest />} />
          </Routes>
        );
      } else {
        return (
          <Routes>
            <Route path="/doctor/home" element={<DoctorHomepage />} exact />
            <Route path="/patientDetails" element={<PatientDetails  />} exact />
            <Route path="changePassword" element={<ChangePassword />} exact />
            <Route path="/patient" element={<PatientDetails2 />} exact />
          <Route path="/messages" element={<Messages />} exact />
            <Route
              path="/meeting"
              element={
                <React.StrictMode>
                  <Meeting />
                </React.StrictMode>
              }
              exact
            />
            <Route path="*" element={<Navigate to="/doctor/home" />} />
          </Routes>
        );
      }
    } else if (user.role === 'admin') {
      return (
        <Routes>
          <Route
            path="/admin/home"
            element={<AdminHome2 user={user} />}
            exact
          />
          <Route path="/addPackage" element={<NewPackage />} exact />
          <Route path="/updatePackage/:id" element={<UpdatePackage />} exact />
          <Route path="/packages" element={<AdminPackagesView />} exact />
          <Route path="admin/manage" element={<ManageUsersPage />} />
          <Route path="admin/requests" element={<ManageUsersPage />} />
          <Route path="admin/account" element={<AdminAccount />} />
          <Route path="changePassword" element={<ChangePassword />} exact />
          <Route path="*" element={<Navigate to="/admin/home" />} />
        </Routes>
      );
    } else if (user.role === 'request') {
      if (user.status === 'Pending') {
        return (
          <Routes>
            <Route path="/" element={<PendingRequest />} />
          </Routes>
        );
      } else if (user.status === 'Rejected') {
        return (
          <Routes>
            <Route path="/" element={<RejectedRequest />} />
          </Routes>
        );
      }
    } else {
      return (
        <Routes>
          <Route path="/" element={<Login />} exact />
          <Route path="/resetPassword" element={<ResetPassword />} exact />
          <Route path="signupOptions" element={<SignupOptions />} exact />
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
          <Route path="/healthPackages" element={<HealthPackages />} exact />
          <Route path="/doctor/home" element={<DoctorHome />} exact />
          <Route path="/admin/home" element={<AdminHome2 />} exact />
          <Route path="/addPackage" element={<NewPackage />} exact />
          <Route path="/updatePackage/:id" element={<UpdatePackage />} exact />
          <Route path="/packages" element={<AdminPackagesView />} exact />
          <Route path="admin/manage" element={<ManageUsersPage />} />
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
          user.login({
            role: res.data.data.role,
            userId: res.data.data.id,
            status: res.data.data.status,
          });
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
