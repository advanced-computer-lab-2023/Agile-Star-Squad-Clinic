import ReactDOM from "react-dom";
import React from "react";
import Modal from "../../shared/components/Modal/Modal";

const DoctorDetails = (props) => {
  const onDelete = () => {
    props.onDelete(props.data["username"]);
    props.exit();
  };

  const getDoctorBody = () => {
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
            <h4>Speciality</h4>
          </span>
          <span>{props.data["speciality"]}</span>
        </div>
        <div>
          <span>
            <h4>Email</h4>
          </span>
          <span>{props.data["email"]}</span>
        </div>
        <div>
          <h4>Session Price</h4>
          <span>{props.data["sessionPrice"]}</span>
        </div>
        <div>
          <span>
            <h4>Affiliation</h4>
          </span>
          <span>{props.data["affiliation"]}</span>
        </div>
        <div>
          <span>
            <h4>Educational Background</h4>
          </span>
          <span>{props.data["educationalBackground"]}</span>
        </div>
      </React.Fragment>
    );
  };

  return ReactDOM.createPortal(
    <Modal exit={props.exit}>
      {getDoctorBody()}
      <ActionButtons onDelete={onDelete} />
    </Modal>,
    document.getElementById("backdrop-root")
  );
};

const ActionButtons = (props) => {
  return (
    <div className="d-flex justify-content-end mt-5">
      {/* Add any action buttons here */}
    </div>
  );
};

export default DoctorDetails;
