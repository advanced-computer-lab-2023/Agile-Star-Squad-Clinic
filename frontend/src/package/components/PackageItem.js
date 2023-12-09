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
    <div className="package-item">
      <Card className="package-item__content">
          <h2 className="package-item__name">{props.name}</h2>
          <hr className="package-item__line" />
          <div className="package-item__details">
            
            <p>
              <span className="detail-title">
                Doctor Session Discount
              </span>{" "}
              <span className="detail-info">{props.doctorSessionDiscount}%</span>
            </p>
            <p>
              <span className="detail-title">Medicine Discount</span>{" "}
              <span className="detail-info">{props.medicineDiscount}%</span>
            </p>
            <p>
              <span className="detail-title">
                Family Member Discount
              </span>{" "}
              <span className="detail-info">{props.familyMemberDiscount}%</span>
            </p>
           
            <p>
              <span className="detail-title">Price </span>{" "}
              <span className="detail-info">{props.pricePerYear} LE</span>
            </p>
            {/* <p>
              <span className="detail-title">Description</span>{" "}
              <span className="detail-info">{props.description}</span>
            </p> */}
          </div>
       
        <div className="package-item__actions">
          <Link to={`/viewPackage/${props.id}`}>
            <button className="view-button">View</button>
          </Link>
          {/* <Link to={`/updatePackage/${props.id}`}>
            <button className="btn btn-primary sm">Edit</button>
          </Link>
          <button className="btn btn-primary sm" onClick={confirmDeleteHandler}>
            Delete
          </button> */}
        </div>
      </Card>
    </div>
  );
};

export default PackageItem;
