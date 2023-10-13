import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PatientRegisterForm = () => {
  const [state, setState] = useState({
    username: '',
    name: '',
    email: '',
    password: '',
    dateOfBirth: '',
    gender: 'male',
    mobileNumber: '',
    emergencyContact: {
      fullName: '',
      phoneNumber: '',
    },
  });

  const handleUsernameChange = (event) => {
    setState((prevState) => {
      return {
        ...prevState,
        username: event.target.value,
      };
    });
  };

  const handleNameChange = (event) => {
    setState((prevState) => {
      return {
        ...prevState,
        name: event.target.value,
      };
    });
  };

  const handleEmailChange = (event) => {
    setState((prevState) => {
      return {
        ...prevState,
        email: event.target.value,
      };
    });
  };

  const handlePasswordChange = (event) => {
    setState((prevState) => {
      return {
        ...prevState,
        password: event.target.value,
      };
    });
  };

  const handleDateOfBirthChange = (event) => {
    setState((prevState) => {
      return {
        ...prevState,
        dateOfBirth: event.target.value,
      };
    });
  };

  const handleGenderChange = (event) => {
    setState((prevState) => {
      return {
        ...prevState,
        gender: event.target.value,
      };
    });
  };

  const handleMoibleNumberChange = (event) => {
    setState((prevState) => {
      return {
        ...prevState,
        mobileNumber: event.target.value,
      };
    });
  };

  const handleEmergencyFullNameChange = (event) => {
    setState((prevState) => {
      return {
        ...prevState,
        emergencyContact: {
          ...state.emergencyContact,
          fullName: event.target.value,
        },
      };
    });
  };

  const handleEmergencyNumberChange = (event) => {
    setState((prevState) => {
      return {
        ...prevState,
        emergencyContact: {
          ...state.emergencyContact,
          phoneNumber: event.target.value,
        },
      };
    });
  };
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
      body: JSON.stringify(state),
    };
    fetch('http://localhost:3000/patients', requestOptions)
      .then((response) => {
        return response.ok && navigate('/patient/login');
      })
      .catch((error) => {
        return alert('AAAAAAAAAAAAAAA2 failed');
      });
  };

  const {
    username,
    name,
    email,
    password,
    dateOfBirth,
    gender,
    mobileNumber,
    emergencyContact,
  } = state;
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Username</label>
        <input type="text" value={username} onChange={handleUsernameChange} />
      </div>
      <div>
        <label>Name</label>
        <input type="text" value={name} onChange={handleNameChange} />
      </div>
      <div>
        <label>Email</label>
        <input type="text" value={email} onChange={handleEmailChange} />
      </div>
      <div>
        <label>Password</label>
        <input type="text" value={password} onChange={handlePasswordChange} />
      </div>
      <div>
        <label>Date of Birth</label>
        <input
          type="date"
          value={dateOfBirth}
          onChange={handleDateOfBirthChange}
        />
      </div>
      <div>
        <label>Gender</label>
        <select type="text" value={gender} onChange={handleGenderChange}>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>
      <div>
        <label>Moible Number</label>
        <input
          type="text"
          value={mobileNumber}
          onChange={handleMoibleNumberChange}
        />
      </div>
      <div>
        <label>Emergency Contact:</label>
        <div>
          <label>Full Name</label>
          <input
            type="text"
            value={emergencyContact.fullName}
            onChange={handleEmergencyFullNameChange}
          />
        </div>
        <div>
          <label>Moible Number</label>
          <input
            type="text"
            value={emergencyContact.phoneNumber}
            onChange={handleEmergencyNumberChange}
          />
        </div>
      </div>
      <button type="submit">Register</button>
    </form>
  );
};

export default PatientRegisterForm;
