import { useEffect, useState } from 'react';
import DataTable from '../../shared/components/DataTable/DataTable';
import AppointmentDetails from './AppointmentDetails';
import MyInfo from './MyInfo';
import PatientDetails from './PatientDetails';

const DUMMY_DOCTOR_ID = '65270f436a48cd31d535b963';

const DoctorHome = () => {
  const [users, setUsers] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [isUserTab, setUserTab] = useState(true);
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

  const upcomingCols = [
    { field: 'username', headerName: 'Patient Name' },
    { field: 'mobileNumber', headerName: 'Mobile Number' },
    { field: 'dateOfAppointment', headerName: 'Date of Appointment' },
  ];

  const patientCols = [
    { field: 'username', headerName: 'Username' },
    { field: 'name', headerName: 'Name' },
    { field: 'appointments', headerName: 'Date of Appointment' },
    { field: 'status', headerName: 'Appointment Status' },
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
    //hardcode id
    fetch(`http://localhost:3000/doctors/${DUMMY_DOCTOR_ID}/patients`).then(
      async (response) => {
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
            };
          })
        );
      }
    );
  };

  const fetchUpcomingAppointments = () => {
    //hardcode id
    fetch(
      `http://localhost:3000/doctors/${DUMMY_DOCTOR_ID}/upComingAppointments`
    ).then(async (response) => {
      const json = await response.json();
      const appointmentsJson = json.data.appointments;
      setAppointments(
        appointmentsJson.map((appointment) => {
          return {
            id: appointment['patient'],
            dateOfAppointment: appointment['dateOfAppointment'],
            status: appointment['status'],
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
    fetch(`http://localhost:3000/doctors/${DUMMY_DOCTOR_ID}`).then(
      async (response) => {
        const json = await response.json();
        const doctor = json.data.doctor; //check
        setInfo({
          ...doctor,
        });
      }
    );
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
      console.log(newPatients);
      setFilteredPatients(newPatients);
    }
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

  const usersAndTheirAppointments = filteredPatients.map((user) => {
    const userAppointments = appointments.filter(
      (appointment) => appointment.id == user.id
    );
    const appointmentList = userAppointments.map((appointment) => {
      return {
        appointments: appointment.dateOfAppointment,
        status: appointment.status,
      };
    });
    const appointmentJSONObject =
      appointmentList.length === 0 ? {} : appointmentList[0];
    return {
      id: user.id, // Add a unique id for the user
      username: user.username,
      name: user.name,
      ...appointmentJSONObject,
      ...user,
    };
  });

  return (
    <div className="center">
      {showAppointment && (
        <AppointmentDetails data={selectedRow} exit={exitAppointmentModal} />
      )}
      {/* {showInfo && <MyInfo exit={exitAdminModal} refresh={refreshUserData} />} */}
      {showUser && <PatientDetails data={selectedRow} exit={exitUserModal} />}
      {/* onDelete={deleteUser} */}
      <div>
        <span>
          <button onClick={() => setUserTab(true)}>My Patients</button>
        </span>
        <span>
          <button onClick={() => setUserTab(false)}>Account Info</button>
        </span>
      </div>
      {isUserTab && <h3>Patients and Upcoming Appointments</h3>}
      {!isUserTab && <MyInfo info={info} />}
      {isUserTab && (
        <>
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
            rows={usersAndTheirAppointments}
            onRowClick={showUserModal}
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
