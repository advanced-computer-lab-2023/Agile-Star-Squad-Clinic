import ReactDOM from 'react-dom';
import React, { useState, useEffect, useContext } from 'react';
import Card from '../../shared/components/Card/Card';

import axios from 'axios';
import PrescriptionDetail from '../../prescriptions/pages/PrescriptionDetails';

import '../pages/PatientDetails.css'
import AddNewPrescription from '../../prescriptions/AddNewPrescription';

const PatientPrescriptionDetails  =(props)=>{
    const [finalPrescriptions, setPrescriptions] = useState([]);
  const [detailsOn, setDetailsOn] = useState(false);
  const [addNewOn, setaddNewOn] = useState(false);
  const [chosenPrescription, setChosenPrescription] = useState(null);
  const patient = props.patient;
    const doctor=props.doctor
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

 const submitPrescHandler =(newPrescription)=>{
  //  fetchPrescriptions();
  setPrescriptions((prev)=>{return[...prev,newPrescription]})
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
  console.log(finalPrescriptions)
  return(
    <React.Fragment>
    <Card className="prescriptionDetails" >
    <div className='prescriptionHeader'>     
           <h3 className='welcomeText' style={{textAlign:'center'}}>Prescriptions</h3>         
       <button onClick={addPrescriptionHandler}>Add New Prescription</button>
       </div>
       <div className='prescriptionList'>
       {finalPrescriptions.length != 0 &&
         finalPrescriptions.map((url,index) => {
           return (
             <>
               <div className="prescriptionItem">
                 <p ><strong>Prescription  {index + 1} </strong><br/> {url.body}</p>
                 <button className="patientButton" onClick={() => viewButtonHandler(url)}>View</button>
               </div>
             </>
           );
         })}
         </div>
     </Card>
     {detailsOn && chosenPrescription && (
       
        <PrescriptionDetail data={chosenPrescription} exit={handleClose}/>
      
    )}
    {addNewOn &&  (
     
        <AddNewPrescription doctor={doctor} patient={patient._id} exit={handleClose2} onAddPrescription={submitPrescHandler}/>
      
    )}
    </React.Fragment>
  )
}
export default PatientPrescriptionDetails;