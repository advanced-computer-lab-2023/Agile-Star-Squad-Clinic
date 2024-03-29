import React, { useState, useEffect, useContext } from 'react';
import storage from '../../../index';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import 'react-calendar/dist/Calendar.css';
import DoctorNavBar from '../../components/DoctorNavBar';
import UserContext from '../../../user-store/user-context';
import { useLocation, useNavigate } from 'react-router-dom';
import classes from './Account.module.css';
//import patient1 from '../../../assets/patientHomepage/patient1.png';
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
import chevronRight from '../../../assets/patientAccount/chevronRight.png';
// import AppointmentsCard from './AppointmentCard';
// import FamilyCard from './FamilyCard';
// import PaymentCard from './PaymentCard';
// import MedicalCard from './MedicalCard';
// import AccountDetailsCard from './AccountDetailsCard';
import { toastMeError, toastMeSuccess } from '../../../shared/components/util/functions';
// import SubscriptionCard from './SubscriptionCard';
import AccountDetails from './AccountDetails';
import AboutUs from '../../../patient/pages/AccountSettings/AboutUs';

const AccountDr = (props) => {
  const doctor = useContext(UserContext);
  const navigate = useNavigate();
  const [healthPackage, setPackage] = useState(null);
  const [medicalRecordUrls, setMedicalRecords] = useState(null);
  const [isButtonPressed, setButtonPressed] = useState(false);
  const [healthRecord, setHealthRecord] = useState('');
  const [subscriptionDate, setsubscriptionDate] = useState(Date.now());
  const [expiringDate, setexpiringDate] = useState(Date.now());
  const [cancellationDate, setcancellationDate] = useState();
 // const [currentPatient, setCurrentPatient] = useState('');
  const [appointments, setAppointments] = useState([]);
  const [familyMembers, setFamilyMembers] = useState([]);
  const [name, setName] = useState('');
  const [image, setImage] = useState('');


  // const [patient, setPatient] = useState();
  const location = useLocation();
  
  const [index, setIndex] = useState(location.state != null ? location.state.index : null);

//   useEffect(() => {
//     fetchAppointments();
//     fetchFamilyMembers();
//     fetchPackage();
//   }, []);

//   const onHealthRecordChange = (file) => {
//     setHealthRecord(file.target.files[0]);
//   };

//   const fetchAppointments = () => {
//     fetch(`http://localhost:3000/patients/${patient.userId}/appointments`, {
//       credentials: 'include',
//     }).then(async (response) => {
//       const json = await response.json();
//       const appointmentsJson = json.data.appointments;
//       setAppointments(
//         appointmentsJson.map((appointment) => {
//           return {
//             id: appointment['_id'],
//             ...appointment,
//           };
//         }),
//       );
//     });
//   };

//   const fetchFamilyMembers = () => {
//     fetch(`http://localhost:3000/patients/${patient.userId}/familyMembers`, {
//       credentials: 'include',
//     }).then(async (response) => {
//       const json = await response.json();
//       const familyMembersJson = json.data.members;
//       setFamilyMembers(
//         familyMembersJson.map((member) => {
//           return {
//             _id: member['_id'],
//             ...member,
//           };
//         }),
//       );
//     });
//   };

//   const fetchPackage = async () => {
//     fetch(`http://localhost:3000/patients/${patient.userId}`, {
//       credentials: 'include',
//     }).then(async (response) => {
//       const json = await response.json();
//       setsubscriptionDate(json.data.patient.subscriptionDate);
//       setexpiringDate(json.data.patient.expiringDate);
//       setMedicalRecords(json.data.patient.medicalRecord);
//       setPackage(json.data.patient.package);
//       setCurrentPatient(json.data.patient);
//       setcancellationDate(json.data.patient.cancellationDate);
//     });
//   };

//   const handeleUnsubscribeButtonclick = async () => {
//     try {
//       const response = await fetch(
//         `http://localhost:3000/patients/${patient.userId}/package`,
//         {
//           method: 'PATCH',
//           headers: {
//             'Content-type': 'application/json; charset=UTF-8',
//           },
//         },
//       );
//       console.log(response);
//       if (response.ok) {
//         toastMeSuccess(`Cancelled subscription successfully, Expiration Date: ${formatDate(expiringDate)}`)
//         setcancellationDate(JSON.stringify(new Date()));
//       } else {
//         toastMeError(
//           'Failed to remove health package. Status:',
//           response.status,
//         );
//         const responseBody = await response.json();
//         console.error('Response body:', responseBody);
//       }
//     } catch (error) {
//       console.error('Error removing health package:', error);
//     }
//   };

//   const handleHealthRecordUpload = async () => {
//     let healthRecordUrl;
//     if (healthRecord !== '') {
//       const healthRecordRef = ref(storage, `${healthRecord.name}`);
//       await uploadBytesResumable(healthRecordRef, healthRecord).then(
//         async (snapshot) => {
//           healthRecordUrl = await getDownloadURL(snapshot.ref);
//         },
//       );
//     }
//     setMedicalRecords((records) => {
//       return [...records, healthRecordUrl];
//     });
//     // const formData = new FormData();
//     // formData.append('medicalRecord', healthRecordUrl);
//     const data = {
//       medicalRecord: healthRecordUrl,
//     };

//     try {
//       console.log(healthRecordUrl);
//       const requestOptions = {
//         method: 'PATCH',
//         headers: { 'Content-type': 'application/json; charset=UTF-8' },
//         body: JSON.stringify(data),
//       };
//       console.log(requestOptions.body);
//       console.log(requestOptions);

//       const response = await fetch(
//         `http://localhost:3000/patients/${patient.userId}`,
//         requestOptions,
//       );
//       console.log(response);
//       if (!response.ok) {
//         toastMeError('Failed to upload health record');
//       }
//     } catch (error) {
//       console.error('Error uploading health record:', error);
//     }
//   };

const fetchName = () =>{
    fetch(`http://localhost:3000/doctors/${doctor.userId}`, {
        credentials: 'include',
      }).then(async (response) => {
        const json = await response.json();
          setName(json.data.doctor.name);
    
      });
}
useEffect(()=>{fetchName()},[]);

const fetchImage = () =>{
    fetch(`http://localhost:3000/doctors/${doctor.userId}`, {
        credentials: 'include',
      }).then(async (response) => {
        const json = await response.json();
          setImage(json.data.doctor.image);
    
      });
}
useEffect(()=>{fetchImage()},[]);


  const deleteImage = (e, url) => {
    e.preventDefault();}

//     setMedicalRecords((records) => {
//       const newRecords = records.filter((record) => record != url);
//       const requestOptions = {
//         method: 'PATCH',
//         headers: { 'Content-type': 'application/json; charset=UTF-8' },
//         body: JSON.stringify({ medicalRecord: newRecords }),
//       };

//       fetch(
//         `http://localhost:3000/patients/${patient.userId}/setHealthRecords`,
//         requestOptions,
//       );
//       return newRecords;
//     });
//   };

  useEffect(()=>{
    if (index==9)
      logout()
  },[index])
  const logout = async () => {
    await doctor.logout();
    navigate('/');
  };

  const changePasswordHandler = () => {
    navigate('/doctor/settings');
  };

//   const familyMembersHandler = () => {
//     navigate('/patient/family');
//   };

  const getCancellationDate = () => {
    return cancellationDate;
  }
  

  const { healthRecordInput } = healthRecord;
  return (
    <body className={classes.pageWrapper}>
      <DoctorNavBar/>
      <Greeting
        name={name}
        imageUrl={image}
        //joinedDate={currentPatient.creationDate}
      />
      <SettingsContainer title={'Settings'}>
        <SettingsTile
          onClick={() => setIndex(0)}
          title={'Account Details'}
          imagePath={globeImg}
        />
      </SettingsContainer>
      <SettingsContainer title={'Other'}>
        <SettingsTile
          onClick={() => setIndex(6)}
          title={'About Us'}
          imagePath={aboutImg}
        />
        <SettingsTile
          onClick={() => setIndex(9)}
          title={'Logout'}
          imagePath={logoutImg}
        />
      </SettingsContainer>
      {index == 0 && <AccountDetails />}
      {/* {index == 1 && <FamilyCard members={familyMembers} setMembers={setFamilyMembers} />}
      {index == 2 && <MedicalCard />}
      {index == 3 && <PaymentCard />}
      {index == 4 && <AppointmentsCard appointments={appointments} />}
      {index == 5 && <SubscriptionCard  healthPackage={healthPackage} handleUnsubscribe={handeleUnsubscribeButtonclick} cancellationDate={getCancellationDate()} expiringDate={expiringDate}/>} */}
      {index == 6 && <AboutUs/>}
    </body>
  );
};
export default AccountDr;

const SettingsContainer = (props) => {
  return (
    <div className={classes.settingsContainer}>
      <div className={classes.settingsTitle}>{props.title}</div>
      {props.children}
    </div>
  );
};

const SettingsTile = (props) => {
  return (
    <div onClick={props.onClick} className={classes.settingsTile}>
      <img className={classes.tileIcon} active src={props.imagePath} />
      <span>{props.title}</span>
      <img src={chevronRight} />
    </div>
  );
};

const Greeting = (props) => {
  let name = `${props.name}`;
  name = name.toUpperCase();
  return (
    <div className={classes.greetingContainer}>
      <img src={props.imageUrl} />
      <div>
        <h1 className={classes.name}>{name}</h1>
        </div>
      </div>
  );
};

export const SideCard = (props) => {
  return <div className={classes.sideCard}>{props.children}</div>;
};



const formatDate = (date) => {
  date = new Date(date);
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  }).format(date);
  return formattedDate;
};