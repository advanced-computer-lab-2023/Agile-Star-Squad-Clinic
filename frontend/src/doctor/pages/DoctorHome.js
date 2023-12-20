import { useContext, useEffect, useState } from 'react';
import DataTable from '../../shared/components/DataTable/DataTable';
import AppointmentDetails from './AppointmentDetails';
import MyInfo from './MyInfo';
// import PatientDetails from './PatientDetails';
import { useLocation, useNavigate } from 'react-router-dom';
import UserContext from '../../user-store/user-context';
import DoctorNavBar from '../components/DoctorNavBar';
import classes from './DoctorHome.module.css';
import PatientDetails2 from './PatientDetails2';

const DoctorHome = () => {
  const navigate = useNavigate();
  const userCtx = useContext(UserContext);
  const [users, setUsers] = useState([]);

  const [appointments, setAppointments] = useState([]);
  const [filteredAppointements, setFilteredAppointements] = useState([]);
  const [appointmentFilter, setAppointmentFilter] = useState('');
  const [appDateFilter, setAppDateFilter] = useState('');
  const [showAppDateFilter, setShowAppDateFilter] = useState(false);

  const [currentTab, setCurrentTab] = useState('patients');

  const [showAppointment, setShowAppointment] = useState(false);
  const [showUser, setShowUser] = useState(false);

  const [info, setInfo] = useState({});
  const [selectedRow, setSelectedRow] = useState({});

  const [patientSearchField, setPatientSearchField] = useState('');

  const [filteredPatients, setFilteredPatients] = useState([]);
  const location = useLocation();
  // console.log("ZEEEEEEEEEEEEEEEEEEEEEEE",location.state);
  const patient = location.state;

  useEffect(() => {
    // fetchMyPatients();
    // fetchUpcomingAppointments();
    if (userCtx && userCtx.userId) {
      fetchMyInfo();
    }
  }, [userCtx]);

  useEffect(() => {
    setShowAppDateFilter(false);
    if (appointmentFilter === 'select') {
      setFilteredAppointements(appointments);
    } else if (appointments.length != 0) {
      let newAppointements;

      switch (appointmentFilter) {
        case 'date':
          setShowAppDateFilter(true);
          break;
        default:
          newAppointements = appointments.filter(
            (appoint) => appoint.status == appointmentFilter,
          );
          setFilteredAppointements(newAppointements);

          break;
      }
    }
  }, [appointmentFilter]);

  const patientCols = [
    { field: 'username', headerName: 'Username' },
    { field: 'name', headerName: 'Name' },
  ];

  const appointmentCols = [
    { field: 'username', headerName: 'Patient Name' },
    { field: 'mobileNumber', headerName: 'Mobile Number' },
    { field: 'dateOfAppointment', headerName: 'Date of Appointment' },
    { field: 'status', headerName: 'Appointment Status' },
  ];

  const appointmentFilters = [
    <option value={'select'}>Select</option>,
    <option value={'date'}>By Date</option>,
    <option value={'vaccant'}>Vaccant</option>,
    <option value={'reserved'}>Reserved</option>,
    <option value={'passed'}>Passed</option>,
  ];
  // const infoCols = [
  //   //khaliha text
  //   { field: "username", headerName: "Username" },
  //   { field: "name", headerName: "Name" },
  //   { field: "mobileNumber", headerName: "Mobile Number" },
  //   { field: "speciality", headerName: "Speciality" },
  //   { field: "email", headerName: "Email" },
  //   { field: "hourlyRate", headerName: "Hourly Rate" },
  //   { field: "affiliation", headerName: "Affiliation" },
  // ];

  // const fetchMyPatients = () => {
  //   fetch(`http://xxlhost:3000/doctors/${doctorId}/patients`, {
  //     credentials: 'include',
  //   }).then(async (response) => {
  //     const json = await response.json();
  //     const patientsJson = json.data.patients; //check
  //     setUsers(
  //       patientsJson.map((patient) => {
  //         return {
  //           id: patient['_id'],
  //           username: patient['username'],
  //           name: patient['name'],
  //           email: patient['email'],
  //           dateOfBirth: patient['dateOfBirth'],
  //           gender: patient['gender'],
  //           mobileNumber: patient['mobileNumber'],
  //           emergencyContact: patient['emergencyContact'],
  //           doctor: patient['doctor'],
  //           familyMembers: patient['familyMembers'],
  //           medicalRecord: patient['medicalRecord'],
  //         };
  //       })
  //     );
  //     setFilteredPatients(
  //       patientsJson.map((patient) => {
  //         return {
  //           id: patient['_id'],
  //           username: patient['username'],
  //           name: patient['name'],
  //           email: patient['email'],
  //           dateOfBirth: patient['dateOfBirth'],
  //           gender: patient['gender'],
  //           mobileNumber: patient['mobileNumber'],
  //           emergencyContact: patient['emergencyContact'],
  //           doctor: patient['doctor'],
  //           familyMembers: patient['familyMembers'],
  //           medicalRecord: patient['medicalRecord'],
  //         };
  //       })
  //     );
  //     setFilteredPatients(
  //       patientsJson.map((patient) => {
  //         return {
  //           id: patient['_id'],
  //           username: patient['username'],
  //           name: patient['name'],
  //           email: patient['email'],
  //           dateOfBirth: patient['dateOfBirth'],
  //           gender: patient['gender'],
  //           mobileNumber: patient['mobileNumber'],
  //           emergencyContact: patient['emergencyContact'],
  //           doctor: patient['doctor'],
  //           familyMembers: patient['familyMembers'],
  //           medicalRecord: patient['medicalRecord'],
  //         };
  //       })
  //     );
  //   });
  // };

  // const fetchUpcomingAppointments = () => {
  //   //hardcode id
  //   fetch(
  //     `http://localhost:3000/doctors/${doctorId}/upComingAppointments`,
  //     {
  //       credentials: 'include',
  //     }
  //   ).then(async (response) => {
  //     const json = await response.json();
  //     const appointmentsJson = json.data.appointments;
  //     setAppointments(
  //       appointmentsJson.map((appointment) => {
  //         return {
  //           id: appointment['_id'],
  //           dateOfAppointment: appointment['dateOfAppointment'],
  //           status: appointment['status'],
  //           patient: appointment['patient'],
  //         };
  //       })
  //     );
  //     setFilteredAppointements(
  //       appointmentsJson.map((appointment) => {
  //         return {
  //           id: appointment['_id'],
  //           dateOfAppointment: appointment['dateOfAppointment'],
  //           status: appointment['status'],
  //           patient: appointment['patient'],
  //         };
  //       })
  //     );
  //   });
  // };

  // const fetchMyInfo = () => {
  //   //hardcode id
  //   fetch(`http://localhost:3000/doctors/${DUMMY_DOCTOR_ID}`).then(
  //     async (response) => {
  //       const json = await response.json();
  //       const doctorJson = json.data.doctors; //check
  //       setShowInfo(
  //         doctorJson.map((doctor) => {
  //           return{
  //         username: doctor["username"],
  //         name: doctor["name"],
  //         mobileNumber: doctor["mobileNumber"],
  //         speciality: doctor["speciality"],
  //         email: doctor["email"],
  //         hourlyRate: doctor["hourlyRate"],
  //         affiliation: doctor["affiliation"],

  //       };})
  //       );
  //     }

  //   );
  // };
  const fetchMyInfo = () => {
    //hardcode id
    fetch(`http://localhost:3000/doctors/${userCtx.userId}`, {
      credentials: 'include',
    }).then(async (response) => {
      const json = await response.json();
      // console.log('json', json);
      const doctor = json.data.doctor; //check
      setInfo({
        ...doctor,
      });
    });
  };

  const appDropdownHandler = (event) => {
    setAppointmentFilter(event.target.value);
  };

  const onPatientClick = (selectedRow) => {
    setSelectedRow(selectedRow);
    // Navigate to patient info
  };

  const patientSearchHandler = (event) => {
    const searchValue = event.target.value;
    setPatientSearchField(searchValue);
    if (searchValue === '') {
      setFilteredPatients(users);
    } else {
      const newPatients = users.filter((patient) =>
        patient.name.includes(searchValue),
      );
      setFilteredPatients(newPatients);
    }
  };

  const appDateFilterHandler = (event) => {
    let pickedDate = event.target.value;
    setAppDateFilter(pickedDate);
    const newAppointements = appointments.filter((appoint) => {
      const date = new Date(appoint['dateOfAppointment']);
      pickedDate = new Date(pickedDate);
      return (
        `${pickedDate.getFullYear()}-${pickedDate.getMonth()}-${pickedDate.getDay()}` ===
        `${date.getFullYear()}-${date.getMonth()}-${date.getDay()}`
      );
    });
    setFilteredAppointements(newAppointements);
  };

  const showAppointmentModal = (selectedRow) => {
    setSelectedRow(selectedRow);
    setShowAppointment(true);
  };

  const showUserModal = (selectedRow) => {
    setSelectedRow(selectedRow);
    setShowUser(true);
  };

  const exitAppointmentModal = () => {
    setShowAppointment(false);
  };

  const exitUserModal = () => {
    setShowUser(false);
  };

  // const exitAdminModal = () => {
  //     setShowAdminForm(false);
  // }
  const upComingAppointments = filteredAppointements.map((appointment) => {
    let user = filteredPatients.filter((user) => {
      return user.id == appointment.patient;
    });
    if (user.length == 0) {
      return {};
    } else {
      user = user[0];
    }
    return {
      id: appointment.id,
      username: user.username,
      mobileNumber: user.mobileNumber,
      dateOfAppointment: appointment.dateOfAppointment,
      status: appointment.status,
    };
  });
  
  const fetchPackage = async () => {
    fetch('http://localhost:3000/patients/65270e13cfa9abe7a31a4d8a', {
      credentials: 'include',
    }).then(async (response) => {
      const json = await response.json();
      // console.log(patient);  
      // setCurrentPatient(json.data.patient);
      
    });}
    fetchPackage();
 

  const changePasswordHandler = () => {
    navigate('/changePassword');
  };
  const color1 = '#ABD1D3';
  const color2 = '#AED3E2';
  const color3 = '#96B7C7';
  const color4 = '#193842';

  // console.log(patient);

  return (
    <div className="center">
      <DoctorNavBar />
      {/* <div className={classes.main}>
        {info && info.name && (
          <div className={classes.welcomeText}>Welcome, Dr. {info.name}!</div>
        )}
        <div className={classes.secondaryText}>Have a nice day at work</div>
        <div className={classes.ContainerBlock}>
          <div
            className={classes.smallContainer}
            style={{ backgroundColor: color1 }}
          >
            <p>test 2</p>
          </div>
          <div
            className={classes.smallContainer}
            style={{ backgroundColor: color2 }}
          >
            <p>test 2</p>
          </div>
          <div
            className={classes.smallContainer}
            style={{ backgroundColor: color3 }}
          >
            <p>test 2</p>
          </div>
          <div
            className={classes.smallContainer}
            style={{ backgroundColor: color4 }}
          >
            <p>test 2</p>
          </div>
        </div>


        <div></div>
      </div> */}
  {patient && <PatientDetails2 data={patient}/>}
    </div>
  );
};

export default DoctorHome;
