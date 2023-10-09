import { useEffect, useState } from "react";
import DataTable from "../../shared/components/DataTable";


const ManageUsersPage = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchPatients();
    }, [])

    const cols = [
        {field:"username", headerName:"Username"},
        {field:"name", headerName:"Name"},
        {field:"mobileNumber", headerName:"Mobile Number"},
        {field:"role", headerName:"Role"},
    ]

    const fetchPatients = async () => {
        const response = await fetch("http://localhost:3000/patients/").then((res) => {}, (res) => {console.log(res)});

        const patientsJson = await response.json()
        
        setUsers(patientsJson.map((patient) => {
            return {
                id: patient["_id"],
                username: patient["username"],
                name: patient["name"],
                mobileNumber: patient["mobileNumber"],
                role: "Patient"
            }
        }));

    }

    const fetchDoctors = async () => {
        const response = await fetch("http://localhost:3000/doctors/").then((res) => {}, (res) => {console.log(res)});

        const patientsJson = await response.json()
        
        setUsers(patientsJson.map((patient) => {
            return {
                id: patient["_id"],
                username: patient["username"],
                name: patient["name"],
                mobileNumber: "-",
                role: "Doctor"
            }
        }));

    }

    const fetchAdmins = async () => {
        const response = await fetch("http://localhost:3000/admins/").then((res) => {}, (res) => {console.log(res)});

        const patientsJson = await response.json()
        
        setUsers(patientsJson.map((patient) => {
            return {
                id: patient["_id"],
                username: patient["username"],
                name: "-",
                mobileNumber: "-",
                role: "Admin"
            }
        }));

    }

    return <div>
        <DataTable columns={cols} rows={users}/>
    </div>;
}

export default ManageUsersPage;