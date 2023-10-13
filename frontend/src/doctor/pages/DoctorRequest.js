import React, { Component } from 'react';

import Card from '../../shared/components/Card/Card';

class DoctorRequestForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      name: '',
      email: '',
      password: '',
      dateOfBirth: '',
      hourlyRate: '',
      affiliation: '',
      educationalBackground: '',
      mobileNumber: '',
      speciality: '',
    };
  }

  handleUsernameChange = (event) => {
    this.setState({
      username: event.target.value,
    });
  };

  handleNameChange = (event) => {
    this.setState({
      name: event.target.value,
    });
  };

  handleEmailChange = (event) => {
    this.setState({
      email: event.target.value,
    });
  };

  handlePasswordChange = (event) => {
    this.setState({
      password: event.target.value,
    });
  };

  handleDateOfBirthChange = (event) => {
    this.setState({
      dateOfBirth: event.target.value,
    });
  };

  handleHourlyRateChange = (event) => {
    this.setState({
      hourlyRate: event.target.value,
    });
  };

  handleAffiliationChange = (event) => {
    this.setState({
      affiliation: event.target.value,
    });
  };

  handleMobileNumberChange = (event) => {
    this.setState({
      mobileNumber: event.target.value,
    });
  };

  handleEducationalBackgroundChange = (event) => {
    this.setState({
      educationalBackground: event.target.value,
    });
  };

  handleSpecialityChange = (event) => {
    this.setState({
      speciality: event.target.value,
    });
  };
  //
  //PharmacistSignup is temp till we make a request function
  //
  handleSubmit = (event) => {
    event.preventDefault();
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
      body: JSON.stringify(this.state),
    };
    fetch('http://localhost:3000/doctors', requestOptions);
    // doctorSignup(`${this.state.username}
    // ${this.state.name}
    // ${this.state.email}
    // ${this.state.password}
    // ${this.state.dateOfBirth}
    // ${this.state.hourlyRate}
    // ${this.state.affiliation}
    // ${this.state.educationalBackground}`)
    // event.preventDefault()
  };

  render() {
    const {
      username,
      name,
      email,
      password,
      mobileNumber,
      dateOfBirth,
      hourlyRate,
      affiliation,
      educationalBackground,
      speciality,
    } = this.state;
    return (
      <Card>
        <form onSubmit={this.handleSubmit}>
          <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label">
              Username
            </label>
            <input
              type="text"
              class="form-control"
              value={username}
              onChange={this.handleUsernameChange}
            />
          </div>
          <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label">
              Name
            </label>
            <input
              type="text"
              class="form-control"
              value={name}
              onChange={this.handleNameChange}
            />
          </div>
          <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label">
              Email
            </label>
            <input
              type="text"
              class="form-control"
              value={email}
              onChange={this.handleEmailChange}
            />
          </div>
          <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label">
              Password
            </label>
            <input
              type="text"
              class="form-control"
              value={password}
              onChange={this.handlePasswordChange}
            />
          </div>
          <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label">
              Mobile Number
            </label>
            <input
              type="text"
              class="form-control"
              value={mobileNumber}
              onChange={this.handleMobileNumberChange}
            />
          </div>
          <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label">
              Date of Birth
            </label>
            <input
              type="date"
              value={dateOfBirth}
              class="form-control"
              onChange={this.handleDateOfBirthChange}
            />
          </div>
          <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label">
              Hourly Rate
            </label>
            <input
              type="text"
              class="form-control"
              value={hourlyRate}
              onChange={this.handleHourlyRateChange}
            />
          </div>
          <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label">
              Affiliation
            </label>
            <input
              type="text"
              class="form-control"
              value={affiliation}
              onChange={this.handleAffiliationChange}
            />
          </div>
          <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label">
              Educational Background
            </label>
            <input
              type="text"
              class="form-control"
              value={educationalBackground}
              onChange={this.handleEducationalBackgroundChange}
            />
          </div>
          <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label">
              Speciality
            </label>
            <input
              type="text"
              class="form-control"
              value={speciality}
              onChange={this.handleSpecialityChange}
            />
          </div>
          <button class="btn btn-primary lg" id="subbutton2" type="submit">
            Request registeration
          </button>
        </form>
      </Card>
    );
  }
}

export default DoctorRequestForm;
