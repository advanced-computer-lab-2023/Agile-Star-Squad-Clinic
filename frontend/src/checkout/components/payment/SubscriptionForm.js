import { PaymentElement } from "@stripe/react-stripe-js";
import { useContext, useState, useEffect } from "react";
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


  useEffect(() => {
    fetch(
      `http://localhost:3000/patients/${userCtx.userId}`, { credentials: "include" }
    ).then(async response => {
      const responseData = await response.json();
      setBalance(+responseData.data.patient.wallet);
    });
  }, []);

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

      // Send data to the backend
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

          return_url: navigate(-1),
        },
      });
    } catch (error) {
      console.log(error);
      setMessage('Failed to process payment.');
    }
    setIsProcessing(false);

  };
  const handleWallet = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    const newBalance = +balance - (+props.price);
    console.log(newBalance);

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
    }





    setIsProcessing(false)

  }
  const handleCancel = () => {

    navigate(-1);
  };
  return (
    <form id="payment-form" onSubmit={paymentMethod == 0 ? handleSubmit : handleWallet}>
      <div className="d-flex justify-content-between">
        <div>
          <input
            type="radio"
            name='radio'
            className='me-2'
            // id="use-wallet"
            // checked={false}
            onChange={(e) => setPaymentMethod(1)}
          />
          <label htmlFor="use-wallet">Pay using Wallet</label>
        </div>
        <div>
          Balance: {balance}
        </div>
      </div>
      <div>
        <input
          type="radio"
          className='me-2'
          name='radio'
          // id="use-wallet"
          checked={paymentMethod == 0}
          onChange={(e) => setPaymentMethod(0)}
        />
        <label htmlFor="use-wallet">Credit Card</label>
      </div>
      <div>{paymentMethod == 0 &&
        <PaymentElement id="payment-element" />}
      </div>
      {paymentMethod == 1 && balance < props.price && <div>
        Insufficient funds</div>}
      <button disabled={isProcessing || !stripe || !elements || (paymentMethod == 1 && balance < props.price)} id="submit">
        <span id="button-text">
          {isProcessing ? "Processing ... " : "Pay now"}
        </span>
      </button>
      <button onClick={handleCancel}>Cancel</button>
      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}
