// import React from 'react';
// import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

<<<<<<< HEAD
// import LandingPage from './shared/pages/LandingPage';
// import AdminHome from './admin/pages/ManageUsers/AdminHome';
// import NewPackage from './package/pages/NewPackage';
// import AdminPackagesView from './package/pages/AdminPackagesView';
// import UpdatePackage from './package/pages/UpdatePackage';
// import PatientRegisterForm from './patient/pages/PatientRegister';
// import PatientHome from './patient/pages/PatientHome';
// import DoctorRegisterForm from './doctor/pages/DoctorRequest';
// import DoctorHome from './doctor/pages/DoctorHome';
// import ManageUsersPage from './admin/pages/ManageUsers/ManageUsersPage'
// import './App.css';
// import AddFamilyForm from './patient/pages/AddFamily';
// import PatientFamily from './patient/pages/PatientFamily';
// import AddingInfo from './checkout/pages/AddingInformation';
// import StripeContainer from './checkout/components/StripeContainer';
// import Trial2 from './checkout/components/Trial2';
// // import { Delivery } from './checkout/components/delivery/Delivery';
// // import {Payment} from './checkout/components/payment/Payment';
// // import {Confirmation} from './checkout/components/confirmation/Confirmation'
// // import {getAllPatients} from '../src/data/controllers/patientController';
=======
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
import HealthPackages from './patient/pages/healthPackages/HealthPackages';
>>>>>>> 22102166bb86bcd00119880c0b46a9320fb36bdb

// function App() {
//   return (
//     <div className="App">
//       <BrowserRouter>
//         <Routes>
          
<<<<<<< HEAD
//           <Route path="/" element={<LandingPage />} exact />
          
//           <Route
//             path="/patient/register"
//             element={<PatientRegisterForm />}
//             exact
//           />
//           <Route path="/patient/home" element={<PatientHome />} exact />
//           <Route
//             path="/doctor/register"
//             element={<DoctorRegisterForm />}
//             exact
//           />
//           <Route path="/payment" element={<StripeContainer />} exact />
//           <Route path="/payment2" element={<Trial2 />} exact />
//           <Route path="/payment3" element={<AddingInfo />} exact />
//           <Route path="/doctor/home" element={<DoctorHome />} exact />
//           <Route path="/admin/home" element={<AdminHome />} exact />
//           <Route path="/addPackage" element={<NewPackage />} exact />
//           <Route path="/updatePackage/:id" element={<UpdatePackage />} exact />
//           <Route path="/packages" element={<AdminPackagesView />} exact />
//           <Route path="admin/manage" element={<ManageUsersPage/>}/>
//           <Route path="/PatientFamily" element={<PatientFamily />} exact />
//           {/* <Route path="/delivery" element={< Delivery/>} exact />
//           <Route path="/confirmation" element={<Confirmation />} exact />
//           <Route path="/payment" element={<Payment />} exact /> */}
//           {/*redirect to landing page if wrong url*/}
//           <Route path="*" element={<Navigate to="/" />} />{' '}
//         </Routes>
//       </BrowserRouter>
//     </div>
//   );
// }
=======
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
          <Route path="/healthPackages" element={<HealthPackages/>} exact />
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
>>>>>>> 22102166bb86bcd00119880c0b46a9320fb36bdb

// export default App;

