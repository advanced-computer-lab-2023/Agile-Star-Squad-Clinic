import React from "react";
import Card from "../../../shared/components/Card/Card";
import { Link } from "react-router-dom";


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
          
          <Link to ={`/package/checkout`} state={{price: props.pricePerYear, name: props.name, description: props.description, id:props.id}}>
          <button className="btn btn-primary sm"> Purchase </button>
          {/* <button className="btn btn-primary sm" onClick={purchasePackageHandler}> Purchase </button> */}
          </Link>
        </div>
      </Card>
    </li>
  );
};

export default PackageItem;
