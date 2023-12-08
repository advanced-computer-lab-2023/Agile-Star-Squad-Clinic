import React, { useState, useEffect, useContext } from 'react';
import storage from '../../../index';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import ReactDOM from 'react-dom';
//import classes from './PatientAccountSettings.module.css';
import NavBar from '../../../shared/components/NavBar/NavBar';
import UserContext from '../../../user-store/user-context';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import classes from './Account.module.css';
import patient1 from '../../../assets/patientHomepage/patient1.png';
import fam from '../../../assets/patientHomepage/fam.png';
import med from '../../../assets/patientHomepage/med.png';
import pay from '../../../assets/patientHomepage/pay.png';
import setting from '../../../assets/patientHomepage/setting.png';
import globeImg from '../../../assets/patientAccount/globe.png';
import familyImg from '../../../assets/patientAccount/family.png';
import medicalImg from '../../../assets/patientAccount/medical.png';
import paymentImg from '../../../assets/patientAccount/payment.png';
import appointmentsImg from '../../../assets/patientAccount/appointments.png';
import notificationImg from '../../../assets/patientAccount/notification.png';
import aboutImg from '../../../assets/patientAccount/about.png';
import contactImg from '../../../assets/patientAccount/contact.png';
import inviteImg from '../../../assets/patientAccount/invite.png';
import logoutImg from '../../../assets/patientAccount/logout.png';
import calendarImg from '../../../assets/patientAccount/calendar.png';
import chevronRight from '../../../assets/patientAccount/chevronRight.png';

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
      <Greeting name={currentPatient.name} imageUrl={patient1} joinedDate={currentPatient.creationDate} />
      <SettingsContainer title={"Settings"}>
        <SettingsTile title={"Account Details"} imagePath={globeImg}/>
        <SettingsTile title={"My Family"} imagePath={familyImg}/>
        <SettingsTile title={"Medical History"} imagePath={medicalImg}/>
        <SettingsTile title={"Payment Details"} imagePath={paymentImg}/>
      </SettingsContainer>
      <SettingsContainer title={"Account"}>
        <SettingsTile title={"Appointments"} imagePath={appointmentsImg}/>
        <SettingsTile title={"Email Notifications"} imagePath={notificationImg}/>
      </SettingsContainer>
      <SettingsContainer title={"Other"}>
        <SettingsTile title={"About Us"} imagePath={aboutImg}/>
        <SettingsTile title={"Contact Us"} imagePath={contactImg}/>
        <SettingsTile title={"Invite Your Friends"} imagePath={inviteImg}/>
        <SettingsTile title={"Logout"} imagePath={logoutImg}/>
      </SettingsContainer>
      
      <AppointmentsCard/>
    </body>
    
  );
  

};
export default PatientAccountSettings;

const AppointmentsCard = () => {
  const [tab, setTab] = useState(0);
  return <SideCard>
    <div className='d-flex justify-content-between align-items-center'>
      <div className={classes.sideCardTitle}>My Appointments</div>
      <img  src={calendarImg} height={24}/>
    </div>
  </SideCard>
}

const SettingsContainer = (props) => {
  return (
    <div className={classes.settingsContainer}>
      <div className={classes.settingsTitle}>{props.title}</div>
      {props.children}
    </div>
  );
}

const SettingsTile = (props) => {
  return <div className={classes.settingsTile}>
    <img className={classes.tileIcon} src={props.imagePath}/>
    <span>{props.title}</span>
    <img src={chevronRight}/>
  </div>
}

const Greeting = (props) => {
  let name = `${props.name}`;
  name = name.toUpperCase();
  let joinedDate = new Date(props.joinedDate);
  joinedDate = `${joinedDate.getDate()}/${joinedDate.getMonth()+1}/${joinedDate.getFullYear()}`;
  return (
    <div className={classes.greetingContainer}>
      <img src={props.imageUrl} />
      <div>
        <h1 className={classes.name}>{name}</h1>
        <div className={classes.subtitle}>
          Joined since <nbsp/>
          <span style={{color: "#232323"}}>{joinedDate}</span>
        </div>
      </div>
    </div>
  );
};

const SideCard = (props) => {
  return <div className={classes.sideCard}>
    {props.children}
  </div>;
}