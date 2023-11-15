import React, { useState, useEffect, useContext } from 'react';
import storage from '../../index';
import {
  getDownloadURL,
  ref,
  uploadBytesResumable,
  listAll,
} from 'firebase/storage';
import ReactDOM from 'react-dom';
import classes from './PatientAccountSettings.module.css';
import NavBar from '../../shared/components/NavBar/NavBar';
import UserContext from '../../user-store/user-context';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const PatientAccountSettings = (props) => {
  const patient = useContext(UserContext);
  const navigate = useNavigate();
  const [healthPackage, setPackage] = useState(null);
  const [medicalRecordUrls, setMedicalRecords] = useState(null);
  const [isButtonPressed, setButtonPressed] = useState(false);
  const [healthRecord, setHealthRecord] = useState('');
  const [subscriptionDate, setsubscriptionDate] = useState(Date.now());
  const [expiringDate, setexpiringDate] = useState(Date.now());
  const [cancellationDate, setcancellationDate] = useState(Date.now());
  const [currentPatient, setCurrentPatient] = useState('');

  const onHealthRecordChange = (file) => {
    setHealthRecord(file.target.files[0]);
  };

  const fetchPackage = async () => {
    fetch(`http://localhost:3000/patients/${patient.userId}`).then(
      async (response) => {
        const json = await response.json();
        console.log(json.data);
        setsubscriptionDate(json.data.patient.subscriptionDate);
        setexpiringDate(json.data.patient.expiringDate);
        setMedicalRecords(json.data.patient.medicalRecord);
        setPackage(json.data.patient.package);
        setCurrentPatient(json.data.patient);
        setcancellationDate(json.data.patient.cancellationDate);
      },
    );
  };
  const handeleUnsubscribeButtonclick = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/patients/${patient.userId}/package`,
        {
          method: 'PATCH',
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        },
      );
      console.log(response);
      if (response.ok) {
        setButtonPressed(true);
        setPackage(null);
        setcancellationDate(JSON.stringify(new Date()));
      } else {
        console.error(
          'Failed to remove health package. Status:',
          response.status,
        );
        const responseBody = await response.json();
        console.error('Response body:', responseBody);
      }
    } catch (error) {
      console.error('Error removing health package:', error);
    }
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
    // const formData = new FormData();
    // formData.append('medicalRecord', healthRecordUrl);
    const data = {
      medicalRecord: healthRecordUrl,
    };

    try {
      console.log(healthRecordUrl);
      const requestOptions = {
        method: 'PATCH',
        headers: { 'Content-type': 'application/json; charset=UTF-8' },
        body: JSON.stringify(data),
      };
      console.log(requestOptions.body);
      console.log(requestOptions);

      const response = await fetch(
        `http://localhost:3000/patients/${patient.userId}`,
        requestOptions,
      );
      console.log(response);
      if (!response.ok) {
        alert('Failed to upload health record');
      }
    } catch (error) {
      console.error('Error uploading health record:', error);
    }
  };

  useEffect(() => {
    fetchPackage();
  }, []);

  const deleteImage = (e, url) => {
    e.preventDefault();

    setMedicalRecords((records) => {
      const newRecords = records.filter((record) => record != url);
      const requestOptions = {
        method: 'PATCH',
        headers: { 'Content-type': 'application/json; charset=UTF-8' },
        body: JSON.stringify({ medicalRecord: newRecords }),
      };

      fetch(
        `http://localhost:3000/patients/${patient.userId}/setHealthRecords`,
        requestOptions,
      );
      return newRecords;
    });
  };

  const logout = async () => {
    await patient.logout();
    navigate('/');
  };

  const changePasswordHandler = () => {
    navigate('/changePassword');
  };

  const familyMembersHandler = () => {
    navigate('/patient/family');
  };

  const { healthRecordInput } = healthRecord;
  return (
    <body>
      <NavBar />
      <div>
        {cancellationDate === null && (
          <button onClick={handeleUnsubscribeButtonclick}>
            Unsubscribe from current package
          </button>
        )}
      </div>
      <div>
        <>
          <div>
            {healthPackage != null && <div>Category: {healthPackage.name}</div>}
          </div>
          <div>
            {healthPackage != null && (
              <div>Price Per Year: {healthPackage.pricePerYear}</div>
            )}
          </div>
          <div>
            {healthPackage != null && (
              <div>
                Doctor Session Discount: {healthPackage.doctorSessionDiscount}
              </div>
            )}
          </div>
          <div>
            {healthPackage != null && (
              <div>Medicine Discount: {healthPackage.medicineDiscount}</div>
            )}
          </div>
          <div>
            {healthPackage != null && (
              <div>
                Family Member Discount: {healthPackage.familyMemberDiscount}
              </div>
            )}
          </div>
          <div>
            {healthPackage != null && (
              <div>Description: {healthPackage.description}</div>
            )}
          </div>
          <div>
            {healthPackage != null && (
              <div>Subscription Date: {subscriptionDate}</div>
            )}
          </div>
          <div>
            {healthPackage != null && (
              <div>Expiration Date: {expiringDate}</div>
            )}
          </div>
        </>
        <>
          {isButtonPressed && <div>You unsubscribed successfully</div>}
          {cancellationDate !== null && (
            <div>Cancellation Date: {cancellationDate}</div>
          )}
        </>
      </div>
      <button onClick={familyMembersHandler}>Family Members</button>
      <div className={classes.healthRecordContainer}>
        <h3 className="text-start ms-3 my-4">Health Records</h3>
        {medicalRecordUrls != null && (
          <div className={classes.healthRecordImages}>
            {medicalRecordUrls.map((url) => {
              return (
                <div
                  className="position-relative mx-4 shadow-sm"
                  style={{ width: '130px' }}
                >
                  {!url.includes('pdf') && <img src={url} width={130} />}
                  {url.includes('pdf') && (
                    <a href={url} target="_blank">
                      View PDF
                    </a>
                  )}
                  <button
                    className={classes.imageRemove}
                    onClick={(e) => deleteImage(e, url)}
                  >
                    x
                  </button>
                </div>
              );
            })}
          </div>
        )}
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
      </div>

      <div className="mt-5">
        <button onClick={logout}>Logout</button>
        <button onClick={changePasswordHandler}>Change Password</button>
      </div>
    </body>
  );
};
export default PatientAccountSettings;
