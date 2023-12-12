import React from "react";
import { Link } from "react-router-dom";
import classes from './PackageList.module.css';
import {  Container } from 'react-bootstrap';


const PackageItem = (props) => {
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
        
        <Link to={`/updatePackage/${props.id}`}>
            <button className={classes.viewButton}>View</button>
          </Link>
          {/* <button className="btn btn-primary sm" onClick={confirmDeleteHandler}>
            Delete
          </button> */}
        </div>
      </Container>
      </div>
  );
};

export default PackageItem;
