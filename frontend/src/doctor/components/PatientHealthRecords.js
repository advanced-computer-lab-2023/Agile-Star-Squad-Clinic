import React, { useState, useEffect } from 'react';
import storage from '../../index';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import Card from '../../shared/components/Card/Card';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './PatientPersonalDetails.css';
import { toastMeError } from '../../shared/components/util/functions';

const PatientHealthRecord = (props) => {
  const [healthRecord, setHealthRecord] = useState('');
  const [medicalRecordUrls, setMedicalRecords] = useState([]);
  const patient = props.data;
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
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
    } else {
      toastMeError('Please choose a file first');
      return;
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
      console.log(patient);
      const response = await fetch(
        `http://localhost:3000/doctors/healthRecord/${patient._id}`,
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
    fetch(`http://localhost:3000/doctors/healthRecord/${patient._id}`, {
      credentials: 'include',
    }).then(async (response) => {
      const json = await response.json();
      setMedicalRecords(patient.medicalRecord);
    });
  };

  useEffect(() => {
    fetchPackages();
  }, [medicalRecordUrls]);

  const onHealthRecordChange = (file) => {
    setHealthRecord(file.target.files[0]);
  };
  const { healthRecordInput } = healthRecord;
  return (
    <Card className="healthRecord" >
      <div className="welcomeText">
        {/* <p  className='welcomeText'>Medical Record</p> */}
        Medical Record
      </div>
      <div className="carousel-container">
        {/* <div className="d-flex flex-row"> */}

        <Slider {...settings}>
          {medicalRecordUrls.map((url) => {
            return (
              <>
                {!url.includes('pdf') && (
                  <div style={{ width: '330px' }}>
                    <a href={url} target="_blank">
                      {' '}
                      <img
                        src={url}
                        width={330}
                        style={{ maxHeight: '200px' }}
                      />
                    </a>
                  </div>
                )}
                {url.includes('pdf') && (
                  <div style={{ width: '330px' }}>
                    <a href={url} target="_blank">
                      View PDF
                    </a>
                  </div>
                )}
              </>
            );
          })}
        </Slider>
      </div>

      <div style={{ marginTop: '200px' }}>
        <div>
          <label style={{ marginRight: '20px' }}>
            <strong>Health Record</strong>
          </label>
          <input
            type="file"
            name="healthRecord"
            value={healthRecordInput}
            onChange={onHealthRecordChange}
            className="patientButton"
            
          />
        </div>
        <div style={{ paddingTop: '20px' }}>
          <button className="mainButton" onClick={handleHealthRecordUpload} style={{marginBottom:'15px'}} >
            Upload Health Record
          </button>
        </div>
      </div>
    </Card>
  );
};
export default PatientHealthRecord;
