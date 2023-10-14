import Modal from '../../shared/components/Modal/Modal';
import ReactDOM from 'react-dom';
import React, { useState } from 'react';

const MyInfo = (props) => {
  const info = props['info'];
  const [email, setEmail] = useState(info.email);
  let newEmail = email;
  const [hourlyRate, setHourlyRate] = useState(info.hourlyRate);
  let newHourlyRate = hourlyRate;
  const [affiliation, setAffiliation] = useState(info.affiliation);
  let newAffiliation = affiliation;
  const [username, setUsername] = useState(info.username);
  let newUsername = username;
  const [name, setName] = useState(info.name);
  let newName = name;
  const [dateOfBirth, setDateOfBirth] = useState(info.dateOfBirth);
  let newDateOfBirth = dateOfBirth;
  const [mobileNumber, setMobileNumber] = useState(info.mobileNumber);
  let newMobileNumber = mobileNumber;
  const [educationalBackground, setEducationalBackground] = useState(info.educationalBackground);
  let newEducationalBackground = educationalBackground;
  const [speciality, setSpeciality] = useState(info.speciality);
  let newSpeciality = speciality;
  const onSubmitHandler = (event) => {
    event.preventDefault();
    const requestOptions = {
      method: 'PATCH',
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
      body: JSON.stringify({
        email: newEmail,
        hourlyRate: newHourlyRate,
        affiliation: newAffiliation,
      }),
    };
    fetch(`http://localhost:3000/doctors/${info._id}`, requestOptions).then(
      (response) => {
        if (response.ok) {
          setEmail(newEmail);
          setHourlyRate(newHourlyRate);
          setAffiliation(newAffiliation);
          setDateOfBirth(dateOfBirth);
          setEducationalBackground(educationalBackground);
          setMobileNumber(mobileNumber);
          setName(name);
          setUsername(username);
          setSpeciality(speciality);
        }
      }
    );
  };

  const editEmailHandler = (event) => {
    if (event.target.value.length !== 0) newEmail = event.target.value;
    else newEmail = email;
  };
  const editHourlyRateHandler = (event) => {
    if (event.target.value.length !== 0 && event.target.value !== 0)
      newHourlyRate = event.target.value;
    else newHourlyRate = hourlyRate;
  };
  const editAffiliationHandler = (event) => {
    if (event.target.value.length !== 0) newAffiliation = event.target.value;
    else newAffiliation = affiliation;
  };

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
        <span>{email}</span>
      </div>
      <div>
        <span>
          <h4>Hourly Rate</h4>
        </span>
        <span>{hourlyRate}</span>
      </div>
      <div>
        <h4>Affiliation</h4>
        <span>{affiliation}</span>
      </div>
      <div>
        <h4>Name</h4>
        <span>{name}</span>
      </div>
      <div>
        <h4>Educational Background</h4>
        <span>{educationalBackground}</span>
      </div>
      <div>
        <h4>Username</h4>
        <span>{username}</span>
      </div>
      <div>
        <h4>Speciality</h4>
        <span>{speciality}</span>
      </div>
      <div>
        <h4>Mobile Number</h4>
        <span>{mobileNumber}</span>
      </div>
      <div>
        <h4>Date Of Birth</h4>
        <span>{dateOfBirth}</span>
      </div>
      <hr />
      <hr />
      <hr />
      <form onSubmit={onSubmitHandler}>
        <label>Email</label>
        <input type="text" onChange={editEmailHandler} />

        <label>Hourly Rate</label>
        <input type="text" onChange={editHourlyRateHandler} />

        <label>Affiliation</label>
        <input type="text" onChange={editAffiliationHandler} />
        <hr />
        <button type="submit">Edit</button>
      </form>
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
