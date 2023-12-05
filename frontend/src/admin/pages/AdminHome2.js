import axios from 'axios';
import React, { useContext, useEffect, useState, useRef} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UserContext from '../../user-store/user-context';
import AdminNavBar from '../components/AdminNavBar';
import RequestDetails from './ManageUsers/RequestDetails';
import './AdminHome.css';
import req from '../req.png';
import x from '../X.png';
import check from '../check.png';


const AdminHome2 = (props) => {
  const userCtx = useContext(UserContext);
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [status, setStatus] = useState(props.data ? props.data['status'] : '');
  console.log("sd"+props );
  const [selectedRequest, setSelectedRequest] = useState(null);
  const selectedRequestRef = useRef(null);

//   const [users, setUsers] = useState([]);
//   const [isUserTab, setUserTab] = useState(true);
//   const [showRequest, setShowRequest] = useState(false   );
//   const [showUser, setShowUser] = useState(false);
//   const [showAdminForm, setShowAdminForm] = useState(false);
//   const [selectedRow, setSelectedRow] = useState({});

  useEffect(() => {
    fetchPendingRequests();
  }, []);

  useEffect(() => {
    selectedRequestRef.current = selectedRequest;
  }, [selectedRequest]);
  
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
  

const closeModal = () => {
  setSelectedRequest(null);
};
  return (
    <>
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
          {selectedRequest && (
  <RequestDetails
    data={selectedRequest}
    exit={closeModal}
    onStatusChange={statusChangeHandler}
  />
)}

        </section>
        <section className='insights-section'>
        <h2 className='title'>Visitor Insights</h2>
        </section>
        <Link to="/admin/manage">
          <button>Manage Users</button>
        </Link>

        <Link to="/packages">
          <button>Packages Page</button>
        </Link>
        <button onClick={changePasswordHandler}>change password</button>
      </div>
      <div>
        <button
          onClick={logout}
          id="addingbutton"
          className="btn btn-primary sm"
        >
          Logout
        </button>
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