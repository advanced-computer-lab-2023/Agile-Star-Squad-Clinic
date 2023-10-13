import ReactDOM from "react-dom";
import React from "react";
import Modal from "../../shared/components/Modal/Modal";

const PrescriptionDetails = (props) => {
  const onDelete = () => {
    props.onDelete(props.data["body"]);
    props.exit();
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
          <span>{props.data["dateofCreation"]}</span>
        </div>
        <div>
          <span>
            <h4>Status</h4>
          </span>
          <span>{props.data["status"]}</span>
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
