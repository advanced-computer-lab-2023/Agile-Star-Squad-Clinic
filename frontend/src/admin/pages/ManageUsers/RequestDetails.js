import Card from '../../../shared/components/Card/Card';
import ReactDOM from "react-dom";
import { useState } from 'react'
import styles from '../../components/RequestDetails.module.css'; 

const RequestDetails = (props) => {
    const [formVisible, setFormVisible] = useState(true);
    const [status, setStatus] = useState(props.data['status']);
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
                alert('Doctor accepted successfully!');
                setStatus('Accepted');
                props.onStatusChange(props.data['id'], 'Accepted');
            } else {
                // Handle errors if the server response is not ok
                alert('Accepting request Failed!');
            }
        } catch (error) {
            // Handle network errors
            alert('Network error: ' + error.message);
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
                alert('Doctor rejected!');
                setStatus('Rejected');
                props.onStatusChange(props.data['id'], 'Rejected');
            } else {
                // Handle errors if the server response is not ok
                alert('Rejecting request Failed!');
            }
        } catch (error) {
            // Handle network errors
            alert('Network error: ' + error.message);
        }
    }
    
    return(
            <>
        <div id="form">
          {formVisible && (
            <Card className={`${styles.addForm}`}>
              <div className={styles.doctor}>Doctor Request</div>
              <form   className={styles.form}>
              <div className={styles.fieldGroup}>
        <div className={styles.nameField}>
            
          <span className={styles.smallText}>Name</span>
          <input
            key={'name'}
            type="text"
            className="form-control"
            value={props.data['name']}
            readOnly
          />
        </div>
        <div className={styles.field}>
          <span className={styles.smallText}>Email</span>
          <input
            type="number"
            className="form-control"
            value={props.data['email']}
            readOnly
          />
        </div>
      </div>
      <div className={styles.fieldGroup}>
        <div className={styles.field}>
          <span className={styles.smallText}>Username</span>
          <input
            type="number"
            className="form-control"
            value={props.data['username']}
            readOnly
          />
        </div>
        <div className={styles.field}>
          <span className={styles.smallText}>Date of Birth</span>
          <input
            type="number"
            className="form-control"
            value={formatDate(new Date(props.data['dateOfBirth']))}
            readOnly
          />
        </div>
        <div className={styles.professional}>
            <div>
                <span className={styles.title}><h4>Hourly Rate</h4></span>
                <span className={styles.info}>{props.data['hourlyRate']}</span>
            </div>
            <div>
                <span className={styles.title}><h4>Affiliation</h4></span>
                <span className={styles.info}>{props.data['affiliation']}</span>
            </div>
            <div>
                <span className={styles.title}><h4>Educational Background</h4></span>
                <span className={styles.info}>{props.data['educationalBackground']}</span>
            </div>
            <div>
                <span className={styles.title}><h4>Speciality</h4></span>
                <span className={styles.info}>{props.data['speciality']}</span>
            </div>
            </div>
            <div>
                <span className={styles.title}><h4>Status</h4></span>
                <span className={styles.info}>{status}</span>
            </div>
            
            <div>
                <span><h4>ID Image</h4></span>
                {props.data['idImage'].includes('pdf') ? (
                    <a href={props.data['idImage']} target="_blank" rel="noopener noreferrer">Download PDF</a>
                ) : (
                    <img width={130} src={props.data['idImage']} alt="ID Image" />
                )}
           
            <div>
                <span><h4>Medical License</h4></span>
                {props.data['medicalLicense'].includes('pdf') ? (
                    <a href={props.data['medicalLicense']} target="_blank" rel="noopener noreferrer">Download PDF</a>
                ) : (
                    <img width={130} src={props.data['medicalLicense']} alt="Medical License" />
                )}
            </div>
            <div>
                <span><h4>Medical Degree</h4></span>
                {props.data['medicalDegree'].includes('pdf') ? (
                    <a href={props.data['medicalDegree']} target="_blank" rel="noopener noreferrer">Download PDF</a>
                ) : (
                    <img width={130} src={props.data['medicalDegree']} alt="Medical Degree" />
                )}
            </div>

            {status.toLowerCase() === 'pending' && <ActionButtons onReject={onReject} onAccept={onAccept} />}
            </div>
      
      </div>
    
                <button className={styles.addButton} type="submit">
                  SAVE
                </button>
              </form>
            </Card>
          )}
          </div>
        </>
            
            
        
    );
}

const ActionButtons = (props) => {
    return (
        <div className="d-flex justify-content-end mt-5">
            <button className="formButtons formDeleteButton" onClick={props.onReject}>Reject</button>
            <button className="formButtons" onClick={props.onAccept}>
                {!props.isLoading && <span>Accept</span>}
                {props.isLoading && <div className="loader" />}
            </button>
        </div>
    );
};

export default RequestDetails;