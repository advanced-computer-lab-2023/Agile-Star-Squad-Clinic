import { PaymentElement } from "@stripe/react-stripe-js";
import React ,{ useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";
import './CheckoutForm.css'

export default function CheckoutForm(props) {
  const stripe = useStripe();
  const elements = useElements();
  let navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [useWallet, setUseWallet] = useState(false);

  const fetchUserBalance = async () => {

  }

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
      
      let paymentIntentData = {
        
        doctor: props.doctorId,
        patient: props.patientId,
        dateOfAppointment: props.appDate,
        status: 'upcoming'
      };
      
      // Send data to the backend
      const response = await fetch('http://localhost:3000/doctors/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentIntentData),
      });
      
      if (!response.ok) {
         
          throw new Error('Failed to send data to the server.');
        }
        // navigate('/patient/appointment/book/')
        setMessage('Payment successful!');
        const { error } = await stripe.confirmPayment({
          elements,
          confirmParams: {
            return_url: 'http://localhost:3001/patient/appointment/book',
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
    const response = await fetch(`http://localhost:3000/patients/${props.patientId}`)
    const responseData = await response.json()
    const currentWallet = responseData.data.patient.wallet

    const deduct = props.price * -1
    const newBalance = currentWallet + deduct;
    if (currentWallet + deduct >= 0) {
      try {
        const response = await fetch(
          `http://localhost:3000/patients/${props.patientId}/wallet`,

          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ walletAmount: newBalance }),
          }
        );
        let paymentIntentData = {

          doctor: props.doctorId,
          patient: props.patientId,
          dateOfAppointment: props.appDate,
          status: 'upcoming'
        };

        // Send data to the backend
        await fetch('http://localhost:3000/doctors/appointments', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(paymentIntentData),
        });

        if (response.ok) {
          // Handle a successful response
          setMessage("Payment successful via wallet!");

        } else {
          // Handle errors if the server response is not ok
          alert('Failed to update data.');
        }
      } catch (error) {
        // Handle network errors
        alert('Network error: ' + error.message);
      }


    }
    else {
      setMessage("Insufficient balance in your wallet.");
    }


    setIsProcessing(false)

  }
  const handleCancel = () => {

    navigate(-1);
  };
  return (
    <form id="payment-form" onSubmit={!useWallet ? handleSubmit : handleWallet}>
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
            {/* <h4>Payment Details</h4> */}
            <div style={{padding:'10px'}}>
      <input
        type="checkbox"
        // id="use-wallet"
        class="form-check-input mt-0"
        checked={useWallet}
        onChange={(e) => setUseWallet(e.target.checked)}
        
      />
      <label htmlFor="use-wallet" className="choicePayment" >Pay with Wallet</label>
      </div>
      <div>{!useWallet &&<React.Fragment>  <div >
              <label className="label1">Card Holder Name</label>
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
      {message && <div id="payment-message">{message}</div>}

      <button className="cancelApp" onClick={handleCancel}>Cancel</button>
      <button className="checkoutApp" disabled={isProcessing || !stripe || !elements} id="submit">
        <span id="button-text">
          {isProcessing ? "Processing ... " : "Complete Order"}
        </span>
      </button>
      
      {/* Show any error or success messages */}
     
    </form>
  );
}
