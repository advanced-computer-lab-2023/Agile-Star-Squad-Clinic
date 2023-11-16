import { useContext, useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";

import { loadStripe } from "@stripe/stripe-js";
import SubscriptionForm from "./SubscriptionForm";
import UserContext from "../../../user-store/user-context";

function Payment(props) {
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");
  const userCtx = useContext(UserContext);
  
    const data={
        package_id : props.package,
        price : props.price,
        familyMemberDiscount : props.famDiscount,
        doctorSessionDiscount : props.docDiscount,
        medicineDiscount : props.medDiscount,

    }
  
  useEffect(() => {
    fetch("http://localhost:3000/config").then(async (r) => {
      const { publishableKey } = await r.json();
      setStripePromise(loadStripe(publishableKey));
    });
  }, []);

  useEffect(() => {
    const data={
      patient_id : userCtx.userId,
      price : 6000
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
  }, []);

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
          <SubscriptionForm patientId={props.patient} packageId={props.packageId} price={props.price} famDisc={props.famDiscount} doctorSessionDiscount ={ props.docDiscount}  medicineDiscount = {props.medDiscount}/>
        </Elements>
      )}
    </>
  );
}

export default Payment;
