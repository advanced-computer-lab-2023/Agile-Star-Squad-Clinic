import React from "react";

import Card from "../../shared/components/Card/Card";
// import "./packageItem.css";

const PackageItem = (props) => {
  return (
    <li className="package-item">
      <Card className="package-item__content">
        <div className="package-item__info">
          <h2>{props.name}</h2>
          <p>Price per Year: {props.pricePerYear} LE</p>
          <p>Doctor Session Discount: {props.doctorSessionDiscount}%</p>
          <p>Medicine Discount: {props.medicineDiscount}%</p>
          <p>Family Member Discount: {props.familyMemberDiscount}%</p>
          <p>Description: {props.description}</p>
        </div>
        <div className="package-item__actions">
          <button> Edit</button>
          <button> Delete</button>
        </div>
      </Card>
    </li>
    
  );
};

export default PackageItem;
