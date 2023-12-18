
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
            <h4>Username</h4>
          </span>
          <span>{patient.username}</span>
        </div>
        <div>
          <img src="/patient1.png"  id='personalImage'/>
        </div>
        <div>
          <span>
            <h4>Name</h4>
          </span>
          <span>{patient.name}</span>
        </div>
        <div>
          <span>
            <h4>Email</h4>
          </span>
          <span>{patient.email}</span>
        </div>
        <div>
          <span>
            <h4>Date of Birth</h4>
          </span>
          <span>{formatDate(patient.dateOfBirth)}</span>
        </div>
        <div>
          <h4>Gender</h4>
          <span>{patient.gender}</span>
        </div>
        <div>
          <span>
            <h4>Mobile Number</h4>
          </span>
          <span>{patient.mobileNumber}</span>
        </div>
        <div>
          <span>
            <h4>Emergency Contact</h4>
          </span>
          <span>{patient.emergencyContact.fullName}</span>
          <br />
          <span>{patient.emergencyContact.phoneNumber}</span>
        </div>
        </div>
      </Card>
    );

}
export default PatientPersonalDetails