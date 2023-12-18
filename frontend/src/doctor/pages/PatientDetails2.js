import ReactDOM from 'react-dom';
import React, { useState, useEffect, useContext } from 'react';
import Card from '../../shared/components/Card/Card';
import DoctorNavBar from '../components/DoctorNavBar';
import PatientHealthRecord from '../components/PatientHealthRecords';
import UserContext from '../../user-store/user-context';
import axios from 'axios';

import { useLocation } from 'react-router-dom';
import PatientPersonalDetails from '../components/PatientPersonalDetails';
import './PatientDetails.css'
import PatientPrescriptionDetails from '../components/PatientPrescriptionDetails';

const PatientDetails2 = () => {
  
  const doctor = useContext(UserContext);
  const location = useLocation();
  const patient = location.state;



  return (
    <React.Fragment>
      <DoctorNavBar />
      <div className='container' style={{display:'flex',justifyContent:'space-between'}}>
     <PatientPersonalDetails data={patient}/>
     <PatientHealthRecord data={patient}/>
    
      <PatientPrescriptionDetails  patient={patient} doctor={doctor}/>
      </div>
    </React.Fragment>
  );
};



export default PatientDetails2;
