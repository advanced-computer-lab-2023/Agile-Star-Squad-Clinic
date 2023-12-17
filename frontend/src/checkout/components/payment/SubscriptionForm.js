import { PaymentElement } from "@stripe/react-stripe-js";
import React,{ useContext, useState, useEffect } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";
import './CheckoutForm.css'
import UserContext from "../../../user-store/user-context";

export default function SubscriptionForm(props) {
  const stripe = useStripe();
  const elements = useElements();
  let navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  // const [useWallet, setUseWallet] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(0);
  const userCtx = useContext(UserContext);
  const [balance, setBalance] = useState(0);
  
  const [familyMembers, setFamilyMembers] = useState([]);
  const [selectedMemberId, setSelectedMemberId] = useState('');

  const handleMemberSelect = (e) => {
    setSelectedMemberId(e.target.value);
    const isFamilyMemberSelected = e.target.value !== userCtx.userId;

    // Send the information to the parent component
    props.onFamilyMemberSelect(isFamilyMemberSelected);
  };


  useEffect(() => {
    fetch(
      `http://localhost:3000/patients/${userCtx.userId}`, { credentials: "include" }
    ).then(async response => {
      const responseData = await response.json();
      setBalance(+responseData.data.patient.wallet);
    
    });
  }, []);
  useEffect(() => {
    // Fetch family members of the patient
    const fetchFamilyMembers = async () => {
      try {
        const response = await fetch(`http://localhost:3000/patients/${userCtx.userId}/familyMembers`, {
          credentials: 'include'
        });
        if (response.ok) {
          const data = await response.json();
          setFamilyMembers(data.data.members);
        }
      } catch (error) {
        console.error('Error fetching family members:', error);
      }
    };

    fetchFamilyMembers();
  }, [userCtx.userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsProcessing(true);

    try {
     
      const response = await fetch(`http://localhost:3000/patients/${userCtx.userId}/kimoSubscribe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ packageId: props.packageId }),
        credentials: "include"
      });

      if (!response.ok) {
    
        throw new Error('Failed to send data to the server.');
      }

      setMessage('Payment successful!');

      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {

          return_url: 'http://localhost:3001/healthPackages',
        },
      });
    } catch (error) {
      setMessage('Failed to process payment.');
    }
    setIsProcessing(false);

  };
  const handleWallet = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    const newBalance = +balance - (+props.price);
    
    if(newBalance>=0){

    try {
      const response = await fetch(
        `http://localhost:3000/patients/${userCtx.userId}/wallet`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ walletAmount: newBalance }),
        }
      );

      await fetch(`http://localhost:3000/patients/${userCtx.userId}/kimoSubscribe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ packageId: props.packageId }),
        credentials: "include"
      });

      if (response.ok) {
        // Handle a successful response
        setMessage("Payment successful via wallet!");
        alert("Payment successful via wallet!")
        navigate(-1);
      } else {
        // Handle errors if the server response is not ok
        alert('Failed to update data.');
      }
    } catch (error) {
      // Handle network errors
      alert('Network error: ' + error.message);
    }}
    else{
      setMessage("Insufficient balance in your wallet.")
    }


    setIsProcessing(false)

  }
  const handleCancel = () => {

    navigate(-1);
  };
  return (
    <form id="payment-form" onSubmit={paymentMethod == 0 ? handleSubmit : handleWallet}>
        <div className='headins'>
              <p >Account</p>
              <hr id='hring'></hr>
              <img src="/checkbox.png" alt="done"/>
              <hr id='hring'></hr>
              <p>Payment</p>
              <hr id='hring'></hr>
              <img src="/checkbox.png" alt="done"/>
              <hr id='hring'></hr>
              <p>Reservation No.</p>
            </div>
      <div className="d-flex justify-content-between">
        <div>
          <input
            type="checkbox"
            
            className='form-check-input mt-0'
            // id="use-wallet"
            // checked={false}
            checked={paymentMethod == 1}
            onChange={(e) => setPaymentMethod(1)}
          />
          <label htmlFor="use-wallet" className="choicePayment">Pay using Wallet</label>
        </div>
        <div>
        <input
          type="checkbox"
          className='form-check-input mt-0'
          
          // id="use-wallet"
          checked={paymentMethod == 0}
          onChange={(e) => setPaymentMethod(0)}
        />
        <label htmlFor="use-wallet" className="choicePayment">Credit Card</label>
      </div>
        <div className="choicePayment">
          Balance: {balance}
        </div>
      </div>
      
      <div style={{padding:'20px 0px'}}>
      <label  htmlFor="familyMembers" className="selectLabel1">Select a family member:</label>
      <select className="select1" id="familyMembers" name="familyMembers" onChange={handleMemberSelect}>
      <option value={userCtx.userId}>None</option>
        {familyMembers.map((member) => (
          <option key={member._id} value={member._id}>
            {member.name}
          </option>
        ))}
      </select>
      </div>
      <div>{paymentMethod == 0 && <React.Fragment>
        <div >
        <label className="label1" >Card Holder Name</label>
        <br />
        <input
          type="text"
          className="input1"
          name="radio"
          placeholder="Name"
          // id="use-wallet"
          
          required
        />
      </div>
        <PaymentElement id="payment-element" /></React.Fragment>}
      </div>
      {paymentMethod == 1 && balance < props.price && <div>
        Insufficient funds</div>}
        <button className="cancelApp" onClick={handleCancel}>Cancel</button>

      <button className="checkoutApp" disabled={isProcessing || !stripe || !elements || (paymentMethod == 1 && balance < props.price)} id="submit">
        <span id="button-text">
          {isProcessing ? "Processing ... " : "Complete Order"}
        </span>
      </button>
      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}
