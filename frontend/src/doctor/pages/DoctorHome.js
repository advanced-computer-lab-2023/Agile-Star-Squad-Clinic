import { useEffect, useState } from "react";
import DataTable from "../../shared/components/DataTable/DataTable";
import AppointmentDetails from "./AppointmentDetails";
import myInfo from "./myInfo";
import PatientDetails from "./PatientDetails";

const DUMMY_DOCTOR_ID = "6521b5c6ba5aa46d406e1090";

const DoctorHome = () => {
  const [users, setUsers] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [isUserTab, setUserTab] = useState(true);
  const [showAppointment, setShowAppointment] = useState(false);
  const [showUser, setShowUser] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [selectedRow, setSelectedRow] = useState({});

  useEffect(() => {
    fetchMyPatients();
    fetchUpcomingAppointments();
    fetchMyInfo();
  }, []);

  const upcomingCols = [
    { field: "username", headerName: "Patient Name" },
    { field: "mobileNumber", headerName: "Mobile Number" },
    { field: "dateOfAppointment", headerName: "Date of appointment" },
  ];

  const patientCols = [
    { field: "username", headerName: "Username" },
    { field: "name", headerName: "Name" },
    { field: "mobileNumber", headerName: "Mobile Number" },
  ];

  // const infoCols = [  //khaliha text
  //     { field: "username", headerName: "Username" },
  //     { field: "name", headerName: "Name" },
  //     { field: "mobileNumber", headerName: "Mobile Number" },
  //     { field: "role", headerName: "Role" },
  // ]

  const fetchMyPatients = () => {
    //hardcode id
    fetch(`http://localhost:3000/doctors/${DUMMY_DOCTOR_ID}/patients`).then(
      async (response) => {
        const json = await response.json();
        const patientsJson = json.data.patients; //check
        setUsers(
          patientsJson.map((patient) => {
            return {
              id: patient["_id"],
              username: patient["username"],
              name: patient["name"],
              email: patient["email"],
              dateOfBirth: patient["dateOfBirth"],
              gender: patient["gender"],
              mobileNumber: patient["mobileNumber"],
              emergencyContact: patient["emergencyContact"],
              doctor: patient["doctor"],
              familyMembers: patient["familyMembers"],
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
            id: appointment["patient"],
            dateOfAppointment: appointment["dateOfAppointment"],
          };
        })
      );
    });
  };

  const fetchMyInfo = () => {
    //hardcode id
    fetch(`http://localhost:3000/doctors/${DUMMY_DOCTOR_ID}`).then(
      async (response) => {
        const json = await response.json();
        const doctor = json.data.doctor; //check
        setShowInfo({
          id: doctor._id,
          username: doctor.username,
          name: doctor.name,
          email: doctor.email,
          affiliation: doctor.affiliation,
          hourlyRate: doctor.hourlyRate,
        });
      }
    );
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

  return (
    <div className="center">
      {showAppointment && (
        <AppointmentDetails data={selectedRow} exit={exitAppointmentModal} />
      )}
      {/* {showInfo && <myInfo exit={exitAdminModal} refresh={refreshUserData} />} */}
      {showUser && <PatientDetails data={selectedRow} exit={exitUserModal} />}
      {/* onDelete={deleteUser} */}
      <div>
        <span>
          <button onClick={() => setUserTab(true)}>User</button>
        </span>
        <span>
          <button onClick={() => setUserTab(false)}>Appointments</button>
        </span>
      </div>
      {isUserTab && <h2>Users</h2>}
      {!isUserTab && <h2>Appointments</h2>}
      {isUserTab && (
        <DataTable
          columns={patientCols}
          rows={users}
          onRowClick={showUserModal}
        />
      )}
      {!isUserTab && (
        <DataTable
          columns={upcomingCols}
          rows={appointments}
          onRowClick={showAppointmentModal}
        />
      )}
      <div>
        <button onClick={() => setShowInfo(true)}>Add New Admin</button>
      </div>
    </div>
  );
};

export default DoctorHome;
