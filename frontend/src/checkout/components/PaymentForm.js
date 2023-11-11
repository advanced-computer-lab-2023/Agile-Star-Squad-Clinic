import { CardElement, useElements, useStripe,PaymentElement } from "@stripe/react-stripe-js"
import axios from "axios"
import React, { useState } from 'react'
import './PaymentForm.css'

const CARD_OPTIONS = {
	iconStyle: "solid",
	style: {
		base: {
			iconColor: "#c4f0ff",
			color: "#fff",
			fontWeight: 500,
			fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
			fontSize: "16px",
			fontSmoothing: "antialiased",
			":-webkit-autofill": { color: "#fce883" },
			"::placeholder": { color: "#87bbfd" }
		},
		invalid: {
			iconColor: "#ffc7ee",
			color: "#ffc7ee"
		}
	}
}
const PaymentForm =() =>{
    const [success,setSuccess] =useState(false);
    const stripe =useStripe();
    const elements = useElements();



    const handleSubmit = async (e) => {
        e.preventDefault()
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement)
        })


    if(!error) {
        try {
            const {id} = paymentMethod
            const response = await axios.post("http://localhost:3000/payment", {
                amount: 1000,
                id
            })

            if(response.data.success) {
                console.log("Successful payment")
                setSuccess(true)
            }

        } catch (error) {
            console.log("Error", error)
        }
    } else {
        console.log(error.message)
    }
}
    return (
    //     <>
    //     {!success ? 
    //     <form onSubmit={handleSubmit} className="forming">
    //         <fieldset className="FormGroup">
    //             <div className="FormRow">
    //                 <CardElement options={CARD_OPTIONS}/>
    //             </div>
    //         </fieldset>
    //         <button className="payment_button">Pay</button>
    //     </form>
    //     :
    //    <div>
    //        <h2 className="payment_h2">You just bought a sweet spatula congrats this is the best decision of you're life</h2>
    //    </div> 
    //     }
            
    //     </>
    
        <form >
          <PaymentElement />
          <button>Submit</button>
        </form>
      );

    
}
export default PaymentForm;