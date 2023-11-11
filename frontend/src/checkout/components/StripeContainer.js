import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import React from "react"
import PaymentForm from "./PaymentForm"

// import './PaymentForm.css'
const PUBLIC_KEY="pk_test_51O9YaUIM4ONA4ExmSMtNdcbsS07Wi8oWFhFjG0tcyoYc6hXaliczsMz67gT3dTENgYUFhuxyqAXTMcGwrVhzctKE00CEwkiu9W"

const stripeTestPromise = loadStripe(PUBLIC_KEY);
const StripeContainer = () =>{
    const options = {
        // passing the client secret obtained from the Stripe Dashboard
        clientSecret: 'sk_test_51O9YaUIM4ONA4Exm7TJdbad0dX5MROUOQMOHOzBf4t7wWoCiC5zrfgIxdAphSnEoVirAACoGLU4MOos1b4qnPQgV001zaZC11m',
      };
    return (
        <Elements stripe={stripeTestPromise} options={options}>
			<PaymentForm />
		</Elements>
    )

}
export default StripeContainer;
