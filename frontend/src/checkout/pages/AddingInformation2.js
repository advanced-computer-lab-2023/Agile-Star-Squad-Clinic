import React, { useState, useEffect } from 'react';
import Card from '../../shared/components/Card/Card';
import NavBar from '../../shared/components/NavBar/NavBar';
import PaymentSub from '../components/payment/PaymentSub';
import { useLocation } from 'react-router-dom';
import Payment from '../components/payment/Payment';

const AddingInfo = () => {
  const [showItem, setShowItem] = useState(false);
  const [showDelivery, setShowDelivery] = useState(false);
  const [message, setMessage] = useState('');
  const [doctorSessionDiscount, setDoctorSessionDiscount] = useState('');
  const [familyMemberDiscount, setfamilyMemberDiscount] = useState('');
  const [medicineDiscount, setmedicineDiscount] = useState('');
  const [doctorName, setDoctorName] = useState('');
  const [appDate, setAppDate] = useState('');
  const [paymentMethod, setPaymentMethod] = useState(0);
  const [packageData, setPackageData] = useState();
  const location = useLocation()
  const price = location.state.price;
  const packageId = location.state.id;


  const stateData = location.state;

  console.log(stateData);




  useEffect(() => {

    const query = new URLSearchParams(window.location.search);

    if (query.get('success')) {
      setMessage('Order placed! You will receive an email confirmation.');
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
            
            <PaymentSub price={price} packageId={packageId}/>
            
          </Card>
        </div>
        <div className="col" id="card2">
          <Card>
            <h3>{packageData && packageData.name}</h3>

            <p>{doctorName}</p>
            <p>
              Sub Total: {price}LE </p>
            <div>
              <p>

              </p> </div>

          </Card>
        </div>
      </div>
    </div>
  );
};
export default AddingInfo;
