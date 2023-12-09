import React from "react";
import Card from "../../shared/components/Card/Card";
import { Link } from "react-router-dom";


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
    <li className="package-item">
      <div className="package-item__content">
        <div className="package-item__info">
          <h2 className="package-item__name">{props.name}</h2>
          <p>Price per Year: {props.pricePerYear} LE</p>
          <p>Doctor Session Discount: {props.doctorSessionDiscount}%</p>
          <p>Medicine Discount: {props.medicineDiscount}%</p>
          <p>Family Member Discount: {props.familyMemberDiscount}%</p>
          <p>Description: {props.description}</p>
        </div>
        {/* <div className="package-item__actions">
          
          <Link to ={`/updatePackage/${props.id}`}>
          <button className="btn btn-primary sm"> Edit </button>
          </Link>
          <button className="btn btn-primary sm"onClick={confirmDeleteHandler}> Delete</button>
        </div> */}
      </div>
    </li>
  );
};

export default PackageItem;
