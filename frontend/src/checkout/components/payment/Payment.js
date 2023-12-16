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

  const appearance = {
    theme: 'stripe',

    variables: {
      colorPrimary: '#0570de',
      colorBackground: 'rgba',
      colorText: 'black',
      colorDanger: '#df1b41',
      fontFamily: 'Inter',
      spacingUnit: '2px',
      borderRadius: '5px',
      fontLineHeight: 'normal',
      spacingUnit: '5px',
      colorTextPlaceholder: '#2D3748',
      fontWeightMedium:'500'
      
    },
  
    rules: {
      '.DropdownItem --highlight':{
        backgroundColor:'black'
      },
      '.Input': {
        backgroundColor: '#E2E8F0',
       
        borderTopWidth: '0px',
        borderLeftWidth: '0px',
        borderRightWidth: '0px',
        boxShadow:'none',
        width:' 534px',
        color:'#2D3748',
        outline:'black',
        height: '59px',
        padding :'15px',
        fontSize:'16px',
        

        
      },
           
      
      '.Label': {
        
        color: 'var(--600, #718096)',
        fontFamily: 'Inter',
        fontSize: '16px',
        fontWeight: '500',
        lineHeight: 'normal',
      },
      

      // See all supported class names and selector syntax below
    },
  };

  return (
    
    <>

      {clientSecret && stripePromise && (
        <Elements stripe={stripePromise} options={{ clientSecret, appearance,fonts: [
          {
            // integrate your font into stripe
            cssSrc:
              "https://fonts.googleapis.com/css2?family=Inter:wght@500&family=Manrope:wght@200;400;700&family=Maven+Pro:wght@600&family=Poppins:wght@100;300;400;600;700&family=Roboto:wght@500&family=Yeseva+One&display=swap",
          },
        ], }}>
          <CheckoutForm doctorId={props.props.doctor._id} patientId={props.props.addAppointmentTo} appDate={props.props.dateOfAppointment} price={props.props.price}/>
          {/* <SubscriptionForm customerId={props.props[0].patient} price= {props.props[0].patient}/> */}
        </Elements>
      )}
    </>
  );
}

export default Payment;
