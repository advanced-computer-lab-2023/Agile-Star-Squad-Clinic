import axios from 'axios';
import React, { useContext, useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Table, Button, Container } from 'react-bootstrap';
import UserContext from '../../user-store/user-context';
import AdminNavBar from '../components/AdminNavBar';
import RequestDetails from './ManageUsers/RequestDetails';
import AdminForm from '../pages/ManageUsers/AdminForm';
import UserDetails from '../pages/ManageUsers/UserDetails';
import classes from './AdminHome.module.css';
import req from '../req.png';
import x from '../X.png';
import check from '../check.png';

const AdminHome2 = (props) => {
  const userCtx = useContext(UserContext);
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [status, setStatus] = useState(props.data ? props.data['status'] : '');
  const [selectedRequest, setSelectedRequest] = useState(null);
  const selectedRequestRef = useRef(null);
  const [packages, setPackages] = useState([]);
  const [showUser, setShowUser] = useState(false);
  const [showAdminForm, setShowAdminForm] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [activeRole, setActiveRole] = useState('patient');
  const [users, setUsers] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    filterUsersByRole(activeRole);
  }, [activeRole]);
 

  useEffect(() => {
    const fetchData = async () => {
      // Fetch data here
      try {
        // Fetch patients, doctors, admins, and other necessary data
        await fetchPatients();
        await fetchDoctors();
        await fetchAdmins();
        await fetchPendingRequests();
        await fetchPackages();

        // Set dataLoaded to true after fetching all data
        setDataLoaded(true);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures the effect runs only once when the component mounts

  useEffect(() => {
    // If data has been loaded, simulate a click on the "Patients" button
    if (dataLoaded) {
      handleRoleButtonClick('patient');
    }
  }, [dataLoaded]);
  useEffect(() => {
    selectedRequestRef.current = selectedRequest;
  }, [selectedRequest]);

  const fetchPackages = async () => {
    try {
      const response = await axios.get('http://localhost:3000/packages/');
      const packagesData = response.data; // Assuming the packages are directly in the data property
      setPackages(packagesData);
    } catch (error) {
      console.error('Error fetching packages:', error);
    }
  };

  const handleRoleButtonClick = (role) => {
    filterUsersByRole(role);
  };

  const logout = async () => {
    await userCtx.logout();
    navigate('/');
  };

  const changePasswordHandler = () => {
    navigate('/changePassword');
  };

  const statusChangeHandler = (id, status) => {
    setRequests(
      requests.map((request) => {
        if (request.id === id) {
          request.status = status;
        }
        return request;
      })
    );
  };

  const fetchPendingRequests = async () => {
    try {
      const response = await axios.get('http://localhost:3000/admins/requests');
      const pendingRequests = response.data.data.requests.filter(
        (request) => request.status === 'Pending'
      );
      setRequests(pendingRequests);
      console.log(pendingRequests);
    } catch (error) {
      console.error('Error fetching pending requests:', error);
    }
  };

  const filterUsersByRole = (role) => {
    let filtered = [];

    switch (role) {
      case 'patient':
        filtered = users.filter((user) => user.role === 'Patient');
        break;
      case 'doctor':
        filtered = users.filter((user) => user.role === 'Doctor');
        break;
      case 'admin':
        filtered = users.filter((user) => user.role === 'Admin');
        break;
      default:
        filtered = users.filter((user) => user.role === 'Patient');
        break;
    }

    setFilteredUsers(filtered);
    setActiveRole(role); // Set the active role for styling
  };

  const fetchPatients = async () => {
    try {
      const response = await fetch('http://localhost:3000/patients/');
      const json = await response.json();
      const patientsJson = json.data.patients;
      setUsers((prevUsers) => [
        ...prevUsers.filter((user) => user.role !== 'Patient'), // Remove existing patients
        ...patientsJson.map((patient) => ({
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
          role: 'Patient',
          package: patient['package'], // Add this line to include package information
        })),
      ]);
    } catch (error) {
      console.error('Error fetching patients:', error);
    }
  };

  const fetchDoctors = async () => {
    try {
      const response = await fetch('http://localhost:3000/doctors/');
      const json = await response.json();
      const doctorsJson = json.data.doctors;
      setUsers((prevUsers) => [
        ...prevUsers.filter((user) => user.role !== 'Doctor'), // Remove existing doctors
        ...doctorsJson.map((doctor) => ({
          id: doctor['_id'],
          username: doctor['username'],
          name: doctor['name'],
          dateOfBirth: doctor['dateOfBirth'],
          hourlyRate: doctor['hourlyRate'],
          affiliation: doctor['affiliation'],
          educationalBackground: doctor['educationalBackground'],
          speciality: doctor['speciality'],
          mobileNumber: doctor['mobileNumber'] ?? '-',
          role: 'Doctor',
          dateOfCreation: doctor['dateOfCreation']  ,
        })),
      ]);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };

  const fetchAdmins = async () => {
    try {
      const response = await fetch('http://localhost:3000/admins/');
      const json = await response.json();
      const adminsJson = json.data.admins;
      setUsers((prevUsers) => [
        ...prevUsers.filter((user) => user.role !== 'Admin'), // Remove existing admins
        ...adminsJson.map((admin) => ({
          id: admin['_id'],
          username: admin['username'],
          name: '-',
          mobileNumber: '-',
          role: 'Admin',
        })),
      ]);
    } catch (error) {
      console.error('Error fetching admins:', error);
    }
  };

  const refreshUserData = () => {
    setUsers([]);
    fetchPatients();
    fetchDoctors();
    fetchAdmins();
  };

  const deleteUser = (username) => {
    const user = users.find((value) => value.username === username);
    if (user.role === 'Patient') {
      fetch(`http://localhost:3000/patients/${user.id}`, { method: 'DELETE' });
    } else if (user.role === 'Doctor') {
      fetch(`http://localhost:3000/doctors/${user.id}`, { method: 'DELETE' });
    } else if (user.role === 'Admin') {
      fetch(`http://localhost:3000/admins/${user.id}`, { method: 'DELETE' });
    }
    setUsers(users.filter((val) => val.username !== username));
  };

  const calculateAge = (dateOfBirth) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  };

  const accept = async (request) => {
    try {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-type': 'application/json; charset=UTF-8' },
        body: JSON.stringify({ ...request }),
        credentials: 'include',
      };

      const response = await fetch('http://localhost:3000/admins/requests', requestOptions);

      if (response.ok) {
        await props.onStatusChange(request.id, 'Accepted');
        selectedRequestRef.current && selectedRequestRef.current.onAccept();
      } else {
        alert('Accepting request Failed!');
      }
      console.log('accepting');
    } catch (error) {
      console.log('not accepting');
      alert('Network error: 1' + error.message);
    }
  };

  const reject = async (request) => {
    try {
      const requestOptions = {
        method: 'PATCH',
        headers: { 'Content-type': 'application/json; charset=UTF-8' },
        body: JSON.stringify({ ...request }),
        credentials: 'include',
      };

      const response = await fetch('http://localhost:3000/admins/requests', requestOptions);

      if (response.ok) {
        // Handle a successful response
        alert('Doctor rejected!');
        // Check if request and request.id are defined before calling onStatusChange
        if (request && request.id && props.onStatusChange) {
          props.onStatusChange(request.id, 'Rejected');
          // Call the onReject method in RequestDetails
          selectedRequest && selectedRequest.onReject();
        }
      } else {
        // Handle errors if the server response is not ok
        alert('Rejecting request Failed!');
      }
      console.log('rejecting');
    } catch (error) {
      // Handle network errors
      console.log('not rejecting');
      console.log('aaaa' + request);
      alert('Network error: 2' + error.message);
    }
  };

  const showDetails = (request) => {
    if (request && request.id) {
      setSelectedRequest(request);
    } else {
      console.error('Invalid or undefined request object:', request);
    }
  };

  const editHandler = () => {
    // Navigate to the "Packages Page" when the "Edit" button is clicked
    navigate('/packages');
  };

  const closeModal = () => {
    setSelectedRequest(null);
  };

  const showRequestModal = (request) => {
    setSelectedRequest(request);
  };

  const showUserModal = (user) => {
    setSelectedUser(user);
    // Scroll to the top of the page
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // You can adjust the behavior as needed
    });
  };

  const exitRequestModal = () => {
    setSelectedRequest(null);
  };

  const exitUserModal = () => {
    setSelectedUser(null);
  };
  function extractYearFromDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    return year;
  }
 

  return (
    <>
      <div>
        <div>
          <AdminNavBar />
          <Container className={classes.requests}>
            <h2 className={classes.title}>Requests</h2>
            <div className="container">
              <div className="row">
                <table className="table table-hover">
                  <tbody>
                    {requests.map((request) => (

                      <tr key={request.id} onClick={() => showDetails(request)}>
                        <td className={classes.req}>
                          <img src={req} alt="req" />
                        </td>
                        <td className={classes.bold}>
                          {request.name} - {request.affiliation}
                          <div className={classes.small}>
                            {request.speciality}-{calculateAge(request.dateOfBirth)}{' '}
                            {request.gender}
                          </div>
                        </td>
                        {status.toLowerCase() === 'pending' && (
                          <ActionButtons reject={() => reject(request)} accept={() => accept(request)} />
                        )}
                        <td className={classes.spacing}>
                        <td className={classes.rejectReq}>
                          <img
                            src={x}
                            alt="req-rej"
                            className={classes.rej}
                            onClick={(e) => {
                              selectedRequest &&
                                selectedRequestRef.current &&
                                selectedRequestRef.current.onReject();
                              e.stopPropagation(); // Stop event propagation
                              reject(request);
                            }}
                          />
                        </td>
                        <td className={classes.rejectReq}>
                          <img
                            src={check}
                            width="25"
                            height="25"
                            alt="req-acc"
                            className={classes.acc}
                            onClick={(e) => {
                              selectedRequest &&
                                selectedRequestRef.current &&
                                selectedRequestRef.current.onAccept();
                              e.stopPropagation(); // Stop event propagation
                              accept(request);
                            }}
                          />
                        </td>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Container>

          <Container className={classes.packages}>
            <div className={classes.edit}>
              <button className={classes.editButton} onClick={editHandler}>
                More
              </button>
            </div>
            <h2 className={classes.title}>Packages</h2>
            <div className="container">
              <div className="row">
                <Table  hover className="custom-table">
                  <thead>
                    <tr className={classes.packageTitles}>
                      <th>Package</th>
                      <th>Session Discount</th>
                      <th>Medicine Discount</th>
                      <th>Family Member Discount</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {packages.map((pkg) => (
                      <tr key={pkg._id} className="custom-row">
                        <td>{pkg.name}</td>
                        <td>{pkg.doctorSessionDiscount}%</td>
                        <td>{pkg.medicineDiscount}%</td>
                        <td>{pkg.familyMemberDiscount}%</td>
                        <td>{pkg.pricePerYear} LE</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </div>
          </Container>

          <Container className={classes.users}>
  <div className={classes.filter}>
    {/* Buttons to filter user roles */}
    <button
      className={`${classes.filterButton} ${activeRole === 'patient' ? classes.active : ''}`}
      onClick={() => handleRoleButtonClick('patient')}
    >
      Patients
    </button>
    <button
      className={`${classes.filterButton} ${activeRole === 'doctor' ? classes.active : ''}`}
      onClick={() => handleRoleButtonClick('doctor')}
    >
      Doctors
    </button>
    <button
      className={`${classes.filterButton} ${activeRole === 'admin' ? classes.active : ''}`}
      onClick={() => handleRoleButtonClick('admin')}
    >
      Admins
    </button>
  </div>

  <div className="row">
    <Table   hover className={"custom-table"}>
      <thead>
        <tr>
          {activeRole === 'patient' && (
            <>
              <th className={classes.userTitle}>Name</th>
              <th className={classes.userTitle}>Subscription</th>
              <th className={classes.userTitle}>Email</th>
              {/* Add more patient-specific columns as needed */}
            </>
          )}
          {activeRole === 'doctor' && (
            <>
              <th className={classes.userTitle}>Name</th>
              <th className={classes.userTitle}>Speciality</th>
              <th className={classes.userTitle}>Affiliation</th>
              <th className={classes.userTitle}>Member Since</th>
              {/* Add more doctor-specific columns as needed */}
            </>
          )}
          {activeRole === 'admin' && (
            <>
              <th className={classes.userTitle}>Username</th>
              <th className={classes.userTitle}>Email</th>
              {/* Add more admin-specific columns as needed */}
            </>
          )}
        </tr>
      </thead>
      <tbody className={classes.userBody}>
        {/* Map through your users and render each row */}
        {filteredUsers.map((user) => (
          <tr key={user.id} className={classes.customRow} onClick={() => showUserModal(user)}>
            {/* Render user-specific cells based on the active role */}
            {activeRole === 'patient' && (
              <>
                <td className={classes.userInfo}>{user.name}</td>
                <td>{user.package ? user.package.name : 'No Subscription'}</td>
                <td>{user.email}</td>
                {/* Add more patient-specific cells as needed */}
              </>
            )}
            {activeRole === 'doctor' && (
              <>
                <td className={classes.userInfo}>{user.name}</td>
                <td>{user.speciality}</td>
                <td>{user.affiliation}</td>
                <td className={classes.userCell}>
  <div className={classes.userDate}>{extractYearFromDate(user.dateOfCreation)}</div>
</td>
                {/* Add more doctor-specific cells as needed */}
              </>
            )}
            {activeRole === 'admin' && (
              <>
                <td className={classes.userInfo}>{user.username}</td>
                <td>{user.email}</td>
              </>
            )}
            {activeRole !== 'admin' && (
                            <td className={classes.userCell}>
                                <button className={classes.deleteButton} onClick={() => deleteUser(user.username)}>
                                    X
                                </button>
                            </td>
                        )}
          </tr>
        ))}
      </tbody>
    </Table>
  </div>
</Container>


    {selectedUser && (
        <UserDetails
          data={selectedUser}
          exit={exitUserModal}
          onDelete={deleteUser}
        />
      )}
        {showUser && <UserDetails data={selectedUser} exit={exitUserModal} onDelete={deleteUser} />}
        
        
      </div>
      
      </div>
    </>

  );
};
  // ActionButtons component
  const ActionButtons = (props) => {
    return (
      <div className="d-flex justify-content-end mt-5">
        <button className="formButtons formDeleteButton" onClick={props.onReject}>
          Reject
        </button>
        <button className="formButtons" onClick={props.onAccept}>
          {!props.isLoading && <span>Accept</span>}
          {props.isLoading && <div className="loader" />}
        </button>
      </div>
    );
  };
  
export default AdminHome2;