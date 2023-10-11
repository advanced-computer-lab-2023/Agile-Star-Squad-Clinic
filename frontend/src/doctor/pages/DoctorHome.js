import { useEffect, useState } from "react";
import DataTable from "../../../shared/components/DataTable/DataTable";

const DoctorHome = () => {
    const [users, setUsers] = useState([]);
    const [requests, setRequests] = useState([]);
    const [isUserTab, setUserTab] = useState(true);
    const [showRequest, setShowRequest] = useState(false);
    const [showUser, setShowUser] = useState(false);
    const [showAdminForm, setShowAdminForm] = useState(false);
    const [selectedRow, setSelectedRow] = useState({});

    useEffect(() => {
        fetchMyPatients();
        fetchUpcomingAppointments();
        fetchMyInfo();
    }, [])


    const upcomingCols = [ 
        { field: "username", headerName: "Username" },
        { field: "name", headerName: "Name" },
        { field: "email", headerName: "Email" },
        { field: "status", headerName: "Status" },
    ]

    const patientCols = [
        { field: "username", headerName: "Username" },
        { field: "name", headerName: "Name" },
        { field: "mobileNumber", headerName: "Mobile Number" },
    ]

    const infoCols = [  //khaliha text
        { field: "username", headerName: "Username" },
        { field: "name", headerName: "Name" },
        { field: "mobileNumber", headerName: "Mobile Number" },
        { field: "role", headerName: "Role" },
    ]

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




}

export default DoctorHome;

