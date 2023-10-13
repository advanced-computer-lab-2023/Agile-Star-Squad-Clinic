import React from 'react';
import Card from '../../shared/components/Card/Card';

const PackageItem = (props) => {
  const confirmDeleteHandler = async () => {
    try {
      // await fetch(`http://localhost:3000/packages/${props.id}`, {
      await fetch(`http://localhost:3000/packages/652921afe42b08743e42f87f`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });
      props.onDeletePlace(props.id); // Use onDeletePlace prop
    } catch (err) {
      // Handle errors, if needed
    }
  };

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
          <button onClick={confirmDeleteHandler}> Delete</button>
        </div>
      </Card>
    </li>
  );
};

export default PackageItem;
