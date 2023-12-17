import React, { useState, useEffect,useContext } from 'react';
import Card from '../../shared/components/Card/Card';
import NavBar from '../../shared/components/NavBar/NavBar';
import PaymentSub from '../components/payment/PaymentSub';
import { useLocation } from 'react-router-dom';
import UserContext from "../../user-store/user-context";
import "./extra.css";
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
  const [packageImage, setPackageImage] = useState();
  const [discount,setDiscount]=useState(0);
  const userCtx = useContext(UserContext);
  const location = useLocation()
  const [price, setPrice] = useState(0);
  const packageId = location.state.id;
  const [user, setUser] = useState();

  


  const stateData = location.state;


  const handleFamilyMemberSelection = (isFamilyMemberSelected) => {
    // Do something with the information that a family member is selected
    setfamilyMemberDiscount(isFamilyMemberSelected)
    
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
      if(familyMemberDiscount)
      setPrice(Math.floor((stateData.price)- (discount/ 100) * (stateData.price)));
      else{
        setPrice( (stateData.price));

      }
    });
  }, [familyMemberDiscount]);

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
  useEffect(()=>{
      if(stateData.name == 'Platinum'){
        setPackageImage('/platinum.png')
      }
      else if(stateData.name == 'Gold'){
        setPackageImage('/gold.png')
      }
      else if(stateData.name == 'Silver'){
        setPackageImage('/silver.png')
      }
      else{
        setPackageImage('/other.png')
      }
  },stateData.name)
  // setAppDate(DUMMY_APPOINTMENT[0].date.toUTCString())
  return (
    //
    <div className="container" >
      <NavBar />
      <br />
      <br />
      
      <div className="row  justify-content-evenly  gx-5">
        <div className="col card1">
          <Card>
            
            <PaymentSub price={price} packageId={packageId} onFamilyMemberSelect={handleFamilyMemberSelection}/>
            
          </Card>
        </div>
        <div className="col" id="card2">
          <Card style={{width:'fit-content',padding:'50px'}}>
          <p id='datesDoctor' style={{textAlign:'left'}}>Order Summary</p>

            <div style={{paddingBottom:'10px',paddingTop:'30px'}}>
          <img src={packageImage} style={{ width: '100px', height: '100px',display:"inline-block" }}></img>
           <h3 style={{display:"inline-block"}}>{stateData.name} Package </h3>
          </div>
            <p id='total2'>
              Sub Total: {stateData.price}LE </p>
              <div>
                {familyMemberDiscount&&
                <p id='total2'>
                  Package Discount : -{Math.floor((discount / 100) *(stateData.price))}LE
                </p>}
                </div>
              <p id='total1'>Total : {price } LE </p>
           
          </Card>
        </div>
      </div>
    </div>
  );
};
export default AddingInfo;
