import React, { useState, useEffect,useContext } from 'react';
import Card from '../../shared/components/Card/Card';
import NavBar from '../../shared/components/NavBar/NavBar';
import PaymentSub from '../components/payment/PaymentSub';
import { useLocation } from 'react-router-dom';
import Payment from '../components/payment/Payment';
import UserContext from "../../user-store/user-context";

const AddingInfo = () => {
  const [showItem, setShowItem] = useState(false);
  const [showDelivery, setShowDelivery] = useState(false);
  const [message, setMessage] = useState('');
  const [doctorSessionDiscount, setDoctorSessionDiscount] = useState('');
  const [familyMemberDiscount, setfamilyMemberDiscount] = useState(false);
  const [medicineDiscount, setmedicineDiscount] = useState('');
  const [doctorName, setDoctorName] = useState('');
  const [appDate, setAppDate] = useState('');
  const [paymentMethod, setPaymentMethod] = useState(0);
  const [packageData, setPackageData] = useState();
  const [discount,setDiscount]=useState(0);
  const userCtx = useContext(UserContext);
  const location = useLocation()
  const [price, setPrice] = useState(0);
  const packageId = location.state.id;
  const [user, setUser] = useState();

  


  const stateData = location.state;

  console.log(stateData);

  const handleFamilyMemberSelection = (isFamilyMemberSelected) => {
    // Do something with the information that a family member is selected
    setfamilyMemberDiscount(isFamilyMemberSelected)
    console.log(isFamilyMemberSelected)
    // Adjust discounts or other logic based on family member selection
  };
  useEffect(() => {
    fetch(
      `http://localhost:3000/patients/${userCtx.userId}`, { credentials: "include" }
    ).then(async response => {
      const responseData = await response.json();
      if(responseData.data.patient.package!=null){
        setDiscount(responseData.data.patient.package.familyMemberDiscount)
      }
      setPrice(Math.floor((stateData.price)- (discount/ 100) * (stateData.price)));
    
    });
  }, []);

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
            
            <PaymentSub price={price} packageId={packageId} onFamilyMemberSelect={handleFamilyMemberSelection}/>
            
          </Card>
        </div>
        <div className="col" id="card2">
          <Card>
            <h3>{packageData && packageData.name}</h3>

            
            <p>
              Sub Total: {stateData.price}LE </p>
              <div>
                {familyMemberDiscount&&
                <p>
                  Package Discount : -{Math.floor((discount / 100) *(stateData.price))}LE
                </p>}
                </div>
              <p>Total : {price -(Math.floor((discount / 100) *(stateData.price)))} </p>
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
