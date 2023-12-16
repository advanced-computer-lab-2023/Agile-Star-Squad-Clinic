import { useContext, useEffect, useState } from 'react';
import DataTable from '../../shared/components/DataTable/DataTable';
import AppointmentDetails from './AppointmentDetails';
import MyInfo from './MyInfo';
import PatientDetails from './PatientDetails';
import { useNavigate } from 'react-router-dom';
import UserContext from '../../user-store/user-context';
import DoctorNavBar from "../components/DoctorNavBar";




const DoctorHome = () => {
  const navigate = useNavigate();
  const doctorId = useContext(UserContext).userId;
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

  useEffect(() => {
    fetchMyPatients();
    fetchUpcomingAppointments();
    fetchMyInfo();
  }, []);

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
            (appoint) => appoint.status == appointmentFilter
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

  const fetchMyPatients = () => {
    fetch(`http://localhost:3000/doctors/${doctorId}/patients`, {
      credentials: 'include',
    }).then(async (response) => {
      const json = await response.json();
      const patientsJson = json.data.patients; //check
      setUsers(
        patientsJson.map((patient) => {
          return {
            id: patient['_id'],
            username: patient['username'],
            name: patient['name'],
            email: patient['email'],
            dateOfBirth: patient['dateOfBirth'],
            gender: patient['gender'],
            mobileNumber: patient['mobileNumber'],
            emergencyContact: patient['emergencyContact'],
            doctor: patient['doctor'],
            familyMembers: patient['familyMembers'],
            medicalRecord: patient['medicalRecord'],
          };
        })
      );
      setFilteredPatients(
        patientsJson.map((patient) => {
          return {
            id: patient['_id'],
            username: patient['username'],
            name: patient['name'],
            email: patient['email'],
            dateOfBirth: patient['dateOfBirth'],
            gender: patient['gender'],
            mobileNumber: patient['mobileNumber'],
            emergencyContact: patient['emergencyContact'],
            doctor: patient['doctor'],
            familyMembers: patient['familyMembers'],
            medicalRecord: patient['medicalRecord'],
          };
        })
      );
      setFilteredPatients(
        patientsJson.map((patient) => {
          return {
            id: patient['_id'],
            username: patient['username'],
            name: patient['name'],
            email: patient['email'],
            dateOfBirth: patient['dateOfBirth'],
            gender: patient['gender'],
            mobileNumber: patient['mobileNumber'],
            emergencyContact: patient['emergencyContact'],
            doctor: patient['doctor'],
            familyMembers: patient['familyMembers'],
            medicalRecord: patient['medicalRecord'],
          };
        })
      );
    });
  };

  const fetchUpcomingAppointments = () => {
    //hardcode id
    fetch(
      `http://localhost:3000/doctors/${doctorId}/upComingAppointments`,
      {
        credentials: 'include',
      }
    ).then(async (response) => {
      const json = await response.json();
      const appointmentsJson = json.data.appointments;
      setAppointments(
        appointmentsJson.map((appointment) => {
          return {
            id: appointment['_id'],
            dateOfAppointment: appointment['dateOfAppointment'],
            status: appointment['status'],
            patient: appointment['patient'],
          };
        })
      );
      setFilteredAppointements(
        appointmentsJson.map((appointment) => {
          return {
            id: appointment['_id'],
            dateOfAppointment: appointment['dateOfAppointment'],
            status: appointment['status'],
            patient: appointment['patient'],
          };
        })
      );
    });
  };

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
    fetch(`http://localhost:3000/doctors/${doctorId}`, {
      credentials: 'include',
    }).then(async (response) => {
      const json = await response.json();
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
        patient.name.includes(searchValue)
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

  const changePasswordHandler = () => {
    navigate('/changePassword');
  };

  return (
    <div className="center">
      <DoctorNavBar/>
      {showAppointment && (
        <AppointmentDetails data={selectedRow} exit={exitAppointmentModal} />
      )}
      {/* {showInfo && <MyInfo exit={exitAdminModal} refresh={refreshUserData} />} */}
      {showUser && <PatientDetails data={selectedRow} exit={exitUserModal} />}
      {/* onDelete={deleteUser} */}
      <div>
        <span>
          <button onClick={() => setCurrentTab('patients')}>My Patients</button>
        </span>
        <span>
          <button onClick={() => setCurrentTab('my-info')}>Account Info</button>
        </span>
        <span>
          <button onClick={() => setCurrentTab('appointments')}>
            Appointments
          </button>
        </span>
        <span>
          <button onClick={changePasswordHandler}>change password</button>
        </span>
      </div>
      {currentTab === 'my-info' && <MyInfo info={info} />}
      {currentTab === 'patients' && (
        <>
          <h3>Patients</h3>
          <span>
            <input
              type="text"
              placeholder="Search"
              value={patientSearchField}
              onChange={patientSearchHandler}
            />
          </span>
          <DataTable
            columns={patientCols}
            rows={filteredPatients}
            onRowClick={showUserModal}
          />
        </>
      )}
      {currentTab === 'appointments' && (
        <>
          <h3>Upcoming Appointments</h3>
          <select value={appointmentFilter} onChange={appDropdownHandler}>
            {appointmentFilters}
          </select>
          {showAppDateFilter && (
            <input
              type="date"
              value={appDateFilter}
              onChange={appDateFilterHandler}
            />
          )}
          <DataTable
            columns={appointmentCols}
            rows={upComingAppointments}
            onRowClick={showAppointmentModal}
          />
        </>
      )}

      <div>
        {/* <button onClick={() => setShowInfo(true)}>Add New Admin</button> */}
      </div>

      {/* <DataTable columns={patientCols} rows={filteredPatients} onRowClick={onPatientClick} /> */}
    </div>
  );
};

export default DoctorHome;
