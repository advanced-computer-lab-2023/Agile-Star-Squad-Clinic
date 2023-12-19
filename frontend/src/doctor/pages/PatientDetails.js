import ReactDOM from 'react-dom';
import React, { useState, useEffect, useContext } from 'react';
import storage from '../../index';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import Modal from '../../shared/components/Modal/Modal';
import { toastMeError } from '../../shared/components/util/functions';

const PatientDetails = (props) => { 
  const [healthRecord, setHealthRecord] = useState('');
  const [medicalRecordUrls, setMedicalRecords] = useState([]);
  const onDelete = () => {
    props.onDelete(props.data['username']);
    props.exit();
  };





  const handleHealthRecordUpload = async () => {
    let healthRecordUrl;
    if (healthRecord !== '') {
      const healthRecordRef = ref(storage, `${healthRecord.name}`);
      await uploadBytesResumable(healthRecordRef, healthRecord).then(
        async (snapshot) => {
          healthRecordUrl = await getDownloadURL(snapshot.ref);
        },
      );
    }
    setMedicalRecords((records) => {
      return [...records, healthRecordUrl];
    });
    const data = {
      medicalRecord: healthRecordUrl,
    };

    try {
      const requestOptions = {
        method: 'PATCH',
        headers: { 'Content-type': 'application/json; charset=UTF-8' },
        body: JSON.stringify(data),
        credentials: 'include',
      };
     

      const response = await fetch(
        `http://localhost:3000/doctors/healthRecord/${props.data.id}`,
        requestOptions,
      ).catch((error) => {
        console.log(error);
      });
      if (!response.ok) {
        toastMeError('Failed to upload health record');
      }
    } catch (error) {
      console.error('Error uploading health record:', error);
    }
  };

  const fetchPackages = async () => {
    fetch(`http://localhost:3000/doctors/healthRecord/${props.data.id}`, {
      credentials: 'include',
    }).then(async (response) => {
      const json = await response.json();
      setMedicalRecords(props.data.medicalRecord);
    });
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  const onHealthRecordChange = (file) => {
    setHealthRecord(file.target.files[0]);
  };

  const { healthRecordInput } = healthRecord;

  const PatientDetails = () => {
    return getPatientBody();
  };

  const getPatientBody = () => {
    return (
      <React.Fragment>
        <div>
          <span>
            <h4>Username</h4>
          </span>
          <span>{props.data['username']}</span>
        </div>
        <div>
          <span>
            <h4>Name</h4>
          </span>
          <span>{props.data['name']}</span>
        </div>
        <div>
          <span>
            <h4>Email</h4>
          </span>
          <span>{props.data['email']}</span>
        </div>
        <div>
          <span>
            <h4>Date of Birth</h4>
          </span>
          <span>{props.data['dateOfBirth']}</span>
        </div>
        <div>
          <h4>Gender</h4>
          <span>{props.data['gender']}</span>
        </div>
        <div>
          <span>
            <h4>Mobile Number</h4>
          </span>
          <span>{props.data['mobileNumber']}</span>
        </div>
        <div>
          <span>
            <h4>Emergency Contact</h4>
          </span>
          <span>{props.data['emergencyContact']['fullName']}</span>
          <br />
          <span>{props.data['emergencyContact']['phoneNumber']}</span>
        </div>
        <div>
          <span>
            <h4>Medical Record</h4>
          </span>
          <div className="d-flex flex-row">
            {medicalRecordUrls.map((url) => {
              return (
                <>
                  {!url.includes('pdf') && (
                    <a className="mx-3" href={url} target="_blank">
                      {' '}
                      <img src={url} width={130} />
                    </a>
                  )}
                  {url.includes('pdf') && (
                    <div className="mx-3" style={{ width: '130px' }}>
                      <a href={url} target="_blank">
                        View PDF
                      </a>
                    </div>
                  )}
                </>
              );
            })}
          </div>
        </div>
        <div>
          <label>Health Record</label>
          <input
            type="file"
            name="healthRecord"
            value={healthRecordInput}
            onChange={onHealthRecordChange}
          />
        </div>
        <button onClick={handleHealthRecordUpload}>Upload Health Record</button>
      </React.Fragment>
    );
  };

  return ReactDOM.createPortal(
    <Modal exit={props.exit}>
      {PatientDetails()}
      <ActionButtons onDelete={onDelete} />
    </Modal>,
    document.getElementById('backdrop-root'),
  );
};

const ActionButtons = (props) => {
  return (
    <div className="d-flex justify-content-end mt-5">
      {/* <button className="formButtons formDeleteButton" onClick={props.onDelete}>
        Delete
      </button> */}
    </div>
  );
};

export default PatientDetails;
