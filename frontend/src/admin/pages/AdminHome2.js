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
  const [status, setStatus] = useState(props.data ? props.data['status'] : 'pending');
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
  const [showRequestDetails, setshowRequestDetails] = useState(false);


  useEffect(() => {
    filterUsersByRole(activeRole);
  }, [activeRole]);

  useEffect(() => {
    fetchPatients();
    fetchDoctors();
    fetchAdmins();
    fetchPendingRequests();
    fetchPackages();
  }, []); 
  
  useEffect(() => {
    // If data has been loaded, simulate a click on the "Patients" button
    if (setUsers) {
      handleRoleButtonClick('patient');
    }
  }, [users]);
    useEffect(() => {
    selectedRequestRef.current = selectedRequest;
  }, [selectedRequest]);
  useEffect(() => {
    const handleClickOutside = (event) => {
      const formElement = document.getElementById('form'); // Replace 'yourFormId' with the actual ID of your form
      if (formElement && !formElement.contains(event.target)) {
        setShowRequestDetails(false); // Close the form when clicking outside of it
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setShowRequestDetails]);
  const fetchPackages = async () => {
    try {
      const response = await axios.get('http://localhost:3000/packages/');
      const packagesData = response.data; // Assuming the packages are directly in the data property
      setPackages(packagesData);
    } catch (error) {
      console.error('Error fetching packages:', error);
    }
  };

  const fetchPendingRequests = async () => {
    try {
      const response = await axios.get('http://localhost:3000/admins/requests');
      const pendingRequests = response.data.data.requests.filter(
        (request) => request.status === 'Pending',
      );
      setRequests(pendingRequests);
    } catch (error) {
      console.error('Error fetching pending requests:', error);
    }
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
          creationDate: patient['creationDate'],
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
          dateOfCreation: doctor['dateOfCreation'],
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
  const handleRoleButtonClick = (role) => {
    filterUsersByRole(role);
  };



  const statusChangeHandler = (id, status) => {
    setRequests(
      requests.map((request) => {
        if (request.id === id) {
          request.status = status;
        }
        return request;
      }),
    );
    refreshUserData();
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

  const refreshUserData = () => {
    setUsers([]);
    fetchPatients();
    fetchDoctors();
    fetchAdmins();
    fetchPendingRequests();
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
    refreshUserData();
  };

  const calculateAge = (dateOfBirth) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  };

  const accept = async (props) => {
    try {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-type': 'application/json; charset=UTF-8' },
        body: JSON.stringify({ ...props }),
        credentials: 'include',
      };

      const response = await fetch(
        'http://localhost:3000/admins/requests',
        requestOptions,
      );

      if (response.ok) {
        // Handle a successful response
        alert('Doctor accepted successfully!');
        setStatus('Accepted');
        statusChangeHandler(props.id, 'Accepted');
        refreshUserData();
      } else {
        // Handle errors if the server response is not ok
        alert('Accepting request Failed!');
      }
    } catch (error) {
      // Handle network errors
      alert('Network error: ' + error.message);
    }
  };

  const reject = async (props) => {
    try {
      const requestOptions = {
        method: 'PATCH',
        headers: { 'Content-type': 'application/json; charset=UTF-8' },
        body: JSON.stringify({ ...props }),
        credentials: 'include',
      };
      const response = await fetch(
        'http://localhost:3000/admins/requests',
        requestOptions,
      );

      if (response.ok) {
        // Handle a successful response
        alert('Doctor rejected!');
        setStatus('Rejected');
        statusChangeHandler(props.id, 'Rejected');
        refreshUserData();
      } else {
        // Handle errors if the server response is not ok
        alert('Rejecting request Failed!');
      }
    } catch (error) {
      // Handle network errors
      alert('Network error: ' + error.message);
    }
  };

  const showDetails = (request) => {
    if (request && request.id) {
      setSelectedRequest(request);
      setshowRequestDetails(true);
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
  const handleDeleteClick = (event, username) => {
    // Prevent the event from propagating to the parent row and triggering showUserModal
    event.stopPropagation();

    // Call your delete function here
    deleteUser(username);
  };
  const getYearColor = (year) => {
    if (year < 2000) {
      return {
        border: '1px solid #FFA500', // orange
        background: '#F0F9FF',
        color: '#FFA500',
      };
    } else if (year >= 2000 && year <= 2020) {
      return {
        border: '1px solid #0095FF',
        background: 'var(--colors-light-blue-50, #F0F9FF)',
      };
    } else if (year === 2021) {
      return {
        border: '1px solid #884DFF', // purple
        background: '#FBF1FF',
        color: '#884DFF',
      };
    } else if (year === 2022) {
      return {
        border: '1px solid #FFD700', // yellow
        background: '#FEF6E6',
        color: '#FFD700',
      };
    } else if (year === 2023) {
      return {
        border: '1px solid #00E58F', // green
        background: '#F0FDF4',
        color: '#00E58F',
      };
    } else {
      // default blue
      return {
        border: '1px solid #0095FF',
        background: '#F0F9FF',
        color: '#0095FF',
      };
    }
  };
  const formatDefaultDate = () => {
    const currentDate = new Date();
    const oneDayAgo = new Date(currentDate);
    oneDayAgo.setDate(oneDayAgo.getDate() - 1);

    const options = {
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    };

    return oneDayAgo.toLocaleDateString('en-US', options);
  };

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
                            {request.speciality}-
                            {calculateAge(request.dateOfBirth)},{' '}
                            {formatDefaultDate(
                              request.creationDate
                                ? new Date(request.creationDate)
                                : undefined,
                            )}
                          </div>
                        </td>
                        {status.toLowerCase() === 'pending' && (
                          <ActionButtons
                            reject={() => reject(request)}
                            accept={() => accept(request)}
                          />
                        )}
                        <td
                          className={`${classes.rejectReq} ${classes.borderBottom}`}
                        >
                          <img
                            src={x}
                            alt="req-rej"
                            className={classes.rej}
                            onClick={(e) => {
                              selectedRequest &&
                                selectedRequestRef.current &&
                                selectedRequestRef.current.reject(request);
                              e.stopPropagation(); // Stop event propagation
                              reject(request);
                            }}
                          />
                        </td>
                        <td
                          className={`${classes.acceptReq} ${classes.borderBottom}`}
                        >
                          <img
                            src={check}
                            width="25"
                            height="25"
                            alt="req-acc"
                            className={classes.acc}
                            onClick={(e) => {
                              selectedRequest &&
                                selectedRequestRef.current &&
                                selectedRequestRef.current.accept(request);
                              e.stopPropagation(); // Stop event propagation
                              accept(request);
                            }}
                          />
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
                <Table hover className="custom-table">
                  <tr className={classes.packageTitles}>
                    <th>Package</th>
                    <th>Session Disc.</th>
                    <th>Medicine Disc.</th>
                    <th>Family Member Disc.</th>
                    <th>Price</th>
                  </tr>

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
                className={`${classes.filterButton} ${
                  activeRole === 'patient' ? classes.active : ''
                }`}
                onClick={() => handleRoleButtonClick('patient')}
              >
                Patients
              </button>
              <button
                className={`${classes.filterButton} ${
                  activeRole === 'doctor' ? classes.active : ''
                }`}
                onClick={() => handleRoleButtonClick('doctor')}
              >
                Doctors
              </button>
              <button
                className={`${classes.filterButton} ${
                  activeRole === 'admin' ? classes.active : ''
                }`}
                onClick={() => handleRoleButtonClick('admin')}
              >
                Admins
              </button>
            </div>
            <div className="container">
              <div className="row">
                <Table hover className={'custom-table'}>
                  <tr>
                    {activeRole === 'patient' && (
                      <>
                        <th className={classes.userTitle}>Name</th>
                        <th className={classes.userTitle}>Subscription</th>
                        <th className={classes.userTitle}>Email</th>
                        <th className={classes.userTitle}>Member Since</th>
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
                        <th className={classes.userTitle}>Member Since</th>
                      </>
                    )}
                  </tr>

                  <tbody className={classes.userBody}>
                    {/* Map through your users and render each row */}
                    {filteredUsers.map((user) => (
                      <tr
                        key={user.id}
                        className={classes.customRow}
                        onClick={() => showUserModal(user)}
                      >
                        {/* Render user-specific cells based on the active role */}
                        {activeRole === 'patient' && (
                          <>
                            <td className={classes.userInfo}>{user.name}</td>
                            <td>
                              {user.package
                                ? user.package.name
                                : 'No Subscription'}
                            </td>
                            <td>{user.email}</td>
                            <td className={classes.userCell}>
                              <div
                                className={classes.userDate}
                                style={getYearColor(
                                  extractYearFromDate(user.creationDate),
                                )}
                              >
                                {extractYearFromDate(user.creationDate)}
                              </div>
                            </td>
                            {/* Add more patient-specific cells as needed */}
                          </>
                        )}
                        {activeRole === 'doctor' && (
                          <>
                            <td className={classes.userInfo}>{user.name}</td>
                            <td>{user.speciality}</td>
                            <td>{user.affiliation}</td>
                            <td className={classes.userCell}>
                              <div
                                className={classes.userDate}
                                style={getYearColor(
                                  extractYearFromDate(user.dateOfCreation),
                                )}
                              >
                                {extractYearFromDate(user.dateOfCreation)}
                              </div>
                            </td>
                            {/* Add more doctor-specific cells as needed */}
                          </>
                        )}
                        {activeRole === 'admin' && (
                          <>
                            <td className={classes.userInfo}>
                              {user.username}
                            </td>
                            <td className={classes.userCell}>
                              <div
                                className={classes.userDateAdmin}
                                style={getYearColor(
                                  extractYearFromDate(user.creationDate),
                                )}
                              >
                                {extractYearFromDate(user.creationDate)}
                              </div>
                            </td>
                          </>
                        )}

                        <td className={classes.userCell}>
                          <button
                            className={classes.deleteButton}
                            onClick={(e) => handleDeleteClick(e, user.username)}
                          >
                            X
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </div>
          </Container>

                      {selectedUser && (
                        <UserDetails
                          data={selectedUser}
                          exit={exitUserModal}
                          onDelete={deleteUser}
                        />
                      )}
                    {showRequestDetails && (
              <RequestDetails id='form'
                data={selectedRequest}
              
              />
            )}

     
        </div>
        {showRequestDetails && <RequestDetails data={selectedRequest}></RequestDetails>}
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
