import Modal from '../../../shared/components/Modal/Modal';
import ReactDOM from "react-dom";
import { useState, React } from 'react'

const RequestDetails = (props) => {

    const [status, setStatus] = useState(props.data['status']);

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

    return ReactDOM.createPortal(
        <Modal exit={props.exit} >
            <div style={{maxHeight: "70vh"}}>
            <div>
                <span><h4>Username</h4></span>
                <span>{props.data['username']}</span>
            </div>
            <div>
                <span><h4>Name</h4></span>
                <span>{props.data['name']}</span>
            </div>
            <div>
                <span><h4>Date of Birth</h4></span>
                <span>{props.data['dateOfBirth']}</span>
            </div>
            <div>
                <span><h4>Hourly Rate</h4></span>
                <span>{props.data['hourlyRate']}</span>
            </div>
            <div>
                <h4>Affiliation</h4>
                <span>{props.data['affiliation']}</span>
            </div>
            <div>
                <span><h4>Educational Background</h4></span>
                <span>{props.data['educationalBackground']}</span>
            </div>
            <div>
                <span><h4>Speciality</h4></span>
                <span>{props.data['speciality']}</span>
            </div>
            <div>
                <span><h4>Status</h4></span>
                <span>{status}</span>
            </div>
            <div>
                <span><h4>ID Image</h4></span>
                {props.data['idImage'].includes('pdf') ? (
                    <a href={props.data['idImage']} target="_blank" rel="noopener noreferrer">Download PDF</a>
                ) : (
                    <img width={130} src={props.data['idImage']} alt="ID Image" />
                )}
            </div>
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
        </Modal>, document.getElementById("backdrop-root")
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