import ReactDOM from 'react-dom';
import React, { useState, useEffect, useContext } from 'react';
import Card from '../../shared/components/Card/Card';
import DoctorNavBar from '../components/DoctorNavBar';
import PatientHealthRecord from '../components/PatientHealthRecords';
import UserContext from '../../user-store/user-context';
import axios from 'axios';
import PrescriptionDetail from '../../prescriptions/pages/PrescriptionDetails';
import { useLocation } from 'react-router-dom';
import PatientPersonalDetails from '../components/PatientPersonalDetails';
import './PatientDetails.css'
import AddNewPrescription from '../../prescriptions/AddNewPrescription';

const PatientDetails2 = () => {
  
  const [finalPrescriptions, setPrescriptions] = useState([]);
  const [detailsOn, setDetailsOn] = useState(false);
  const [addNewOn, setaddNewOn] = useState(false);
  const [chosenPrescription, setChosenPrescription] = useState(null);
  const doctor = useContext(UserContext);
  const location = useLocation();
  const patient = location.state;

  const fetchPrescriptions = async () => {
    try {
      fetch(`http://localhost:3000/patients/${patient._id}/prescriptions`, {
        credentials: 'include',
      }).then(async (response) => {
        const json = await response.json();
        const prescriptions = patient.prescription;
        // console.log("hello123",prescriptions[0]);
        // console.log("hello123",prescriptions.filter(prescription => prescription.doctor === doctor.userId));
        
        const response2 = await axios.post(
          'http://localhost:3000/prescriptions/list',
          {
            prescriptions,
          },
        );
        // console.log("hello123",response2.data.data.prescriptions.filter(prescription => prescription.doctor === doctor.userId));
        setPrescriptions(response2.data.data.prescriptions.filter(prescription => prescription.doctor === doctor.userId));
      });
    } catch (error) {
      console.log(error);
    }
  };

 const submitPrescHandler =()=>{
   fetchPrescriptions();
 }
  useEffect(() => {
    
    fetchPrescriptions();
  }, []);

  const addPrescriptionHandler = () => {
    setaddNewOn(true);
  };

  const handleClose=()=>{setDetailsOn(false)}
  const handleClose2=()=>{setaddNewOn(false)}
  const viewButtonHandler = (prescription) => {
 
    setChosenPrescription(prescription);

    setDetailsOn(true);
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toDateString(); // Adjust this to fit your desired date format
  };

  return (
    <React.Fragment>
      <DoctorNavBar />
      <div className='container' style={{display:'flex',justifyContent:'space-between'}}>
     <PatientPersonalDetails data={patient}/>
     <PatientHealthRecord data={patient}/>
     <Card className="prescriptionDetails" >
     <div>     
            <h3 style={{textAlign:'center'}}>Prescription Details</h3>         
        <button onClick={addPrescriptionHandler}>Add New Prescription</button>
        </div>
        {finalPrescriptions.length != 0 &&
          finalPrescriptions.map((url,index) => {
            return (
              <>
                <div>
                  <p>Prescription  {index + 1}</p>
                  <button className="patientButton" onClick={() => viewButtonHandler(url)}>View</button>
                </div>
              </>
            );
          })}
      </Card>
      {detailsOn && chosenPrescription && (
       
          <PrescriptionDetail data={chosenPrescription} exit={handleClose}/>
        
      )}
      {addNewOn &&  (
       
          <AddNewPrescription doctor={doctor} patient={patient._id} exit={handleClose2} onAddPrescription={submitPrescHandler}/>
        
      )}
      </div>
    </React.Fragment>
  );
};



export default PatientDetails2;
