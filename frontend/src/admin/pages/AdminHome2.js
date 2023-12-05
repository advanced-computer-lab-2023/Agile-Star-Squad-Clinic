import axios from 'axios';
import React, { useContext, useEffect, useState, useRef} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Table, Button } from 'react-bootstrap';
import UserContext from '../../user-store/user-context';
import AdminNavBar from '../components/AdminNavBar';
import RequestDetails from './ManageUsers/RequestDetails';
import AdminForm from '../pages/ManageUsers/AdminForm';
import UserDetails from '../pages/ManageUsers/UserDetails';
import './AdminHome.css';
import req from '../req.png';
import x from '../X.png';
import check from '../check.png';
import VisitorInsights from '../VisitorInsights.png';


const AdminHome2 = (props) => {
  const userCtx = useContext(UserContext);
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [status, setStatus] = useState(props.data ? props.data['status'] : '');
  const [selectedRequest, setSelectedRequest] = useState(null);
  const selectedRequestRef = useRef(null);
  const [packages, setPackages] = useState([]);
  const [users, setUsers] = useState([]);
  const [showUser, setShowUser] = useState(false);
  const [showAdminForm, setShowAdminForm] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [activeRole, setActiveRole] = useState('patient'); // Default to show all users
  const [selectedUser, setSelectedUser] = useState(null);



  useEffect(() => {
    fetchPatients();
    fetchDoctors();
    fetchAdmins();
    fetchPendingRequests();
    fetchPackages();
}, [])
useEffect(() => {
    filterUsersByRole(activeRole);
}, [activeRole]);
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
  } 
  

  const fetchPendingRequests = async () => {
    try {
      const response = await axios.get('http://localhost:3000/admins/requests');
      const pendingRequests = response.data.data.requests.filter(request => request.status === 'Pending');
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
        // Show all users if no specific role is selected
        filtered = users;
        break;
    }
  
    setFilteredUsers(filtered);
    setActiveRole(role); // Set the active role for styling
  };
  
  const handleRoleButtonClick = (role) => {
    filterUsersByRole(role);
  };
  
  const fetchPatients = () => {
    fetch("http://localhost:3000/patients/").then(async (response) => {
        const json = await response.json();
        const patientsJson = json.data.patients;
        setUsers((val) => [...val, ...patientsJson.map((patient) => {
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
                dateOfBirth: doctor['dateOfBirth'],
                hourlyRate: doctor['hourlyRate'],
                affiliation: doctor['affiliation'],
                educationalBackground: doctor['educationalBackground'],
                speciality: doctor['speciality'],
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
const refreshUserData = () => {
    setUsers([])
    fetchPatients();
    fetchDoctors();
    fetchAdmins();
}
const deleteUser = (username) => {
    const user = users.find((value) => value.username === username)
    if (user.role === 'Patient') {
        fetch(`http://localhost:3000/patients/${user.id}`, {method: 'DELETE'})
    } else if (user.role === 'Doctor') {
        fetch(`http://localhost:3000/doctors/${user.id}`, {method: 'DELETE'})
    } else if (user.role === 'Admin') {
        fetch(`http://localhost:3000/admins/${user.id}`, {method: 'DELETE'})
    }
    setUsers(users.filter((val) => val.username !== username))
}
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
  
      const response = await fetch(`http://localhost:3000/admins/requests`, requestOptions);
  
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
      console.error("Invalid or undefined request object:", request);
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
        behavior: "smooth" // You can adjust the behavior as needed
    });
};


  const exitRequestModal = () => {
    setSelectedRequest(null);
  };

  const exitUserModal = () => {
    setSelectedUser(null);
  };

  return (
    <>
    <div>
      <div>
        <AdminNavBar/>
        <section className='requests-section'>
          <h2 className='title'>Requests</h2>
          <div className="container">
            <div className="row">
              <table className="table table-hover">
               
                <tbody>
                
                {
  requests.map(request => (
    <tr key={request.id} onClick={() => showDetails(request)}>
      <td className='req-img'>
        <img src={req}></img>
      </td>
      <td className='req-bold'>
        {request.name} - {request.affiliation}
        <div className="req-small">
          {request.speciality}-{calculateAge(request.dateOfBirth)} {request.gender}
        </div>
      </td>
      {status.toLowerCase() === 'pending' && (
        <ActionButtons
          reject={() => reject(request)}
          accept={() => accept(request)}
        />
      )}
      <td>
        <img
          src={x}
          className='req-rej'
          onClick={(e) => {
            {selectedRequest && (
                <RequestDetails
                  data={selectedRequest}
                  exit={closeModal}
                  onStatusChange={statusChangeHandler}
                />
              )}
            e.stopPropagation(); // Stop event propagation
            reject(request);
          }}
        />
      </td>
      <td>
        <img
          src={check}
          className='req-acc'
          onClick={(e) => {
            {selectedRequest && (
                <RequestDetails
                  data={selectedRequest}
                  exit={closeModal}
                  onStatusChange={statusChangeHandler}
                />
              )}
            e.stopPropagation(); // Stop event propagation
            accept(request);
          }}
        />
      </td>
    </tr>
  ))
}
        </tbody>
              </table>
            </div>
          </div>
        </section>
        <section className='insights-section'>
        <h2 className='title'>Visitor Insights</h2>
        <img className="VisitorInsights" src={VisitorInsights}></img>
        </section>
        <section className='packages-section'>
        <div className="edit-button-container">
                <button className="edit-button" onClick={editHandler}>More</button>
            </div>
            <h2 className='title'>Packages</h2>
            <div className="container">
              <div className="row">
                <Table striped bordered hover className="custom-table">
                  <thead>
                    <tr className='package-titles'>
                      <th>Package</th>
                      <th>Session Discount</th>
                      <th>Medicine Discount</th>
                      <th>Family Member Discount</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Map through your packages and render each row */}
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
          </section>
          <section className='users-section'>
      <div className='container'>
      <div className='filter-buttons'>
        {/* Button to show patients */}
        <Button
            variant={activeRole === 'patient' ? 'primary' : 'secondary'}
            onClick={() => handleRoleButtonClick('patient')}
        >
            Patients
        </Button>
        

        {/* Button to show doctors */}
        <Button
            variant={activeRole === 'doctor' ? 'primary' : 'secondary'}
            onClick={() => handleRoleButtonClick('doctor')}
        >
            Doctors
        </Button>

        {/* Button to show admins */}
        <Button
            variant={activeRole === 'admin' ? 'primary' : 'secondary'}
            onClick={() => handleRoleButtonClick('admin')}
        >
            Admins
        </Button>
        </div>

        <div className='row'>
          <Table striped bordered hover className='custom-table'>
            <thead>
              <tr className='user-titles'>
                <th>Username</th>
                <th>Name</th>
                <th>Email</th>
                {/* Add more columns as needed */}
              </tr>
            </thead>
            <tbody>
              {/* Map through your users and render each row */}
              {filteredUsers.map((user) => (
                <tr key={user.id} className='custom-row'onClick={() => showUserModal(user)}>
                  <td>{user.username}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  {/* Add more cells as needed */}
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </section>
    {selectedUser && (
        <UserDetails
          data={selectedUser}
          exit={exitUserModal}
          onDelete={deleteUser}
        />
      )}
        
        <button onClick={changePasswordHandler}>change password</button>
      </div>
      <div>
        <button
          onClick={logout}
          id="addingbutton"
          className="logout"
        >
          Logout
        </button>
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