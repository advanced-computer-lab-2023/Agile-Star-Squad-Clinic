import ReactDOM from "react-dom";
import React from "react";
import Modal from "../../shared/components/Modal/Modal";

const PatientDetails = (props) => {
  const onDelete = () => {
    props.onDelete(props.data["username"]);
    props.exit();
  };

  const PatientDetails = () => {
    return getPatientBody();
  };

  const getPatientBody = () => {
    return (
      <React.Fragment>
        <div>
          <span>
            <h4>Username</h4>
          </span>
          <span>{props.data["username"]}</span>
        </div>
        <div>
          <span>
            <h4>Name</h4>
          </span>
          <span>{props.data["name"]}</span>
        </div>
        <div>
          <span>
            <h4>Email</h4>
          </span>
          <span>{props.data["email"]}</span>
        </div>
        <div>
          <span>
            <h4>Date of Birth</h4>
          </span>
          <span>{props.data["dateOfBirth"]}</span>
        </div>
        <div>
          <h4>Gender</h4>
          <span>{props.data["gender"]}</span>
        </div>
        <div>
          <span>
            <h4>Mobile Number</h4>
          </span>
          <span>{props.data["mobileNumber"]}</span>
        </div>
        <div>
          <span>
            <h4>Emergency Contact</h4>
          </span>
          <span>{props.data["emergencyContact"]["fullName"]}</span>
          <br />
          <span>{props.data["emergencyContact"]["phoneNumber"]}</span>
        </div>
        <div>
          <span>
            <h4>Doctors</h4>
          </span>
          <span>{props.data["doctor"]}</span>
        </div>
        <div>
          <span>
            <h4>Medical Record</h4>
          </span>
          <span>{props.data["MedicalRecord"]}</span>
        </div>
      </React.Fragment>
    );
  };

  return ReactDOM.createPortal(
    <Modal exit={props.exit}>
      {PatientDetails()}
      <ActionButtons onDelete={onDelete} />
    </Modal>,
    document.getElementById("backdrop-root")
  );
};

const ActionButtons = (props) => {
  return (
    <div className="d-flex justify-content-end mt-5">
      {/* <button className="formButtons formDeleteButton" onClick={props.onDelete}>
        Delete
      </button> */}
    </div>
  );
};

export default PatientDetails;
