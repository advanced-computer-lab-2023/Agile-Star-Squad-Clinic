import React,{useState,useEffect} from 'react';
import Card from '../../shared/components/Card/Card';
import NavBar from '../../shared/components/NavBar/NavBar';
import NewPackage from '../../package/pages/NewPackage';
import StripeContainer from '../components/StripeContainer';
import spatula from '../../logo512.png'
import PaymentForm from '../components/PaymentForm';
const ProductDisplay = () => (
  <section>
    <div className="product">
      <img
        src="https://i.imgur.com/EHyR2nP.png"
        alt="The cover of Stubborn Attachments"
      />
      <div className="description">
      <h3>Stubborn Attachments</h3>
      <h5>$20.00</h5>
      </div>
    </div>
    <form action="http://localhost:3000/create-checkout-session" method="POST" >
    
      <button type="submit" >
        Checkout
      </button>
    </form>
  </section>
);
const Message = ({ message }) => (
  <section>
    <p>{message}</p>
  </section>
);
const AddingInfo = () => {
  const [showItem, setShowItem] = useState(false);
  const [showDelivery, setShowDelivery]= useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);

    if (query.get("success")) {
      setMessage("Order placed! You will receive an email confirmation.");
    }

    if (query.get("canceled")) {
      setMessage(
        "Order canceled -- continue to shop around and checkout when you're ready."
      );
    }
  }, []);
  return (
    // 
    <div className="container">

        <NavBar/>
        <br/><br/>
      <div className="row justify-content-md-center justify-content-evenly gx-5">
        <div className="col card1">
      <Card >
            
      

		{/* <div className='App'>
			<h1>The Spatula Store</h1>
			{showItem ? (
				<PaymentForm />
			) : (
				<>
					<h3>$10.00</h3>
					<img src={spatula} alt='Spatula' />
					<button onClick={() => setShowItem(true)}>Purchase Spatula</button>
				</>
			)}
		</div> */}
	
        </Card>  
        
        </div>
        <div className="col" id="card2">
          <Card>
        message ? (
    <Message message={message} />
  ) : (
    <ProductDisplay />
  );
</Card>
            </div>
      </div>
    </div>
  );
};
export default AddingInfo;








 

  
