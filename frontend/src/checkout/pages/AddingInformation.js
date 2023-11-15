import React, { useState, useEffect } from 'react';
import Card from '../../shared/components/Card/Card';
import NavBar from '../../shared/components/NavBar/NavBar';
import Payment from '../components/payment/Payment';
import { useLocation } from 'react-router-dom';


const AddingInfo = () => {
  const [message, setMessage] = useState('');
  const [doctorSessionDiscount, setDoctorSessionDiscount] = useState(0);
  const [packagePresent, setPackagePresent] = useState(false);
  const [price, setPrice] = useState(0);

  const location = useLocation();
  
  
  const stateData = location.state;
  console.log(stateData.timeOfAppointment)
  
  //console.log(stateData.doctor,"llll");
  
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
     alert('Order placed! You will receive an email confirmation.');
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
        <div className="col" id="card2">
          <Card>
            <h3>Order Summary</h3>
            <div>
              <img
                style={{ width: '200px', height: '200px', borderRadius: '10%' }}
                src={
                  stateData.doctor.image ??
                  'https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg'
                }
                alt="profile picture"
              />
              <p>{stateData.dateOfAppointment.toDateString()}</p>
              <p>{stateData.timeOfAppointment}</p>
            </div>
            <p>{stateData.doctor.name}</p>
            <p>Sub Total: {Math.floor(stateData.doctor.hourlyRate*1.1)}LE </p>
            <div>
              {packagePresent && (
                <p>
                  Package Discount : -{(stateData.packageToUse.doctorSessionDiscount / 100) * price}LE
                </p>
              )}
            </div>
            <div>Total : {price}</div>
          </Card>
        </div>
      </div>
    </div>
  );
};
export default AddingInfo;
