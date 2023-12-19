
import React from 'react';
import Card from '../../shared/components/Card/Card';
import './PatientPersonalDetails.css'

const PatientPersonalDetails = (props) =>{
    const patient = props.data;

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
      
        return `${day}/${month}/${year}`;
      };

    return(
        <Card className="overall">
        <div>     
            <h3 className='welcomeText' style={{paddingBottom:'5px'}}>Personal Details</h3>         
        </div>
        <div className="personalDetails">
        <div>
          <span>
            <span>Username</span>
          </span>
          <h5>{patient.username}</h5>
        </div>
        {/* <div>
          <img src="/patient1.png"  id='personalImage'/>
        </div> */}
        <div>
          <span>
            <span>Name</span>
          </span>
          <h5>{patient.name}</h5>
        </div>
        <div>
          <span>
            <span>Email</span>
          </span>
          <h5>{patient.email}</h5>
        </div>
        <div>
          <span>
            <span>Date of Birth</span>
          </span>
          <h5>{formatDate(patient.dateOfBirth)}</h5>
        </div>
        <div>
          <span>Gender</span>
          <h5>{patient.gender}</h5>
        </div>
        <div>
          <span>
            <span>Mobile Number</span>
          </span>
          <h5>{patient.mobileNumber}</h5>
        </div>
        <div>
          <span>
            <span>Emergency Contact</span>
          </span>
          <h5>{patient.emergencyContact.fullName}</h5>
          
          <h5>{patient.emergencyContact.phoneNumber}</h5>
        </div>
        </div>
      </Card>
    );

}
export default PatientPersonalDetails