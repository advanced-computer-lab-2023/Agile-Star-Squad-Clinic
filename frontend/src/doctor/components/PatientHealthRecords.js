import React, { useState, useEffect} from 'react';
import storage from '../../index';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import Card from '../../shared/components/Card/Card';
import './PatientPersonalDetails.css'


const PatientHealthRecord =(props) =>{
    const [healthRecord, setHealthRecord] = useState('');
  const [medicalRecordUrls, setMedicalRecords] = useState([]);
    const patient = props.data;
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
    else{
      alert("Please choose a file first")
      return
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
        `http://localhost:3000/doctors/healthRecord/${patient._id}`,
        requestOptions,
      ).catch((error) => {
        console.log(error);
      });
      if (!response.ok) {
        alert('Failed to upload health record');
      }
    } catch (error) {
      console.error('Error uploading health record:', error);
    }
  };
  const fetchPackages = async () => {
    fetch(`http://localhost:3000/doctors/healthRecord/${patient._id}`, {
      credentials: 'include',
    }).then(async (response) => {
      const json = await response.json();
      setMedicalRecords(patient.medicalRecord);
    });
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  const onHealthRecordChange = (file) => {
    setHealthRecord(file.target.files[0]);
  };
  const { healthRecordInput } = healthRecord;
  console.log("me2",medicalRecordUrls[0])
  return(
    <Card className="healthRecord">
     
    <div>
      <span>
        <h3>Medical Record</h3>
      </span>
      {/* <div className="d-flex flex-row"> */}
      <div className="">
        {medicalRecordUrls.map((url) => {
          return (
            <>
              {!url.includes('pdf') && (
                <a  href={url} target="_blank">
                  {' '}
                  <img src={url} width={130} />
                </a>
              )}
              {url.includes('pdf') && (
                <div  style={{ width: '130px' }}>
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
  </Card>
  );
}
export default PatientHealthRecord;