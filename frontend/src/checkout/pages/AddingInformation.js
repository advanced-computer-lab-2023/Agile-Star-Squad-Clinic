import React, { useState, useEffect } from 'react';
import Card from '../../shared/components/Card/Card';
import NavBar from '../../shared/components/NavBar/NavBar';
import Payment from '../components/payment/Payment';
import { useLocation, useNavigate } from 'react-router-dom';
import "./extra.css";
import { toastMeSuccess } from '../../shared/components/util/functions';


const AddingInfo = () => {
  const [message, setMessage] = useState('');
  const [doctorSessionDiscount, setDoctorSessionDiscount] = useState(0);
  const [packagePresent, setPackagePresent] = useState(false);
  const [price, setPrice] = useState(0);

  const location = useLocation();
  const navigate = useNavigate();
  
  const stateData = location.state;
  
  
  useEffect(() => {
    
      if (stateData.packageToUse != null) {
        setPackagePresent(true);
        setDoctorSessionDiscount(stateData.packageToUse.doctorSessionDiscount);
      }
      setPrice(Math.floor((stateData.doctor.hourlyRate*1.1)- (doctorSessionDiscount/ 100) * (stateData.doctor.hourlyRate*1.1)));

      
  }, [[stateData.packageToUse, stateData.doctor.hourlyRate, doctorSessionDiscount]]);
  
 
  useEffect(() => {
    const query = new URLSearchParams(window.location.search);

    if (query.get('success')) {
      
      toastMeSuccess('Order placed! You will receive an email confirmation.');
     
    }

    if (query.get('canceled')) {
      setMessage(
        "Order canceled -- continue to shop around and checkout when you're ready.",
      );
    }
  }, []);
  // setAppDate(DUMMY_APPOINTMENT[0].date.toUTCString())
  return (
    //
    <div className="container">
      <NavBar />
      <br />
      <br />
      <div className="row  justify-content-evenly gx-5">
        <div className="col card1">
          <Card>
          
            <Payment props={{ ...stateData,price}} />
          </Card>
        </div>
        <div className="col" id="card2" >
          <Card style={{width:'fit-content',padding:'60px'}}>
            <p id='datesDoctor' style={{textAlign:'left'}}>Order Summary</p>
            <div style={{paddingTop:'30px',paddingBottom:'10px'}}>
              <img
                style={{ width: '100px', height: '100px', borderRadius: '10%',display:"inline-block" }}
                src={
                  stateData.doctor.image ??
                  'https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg'
                }
                alt="profile picture"
               
              />
              <div style={{display:"inline-block",paddingLeft:'10px'}}>
              <p id='datesDoctor' >{stateData.dateOfAppointment.toDateString()}</p>
              <p id='datesDoctor'>{stateData.timeOfAppointment}</p>
              </div>
            </div>
            <p id='datesDoctor' style={{paddingTop:'10px'}}>Dr. {stateData.doctor.name}</p>
            <p id='total1'style={{paddingTop:'10px',paddingBottom:'50px'}}>{Math.floor(stateData.doctor.hourlyRate*1.1)} LE</p>
                
            <p id='total2'>Sub Total: {Math.floor(stateData.doctor.hourlyRate*1.1)}LE </p>
            <div>
              {packagePresent && (
                <p id='total2'>
                  Package Discount : -{Math.floor((stateData.packageToUse.doctorSessionDiscount / 100) *(stateData.doctor.hourlyRate*1.1))}LE
                </p>
              )}
            </div>
            <div id='total1'>Total : {price}</div>
          </Card>
        </div>
      </div>
    </div>
  );
};
export default AddingInfo;
