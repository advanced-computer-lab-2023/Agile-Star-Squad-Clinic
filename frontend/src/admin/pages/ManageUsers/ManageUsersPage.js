import { useEffect, useState } from "react";
import DataTable from "../../../shared/components/DataTable/DataTable";
import RequestDetails from "./RequestDetails";
import AdminForm from "./AdminForm";


const ManageUsersPage = () => {
    const [users, setUsers] = useState([]);
    const [requests, setRequests] = useState([]);
    const [isUserTab, setUserTab] = useState(true);
    const [showRequest, setShowRequest] = useState(false);
    const [showAdminForm, setShowAdminForm] = useState(false);
    const [selectedRow, setSelectedRow] = useState({});

    useEffect(() => {
        fetchPatients();
        fetchDoctors();
        fetchAdmins();
        fetchRequests();
    }, [])

    const userCols = [
        { field: "username", headerName: "Username" },
        { field: "name", headerName: "Name" },
        { field: "mobileNumber", headerName: "Mobile Number" },
        { field: "role", headerName: "Role" },
    ]

    const requestCols = [
        { field: "username", headerName: "Username" },
        { field: "name", headerName: "Name" },
        { field: "email", headerName: "Email" },
        { field: "status", headerName: "Status" },
    ]

    const fetchPatients = () => {
        fetch("http://localhost:3000/patients/").then(async (response) => {
            const json = await response.json();
            const patientsJson = json.data.patients;
            setUsers((val) => [...val, ...patientsJson.map((patient) => {
                return {
                    id: patient["_id"],
                    username: patient["username"],
                    name: patient["name"],
                    mobileNumber: patient["mobileNumber"],
                    role: "Patient"
                }
            })]);
        });
    }

    const fetchDoctors = () => {
        fetch("http://localhost:3000/doctors/").then(async (response) => {
            const json = await response.json();
            const doctorsJson = json.data.doctors;
            setUsers((val) => [...val, ...doctorsJson.map((doctor) => {
                return {
                    id: doctor["_id"],
                    username: doctor["username"],
                    name: doctor["name"],
                    mobileNumber: doctor["mobileNumber"] ?? "-",
                    role: "Doctor"
                }
            })]);
        });
    }

    const fetchAdmins = () => {
        fetch("http://localhost:3000/admins/").then(async (response) => {
            const json = await response.json();
            const adminsJson = json.data.admins;
            setUsers((val) => [...val, ...adminsJson.map((admin) => {
                return {
                    id: admin["_id"],
                    username: admin["username"],
                    name: "-",
                    mobileNumber: "-",
                    role: "Admin"
                }
            })]);
        });
    }

    const fetchRequests = () => {
        fetch("http://localhost:3000/admins/requests").then(async (response) => {
            const json = await response.json();
            console.log(json.data);
            const requestsJson = json.data.requests;
            setRequests((val) => [...val, ...requestsJson.map((request) => {
                return {
                    id: request["_id"],
                    username: request["username"],
                    name: request['name'],
                    email: request['email'],
                    dateOfBirth: request['dateOfBirth'],
                    hourlyRate: request['hourlyRate'],
                    affiliation: request['affiliation'],
                    specialty: request['speciality'],
                    educationalBackground: request['educationalBackground'],
                    status: request['status']
                }
            })]);
        });
    }

    const showRequestModal = (selectedRow) => {
        setSelectedRow(selectedRow);
        setShowRequest(true);
    }

    const exitRequestModal = () => {
        setShowRequest(false);
    }
    const exitAdminModal = () => {
        setShowAdminForm(false);
    }

    const refreshUserData = () => {
        setUsers([])
        fetchPatients();
        fetchDoctors();
        fetchAdmins();
    }

    return <div className="center">
        {showRequest && <RequestDetails data={selectedRow} exit={exitRequestModal} />}
        {showAdminForm && <AdminForm exit={exitAdminModal} refresh={refreshUserData}/>}
        <div >
            <span>
                <button onClick={() => setUserTab(true)}>
                    User
                </button>
            </span>
            <span >
                <button onClick={() => setUserTab(false)}>
                    Requests
                </button>
            </span>
        </div>
        {isUserTab && <h2>Users</h2>}
        {!isUserTab && <h2>Requests</h2>}

        {isUserTab && <DataTable columns={userCols} rows={users} />}
        {!isUserTab && <DataTable columns={requestCols} rows={requests} onRowClick={showRequestModal} />}

        <div>
            <button onClick={() => setShowAdminForm(true)}>Add New Admin</button>
        </div>
    </div>;
}

export default ManageUsersPage;