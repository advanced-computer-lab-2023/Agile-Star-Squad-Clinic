import { useEffect, useState } from "react";
import DataTable from "../../shared/components/DataTable/DataTable";

const DoctorHome = () => {
    const [users, setUsers] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const [isUserTab, setUserTab] = useState(true);
    const [showAppointment, setShowAppointment] = useState(false);
    const [showUser, setShowUser] = useState(false);
    const [showAdminForm, setShowAdminForm] = useState(false);
    const [selectedRow, setSelectedRow] = useState({});

    useEffect(() => {
        fetchMyPatients();
        fetchUpcomingAppointments();
        fetchMyInfo();
    }, [])


    const upcomingCols = [ 
        { field: "username", headerName: "Patient Name" },
        { field: "mobileNumber", headerName: "Mobile Number" },
        { field: "dateOfAppointment", headerName: "Date of appointment" },
    ]

    const patientCols = [
        { field: "username", headerName: "Username" },
        { field: "name", headerName: "Name" },
        { field: "mobileNumber", headerName: "Mobile Number" },
    ]

    // const infoCols = [  //khaliha text
    //     { field: "username", headerName: "Username" },
    //     { field: "name", headerName: "Name" },
    //     { field: "mobileNumber", headerName: "Mobile Number" },
    //     { field: "role", headerName: "Role" },
    // ]

    const fetchMyPatients = () => {
        //hardcode id
        fetch("http://localhost:3000/doctors/:doctorId/patients").then(async (response) => {
            const json = await response.json();
            const patientsJson = json.data.patients; //check
            console.log(json.data);
            setUsers(patientsJson.map((patient) => {
                return {
                    id: patient["_id"],
                    username: patient["username"],
                    name: patient["name"],
                    email: patient['email'],
                    dateOfBirth: patient['dateOfBirth'],
                    gender: patient['gender'],
                    mobileNumber: patient["mobileNumber"],
                    emergencyContact: patient['emergencyContact'],
                    doctor: patient['doctor'],
                    familyMembers: patient['familyMembers'],
                }
            }));
        });
    }

    const fetchUpcomingAppointments = () => {
        //hardcode id
        fetch("http://localhost:3000/doctors/652697382f4bf60c788346ac/upComingAppointments").then(async (response) => {
            const json = await response.json();
            const appointmentsJson = json.data.patients; 
            setUsers(patientsJson.map((patient) => {
                return {
                    id: patient["_id"],
                    username: patient["username"],
                    name: patient["name"],
                    email: patient['email'],
                    dateOfBirth: patient['dateOfBirth'],
                    gender: patient['gender'],
                    mobileNumber: patient["mobileNumber"],
                    emergencyContact: patient['emergencyContact'],
                    doctor: patient['doctor'],
                    familyMembers: patient['familyMembers'],
                }
            }));
        });
    }

    const fetchMyInfo = () => {
        //hardcode id
        fetch("http://localhost:3000/doctors/:doctorId/patients").then(async (response) => {
            const json = await response.json();
            const patientsJson = json.data.patients; //check
            console.log(json.data);
            setUsers(patientsJson.map((patient) => {
                return {
                    id: patient["_id"],
                    username: patient["username"],
                    name: patient["name"],
                    email: patient['email'],
                    dateOfBirth: patient['dateOfBirth'],
                    gender: patient['gender'],
                    mobileNumber: patient["mobileNumber"],
                    emergencyContact: patient['emergencyContact'],
                    doctor: patient['doctor'],
                    familyMembers: patient['familyMembers'],
                }
            }));
        });
    }



    const showAppointmentModal = (selectedRow) => {
        setSelectedRow(selectedRow);
        setShowAppointment(true);
    }

    const showUserModal = (selectedRow) => {
        setSelectedRow(selectedRow);
        setShowUser(true);
    }

    const exitAppointmentModal = () => {
        setShowAppointment(false);
    }

    const exitUserModal = () => {
        setShowUser(false);
    }

    const exitAdminModal = () => {
        setShowAdminForm(false);
    }






    return <div className="center">
    {showAppointment && <AppointmentDetails data={selectedRow} exit={exitAppointmentModal} />}
    {showAdminForm && <AdminForm exit={exitAdminModal} refresh={refreshUserData} />}
    {showUser && <UserDetails data={selectedRow} exit={exitUserModal} onDelete={deleteUser} />}
    <div >
        <span>
            <button onClick={() => setUserTab(true)}>
                User
            </button>
        </span>
        <span >
            <button onClick={() => setUserTab(false)}>
                Appointments
            </button>
        </span>
    </div>
    {isUserTab && <h2>Users</h2>}
    {!isUserTab && <h2>Appointments</h2>}

    {isUserTab && <DataTable columns={userCols} rows={users} onRowClick={showUserModal} />}
    {!isUserTab && <DataTable columns={upcomingCols} rows={appointments} onRowClick={showAppointmentModal} />}

    <div>
        <button onClick={() => setShowAdminForm(true)}>Add New Admin</button>
    </div>
</div>;
}

export default DoctorHome;

