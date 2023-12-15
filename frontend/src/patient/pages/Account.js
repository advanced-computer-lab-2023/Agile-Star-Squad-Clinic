import React, { useState, useEffect, useContext } from 'react';
import storage from '../../index';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import ReactDOM from 'react-dom';
//import classes from './PatientAccountSettings.module.css';
import NavBar from '../../shared/components/NavBar/NavBar';
import UserContext from '../../user-store/user-context';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Account.css';
import patient1 from '../../assets/patientHomepage/patient1.png';
import fam from '../../assets/patientHomepage/fam.png';
import med from '../../assets/patientHomepage/med.png';
import pay from '../../assets/patientHomepage/pay.png';
import setting from '../../assets/patientHomepage/setting.png';

const PatientAccountSettings = (props) => {

  const patient = useContext(UserContext);
  const navigate = useNavigate();
  const [healthPackage, setPackage] = useState(null);
  const [medicalRecordUrls, setMedicalRecords] = useState(null);
  const [isButtonPressed, setButtonPressed] = useState(false);
  const [healthRecord, setHealthRecord] = useState('');
  const [subscriptionDate, setsubscriptionDate] = useState(Date.now());
  const [expiringDate, setexpiringDate] = useState(Date.now());
  const [cancellationDate, setcancellationDate] = useState(Date.now());
  const [currentPatient, setCurrentPatient] = useState('');

  const onHealthRecordChange = (file) => {
    setHealthRecord(file.target.files[0]);
  };

  const fetchPackage = async () => {
    fetch(`http://localhost:3000/patients/${patient.userId}`, {
      credentials: 'include',
    }).then(async (response) => {
      const json = await response.json();
      console.log(json.data);
      setsubscriptionDate(json.data.patient.subscriptionDate);
      setexpiringDate(json.data.patient.expiringDate);
      setMedicalRecords(json.data.patient.medicalRecord);
      setPackage(json.data.patient.package);
      setCurrentPatient(json.data.patient);
      setcancellationDate(json.data.patient.cancellationDate);
    });
  };
  
  const handeleUnsubscribeButtonclick = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/patients/${patient.userId}/package`,
        {
          method: 'PATCH',
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        },
      );
      console.log(response);
      if (response.ok) {
        setButtonPressed(true);
        setPackage(null);
        setcancellationDate(JSON.stringify(new Date()));
      } else {
        console.error(
          'Failed to remove health package. Status:',
          response.status,
        );
        const responseBody = await response.json();
        console.error('Response body:', responseBody);
      }
    } catch (error) {
      console.error('Error removing health package:', error);
    }
  };
  const handleHealthRecordUpload = async () => {
    let healthRecordUrl;
    if (healthRecord !== '') {
      const healthRecordRef = ref(storage, `${healthRecord.name}`);
      await uploadBytesResumable(healthRecordRef, healthRecord).then(
        async (snapshot) => {
          healthRecordUrl = await getDownloadURL(snapshot.ref);
        },
      );
    }
    setMedicalRecords((records) => {
      return [...records, healthRecordUrl];
    });
    // const formData = new FormData();
    // formData.append('medicalRecord', healthRecordUrl);
    const data = {
      medicalRecord: healthRecordUrl,
    };

    try {
      console.log(healthRecordUrl);
      const requestOptions = {
        method: 'PATCH',
        headers: { 'Content-type': 'application/json; charset=UTF-8' },
        body: JSON.stringify(data),
      };
      console.log(requestOptions.body);
      console.log(requestOptions);

      const response = await fetch(
        `http://localhost:3000/patients/${patient.userId}`,
        requestOptions,
      );
      console.log(response);
      if (!response.ok) {
        alert('Failed to upload health record');
      }
    } catch (error) {
      console.error('Error uploading health record:', error);
    }
  };

  useEffect(() => {
    fetchPackage();
  }, []);

  const deleteImage = (e, url) => {
    e.preventDefault();

    setMedicalRecords((records) => {
      const newRecords = records.filter((record) => record != url);
      const requestOptions = {
        method: 'PATCH',
        headers: { 'Content-type': 'application/json; charset=UTF-8' },
        body: JSON.stringify({ medicalRecord: newRecords }),
      };

      fetch(
        `http://localhost:3000/patients/${patient.userId}/setHealthRecords`,
        requestOptions,
      );
      return newRecords;
    });
  };

  const logout = async () => {
    await patient.logout();
    navigate('/');
  };

  const changePasswordHandler = () => {
    navigate('/changePassword');
  };

  const familyMembersHandler = () => {
    navigate('/patient/family');
  };

  const { healthRecordInput } = healthRecord;
  return (
    <body>
      <NavBar />
     <div className='patient-info'>
        <h2 className='name'>{currentPatient.name}</h2>
        <img className='patient-image'src= {patient1} />
     </div>
     <section className='patient-actions'>
      <div>
        <h3>Settings</h3>
        <div className='account-settings'>
        <img src={setting} />
        </div>
      </div>

      
       
      </section>
    </body>
    
  );
  

};
export default PatientAccountSettings;
