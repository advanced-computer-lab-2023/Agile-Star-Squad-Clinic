import Modal from '../../../shared/components/Modal/Modal';
import { useState } from 'react'
import styles from '../../components/RequestDetails.module.css'; 
import ReactDOM from "react-dom";
import React from 'react';
import { toastMeError,toastMeSuccess } from '../../../shared/components/util/functions';

const RequestDetails = (props) => {
    const [formVisible, setFormVisible] = useState(true);

    const [status, setStatus] = useState(props.data['status']);
    const closeForm = () => {
        setFormVisible(false);
      };
    
    function formatDate(date) {
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
      }

    const onAccept = async () => {
        try {

            const requestOptions = {
                method: 'POST',
                headers: { 'Content-type': 'application/json; charset=UTF-8' },
                body: JSON.stringify({ ...props.data }),
                credentials: 'include'
            };

            const response = await fetch(
                'http://localhost:3000/admins/requests',
                requestOptions
            );

            if (response.ok) {
                // Handle a successful response
                
                setStatus('Accepted');
                // props.onStatusChange(props.data['id'], 'Accepted');
                // setFormVisible(false);
                toastMeSuccess('Doctor accepted successfully!');
            } else {
                // Handle errors if the server response is not ok
                toastMeError('Accepting request Failed!');
            }
        } catch (error) {
            // Handle network errors
            // toastMeError('Network error: ' + error.message);
        }
 
    }

    const onReject = async () => {
        try {
            const requestOptions = {
                method: 'PATCH',
                headers: { 'Content-type': 'application/json; charset=UTF-8' },
                body: JSON.stringify({ ...props.data }),
                credentials: 'include'
            };
            const response = await fetch(
                'http://localhost:3000/admins/requests',
                requestOptions
            );

            if (response.ok) {
                // Handle a successful response
                
                setStatus('Rejected');
                // props.onStatusChange(props.data['id'], 'Rejected');
                // setFormVisible(false);
                toastMeSuccess('Doctor rejected!');
            } else {
                // Handle errors if the server response is not ok
                toastMeError('Rejecting request Failed!');
            }
        } catch (error) {
            // Handle network errors
            // alert('Network error: ' + error.message);
        }
    }
    
    const RequestDetails = () => {
        return (
         <React.Fragment>
           <>
         {  (
           <>
   
     
                        <div className={styles.topBorder}></div>
                        <div className={styles.doctor}>Doctor Request</div>
                        <div className={styles.personal}>
                        <div className={styles.headers}>Personal Details</div>
                            <div className={styles.fieldGroup}>
                                <div className={styles.nameField}>
                                    <span className={styles.smallText}>Name</span>
                                    <div className={styles.formControl}>{props.data['name']}</div>
                                </div>
                                <div className={styles.nameField}>
                                    <span className={styles.smallText}>Email</span>
                                    <div className={styles.formControl}>{props.data['email']}</div>
                                </div>
                            </div>
                            <div className={styles.fieldGroup}>
                                <div className={styles.nameField}>
                                    <span className={styles.smallText}>Username</span>
                                    <div className={styles.formControl}>{props.data['username']}</div>
                                </div>
                                <div className={styles.nameField}>
                                    <span className={styles.smallText}>Date of Birth</span>
                                    <div className={styles.formControl}>{formatDate(new Date(props.data['dateOfBirth']))}</div>
                                </div>
                            </div>
                            </div>
                              {/* Professional Information */}
                        <div className={styles.professional}>
                        <div className={styles.headers}>Professional Details</div>
                        <div className={styles.fieldGroup}>
                            <div>
                                <span className={styles.smallText}>Affiliation</span>
                                <div className={styles.formControl}>{props.data['affiliation']}</div>
                            </div>
                            <div>
                                <span className={styles.smallText}>Educational Background</span>
                                <div className="formControl">{props.data['educationalBackground']}</div>
                            </div>
                            </div>
                            <div className={styles.fieldGroup}>
                            <div>
                                <span className={styles.smallText}>Speciality</span>
                                <div className={styles.formControl}>{props.data['speciality']}</div>
                            </div>
                            <div>
                                <span className={styles.smallText}>Hourly Rate</span>
                                <div className={styles.formControl}>{props.data['hourlyRate']}</div>
                            </div>
                            </div>
                        </div>
                        <div className={styles.headers}>Documents</div>
                        <div className={styles.images}>

                        
                        {/* ID Image */}
                        <div className={styles.spacing}>
                            <span className={styles.smallText}>ID Image</span>
                            <br></br>
                            {props.data['idImage'].includes('pdf') ? (
                                <a href={props.data['idImage']} target="_blank" rel="noopener noreferrer">Download PDF</a>
                            ) : (
                                <img width={130} src={props.data['idImage']} alt="ID Image" />
                            )}
                        </div>

                        {/* Medical License */}
                        <div className={styles.spacing}>
                            <span className={styles.smallText}>Medical License</span>
                            <br></br>
                            {props.data['medicalLicense'].includes('pdf') ? (
                                <a href={props.data['medicalLicense']} target="_blank" rel="noopener noreferrer">Download PDF</a>
                            ) : (
                                <img width={130} src={props.data['medicalLicense']} alt="Medical License" />
                            )}
                        </div>

                        {/* Medical Degree */}
                        <div className={styles.spacing} >
                            <span className={styles.smallText}>Medical Degree</span>
                            <br></br>
                            {props.data['medicalDegree'].includes('pdf') ? (
                                <a href={props.data['medicalDegree']} target="_blank" rel="noopener noreferrer">Download PDF</a>
                            ) : (
                                <img width={130} src={props.data['medicalDegree']} alt="Medical Degree" />
                            )}
                        </div>
                        {status.toLowerCase() === 'pending' && <ActionButtons onReject={onReject} onAccept={onAccept} />}
                               
                            </div>
        </>
      )}
    </>
    </React.Fragment>
  );};


return ReactDOM.createPortal(
    <Modal exit={props.exit}>
      {RequestDetails()}
      {/* <ActionButtons onDelete={onDelete} /> */}
    </Modal>, document.getElementById("backdrop-root")
  );
}

const ActionButtons = (props) => {
    return (
   
           <div  className={styles.buttonPos}>
            <button className={styles.reject} onClick={props.onReject}>Reject</button>
            <button className={styles.accept} onClick={props.onAccept}>
                {!props.isLoading && <span>Accept</span>}
                {props.isLoading && <div className="loader" />}
            </button>
        </div>
       
    );
};


export default RequestDetails;