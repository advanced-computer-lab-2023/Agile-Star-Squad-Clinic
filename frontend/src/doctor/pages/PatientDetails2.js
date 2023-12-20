import ReactDOM from 'react-dom';
import React, { useState, useEffect, useContext } from 'react';
import Card from '../../shared/components/Card/Card';
import DoctorNavBar from '../components/DoctorNavBar';
import PatientHealthRecord from '../components/PatientHealthRecords';
import UserContext from '../../user-store/user-context';
import axios from 'axios';

import { useLocation } from 'react-router-dom';
import PatientPersonalDetails from '../components/PatientPersonalDetails';
import styles from './PatientDetails.module.css';
import PatientPrescriptionDetails from '../components/PatientPrescriptionDetails';
import RecentAppointment from '../components/RecentAppointment';

const PatientDetails2 = () => {
  const doctor = useContext(UserContext);
  const location = useLocation();
  const patient = location.state;

  return (
    <React.Fragment>
      <DoctorNavBar />
      <div className="container " >
        <div className="row justify-content-center" style={{marginLeft: '0px',width: '110%',marginTop: '10px'}}>
          <div className="col" >
            <PatientPersonalDetails data={patient} />
          </div>
          <div className="col">
            <PatientHealthRecord data={patient} />
          </div>
        </div>
        <div className="row justify-content-center" style={{marginLeft: '0px',width: '110%',marginTop: '10px'}}>
          <div className="col">
            <PatientPrescriptionDetails patient={patient} doctor={doctor} />
          </div>
          <div className="col">
            <RecentAppointment patient={patient} doctor={doctor}/>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default PatientDetails2;
