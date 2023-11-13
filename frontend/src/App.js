import React, { useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import Login from './login/pages/login';
import ResetPassword from './login/pages/ResetPassword';
import LandingPage from './shared/pages/LandingPage';
import AdminHome from './admin/pages/ManageUsers/AdminHome';
import NewPackage from './package/pages/NewPackage';
import AdminPackagesView from './package/pages/AdminPackagesView';
import UpdatePackage from './package/pages/UpdatePackage';
import PatientRegisterForm from './patient/pages/PatientRegister';
import PatientHome from './patient/pages/PatientHome';
import DoctorRegisterForm from './doctor/pages/DoctorRequest';
import DoctorHome from './doctor/pages/DoctorHome';
import ManageUsersPage from './admin/pages/ManageUsers/ManageUsersPage';
import './App.css';
import AddFamilyForm from './patient/pages/AddFamily';
import PatientFamily from './patient/pages/PatientFamily';
import NavBar from './shared/components/NavBar/NavBar';
import ResetPassword1 from './login/pages/ResetPassword';
import axios from 'axios';

function App() {
  const [user, setUser] = useState({
    role: null,
    userId: null,
  });
  const [routes, setRoutes] = useState();

  const getUserRoutes = () => {
    if (user.role === 'patient') {
      setRoutes(
        <Routes>
          <Route path="/patient/home" element={<PatientHome />} exact />
          <Route path="*" element={<Navigate to="/patient/home" />} />
        </Routes>
      );
    } else if (user.role === 'doctor') {
      setRoutes(
        <Routes>
          <Route path="/doctor/home" element={<DoctorHome />} exact />
          <Route path="*" element={<Navigate to="/doctor/home" />} />
        </Routes>
      );
    } else if (user.role === 'admin') {
      setRoutes(
        <Routes>
          <Route path="/admin/home" element={<AdminHome user={user} />} exact />
          ;
          <Route path="/addPackage" element={<NewPackage />} exact />
          <Route path="/updatePackage/:id" element={<UpdatePackage />} exact />
          <Route path="/packages" element={<AdminPackagesView />} exact />
          <Route path="admin/manage" element={<ManageUsersPage />} />
          <Route path="*" element={<Navigate to="/admin/home" />} />
        </Routes>
      );
    } else {
      setRoutes(
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
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      );
    }
    console.log('dakhal');
    console.log(routes);
    console.log('kharaj');
  };

  useEffect(() => {
    getUserRoutes();
    console.log(routes);
  }, []);

  useEffect(() => {
    if (user.role === 'guest' || user.userId === null) return;
    axios
      .get(`http://localhost:3000/${user.role}s/${user.userId}`, {
        withCredentials: true,
      })
      .then((res) => {
        setUser((prev) => ({
          ...prev,
          user: { ...res.data.data.admin },
        }));

        console.log(res.data.data);
      });
    getUserRoutes();
  }, [user.role, user.userId]);

  const logoutHandler = async () => {
    await axios.get('http://localhost:3000/auth/logout');
    setUser({ role: 'guest', userId: null });
    window.location.href = '/';
  };

  return (
    <div className="App">
      <button onClick={logoutHandler}>logout</button>
      <BrowserRouter>{routes}</BrowserRouter>
    </div>
  );
}

export default App;

// <Routes>
// <Route path="/" element={<Login setUser={setUser} />} exact />
// <Route path="/resetPassword" element={<ResetPassword />} exact />
// {/* <Route path="/" element={<NavBar />} exact /> */}
// <Route
//   path="/patient/register"
//   element={<PatientRegisterForm />}
//   exact
// />
// <Route path="/patient/home" element={<PatientHome />} exact />
// <Route
//   path="/doctor/register"
//   element={<DoctorRegisterForm />}
//   exact
// />
// <Route path="/doctor/home" element={<DoctorHome />} exact />
// <Route path="/admin/home" element={<AdminHome user={user} />} exact />
// <Route path="/addPackage" element={<NewPackage />} exact />
// <Route path="/updatePackage/:id" element={<UpdatePackage />} exact />
// <Route path="/packages" element={<AdminPackagesView />} exact />
// <Route path="admin/manage" element={<ManageUsersPage />} />
// <Route path="/PatientFamily" element={<PatientFamily />} exact />
// {/*redirect to landing page if wrong url*/}
// <Route path="*" element={<Navigate to="/" />} />{' '}
// </Routes>
