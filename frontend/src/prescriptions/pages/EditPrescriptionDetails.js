import ReactDOM from "react-dom";
import React from "react";
import Modal from "../../shared/components/Modal/Modal";

const PrescriptionDetails = (props) => {
  const onDelete = () => {
    props.onDelete(props.data["body"]);
    props.exit();
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toDateString(); // Adjust this to fit your desired date format
  };
  const getPrescBody = () => {
    
    return (
      <React.Fragment>
        {/* <div>
          <span>
            <h4>Prescribing Doctor</h4>
          </span>
          <span>{props.data["doctor"]}</span>
        </div> */}
        <div>
          <span>
            <h4>Details</h4>
          </span>
          <span>{props.data["body"]}</span>
        </div>
        <div>
          <span>
            <h4>Date of Prescription</h4>
          </span>
          <span>{formatDate(props.data["dateOfCreation"])}</span>
        </div>
        <div>
          <span>
            <h4>Status</h4>
          </span>
          <span>{props.data["status"]}</span>
        </div>
        <div>
          <span>
            <h4>Prescribed Medications: </h4>
          </span>
         <ul> {props.data["items"].map((item) => {
                    return (
                      <>
                        <li>
                          <p>Name : {item.name} &nbsp; Dosage : {item.dosage} &nbsp; Frequency : {item.frequency} </p>
                        </li>
                      </>
                    );
                  })}
                  </ul>
        </div>
        
      </React.Fragment>
    );
  };

  return ReactDOM.createPortal(
    <Modal exit={props.exit}>
      {getPrescBody()}
      <ActionButtons onDelete={onDelete} />
    </Modal>,
    document.getElementById("backdrop-root")
  );
};

const ActionButtons = (props) => {
  return (
    <div className="d-flex justify-content-end mt-5">
      
    </div>
  );
};

export default PrescriptionDetails;
