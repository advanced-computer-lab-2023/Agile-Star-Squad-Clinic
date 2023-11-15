import { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import SubscriptionForm from "./SubscriptionForm";

function Payment(props) {
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");
  
  
    
    
  useEffect(() => {
    fetch("http://localhost:3000/config").then(async (r) => {
      const { publishableKey } = await r.json();
      setStripePromise(loadStripe(publishableKey));
    });
  }, []);

  useEffect(() => {
    const data={
      patient_id : props.props.addAppointmentTo,
      price : props.props.price
  }
    fetch("http://localhost:3000/create-payment-intent", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    }).then(async (result) => {
      const { clientSecret } = await result.json();
      setClientSecret(clientSecret);
    });
  }, [props.props.addAppointmentTo, props.props.price]);

  const elementStyleOptions = {
    base: {
      fontSize: "40px",
      color: "#32325d",
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: "antialiased",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  };

  return (
    
    <>

      {clientSecret && stripePromise && (
        <Elements stripe={stripePromise} options={{ clientSecret, ...elementStyleOptions }}>
          <CheckoutForm doctorId={props.props.doctor._id} patientId={props.props.addAppointmentTo} appDate={props.props.dateOfAppointment} price={props.props.price}/>
          {/* <SubscriptionForm customerId={props.props[0].patient} price= {props.props[0].patient}/> */}
        </Elements>
      )}
    </>
  );
}

export default Payment;
