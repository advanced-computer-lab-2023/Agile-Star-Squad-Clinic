import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import classes from './PackageList.module.css';
import {  Container } from 'react-bootstrap';
import UpdatePackage from "../pages/UpdatePackage";


const PackageItem = (props) => {
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  console.log(showUpdateForm);

  const toggleUpdateForm = () => {
    setShowUpdateForm((prevShowUpdateForm) => !prevShowUpdateForm);
    console.log(showUpdateForm); // Add this line to log the state
  };
  
  const confirmDeleteHandler = async () => {
    try {
      await fetch(`http://localhost:3000/packages/${props.id}`, {
      
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });
      props.onDelete(props.id);
       // Use onDeletePlace prop
    } catch (err) {
      // Handle errors, if needed
    }
  };

  return (
   
      <div>
  
       
        
  
        <Container className={classes.packageItem}>
        <h2 className={classes.packageName}>{props.name}</h2>
        <div className={classes.packageDetails}>
        <button className={classes.viewButton} onClick={toggleUpdateForm}>
            View
          </button>
          <hr className={classes.packageLine}/>
          
            <p >
              <span className={classes.detailTitle}>
                Doctor Session Discount:
              </span>{" "}
              <span className={classes.detailInfo}>{props.doctorSessionDiscount}%</span>
            </p>
            <p>
              <span className={classes.detailTitle}>Medicine Discount:</span>{" "}
              <span className={classes.detailInfo}>{props.medicineDiscount}%</span>
            </p>
            
            <p>
              <span className={classes.detailTitle}>
                Family Member Discount:
              </span>{" "}
              <span className={classes.detailInfo}>{props.familyMemberDiscount}%</span>
            </p>
           
            <p>
              <span className={classes.detailTitle}>Price: </span>{" "}
              <span className={classes.detailInfo}>{props.pricePerYear} L.E.</span>
            </p>
            {/* <p>
              <span className={classes.detailTitle}>Description</span>{" "}
              <span className={classes.detailInfo}>{props.description}</span>
            </p> */}
            
          </div>
       
        <div className={classes.packageActions}>
        
        
         
        </div>
      </Container>
      {showUpdateForm && (
        <div className={classes.overlay }  >
          
          <UpdatePackage updates={setShowUpdateForm} packageId={props.id} />
        </div>
      )}
      </div>
  );
};

export default PackageItem;