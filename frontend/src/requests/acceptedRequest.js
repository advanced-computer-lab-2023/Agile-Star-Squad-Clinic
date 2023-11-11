import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import classes from './requestsStyle.module.css';
import doctorImage from './051_Doctor 1.png';
import tick from './Medicine.png';
import logo from './logo.png';


const AcceptedRequest = (props) => {
    const [isButtonPressed, setButtonPressed1] = useState(false);
    const [isButtonPressed2, setButtonPressed2] = useState(false);
    const handleButtonClick1 = () => {
        setButtonPressed1(true);
    }
    const handleButtonClick2 = () => {
        setButtonPressed2(true);
    }
    return(
   
        <body className={classes.background}>
        <div className='d-flex'>
        <div className={`${classes.mainBackground} col-5`}>
            <div className={classes.logo}>
              <img src={logo} alt="Clinic Logo"/>  
            </div>
            <img src={doctorImage} alt="Doctor Image" className={classes.doctorImage} />
        </div>

        <div className={`${classes.secondBackground} col-7`}>
         {
          <div className={classes.customText}>
            {!isButtonPressed && (
              <>
                <p className={classes.p1}>ACCESS REQUEST APPROVED</p>
                <p className={classes.p2}>Access Authorized</p>
                <img src={tick} alt="BIG TICK" />
                <div>
                <button className={classes.button} onClick={handleButtonClick1}>NEXT</button>
                </div>
              </>
            )}
            {isButtonPressed && (
              <>
              {!isButtonPressed2 &&(
                <>
                <div className={classes.terms}>Terms & Conditions</div>
                <div className={classes.agreement}>Your agreement</div>
                <div className={classes.container}>Last Revised: December 16, 2013
                Welcome to www.lorem-ipsum.info. This site is provided as a service to our visitors and may be used for informational purposes only. Because the Terms and Conditions contain legal obligations, please read them carefully.
                1. YOUR AGREEMENT
                By using this Site, you agree to be bound by, and to comply with, these Terms and Conditions. If you do not agree to these Terms and Conditions, please do not use this site.
                PLEASE NOTE: We reserve the right, at our sole discretion, to change, modify or otherwise alter these Terms and Conditions at any time. Unless otherwise indicated, amendments will become effective immediately. Please review these Terms and Conditions periodically. Your continued use of the Site following the posting of changes and/or modifications will constitute your acceptance of the revised Terms and Conditions and the reasonableness of these standards for notice of changes. For your information, this page was last updated as of the date at the top of these terms and conditions.
                2. PRIVACY
                Please review our Privacy Policy, which also governs your visit to this Site, to understandation provided to or gathered by us with respect to such use.
                </div>
                <div className={classes.buttonsDiv}>
                <button className={classes.cancelButton} >Cancel</button>
                <button className={classes.agreeButton} onClick={handleButtonClick2}>Agree</button>
                </div>
                </>
              )}
              {isButtonPressed2 &&(
                <>
                
                </>
              )}
              </>
            )}  
          </div>
          

         }
         
        </div>
        </div>    
        </body>

    
    
    
    
    

    )
}
export default AcceptedRequest;