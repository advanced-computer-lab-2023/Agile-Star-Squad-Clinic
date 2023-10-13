import Modal from '../../shared/components/Modal/Modal';
import ReactDOM from 'react-dom';
import React from 'react';

const MyInfo = (props) => {
  return (
    <React.Fragment>
      {/* <div>
                <span><h4>Username</h4></span>
                <span>{props.data['username']}</span>
            </div>
            <div>
                <span><h4>Name</h4></span>
                <span>{props.data['name']}</span>
            </div> */}
      {/* <div>
                <span><h4>Date of Birth</h4></span>
                <span>{props.data['dateOfBirth']}</span>
            </div> */}
      <div>
        <span>
          <h4>Email</h4>
        </span>
        <span>{props.data['email']}</span>
      </div>
      <div>
        <span>
          <h4>Hourly Rate</h4>
        </span>
        <span>{props.data['hourlyRate']}</span>
      </div>
      <div>
        <h4>Affiliation</h4>
        <span>{props.data['affiliation']}</span>
      </div>
      {/* <div>
                <span><h4>Educational Background</h4></span>
                <span>{props.data['educationalBackground']}</span>
            </div>
            <div>
                <span><h4>Specialty</h4></span>
                <span>{props.data['specialty']}</span>
            </div> */}
    </React.Fragment>
  );
};
// return ReactDOM.createPortal(
//   <Modal exit={props.exit}>
//     {myInfo()}
//     {/* <ActionButtons onDelete={onDelete} /> */}
//   </Modal>,
//   document.getElementById("backdrop-root")
// );

// const ActionButtons = (props) => {
//     return (
//         <div className="d-flex justify-content-end mt-5">
//             <button className="formButtons formDeleteButton" onClick={props.onDelete}>Save</button>
//         </div>
//     );
// };

export default MyInfo;
